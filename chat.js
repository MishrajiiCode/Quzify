// chat.js - Contains all logic for the global chat feature.

const QuizifyChat = {
    // Chat-related state variables
    _chatListener: null,
    _isUserScrolledUp: false,
    _typingTimeout: null,
    _onlineUsersListener: null,
    _emojiPicker: null,
    _currentMessageIdForReaction: null,
    _reactions: {}, // To cache reaction data
    _reactionListeners: {}, // To manage reaction listeners
    EMOJI_OPTIONS: ['👍', '❤️', '😂', '😮', '😢', '🙏'],


    // Firebase collection references
    _globalChatCollection: null,
    _onlineUsersCollection: null,
    _userProgressCollection: null, // NEW: To store the reference

    // This will hold references to the main app's state and functions
    _app: null,

    /**
     * Initializes the chat module.
     * @param {object} app - An object containing necessary functions and state from app.js.
     * @param {firebase.firestore.Firestore} db - The Firestore database instance.
     * @param {firebase.firestore.CollectionReference} userProgressCollection - The collection for user progress.
     */
    init(app, db, userProgressCollection) { // MODIFIED: Accept userProgressCollection
        this._app = app;
        this._globalChatCollection = db.collection("globalChat");
        this._onlineUsersCollection = db.collection("onlineUsers");
        this._userProgressCollection = userProgressCollection; // NEW: Store the reference

        // NEW: Check if the app object is valid
        if (!this._app || typeof this._app.getOrCreateUserId !== 'function') {
            console.error("QuizifyChat Error: Invalid app object provided during initialization.");
            // Optionally, disable chat features
            return;
        }

        this.initializeGlobalChatModal();
        this.initializeInChatProfileView(); // MODIFIED: Initialize the new in-chat profile view
        this.initializeEmojiPicker();
    },

    /**
     * Initializes event listeners for the main chat modal.
     */
    initializeGlobalChatModal() {
        const messageInput = document.getElementById('chat-message-input');
        if (messageInput) {
            // Allow sending messages by pressing Enter
            messageInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage();
                }
            });

            // Add typing indicator logic
            messageInput.addEventListener('input', () => {
                // Update character counter
                const charCounter = document.getElementById('char-counter');
                const remaining = 250 - messageInput.value.length;
                charCounter.textContent = remaining;
                charCounter.style.color = remaining < 20 ? 'var(--color-error)' : 'var(--color-text-secondary)';

                // Set user as typing
                this.setUserTypingStatus(true);

                // Clear previous timeout
                clearTimeout(this._typingTimeout);

                // Set a new timeout to mark user as not typing after 1.5 seconds
                this._typingTimeout = setTimeout(() => {
                    this.setUserTypingStatus(false);
                }, 1500);
            });

            // Mark user as not typing if they send the message
            document.getElementById('send-chat-message-btn').addEventListener('click', () => {
                clearTimeout(this._typingTimeout);
                this.setUserTypingStatus(false);
            });
        }
    },

    /**
     * Initializes the in-chat user profile view and its back button.
     */
    initializeInChatProfileView() {
        const backBtn = document.getElementById('back-to-chat-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.showChatMessagesView());
        }
    },

    /**
     * NEW: Shows the main chat messages view and hides the profile view.
     */
    showChatMessagesView() {
        document.getElementById('in-chat-profile-view').style.display = 'none';
        document.getElementById('chat-messages-wrapper').style.display = 'flex';
        document.getElementById('chat-input-container').style.display = 'flex';
        // Restore main chat header
        document.querySelector('#global-chat-modal .chat-header h2').textContent = 'Global Chat';
        document.getElementById('online-user-count').style.display = 'block';
        document.getElementById('close-chat-modal-btn').style.display = 'block';
        document.getElementById('back-to-chat-btn').style.display = 'none';
    },

    /**
     * NEW: Initializes the emoji picker popover.
     */
    initializeEmojiPicker() {
        this._emojiPicker = document.getElementById('emoji-picker');
        const emojiContent = this._emojiPicker.querySelector('.emoji-picker-content');
        emojiContent.innerHTML = this.EMOJI_OPTIONS.map(emoji => `<span class="emoji-option">${emoji}</span>`).join('');

        emojiContent.addEventListener('click', e => {
            if (e.target.classList.contains('emoji-option')) {
                this.addOrUpdateReaction(this._currentMessageIdForReaction, e.target.textContent);
                this.hideEmojiPicker();
            }
        });
    },

    /**
     * Opens the global chat modal and loads messages.
     */
    openGlobalChat() {
        document.getElementById('global-chat-modal').classList.add('visible');
        this.loadAndDisplayChatMessages();
    },

    /**
     * Closes the global chat modal and detaches listeners.
     */
    closeGlobalChat() {
        document.getElementById('global-chat-modal').classList.remove('visible');
        const chatMessagesContainer = document.getElementById('chat-messages');
        chatMessagesContainer.innerHTML = '';

        if (this._chatListener) {
            this._chatListener();
            this._chatListener = null;
        }
        if (this._onlineUsersListener) {
            this._onlineUsersListener();
            this._onlineUsersListener = null;
        }
        this.setUserAsOffline();
    },

    /**
     * Sends a new chat message to Firestore.
     */
    async sendChatMessage() {
        const replyingTo = document.getElementById('chat-message-input').dataset.replyingTo;
        const messageInput = document.getElementById('chat-message-input');
        const messageText = messageInput.value.trim();

        if (messageText === '') return;

        this.setUserTypingStatus(false);
        messageInput.value = '';
        this.clearReplyState();

        const userName = localStorage.getItem('userName') || 'Anonymous';
        const userId = this._app.getOrCreateUserId();
        const userAvatar = this._app.userProgress.activeAvatar || '👤';

        try {
            const messagePayload = {
                text: messageText,
                userName: userName,
                userId: userId,
                avatar: userAvatar,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };

            if (replyingTo) {
                messagePayload.replyTo = JSON.parse(replyingTo);
            }

            await this._globalChatCollection.add(messagePayload);
        } catch (error) {
            console.error("Error sending chat message: ", error);
            this._app.showNotification('Could not send message. Please try again.', 'error');
            messageInput.value = messageText;
        }
    },

    /**
     * Sets up a real-time listener to fetch and display chat messages.
     */
    loadAndDisplayChatMessages() {
        this.setUserAsOnline();

        if (this._chatListener) this._chatListener();
        const chatMessagesContainer = document.getElementById('chat-messages');
        chatMessagesContainer.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';

        if (this._onlineUsersListener) this._onlineUsersListener();
        this._onlineUsersListener = this._onlineUsersCollection.onSnapshot(snapshot => {
            const users = snapshot.docs;
            const onlineCount = users.length;
            const typingUsers = users
                .map(doc => doc.data())
                .filter(user => user.isTyping && user.userId !== this._app.getOrCreateUserId())
                .map(user => user.userName);

            document.getElementById('online-user-count').textContent = `${onlineCount} Online`;
            const typingIndicatorContainer = document.getElementById('typing-indicator-container');
            if (typingUsers.length > 0) {
                let typingText = `${typingUsers.slice(0, 2).join(', ')}`;
                if (typingUsers.length > 2) typingText += ` and ${typingUsers.length - 2} others are typing...`;
                else if (typingUsers.length === 1) typingText += ' is typing...';
                else typingText += ' are typing...';
                typingIndicatorContainer.innerHTML = `<div class="typing-indicator">${typingText}</div>`;
            } else {
                typingIndicatorContainer.innerHTML = '';
            }
        });

        chatMessagesContainer.onscroll = () => {
            const isAtBottom = chatMessagesContainer.scrollHeight - chatMessagesContainer.scrollTop <= chatMessagesContainer.clientHeight + 50;
            this._isUserScrolledUp = !isAtBottom;
            if (isAtBottom) {
                const newMessagesBtn = document.getElementById('new-messages-btn');
                if (newMessagesBtn) newMessagesBtn.remove();
            }
        };

        this._chatListener = this._globalChatCollection.orderBy("timestamp", "asc").limitToLast(50)
            .onSnapshot(snapshot => {
                const spinner = chatMessagesContainer.querySelector('.spinner-container');
                if (spinner) spinner.remove();

                const wasEmpty = chatMessagesContainer.querySelector('.chat-message') === null;

                snapshot.docChanges().forEach(change => {
                    if (change.type === "added") {
                        const messageData = { id: change.doc.id, ...change.doc.data() };
                        this.displayChatMessage(messageData);

                        if (!wasEmpty && messageData.userId !== this._app.getOrCreateUserId()) {
                            const chatSound = document.getElementById('chat-notification-sound');
                            if (chatSound) {
                                chatSound.currentTime = 0;
                                chatSound.play().catch(e => console.log("Chat sound play failed:", e));
                            }
                        }
                    }
                });
                // After processing all changes, update reaction displays
                this.updateAllReactionDisplays();

                if (!this._isUserScrolledUp) {
                    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
                } else {
                    let newMessagesBtn = document.getElementById('new-messages-btn');
                    if (!newMessagesBtn) {
                        newMessagesBtn = document.createElement('button');
                        newMessagesBtn.id = 'new-messages-btn';
                        newMessagesBtn.textContent = '↓ New Messages';
                        newMessagesBtn.onclick = () => chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
                        document.getElementById('chat-input-container').prepend(newMessagesBtn);
                    }
                }
            }, error => {
                console.error("Error fetching chat messages: ", error);
                chatMessagesContainer.innerHTML = '<p>Could not load chat. Please try again later.</p>';
            });
    },

    /**
     * Creates and appends a single chat message element to the chat window.
     * @param {object} message - The message object from Firestore.
     */
    displayChatMessage(message) {
        const chatMessagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.id = `message-${message.id}`;
        messageDiv.className = 'chat-message';

        if (message.userId === this._app.getOrCreateUserId()) {
            messageDiv.classList.add('current-user');
        }

        let replyHtml = '';
        if (message.replyTo) {
            replyHtml = `
                <div class="reply-snippet">
                    <div class="reply-sender">Replying to ${message.replyTo.sender}</div>
                    <div class="reply-text">${message.replyTo.text}</div>
                </div>
            `;
        }

        let timeString = '';
        if (message.timestamp) {
            const date = message.timestamp.toDate();
            timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        messageDiv.innerHTML = `
            <div class="chat-message-avatar" data-userid="${message.userId}" title="View Profile">${message.avatar || '👤'}</div>
            <div class="chat-message-content">
                <div class="chat-bubble-tail"></div>
                <div class="chat-message-header">
                    <span class="chat-message-sender" data-userid="${message.userId}" title="View Profile">${message.userName}</span>
                    <div class="message-meta">
                        <span class="chat-message-timestamp">${timeString}</span>
                        <button class="add-reaction-btn" title="Add reaction" data-message-id="${message.id}">
                            🙂
                        </button>
                        <button class="reply-btn" title="Reply" data-message-id="${message.id}" data-sender="${message.userName}" data-text="${message.text.substring(0, 50)}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path></svg>
                        </button>
                    </div>
                </div>
                ${replyHtml}
                <p class="chat-message-text">${message.text}</p>
                <!-- NEW: Container for reactions -->
                <div class="chat-reactions" id="reactions-${message.id}">
                    <!-- Reactions will be populated here -->
                </div>
            </div>
        `;
        chatMessagesContainer.appendChild(messageDiv);

        if (!messageDiv.classList.contains('current-user')) {
            const profileElements = messageDiv.querySelectorAll('[data-userid]');
            profileElements.forEach(el => {
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const userId = el.dataset.userid;
                    if (userId) this.showChatUserProfile(userId);
                });
            });
        }

        const replyBtn = messageDiv.querySelector('.reply-btn');
        replyBtn.addEventListener('click', (e) => {
            const btn = e.currentTarget;
            const replyInfo = { id: btn.dataset.messageId, sender: btn.dataset.sender, text: btn.dataset.text };
            const messageInput = document.getElementById('chat-message-input');
            messageInput.dataset.replyingTo = JSON.stringify(replyInfo);
            messageInput.focus();
            const replyIndicator = document.getElementById('reply-indicator');
            replyIndicator.innerHTML = `Replying to ${replyInfo.sender} <button id="cancel-reply-btn">&times;</button>`;
            replyIndicator.style.display = 'flex';
            document.getElementById('cancel-reply-btn').onclick = this.clearReplyState;
        });

        // NEW: Add event listener for the reaction button
        const reactionBtn = messageDiv.querySelector('.add-reaction-btn');
        reactionBtn.addEventListener('click', (e) => {
            this.showEmojiPicker(e.currentTarget);
        });
    },

    /**
     * Clears the reply state from the chat input area.
     */
    clearReplyState() {
        const messageInput = document.getElementById('chat-message-input');
        const replyIndicator = document.getElementById('reply-indicator');
        if (messageInput) delete messageInput.dataset.replyingTo;
        if (replyIndicator) {
            replyIndicator.style.display = 'none';
            replyIndicator.innerHTML = '';
        }
    },

    /**
     * Sets the user's typing status in Firestore.
     * @param {boolean} isTyping - True if the user is typing, false otherwise.
     */
    async setUserTypingStatus(isTyping) {
        const userId = this._app.getOrCreateUserId();
        if (!userId || userId.startsWith('user_anonymous')) return;
        try {
            await this._onlineUsersCollection.doc(userId).update({ isTyping });
        } catch (error) { /* Fails if doc doesn't exist, which is fine. */ }
    },

    /**
     * Marks the current user as online in the chat.
     */
    async setUserAsOnline() {
        const userId = this._app.getOrCreateUserId();
        const userName = localStorage.getItem('userName') || 'Anonymous';
        if (!userId || userId.startsWith('user_anonymous')) return;
        await this._onlineUsersCollection.doc(userId).set({ userId, userName, isTyping: false });
    },

    /**
     * Marks the current user as offline by deleting their record.
     */
    async setUserAsOffline() {
        await this._onlineUsersCollection.doc(this._app.getOrCreateUserId()).delete().catch(() => {});
    },

    /**
     * Fetches and displays a user's profile in a modal.
     * @param {string} userId - The ID of the user to display.
     */
    async showChatUserProfile(userId) {
        // NEW: Use the in-chat profile view instead of a separate modal
        const profileView = document.getElementById('in-chat-profile-view');
        const profileContent = document.getElementById('in-chat-profile-content');
        const profileNameHeader = document.getElementById('in-chat-profile-name');

        if (!profileView || !profileContent) return;

        // Show the profile view and hide the chat messages/input
        profileView.style.display = 'flex';
        document.getElementById('chat-messages-wrapper').style.display = 'none';
        document.getElementById('chat-input-container').style.display = 'none';
        document.getElementById('back-to-chat-btn').style.display = 'block';

        // Hide main chat header elements
        document.querySelector('#global-chat-modal .chat-header h2').textContent = '';
        document.getElementById('online-user-count').style.display = 'none';
        document.getElementById('close-chat-modal-btn').style.display = 'none';

        profileContent.innerHTML = '<div class="spinner-container" style="padding: 40px 0;"><div class="spinner"></div></div>';

        try {
            const userDoc = await this._userProgressCollection.doc(userId).get();

            if (userDoc.exists) {
                const userData = userDoc.data();
                profileNameHeader.textContent = userData.userName || 'User Profile';
                const profileStats = { // This was step 1, but I've renumbered for clarity
                    totalQuizzes: userData.totalQuizzes || 0,
                    averageScore: (userData.averageScore || 0).toFixed(0),
                    quizzesPassed: userData.quizzesPassed || 0
                };

                let profileHtml = `
                    <div class="chat-profile-header">
                        <div class="chat-profile-avatar">${userData.activeAvatar || '👤'}</div>
                        <h3 class="chat-profile-name">${userData.userName || 'Anonymous'}</h3>
                    </div>
                    <div class="chat-profile-stats-grid">
                        <div class="stat-item">
                            <span class="stat-label">Quizzes Taken</span>
                            <span class="stat-value">${profileStats.totalQuizzes}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Average Score</span>
                            <span class="stat-value">${profileStats.averageScore}%</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Quizzes Passed</span>
                            <span class="stat-value">${profileStats.quizzesPassed}</span>
                        </div>
                    </div>
                    <div id="in-chat-profile-actions" class="modal-actions" style="margin-top: 16px; justify-content: center;">
                        <!-- Friend action buttons will be populated here -->
                    </div>
                `;
                profileContent.innerHTML = profileHtml;

                // NEW: Populate friend action buttons
                const actionsEl = document.getElementById('in-chat-profile-actions');
                this.updateFriendStatusButton(actionsEl, userId);
            } else {
                this.showChatMessagesView(); // Go back to chat if user not found
                this._app.showNotification('User profile not found. They may be a new user.', 'info');
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            this.showChatMessagesView(); // Go back to chat on error
            this._app.showNotification('An error occurred while fetching the profile.', 'error');
        }
    },

    /**
     * NEW: Updates the button in the user profile modal based on friend status.
     * @param {HTMLElement} container - The container for the action buttons.
     * @param {string} viewedUserId - The ID of the user whose profile is being viewed.
     */
    updateFriendStatusButton(container, viewedUserId) {
        const currentUserId = this._app.getOrCreateUserId();
        if (currentUserId === viewedUserId) {
            container.innerHTML = ''; // No button for self-profile
            return;
        }

        const friends = this._app.userProgress.friends || {};
        const friendStatus = friends[viewedUserId];

        let buttonHtml = '';
        switch (friendStatus) {
            case 'friend':
                buttonHtml = `<button class="btn btn--secondary" disabled>✔️ Friends</button>
                              <button class="btn btn--danger" onclick="QuizifyFriends.removeFriend('${viewedUserId}')">Remove Friend</button>`;
                break;
            case 'pending_sent':
                buttonHtml = `<button class="btn btn--secondary" disabled>⏳ Request Sent</button>`;
                break;
            case 'pending_received':
                buttonHtml = `<button class="btn btn--primary" onclick="QuizifyFriends.acceptFriendRequest('${viewedUserId}')">Accept Request</button>
                              <button class="btn btn--secondary" onclick="QuizifyFriends.declineFriendRequest('${viewedUserId}')">Decline</button>`;
                break;
            default:
                buttonHtml = `<button class="btn btn--primary" onclick="QuizifyFriends.sendFriendRequest('${viewedUserId}')">🧑‍🤝‍🧑 Add Friend</button>`;
        }
        container.innerHTML = buttonHtml;
    },

    // =================================================
    // NEW: Emoji Reaction Methods
    // =================================================

    /**
     * Shows the emoji picker popover near the clicked button.
     * @param {HTMLElement} button - The "Add reaction" button that was clicked.
     */
    showEmojiPicker(button) {
        this._currentMessageIdForReaction = button.dataset.messageId;
        const rect = button.getBoundingClientRect();
        
        this._emojiPicker.style.display = 'block';
        this._emojiPicker.style.top = `${rect.top - this._emojiPicker.offsetHeight - 8}px`;
        this._emojiPicker.style.left = `${rect.left - (this._emojiPicker.offsetWidth / 2) + (rect.width / 2)}px`;

        // Add a one-time listener to close the picker when clicking outside
        setTimeout(() => {
            document.addEventListener('click', this.hideEmojiPicker, { once: true });
        }, 0);
    },

    /**
     * Hides the emoji picker.
     */
    hideEmojiPicker() {
        if (QuizifyChat._emojiPicker) { // Use QuizifyChat to access 'this' correctly
            QuizifyChat._emojiPicker.style.display = 'none';
        }
        // The event listener is automatically removed due to { once: true }
    },

    /**
     * Adds or updates a user's reaction to a message in Firestore.
     * @param {string} messageId - The ID of the message being reacted to.
     * @param {string} emoji - The emoji character for the reaction.
     */
    async addOrUpdateReaction(messageId, emoji) {
        if (!messageId) return;

        const userId = this._app.getOrCreateUserId();
        const reactionRef = this._globalChatCollection.doc(messageId).collection('reactions').doc(userId);

        try {
            const doc = await reactionRef.get();
            if (doc.exists && doc.data().emoji === emoji) {
                // If user clicks the same emoji again, remove their reaction
                await reactionRef.delete();
            } else {
                // Otherwise, add or update their reaction
                await reactionRef.set({
                    emoji: emoji,
                    userId: userId,
                    userName: localStorage.getItem('userName') || 'Anonymous'
                });
            }
        } catch (error) {
            console.error("Error updating reaction: ", error);
            this._app.showNotification('Could not add reaction.', 'error');
        }
    },

    /**
     * Listens for reaction changes on a specific message and updates the UI.
     * @param {string} messageId - The ID of the message to listen to.
     */
    listenForReactions(messageId) {
        // Avoid creating duplicate listeners
        if (this._reactionListeners[messageId]) {
            this._reactionListenersmessageId; // Detach old listener
        }

        this._reactionListeners[messageId] = this._globalChatCollection.doc(messageId).collection('reactions')
            .onSnapshot(snapshot => {
                const reactions = {};
                snapshot.forEach(doc => {
                    const data = doc.data();
                    if (!reactions[data.emoji]) {
                        reactions[data.emoji] = [];
                    }
                    reactions[data.emoji].push(data.userId);
                });
                this._reactions[messageId] = reactions;
                this.updateReactionDisplay(messageId);
            });
    },

    /**
     * Updates the reaction chips display for a single message.
     * @param {string} messageId - The ID of the message to update.
     */
    updateReactionDisplay(messageId) {
        const reactionsContainer = document.getElementById(`reactions-${messageId}`);
        if (!reactionsContainer) return;

        const reactions = this._reactions[messageId] || {};
        const currentUserId = this._app.getOrCreateUserId();
        let html = '';

        for (const emoji in reactions) {
            const userIds = reactions[emoji];
            const count = userIds.length;
            if (count > 0) {
                const userReactedClass = userIds.includes(currentUserId) ? 'user-reacted' : '';
                html += `<div class="reaction-chip ${userReactedClass}" data-emoji="${emoji}" data-message-id="${messageId}">${emoji} ${count}</div>`;
            }
        }

        reactionsContainer.innerHTML = html;

        // Add event listeners to the new chips to allow removing reactions
        reactionsContainer.querySelectorAll('.reaction-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const emoji = chip.dataset.emoji;
                this.addOrUpdateReaction(messageId, emoji);
            });
        });
    },

    /**
     * Iterates through all visible messages and updates their reaction displays.
     * Useful after initial load or when re-displaying messages.
     */
    updateAllReactionDisplays() {
        document.querySelectorAll('.chat-message').forEach(msgEl => {
            const messageId = msgEl.id.replace('message-', '');
            if (messageId) {
                this.updateReactionDisplay(messageId);
                // Ensure we are listening for future changes
                if (!this._reactionListeners[messageId]) {
                    this.listenForReactions(messageId);
                }
            }
        });
    }
};
