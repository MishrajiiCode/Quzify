// social-challenges.js - Friend competitions and challenges

const SocialChallenges = {
    _app: null,
    _db: null,
    _activeChallenges: [],
    _challengeLeaderboard: {},

    init(app, db) {
        this._app = app;
        this._db = db;
        this.loadActiveChallenges();
    },

    /**
     * Challenge a friend to a quiz battle
     */
    async challengeFriend(friendId, subject) {
        try {
            const userId = this._app.getOrCreateUserId();
            const challengeRef = this._db.collection('challenges').doc();

            const challengeData = {
                challengerId: userId,
                challengedId: friendId,
                subject: subject,
                status: 'pending', // pending, accepted, completed
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
                challengerScore: null,
                challengedScore: null,
                winner: null
            };

            await challengeRef.set(challengeData);
            this._app.showNotification('Challenge sent!', 'success');

            console.log('✅ Challenge created:', challengeRef.id);
            return challengeRef.id;
        } catch (error) {
            console.error('Error creating challenge:', error);
            this._app.showNotification('Failed to send challenge', 'error');
        }
    },

    /**
     * Accept a challenge
     */
    async acceptChallenge(challengeId) {
        try {
            await this._db.collection('challenges').doc(challengeId).update({
                status: 'accepted',
                acceptedAt: new Date()
            });

            this._app.showNotification('Challenge accepted!', 'success');
            console.log('✅ Challenge accepted');
        } catch (error) {
            console.error('Error accepting challenge:', error);
        }
    },

    /**
     * Submit challenge score
     */
    async submitChallengeScore(challengeId, score, timeSpent) {
        try {
            const userId = this._app.getOrCreateUserId();
            const challengeRef = this._db.collection('challenges').doc(challengeId);
            const challengeDoc = await challengeRef.get();
            const challenge = challengeDoc.data();

            let updateData = { acceptedAt: new Date() };

            if (challenge.challengerId === userId) {
                updateData.challengerScore = score;
                updateData.challengerTime = timeSpent;
            } else {
                updateData.challengedScore = score;
                updateData.challengedTime = timeSpent;
            }

            // Check if both have submitted
            if (challenge.challengerScore && challenge.challengedScore) {
                updateData.status = 'completed';
                updateData.completedAt = new Date();

                // Determine winner
                if (challenge.challengerScore > challenge.challengedScore) {
                    updateData.winner = challenge.challengerId;
                } else if (challenge.challengedScore > challenge.challengerScore) {
                    updateData.winner = challenge.challengedId;
                } else {
                    updateData.winner = 'tie';
                }
            }

            await challengeRef.update(updateData);
            console.log('✅ Challenge score submitted');
        } catch (error) {
            console.error('Error submitting challenge score:', error);
        }
    },

    /**
     * Load active challenges
     */
    async loadActiveChallenges() {
        try {
            const userId = this._app.getOrCreateUserId();
            const now = new Date();

            const snapshot = await this._db.collection('challenges')
                .where('expiresAt', '>', now)
                .where('status', 'in', ['pending', 'accepted'])
                .get();

            this._activeChallenges = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            this.displayActiveChallenges(userId);
            console.log('✅ Active challenges loaded');
        } catch (error) {
            console.error('Error loading challenges:', error);
        }
    },

    /**
     * Display active challenges
     */
    displayActiveChallenges(userId) {
        const container = document.getElementById('challenges-container');
        if (!container) return;

        const pendingChallenges = this._activeChallenges.filter(c =>
            (c.challengedId === userId && c.status === 'pending') ||
            (c.challengerId === userId && c.status === 'pending')
        );

        const activeChallenges = this._activeChallenges.filter(c =>
            ((c.challengerId === userId || c.challengedId === userId) && c.status === 'accepted')
        );

        let html = `
            <div class="challenges-section">
                <h3>🎯 Pending Challenges</h3>
                <div class="challenges-list">
        `;

        if (pendingChallenges.length === 0) {
            html += '<p>No pending challenges</p>';
        } else {
            pendingChallenges.forEach(challenge => {
                const isChallenged = challenge.challengedId === userId;
                html += `
                    <div class="challenge-card">
                        <div class="challenge-info">
                            <p><strong>${isChallenged ? 'Challenge from' : 'Challenge to'}</strong></p>
                            <p class="subject">📚 ${challenge.subject}</p>
                        </div>
                        ${isChallenged ? `
                            <button class="btn btn--primary" onclick="SocialChallenges.acceptChallenge('${challenge.id}')">
                                Accept
                            </button>
                        ` : '<span class="awaiting">⏳ Awaiting Response</span>'}
                    </div>
                `;
            });
        }

        html += `
                </div>
                <h3>⚔️ Active Battles</h3>
                <div class="challenges-list">
        `;

        if (activeChallenges.length === 0) {
            html += '<p>No active battles</p>';
        } else {
            activeChallenges.forEach(challenge => {
                const challengerName = challenge.challengerId === userId ? '👤 You' : challenge.challengerName;
                const challengedName = challenge.challengedId === userId ? '👤 You' : challenge.challengedName;

                html += `
                    <div class="challenge-card active">
                        <div class="battle-status">
                            <span class="player">${challengerName}</span>
                            <span class="vs">VS</span>
                            <span class="player">${challengedName}</span>
                        </div>
                        <div class="battle-scores">
                            <div class="score-col">
                                <strong>${challenge.challengerScore || '-'}</strong>
                                <small>${Math.floor(challenge.challengerTime || 0) / 60}m</small>
                            </div>
                            <div class="score-col">
                                <strong>${challenge.challengedScore || '-'}</strong>
                                <small>${Math.floor(challenge.challengedTime || 0) / 60}m</small>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        html += '</div></div>';
        container.innerHTML = html;
    },

    /**
     * Show challenge opponents list
     */
    async showChallengeOpponents(subject) {
        try {
            const userId = this._app.getOrCreateUserId();
            const friendsDoc = await userProgressCollection.doc(userId).get();
            const friendsMap = friendsDoc.data()?.friends || {};
            const friendIds = Object.keys(friendsMap).filter(id => friendsMap[id] === 'friend');

            if (friendIds.length === 0) {
                this._app.showNotification('Add friends first to challenge them!', 'info');
                return;
            }

            const modal = document.getElementById('challenge-opponents-modal');
            if (!modal) return;

            let html = '<div class="opponents-grid">';

            for (const friendId of friendIds) {
                const friendDoc = await userProgressCollection.doc(friendId).get();
                const friend = friendDoc.data();

                html += `
                    <div class="opponent-card">
                        <span class="avatar">${friend.activeAvatar || '👤'}</span>
                        <h4>${friend.userName}</h4>
                        <p class="stats">${friend.averageScore?.toFixed(0) || 0}% Avg</p>
                        <button class="btn btn--sm btn--primary" onclick="SocialChallenges.challengeFriend('${friendId}', '${subject}')">
                            Challenge
                        </button>
                    </div>
                `;
            }

            html += '</div>';
            modal.innerHTML = html;
            modal.classList.add('visible');
        } catch (error) {
            console.error('Error loading opponents:', error);
        }
    }
};
