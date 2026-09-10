// battle-pass.js - Seasonal battle pass system

const BattlePass = {
    _app: null,
    _db: null,
    _currentSeason: null,
    _seasonProgress: {},
    _isPremium: false,

    SEASONS: [
        {
            id: 'season_1_spring_2026',
            name: 'Spring Knowledge Surge',
            number: 1,
            startDate: '2026-04-01',
            endDate: '2026-06-30',
            duration: 90,
            premium_price: 499 // coins
        },
        {
            id: 'season_2_summer_2026',
            name: 'Summer Excellence',
            number: 2,
            startDate: '2026-07-01',
            endDate: '2026-09-30',
            duration: 90,
            premium_price: 499
        }
    ],

    FREE_TIER_REWARDS: [
        { tier: 1, reward: 'Avatar: 🎓', type: 'avatar', icon: '🎓' },
        { tier: 5, reward: '+100 Coins', type: 'coins', amount: 100 },
        { tier: 10, reward: 'Badge: Rising Star', type: 'badge', icon: '⭐' },
        { tier: 15, reward: '+250 Coins', type: 'coins', amount: 250 },
        { tier: 20, reward: 'Lifeline: 50-50', type: 'lifeline', count: 2 },
        { tier: 25, reward: 'Badge: Consistent', type: 'badge', icon: '🔥' },
        { tier: 30, reward: '+500 Coins', type: 'coins', amount: 500 }
    ],

    PREMIUM_TIER_REWARDS: [
        { tier: 2, reward: 'Theme: Ocean Blue', type: 'theme', id: 'ocean' },
        { tier: 7, reward: '+300 Coins', type: 'coins', amount: 300 },
        { tier: 12, reward: 'Avatar: 👩‍🚀', type: 'avatar', icon: '👩‍🚀' },
        { tier: 18, reward: 'Theme: Midnight Purple', type: 'theme', id: 'midnight' },
        { tier: 24, reward: 'Badge: Legend', type: 'badge', icon: '👑' },
        { tier: 30, reward: 'Avatar: 🧙', type: 'avatar', icon: '🧙' },
        { tier: 35, reward: 'Theme: Cyberpunk Neon', type: 'theme', id: 'cyberpunk' },
        { tier: 40, reward: 'Badge: Supreme', type: 'badge', icon: '💎' },
        { tier: 50, reward: 'Season Trophy', type: 'trophy', icon: '🏆' }
    ],

    init(app) {
        this._app = app;
        this.loadCurrentSeason();
        this.loadSeasonProgress();
    },

    // Alias for renderBattlePass
    renderBattlePass() {
        this.displayBattlePass();
    },

    /**
     * Load current season
     */
    loadCurrentSeason() {
        const now = new Date();
        this._currentSeason = this.SEASONS.find(s => {
            const start = new Date(s.startDate);
            const end = new Date(s.endDate);
            return now >= start && now <= end;
        });

        if (!this._currentSeason) {
            this._currentSeason = this.SEASONS[this.SEASONS.length - 1];
        }

        console.log('📅 Current season:', this._currentSeason.name);
    },

    /**
     * Load user's season progress from localStorage
     */
    loadSeasonProgress() {
        try {
            const saved = localStorage.getItem('battlePassProgress_' + this._currentSeason.id);
            if (saved) {
                this._seasonProgress = JSON.parse(saved);
            } else {
                this._seasonProgress = { tier: 0, progress: 0, isPremium: false };
            }
            this._isPremium = this._seasonProgress.isPremium || false;
            this.displayBattlePass();
        } catch (error) {
            console.error('Error loading season progress:', error);
            this._seasonProgress = { tier: 0, progress: 0, isPremium: false };
        }
    },

    /**
     * Display battle pass UI
     */
    displayBattlePass() {
        const container = document.getElementById('battle-pass-container');
        if (!container) return;

        const season = this._currentSeason;
        const progress = this._seasonProgress;

        const daysLeft = this.calculateDaysLeft();
        const completionPercent = (progress.progress / 100) * 100;

        let html = `
            <div class="battle-pass-header">
                <h2>${season.name}</h2>
                <p>Season ${season.number} · ${daysLeft} days remaining</p>
                
                <div class="battle-pass-tier">
                    <div class="tier-badge">${progress.tier}/50</div>
                    <div class="tier-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${completionPercent}%"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="battle-pass-tabs">
                <button class="bp-tab-btn active" onclick="BattlePass.showTier('free')">📖 Free</button>
                <button class="bp-tab-btn" onclick="BattlePass.showTier('premium')">
                    ⭐ Premium ${!this._isPremium ? `(${season.premium_price} coins)` : '(Owned)'}
                </button>
            </div>

            <div class="battle-pass-rewards">
                ${this.generateRewardTiers()}
            </div>
        `;

        container.innerHTML = html;
    },

    /**
     * Generate reward tiers
     */
    generateRewardTiers() {
        const allRewards = [...this.FREE_TIER_REWARDS];
        if (this._isPremium) {
            allRewards.push(...this.PREMIUM_TIER_REWARDS);
        }

        let html = '';
        allRewards.sort((a, b) => a.tier - b.tier);

        allRewards.forEach((reward, index) => {
            const isClaimed = this._seasonProgress.tier >= reward.tier;
            const rewardIcon = this.getRewardIcon(reward);

            html += `
                <div class="reward-tier ${isClaimed ? 'claimed' : ''}" style="--tier: ${reward.tier}">
                    <div class="tier-number">Tier ${reward.tier}</div>
                    <div class="reward-icon">${rewardIcon}</div>
                    <div class="reward-name">${reward.reward}</div>
                    ${isClaimed ? '<div class="claimed-badge">✅ Claimed</div>' : ''}
                </div>
            `;
        });

        return html;
    },

    /**
     * Get reward icon
     */
    getRewardIcon(reward) {
        switch (reward.type) {
            case 'avatar': return reward.icon;
            case 'theme': return '🎨';
            case 'badge': return reward.icon;
            case 'coins': return '💰';
            case 'lifeline': return '🎯';
            case 'trophy': return '🏆';
            default: return '📦';
        }
    },

    /**
     * Show specific tier (free/premium) - re-renders rewards filtered by type
     */
    showTier(tierType) {
        document.querySelectorAll('.bp-tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        const rewardsContainer = document.querySelector('.battle-pass-rewards');
        if (!rewardsContainer) return;

        const rewards = tierType === 'premium' ?
            this.PREMIUM_TIER_REWARDS : this.FREE_TIER_REWARDS;

        let html = '';
        rewards.forEach(reward => {
            const isClaimed = this._seasonProgress.tier >= reward.tier;
            const rewardIcon = this.getRewardIcon(reward);
            const isLocked = tierType === 'premium' && !this._isPremium;

            html += `
                <div class="reward-tier ${isClaimed ? 'claimed' : ''} ${isLocked ? 'locked' : ''}">
                    <div class="tier-number">Tier ${reward.tier}</div>
                    <div class="reward-icon">${isLocked ? '🔒' : rewardIcon}</div>
                    <div class="reward-name">${isLocked ? 'Premium Only' : reward.reward}</div>
                    ${isClaimed ? '<div class="claimed-badge">✅ Claimed</div>' : ''}
                </div>
            `;
        });

        rewardsContainer.innerHTML = html;
    },

    /**
     * Buy premium battle pass
     */
    async buyPremiumBattlePass() {
        const season = this._currentSeason;

        if (this._app.userProgress.quizCoins < season.premium_price) {
            this._app.showNotification('Not enough coins!', 'error');
            return;
        }

        try {
            // Deduct coins
            this._app.userProgress.quizCoins -= season.premium_price;
            this._seasonProgress.isPremium = true;
            this._isPremium = true;

            // Save to Firestore
            const userId = this._app.getOrCreateUserId();
            await this._db.collection('battle_pass').doc(userId).set({
                [season.id]: this._seasonProgress
            }, { merge: true });

            await saveUserProgress();
            this._app.updateCoinDisplay();
            this.displayBattlePass();

            this._app.showNotification('Premium Battle Pass activated! 🎉', 'success');
        } catch (error) {
            console.error('Error buying premium:', error);
        }
    },

    /**
     * Update progress (called after quiz completion)
     */
    updateProgress(quizScore) {
        try {
            // Each quiz adds points (1-10 based on score)
            const pointsEarned = Math.max(1, Math.ceil((quizScore / 100) * 10));
            this._seasonProgress.progress = (this._seasonProgress.progress || 0) + pointsEarned;

            // Check for tier up (every 100 points = 1 tier)
            const newTier = Math.floor(this._seasonProgress.progress / 100);
            if (newTier > (this._seasonProgress.tier || 0)) {
                this._seasonProgress.tier = newTier;
                this.celebrateTierUp(newTier);
            }

            // Save progress to localStorage
            localStorage.setItem('battlePassProgress_' + this._currentSeason.id,
                JSON.stringify(this._seasonProgress));

            this.displayBattlePass();
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    },

    /**
     * Celebrate tier up
     */
    celebrateTierUp(tier) {
        const allRewards = [...this.FREE_TIER_REWARDS];
        if (this._isPremium) {
            allRewards.push(...this.PREMIUM_TIER_REWARDS);
        }

        const reward = allRewards.find(r => r.tier === tier);
        if (reward) {
            this._app.showNotification(`🎉 Tier ${tier} reached! Reward: ${reward.reward}`, 'success');
        }
    },

    /**
     * Calculate days remaining in season
     */
    calculateDaysLeft() {
        const endDate = new Date(this._currentSeason.endDate);
        const now = new Date();
        const diff = endDate - now;
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
};
