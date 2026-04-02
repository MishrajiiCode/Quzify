// friends.js - Contains all logic for the friends list feature.

const QuizifyFriends = {
    _app: null,
    _db: null,

    /**
     * Initializes the friends module.
     * @param {object} app - The main QuizifyApp object.
     */
    init(app, db) {
        this._app = app;
        this._db = db;
        const searchInput = document.getElementById('add-friend-search-input');
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => this.handleFriendSearch(e));
        }
        
        // Initialize community tabs and posts
        this.initCommunityTabs();
        this.initCommunityPosts();
    },

    /**
     * Sends a friend request to another user.
     * @param {string} friendId - The user ID of the person to send a request to.
     */
    async sendFriendRequest(friendId) {
        // Show a transient sending notice (will be cleared/updated on success or failure)
        this._app.showNotification('Sending request...', 'info');
        const currentUserId = this._app.getOrCreateUserId();
        if (currentUserId === friendId) return;

        // Use the global Firestore references (these are initialized in app.js)
        const currentUserRef = userProgressCollection.doc(currentUserId);
        const friendUserRef = userProgressCollection.doc(friendId);

    const actionsEl = document.getElementById('in-chat-profile-actions') || document.getElementById('chat-profile-actions');

        try {
            const batch = db.batch();
            // Use set with merge to safely create/update the nested friends map
            batch.set(currentUserRef, { friends: { [friendId]: 'pending_sent' } }, { merge: true });
            batch.set(friendUserRef, { friends: { [currentUserId]: 'pending_received' } }, { merge: true });

            await batch.commit();

            this._app.showNotification('Friend request sent!', 'success');

            // Update local state for immediate UI refresh
            if (!this._app.userProgress.friends) this._app.userProgress.friends = {};
            this._app.userProgress.friends[friendId] = 'pending_sent';

            // Refresh the main friends list and search results if they are visible
            const profilePage = document.getElementById('profile-page');
            if (profilePage && profilePage.classList.contains('active')) {
                this.displayFriends();
                // Also refresh search results if the user was searching
                this.displaySearchResults(this._app.userProgress.friends || {});
            }
        } catch (error) {
            console.error("Error sending friend request:", error);
            this._app.showNotification('Could not send friend request.', 'error');
        } finally {
            // Always refresh the profile actions button to remove any transient spinner state
            if (actionsEl) QuizifyChat.updateFriendStatusButton(actionsEl, friendId);
        }
    },

    /**
     * Accepts an incoming friend request.
     * @param {string} friendId - The user ID of the person whose request to accept.
     */
    async acceptFriendRequest(friendId) {
        const currentUserId = this._app.getOrCreateUserId();

        const currentUserRef = userProgressCollection.doc(currentUserId);
        const friendUserRef = userProgressCollection.doc(friendId);

        try {
            const batch = db.batch();
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

        const currentUserRef = userProgressCollection.doc(currentUserId);
        const friendUserRef = userProgressCollection.doc(friendId);

        try {
            const batch = db.batch();
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
                const userDoc = await userProgressCollection.doc(id).get();
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
            const snapshot = await userProgressCollection.get();
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
    },

    // ===== COMMUNITY POSTS FEATURE =====

    /**
     * Initializes the community posts feature.
     */
    initCommunityPosts() {
        const postsContainer = document.getElementById('community-posts-container');
        if (!postsContainer) return;

        // Add post creation UI
        this.createPostCreationUI(postsContainer);
        
        // Load existing posts and community stats
        this.loadCommunityPosts();
        this.loadCommunityStats();
    },

    /**
     * Initializes community tab functionality.
     */
    initCommunityTabs() {
        const tabButtons = document.querySelectorAll('.community-tab-btn');
        const tabContents = document.querySelectorAll('.community-tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const tabId = button.dataset.tab;
                document.getElementById(tabId).classList.add('active');
                
                // Load content for the tab
                this.loadTabContent(tabId);
            });
        });
    },

    /**
     * Loads content for a specific tab.
     * @param {string} tabId - The ID of the tab to load content for.
     */
    async loadTabContent(tabId) {
        switch(tabId) {
            case 'leaderboard':
                await this.loadCommunityLeaderboard();
                break;
            case 'challenges':
                this.loadCommunityChallenges();
                break;
            case 'discussions':
                await this.loadCommunityDiscussions();
                break;
            case 'feed':
            default:
                // Feed is already loaded
                break;
        }
    },

    /**
     * Loads community statistics.
     */
    async loadCommunityStats() {
        let usersCount = 0;
        let postsCount = 0;
        let totalComments = 0;

        try {
            if (!this._db) throw new Error('Firestore not initialized');

            // Prefer explicit users collection if available; fallback to userProgress if not
                // Fetch directly from userProgress to get the accurate user count as requested
            let usersSnapshot;
            try {
                usersSnapshot = await this._db.collection('users').get();
                    usersSnapshot = await this._db.collection('userProgress').get();
            } catch (e) {
                console.warn('users collection not available, falling back to userProgress:', e);
                usersSnapshot = await this._db.collection('userProgress').get();
                    console.warn('Error fetching userProgress collection:', e);
            }

            usersCount = usersSnapshot ? usersSnapshot.size : 0;

            let postsSnapshot;
            try {
                postsSnapshot = await this._db.collection('communityPosts').get();
                postsCount = postsSnapshot.size;
                postsSnapshot.forEach(doc => {
                    const comments = doc.data().comments || [];
                    totalComments += comments.length;
                });
            } catch (e) {
                console.warn('communityPosts collection not available, using internal COMMUNITY_POSTS data:', e);
                postsCount = Object.keys(COMMUNITY_POSTS).length;
                totalComments = 0;
            }

            // Ensure non-zero values for UX even when backend is empty
            if (usersCount === 0 && this._app?.userProgress) {
                usersCount = 1; // The current user is at least present
            }

            if (postsCount === 0 && Object.keys(COMMUNITY_POSTS).length > 0) {
                postsCount = Object.keys(COMMUNITY_POSTS).length;
            }
        } catch (error) {
            console.error('Error loading community stats:', error);

            // Fallback to locally available content so UI still shows value
            usersCount = usersCount || (this._app?.userProgress ? 1 : 0);
            postsCount = postsCount || Object.keys(COMMUNITY_POSTS).length;
            totalComments = totalComments || 0;
        }

        if (document.getElementById('community-user-count')) {
            document.getElementById('community-user-count').textContent = String(usersCount);
        }
        if (document.getElementById('community-post-count')) {
            document.getElementById('community-post-count').textContent = String(postsCount);
        }
        if (document.getElementById('community-comment-count')) {
            document.getElementById('community-comment-count').textContent = String(totalComments);
        }
    },

    /**
     * Loads community leaderboard.
     */
    async loadCommunityLeaderboard() {
        const leaderboardList = document.getElementById('community-leaderboard-list');
        leaderboardList.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';
        
        try {
            const usersSnapshot = await this._db.collection('userProgress')
                .orderBy('averageScore', 'desc')
                .limit(10)
                .get();
            
            leaderboardList.innerHTML = '';
            
            usersSnapshot.forEach((doc, index) => {
                const userData = doc.data();
                const rank = index + 1;
                const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '🏅';
                
                const leaderboardItem = document.createElement('div');
                leaderboardItem.className = 'leaderboard-item';
                leaderboardItem.innerHTML = `
                    <div class="leaderboard-rank">${medal} ${rank}</div>
                    <div class="leaderboard-avatar">${userData.activeAvatar || '👤'}</div>
                    <div class="leaderboard-info">
                        <div class="leaderboard-name">${userData.userName || 'Anonymous'}</div>
                        <div class="leaderboard-score">${userData.averageScore ? userData.averageScore.toFixed(1) : 0}% Avg</div>
                    </div>
                    <div class="leaderboard-stats">
                        <div>${userData.totalQuizzesTaken || 0} Quizzes</div>
                        <div>🔥 ${userData.streak || 0} Streak</div>
                    </div>
                `;
                leaderboardList.appendChild(leaderboardItem);
            });
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            leaderboardList.innerHTML = '<p>Failed to load leaderboard.</p>';
        }
    },

    /**
     * Loads community challenges.
     */
    loadCommunityChallenges() {
        const challengesList = document.getElementById('community-challenges-list');
        
        const challenges = [
            {
                title: 'Weekly Quiz Master',
                description: 'Complete 10 quizzes this week',
                reward: '50 Quiz Coins',
                progress: 7,
                total: 10,
                icon: '🎯'
            },
            {
                title: 'Perfect Score Hunter',
                description: 'Get 100% in any mock test',
                reward: '100 Quiz Coins',
                progress: 0,
                total: 1,
                icon: '💯'
            },
            {
                title: 'Social Butterfly',
                description: 'Make 5 friends and post 3 times',
                reward: '25 Quiz Coins',
                progress: 3,
                total: 8,
                icon: '🦋'
            }
        ];
        
        challengesList.innerHTML = '';
        
        challenges.forEach(challenge => {
            const challengeItem = document.createElement('div');
            challengeItem.className = 'challenge-item';
            const progressPercent = (challenge.progress / challenge.total) * 100;
            
            challengeItem.innerHTML = `
                <div class="challenge-icon">${challenge.icon}</div>
                <div class="challenge-content">
                    <h3>${challenge.title}</h3>
                    <p>${challenge.description}</p>
                    <div class="challenge-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercent}%"></div>
                        </div>
                        <span>${challenge.progress}/${challenge.total}</span>
                    </div>
                    <div class="challenge-reward">Reward: ${challenge.reward}</div>
                </div>
            `;
            challengesList.appendChild(challengeItem);
        });
    },

    /**
     * Loads community discussions.
     */
    async loadCommunityDiscussions() {
        const discussionsList = document.getElementById('community-discussions-list');
        discussionsList.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';
        
        try {
            const postsSnapshot = await this._db.collection('communityPosts')
                .orderBy('timestamp', 'desc')
                .limit(5)
                .get();
            
            discussionsList.innerHTML = '';
            
            postsSnapshot.forEach(doc => {
                const postData = { id: doc.id, ...doc.data() };
                const discussionItem = document.createElement('div');
                discussionItem.className = 'discussion-item';
                discussionItem.innerHTML = `
                    <div class="discussion-avatar">${postData.authorAvatar || '👤'}</div>
                    <div class="discussion-content">
                        <h3>${postData.authorName}</h3>
                        <p>${this.truncateText(postData.content, 100)}</p>
                        <div class="discussion-stats">
                            ❤️ ${postData.likes?.length || 0} • 💬 ${postData.comments?.length || 0}
                        </div>
                    </div>
                `;
                discussionItem.addEventListener('click', () => this.openDiscussion(postData.id));
                discussionsList.appendChild(discussionItem);
            });
        } catch (error) {
            console.error('Error loading discussions:', error);
            discussionsList.innerHTML = '<p>Failed to load discussions.</p>';
        }
    },

    /**
     * Truncates text to a specified length.
     * @param {string} text - The text to truncate.
     * @param {number} maxLength - The maximum length.
     * @returns {string} The truncated text.
     */
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },

    /**
     * Opens a discussion (switches to feed tab and scrolls to post).
     * @param {string} postId - The ID of the post to open.
     */
    openDiscussion(postId) {
        // Switch to feed tab
        document.querySelector('[data-tab="feed"]').click();
        
        // Scroll to the post after a short delay
        setTimeout(() => {
            const postElement = document.querySelector(`[data-post-id="${postId}"]`);
            if (postElement) {
                postElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                postElement.style.animation = 'highlight 2s ease';
            }
        }, 300);
    },

    /**
     * Creates the UI for creating new posts.
     * @param {HTMLElement} container - The container to add the UI to.
     */
    createPostCreationUI(container) {
        const postCreationDiv = document.createElement('div');
        postCreationDiv.className = 'post-creation-card';
        postCreationDiv.innerHTML = `
            <div class="post-creation-header">
                <div class="user-avatar">${this._app.userProgress?.activeAvatar || '👤'}</div>
                <div class="post-input-container">
                    <textarea id="new-post-text" placeholder="Share your thoughts, achievements, or questions..." maxlength="500"></textarea>
                    <div class="post-actions">
                        <button id="post-submit-btn" class="btn btn--primary btn--sm">Post</button>
                        <span id="post-char-count">500</span>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(postCreationDiv);

        // Add event listeners
        const postText = document.getElementById('new-post-text');
        const charCount = document.getElementById('post-char-count');
        const submitBtn = document.getElementById('post-submit-btn');

        postText.addEventListener('input', () => {
            charCount.textContent = 500 - postText.value.length;
        });

        submitBtn.addEventListener('click', () => this.createNewPost());
    },

    /**
     * Creates a new community post.
     */
    async createNewPost() {
        const postText = document.getElementById('new-post-text').value.trim();
        if (!postText) {
            this._app.showNotification('Please write something to post.', 'warning');
            return;
        }

        const currentUserId = this._app.getOrCreateUserId();
        const postData = {
            authorId: currentUserId,
            authorName: this._app.userProgress?.userName || 'Anonymous',
            authorAvatar: this._app.userProgress?.activeAvatar || '👤',
            content: postText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            likes: [],
            comments: []
        };

        try {
            await this._db.collection('communityPosts').add(postData);
            document.getElementById('new-post-text').value = '';
            document.getElementById('post-char-count').textContent = '500';
            this._app.showNotification('Post created successfully!', 'success');
            this.loadCommunityPosts(); // Refresh posts
        } catch (error) {
            console.error('Error creating post:', error);
            this._app.showNotification('Failed to create post.', 'error');
        }
    },

    /**
     * Loads and displays community posts.
     */
    async loadCommunityPosts() {
        const postsContainer = document.getElementById('community-posts-container');
        if (!postsContainer) return;

        // Clear existing posts (keep the creation UI)
        const existingPosts = postsContainer.querySelectorAll('.community-post-card');
        existingPosts.forEach(post => post.remove());

        try {
            const snapshot = await this._db.collection('communityPosts')
                .orderBy('timestamp', 'desc')
                .limit(20)
                .get();

            if (snapshot.empty) {
                const noPostsDiv = document.createElement('div');
                noPostsDiv.className = 'no-posts-message';
                noPostsDiv.innerHTML = `
                    <div class="no-posts-icon">📝</div>
                    <h3>No posts yet</h3>
                    <p>Be the first to share something with the community!</p>
                `;
                postsContainer.appendChild(noPostsDiv);
                return;
            }

            snapshot.forEach(doc => {
                const postData = { id: doc.id, ...doc.data() };
                const postElement = this.createPostElement(postData);
                postsContainer.appendChild(postElement);
            });
        } catch (error) {
            console.error('Error loading posts:', error);
            this._app.showNotification('Failed to load posts.', 'error');
        }
    },

    /**
     * Creates a post element for display.
     * @param {object} postData - The post data.
     * @returns {HTMLElement} The post element.
     */
    createPostElement(postData) {
        const postDiv = document.createElement('div');
        postDiv.className = 'community-post-card';
        
        const currentUserId = this._app.getOrCreateUserId();
        const isLiked = postData.likes?.includes(currentUserId);
        const timeAgo = this.getTimeAgo(postData.timestamp);

        postDiv.innerHTML = `
            <div class="post-header">
                <div class="post-author">
                    <div class="post-avatar">${postData.authorAvatar || '👤'}</div>
                    <div class="post-author-info">
                        <span class="post-author-name">${postData.authorName}</span>
                        <span class="post-timestamp">${timeAgo}</span>
                    </div>
                </div>
                ${postData.authorId === currentUserId ? 
                    `<button class="post-menu-btn" onclick="QuizifyFriends.showPostMenu('${postData.id}')">⋯</button>` : 
                    ''}
            </div>
            <div class="post-content">
                <p>${this.formatPostContent(postData.content)}</p>
            </div>
            <div class="post-actions">
                <button class="post-action-btn ${isLiked ? 'liked' : ''}" onclick="QuizifyFriends.toggleLike('${postData.id}')">
                    ❤️ ${postData.likes?.length || 0}
                </button>
                <button class="post-action-btn" onclick="QuizifyFriends.showComments('${postData.id}')">
                    💬 ${postData.comments?.length || 0}
                </button>
                <button class="post-action-btn" onclick="QuizifyFriends.sharePost('${postData.id}')">
                    📤 Share
                </button>
            </div>
            <div class="post-comments" id="comments-${postData.id}" style="display: none;">
                <div class="comments-list" id="comments-list-${postData.id}">
                    <!-- Comments will be loaded here -->
                </div>
                <div class="add-comment">
                    <input type="text" placeholder="Write a comment..." id="comment-input-${postData.id}" maxlength="200">
                    <button onclick="QuizifyFriends.addComment('${postData.id}')">Post</button>
                </div>
            </div>
        `;

        return postDiv;
    },

    /**
     * Formats post content with basic text processing.
     * @param {string} content - The raw post content.
     * @returns {string} Formatted content.
     */
    formatPostContent(content) {
        // Simple formatting: convert URLs to links, etc.
        return content.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    },

    /**
     * Gets a human-readable time ago string.
     * @param {Date|Timestamp} timestamp - The timestamp.
     * @returns {string} Time ago string.
     */
    getTimeAgo(timestamp) {
        if (!timestamp) return 'Just now';
        
        const now = new Date();
        const postTime = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const diffMs = now - postTime;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    },

    /**
     * Toggles like on a post.
     * @param {string} postId - The post ID.
     */
    async toggleLike(postId) {
        const currentUserId = this._app.getOrCreateUserId();
        
        try {
            const postRef = this._db.collection('communityPosts').doc(postId);
            const postDoc = await postRef.get();
            if (!postDoc.exists) return;

            const postData = postDoc.data();
            const likes = postData.likes || [];
            const isLiked = likes.includes(currentUserId);

            if (isLiked) {
                await postRef.update({
                    likes: firebase.firestore.FieldValue.arrayRemove(currentUserId)
                });
            } else {
                await postRef.update({
                    likes: firebase.firestore.FieldValue.arrayUnion(currentUserId)
                });
            }

            this.loadCommunityPosts(); // Refresh to show updated likes
        } catch (error) {
            console.error('Error toggling like:', error);
            this._app.showNotification('Failed to update like.', 'error');
        }
    },

    /**
     * Shows/hides comments for a post.
     * @param {string} postId - The post ID.
     */
    async showComments(postId) {
        const commentsDiv = document.getElementById(`comments-${postId}`);
        const commentsList = document.getElementById(`comments-list-${postId}`);
        
        if (commentsDiv.style.display === 'block') {
            commentsDiv.style.display = 'none';
            return;
        }

        commentsDiv.style.display = 'block';
        
        // Load comments
        try {
            const postDoc = await this._db.collection('communityPosts').doc(postId).get();
            if (!postDoc.exists) return;

            const comments = postDoc.data().comments || [];
            commentsList.innerHTML = '';
            
            if (comments.length === 0) {
                commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first!</p>';
                return;
            }

            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment-item';
                commentDiv.innerHTML = `
                    <div class="comment-avatar">${comment.authorAvatar || '👤'}</div>
                    <div class="comment-content">
                        <span class="comment-author">${comment.authorName}</span>
                        <p>${comment.content}</p>
                        <span class="comment-time">${this.getTimeAgo(comment.timestamp)}</span>
                    </div>
                `;
                commentsList.appendChild(commentDiv);
            });
        } catch (error) {
            console.error('Error loading comments:', error);
            commentsList.innerHTML = '<p class="error-message">Failed to load comments.</p>';
        }
    },

    /**
     * Adds a comment to a post.
     * @param {string} postId - The post ID.
     */
    async addComment(postId) {
        const commentInput = document.getElementById(`comment-input-${postId}`);
        const commentText = commentInput.value.trim();
        
        if (!commentText) {
            this._app.showNotification('Please write a comment.', 'warning');
            return;
        }

        const currentUserId = this._app.getOrCreateUserId();
        const commentData = {
            authorId: currentUserId,
            authorName: this._app.userProgress?.userName || 'Anonymous',
            authorAvatar: this._app.userProgress?.activeAvatar || '👤',
            content: commentText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        try {
            await this._db.collection('communityPosts').doc(postId).update({
                comments: firebase.firestore.FieldValue.arrayUnion(commentData)
            });
            
            commentInput.value = '';
            this.showComments(postId); // Refresh comments
            this._app.showNotification('Comment added!', 'success');
        } catch (error) {
            console.error('Error adding comment:', error);
            this._app.showNotification('Failed to add comment.', 'error');
        }
    },

    /**
     * Shares a post (placeholder for future implementation).
     * @param {string} postId - The post ID.
     */
    sharePost(postId) {
        // For now, just copy a shareable link or show a modal
        navigator.clipboard.writeText(`${window.location.origin}?post=${postId}`);
        this._app.showNotification('Post link copied to clipboard!', 'success');
    },

    /**
     * Shows a menu for post actions (delete, etc.).
     * @param {string} postId - The post ID.
     */
    showPostMenu(postId) {
        // Simple confirmation for delete
        if (confirm('Delete this post?')) {
            this.deletePost(postId);
        }
    },

    /**
     * Deletes a post.
     * @param {string} postId - The post ID.
     */
    async deletePost(postId) {
        try {
            await this._db.collection('communityPosts').doc(postId).delete();
            this.loadCommunityPosts(); // Refresh posts
            this._app.showNotification('Post deleted.', 'info');
        } catch (error) {
            console.error('Error deleting post:', error);
            this._app.showNotification('Failed to delete post.', 'error');
        }
    }
};
