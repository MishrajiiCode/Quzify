// personalized-learning.js - Smart recommendations and personalized learning paths

const PersonalizedLearning = {
    _app: null,
    _db: null,
    _weakAreas: [],
    _recommendations: [],
    _adaptiveDifficulty: {},

    init(app) {
        this._app = app;
        // Defer until user data is available
        setTimeout(() => {
            this.analyzeWeakAreas();
            this.generateRecommendations();
            this.renderRecommendations();
            this.notifyTodayPriority();
        }, 1500);
    },

    // Called by refresh button
    refreshRecommendations() {
        this.analyzeWeakAreas();
        this.generateRecommendations();
        this.renderRecommendations();
    },
    
    notifyTodayPriority() {
        if (this._recommendations.length > 0) {
            const topPriority = this._recommendations[0];
            if (this._app && this._app.showNotification) {
                setTimeout(() => {
                    this._app.showNotification(`📚 Study Priority: ${topPriority.title} (${topPriority.estimatedTime}m)`, 'info');
                }, 3000);
            }
        }
    },

    /**
     * Render recommendation cards in home page section
     */
    renderRecommendations() {
        const section = document.getElementById('recommendations-section');
        const container = document.getElementById('recommendations-container');
        if (!section || !container) return;

        if (this._recommendations.length === 0) return;

        section.style.display = 'block';
        container.innerHTML = this._recommendations.slice(0, 5).map(rec => `
            <div class="recommendation-card" data-subject="${rec.subject || ''}">
                <div class="rec-icon">${rec.icon || '📚'}</div>
                <div class="rec-info">
                    <h4>${rec.title || rec.subject || 'Quiz'}</h4>
                    <p>${rec.description || 'Practice this topic'}</p>
                    <span class="rec-badge rec-badge--${rec.priority || 'medium'}">${rec.priority || 'Recommended'}</span>
                </div>
            </div>
        `).join('');
    },

    /**
     * Analyze user's performance to identify weak areas
     */
    analyzeWeakAreas() {
        const userData = this._app.userProgress;
        const weakAreas = [];

        // Check performance by subject
        const subjects = ['quantitative', 'english', 'reasoning', 'general_science'];
        subjects.forEach(subject => {
            const subjectData = userData[subject] || {};
            let totalScore = 0;
            let totalAttempts = 0;

            Object.values(subjectData).forEach(chapter => {
                if (chapter && typeof chapter === 'object') {
                    Object.values(chapter).forEach(set => {
                        if (Array.isArray(set)) {
                            set.forEach(question => {
                                if (question.attempted) {
                                    totalAttempts++;
                                    totalScore += question.isCorrect ? 1 : 0;
                                }
                            });
                        }
                    });
                }
            });

            const accuracy = totalAttempts > 0 ? (totalScore / totalAttempts) * 100 : 0;

            if (accuracy < 60 && totalAttempts >= 5) {
                weakAreas.push({
                    subject: subject,
                    accuracy: accuracy,
                    attempts: totalAttempts,
                    priority: 'high'
                });
            } else if (accuracy < 75 && totalAttempts >= 3) {
                weakAreas.push({
                    subject: subject,
                    accuracy: accuracy,
                    attempts: totalAttempts,
                    priority: 'medium'
                });
            }
        });

        // Analyze by chapter within weak subjects
        weakAreas.forEach(weakSubject => {
            const subjectData = userData[weakSubject.subject] || {};
            Object.entries(subjectData).forEach(([chapter, chapters]) => {
                if (chapters && typeof chapters === 'object') {
                    let chapterScore = 0;
                    let chapterAttempts = 0;

                    Object.values(chapters).forEach(set => {
                        if (Array.isArray(set)) {
                            set.forEach(question => {
                                if (question.attempted) {
                                    chapterAttempts++;
                                    chapterScore += question.isCorrect ? 1 : 0;
                                }
                            });
                        }
                    });

                    const accuracy = chapterAttempts > 0 ? (chapterScore / chapterAttempts) * 100 : 0;
                    if (accuracy < 65 && chapterAttempts >= 3) {
                        weakAreas.push({
                            type: 'chapter',
                            subject: weakSubject.subject,
                            chapter: chapter,
                            accuracy: accuracy,
                            attempts: chapterAttempts,
                            priority: 'critical'
                        });
                    }
                }
            });
        });

        this._weakAreas = weakAreas.sort((a, b) => {
            const priorityOrder = { critical: 0, high: 1, medium: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        console.log('📊 Weak areas identified:', this._weakAreas);
    },

    /**
     * Generate personalized learning recommendations
     */
    generateRecommendations() {
        const recommendations = [];
        const userData = this._app.userProgress;

        // 1. "Master Your Weakness" recommendations
        this._weakAreas.slice(0, 5).forEach(weak => {
            recommendations.push({
                id: `weakness_${weak.subject}_${weak.chapter || 'all'}`,
                type: 'master-weakness',
                title: `Master Your Weakness: ${weak.chapter || this.getSubjectName(weak.subject)}`,
                description: `You're scoring ${weak.accuracy.toFixed(0)}% on this topic. Let's improve it!`,
                subject: weak.subject,
                chapter: weak.chapter,
                difficulty: 'medium',
                estimatedTime: 15,
                priority: weak.priority,
                rewards: this.calculateRewards('weakness', weak.priority)
            });
        });

        // 2. "Topics to Review" - Based on historical performance
        if (userData.quizHistory && userData.quizHistory.length > 0) {
            const recentFailed = userData.quizHistory
                .filter(q => q.score < 60)
                .slice(0, 3)
                .map(q => ({
                    id: `review_${q.subject}_${q.chapter}`,
                    type: 'review',
                    title: `Review: ${q.chapter}`,
                    description: `You scored ${q.score.toFixed(0)}% on this. Let's review!`,
                    subject: q.subject,
                    chapter: q.chapter,
                    difficulty: 'easy',
                    estimatedTime: 10,
                    priority: 'high',
                    rewards: { coins: 30, xp: 50 }
                }));

            recommendations.push(...recentFailed);
        }

        // 3. Smart recommendations based on weak area patterns
        const strongSubjects = this.getStrongSubjects();
        const weakSubjects = this._weakAreas.map(w => w.subject).slice(0, 2);

        weakSubjects.forEach(subject => {
            recommendations.push({
                id: `challenge_${subject}`,
                type: 'challenge',
                title: `Challenge Mode: ${this.getSubjectName(subject)}`,
                description: `Advanced questions to push your limits!`,
                subject: subject,
                difficulty: 'hard',
                estimatedTime: 20,
                priority: 'medium',
                rewards: { coins: 100, xp: 150 }
            });
        });

        // 4. Strength building - based on strong areas
        strongSubjects.forEach(subject => {
            recommendations.push({
                id: `master_${subject}`,
                type: 'mastery',
                title: `Achieve Mastery: ${this.getSubjectName(subject)}`,
                description: `You're doing great at ${subject}. Complete this to unlock mastery badge!`,
                subject: subject,
                difficulty: 'expert',
                estimatedTime: 30,
                priority: 'low',
                rewards: { coins: 150, xp: 200, badge: 'mastery' }
            });
        });

        this._recommendations = recommendations;
        console.log('✅ Recommendations generated:', this._recommendations.length);
    },

    /**
     * Display recommendations on home page
     */
    displayRecommendations() {
        const container = document.getElementById('recommendations-container');
        if (!container || this._recommendations.length === 0) return;

        let html = '<div class="recommendations-scroll">';

        this._recommendations.slice(0, 5).forEach(rec => {
            const icon = this.getRecommendationIcon(rec.type);
            const priority = rec.priority === 'critical' ? '🔴' : rec.priority === 'high' ? '🟠' : '🟡';

            html += `
                <div class="recommendation-card" onclick="PersonalizedLearning.startRecommendedQuiz('${rec.id}')">
                    <div class="rec-header">
                        <span class="icon">${icon}</span>
                        <span class="priority">${priority}</span>
                    </div>
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                    <div class="rec-meta">
                        <span class="difficulty">${rec.difficulty}</span>
                        <span class="time">⏱️ ${rec.estimatedTime}m</span>
                        <span class="reward">+${rec.rewards.coins} coins</span>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    },

    /**
     * Adaptive difficulty - adjust based on performance
     */
    updateAdaptiveDifficulty() {
        const userData = this._app.userProgress;
        const subjects = ['quantitative', 'english', 'reasoning', 'general_science'];

        subjects.forEach(subject => {
            const accuracy = this.calculateSubjectAccuracy(subject);

            if (accuracy >= 85) {
                this._adaptiveDifficulty[subject] = 'hard';
            } else if (accuracy >= 70) {
                this._adaptiveDifficulty[subject] = 'medium';
            } else if (accuracy >= 50) {
                this._adaptiveDifficulty[subject] = 'easy';
            } else {
                this._adaptiveDifficulty[subject] = 'beginner';
            }
        });

        console.log('🎯 Adaptive difficulty updated:', this._adaptiveDifficulty);
    },

    /**
     * Calculate subject accuracy
     */
    calculateSubjectAccuracy(subject) {
        const userData = this._app.userProgress;
        const subjectData = userData[subject] || {};
        let totalScore = 0;
        let totalAttempts = 0;

        Object.values(subjectData).forEach(chapter => {
            if (chapter && typeof chapter === 'object') {
                Object.values(chapter).forEach(set => {
                    if (Array.isArray(set)) {
                        set.forEach(question => {
                            if (question.attempted) {
                                totalAttempts++;
                                totalScore += question.isCorrect ? 1 : 0;
                            }
                        });
                    }
                });
            }
        });

        return totalAttempts > 0 ? (totalScore / totalAttempts) * 100 : 0;
    },

    /**
     * Get strong subjects (accuracy > 75%)
     */
    getStrongSubjects() {
        return Object.entries(this._adaptiveDifficulty)
            .filter(([_, difficulty]) => difficulty === 'hard' || difficulty === 'medium')
            .map(([subject, _]) => subject);
    },

    /**
     * Get subject name from key
     */
    getSubjectName(subject) {
        const names = {
            'quantitative': 'Quantitative Aptitude',
            'english': 'English',
            'reasoning': 'Reasoning',
            'general_science': 'General Science'
        };
        return names[subject] || subject;
    },

    /**
     * Get recommendation icon
     */
    getRecommendationIcon(type) {
        const icons = {
            'master-weakness': '💪',
            'review': '🔄',
            'challenge': '⚡',
            'mastery': '👑'
        };
        return icons[type] || '📚';
    },

    /**
     * Calculate reward based on type and priority
     */
    calculateRewards(type, priority) {
        const baseCoins = {
            'weakness': 75,
            'review': 50,
            'challenge': 100,
            'mastery': 150
        };

        const priorityMultiplier = {
            'critical': 1.5,
            'high': 1.25,
            'medium': 1,
            'low': 0.8
        };

        const coins = Math.floor(baseCoins[type] * priorityMultiplier[priority]);
        const xp = Math.floor(coins * 1.5);

        return { coins, xp };
    },

    /**
     * Start a recommended quiz
     */
    startRecommendedQuiz(recommendationId) {
        const rec = this._recommendations.find(r => r.id === recommendationId);
        if (!rec) return;

        console.log('🚀 Starting recommended quiz:', rec);

        // Set adaptive difficulty
        if (rec.difficulty) {
            this._app.quizDifficulty = rec.difficulty;
        }

        // Navigate to quiz
        if (rec.chapter) {
            this._app.selectChapter(rec.chapter);
        } else {
            this._app.selectSubject(rec.subject);
        }

        this._app.showNotification(`Starting: ${rec.title}`, 'info');
    },

    /**
     * Save learning path completion
     */
    async saveLearningPathProgress(recommendationId, score, completed) {
        try {
            const userId = this._app.getOrCreateUserId();
            const userDoc = userProgressCollection.doc(userId);

            await userDoc.update({
                'learningPathProgress': {
                    [recommendationId]: {
                        score: score,
                        completed: completed,
                        completedDate: new Date(),
                        difficulty: this._adaptiveDifficulty[recommendationId]
                    }
                }
            });

            console.log('✅ Learning path progress saved');
        } catch (error) {
            console.error('Error saving learning path:', error);
        }
    }
};
