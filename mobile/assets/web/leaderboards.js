// leaderboards.js - Weekly/Monthly Leaderboards & Competitions

const QuizifyLeaderboards = {
    _app: null,
    _db: null,
    _currentLeaderboardType: 'all-time', // all-time, weekly, monthly, friends, subject-specific
    _leaderboardData: {},
    _seasonData: null,

    SEASON_CONFIG: {
        current: {
            id: 'season_2026_q2',
            name: 'Spring 2026 Challenge',
            startDate: '2026-04-01',
            endDate: '2026-06-30',
            rewards: {
                1: { name: '🥇 Gold Crown', coins: 1000, badge: 'season_champion' },
                2: { name: '🥈 Silver Crown', coins: 500, badge: 'season_runner_up' },
                3: { name: '🥉 Bronze Crown', coins: 250, badge: 'season_third_place' },
                top10: { name: '⭐ Top 10', coins: 100, badge: 'season_top_10' }
            }
        }
    },

    init(app, db) {
        this._app = app;
        this._db = db;
        this.loadLeaderboardData();
    },

    /**
     * Update a user's score in the leaderboard after a quiz
     */
    async updateUserScore(userId, userName, score, subject) {
        if (!this._db) return;
        try {
            const userRef = this._db.collection('leaderboard').doc(userId);
            const doc = await userRef.get();
            const existing = doc.exists ? doc.data() : {};

            const now = new Date();
            const weekStart = this.getWeekStart().toISOString();
            const monthStart = this.getMonthStart().toISOString();

            // Update best score
            const newBest = Math.max(existing.bestScore || 0, score);

            // Weekly/monthly accumulation
            const weekKey = 'week_' + weekStart.substring(0, 10);
            const monthKey = 'month_' + monthStart.substring(0, 7);

            const weeklyScore = (existing[weekKey] || 0) + score;
            const monthlyScore = (existing[monthKey] || 0) + score;

            await userRef.set({
                name: userName,
                bestScore: newBest,
                [weekKey]: weeklyScore,
                [monthKey]: monthlyScore,
                lastUpdated: now.toISOString(),
                subject: subject || 'mixed'
            }, { merge: true });

            console.log('✅ Leaderboard score updated');
        } catch (error) {
            console.error('Error updating leaderboard score:', error);
        }
    },

    /**
     * Display leaderboard for a given period
     */
    async displayLeaderboard(period = 'alltime') {
        const listEl = document.getElementById('leaderboard-list');
        const spinner = document.getElementById('leaderboard-spinner');
        if (!listEl || !this._db) return;

        if (spinner) spinner.style.display = 'block';
        listEl.innerHTML = '';

        try {
            let query;
            const now = new Date();

            if (period === 'weekly') {
                const weekKey = 'week_' + this.getWeekStart().toISOString().substring(0, 10);
                query = this._db.collection('leaderboard').orderBy(weekKey, 'desc').limit(20);
            } else if (period === 'monthly') {
                const monthKey = 'month_' + now.toISOString().substring(0, 7);
                query = this._db.collection('leaderboard').orderBy(monthKey, 'desc').limit(20);
            } else if (period === 'friends') {
                // Fall back to all-time for now
                query = this._db.collection('leaderboard').orderBy('bestScore', 'desc').limit(20);
            } else {
                // all-time
                query = this._db.collection('leaderboard').orderBy('bestScore', 'desc').limit(20);
            }

            const snapshot = await query.get();
            if (snapshot.empty) {
                listEl.innerHTML = '<li class="no-data">No scores yet for this period. Be the first!</li>';
                return;
            }

            const currentUserId = this._app.getOrCreateUserId();
            let rank = 1;
            snapshot.forEach(doc => {
                const data = doc.data();
                const isCurrentUser = doc.id === currentUserId;
                const scoreField = period === 'weekly' ? ('week_' + this.getWeekStart().toISOString().substring(0, 10)) :
                    period === 'monthly' ? ('month_' + now.toISOString().substring(0, 7)) : 'bestScore';
                const score = data[scoreField] || data.bestScore || 0;
                const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank + '.';

                listEl.innerHTML += `
                    <li class="leaderboard-item ${isCurrentUser ? 'current-user' : ''}">
                        <span class="rank">${medal}</span>
                        <span class="lb-name">${data.name || 'Anonymous'}</span>
                        <span class="lb-score">${score.toFixed ? score.toFixed(1) : score}%</span>
                    </li>`;
                rank++;
            });
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            listEl.innerHTML = '<li class="no-data">Could not load leaderboard. Try again later.</li>';
        } finally {
            if (spinner) spinner.style.display = 'none';
        }
    },

    initializeEventListeners() {
        // Leaderboard tab switching
        const leaderboardTabs = document.querySelectorAll('.leaderboard-tab-btn');
        leaderboardTabs.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.dataset.type;
                this.switchLeaderboardType(type);
            });
        });

        // Subject-specific leaderboard dropdown
        const subjectFilter = document.getElementById('leaderboard-subject-filter');
        if (subjectFilter) {
            subjectFilter.addEventListener('change', (e) => {
                this._currentSubject = e.target.value;
                this.displayLeaderboard('subject-specific');
            });
        }
    },

    async loadLeaderboardData() {
        try {
            // Load all-time leaderboard
            const allTimeSnapshot = await this._db.collection('leaderboard').orderBy('bestScore', 'desc').limit(100).get();
            this._leaderboardData['all-time'] = allTimeSnapshot.docs.map(doc => ({
                ...doc.data(),
                userId: doc.id
            }));

            // Load weekly leaderboard
            const weekStart = this.getWeekStart();
            const weeklySnapshot = await this._db.collection('leaderboard')
                .where('lastWeeklyScore', '>=', weekStart)
                .orderBy('weeklyScore', 'desc')
                .limit(50)
                .get();
            this._leaderboardData['weekly'] = weeklySnapshot.docs.map(doc => ({
                ...doc.data(),
                userId: doc.id
            }));

            // Load monthly leaderboard
            const monthStart = this.getMonthStart();
            const monthlySnapshot = await this._db.collection('leaderboard')
                .where('lastMonthlyScore', '>=', monthStart)
                .orderBy('monthlyScore', 'desc')
                .limit(50)
                .get();
            this._leaderboardData['monthly'] = monthlySnapshot.docs.map(doc => ({
                ...doc.data(),
                userId: doc.id
            }));

            // Load friends leaderboard
            await this.loadFriendsLeaderboard();

            // Load current season data
            this._seasonData = this.SEASON_CONFIG.current;

            console.log('✅ Leaderboard data loaded');
        } catch (error) {
            console.error('❌ Error loading leaderboards:', error);
        }
    },

    async loadFriendsLeaderboard() {
        try {
            const userId = this._app.getOrCreateUserId();
            const userDoc = await userProgressCollection.doc(userId).get();
            const friendsMap = userDoc.data()?.friends || {};
            const friendIds = Object.keys(friendsMap).filter(id => friendsMap[id] === 'friend');

            if (friendIds.length === 0) {
                this._leaderboardData['friends'] = [];
                return;
            }

            const friendsSnapshot = await this._db.collection('leaderboard')
                .where('userId', 'in', friendIds)
                .orderBy('bestScore', 'desc')
                .get();

            this._leaderboardData['friends'] = friendsSnapshot.docs.map(doc => ({
                ...doc.data(),
                userId: doc.id
            }));
        } catch (error) {
            console.error('Error loading friends leaderboard:', error);
        }
    },

    switchLeaderboardType(type) {
        this._currentLeaderboardType = type;
        this.displayLeaderboard(type);

        // Update active tab
        document.querySelectorAll('.leaderboard-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === type);
        });
    },

    displayLeaderboard(type) {
        const container = document.getElementById('leaderboard-container');
        if (!container) return;

        const data = this._leaderboardData[type] || [];
        const userId = this._app.getOrCreateUserId();

        if (data.length === 0) {
            container.innerHTML = '<p class="leaderboard-empty">No data available yet. Start taking quizzes!</p>';
            return;
        }

        let html = '<div class="leaderboard-list">';

        data.forEach((user, index) => {
            const rank = index + 1;
            const isCurrentUser = user.userId === userId;
            const medal = this.getMedalForRank(rank);
            const score = type === 'weekly' ? user.weeklyScore : type === 'monthly' ? user.monthlyScore : user.bestScore;

            html += `
                <div class="leaderboard-item ${isCurrentUser ? 'current-user' : ''}">
                    <div class="rank">${medal} <strong>#${rank}</strong></div>
                    <div class="user-info">
                        <span class="avatar">${user.activeAvatar || '👤'}</span>
                        <div>
                            <h4>${user.userName || 'Anonymous'}</h4>
                            <p class="stats">Avg: ${user.averageScore?.toFixed(1) || 0}% | Quiz: ${user.totalQuizCompleted || 0}</p>
                        </div>
                    </div>
                    <div class="score">
                        <strong>${score.toFixed(1)}</strong>
                        ${type === 'weekly' ? '<span class="label">This Week</span>' : type === 'monthly' ? '<span class="label">This Month</span>' : ''}
                    </div>
                </div>
            `;
        });

        html += '</div>';

        // Show current user's rank if not in top 50
        if (type !== 'friends') {
            const currentUserRank = await this.getUserRank(userId, type);
            if (currentUserRank > 50) {
                html += `<div class="user-rank-badge">Your Rank: <strong>#${currentUserRank}</strong></div>`;
            }
        }

        container.innerHTML = html;
    },

    getMedalForRank(rank) {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        if (rank <= 10) return '⭐';
        return '•';
    },

    async getUserRank(userId, type) {
        try {
            const collection = this._db.collection('leaderboard');
            const scoreField = type === 'weekly' ? 'weeklyScore' : type === 'monthly' ? 'monthlyScore' : 'bestScore';

            const userDoc = await collection.doc(userId).get();
            if (!userDoc.exists) return 999;

            const userScore = userDoc.data()[scoreField];
            const higherScoresSnapshot = await collection
                .where(scoreField, '>', userScore)
                .get();

            return higherScoresSnapshot.size + 1;
        } catch (error) {
            console.error('Error calculating user rank:', error);
            return 999;
        }
    },

    async showSeasonRewards() {
        const modal = document.getElementById('season-rewards-modal');
        if (!modal) return;

        const userId = this._app.getOrCreateUserId();
        const rank = await this.getUserRank(userId, 'all-time');
        const season = this.SEASON_CONFIG.current;

        let reward = null;
        if (rank <= 3) {
            reward = season.rewards[rank];
        } else if (rank <= 10) {
            reward = season.rewards.top10;
        }

        if (reward) {
            modal.querySelector('.season-reward-icon').textContent = reward.name.split(' ')[0];
            modal.querySelector('.season-reward-title').textContent = reward.name;
            modal.querySelector('.season-reward-coins').textContent = `+${reward.coins} Coins`;
            modal.classList.add('visible');
        }
    },

    displayTopPerformersBanner() {
        const banner = document.getElementById('top-performers-banner');
        if (!banner) return;

        const weeklyData = this._leaderboardData['weekly'] || [];
        if (weeklyData.length === 0) return;

        const topThree = weeklyData.slice(0, 3);
        let bannerHtml = '<div class="top-performers-scroll">';

        topThree.forEach((user, index) => {
            const medals = ['🥇', '🥈', '🥉'];
            bannerHtml += `
                <div class="top-performer-card">
                    <span class="medal">${medals[index]}</span>
                    <span class="avatar">${user.activeAvatar || '👤'}</span>
                    <p class="name">${user.userName || 'Anonymous'}</p>
                    <p class="score">${user.weeklyScore?.toFixed(0) || 0} pts</p>
                </div>
            `;
        });

        bannerHtml += '</div>';
        banner.innerHTML = bannerHtml;
    },

    async updateLeaderboard(userId, score, subject) {
        try {
            const leaderboardRef = this._db.collection('leaderboard').doc(userId);
            const userData = this._app.userProgress;

            const weekScore = this.calculateWeeklyScore(userData);
            const monthScore = this.calculateMonthlyScore(userData);

            await leaderboardRef.set({
                userName: userData.userName,
                activeAvatar: userData.activeAvatar,
                bestScore: Math.max(userData.bestScore || 0, score),
                weeklyScore: weekScore,
                monthlyScore: monthScore,
                averageScore: userData.averageScore,
                totalQuizCompleted: userData.totalQuizCompleted || 0,
                lastUpdated: new Date(),
                lastWeeklyScore: this.getWeekStart(),
                lastMonthlyScore: this.getMonthStart()
            }, { merge: true });

            console.log('✅ Leaderboard updated');
        } catch (error) {
            console.error('❌ Error updating leaderboard:', error);
        }
    },

    calculateWeeklyScore(userData) {
        // Calculate score based on quizzes completed this week
        const weekStart = this.getWeekStart();
        let weekScore = 0;

        if (userData.quizHistory) {
            userData.quizHistory.forEach(quiz => {
                const quizDate = new Date(quiz.date);
                if (quizDate >= new Date(weekStart)) {
                    weekScore += quiz.score;
                }
            });
        }

        return weekScore;
    },

    calculateMonthlyScore(userData) {
        // Calculate score based on quizzes completed this month
        const monthStart = this.getMonthStart();
        let monthScore = 0;

        if (userData.quizHistory) {
            userData.quizHistory.forEach(quiz => {
                const quizDate = new Date(quiz.date);
                if (quizDate >= new Date(monthStart)) {
                    monthScore += quiz.score;
                }
            });
        }

        return monthScore;
    },

    getWeekStart() {
        const today = new Date();
        const day = today.getDay();
        const diff = today.getDate() - day;
        const weekStart = new Date(today.setDate(diff));
        return weekStart.toISOString().split('T')[0];
    },

    getMonthStart() {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    }
};
