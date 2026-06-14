// subscription.js - Handle Subscription Tiers

const QuizifySubscription = {
    _app: null,
    currentTier: 'Free', // Free, Premium, Pro
    
    init(app) {
        this._app = app;
        this.loadSubscription();
        this.renderSubscriptionUI();
    },
    
    loadSubscription() {
        const saved = localStorage.getItem('subscriptionTier');
        if (saved) {
            this.currentTier = saved;
        }
    },
    
    async setSubscription(tier) {
        if (tier === this.currentTier) return;
        
        let cost = 0;
        if (tier === 'Premium') cost = 500;
        if (tier === 'Pro') cost = 1500;
        
        // Confirmation dialog
        if (cost > 0) {
            const confirmed = confirm(`Upgrade to ${tier} for ${cost} coins?\n\nThis will deduct ${cost} coins from your balance.`);
            if (!confirmed) return;
            
            // Check coins — use global userProgress as the source of truth
            const progress = (this._app && this._app.userProgress) || window.userProgress;
            if (!progress || progress.coins < cost) {
                const notify = (this._app && this._app.showNotification) || window.showNotification;
                if (notify) notify('Not enough coins! Earn more by completing quizzes.', 'error');
                return;
            }
            
            // Deduct coins
            progress.coins -= cost;
            if (typeof this._app.updateCoinDisplay === 'function') this._app.updateCoinDisplay();
            else if (typeof window.updateCoinDisplay === 'function') window.updateCoinDisplay();
            
            // Show confetti animation
            if (typeof window.showConfetti === 'function') window.showConfetti();
        }
        
        this.currentTier = tier;
        localStorage.setItem('subscriptionTier', tier);
        
        if (this._app && this._app.showNotification) {
            this._app.showNotification(`Successfully upgraded to ${tier}!`, 'success');
        }
        this.renderSubscriptionUI();
    },
    
    hasAccess(requiredTier) {
        if (this.currentTier === 'Pro') return true;
        if (this.currentTier === 'Premium' && requiredTier !== 'Pro') return true;
        if (this.currentTier === 'Free' && requiredTier === 'Free') return true;
        return false;
    },
    
    renderSubscriptionUI() {
        const container = document.getElementById('subscription-info');
        if (!container) return;
        
        container.innerHTML = `
            <div class="subscription-card" style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; margin-top: 15px;">
                <h3>Current Plan: <span style="color: var(--color-primary);">${this.currentTier}</span></h3>
                <p style="color: #aaa; margin: 10px 0;">
                    ${this.currentTier === 'Free' ? 'Basic quizzes, limited chapters.' : ''}
                    ${this.currentTier === 'Premium' ? 'Full access, no ads, daily challenges.' : ''}
                    ${this.currentTier === 'Pro' ? 'Personalized coaching, priority support, all premium features.' : ''}
                </p>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 15px;">
                    <button class="btn btn--secondary" onclick="QuizifySubscription.setSubscription('Free')" ${this.currentTier === 'Free' ? 'disabled' : ''}>Free (0 Coins)</button>
                    <button class="btn btn--primary" onclick="QuizifySubscription.setSubscription('Premium')" ${this.currentTier === 'Premium' ? 'disabled' : ''}>Premium (500 Coins)</button>
                    <button class="btn btn--success" onclick="QuizifySubscription.setSubscription('Pro')" ${this.currentTier === 'Pro' ? 'disabled' : ''}>Pro (1500 Coins)</button>
                </div>
            </div>
        `;
    }
};

window.QuizifySubscription = QuizifySubscription;
