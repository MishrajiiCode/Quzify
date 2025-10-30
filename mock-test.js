// mock-test.js - Contains all logic for the Mock Test feature.

const MockTest = {
    _app: null,
    _allQuizData: [],
    
    // State for the current mock test
    isActive: false,
    questions: [],
    userAnswers: [],
    currentQuestionIndex: 0,
    currentSection: 'quantitative',
    timer: null,
    timeRemaining: 0,

    // DOM Elements
    page: null,
    rulesModal: null,
    resultsPage: null,
    
    SECTION_CONFIG: { // This was step 1, but I've renumbered for clarity
        quantitative: { name: 'Quantitative Aptitude', count: 25 },
        english: { name: 'English', count: 25 },
        reasoning: { name: 'Reasoning', count: 25 },
        general_science: { name: 'General Science', count: 25 }
    },

    init(app, allQuizData) {
        this._app = app;
        this._allQuizData = allQuizData;

        this.page = document.getElementById('mock-test-page');
        this.rulesModal = document.getElementById('mock-test-rules-modal');
        this.resultsPage = document.getElementById('mock-test-results-page'); // This was correct, the issue was in the handleLogin function.

        this.initializeEventListeners();
    },

    initializeEventListeners() {
        if (!this.page || !this.rulesModal || !this.resultsPage) return;

        // Rules Modal
        document.getElementById('start-mock-test-btn').addEventListener('click', () => {
            this.rulesModal.classList.remove('visible');
            this.start();
        });
        document.getElementById('close-rules-modal-btn').addEventListener('click', () => {
            this.rulesModal.classList.remove('visible');
            this._app.goToHome();
        });

        // Mock Test Page Navigation
        this.page.querySelector('#mock-prev-btn').addEventListener('click', () => this.navigateQuestion(-1));
        this.page.querySelector('#mock-next-btn').addEventListener('click', () => this.navigateQuestion(1));
        this.page.querySelector('#mock-submit-btn').addEventListener('click', () => this.confirmSubmit());

        // Section Tabs
        this.page.querySelector('#mock-section-tabs').addEventListener('click', (e) => {
            if (e.target.matches('.mock-section-tab')) {
                this.switchSection(e.target.dataset.section);
            }
        });

        // Question Grid
        this.page.querySelector('#mock-question-numbers').addEventListener('click', (e) => {
            if (e.target.matches('.question-number')) {
                this.goToQuestion(parseInt(e.target.dataset.index, 10));
            }
        });

        // Options Container
        this.page.querySelector('#mock-options-container').addEventListener('click', (e) => {
            if (e.target.matches('.option')) {
                this.selectOption(parseInt(e.target.dataset.optionIndex, 10));
            }
        });

        // Results Page
        this.resultsPage.querySelector('#mock-results-home-btn').addEventListener('click', () => this._app.goToHome());
    },

    showRules() {
        // NEW: Prevent background scroll when modal is open
        document.body.style.overflow = 'hidden';
        this.rulesModal.querySelector('#close-rules-modal-btn').onclick = () => {
            document.body.style.overflow = ''; // Restore scroll
            this.rulesModal.classList.remove('visible');
        };
        this.rulesModal.classList.add('visible');
    },

    generateQuestions() {
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

        const selectedQuestions = {
            quantitative: this.getRandomQuestions('quantitative', this.SECTION_CONFIG.quantitative.count, seed),
            english: this.getRandomQuestions('english', this.SECTION_CONFIG.english.count, seed + 1),
            reasoning: this.getRandomQuestions('reasoning', this.SECTION_CONFIG.reasoning.count, seed + 2),
            general_science: this.getRandomGSQuestions(this.SECTION_CONFIG.general_science.count, seed + 3)
        };

        this.questions = [
            ...selectedQuestions.quantitative,
            ...selectedQuestions.english,
            ...selectedQuestions.reasoning,
            ...selectedQuestions.general_science
        ];

        if (this.questions.length === 0) {
            this._app.showNotification('Could not generate a mock test. No questions available in any subject.', 'error');
            this._app.goToHome();
            return false;
        }
        return true; // Proceed even with fewer than 100 questions
    },

    getRandomQuestions(subjectKey, count, seed) {
        const subjectData = this._allQuizData.find(d => d.id === subjectKey);
        if (!subjectData) return [];
 
        // DEFINITIVE FIX: This correctly handles the structure from your JS files.
        // It flattens the array of sets, which are themselves arrays of questions.
        const allQuestions = (subjectData.chapters || []).flatMap(chapter =>
            (chapter.sets || []).flatMap(set => {
                // The 'set' can be an array of questions `[...]` or an object `{ questions: [...] }`
                return Array.isArray(set) ? set : (set.questions || []);
            })
        );
 
        return this._app.seededShuffle(allQuestions, seed).slice(0, count).map(q => ({ ...q, section: subjectKey }));
    },
 
    getRandomGSQuestions(count, seed) {
        const gsSubjects = this._allQuizData.filter(d => d.category === 'general_science');
        // DEFINITIVE FIX: Use the same robust logic as getRandomQuestions.
        const allGSQuestions = gsSubjects.flatMap(sub =>
            (sub.chapters || []).flatMap(chapter =>
                (chapter.sets || []).flatMap(set => Array.isArray(set) ? set : (set.questions || []))
            )
        );
 
        return this._app.seededShuffle(allGSQuestions, seed).slice(0, count).map(q => ({ ...q, section: 'general_science' }));
    },

    start() {
        // NEW: Restore body scroll when test starts
        document.body.style.overflow = '';

        if (!this.generateQuestions()) return;

        this.isActive = true;
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.currentQuestionIndex = 0;
        this.currentSection = 'quantitative';

        // NEW: Dynamically calculate time. 60 mins for 100 questions = 36 seconds per question.
        this.timeRemaining = this.questions.length * 36;
        this.totalTime = this.timeRemaining; // Store the initial total time

        this._app.showPage('mock-test-page');
        this.renderQuestion();
        this.renderQuestionGrid();
        this.updateSectionTabs();
        this.startTimer();
    },

    startTimer() {
        if (this.timer) clearInterval(this.timer);
        const timerEl = this.page.querySelector('#mock-timer');

        // NEW: Initial display of dynamic time
        const initialMinutes = Math.floor(this.timeRemaining / 60);
        const initialSeconds = this.timeRemaining % 60;
        timerEl.textContent = `${String(initialMinutes).padStart(2, '0')}:${String(initialSeconds).padStart(2, '0')}`;
        
        this.timer = setInterval(() => {
            this.timeRemaining--;
            const minutes = Math.floor(this.timeRemaining / 60);
            const seconds = this.timeRemaining % 60;
            timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            if (this.timeRemaining <= 0) {
                clearInterval(this.timer);
                this.submitTest();
            }
        }, 1000);
    },

    renderQuestion() {
        if (this.currentQuestionIndex < 0 || this.currentQuestionIndex >= this.questions.length) return;

        const question = this.questions[this.currentQuestionIndex];
        this.page.querySelector('#mock-question-number').textContent = `Question ${this.currentQuestionIndex + 1}`;
        this.page.querySelector('#mock-question-text').textContent = question.question;

        const optionsContainer = this.page.querySelector('#mock-options-container');
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.dataset.optionIndex = index;
            optionDiv.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
            if (this.userAnswers[this.currentQuestionIndex] === index) {
                optionDiv.classList.add('selected');
            }
            optionsContainer.appendChild(optionDiv);
        });

        this.updateQuestionGrid();
    },

    renderQuestionGrid() {
        const grid = this.page.querySelector('#mock-question-numbers');
        grid.innerHTML = '';
        this.questions.forEach((q, index) => {
            const numberDiv = document.createElement('div');
            numberDiv.className = 'question-number';
            numberDiv.dataset.index = index;
            numberDiv.dataset.section = q.section;
            numberDiv.textContent = index + 1;
            grid.appendChild(numberDiv);
        });
    },

    updateQuestionGrid() {
        const gridItems = this.page.querySelectorAll('.question-number');
        gridItems.forEach((item, index) => {
            item.classList.remove('current', 'answered', 'not-answered');
            if (index === this.currentQuestionIndex) {
                item.classList.add('current');
            } else if (this.userAnswers[index] !== null) {
                item.classList.add('answered');
            } else {
                item.classList.add('not-answered');
            }

            // Show/hide based on current section
            if (item.dataset.section === this.currentSection) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    },

    updateSectionTabs() {
        const tabs = this.page.querySelectorAll('.mock-section-tab');
        tabs.forEach(tab => {
            if (tab.dataset.section === this.currentSection) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    },

    selectOption(optionIndex) {
        this.userAnswers[this.currentQuestionIndex] = optionIndex;
        this.renderQuestion(); // Re-render to show selection
    },

    navigateQuestion(direction) {
        const newIndex = this.currentQuestionIndex + direction;
        if (newIndex >= 0 && newIndex < this.questions.length) {
            const newQuestion = this.questions[newIndex];
            if (newQuestion.section !== this.currentSection) {
                this.switchSection(newQuestion.section);
            }
            this.currentQuestionIndex = newIndex;
            this.renderQuestion();
        }
    },

    goToQuestion(index) {
        if (index >= 0 && index < this.questions.length) {
            this.currentQuestionIndex = index;
            this.renderQuestion();
        }
    },

    switchSection(sectionKey) {
        this.currentSection = sectionKey;
        
        // Find the first question of the new section and jump to it
        const firstQuestionOfSectionIndex = this.questions.findIndex(q => q.section === sectionKey);
        if (firstQuestionOfSectionIndex !== -1) {
            this.currentQuestionIndex = firstQuestionOfSectionIndex;
        }

        this.updateSectionTabs();
        this.renderQuestion();
    },

    confirmSubmit() {
        const unansweredCount = this.userAnswers.filter(a => a === null).length;
        if (unansweredCount > 0) {
            if (!confirm(`You have ${unansweredCount} unanswered questions. Are you sure you want to submit?`)) {
                return;
            }
        } else {
            if (!confirm('Are you sure you want to submit the test?')) {
                return;
            }
        }
        this.submitTest();
    },

    submitTest() {
        if (this.timer) clearInterval(this.timer);
        this.isActive = false;

        const results = this.calculateResults();
        this.displayResults(results);
        this.saveResults(results);

        this._app.showPage('mock-test-results-page');
    },

    calculateResults() {
        const sectionResults = {};
        let totalCorrect = 0;
        let totalIncorrect = 0;
        let totalUnanswered = 0;

        // Initialize section results
        for (const key in this.SECTION_CONFIG) {
            sectionResults[key] = {
                correct: 0,
                incorrect: 0,
                unanswered: 0,
                score: 0
            };
        }

        this.questions.forEach((q, index) => {
            const userAnswer = this.userAnswers[index];
            const section = q.section;

            if (userAnswer === null) {
                sectionResults[section].unanswered++;
                totalUnanswered++;
            } else if (userAnswer === q.answer) {
                sectionResults[section].correct++;
                totalCorrect++;
            } else {
                sectionResults[section].incorrect++;
                totalIncorrect++;
            }
        });

        // Calculate scores
        let totalScore = 0;
        for (const key in sectionResults) {
            const section = sectionResults[key];
            section.score = (section.correct * 2) - (section.incorrect * 0.5);
            totalScore += section.score;
        }

        return {
            totalScore,
            totalCorrect,
            totalIncorrect,
            totalUnanswered,
            sectionResults
        };
    },

    displayResults(results) {
        const totalPossibleMarks = this.questions.length * 2;
        this.resultsPage.querySelector('#mock-total-score').textContent = results.totalScore.toFixed(2);
        this.resultsPage.querySelector('#mock-total-marks').textContent = totalPossibleMarks.toFixed(2);

        this.resultsPage.querySelector('#mock-total-questions-summary').textContent = this.questions.length;
        this.resultsPage.querySelector('#mock-correct-answers').textContent = results.totalCorrect;
        this.resultsPage.querySelector('#mock-incorrect-answers').textContent = results.totalIncorrect;
        this.resultsPage.querySelector('#mock-unanswered').textContent = results.totalUnanswered;

        // NEW: Use totalTime for accurate calculation
        const timeTaken = this.totalTime - this.timeRemaining;
        const minutes = Math.floor(timeTaken / 60);
        const seconds = timeTaken % 60;
        this.resultsPage.querySelector('#mock-time-taken').textContent = `${minutes}m ${seconds}s`;

        const sectionResultsContainer = this.resultsPage.querySelector('#mock-section-wise-results');
        sectionResultsContainer.innerHTML = '';

        for (const key in results.sectionResults) {
            const section = results.sectionResults[key];
            const sectionConfig = this.SECTION_CONFIG[key];
            // NEW: Calculate max marks for the section based on actual questions
            const questionsInSection = this.questions.filter(q => q.section === key).length;
            const maxSectionMarks = questionsInSection * 2;
            const sectionHtml = `
                <div class="section-result-item">
                    <h4>${sectionConfig.name}</h4>
                    <p>Score: <strong>${section.score.toFixed(2)} / ${maxSectionMarks}</strong></p>
                    <div class="section-stats">
                        <span>Correct: ${section.correct}</span>
                        <span>Incorrect: ${section.incorrect}</span>
                        <span>Unanswered: ${section.unanswered}</span>
                    </div>
                </div>
            `;
            sectionResultsContainer.innerHTML += sectionHtml;
        }
    },

    saveResults(results) {
        const today = new Date().toISOString().split('T')[0];
        const progressKey = `mock_test_${today}`; // This key identifies today's mock attempt

        // NEW: Create a more detailed attempt object as requested
        const attemptData = {
            score: results.totalScore,
            date: new Date().toISOString(),
            timeTaken: this.totalTime - this.timeRemaining,
            totalQuestions: this.questions.length,
            totalCorrect: results.totalCorrect,
            totalIncorrect: results.totalIncorrect,
            totalUnanswered: results.totalUnanswered,
            totalMarks: this.questions.length * 2,
            details: results.sectionResults,
            mockId: `Mock ${today}` // Example: Mock 2025-10-29
        };

        if (!this._app.userProgress.mockHistory) {
            this._app.userProgress.mockHistory = {};
        }

        // Store the latest attempt for the day
        this._app.userProgress.mockHistory[progressKey] = attemptData;
        this._app.saveUserProgress();
    },

    checkAndDisplayDailyMock() {
        const today = new Date().toISOString().split('T')[0];
        const progressKey = `mock_test_${today}`;
        const card = document.getElementById('mock-test-card');
        const statusEl = card.querySelector('.mock-test-status');

        if (this._app.userProgress.mockHistory && this._app.userProgress.mockHistory[progressKey]) {
            const lastAttempt = this._app.userProgress.mockHistory[progressKey];
            statusEl.textContent = `Attempted Today. Score: ${lastAttempt.score.toFixed(2)}`;
            statusEl.style.color = 'var(--color-success)';
        } else {
            statusEl.textContent = 'A new mock test is available!';
            statusEl.style.color = '';
        }
    }
};
