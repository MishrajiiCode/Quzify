// bot.js - Advanced Quizify Help Bot with Performance Analytics

const QuizifyBot = {
    _app: null, // Reference to the main QuizifyApp
    _botModal: null,
    _chatContainer: null,
    _input: null,
    _currentState: 'start',
    _currentQuestion: null,

    // ── Small Talk Responses ──
    SMALL_TALK: {
        'greetings': {
            keywords: ['hi', 'hello', 'hey', 'helo', 'hii', 'good morning', 'good evening', 'sup', 'yo'],
            response: "Hey there! 👋 How can I help you today? I can show your **performance stats**, help with quizzes, or answer questions about the app."
        },
        'identity': {
            keywords: ['your name', 'who are you', 'what are you'],
            response: "I'm **Quizify Bot** 🤖 — your personal learning assistant! I can analyze your quiz performance, find content, answer app questions, and even quiz you on the spot."
        },
        'well_being': {
            keywords: ['how are you', 'hows it going', 'how are you doing'],
            response: "Running at peak performance! ⚡ How about we check your performance too? Just ask me for your **performance summary**!"
        },
        'thanks': {
            keywords: ['thank you', 'thanks', 'thx', 'thankyou'],
            response: "You're welcome! 😊 Is there anything else I can help with?"
        },
        'creator': {
            keywords: ['who made you', 'who created you', 'your creator', 'your father', 'developer'],
            response: "I was built by **Raj Mishra**, the developer of Quizify. If you have feedback, use the 'Feedback' link in the side menu! 💬"
        },
        'bye': {
            keywords: ['bye', 'goodbye', 'see you', 'later', 'close'],
            response: "Goodbye! 👋 Keep learning and have a great day! Feel free to come back anytime."
        }
    },

    // ── Intent Keyword Mapping ──
    KEYWORD_INTENTS: {
        'quiz': 'Quiz & Gameplay', 'gameplay': 'Quiz & Gameplay', 'question': 'Quiz & Gameplay', 'scoring': 'Quiz & Gameplay',
        'account': 'Account & Progress', 'progress': 'Account & Progress', 'pin': 'Account & Progress', 'name': 'Account & Progress', 'delete': 'Account & Progress',
        'store': 'Store & Purchases', 'coin': 'Store & Purchases', 'purchase': 'Store & Purchases', 'theme': 'Store & Purchases', 'avatar': 'Store & Purchases',
        'support': 'Contact Support', 'contact': 'Contact Support', 'email': 'Contact Support',
        'search': 'Search Content', 'find': 'Search Content', 'look for': 'Search Content',
    },

    // ── Performance Keywords ──
    PERFORMANCE_KEYWORDS: [
        'performance', 'summary', 'stats', 'statistics', 'my score', 'my progress',
        'how am i doing', 'my result', 'my results', 'review', 'report', 'analytics',
        'overview', 'dashboard', 'how many quiz', 'total quiz', 'overall', 'my data'
    ],

    STRENGTH_KEYWORDS: [
        'strong', 'strength', 'best subject', 'good at', 'top subject', 'where am i good',
        'best topic', 'what am i good', 'my strengths'
    ],

    WEAKNESS_KEYWORDS: [
        'weak', 'weakness', 'worst', 'bad at', 'improve', 'need to improve',
        'where am i weak', 'hard topic', 'difficult', 'struggle', 'my weaknesses'
    ],

    HISTORY_KEYWORDS: [
        'history', 'recent quiz', 'last quiz', 'recent attempt', 'quiz history',
        'past quiz', 'previous quiz', 'what i played', 'recent activity'
    ],

    SUBJECT_KEYWORDS: [
        'english', 'quantitative', 'reasoning', 'math', 'physics', 'chemistry', 'biology',
        'mathematics', 'quant', 'verbal', 'aptitude'
    ],

    // ── Sample Question Bank ──
    QUESTION_BANK: {
        english: [
            {
                id: 'eng-1',
                question: 'Choose the correctly punctuated sentence.',
                options: ['Its raining outside.', "It's raining outside.", 'Its raining, outside', 'Its raining; outside'],
                answerIndex: 1,
                explanation: "The correct contraction for 'it is' is 'it's'."
            },
            {
                id: 'eng-2',
                question: 'Select the antonym of "ancient".',
                options: ['old', 'historic', 'modern', 'antique'],
                answerIndex: 2,
                explanation: 'Modern is the opposite (antonym) of ancient.'
            }
        ],
        quantitative: [
            {
                id: 'quant-1',
                question: 'What is 15% of 200?',
                options: ['20', '25', '30', '15'],
                answerIndex: 2,
                explanation: '15% of 200 = 0.15 × 200 = 30.'
            }
        ],
        reasoning: [], math: [], physics: [], chemistry: [], biology: []
    },

    // ── Conversation Tree ──
    CONVERSATION_TREE: {
        'start': {
            message: "Hi! I'm **Quizify Bot** 🤖. I can help with app issues, search content, and analyze your quiz performance. What would you like?",
            options: ['📊 Performance Summary', 'Quiz & Gameplay', 'Account & Progress', 'Store & Purchases', 'Search Content', 'Contact Support']
        },
        'Search Content': {
            message: "Sure! What topic are you looking for? Type the chapter or subject name.",
            action: 'await_search_query'
        },
        'Quiz & Gameplay': {
            message: "What's your quiz question?",
            options: ['A question seems wrong', "My quiz won't start", 'How does scoring work?', '🎲 Random Question', 'Back to main menu']
        },
        'Account & Progress': {
            message: "What can I help with regarding your account?",
            options: ['My progress is not saving', 'How do I change my name/PIN?', 'How do I delete my account?', 'Back to main menu']
        },
        'Store & Purchases': {
            message: "What's your store question?",
            options: ['How do I get more coins?', 'My purchase is not showing up', 'How do I use a theme/avatar?', 'Back to main menu']
        },
        'A question seems wrong': {
            message: "Thank you for helping improve Quizify! 🙏 Send us an email with the **Subject**, **Chapter**, and **Question text** so we can fix it quickly.",
            options: ['Contact Support', 'Back to main menu']
        },
        "My quiz won't start": {
            message: "This can happen if the question set is empty or still under development. Try another set, or refresh the page if it persists across all sets.",
            options: ['Contact Support', 'Back to main menu']
        },
        'How does scoring work?': {
            message: "📝 **Scoring System:**\n• You need **40% or more** to pass a quiz\n• Passing unlocks the next set in a chapter\n• Your profile shows your average across all quizzes\n• Earn coins for passing and perfect scores!",
            options: ['📊 Performance Summary', 'Back to main menu']
        },
        'My progress is not saving': {
            message: "Your progress is tied to your account. Make sure you're logged in with the correct credentials. Progress saves automatically after each quiz. If issues persist, contact support.",
            options: ['Contact Support', 'Back to main menu']
        },
        'How do I change my name/PIN?': {
            message: "Go to **Settings** (from the side menu) → **Account** tab. You can update your name and PIN there.",
            options: ['Back to main menu']
        },
        'How do I delete my account?': {
            message: "⚠️ Go to **Settings** → **Danger Zone** tab. This action is **permanent** and cannot be undone.",
            options: ['Back to main menu']
        },
        'How do I get more coins?': {
            message: "💰 **Ways to earn Quiz Coins:**\n• **Daily Login:** Collect 2 coins daily\n• **Pass a Quiz:** Earn 10 coins (first time per set)\n• **Perfect Score:** Bonus 25 coins (first time per set)\n• **Complete Chapter:** 100 coin bonus for clearing all sets",
            options: ['Back to main menu']
        },
        'My purchase is not showing up': {
            message: "Try closing and reopening the side menu or settings. If the item doesn't appear after a page refresh, contact support with your purchase details.",
            options: ['Contact Support', 'Back to main menu']
        },
        'How do I use a theme/avatar?': {
            message: "After purchasing from the store, go to **Settings** → **Customization** tab to apply your items.",
            options: ['Back to main menu']
        },
        'Contact Support': {
            message: "I'm sorry I couldn't resolve this. Please describe your issue in an email and our team will help!",
            mailto: 'productionrtf@gmail.com'
        },
        'Back to main menu': {
            message: "Anything else I can help with?",
            options: ['📊 Performance Summary', 'Quiz & Gameplay', 'Account & Progress', 'Store & Purchases', 'Search Content', 'Contact Support']
        }
    },

    // ══════════════════════════════════════════
    //  INITIALIZATION
    // ══════════════════════════════════════════
    init(app) {
        this._app = app;
        this._botModal = document.getElementById('help-bot-modal');
        this._chatContainer = document.getElementById('bot-chat-messages');
        this._input = document.getElementById('bot-message-input');

        const openBtn = document.getElementById('open-help-bot-fab');
        const closeBtn = document.getElementById('close-bot-modal-btn');
        const sendBtn = document.getElementById('send-bot-message-btn');

        openBtn.addEventListener('click', () => this.openHelpBot());
        closeBtn.addEventListener('click', () => this.closeHelpBot());
        sendBtn.addEventListener('click', () => this.handleUserInput());

        this._input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });

        // Event delegation for clickable elements in chat
        this._chatContainer.addEventListener('click', (e) => {
            const optionBtn = e.target.closest('.bot-option-btn');
            if (optionBtn && this._chatContainer.contains(optionBtn)) {
                const choice = optionBtn.textContent;
                this.addUserMessage(choice);
                this.handleBotResponse(choice);
                return;
            }

            const questionOption = e.target.closest('.bot-question-option');
            if (questionOption && this._chatContainer.contains(questionOption)) {
                const choiceIndex = parseInt(questionOption.dataset.index, 10);
                this.addUserMessage(questionOption.textContent);
                this.evaluateAnswer(choiceIndex);
                return;
            }

            const searchBtn = e.target.closest('.bot-search-result-btn');
            if (searchBtn && this._chatContainer.contains(searchBtn)) {
                const raw = searchBtn.getAttribute('data-result');
                let resultData = null;
                try {
                    resultData = JSON.parse(raw);
                } catch (err) {
                    try { resultData = JSON.parse(raw.replace(/'/g, '"')); } catch (err2) { console.error('Parse error:', err2); }
                }
                if (resultData) {
                    this.addUserMessage(`Go to "${resultData.chapterName}"`);
                    this.navigateToSearchResult(resultData);
                }
                return;
            }
        });
    },

    // ══════════════════════════════════════════
    //  OPEN / CLOSE
    // ══════════════════════════════════════════
    openHelpBot() {
        this._botModal.classList.add('visible');
        this._chatContainer.innerHTML = '';
        this._currentState = 'start';

        const _authUser = firebase.auth().currentUser;
        const userName = _authUser?.displayName || _authUser?.email?.split('@')[0] || null;
        const greeting = userName ? `Hi **${userName}**!` : "Hi!";
        const startResponse = this.CONVERSATION_TREE['start'];
        const personalizedMessage = startResponse.message.replace('Hi!', greeting);

        this.addBotMessage(personalizedMessage, startResponse.options);
        this._input.focus();
    },

    closeHelpBot() {
        this._botModal.classList.remove('visible');
    },

    // ══════════════════════════════════════════
    //  INPUT HANDLING (NLU)
    // ══════════════════════════════════════════
    handleUserInput() {
        const userInput = this._input.value.trim();
        if (!userInput) return;

        this.addUserMessage(userInput);
        this._input.value = '';

        // State-based handling
        if (this._currentState === 'await_search_query') {
            this.performSearch(userInput);
            return;
        }

        const lowerInput = userInput.toLowerCase();

        // 1. Check for performance queries
        if (this.matchesKeywords(lowerInput, this.PERFORMANCE_KEYWORDS)) {
            this.showPerformanceSummary();
            return;
        }

        // 2. Check for strength queries
        if (this.matchesKeywords(lowerInput, this.STRENGTH_KEYWORDS)) {
            this.showStrengths();
            return;
        }

        // 3. Check for weakness queries
        if (this.matchesKeywords(lowerInput, this.WEAKNESS_KEYWORDS)) {
            this.showWeaknesses();
            return;
        }

        // 4. Check for quiz history queries
        if (this.matchesKeywords(lowerInput, this.HISTORY_KEYWORDS)) {
            this.showRecentQuizHistory();
            return;
        }

        // 5. Check for subject-specific performance
        const subjectMatch = this.detectSubject(lowerInput);
        if (subjectMatch && (lowerInput.includes('score') || lowerInput.includes('performance') || lowerInput.includes('how') || lowerInput.includes('stat'))) {
            this.showSubjectPerformance(subjectMatch);
            return;
        }

        // 6. Check for random question requests
        if (/random|give me a question|ask me|one question|quiz me|test me/.test(lowerInput)) {
            const subjects = Object.keys(this.QUESTION_BANK);
            for (const subj of subjects) {
                if (lowerInput.includes(subj)) {
                    this.presentRandomQuestion(subj);
                    return;
                }
            }
            this.presentRandomQuestion();
            return;
        }

        // 7. Small talk
        const smallTalkResponse = this.getSmallTalkResponse(userInput);
        if (smallTalkResponse) {
            this.addBotMessage(smallTalkResponse);
            setTimeout(() => this.handleBotResponse('Back to main menu'), 800);
            return;
        }

        // 8. Keyword intent matching
        const matchedIntent = this.getIntentFromInput(userInput);
        setTimeout(() => this.handleBotResponse(matchedIntent), 500);
    },

    matchesKeywords(input, keywords) {
        return keywords.some(kw => input.includes(kw));
    },

    detectSubject(input) {
        const subjectMap = {
            'english': 'english', 'verbal': 'english',
            'quantitative': 'quantitative', 'quant': 'quantitative', 'aptitude': 'quantitative',
            'reasoning': 'reasoning',
            'math': 'math', 'mathematics': 'math',
            'physics': 'physics',
            'chemistry': 'chemistry',
            'biology': 'biology'
        };
        for (const [keyword, subject] of Object.entries(subjectMap)) {
            if (input.includes(keyword)) return subject;
        }
        return null;
    },

    getIntentFromInput(input) {
        const lowerInput = input.toLowerCase();
        if (lowerInput.startsWith('search for ') || lowerInput.startsWith('find ') || lowerInput.startsWith('look for ')) {
            const query = lowerInput.replace(/^(search for|find|look for)\s+/, '');
            this.performSearch(query);
            return null;
        }
        for (const keyword in this.KEYWORD_INTENTS) {
            if (lowerInput.includes(keyword)) return this.KEYWORD_INTENTS[keyword];
        }
        return 'Contact Support';
    },

    getSmallTalkResponse(input) {
        const lowerInput = input.toLowerCase();
        for (const category in this.SMALL_TALK) {
            for (const keyword of this.SMALL_TALK[category].keywords) {
                if (lowerInput.includes(keyword)) return this.SMALL_TALK[category].response;
            }
        }
        return null;
    },

    // ══════════════════════════════════════════
    //  PERFORMANCE ANALYTICS
    // ══════════════════════════════════════════

    /** Get overall stats from the app's userProgress */
    _getStats() {
        try {
            if (typeof calculateOverallStats === 'function') return calculateOverallStats();
        } catch (e) {}

        // Fallback: calculate from userProgress directly
        const up = window.userProgress || {};
        let totalQuizzes = 0, quizzesPassed = 0, totalScore = 0;
        const subjectStats = {};
        for (const key in up) {
            if (up[key] && typeof up[key].score === 'number') {
                totalQuizzes++;
                totalScore += up[key].score;
                if (up[key].score >= 40) quizzesPassed++;
                const subject = key.split('_')[0];
                if (!subjectStats[subject]) subjectStats[subject] = { totalScore: 0, count: 0 };
                subjectStats[subject].totalScore += up[key].score;
                subjectStats[subject].count++;
            }
        }
        return {
            totalQuizzes,
            quizzesPassed,
            averageScore: totalQuizzes > 0 ? totalScore / totalQuizzes : 0,
            subjectStats
        };
    },

    /** Get topic strengths/weaknesses */
    _getTopicAnalysis() {
        try {
            if (typeof analyzeTopicStrength === 'function') return analyzeTopicStrength();
        } catch (e) {}
        return { strengths: [], improvements: [] };
    },

    /** Get recent quiz history */
    _getRecentHistory(limit = 5) {
        const up = window.userProgress || {};
        const history = up.quizHistory || [];
        return history.slice(-limit).reverse();
    },

    _scoreClass(score) {
        if (score >= 70) return 'good';
        if (score >= 40) return 'warning';
        return 'bad';
    },

    _getSubjectTitle(subject) {
        const titles = {
            quantitative: 'Quantitative Aptitude', english: 'English', reasoning: 'Reasoning',
            math: 'Mathematics', physics: 'Physics', chemistry: 'Chemistry', biology: 'Biology'
        };
        // Handle academic subjects like 'class9' by checking the app
        if (subject.startsWith('class')) {
            try {
                if (typeof getSubjectTitle === 'function') return getSubjectTitle(subject);
            } catch(e) {}
        }
        return titles[subject] || subject.charAt(0).toUpperCase() + subject.slice(1);
    },

    // ── Performance Summary ──
    showPerformanceSummary() {
        const stats = this._getStats();
        const analysis = this._getTopicAnalysis();
        const up = window.userProgress || {};
        const coins = up.quizCoins || 0;
        const streak = up.currentStreak || 0;
        const passRate = stats.totalQuizzes > 0 ? Math.round((stats.quizzesPassed / stats.totalQuizzes) * 100) : 0;

        if (stats.totalQuizzes === 0) {
            this.addBotMessage("📊 You haven't taken any quizzes yet! Start a quiz from the home page to build your performance profile.", ['Back to main menu']);
            return;
        }

        let html = `<div class="bot-performance-card">
            <h4>📊 Your Performance Summary</h4>
            <div class="bot-stat-row"><span class="bot-stat-label">Quizzes Taken</span><span class="bot-stat-value">${stats.totalQuizzes}</span></div>
            <div class="bot-stat-row"><span class="bot-stat-label">Quizzes Passed</span><span class="bot-stat-value ${this._scoreClass(passRate)}">${stats.quizzesPassed} (${passRate}%)</span></div>
            <div class="bot-stat-row"><span class="bot-stat-label">Average Score</span><span class="bot-stat-value ${this._scoreClass(stats.averageScore)}">${stats.averageScore.toFixed(1)}%</span></div>
            <div class="bot-stat-row"><span class="bot-stat-label">Quiz Coins</span><span class="bot-stat-value">💰 ${coins}</span></div>
            <div class="bot-stat-row"><span class="bot-stat-label">Current Streak</span><span class="bot-stat-value">🔥 ${streak} days</span></div>
        </div>`;

        // Subject breakdown
        if (Object.keys(stats.subjectStats).length > 0) {
            html += `<div class="bot-performance-card"><h4>📚 Subject Breakdown</h4>`;
            for (const [subject, data] of Object.entries(stats.subjectStats)) {
                const avg = Math.round(data.totalScore / data.count);
                html += `<div class="bot-stat-row"><span class="bot-stat-label">${this._getSubjectTitle(subject)}</span><span class="bot-stat-value ${this._scoreClass(avg)}">${avg}% (${data.count} quizzes)</span></div>`;
            }
            html += `</div>`;
        }

        // Strengths & weaknesses chips
        if (analysis.strengths.length > 0) {
            html += `<div class="bot-performance-card"><h4>💪 Strong Topics</h4>`;
            analysis.strengths.slice(0, 5).forEach(t => {
                html += `<span class="bot-topic-chip">${t.name} (${t.score}%)</span>`;
            });
            html += `</div>`;
        }

        if (analysis.improvements.length > 0) {
            html += `<div class="bot-performance-card"><h4>📈 Areas to Improve</h4>`;
            analysis.improvements.slice(0, 5).forEach(t => {
                html += `<span class="bot-topic-chip weak">${t.name} (${t.score}%)</span>`;
            });
            html += `</div>`;
        }

        // Verdict
        let verdict = '';
        if (stats.averageScore >= 80) verdict = "🌟 **Outstanding!** You're a top performer. Keep pushing for perfection!";
        else if (stats.averageScore >= 60) verdict = "👍 **Good job!** You're performing well. Focus on your weak areas to level up!";
        else if (stats.averageScore >= 40) verdict = "💪 **Keep going!** You're passing, but there's room for improvement. Practice your weak topics.";
        else verdict = "📖 **Don't give up!** Focus on understanding the concepts and practice more. You'll get there!";
        html += `<p style="margin-top:12px">${verdict}</p>`;

        this.addBotMessage(html, ['💪 My Strengths', '📈 My Weaknesses', '📜 Recent History', 'Back to main menu']);
    },

    // ── Strengths Detail ──
    showStrengths() {
        const analysis = this._getTopicAnalysis();
        if (analysis.strengths.length === 0) {
            this.addBotMessage("You need to score 70%+ on topics to identify your strong points. Keep practicing! 💪", ['📊 Performance Summary', 'Back to main menu']);
            return;
        }

        let html = `<div class="bot-performance-card"><h4>💪 Your Strong Topics</h4>`;
        analysis.strengths.forEach(t => {
            html += `<div class="bot-stat-row"><span class="bot-stat-label">${t.name} <small>(${t.subject})</small></span><span class="bot-stat-value good">${t.score}%</span></div>`;
        });
        html += `</div><p>Great work on these topics! Consider helping classmates or challenging yourself with harder sets. 🏆</p>`;

        this.addBotMessage(html, ['📈 My Weaknesses', '📊 Performance Summary', 'Back to main menu']);
    },

    // ── Weaknesses Detail ──
    showWeaknesses() {
        const analysis = this._getTopicAnalysis();
        if (analysis.improvements.length === 0) {
            this.addBotMessage("No specific weak areas found! Either you're doing great or you need to attempt more quizzes. 📚", ['📊 Performance Summary', 'Back to main menu']);
            return;
        }

        let html = `<div class="bot-performance-card"><h4>📈 Topics to Improve</h4>`;
        analysis.improvements.forEach(t => {
            html += `<div class="bot-stat-row"><span class="bot-stat-label">${t.name} <small>(${t.subject})</small></span><span class="bot-stat-value warning">${t.score}%</span></div>`;
        });
        html += `</div><p>💡 <strong>Tip:</strong> Re-attempt these quiz sets. Focus on understanding why answers are correct, not just memorizing them.</p>`;

        this.addBotMessage(html, ['💪 My Strengths', '📊 Performance Summary', 'Back to main menu']);
    },

    // ── Recent Quiz History ──
    showRecentQuizHistory() {
        const history = this._getRecentHistory(8);
        if (history.length === 0) {
            this.addBotMessage("No quiz history found yet. Take some quizzes to see your activity here! 🎯", ['Back to main menu']);
            return;
        }

        let html = `<div class="bot-performance-card"><h4>📜 Recent Quiz Activity</h4>`;
        history.forEach(entry => {
            const date = entry.date ? new Date(entry.date).toLocaleDateString() : 'Unknown';
            const scoreClass = this._scoreClass(entry.score || 0);
            const subject = entry.subject ? this._getSubjectTitle(entry.subject) : '';
            html += `<div class="bot-stat-row">
                <span class="bot-stat-label">${entry.chapter || 'Quiz'} ${subject ? `<small>(${subject})</small>` : ''}<br><small>${date}</small></span>
                <span class="bot-stat-value ${scoreClass}">${entry.score || 0}%</span>
            </div>`;
        });
        html += `</div>`;

        this.addBotMessage(html, ['📊 Performance Summary', 'Back to main menu']);
    },

    // ── Subject-Specific Performance ──
    showSubjectPerformance(subjectKey) {
        const stats = this._getStats();
        const subjectData = stats.subjectStats[subjectKey];

        if (!subjectData) {
            this.addBotMessage(`I don't have any quiz data for **${this._getSubjectTitle(subjectKey)}** yet. Take some quizzes in that subject first! 📝`, ['Back to main menu']);
            return;
        }

        const avg = Math.round(subjectData.totalScore / subjectData.count);
        let html = `<div class="bot-performance-card">
            <h4>📚 ${this._getSubjectTitle(subjectKey)} Performance</h4>
            <div class="bot-stat-row"><span class="bot-stat-label">Quizzes Taken</span><span class="bot-stat-value">${subjectData.count}</span></div>
            <div class="bot-stat-row"><span class="bot-stat-label">Average Score</span><span class="bot-stat-value ${this._scoreClass(avg)}">${avg}%</span></div>
        </div>`;

        // Find specific chapters for this subject
        const analysis = this._getTopicAnalysis();
        const relatedStrengths = analysis.strengths.filter(t => t.subject === this._getSubjectTitle(subjectKey));
        const relatedWeaknesses = analysis.improvements.filter(t => t.subject === this._getSubjectTitle(subjectKey));

        if (relatedStrengths.length > 0) {
            html += `<p>💪 <strong>Strong chapters:</strong> ${relatedStrengths.map(t => `${t.name} (${t.score}%)`).join(', ')}</p>`;
        }
        if (relatedWeaknesses.length > 0) {
            html += `<p>📈 <strong>Needs work:</strong> ${relatedWeaknesses.map(t => `${t.name} (${t.score}%)`).join(', ')}</p>`;
        }

        this.addBotMessage(html, ['📊 Full Summary', 'Back to main menu']);
    },

    // ══════════════════════════════════════════
    //  CONVERSATION TREE HANDLER
    // ══════════════════════════════════════════
    handleBotResponse(key) {
        if (!key) return;

        // Clean emoji prefix from button text (handles multi-byte Unicode)
        const cleanKey = key.replace(/^[\u{1F300}-\u{1FFFF}\u{2600}-\u{27FF}\u{FE00}-\u{FEFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}]+\s*/u, '').trim();

        // Performance route aliases — check both raw key and cleaned key
        const lowerKey = key.toLowerCase();
        const lowerClean = cleanKey.toLowerCase();
        if (lowerClean === 'performance summary' || lowerClean === 'full summary' || lowerKey.includes('performance summary') || lowerKey.includes('full summary')) { this.showPerformanceSummary(); return; }
        if (lowerClean === 'my strengths' || lowerKey.includes('my strengths')) { this.showStrengths(); return; }
        if (lowerClean === 'my weaknesses' || lowerKey.includes('my weaknesses')) { this.showWeaknesses(); return; }
        if (lowerClean === 'recent history' || lowerKey.includes('recent history')) { this.showRecentQuizHistory(); return; }
        if (lowerClean === 'another question' || lowerClean === 'random question' || lowerKey.includes('another question') || lowerKey.includes('random question')) { this.presentRandomQuestion(); return; }

        let response = this.CONVERSATION_TREE[key] || this.CONVERSATION_TREE[cleanKey];
        if (!response) {
            const fallbackMessage = "I'm not sure I understand. I can help with **performance stats**, **quizzes**, **account issues**, or **searching** for content. Try asking differently!";
            const mainMenuResponse = this.CONVERSATION_TREE['Back to main menu'];
            this.addBotMessage(fallbackMessage, mainMenuResponse.options);
            this._currentState = 'start';
            return;
        }

        if (response.action) {
            this._currentState = response.action;
            this.addBotMessage(response.message);
            this._input.focus();
            return;
        }

        if (response.mailto) {
            this.addBotMessage(response.message);
            const mailtoBtn = document.createElement('a');
            mailtoBtn.href = `mailto:${response.mailto}?subject=Quizify Support Request`;
            mailtoBtn.textContent = `📧 Email Support: ${response.mailto}`;
            mailtoBtn.className = 'btn btn--primary';
            mailtoBtn.style.marginTop = '1rem';
            mailtoBtn.style.display = 'inline-block';
            mailtoBtn.style.textDecoration = 'none';
            mailtoBtn.target = '_blank';
            this._chatContainer.appendChild(mailtoBtn);
        } else {
            this.addBotMessage(response.message, response.options);
        }
        this._currentState = 'start';
    },

    // ══════════════════════════════════════════
    //  SEARCH
    // ══════════════════════════════════════════
    performSearch(query) {
        const results = this._app.performGlobalSearch(query);
        this._currentState = 'start';

        if (results.length === 0) {
            this.addBotMessage(`No results found for "${query}". Try a different search term.`, this.CONVERSATION_TREE['start'].options);
            return;
        }

        let html = `<p>Found <strong>${results.length}</strong> results for "${query}":</p><ul>`;
        results.forEach(result => {
            const context = result.type === 'academic'
                ? `(Class ${result.class} - ${this._getSubjectTitle(result.subject)})`
                : `(${this._getSubjectTitle(result.subject)})`;
            html += `<li><button class="bot-search-result-btn" data-result='${JSON.stringify(result)}'>
                <strong>${result.chapterName}</strong><span>${context}</span>
            </button></li>`;
        });
        html += '</ul><p>Click a result to navigate to it.</p>';
        this.addBotMessage(html, this.CONVERSATION_TREE['start'].options);
    },

    navigateToSearchResult(result) {
        const app = this._app;
        app.currentChapter = result.chapterName;
        app.currentSubject = result.subject;
        app.classMode = result.type === 'academic';
        app.currentClass = result.class || '';
        app.currentStream = result.stream || '';
        this.closeHelpBot();
        app.displayChapterInfo();
        app.showPage('chapter-page');
        app.showNotification(`Navigating to ${result.chapterName}...`, 'info');
    },

    // ══════════════════════════════════════════
    //  RANDOM QUESTIONS
    // ══════════════════════════════════════════
    presentRandomQuestion(subject = null) {
        let pool = [];
        if (subject && this.QUESTION_BANK[subject] && this.QUESTION_BANK[subject].length > 0) {
            pool = this.QUESTION_BANK[subject];
        } else {
            for (const key in this.QUESTION_BANK) pool = pool.concat(this.QUESTION_BANK[key]);
        }

        if (pool.length === 0) {
            this.addBotMessage("I don't have questions for that topic yet. Try another!", ['Back to main menu']);
            return;
        }

        const q = pool[Math.floor(Math.random() * pool.length)];
        this._currentQuestion = q;

        const messageDiv = this.addMessage(`<strong>🎯 ${q.question}</strong>`, 'bot-message', true);
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'bot-options-container';
        optionsContainer.style.flexDirection = 'column';
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'bot-question-option';
            btn.textContent = opt;
            btn.dataset.index = i;
            optionsContainer.appendChild(btn);
        });
        messageDiv.querySelector('.chat-message-content').appendChild(optionsContainer);
        this._chatContainer.scrollTop = this._chatContainer.scrollHeight;
    },

    evaluateAnswer(choiceIndex) {
        const q = this._currentQuestion;
        if (!q) {
            this.addBotMessage("No active question. Ask me to give you a random question first!");
            return;
        }

        const correct = choiceIndex === q.answerIndex;
        if (correct) {
            this.addBotMessage(`✅ **Correct!** ${q.explanation || ''}`);
            try {
                if (this._app && typeof this._app.awardCoins === 'function') {
                    this._app.awardCoins(5);
                    this.addBotMessage('You earned **5 Quiz Coins** for that! 💰');
                }
            } catch (e) {}
        } else {
            const correctText = q.options[q.answerIndex];
            this.addBotMessage(`❌ **Not quite.** The correct answer is: *${correctText}*. ${q.explanation || ''}`);
        }

        this._currentQuestion = null;
        this.addBotMessage('Want another question or something else?', ['🎲 Another question', '📊 Performance Summary', 'Back to main menu']);
    },

    // ══════════════════════════════════════════
    //  MESSAGE RENDERING
    // ══════════════════════════════════════════
    addMessage(text, sender, hasAvatar = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;

        let avatarHtml = '';
        if (hasAvatar) {
            avatarHtml = `<div class="chat-message-avatar bot-avatar">🤖</div>`;
        }

        // Convert markdown-style bold to HTML
        const formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');

        messageDiv.innerHTML = `${avatarHtml}<div class="chat-message-content">${formattedText}</div>`;
        this._chatContainer.appendChild(messageDiv);
        this._chatContainer.scrollTop = this._chatContainer.scrollHeight;
        return messageDiv;
    },

    addUserMessage(text) {
        this.addMessage(text, 'user-message');
    },

    addBotMessage(text, options = []) {
        const messageDiv = this.addMessage(text, 'bot-message', true);

        if (options.length > 0) {
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'bot-options-container';
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'bot-option-btn';
                btn.textContent = opt;
                optionsContainer.appendChild(btn);
            });
            messageDiv.querySelector('.chat-message-content').appendChild(optionsContainer);
        }
        this._chatContainer.scrollTop = this._chatContainer.scrollHeight;
    },

    // ── Support mailto builder ──
    createSupportMailto() {
        const recipient = this.CONVERSATION_TREE['Contact Support'].mailto;
        const _authUser = firebase.auth().currentUser;
        const userName = _authUser?.displayName || _authUser?.email?.split('@')[0] || 'N/A';
        const appVersion = this._app.APP_VERSION || 'N/A';
        const subject = `Quizify Support Request from ${userName}`;
        let conversationHistory = "Bot Conversation History:\n";
        this._chatContainer.querySelectorAll('.chat-message').forEach(msg => {
            const sender = msg.classList.contains('bot-message') ? 'Bot' : 'User';
            const text = msg.querySelector('.chat-message-content').textContent.trim().replace(/\s+/g, ' ');
            conversationHistory += `[${sender}]: ${text}\n`;
        });
        const body = `Hello Quizify Support,\n\nPlease describe your issue below:\n-------------------------------------\n\n\n\n-------------------------------------\n\nUser Name: ${userName}\nApp Version: ${appVersion}\n\n${conversationHistory}`;
        return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
};
