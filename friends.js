// friends.js - Contains all logic for the friends list feature.

const QuizifyFriends = {
    _app: null,

    /**
     * Initializes the friends module.
     * @param {object} app - The main QuizifyApp object.
     */
    init(app) {
        this._app = app;
        const searchInput = document.getElementById('add-friend-search-input');
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => this.handleFriendSearch(e));
        }
    },

    /**
     * Sends a friend request to another user.
     * @param {string} friendId - The user ID of the person to send a request to.
     */
    async sendFriendRequest(friendId) {
        this._app.showNotification('Sending request...', 'info');
        const currentUserId = this._app.getOrCreateUserId();
        if (currentUserId === friendId) return;

        const currentUserRef = this._app.userProgressCollection.doc(currentUserId);
        const friendUserRef = this._app.userProgressCollection.doc(friendId);

        try {
            const batch = this._app.db.batch();
            // Use set with merge to safely create/update the nested friends map
            batch.set(currentUserRef, { friends: { [friendId]: 'pending_sent' } }, { merge: true });
            batch.set(friendUserRef, { friends: { [currentUserId]: 'pending_received' } }, { merge: true });

            // The old way using update would fail if the 'friends' map didn't exist yet.
            // batch.update(currentUserRef, { [`friends.${friendId}`]: 'pending_sent' });
            // batch.update(friendUserRef, { [`friends.${currentUserId}`]: 'pending_received' });
            await batch.commit();

            this._app.showNotification('Friend request sent!', 'success');

            // NEW: Update local state for immediate UI refresh
            if (!this._app.userProgress.friends) this._app.userProgress.friends = {};
            this._app.userProgress.friends[friendId] = 'pending_sent';

            // Refresh the button in the in-chat profile modal
            const actionsEl = document.getElementById('chat-profile-actions');
            if (actionsEl) QuizifyChat.updateFriendStatusButton(actionsEl, friendId);

            // Refresh the main friends list and search results if they are visible
            const profilePage = document.getElementById('profile-page');
            if (profilePage.classList.contains('active')) {
                this.displayFriends();
                // Also refresh search results if the user was searching
                this.displaySearchResults(this._app.userProgress.friends || {});
            }
        } catch (error) {
            console.error("Error sending friend request:", error);
            this._app.showNotification('Could not send friend request.', 'error');
        }
    },

    /**
     * Accepts an incoming friend request.
     * @param {string} friendId - The user ID of the person whose request to accept.
     */
    async acceptFriendRequest(friendId) {
        const currentUserId = this._app.getOrCreateUserId();

        const currentUserRef = this._app.userProgressCollection.doc(currentUserId);
        const friendUserRef = this._app.userProgressCollection.doc(friendId);

        try {
            const batch = this._app.db.batch();
            batch.update(currentUserRef, { [`friends.${friendId}`]: 'friend' });
            batch.update(friendUserRef, { [`friends.${currentUserId}`]: 'friend' });
            await batch.commit();

            this._app.showNotification('Friend request accepted!', 'success');

            // NEW: Update local state for immediate UI refresh
            if (this._app.userProgress.friends) {
                this._app.userProgress.friends[friendId] = 'friend';
            } else {
                this._app.userProgress.friends = { [friendId]: 'friend' };
            }

            this.displayFriends(); // Refresh the friends list view
        } catch (error) {
            console.error("Error accepting friend request:", error);
            this._app.showNotification('Could not accept request.', 'error');
        }
    },

    /**
     * Declines or cancels a friend request.
     * @param {string} friendId - The user ID of the other person.
     */
    async declineFriendRequest(friendId) {
        const currentUserId = this._app.getOrCreateUserId();
        const FieldValue = firebase.firestore.FieldValue;

        const currentUserRef = this._app.userProgressCollection.doc(currentUserId);
        const friendUserRef = this._app.userProgressCollection.doc(friendId);

        try {
            const batch = this._app.db.batch();
            // Use FieldValue.delete() to remove a specific key from a map
            batch.update(currentUserRef, { [`friends.${friendId}`]: FieldValue.delete() });
            batch.update(friendUserRef, { [`friends.${currentUserId}`]: FieldValue.delete() });
            await batch.commit();

            this._app.showNotification('Friend request declined.', 'info');

            // NEW: Update local state for immediate UI refresh
            if (this._app.userProgress.friends && this._app.userProgress.friends[friendId]) {
                delete this._app.userProgress.friends[friendId];
            }

            this.displayFriends(); // Refresh the friends list view
        } catch (error) {
            console.error("Error declining friend request:", error);
            this._app.showNotification('Could not decline request.', 'error');
        }
    },

    /**
     * Removes an existing friend.
     * @param {string} friendId - The user ID of the friend to remove.
     */
    async removeFriend(friendId) {
        if (!confirm('Are you sure you want to remove this friend?')) return;
        // This uses the same logic as declining a request.
        // The local state will be updated inside declineFriendRequest.
        await this.declineFriendRequest(friendId);
        this._app.showNotification('Friend removed.', 'success');
        // No need to call displayFriends() here, as declineFriendRequest already does.
    },

    /**
     * Fetches and displays the user's friends and friend requests.
     */
    async displayFriends() {
        const friendsListEl = document.getElementById('friends-list-container');
        const requestsListEl = document.getElementById('friend-requests-container');
        if (!friendsListEl || !requestsListEl) return;

        // Use a more modern loading state
        friendsListEl.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';
        requestsListEl.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';

        const friendsMap = this._app.userProgress.friends || {};
        const friendIds = Object.keys(friendsMap);

        if (friendIds.length === 0) {
            friendsListEl.innerHTML = '<p class="setting-description">You have no friends yet. Add friends from their chat profiles.</p>';
            requestsListEl.innerHTML = '<p class="setting-description">No pending requests.</p>';
            return;
        }

        let friendsHtml = '';
        let requestsHtml = '';

        for (const id of friendIds) {
            const status = friendsMap[id];
            try {
                const userDoc = await this._app.userProgressCollection.doc(id).get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    const itemHtml = this.createFriendCard(id, userData, status);
                    if (status === 'friend') {
                        friendsHtml += itemHtml;
                    } else if (status === 'pending_received') {
                        requestsHtml += itemHtml;
                    }
                }
            } catch (error) {
                console.error(`Error fetching friend data for ${id}:`, error);
            }
        }

        friendsListEl.innerHTML = friendsHtml || '<p class="setting-description">You haven\'t added any friends yet. Use the search bar above to find friends!</p>';
        requestsListEl.innerHTML = requestsHtml || '<p class="setting-description">No pending friend requests.</p>'; // This was step 1, but I've renumbered for clarity
    },

    /**
     * NEW: Creates a friend card HTML string.
     * @param {string} id - The friend's user ID.
     * @param {object} userData - The friend's user data from Firestore.
     * @param {string} status - The friendship status.
     * @returns {string} HTML string for the card.
     */
    createFriendCard(id, userData, status) {
        const actions = this.getFriendActionButtons(id, status);
        return `
            <div class="friend-card">
                <div class="friend-card-avatar">${userData.activeAvatar || '👤'}</div>
                <div class="friend-card-info">
                    <span class="friend-card-name">${userData.userName || 'Anonymous'}</span>
                    <div class="friend-card-stats">
                        <span>🏆 ${userData.averageScore ? userData.averageScore.toFixed(0) : 0}% Avg</span>
                        <span>🔥 ${userData.streak || 0} Streak</span>
                    </div>
                </div>
                <div class="friend-card-actions">
                    ${actions}
                </div>
            </div>
        `;
    },

    /**
     * NEW: Handles the friend search input.
     * @param {Event} e - The keyup event object.
     */
    async handleFriendSearch(e) {
        const query = e.target.value.trim().toLowerCase();
        const resultsContainer = document.getElementById('friend-search-results');
        
        if (query.length < 3) {
            resultsContainer.style.display = 'none';
            return;
        }

        resultsContainer.style.display = 'block';
        resultsContainer.innerHTML = '<div class="spinner-container" style="padding: 1rem 0;"><div class="spinner" style="width: 24px; height: 24px;"></div></div>';

        try {
            // Firestore does not support case-insensitive or partial text search natively.
            // A simple approach is to fetch users and filter client-side.
            // For a large-scale app, a dedicated search service like Algolia would be better.
            const snapshot = await this._app.userProgressCollection.get();
            const currentUserId = this._app.getOrCreateUserId();
            const friendsMap = this._app.userProgress.friends || {};

            const searchResults = [];
            snapshot.forEach(doc => {
                const userData = doc.data();
                if (doc.id !== currentUserId && userData.userName && userData.userName.toLowerCase().includes(query)) {
                    searchResults.push({ id: doc.id, ...userData });
                }
            });

            this._lastSearchResults = searchResults; // Cache results
            this.displaySearchResults(friendsMap);

        } catch (error) {
            console.error("Error searching for friends:", error);
            resultsContainer.innerHTML = '<div class="friend-search-result">Error searching. Please try again.</div>';
        }
    },

    /**
     * NEW: Displays the search results.
     * @param {object} friendsMap - The current user's friend status map.
     */
    displaySearchResults(friendsMap) {
        const resultsContainer = document.getElementById('friend-search-results');
        resultsContainer.innerHTML = '';

        if (!this._lastSearchResults || this._lastSearchResults.length === 0) {
            resultsContainer.innerHTML = '<div class="friend-search-result">No users found.</div>';
            return;
        }

        this._lastSearchResults.forEach(user => {
            const resultItem = document.createElement('div');
            resultItem.className = 'friend-search-result';
            const status = friendsMap[user.id];

            let actionButton = '';
            switch (status) {
                case 'friend':
                    actionButton = `<button class="btn btn--sm btn--secondary" disabled>✔️ Friends</button>`;
                    break;
                case 'pending_sent':
                    actionButton = `<button class="btn btn--sm btn--secondary" disabled>⏳ Sent</button>`;
                    break;
                case 'pending_received':
                    actionButton = `<button class="btn btn--sm btn--primary" onclick="QuizifyFriends.acceptFriendRequest('${user.id}')">Accept</button>`;
                    break;
                default:
                    actionButton = `<button class="btn btn--sm" onclick="QuizifyFriends.sendFriendRequest('${user.id}')">Add</button>`;
            }

            resultItem.innerHTML = `
                <div class="friend-item-avatar">${user.activeAvatar || '👤'}</div>
                <span class="friend-item-name">${user.userName}</span>
                <div class="friend-search-actions">
                    ${actionButton}
                </div>
            `;
            resultsContainer.appendChild(resultItem);
        });
    },

    /**
     * Generates the correct action buttons for a user in the friends list.
     * @param {string} friendId - The ID of the friend.
     * @param {string} status - The friendship status.
     * @returns {string} HTML string for the buttons.
     */
    getFriendActionButtons(friendId, status) {
        switch (status) {
            case 'friend':
                return `<button class="btn btn--sm btn--secondary" onclick="QuizifyFriends.messageFriend('${friendId}')">Message</button>
                        <button class="btn btn--sm btn--outline btn--danger" onclick="QuizifyFriends.removeFriend('${friendId}')">Remove</button>`;
            case 'pending_received':
                return `<button class="btn btn--sm btn--primary" onclick="QuizifyFriends.acceptFriendRequest('${friendId}')">Accept</button>
                        <button class="btn btn--sm btn--outline" onclick="QuizifyFriends.declineFriendRequest('${friendId}')">Decline</button>`;
            default:
                return '';
        }
    },

    /**
     * Placeholder for messaging a friend.
     * @param {string} friendId - The ID of the friend to message.
     */
    messageFriend(friendId) {
        // This is a placeholder for a future private messaging feature.
        // For now, it could open the global chat and pre-fill a message.
        this._app.showFeatureComingSoonModal();
        console.log(`Initiate private message with ${friendId}`);
    }
};
