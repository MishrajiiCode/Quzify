// analytics.js - Advanced analytics and performance tracking

const QuizifyAnalytics = {
    _app: null,
    _db: null,
    _analyticsData: {},

    init(app) {
        this._app = app;
        this.loadAnalyticsData();
    },

    // Alias called when Analytics tab is clicked
    renderDashboard() {
        this.displayAnalyticsDashboard();
    },

    /**
     * Track a quiz completion - called from app.js after each quiz
     */
    trackQuizCompletion(quizMeta) {
        const data = JSON.parse(localStorage.getItem('quizifyAnalytics') || '{}');
        data.completions = data.completions || [];
        data.completions.push({
            date: new Date().toISOString(),
            score: quizMeta.score,
            subject: quizMeta.subject,
            timeTaken: quizMeta.timeTaken
        });
        // Keep only last 100 entries
        if (data.completions.length > 100) data.completions = data.completions.slice(-100);
        localStorage.setItem('quizifyAnalytics', JSON.stringify(data));
        this._analyticsData = data;
    },

    /**
     * Load user analytics from localStorage
     */
    loadAnalyticsData() {
        try {
            const saved = localStorage.getItem('quizifyAnalytics');
            this._analyticsData = saved ? JSON.parse(saved) : this.initializeAnalyticsData();
            console.log('✅ Analytics data loaded');
        } catch (error) {
            console.error('Error loading analytics:', error);
            this._analyticsData = this.initializeAnalyticsData();
        }
    },

    /**
     * Initialize empty analytics data
     */
    initializeAnalyticsData() {
        return {
            totalQuizzes: 0,
            totalTimeSpent: 0,
            averageScore: 0,
            accuracyTrend: [],
            subjectPerformance: {},
            dailyActivity: {},
            weeklyStats: [],
            monthlyStats: [],
            improvementPercentage: 0
        };
    },

    /**
     * Display analytics dashboard
     */
    displayAnalyticsDashboard() {
        const container = document.getElementById('analytics-dashboard');
        if (!container) return;

        const userData = this._app.userProgress;
        
        let html = `
            <div class="analytics-grid">
                <div class="analytics-card">
                    <h3>📊 Overall Stats</h3>
                    <div class="stat-row">
                        <span>Total Quizzes:</span>
                        <strong>${userData.totalQuizCompleted || 0}</strong>
                    </div>
                    <div class="stat-row">
                        <span>Average Score:</span>
                        <strong>${userData.averageScore?.toFixed(1) || 0}%</strong>
                    </div>
                    <div class="stat-row">
                        <span>Best Score:</span>
                        <strong>${userData.bestScore?.toFixed(1) || 0}%</strong>
                    </div>
                    <div class="stat-row">
                        <span>Time Spent:</span>
                        <strong>${this.formatTime(this._analyticsData.totalTimeSpent)}</strong>
                    </div>
                </div>

                <div class="analytics-card">
                    <h3>📈 Trends</h3>
                    <canvas id="accuracy-chart"></canvas>
                </div>

                <div class="analytics-card">
                    <h3>🎯 Subject Performance</h3>
                    <div class="subject-performance">
                        ${this.generateSubjectPerformance()}
                    </div>
                </div>

                <div class="analytics-card">
                    <h3>📅 Weekly Activity</h3>
                    <canvas id="activity-chart"></canvas>
                </div>

                <div class="analytics-card">
                    <h3>🔄 Improvement</h3>
                    <div class="improvement-stat">
                        <div class="big-number">${this._analyticsData.improvementPercentage?.toFixed(1) || 0}%</div>
                        <p>Improvement vs Last Month</p>
                    </div>
                </div>

                <div class="analytics-card">
                    <h3>🎮 Predictions</h3>
                    <div class="predictions">
                        ${this.generatePredictions()}
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        this.renderCharts();
    },

    /**
     * Generate subject performance HTML
     */
    generateSubjectPerformance() {
        const subjects = ['quantitative', 'english', 'reasoning', 'general_science'];
        const userData = this._app.userProgress;

        return subjects.map(subject => {
            const accuracy = this.calculateSubjectAccuracy(subject);
            const progress = Math.round(accuracy);

            return `
                <div class="performance-item">
                    <div class="subject-name">${this.getSubjectName(subject)}</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <div class="accuracy-text">${accuracy.toFixed(1)}%</div>
                </div>
            `;
        }).join('');
    },

    /**
     * Generate performance predictions
     */
    generatePredictions() {
        const userData = this._app.userProgress;
        const predictions = [];

        // Predict score based on average
        const avgScore = userData.averageScore || 0;
        let prediction = avgScore;
        
        if (avgScore >= 80) {
            prediction = Math.min(99, avgScore + 5);
        } else if (avgScore >= 60) {
            prediction = avgScore + 8;
        } else {
            prediction = avgScore + 12;
        }

        predictions.push(`<div class="prediction-item">
            <strong>Predicted Score:</strong> ~${prediction.toFixed(0)}%
        </div>`);

        // Time to reach goal
        const targetScore = 85;
        const quizzesNeeded = Math.ceil((targetScore - avgScore) / 3);
        predictions.push(`<div class="prediction-item">
            <strong>Quizzes to ${targetScore}%:</strong> ~${quizzesNeeded}
        </div>`);

        // Exam readiness
        const readiness = this.calculateExamReadiness(userData);
        predictions.push(`<div class="prediction-item">
            <strong>Exam Readiness:</strong> ${readiness}%
        </div>`);

        return predictions.join('');
    },

    /**
     * Calculate exam readiness
     */
    calculateExamReadiness(userData) {
        let score = 0;

        // Average score (0-30 points)
        score += Math.min(30, (userData.averageScore || 0) / 3);

        // Consistency (0-30 points)
        if (userData.streak && userData.streak > 14) score += 30;
        else if (userData.streak && userData.streak > 7) score += 20;
        else if (userData.streak && userData.streak > 0) score += 10;

        // Coverage (0-20 points)
        const subjects = ['quantitative', 'english', 'reasoning', 'general_science'];
        const completedSubjects = subjects.filter(s => this.calculateSubjectAccuracy(s) > 0);
        score += (completedSubjects.length / subjects.length) * 20;

        // Recent performance (0-20 points)
        if (userData.quizHistory && userData.quizHistory.length > 0) {
            const recentAvg = userData.quizHistory.slice(-5)
                .reduce((sum, q) => sum + q.score, 0) / Math.min(5, userData.quizHistory.length);
            score += Math.min(20, recentAvg / 4);
        }

        return Math.round(Math.min(100, score));
    },

    /**
     * Calculate subject accuracy
     */
    calculateSubjectAccuracy(subject) {
        const userData = this._app.userProgress;
        const subjectData = userData[subject] || {};
        let totalScore = 0;
        let totalAttempts = 0;

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

        return totalAttempts > 0 ? (totalScore / totalAttempts) * 100 : 0;
    },

    /**
     * Get subject name
     */
    getSubjectName(subject) {
        const names = {
            'quantitative': 'Quantitative',
            'english': 'English',
            'reasoning': 'Reasoning',
            'general_science': 'General Science'
        };
        return names[subject] || subject;
    },

    /**
     * Render charts
     */
    renderCharts() {
        // Accuracy trend chart
        const accuracyCtx = document.getElementById('accuracy-chart');
        if (accuracyCtx) {
            new Chart(accuracyCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'Average Score',
                        data: [65, 70, 75, 80],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4
                    }]
                },
                options: { responsive: true, plugins: { legend: { display: false } } }
            });
        }

        // Activity chart
        const activityCtx = document.getElementById('activity-chart');
        if (activityCtx) {
            new Chart(activityCtx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Quizzes Completed',
                        data: [2, 3, 1, 4, 2, 1, 0],
                        backgroundColor: '#10b981'
                    }]
                },
                options: { responsive: true, plugins: { legend: { display: false } } }
            });
        }
    },

    /**
     * Format time
     */
    formatTime(seconds) {
        if (!seconds) return '0h';
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    },

    /**
     * Update analytics after quiz completion
     */
    async updateAnalytics(quizData) {
        try {
            const userId = this._app.getOrCreateUserId();
            const analyticsRef = this._db.collection('analytics').doc(userId);

            const newData = {
                ...this._analyticsData,
                totalQuizzes: (this._analyticsData.totalQuizzes || 0) + 1,
                totalTimeSpent: (this._analyticsData.totalTimeSpent || 0) + (quizData.timeSpent || 0),
                lastUpdated: new Date(),
                lastQuizScore: quizData.score
            };

            await analyticsRef.set(newData);
            this._analyticsData = newData;
        } catch (error) {
            console.error('Error updating analytics:', error);
        }
    }
};
