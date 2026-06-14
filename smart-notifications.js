// smart-notifications.js - Context-aware notifications system

const SmartNotifications = {
    _app: null,
    _db: null,
    _scheduledNotifications: [],
    _notificationSettings: {
        streak: true,
        achievements: true,
        social: true,
        quests: true,
        leveling: true
    },

    init(app) {
        this._app = app;
        this.loadNotificationSettings();
        // Defer scheduled notifications until user data is ready
        setTimeout(() => this.scheduleNotifications(), 2000);
    },

    /**
     * Called from app.js after each quiz completes
     */
    onQuizComplete(quizMeta) {
        if (!this._app || !this._app.userProgress) return;
        const userData = this._app.userProgress;
        const streak = userData.streak || 0;

        if (quizMeta.score === 100 && this._notificationSettings.achievements) {
            this.sendNotification('🎉 Perfect score! Amazing work!', 'success');
        } else if (quizMeta.passed && streak > 0 && streak % 5 === 0) {
            this.sendNotification(`🔥 ${streak}-day streak! You're on fire!`, 'success');
        }
    },

    /**
     * Load user notification settings
     */
    loadNotificationSettings() {
        const saved = localStorage.getItem('notificationSettings');
        if (saved) {
            this._notificationSettings = JSON.parse(saved);
        }
    },

    /**
     * Save notification settings
     */
    saveNotificationSettings() {
        localStorage.setItem('notificationSettings', JSON.stringify(this._notificationSettings));
    },

    /**
     * Schedule time-based notifications
     */
    scheduleNotifications() {
        const userData = this._app.userProgress;

        // Morning notification (7 AM)
        this.scheduleTimeNotification(7, () => {
            const streak = userData.streak || 0;
            let message = 'Good morning! ☀️ Ready to start learning today?';

            if (streak > 0) {
                message = `🔥 Good morning! Your streak is ${streak} days. Keep it up!`;
            }

            this.sendNotification(message, 'info');
        });

        // Afternoon notification (2 PM)
        this.scheduleTimeNotification(14, () => {
            this.sendNotification('⏰ Take a quick quiz break! You\'ve got this 💪', 'info');
        });

        // Evening notification (7 PM)
        this.scheduleTimeNotification(19, () => {
            const todayCompleted = this.getQuizzesCompletedToday();
            let message = 'Complete 1 more quiz to maintain your streak! 🎯';

            if (todayCompleted > 0) {
                message = `Great session today! ${todayCompleted} quiz${todayCompleted > 1 ? 'zes' : ''} completed. 🌟`;
            }

            this.sendNotification(message, 'info');
        });

        console.log('✅ Notifications scheduled');
    },

    /**
     * Notify on streak milestone
     */
    notifyStreakMilestone(streakDays) {
        const milestones = {
            5: '🔥 5-Day Streak! You\'re on fire!',
            10: '🚀 10-Day Streak! Incredible dedication!',
            30: '👑 30-Day Legend! You\'re unstoppable!',
            50: '💎 50-Day Champion! Absolutely amazing!',
            100: '🌟 100-Day Master! You are LEGENDARY!'
        };

        if (milestones[streakDays]) {
            this.sendNotification(milestones[streakDays], 'success');
            this._app.userProgress.quizCoins = (this._app.userProgress.quizCoins || 0) + (streakDays * 5);
        }
    },

    /**
     * Notify on achievement unlock
     */
    notifyAchievementUnlock(achievement) {
        const message = `🏆 Achievement Unlocked: ${achievement.name}!`;
        this.sendNotification(message, 'success');
    },

    /**
     * Notify on friend action
     */
    notifyFriendAction(action, friendName) {
        const messages = {
            'beat_score': `🏆 ${friendName} beat your score! Retake the quiz?`,
            'sent_challenge': `⚔️ ${friendName} challenged you!`,
            'sent_friend_request': `👋 ${friendName} sent you a friend request`,
            'added_friend': `🎉 You and ${friendName} are now friends!`
        };

        if (messages[action]) {
            this.sendNotification(messages[action], 'info');
        }
    },

    /**
     * Notify on quest completion
     */
    notifyQuestComplete(questName) {
        this.sendNotification(`✅ Quest Complete: ${questName}!`, 'success');
    },

    /**
     * Notify on weak area
     */
    notifyWeakArea(subject) {
        this.sendNotification(
            `📉 Your ${subject} score has dropped. Time to practice! 💪`,
            'warning'
        );
    },

    /**
     * Notify on rank position
     */
    notifyRankChange(rank, previousRank) {
        let message = '';

        if (rank === 1) {
            message = '🥇 You\'re #1 on the leaderboard!';
        } else if (rank === 2) {
            message = '🥈 You\'re #2 on the leaderboard!';
        } else if (rank === 3) {
            message = '🥉 You\'re #3 on the leaderboard!';
        } else if (rank < previousRank) {
            message = `📈 You climbed to rank #${rank}!`;
        } else if (rank > previousRank) {
            message = `📉 You're now at rank #${rank}. Time to climb back up! 🚀`;
        }

        if (message) {
            this.sendNotification(message, 'info');
        }
    },

    /**
     * Schedule a notification at specific time
     */
    scheduleTimeNotification(hour, callback) {
        const now = new Date();
        let scheduledTime = new Date();
        scheduledTime.setHours(hour, 0, 0, 0);

        // If time has passed, schedule for tomorrow
        if (scheduledTime < now) {
            scheduledTime.setDate(scheduledTime.getDate() + 1);
        }

        const timeUntilNotification = scheduledTime - now;

        setTimeout(() => {
            callback();
            // Reschedule for tomorrow
            setTimeout(callback, 24 * 60 * 60 * 1000);
        }, timeUntilNotification);
    },

    /**
     * Get quizzes completed today
     */
    getQuizzesCompletedToday() {
        const userData = this._app.userProgress;
        if (!userData.quizHistory) return 0;

        const today = new Date().toDateString();
        return userData.quizHistory.filter(q =>
            new Date(q.date).toDateString() === today
        ).length;
    },

    /**
     * Send notification (override with toast if available)
     */
    sendNotification(message, type = 'info') {
        if (this._notificationSettings[type] === false) return;

        this._app.showNotification(message, type);

        // Store in notification history
        this.storeNotificationHistory(message, type);
    },

    /**
     * Store notification in history
     */
    storeNotificationHistory(message, type) {
        const history = JSON.parse(localStorage.getItem('notificationHistory') || '[]');
        history.push({
            message,
            type,
            timestamp: new Date(),
            read: false
        });

        // Keep only last 50 notifications
        if (history.length > 50) {
            history.shift();
        }

        localStorage.setItem('notificationHistory', JSON.stringify(history));
    },

    /**
     * Display notification settings
     */
    displaySettings() {
        const container = document.getElementById('notification-settings');
        if (!container) return;

        let html = '<div class="notification-settings">';

        Object.entries(this._notificationSettings).forEach(([key, enabled]) => {
            const label = key.charAt(0).toUpperCase() + key.slice(1);

            html += `
                <div class="setting-item">
                    <label>
                        <input type="checkbox" ${enabled ? 'checked' : ''} 
                               onchange="SmartNotifications.toggleSetting('${key}')">
                        <span>${label} Notifications</span>
                    </label>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    },

    /**
     * Toggle notification setting
     */
    toggleSetting(key) {
        this._notificationSettings[key] = !this._notificationSettings[key];
        this.saveNotificationSettings();
        this._app.showNotification('Notification settings updated', 'success');
    },

    /**
     * Get smart suggestion based on user
     */
    getSmartSuggestion(userData) {
        const suggestions = [];

        // Weak area suggestion
        let totalScore = 0;
        let totalAttempts = 0;
        const subjects = ['quantitative', 'english', 'reasoning', 'general_science'];

        subjects.forEach(subject => {
            const subjectData = userData[subject] || {};
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
        });

        const avgAccuracy = totalAttempts > 0 ? (totalScore / totalAttempts) * 100 : 0;

        if (avgAccuracy < 60) {
            suggestions.push('💪 Focus on your weak areas to improve faster');
        } else if (avgAccuracy < 75) {
            suggestions.push('🎯 You\'re doing well! Challenge harder topics');
        } else {
            suggestions.push('👑 You\'re a master! Help others learn');
        }

        // Time-based suggestion
        const hour = new Date().getHours();
        if (hour < 9) {
            suggestions.push('🌅 Early morning is the best time to learn!');
        } else if (hour > 22) {
            suggestions.push('🌙 Getting late! Don\'t overdo it');
        } else if (hour > 14 && hour < 17) {
            suggestions.push('☀️ Afternoon slump? Take a quick energy break!');
        }

        return suggestions[Math.floor(Math.random() * suggestions.length)];
    }
};
