// quests.js - Daily and Weekly Quest System

const QuizifyQuests = {
    _app: null,
    _db: null,
    _activeQuests: [],
    _completedQuests: {},

    DAILY_QUESTS: [
        {
            id: 'complete_3_quizzes',
            title: '📚 Quiz Master',
            description: 'Complete 3 quizzes',
            icon: '📚',
            target: 3,
            rewards: { coins: 50, xp: 100 },
            category: 'daily'
        },
        {
            id: 'score_above_80',
            title: '⭐ High Scorer',
            description: 'Score above 80% in any quiz',
            icon: '⭐',
            target: 1,
            rewards: { coins: 40, xp: 75 },
            category: 'daily'
        },
        {
            id: 'study_30_mins',
            title: '⏱️ Study Session',
            description: 'Study for 30 minutes',
            icon: '⏱️',
            target: 1800, // seconds
            rewards: { coins: 35, xp: 60 },
            category: 'daily'
        },
        {
            id: 'challenge_friend',
            title: '🤝 Social Butterfly',
            description: 'Challenge a friend',
            icon: '🤝',
            target: 1,
            rewards: { coins: 30, xp: 50 },
            category: 'daily'
        },
        {
            id: 'review_weak_area',
            title: '💪 Weakness Fighter',
            description: 'Practice your weak area',
            icon: '💪',
            target: 1,
            rewards: { coins: 45, xp: 80 },
            category: 'daily'
        }
    ],

    WEEKLY_QUESTS: [
        {
            id: 'week_20_quizzes',
            title: '🔥 Weekly Grinder',
            description: 'Complete 20 quizzes this week',
            icon: '🔥',
            target: 20,
            rewards: { coins: 200, xp: 300, badge: 'weekly_grinder' },
            category: 'weekly'
        },
        {
            id: 'week_subject_master',
            title: '📖 Subject Expert',
            description: 'Complete all chapters in one subject',
            icon: '📖',
            target: 1,
            rewards: { coins: 150, xp: 250, badge: 'subject_expert' },
            category: 'weekly'
        },
        {
            id: 'week_avg_score_70',
            title: '🎯 Consistent Performer',
            description: 'Maintain 70% average this week',
            icon: '🎯',
            target: 70,
            rewards: { coins: 100, xp: 200, badge: 'consistent' },
            category: 'weekly'
        },
        {
            id: 'week_friend_requests',
            title: '👥 Social Connector',
            description: 'Send 5 friend requests',
            icon: '👥',
            target: 5,
            rewards: { coins: 75, xp: 150 },
            category: 'weekly'
        }
    ],

    init(app) {
        this._app = app;
        this.resetDailyQuests();
        this.loadActiveQuests();
        this.renderHomeWidget();
    },

    // Alias for external calls
    renderQuests() {
        this.displayQuests();
    },

    /**
     * Reset daily quests at midnight
     */
    resetDailyQuests() {
        const lastResetDate = localStorage.getItem('lastQuestResetDate');
        const today = new Date().toDateString();

        if (lastResetDate !== today) {
            localStorage.setItem('lastQuestResetDate', today);
            localStorage.setItem('dailyQuestProgress', JSON.stringify({}));
            console.log('✅ Daily quests reset');
        }
    },

    /**
     * Load active quests
     */
    loadActiveQuests() {
        const today = new Date().toDateString();
        const currentWeek = this.getCurrentWeekNumber();

        this._activeQuests = [
            ...this.DAILY_QUESTS,
            ...this.WEEKLY_QUESTS
        ];

        // Load progress from localStorage
        const questProgress = JSON.parse(localStorage.getItem('questProgress') || '{}');
        this._completedQuests = questProgress;

        this.displayQuests();
    },

    /**
     * Display quests in UI
     */
    displayQuests() {
        const container = document.getElementById('quests-container');
        if (!container) return;

        let html = `
            <div class="quests-tabs">
                <button class="quest-tab-btn active" onclick="QuizifyQuests.filterQuests('all', this)">All</button>
                <button class="quest-tab-btn" onclick="QuizifyQuests.filterQuests('daily', this)">Daily</button>
                <button class="quest-tab-btn" onclick="QuizifyQuests.filterQuests('weekly', this)">Weekly</button>
            </div>
            <div class="quests-list">
        `;

        const quests = this._activeQuests;

        quests.forEach(quest => {
            const progress = this.getQuestProgress(quest.id);
            const isCompleted = progress >= quest.target;
            const percentage = Math.min(100, (progress / quest.target) * 100);

            html += `
                <div class="quest-card ${isCompleted ? 'completed' : ''}">
                    <div class="quest-header">
                        <span class="quest-icon">${quest.icon}</span>
                        <div class="quest-info">
                            <h4>${quest.title}</h4>
                            <p>${quest.description}</p>
                        </div>
                        ${isCompleted ? '<span class="completed-badge">✅</span>' : ''}
                    </div>
                    <div class="quest-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%"></div>
                        </div>
                        <span class="progress-text">${progress}/${quest.target}</span>
                    </div>
                    <div class="quest-rewards">
                        <span>💰 ${quest.rewards.coins}</span>
                        <span>⭐ ${quest.rewards.xp}</span>
                        ${quest.rewards.badge ? `<span class="badge">${quest.rewards.badge}</span>` : ''}
                    </div>
                    ${isCompleted && !this._completedQuests[quest.id + '_claimed'] ? `
                        <button class="btn btn--primary claim-quest-btn" onclick="QuizifyQuests.claimQuestReward('${quest.id}')">
                            Claim Reward
                        </button>
                    ` : ''}
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    },

    /**
     * Filter quests by category
     */
    filterQuests(category, el) {
        // Update tab — el is the clicked button passed from onclick
        document.querySelectorAll('.quest-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        if (el) el.classList.add('active');

        // Filter and redisplay
        if (category !== 'all') {
            this._activeQuests = (category === 'daily' ? this.DAILY_QUESTS : this.WEEKLY_QUESTS);
        } else {
            this._activeQuests = [...this.DAILY_QUESTS, ...this.WEEKLY_QUESTS];
        }

        this.displayQuests();
    },

    /**
     * Update quest progress - handles both event-based and direct calls
     * Event-based: updateQuestProgress('quiz_complete', {score, passed, subject, ...})
     * Direct: updateQuestProgress('complete_3_quizzes', 1)
     */
    updateQuestProgress(questIdOrEvent, valueOrMeta) {
        const questProgress = JSON.parse(localStorage.getItem('questProgress') || '{}');

        const increment = (id, amount = 1) => {
            questProgress[id] = (questProgress[id] || 0) + amount;
            const quest = [...this.DAILY_QUESTS, ...this.WEEKLY_QUESTS].find(q => q.id === id);
            if (quest && questProgress[id] >= quest.target && !questProgress[id + '_completed']) {
                questProgress[id + '_completed'] = true;
                this.notifyQuestCompleted(quest);
            }
        };

        if (typeof valueOrMeta === 'object' && valueOrMeta !== null) {
            // Event-based call from app.js
            const meta = valueOrMeta;
            switch (questIdOrEvent) {
                case 'quiz_complete':
                    increment('complete_3_quizzes');
                    increment('week_20_quizzes');
                    if (meta.score >= 80) increment('score_above_80');
                    if (meta.timeTaken) increment('study_30_mins', meta.timeTaken);
                    break;
                case 'perfect_score':
                    // already handled in quiz_complete
                    break;
                case 'pass_quiz':
                    // track for weekly avg
                    break;
                case 'challenge_friend':
                    increment('challenge_friend');
                    break;
                case 'weak_area_quiz':
                    increment('review_weak_area');
                    break;
            }
        } else {
            // Direct call: updateQuestProgress(questId, number)
            increment(questIdOrEvent, valueOrMeta || 1);
        }

        localStorage.setItem('questProgress', JSON.stringify(questProgress));
        this._completedQuests = questProgress;
        this.renderHomeWidget();
    },

    /**
     * Get quest progress
     */
    getQuestProgress(questId) {
        const questProgress = JSON.parse(localStorage.getItem('questProgress') || '{}');
        return questProgress[questId] || 0;
    },

    /**
     * Notify user quest completed
     */
    notifyQuestCompleted(quest) {
        this._app.showNotification(`🎉 Quest Complete: ${quest.title}!`, 'success');
        this._completedQuests[quest.id + '_completed'] = true;
    },

    /**
     * Claim quest reward
     */
    async claimQuestReward(questId) {
        const quest = this._activeQuests.find(q => q.id === questId);
        if (!quest) return;

        try {
            // Add coins
            this._app.userProgress.quizCoins = (this._app.userProgress.quizCoins || 0) + quest.rewards.coins;

            // Add XP/Level exp
            this._app.userProgress.levelExp = (this._app.userProgress.levelExp || 0) + quest.rewards.xp;

            // Mark as claimed
            this._completedQuests[questId + '_claimed'] = true;

            // Save progress
            saveUserProgress();
            this._app.updateCoinDisplay();

            this._app.showNotification(`+${quest.rewards.coins} coins, +${quest.rewards.xp} XP claimed!`, 'success');
            this.displayQuests();

            console.log('✅ Quest reward claimed:', quest.title);
        } catch (error) {
            console.error('Error claiming quest reward:', error);
        }
    },

    /**
     * Get current week number
     */
    getCurrentWeekNumber() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const diff = now - start;
        const oneWeek = 1000 * 60 * 60 * 24 * 7;
        return Math.floor(diff / oneWeek);
    },

    /**
     * Track quiz completion for quests
     */
    trackQuizCompletion(score) {
        this.updateQuestProgress('quiz_complete', { score });
    },

    /**
     * Track study time for quests
     */
    trackStudyTime(seconds) {
        const questProgress = JSON.parse(localStorage.getItem('questProgress') || '{}');
        questProgress['study_30_mins'] = (questProgress['study_30_mins'] || 0) + seconds;
        localStorage.setItem('questProgress', JSON.stringify(questProgress));
    },

    /**
     * Render the home page quests widget (shows top 3 quests)
     */
    renderHomeWidget() {
        const widget = document.getElementById('home-quests-widget');
        const listEl = document.getElementById('home-quests-list');
        if (!widget || !listEl) return;

        widget.style.display = 'block';
        const topQuests = this.DAILY_QUESTS.slice(0, 3);
        const questProgress = JSON.parse(localStorage.getItem('questProgress') || '{}');

        listEl.innerHTML = topQuests.map(quest => {
            const progress = questProgress[quest.id] || 0;
            const isCompleted = progress >= quest.target;
            const pct = Math.min(100, (progress / quest.target) * 100);
            return `<div class="home-quest-item ${isCompleted ? 'completed' : ''}">
                <span class="home-quest-icon">${quest.icon}</span>
                <div class="home-quest-info">
                    <span class="home-quest-title">${quest.title}</span>
                    <div class="home-quest-bar"><div class="home-quest-fill" style="width:${pct}%"></div></div>
                </div>
                <span class="home-quest-reward">${isCompleted ? '✅' : '💰' + quest.rewards.coins}</span>
            </div>`;
        }).join('');
    }
};
