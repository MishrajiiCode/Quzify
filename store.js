// store.js - Contains all logic for the in-app currency store.


const QuizifyStore = {
    // Configuration for all store items
    STORE_ITEMS: {
        lifelines: [
            { id: 'fiftyFifty', name: '50-50', icon: '🎭', description: 'Removes two incorrect options.', cost: 25 },
            { id: 'hint', name: 'Hint', icon: '💡', description: 'Get a clue for the question.', cost: 15 },
            { id: 'skip', name: 'Skip', icon: '⏩', description: 'Skip a tough question.', cost: 10 },
            { id: 'timeFreeze', name: 'Time Freeze', icon: '❄️', description: 'Pauses the timer for 30 seconds.', cost: 40 }
        ],
        // NEW: Purchasable themes
        themes: [
            { id: 'ocean', name: 'Ocean Blue', icon: '🌊', description: 'A cool and calming blue theme.', cost: 200 },
            { id: 'forest', name: 'Forest Green', icon: '🌲', description: 'A fresh and natural green look.', cost: 200, isPremium: false },
            { id: 'sunset', name: 'Sunset Orange', icon: '🌅', description: 'A warm and vibrant orange theme.', cost: 250, isPremium: false, isNew: true },
            { id: 'midnight', name: 'Midnight Purple', icon: '🌃', description: 'A sleek and mysterious dark theme.', cost: 500, isPremium: true },
            { id: 'crimson', name: 'Crimson Night', icon: '🌹', description: 'A bold and powerful dark red theme.', cost: 500, isPremium: true },
            { id: 'emerald', name: 'Emerald Dark', icon: '🌲', description: 'A deep and elegant dark green theme.', cost: 500, isPremium: true },
            { id: 'cyberpunk', name: 'Cyberpunk Neon', icon: '🤖', description: 'A futuristic theme with neon highlights.', cost: 600, isPremium: true }
        ],
        avatars: [
            { id: '🧑‍🎓', name: 'Student', icon: '🧑‍🎓', description: 'Show your scholarly side.', cost: 50 },
            { id: '👩‍🚀', name: 'Astronaut', icon: '👩‍🚀', description: 'For out-of-this-world knowledge.', cost: 100 },
            { id: '🕵️', name: 'Detective', icon: '🕵️', description: 'For the keen-eyed quizzer.', cost: 100 },
            { id: '🧑‍💻', name: 'Coder', icon: '🧑‍💻', description: 'For the logical problem-solver.', cost: 150 },
            { id: '🦸', name: 'Superhero', icon: '🦸', description: 'For heroic quiz performance.', cost: 250, isPremium: false },
            { id: '🧙', name: 'Wizard', icon: '🧙', description: 'For magical quiz-solving skills.', cost: 500, isPremium: true, isNew: true },
            { id: '🥷', name: 'Ninja', icon: '🥷', description: 'For swift and silent victories.', cost: 500, isPremium: true }
        ]
    },

    // NEW: Utility items
    UTILITY_ITEMS: {
        practice_unlock: { id: 'practice_unlock', name: 'Practice Unlock Token', icon: '🔑', description: 'Unlock any practice set without passing the previous one.', cost: 75 },
        review_unlock: { id: 'review_unlock', name: 'Review Unlock Token', icon: '🔍', description: 'Use this token to review the answers of a quiz you failed.', cost: 50, isPremium: true },
        coin_booster: { id: 'coin_booster', name: 'Double Coin Booster', icon: '💰💰', description: 'Doubles the coin reward from your next completed quiz.', cost: 100, isPremium: true }
    },
    
    // This will hold references to the main app's state and functions
    _app: null,

    // NEW: To temporarily hold item details for confirmation
    _pendingPurchase: null,

    // NEW: To temporarily hold item details for selling
    _pendingSell: null,

    // NEW: To hold the generated daily deals for the session
    _dailyDeals: [],

    // NEW: To hold the featured item for the session
    _featuredItem: null,

    // NEW: To hold the interval ID for the deals countdown timer
    _dealsTimerInterval: null,

    /**
     * Initializes the store module.
     * @param {object} app - An object containing the necessary state and functions from app.js.
     */
    init(app) {
        this._app = app;
        this.initializeEventListeners();
        this.initializeUpdatesModal(); // NEW
    },

    /**
     * Sets up event listeners for the store page.
     */
    initializeEventListeners() {
        const storePage = document.getElementById('store-page');
        if (storePage) {
            // Use event delegation to handle clicks on buy buttons
            storePage.addEventListener('click', (e) => {
                if (e.target.classList.contains('buy-lifeline-btn')) {
                    const itemType = e.target.dataset.type;
                    const itemId = e.target.dataset.id;
                    this.showPurchaseConfirmation(itemType, itemId);
                }
                // NEW: Handle sell button clicks
                if (e.target.classList.contains('sell-item-btn')) {
                    const itemType = e.target.dataset.type;
                    const itemId = e.target.dataset.id;
                    this.showSellConfirmation(itemType, itemId);
                }
            });

        }

        // NEW: Handle tab switching - This should be separate from the storePage delegation
        const tabsContainer = document.querySelector('.store-tabs');
        if (tabsContainer) {
            tabsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('store-tab-btn')) {
                    const tabId = e.target.dataset.tab;
                    
                    // Update button active state
                    document.querySelectorAll('.store-tab-btn').forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');

                    // NEW: Render content for the clicked tab on demand
                    const itemCategories = ['avatars-tab', 'themes-tab', 'lifelines-tab', 'utilities-tab'];
                    if (itemCategories.includes(tabId)) {
                        this.renderCategoryTab(tabId);
                    }

                    // Update content active state
                    document.querySelectorAll('.store-tab-content').forEach(content => content.classList.remove('active'));
                    document.getElementById(tabId).classList.add('active');
                }
            });
        }
        // NEW: Event listeners for the confirmation modal
        const confirmModal = document.getElementById('store-confirm-modal');
        const confirmBtn = document.getElementById('confirm-purchase-btn');
        const cancelBtn = document.getElementById('cancel-purchase-btn');

        if (confirmModal && confirmBtn && cancelBtn) {
            const closeModal = () => {
                confirmModal.classList.remove('visible');
                this._pendingPurchase = null; // Clear pending purchase
            };

            cancelBtn.addEventListener('click', closeModal);
            confirmModal.addEventListener('click', (e) => {
                if (e.target === confirmModal) closeModal();
            });

            confirmBtn.addEventListener('click', () => {
                if (this._pendingPurchase) {
                    this.purchaseItem(this._pendingPurchase.type, this._pendingPurchase.id, this._pendingPurchase.cost);
                    closeModal();
                }
            });
        }

        // NEW: Event listeners for the sell confirmation modal
        const sellConfirmModal = document.getElementById('store-sell-confirm-modal');
        const confirmSellBtn = document.getElementById('confirm-sell-btn');
        const cancelSellBtn = document.getElementById('cancel-sell-btn');

        if (sellConfirmModal && confirmSellBtn && cancelSellBtn) {
            const closeSellModal = () => {
                sellConfirmModal.classList.remove('visible');
                this._pendingSell = null; // Clear pending sale
            };

            cancelSellBtn.addEventListener('click', closeSellModal);
            sellConfirmModal.addEventListener('click', (e) => {
                if (e.target === sellConfirmModal) closeSellModal();
            });

            confirmSellBtn.addEventListener('click', () => {
                if (this._pendingSell) {
                    this.sellItem(this._pendingSell.type, this._pendingSell.id, this._pendingSell.cost);
                    closeSellModal();
                }
            });
        }
    },

    /**
     * NEW: Initializes the store updates modal.
     */
    initializeUpdatesModal() {
        const modal = document.getElementById('store-updates-modal');
        const closeBtn = document.getElementById('close-store-updates-btn');
        if (!modal || !closeBtn) return;

        const closeModal = () => modal.classList.remove('visible');
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    },


    /**
     * Renders the store page and displays it.
     */
    displayStorePage() {
        // NEW: Reset to the default tab each time the store is opened
        document.querySelectorAll('.store-tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.store-tab-btn[data-tab="daily-deals-tab"]').classList.add('active');
        document.querySelectorAll('.store-tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById('daily-deals-tab').classList.add('active');

        this.generateFeaturedItem(); // NEW
        this.generateDailyDeals();
        this.startDealsCountdown(); // NEW: Start the timer
        this.showStoreUpdatesModal(); // NEW: Show the updates modal if needed
        this.renderStoreItems();
        this._app.showPage('store-page');
    },


    /**
     * Dynamically creates and displays the items available for purchase in the store.
     */
    renderStoreItems() {
        const dealsGrid = document.getElementById('daily-deals-grid');
        const featuredSection = document.getElementById('featured-item-section'); // NEW
        if (!dealsGrid) return;

        dealsGrid.innerHTML = ''; // Clear existing deals
        // Clear other tabs to ensure they re-render with fresh data on next click
        this.clearTabContent(['avatars-tab', 'themes-tab', 'lifelines-tab', 'utilities-tab']);
        
        // Update the coin balance display on the store page
        const balanceDisplay = document.getElementById('store-coin-balance-display');
        if (balanceDisplay) {
            balanceDisplay.textContent = this._app.quizCoins;
        }

        // NEW: Render Featured Item
        featuredSection.innerHTML = '';
        if (this._featuredItem) {
            const itemCard = this.createFeaturedItemCard(this._featuredItem.type, this._featuredItem);
            featuredSection.appendChild(itemCard);
            featuredSection.style.display = 'block';
        }

        // Render Daily Deals
        this._dailyDeals.forEach(deal => {
            const itemCard = this.createStoreItemCard(deal.type, deal, true);
            dealsGrid.appendChild(itemCard);
        });
        if (this._dailyDeals.length === 0) {
            dealsGrid.innerHTML = '<p>No special deals today. Check back tomorrow!</p>';
        }
    },

    /**
     * NEW: Renders items for a specific category tab.
     * @param {string} tabId - The ID of the tab content container (e.g., 'avatars-tab').
     */
    renderCategoryTab(tabId) {
        const container = document.getElementById(tabId);
        if (!container || container.hasChildNodes()) return; // Don't re-render if already populated

        const itemType = tabId.replace('-tab', ''); // 'avatars-tab' -> 'avatars'
        let itemsToRender = [];
        
        if (itemType === 'utilities') {
            itemsToRender = Object.values(this.UTILITY_ITEMS);
        } else {
            itemsToRender = this.STORE_ITEMS[itemType] || [];
        }

        if (itemsToRender.length === 0) {
            container.innerHTML = '<p>No items in this category yet. Check back soon!</p>';
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'store-item-grid';

        itemsToRender.forEach(item => {
            // Exclude items that are part of daily deals or featured, as they are on the first tab
            const isFeatured = this._featuredItem && this._featuredItem.id === item.id && this._featuredItem.type === itemType;
            const isDailyDeal = this._dailyDeals.some(d => d.id === item.id && d.type === itemType);

            if (!isDailyDeal) { // Only exclude items that are part of a daily deal, but allow the featured item to show.
                const itemCard = this.createStoreItemCard(itemType, item, false);
                grid.appendChild(itemCard);
            }
        });
        if (grid.hasChildNodes()) {
            container.appendChild(grid);
        }
    },

    /**
     * Creates an HTML element for a store item.
     */
    createStoreItemCard(itemType, item, isDeal = false) {
        const itemCard = document.createElement('div');
        itemCard.className = 'store-item';
        if (isDeal) itemCard.classList.add('daily-deal');

        // NEW: Add a class for premium items to make them stand out
        if (item.isPremium && !isDeal) { // Don't apply premium style if it's a deal
            itemCard.classList.add('premium-item');
        }

        let isPurchased = false;
        if (itemType === 'utilities') {
            isPurchased = false; 
        } else {
            isPurchased = this._app.purchasedItems?.[itemType]?.includes(item.id);
        }

        const currentCost = isDeal ? item.discountedCost : item.cost;
        const canAfford = this._app.quizCoins >= currentCost;

        let actionsHtml = '';
        let priceHtml = `
            <div class="store-item-price">
                <span class="coin-icon">💰</span>
                <span>${item.cost}</span>
            </div>
        `;

        if (isDeal) {
            priceHtml = `
                <div class="store-item-price discounted">
                    <span class="original-price">💰${item.cost}</span>
                    <span class="coin-icon">💰</span>
                    <strong>${item.discountedCost}</strong>
                </div>
            `;
        }

        if (isPurchased) {
            actionsHtml = `<button class="buy-lifeline-btn owned-item-btn" disabled>Owned</button>`;
        } else {
            const buttonText = itemType === 'utilities' ? 'Buy Token' : 'Buy Now';
            actionsHtml = `<button class="buy-lifeline-btn" data-type="${itemType}" data-id="${item.id}" data-cost="${currentCost}" ${!canAfford ? 'disabled' : ''}>${buttonText}</button>`;
        }

        itemCard.innerHTML = `
            <div class="store-item-icon">${item.icon}</div>
            <h3>${item.name}</h3>
            <p class="store-item-description">${item.description}</p>
            ${priceHtml}
            ${actionsHtml}
        `;

        if (isDeal && item.discountPercentage) {
            const discountBadge = document.createElement('div');
            discountBadge.className = 'discount-badge';
            discountBadge.textContent = `${Math.round(item.discountPercentage * 100)}% OFF`;
            itemCard.prepend(discountBadge);
        }
        return itemCard;
    },

    /**
     * NEW: Creates the specific HTML element for the featured store item.
     * @param {string} itemType - The category of the item.
     * @param {object} item - The item data.
     * @returns {HTMLElement} The created card element.
     */
    createFeaturedItemCard(itemType, item) {
        const content = document.createElement('div');
        content.className = 'featured-item-content';

        const canAfford = this._app.quizCoins >= item.cost;
        const isPurchased = this._app.purchasedItems?.[itemType]?.includes(item.id);

        let buttonHtml = '';
        if (isPurchased) {
            buttonHtml = `<button class="buy-lifeline-btn owned-item-btn" disabled>Owned</button>`;
        } else {
            buttonHtml = `<button class="buy-lifeline-btn" data-type="${itemType}" data-id="${item.id}" data-cost="${item.cost}" ${!canAfford ? 'disabled' : ''}>Buy Now for 💰${item.cost}</button>`;
        }

        content.innerHTML = `
            <div class="store-item-icon">${item.icon}</div>
            <div class="featured-item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                ${buttonHtml}
            </div>
        `;
        return content;
    },

    /**
     * NEW: Selects a premium item to feature for the week.
     */
    generateFeaturedItem() {
        const premiumItems = [
            ...this.STORE_ITEMS.themes.filter(i => i.isPremium).map(item => ({ ...item, type: 'themes' })),
            ...this.STORE_ITEMS.avatars.filter(i => i.isPremium).map(item => ({ ...item, type: 'avatars' }))
        ];

        if (premiumItems.length === 0) {
            this._featuredItem = null;
            return;
        }

        const today = new Date();
        const weekOfYear = Math.floor(today.getDate() / 7); // Simple weekly seed
        const seed = today.getFullYear() * 100 + weekOfYear;
        const featuredIndex = seed % premiumItems.length;

        this._featuredItem = premiumItems[featuredIndex];
    },

    /**
     * NEW: Starts the countdown timer for daily deals.
     */
    startDealsCountdown() {
        if (this._dealsTimerInterval) {
            clearInterval(this._dealsTimerInterval);
        }

        const timerEl = document.getElementById('daily-deals-timer');
        if (!timerEl) return;

        const updateTimer = () => {
            const now = new Date();
            const endOfDay = new Date(now);
            endOfDay.setHours(23, 59, 59, 999);

            const timeLeft = endOfDay - now;

            if (timeLeft < 0) {
                timerEl.textContent = "00:00:00";
                clearInterval(this._dealsTimerInterval);
                // Optionally, refresh deals here
                return;
            }

            const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
            const seconds = Math.floor((timeLeft / 1000) % 60);

            timerEl.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        };

        updateTimer(); // Initial call
        this._dealsTimerInterval = setInterval(updateTimer, 1000);
    },

    /**
     * NEW: Stops the countdown timer for daily deals.
     */
    stopDealsCountdown() {
        clearInterval(this._dealsTimerInterval);
        this._dealsTimerInterval = null;
    },

    /**
     * NEW: Generates a deterministic set of daily deals.
     */
    generateDailyDeals() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const seed = today.getFullYear() * 1000 + dayOfYear;

        const allPurchasableItems = [
            ...this.STORE_ITEMS.lifelines.map(item => ({ ...item, type: 'lifelines' })),
            ...this.STORE_ITEMS.themes.filter(t => !['system', 'light', 'dark'].includes(t.id)).map(item => ({ ...item, type: 'themes' })),
            ...this.STORE_ITEMS.avatars.filter(a => a.id !== '👤').map(item => ({ ...item, type: 'avatars' })),
        ];

        // Filter out the featured item from the potential deals
        const potentialDealItems = allPurchasableItems.filter(item => 
            !this._featuredItem || (item.id !== this._featuredItem.id || item.type !== this._featuredItem.type)
        );

        // Simple pseudo-random shuffle based on the daily seed
        const shuffled = allPurchasableItems.sort((a, b) => {
            const valA = (seed + a.id.charCodeAt(0)) % allPurchasableItems.length;
            const valB = (seed + b.id.charCodeAt(0)) % allPurchasableItems.length;
            return valA - valB;
        });

        // Select 2 items for the deal
        this._dailyDeals = shuffled.slice(0, 2).map(item => {
            const discountPercentage = item.isPremium ? 0.30 : 0.20; // 30% for premium, 20% for regular
            const discountedCost = Math.floor(item.cost * (1 - discountPercentage));
            return { ...item, discountedCost };
        });
    },

    /**
     * NEW: Clears the content of specified tabs.
     * @param {string[]} tabIds - An array of tab content IDs to clear.
     */
    clearTabContent(tabIds) {
        tabIds.forEach(id => {
            const container = document.getElementById(id);
            if (container) container.innerHTML = '';
        });
    },
    /**
     * NEW: Shows a confirmation modal before purchasing an item.
     * @param {string} itemType - The category of the item.
     * @param {string} itemId - The specific ID of the item.
     */
    showPurchaseConfirmation(itemType, itemId) {
        // NEW: Intercept clicks on utility items and show the "Coming Soon" modal.
        if (itemType === 'utilities') {
            this._app.showFeatureComingSoonModal();
            return; // Stop further execution for this item type.
        }

        // Check if the item is a daily deal to get the correct price
        const dealItem = this._dailyDeals.find(d => d.id === itemId && d.type === itemType);
        let item;

        if (dealItem) {
            item = { ...dealItem, cost: dealItem.discountedCost }; // Use discounted cost for confirmation
        } else if (itemType === 'utilities') {
            item = this.UTILITY_ITEMS[itemId];
        } else {
            item = this.STORE_ITEMS[itemType]?.find(i => i.id === itemId);
        }

        if (!item) return;

        // Store item details for when the user confirms
        this._pendingPurchase = { type: itemType, id: itemId, cost: item.cost };

        const modal = document.getElementById('store-confirm-modal');
        const itemDetailsEl = document.getElementById('store-confirm-item-details'); // NEW
        const itemCostEl = document.getElementById('store-confirm-item-cost');
        const currentBalanceEl = document.getElementById('store-confirm-current-balance');
        const newBalanceEl = document.getElementById('store-confirm-new-balance');
        const confirmPurchaseBtn = document.getElementById('confirm-purchase-btn'); // To enable/disable

        if (!modal || !itemDetailsEl || !itemCostEl || !currentBalanceEl || !newBalanceEl || !confirmPurchaseBtn) return;

        // Populate item details section
        itemDetailsEl.innerHTML = `
            <div class="store-item-icon">${item.icon}</div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;
        
        const currentCoins = this._app.quizCoins;
        const newCoins = currentCoins - item.cost;

        itemCostEl.textContent = item.cost;
        currentBalanceEl.textContent = currentCoins;
        newBalanceEl.textContent = newCoins;

        // Visual feedback for affordability
        if (newCoins < 0) {
            newBalanceEl.style.color = 'var(--color-error)';
            confirmPurchaseBtn.disabled = true;
            confirmPurchaseBtn.textContent = 'Not Enough Coins';
        } else {
            newBalanceEl.style.color = 'var(--color-success)';
            confirmPurchaseBtn.disabled = false;
            confirmPurchaseBtn.textContent = 'Confirm Purchase';
        }
        // Show the modal
        modal.classList.add('visible');
    },

    /**
     * NEW: Shows a confirmation modal before selling an item.
     * @param {string} itemType - The category of the item.
     * @param {string} itemId - The specific ID of the item.
     */
    showSellConfirmation(itemType, itemId) {
        const item = this.STORE_ITEMS[itemType]?.find(i => i.id === itemId);
        if (!item) return;

        this._pendingSell = { type: itemType, id: itemId, cost: item.cost };

        const modal = document.getElementById('store-sell-confirm-modal');
        const itemDetailsEl = document.getElementById('store-sell-item-details');
        const itemCostEl = document.getElementById('store-sell-item-cost');
        const refundAmountEl = document.getElementById('store-sell-refund-amount');
        const newBalanceEl = document.getElementById('store-sell-new-balance');

        if (!modal || !itemDetailsEl || !itemCostEl || !refundAmountEl || !newBalanceEl) return;
        
        const refundAmount = Math.floor(item.cost * 0.30); // 30% refund
        const currentCoins = this._app.quizCoins;
        const newCoins = currentCoins + refundAmount;

        // Populate item details section
        itemDetailsEl.innerHTML = `
            <div class="store-item-icon">${item.icon}</div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;

        itemCostEl.textContent = item.cost;
        refundAmountEl.textContent = refundAmount;
        newBalanceEl.textContent = newCoins;
        newBalanceEl.style.color = 'var(--color-success)'; // Always show new balance in green for a sale

        modal.classList.add('visible');
    },

    /**
     * Handles the logic for purchasing a lifeline.
     * @param {string} type - The type of lifeline to purchase (e.g., 'fiftyFifty').
     * @param {number} cost - The cost of the lifeline in Quiz Coins.
     */
    purchaseLifeline(type, cost) {
        if (this._app.quizCoins >= cost) {
            this._app.userProgress.quizCoins = (this._app.userProgress.quizCoins || 0) - cost;
            this._app.userProgress.lifelines[type]++;
            this._app.saveUserProgress();
            this.renderStoreItems(); // Re-render to update coin display
            this._app.updateCoinDisplay();
            this._app.updateLifelineDisplay();
            const lifelineName = type === 'fiftyFifty' ? '50-50' : type.charAt(0).toUpperCase() + type.slice(1);
            this._app.showPurchaseSuccessModal(`1 x ${lifelineName} Lifeline`);
        } else {
            this._app.showNotification("Not enough Quiz Coins! Complete quizzes to earn more.", 'error');
        }
    },

    /**
     * Handles the logic for purchasing an avatar.
     * @param {object} item - The full avatar item object.
     * @param {number} cost - The cost of the avatar in Quiz Coins.
     */
    purchaseAvatar(item, cost) {
        if (this._app.quizCoins >= cost) {
            this._app.userProgress.quizCoins = (this._app.userProgress.quizCoins || 0) - cost;
            if (!this._app.purchasedItems.avatars.includes(item.id)) {
                this._app.purchasedItems.avatars.push(item.id);
            }
            this._app.userProgress.purchasedItems = this._app.purchasedItems;
            this._app.saveUserProgress();
            this.renderStoreItems(); // Re-render to update UI
            this._app.updateCoinDisplay();
            this._app.showPurchaseSuccessModal(`Avatar: ${item.name}`);
        } else {
            this._app.showNotification("Not enough Quiz Coins! Complete quizzes to earn more.", 'error');
        }
    },

    /**
     * NEW: Handles the logic for purchasing a theme.
     * @param {object} theme - The full theme item object.
     * @param {number} cost - The cost of the theme in Quiz Coins.
     */
    purchaseTheme(theme, cost) {
        if (this._app.quizCoins >= cost) {
            this._app.userProgress.quizCoins = (this._app.userProgress.quizCoins || 0) - cost;
            if (!this._app.purchasedItems.themes.includes(theme.id)) {
                this._app.purchasedItems.themes.push(theme.id);
            }
            this._app.userProgress.purchasedItems = this._app.purchasedItems;
            this._app.saveUserProgress();
            this.renderStoreItems(); // Re-render to update UI
            this._app.updateCoinDisplay();
            this._app.showPurchaseSuccessModal(`Theme: ${theme.name}`);
        } else {
            this._app.showNotification("Not enough Quiz Coins!", 'error');
        }
    },

    /**
     * NEW: Handles logic for purchasing a utility item.
     */
    purchaseUtility(id, cost) {
        // This is a placeholder. The actual logic for using utilities will be in app.js.
        // For now, we just add it to the user's inventory.
    },

    /**
     * Generic purchase handler that delegates to specific handlers.
     * @param {string} itemType - The category of the item ('lifelines' or 'avatars').
     * @param {string} itemId - The specific ID of the item.
     * @param {number} cost - The cost of the item.
     */
    purchaseItem(itemType, itemId) {
        // Find the item from the correct source to get its full details
        let item;
        if (itemType === 'utilities') {
            item = this.UTILITY_ITEMS[itemId];
        } else {
            item = this.STORE_ITEMS[itemType]?.find(i => i.id === itemId);
        }

        if (!item) {
            console.error(`Item to purchase not found: type=${itemType}, id=${itemId}`);
            this._app.showNotification('An unexpected error occurred. Please try again.', 'error');
            return;
        }

        if (itemType === 'avatars') {
            const avatar = this.STORE_ITEMS.avatars.find(a => a.id === itemId);
            if (avatar) this.purchaseAvatar(avatar, avatar.cost);
        } else if (itemType === 'themes') {
            const theme = this.STORE_ITEMS.themes.find(t => t.id === itemId);
            if (theme) this.purchaseTheme(theme, theme.cost);
        } else if (itemType === 'lifelines') {
            const lifeline = this.STORE_ITEMS.lifelines.find(l => l.id === itemId);
            if (lifeline) this.purchaseLifeline(lifeline, lifeline.cost);
        } else if (itemType === 'utilities') {
            // This logic is currently handled in `showPurchaseConfirmation` to show the "Coming Soon" modal.
        }
    },

    /**
     * NEW: Generic sell handler that delegates to specific handlers.
     * @param {string} itemType - The category of the item ('avatars').
     * @param {string} itemId - The specific ID of the item.
     * @param {number} cost - The original cost of the item.
     */
    sellItem(itemType, itemId, cost) {
        // Find the full item object to get its name for the success message.
        // It could be a regular item or a daily deal item.
        let item = this.STORE_ITEMS[itemType]?.find(i => i.id === itemId);
        if (!item) {
            item = this._dailyDeals.find(d => d.id === itemId && d.type === itemType);
        }

        // Defensive check: If item is not found, log an error and notify the user.
        if (!item) {
            console.error(`Error: Item not found for selling. Type: ${itemType}, ID: ${itemId}`);
            this._app.showNotification('Error: Item not found for sale. Please refresh the page.', 'error');
            return;
        }

        if (itemType === 'avatars') {
            const refundAmount = Math.floor(cost * 0.30); // Use 30% refund
            this._app.userProgress.quizCoins = (this._app.userProgress.quizCoins || 0) + refundAmount;

            // Remove avatar from purchased list
            const avatarIndex = this._app.purchasedItems.avatars.indexOf(itemId);
            if (avatarIndex > -1) {
                this._app.purchasedItems.avatars.splice(avatarIndex, 1);
            }

            // If the sold avatar was active, reset to default
            if (this._app.userProgress.activeAvatar === itemId) {
                this._app.userProgress.activeAvatar = '👤';
                this._app.updateLeaderboardAvatar('👤'); // Update leaderboard
                document.getElementById('profile-avatar-display').textContent = '👤';
            }

            this._app.saveUserProgress();
            // Re-render the specific tab where the item was, not the whole store
            this.clearTabContent([`${itemType}-tab`]);
            this.renderCategoryTab(`${itemType}-tab`);
            this._app.updateCoinDisplay();
            this._app.showSellSuccessModal(item.name, refundAmount);
        } else if (itemType === 'themes') {
            const refundAmount = Math.floor(cost * 0.30); // Use 30% refund
            this._app.userProgress.quizCoins = (this._app.userProgress.quizCoins || 0) + refundAmount;

            // Remove theme from purchased list
            const themeIndex = this._app.purchasedItems.themes.indexOf(itemId);
            if (themeIndex > -1) {
                this._app.purchasedItems.themes.splice(themeIndex, 1);
            }

            // If the sold theme was active, reset to default
            if (this._app.userProgress.theme === itemId) {
                this._app.applyTheme('system'); // This will also save progress and update UI
            } else {
                this._app.saveUserProgress(); // Save if a different theme was active
            }

            // Re-render the specific tab where the item was, not the whole store
            this.clearTabContent([`${itemType}-tab`]);
            this.renderCategoryTab(`${itemType}-tab`);
            this._app.updateCoinDisplay();
            this._app.showSellSuccessModal(item.name, refundAmount);
        }
    }
    ,

    /**
     * NEW: Shows the store updates modal if it hasn't been seen this session.
     */
    showStoreUpdatesModal() {
        if (sessionStorage.getItem('storeUpdatesSeen')) {
            return; // Don't show again in the same session
        }

        const modal = document.getElementById('store-updates-modal');
        const contentEl = document.getElementById('store-updates-content');
        if (!modal || !contentEl) return;

        let updatesHtml = '';

        // 1. Add Daily Deals
        if (this._dailyDeals.length > 0 || this._featuredItem) {
            updatesHtml += '<div class="store-updates-section"><h3>Today\'s Highlights</h3>';
            if (this._featuredItem) {
                updatesHtml += this.createUpdateItemHtml(this._featuredItem, 'Featured');
            }
            this._dailyDeals.forEach(deal => {
                updatesHtml += this.createUpdateItemHtml(deal, 'Deal!');
            });
            updatesHtml += '</div>';
        }

        // 2. Add New Items
        const newItems = [
            ...this.STORE_ITEMS.themes.filter(i => i.isNew).map(item => ({ ...item, type: 'themes' })),
            ...this.STORE_ITEMS.avatars.filter(i => i.isNew).map(item => ({ ...item, type: 'avatars' }))
        ];

        if (newItems.length > 0) {
            updatesHtml += '<div class="store-updates-section"><h3>✨ New Arrivals</h3>';
            newItems.forEach(item => {
                updatesHtml += this.createUpdateItemHtml(item, 'New!');
            });
            updatesHtml += '</div>';
        }

        if (updatesHtml) {
            contentEl.innerHTML = updatesHtml;
            modal.classList.add('visible');
            sessionStorage.setItem('storeUpdatesSeen', 'true');
        }
    },

    createUpdateItemHtml(item, tag) {
        const tagClass = tag.toLowerCase().replace('!', '');
        return `<div class="store-update-item"><span class="store-update-item-icon">${item.icon}</span> <span class="store-update-item-name">${item.name}</span> <span class="store-update-item-tag ${tagClass}">${tag}</span></div>`;
    }
};