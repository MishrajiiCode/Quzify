// level-system.js - User level and progression system

const LevelSystem = {
    _app: null,
    _db: null,
    MAX_LEVEL: 50,
    XP_PER_LEVEL: 1000,

    LEVEL_TITLES: {
        1: 'Novice',
        5: 'Apprentice',
        10: 'Student',
        15: 'Dedicated Learner',
        20: 'Scholar',
        25: 'Expert',
        30: 'Master',
        35: 'Sage',
        40: 'Legend',
        45: 'Grand Master',
        50: 'Supreme Master'
    },

    LEVEL_BADGES: {
        1: '🎓',
        5: '📚',
        10: '🏫',
        15: '💪',
        20: '🔥',
        25: '⭐',
        30: '👑',
        35: '🏆',
        40: '💎',
        45: '🌟',
        50: '🚀'
    },

    init(app, db) {
        this._app = app;
        this._db = db;
        this.updateLevelDisplay();
    },

    /**
     * Add XP to user
     */
    async addXP(amount) {
        try {
            const userData = this._app.userProgress;
            const currentXP = userData.levelExp || 0;
            const currentLevel = userData.userLevel || 1;

            userData.levelExp = currentXP + amount;

            // Check for level up
            const newLevel = this.calculateLevel(userData.levelExp);
            if (newLevel > currentLevel) {
                userData.userLevel = newLevel;
                this.celebrateLevelUp(newLevel);
            }

            await saveUserProgress();
            this.updateLevelDisplay();
            console.log(`✅ Added ${amount} XP`);
        } catch (error) {
            console.error('Error adding XP:', error);
        }
    },

    /**
     * Calculate level from total XP
     */
    calculateLevel(totalXP) {
        const level = Math.floor(totalXP / this.XP_PER_LEVEL) + 1;
        return Math.min(level, this.MAX_LEVEL);
    },

    /**
     * Get XP needed for next level
     */
    getXPForNextLevel(totalXP) {
        const currentLevel = this.calculateLevel(totalXP);
        const nextLevelXP = currentLevel * this.XP_PER_LEVEL;
        return Math.max(0, nextLevelXP - totalXP);
    },

    /**
     * Get current level progress (0-100%)
     */
    getLevelProgress(totalXP) {
        const currentLevel = this.calculateLevel(totalXP);
        const currentLevelXP = (currentLevel - 1) * this.XP_PER_LEVEL;
        const nextLevelXP = currentLevel * this.XP_PER_LEVEL;
        const xpInCurrentLevel = totalXP - currentLevelXP;
        const xpNeededForLevel = nextLevelXP - currentLevelXP;
        return (xpInCurrentLevel / xpNeededForLevel) * 100;
    },

    /**
     * Celebrate level up
     */
    celebrateLevelUp(level) {
        const title = this.LEVEL_TITLES[level] || `Level ${level}`;
        const badge = this.LEVEL_BADGES[level] || '⭐';

        // Show animation modal using our new level-up-modal structure
        const modal = document.getElementById('level-up-modal');
        if (modal) {
            const newLevelEl = document.getElementById('level-up-new-level');
            const newRankEl = document.getElementById('level-up-new-rank');
            const iconEl = modal.querySelector('.level-up-icon');
            const xpRewardEl = document.getElementById('level-up-xp-reward');
            const coinRewardEl = document.getElementById('level-up-coin-reward');

            if (newLevelEl) newLevelEl.textContent = `Level ${level}`;
            if (newRankEl) newRankEl.textContent = title;
            if (iconEl) iconEl.textContent = badge;
            const bonusCoins = 100 + (level * 10);
            if (xpRewardEl) xpRewardEl.textContent = `+${level * 50} XP Bonus`;
            if (coinRewardEl) coinRewardEl.textContent = `+${bonusCoins} Coins`;

            modal.style.display = 'flex';
            modal.classList.add('animate');
            setTimeout(() => modal.classList.remove('animate'), 1000);
        }

        // Notification
        if (this._app && this._app.showNotification) {
            this._app.showNotification(`🎉 Level Up! You are now Level ${level} - ${title}!`, 'success');
        }

        // Add bonus coins
        const bonusCoins = 100 + (level * 10);
        if (this._app && this._app.userProgress) {
            this._app.userProgress.quizCoins = (this._app.userProgress.quizCoins || 0) + bonusCoins;
        }
    },

    /**
     * Update level display in UI
     */
    updateLevelDisplay() {
        if (!this._app || !this._app.userProgress) return;
        const userData = this._app.userProgress;
        const level = userData.userLevel || 1;
        const totalXP = userData.levelExp || 0;
        const title = this.LEVEL_TITLES[level] || `Level ${level}`;
        const badge = this.LEVEL_BADGES[level] || '⭐';
        const progress = this.getLevelProgress(totalXP);
        const nextLevelXP = this.getXPForNextLevel(totalXP);

        // Update profile display
        const profileLevel = document.getElementById('profile-user-level');
        if (profileLevel) {
            profileLevel.innerHTML = `
                <div class="level-info">
                    <span class="level-badge">${badge}</span>
                    <div class="level-details">
                        <h3>Level ${level}</h3>
                        <p>${title}</p>
                    </div>
                </div>
                <div class="level-progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <small>${totalXP.toLocaleString()} / ${(level * this.XP_PER_LEVEL).toLocaleString()} XP</small>
                </div>
            `;
        }

        // Update leaderboard display
        const leaderboardLevel = document.querySelectorAll('.user-level-badge');
        leaderboardLevel.forEach(el => {
            el.innerHTML = `${badge} Lv${level}`;
        });
    },

    /**
     * Get level bonuses
     */
    getLevelBonuses(level) {
        return {
            coinMultiplier: 1 + (level * 0.05), // 5% per level
            questRewardMultiplier: 1 + (level * 0.02), // 2% per level
            lifelinesDiscountPercent: Math.min(50, level * 2), // Max 50% discount
            dailyChallengeCoins: 10 + (level * 5)
        };
    },

    /**
     * Display user's level badge on profile/leaderboard
     */
    getBadgeHTML(level) {
        const badge = this.LEVEL_BADGES[level] || '⭐';
        const title = this.LEVEL_TITLES[level] || `Level ${level}`;
        return `<span class="level-badge" title="${title}">${badge} ${level}</span>`;
    }
};
