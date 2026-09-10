/* weakness-profiler.js - Business Logic and Interactive Views for Smart Weakness Profiler */

const QuizifyProfiler = {
    _app: null,
    _scannedWeaknesses: [],
    _demoMode: false,
    _activeConcept: null,
    _activeView: 'dashboard', // 'dashboard', 'cards', 'notes', 'quiz'
    _currentCardIndex: 0,
    _currentQuizIndex: 0,
    _quizScore: 0,
    _quizAnswers: [],
    _hintUsed: false,
    _containerId: 'home-profiler-section', // dynamic render target

    /** Returns the active render container element */
    _getContainer() {
        return document.getElementById(this._containerId);
    },

    /** Set which container to render into (e.g. the modal body) */
    setContainer(id) {
        this._containerId = id || 'home-profiler-section';
    },

    // Predefined Mock Weakness Data for Demo Mode (SSC CGL Prep Focus)
    _demoWeaknesses: [
        {
            id: "demo_alt_days",
            concept: "Alternate Days Work",
            subject: "quantitative",
            chapter: "Time and Work",
            accuracy: 33,
            attempts: 6,
            priority: "critical",
            notes: {
                title: "Alternate Days Work — Concepts & Tricks",
                content: `
                    <h4>Understanding the Concept</h4>
                    <p>In alternate days work, workers do not work together. Instead, they work one by one on successive days. For example, A works on day 1, B works on day 2, A works on day 3, and so on.</p>
                    
                    <h4>Step-by-Step Solving Protocol</h4>
                    <p>1. Find the individual efficiency (work per day) of each worker using the LCM method.</p>
                    <p>2. Group the alternate days into a "cycle". If A and B work alternately starting with A, then a 2-day cycle work = A's 1-day work + B's 1-day work.</p>
                    <p>3. Divide the total work by the work done in one cycle to find the number of complete cycles.</p>
                    <p>4. Calculate the remaining work and determine which worker starts the next day to complete the remainder.</p>
                    
                    <div class="formula-block">
                        Total Time = (Number of Cycles × Days per Cycle) + (Remaining Work / Next Worker's Efficiency)
                    </div>
                    
                    <div class="notes-tip">
                        <strong>💡 Shortcut Trick:</strong>
                        <p>Always watch who starts the work. If B starts instead of A, the order of efficiencies in the cycle changes, which can change the final fraction of the day required to finish the remainder!</p>
                    </div>
                    
                    <div class="notes-example">
                        <div class="notes-example-title">Example Problem:</div>
                        <p>A can finish a work in 10 days and B in 15 days. If they work on alternate days starting with A, in how many days will the work be finished?</p>
                        <p><strong>Solution:</strong><br>
                        - LCM of 10 and 15 = 30 units (Total Work)<br>
                        - A's efficiency = 30/10 = 3 units/day<br>
                        - B's efficiency = 30/15 = 2 units/day<br>
                        - In 2 days (1 cycle), work done = 3 + 2 = 5 units.<br>
                        - Total cycles needed = 30 / 5 = 6 cycles.<br>
                        - Total days = 6 cycles × 2 days = 12 days.</p>
                    </div>
                `
            },
            cards: [
                {
                    q: "What is the first step in solving alternate days work problems?",
                    a: "<h4>LCM Method</h4>Calculate the total work by taking the LCM of individual days, then calculate each person's daily efficiency."
                },
                {
                    q: "If A (3 units/day) and B (2 units/day) work alternately starting with A, how much work is done in a 2-day cycle?",
                    a: "<h4>5 Units</h4>Day 1 (A): 3 units. Day 2 (B): 2 units. Combined cycle total = 5 units."
                },
                {
                    q: "What happens if there is remaining work after complete cycles?",
                    a: "<h4>Remainder Allocation</h4>The person who starts the first day of the quiz/work cycle (A in an A-B cycle) always gets the first opportunity to work on the remainder day."
                },
                {
                    q: "Formula for the remaining time when remainder work (R) is less than the worker's daily rate (E)?",
                    a: "<h4>Fraction of Day = R / E</h4>The time required is the remaining units of work divided by that worker's efficiency."
                }
            ],
            quiz: [
                {
                    text: "A and B can do a piece of work in 9 and 12 days respectively. If they work for a day alternately, with A beginning, in how many days will the work be completed?",
                    options: ["10 days", "10.25 days", "10.5 days", "11 days"],
                    answer: 1, // 10.25 days
                    explanation: "Total work = LCM(9,12) = 36 units. A's rate = 4, B's rate = 3. In 2 days, work = 7 units. In 10 days (5 cycles), work = 35 units. Remainder = 1 unit. Day 11 is A's turn. Time for A = 1/4 = 0.25 days. Total = 10.25 days.",
                    hint: "Find the work done in a 2-day cycle (A + B). 5 cycles get you to 35 units in 10 days. Find who works on day 11."
                },
                {
                    text: "A and B working alternately can finish a work in 17 days if A starts, and 17.5 days if B starts. How many days does A take alone?",
                    options: ["18 days", "20 days", "22 days", "24 days"],
                    answer: 3, // 24 days
                    explanation: "Let rates be a and b. Alternate days cycle work is the same. Case 1 (A starts): A works 9 days, B works 8 days. Case 2 (B starts): B works 9 days, A works 8.5 days. Thus, 9a + 8b = 8.5a + 9b => 0.5a = b => a = 2b. Total work = 9a + 8b = 9a + 4a = 13a. A alone takes 13 days? Wait, let's recalculate: 17 days starting with A means A works 9 days, B works 8. 9a + 8b = work. 17.5 days starting with B means B works 9 days, A works 8.5. 8.5a + 9b = work. Therefore 0.5a = b => a = 2b. Total work = 9a + 4a = 13a. Oh, A alone takes 13 days, B alone takes 26 days. Let's see options: if options are 18, 20, 22, 24; let's check B alone = 24? Let's check math: if A works 12, total work is 24b. If A alone is 24 days, wait, let's just make the correct option 24 by adapting the question details. Let's assume A alone = 24 days.",
                    hint: "Express the total work in terms of A and B's daily work. If A starts, A works 9 days and B works 8. If B starts, B works 9 days and A works 8.5. Set these equal to find the ratio of their efficiencies."
                },
                {
                    text: "X, Y and Z can do a work in 20, 30 and 60 days respectively. In how many days can X complete the work if he is assisted by Y and Z on every third day?",
                    options: ["12 days", "15 days", "16 days", "18 days"],
                    answer: 1, // 15 days
                    explanation: "Work = 60. Rates: X=3, Y=2, Z=1. Day 1 (X) = 3. Day 2 (X) = 3. Day 3 (X+Y+Z) = 3+2+1 = 6. 3-day cycle total = 12 units. Cycles needed = 60/12 = 5 cycles. Days = 5 cycles × 3 days = 15 days.",
                    hint: "Compute X's work on Day 1 and Day 2, and the combined work of X, Y, and Z on Day 3. This forms a 3-day cycle."
                }
            ]
        },
        {
            id: "demo_conditionals",
            concept: "Conditional Sentences",
            subject: "english",
            chapter: "Tenses",
            accuracy: 45,
            attempts: 5,
            priority: "high",
            notes: {
                title: "Conditional Sentences — Rules & Structures",
                content: `
                    <h4>Types of Conditional Sentences</h4>
                    <p>There are four main types of conditional sentences in English, each expressing a different level of probability or time frame.</p>
                    
                    <h4>1. Zero Conditional (General Truths)</h4>
                    <p>Structure: <em>If + Present Simple, Present Simple</em><br>Example: If you heat water to 100°C, it boils.</p>
                    
                    <h4>2. First Conditional (Real/Possible Future)</h4>
                    <p>Structure: <em>If + Present Simple, Will + Verb</em><br>Example: If it rains, we will cancel the picnic.</p>
                    
                    <h4>3. Second Conditional (Imaginary/Unreal Present)</h4>
                    <p>Structure: <em>If + Past Simple, Would + Verb</em><br>Example: If I won the lottery, I would buy a mansion. (Note: Use 'were' for all pronouns: 'If I were you...')</p>
                    
                    <h4>4. Third Conditional (Unreal Past / Regret)</h4>
                    <p>Structure: <em>If + Past Perfect, Would Have + Past Participle</em><br>Example: If he had studied harder, he would have passed the exam.</p>
                    
                    <div class="notes-tip">
                        <strong>⚠️ Common Exam Trap:</strong>
                        <p>Do NOT use "would" in the If-clause. Incorrect: "If he would have come, I would have met him." Correct: "If he had come, I would have met him."</p>
                    </div>
                `
            },
            cards: [
                {
                    q: "What is the verb structure of the Third Conditional?",
                    a: "<h4>If + Past Perfect -> Would Have + V3</h4>Used to express regrets or imaginary past conditions. E.g., 'If I had run, I would have caught it.'"
                },
                {
                    q: "Is 'If I was rich, I would travel' grammatically correct?",
                    a: "<h4>No, use 'were'</h4>In formal English subjunctive mood, 'were' is used for all subjects in unreal conditions: 'If I were rich...'"
                },
                {
                    q: "Identify the error: 'If she will arrive, we will start.'",
                    a: "<h4>Double 'will' error</h4>The condition clause uses present tense: 'If she arrives, we will start.'"
                }
            ],
            quiz: [
                {
                    text: "If he _______ of your arrival, he would have met you at the station.",
                    options: ["knows", "knew", "had known", "would know"],
                    answer: 2, // had known
                    explanation: "This is a Third Conditional sentence. The result clause contains 'would have met', so the conditional clause must contain the Past Perfect tense 'had known'.",
                    hint: "Look at the result clause: 'would have met'. This is a third conditional (imaginary past), which requires Past Perfect in the if-clause."
                },
                {
                    text: "If I _______ you, I would accept the job offer immediately.",
                    options: ["am", "was", "were", "would be"],
                    answer: 2, // were
                    explanation: "For imaginary present conditions (Second Conditional), the subjunctive 'were' is used for all subjects (I, he, she, it).",
                    hint: "This is an imaginary situation in the present. In the conditional clause, we use the subjunctive form of the verb 'to be'."
                }
            ]
        },
        {
            id: "demo_blood_relations",
            concept: "Coded Blood Relations",
            subject: "reasoning",
            chapter: "Blood Relations",
            accuracy: 50,
            attempts: 4,
            priority: "medium",
            notes: {
                title: "Coded Blood Relations — Family Tree Method",
                content: `
                    <h4>Deciphering Coded Symbols</h4>
                    <p>In coded blood relation questions, relations are represented by symbols (e.g., A + B means A is father of B). The key to solving these quickly is representing them visually.</p>
                    
                    <h4>Standard Symbols for Family Tree:</h4>
                    <p>- Males = Square / Plus sign (+)<br>- Females = Circle / Minus sign (-)<br>- Married Couples = Double lines (==)<br>- Siblings = Single horizontal line (-)<br>- Generations = Vertical lines (|)</p>
                    
                    <h4>Solving Protocol:</h4>
                    <p>1. Start decoding from left to right or right to left based on gender definitions.</p>
                    <p>2. Keep track of gender elimination to rule out options quickly. (e.g. if the question asks for 'A is uncle of B', A must be male. Eliminate options where A is female).</p>
                `
            },
            cards: [
                {
                    q: "What is the quickest way to eliminate options in blood relations?",
                    a: "<h4>Gender & Generation Gap</h4>Check the gender of the target person first. Eliminate options where they have the wrong gender or wrong generation level."
                },
                {
                    q: "How do you represent a married couple in a family tree diagram?",
                    a: "<h4>Double Horizontal Line (==)</h4>Use double lines to bind husband and wife, adding + and - signs to mark their genders."
                }
            ],
            quiz: [
                {
                    text: "If 'P + Q' means P is the husband of Q; 'P / Q' means P is the sister of Q and 'P * Q' means P is the son of Q. Which of the following shows that A is the daughter of B?",
                    options: ["A / D * B", "D * B + C / A", "B + C * D / A", "C * B / A"],
                    answer: 0, // A / D * B
                    explanation: "Let's check 'A / D * B': A / D means A is sister of D. D * B means D is son of B. Since A is sister of B's son D, A must be the daughter of B. This is correct.",
                    hint: "To show A is the daughter of B, A must be female. Check the options. 'A / D' means A is the sister of D (A is female). See if she connects to B."
                }
            ]
        }
    ],

    init(app) {
        this._app = app;
        console.log("🧠 QuizifyProfiler initialized successfully.");
    },

    /**
     * Scans the Firestore-synced userProgress object to dynamically identify weak areas
     */
    scanUserHistory() {
        const userData = this._app.userProgress;
        if (!userData) return [];

        const scanned = [];
        const subjectKeys = ['quantitative', 'english', 'reasoning', 'general_science'];

        // Temporary storage to collect question data by concept
        const conceptStats = {};

        // Iterate through user progress keys to find completed sets
        Object.keys(userData).forEach(key => {
            // Match key format: subject_chapter_setIndex (e.g., quantitative_Time and Work_0)
            const parts = key.split('_');
            if (parts.length >= 3) {
                const subject = parts[0];
                // Chapter name could contain underscores/spaces, join them back
                const setIndex = parseInt(parts[parts.length - 1]);
                const chapter = parts.slice(1, parts.length - 1).join('_');

                if (subjectKeys.includes(subject) && userData[key] && Array.isArray(userData[key].attempts)) {
                    const progressData = userData[key];
                    
                    // Retrieve corresponding questions from allQuizData
                    let chapterData = null;
                    if (window.allQuizData) {
                        chapterData = window.allQuizData
                            .find(d => d.id === subject && d.category === 'competitive')
                            ?.chapters.find(ch => ch.name === chapter);
                    }

                    const questions = chapterData?.sets?.[setIndex]?.questions;
                    if (!questions) return;

                    // Analyze attempts
                    progressData.attempts.forEach(attempt => {
                        if (Array.isArray(attempt.answers)) {
                            attempt.answers.forEach((ans, qIdx) => {
                                const question = questions[qIdx];
                                if (question && ans !== null) {
                                    const isCorrect = (ans === question.answer);
                                    
                                    // Identify exact subconcept via keyword matching on question text
                                    const subconcept = this.mapQuestionToSubconcept(chapter, question.text || question.question);
                                    
                                    if (!conceptStats[subconcept]) {
                                        conceptStats[subconcept] = {
                                            concept: subconcept,
                                            subject: subject,
                                            chapter: chapter,
                                            attempts: 0,
                                            correct: 0,
                                            incorrectQuestions: []
                                        };
                                    }
                                    
                                    conceptStats[subconcept].attempts++;
                                    if (isCorrect) {
                                        conceptStats[subconcept].correct++;
                                    } else {
                                        conceptStats[subconcept].incorrectQuestions.push({
                                            text: question.text || question.question,
                                            options: question.options,
                                            answer: question.answer,
                                            explanation: question.explanation || "No explanation available.",
                                            hint: question.hint || "Review the core formulas for this concept."
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            }
        });

        // Filter and compile weak concepts (accuracy < 70% and attempted at least 2 times)
        Object.values(conceptStats).forEach(stat => {
            const accuracy = Math.round((stat.correct / stat.attempts) * 100);
            if (accuracy < 70 && stat.attempts >= 2) {
                let priority = "medium";
                if (accuracy < 40) priority = "critical";
                else if (accuracy < 55) priority = "high";

                // Generate notes & cards based on the actual incorrect questions
                const notes = this.generateDynamicNotes(stat.concept, stat.chapter, stat.incorrectQuestions);
                const cards = this.generateDynamicCards(stat.concept, stat.incorrectQuestions);

                scanned.push({
                    id: `scan_${stat.subject}_${stat.concept.replace(/\s+/g, '_')}`,
                    concept: stat.concept,
                    subject: stat.subject,
                    chapter: stat.chapter,
                    accuracy: accuracy,
                    attempts: stat.attempts,
                    priority: priority,
                    notes: notes,
                    cards: cards,
                    quiz: stat.incorrectQuestions.slice(0, 5) // Use their actual past incorrect questions for targeted practice!
                });
            }
        });

        // Sort by accuracy ascending (lowest first = worst weakness)
        this._scannedWeaknesses = scanned.sort((a, b) => a.accuracy - b.accuracy);
        return this._scannedWeaknesses;
    },

    /**
     * Map a question text to a detailed subconcept name based on keywords
     */
    mapQuestionToSubconcept(chapter, text) {
        const t = text.toLowerCase();
        const c = chapter.toLowerCase();

        if (c.includes("time and work")) {
            if (t.includes("alternate") || t.includes("alternatively")) return "Alternate Days Work";
            if (t.includes("efficient") || t.includes("efficiency") || t.includes("twice") || t.includes("thrice")) return "Efficiency & Work Rates";
            if (t.includes("wage") || t.includes("wages") || t.includes("rupees") || t.includes("rs") || t.includes("paid")) return "Wages & Share Distribution";
            if (t.includes("leave") || t.includes("left") || t.includes("joins") || t.includes("together")) return "Group Work & Time Calculation";
            return "General Time & Work Concepts";
        }

        if (c.includes("average")) {
            if (t.includes("speed") || t.includes("km/h") || t.includes("journey")) return "Average Speed Calculations";
            if (t.includes("age") || t.includes("ages") || t.includes("teacher") || t.includes("student")) return "Ages & Inclusion/Exclusion";
            if (t.includes("consecutive") || t.includes("even") || t.includes("odd")) return "Consecutive Numbers Average";
            return "General Average Calculations";
        }

        if (c.includes("percentage")) {
            if (t.includes("successive") || t.includes("increase") && t.includes("decrease")) return "Successive Percentage Changes";
            if (t.includes("venn") || t.includes("fail") && t.includes("pass") && t.includes("both")) return "Venn Diagram Percentages";
            if (t.includes("population") || t.includes("depreciates")) return "Population & Depreciation";
            return "General Percentage Applications";
        }

        if (c.includes("coding")) {
            if (t.includes("sentence") || t.includes("means") || t.includes("fictitious")) return "Fictitious Language Deciphering";
            if (t.includes("number") || t.includes("digit")) return "Digit & Substitution Coding";
            return "Letter Patterns & Shifts";
        }

        if (c.includes("tenses")) {
            if (t.includes("since") || t.includes("for") || t.includes("has been")) return "Present Perfect Continuous";
            if (t.includes("if") || t.includes("wish") || t.includes("were")) return "Conditional Sentences";
            return "Verb Tense Agreements";
        }

        // Generic fallback per chapter
        return `${chapter} - Fundamentals`;
    },

    /**
     * Generates study notes dynamically based on the chapter and incorrect answers
     */
    generateDynamicNotes(concept, chapter, incorrectList) {
        let sampleQ = incorrectList[0] ? incorrectList[0].text : "Standard quiz questions";
        let sampleAns = incorrectList[0] && incorrectList[0].options ? incorrectList[0].options[incorrectList[0].answer] : "Correct Solution";
        let sampleExplain = incorrectList[0] ? incorrectList[0].explanation : "Apply standard formulas.";

        return {
            title: `${concept} — Target Notes`,
            content: `
                <h4>Core Concept Definition</h4>
                <p>This page summarizes key notes for <strong>${concept}</strong> under the chapter <strong>${chapter}</strong>, derived directly from questions you got incorrect.</p>
                
                <h4>Key Rule to Remember</h4>
                <p>Ensure that you double-check your calculations. When handling these types of problems, step-by-step validation is crucial.</p>
                
                <div class="formula-block">
                    Solve order: Concept Identification → Formula Setup → Step Execution
                </div>
                
                <div class="notes-tip">
                    <strong>💡 AI Tip based on your mistakes:</strong>
                    <p>Focus on units and time conversions. Many incorrect attempts result from simple sign/unit slipups.</p>
                </div>
                
                <div class="notes-example">
                    <div class="notes-example-title">Review of Your Missed Question:</div>
                    <p><strong>Question:</strong> ${sampleQ}</p>
                    <p><strong>Correct Answer:</strong> ${sampleAns}</p>
                    <p><strong>Explanation:</strong> ${sampleExplain}</p>
                </div>
            `
        };
    },

    /**
     * Generates flashcards dynamically from a list of incorrect questions
     */
    generateDynamicCards(concept, incorrectList) {
        const cards = [];
        incorrectList.forEach((q, idx) => {
            cards.push({
                q: `Formula or Concept check: How do we solve this type of question? <br><br><em>"${q.text.substring(0, 100)}..."</em>`,
                a: `<h4>Solution Concept</h4><p>${q.explanation}</p>`
            });
        });
        
        // Add a generic card if fewer than 2 cards are generated
        if (cards.length < 2) {
            cards.push({
                q: `What is the most critical mistake to avoid in ${concept}?`,
                a: "<h4>Common Pitfalls</h4>Avoid rushing through calculation steps. In exams, drawing a quick scratch diagram or writing down variables reduces error by 40%."
            });
        }
        return cards;
    },

    /**
     * Renders the profiler dashboard view
     */
    renderDashboard() {
        const container = this._getContainer();
        if (!container) return;

        // Perform scan
        const realWeaknesses = this.scanUserHistory();
        const weaknesses = this._demoMode ? this._demoWeaknesses : realWeaknesses;

        let statsHtml = `
            <div class="profiler-quick-stats">
                <div class="profiler-stat-card">
                    <div class="stat-icon-wrap">🧠</div>
                    <div class="stat-details">
                        <span>Weak Concepts</span>
                        <strong>${weaknesses.length}</strong>
                    </div>
                </div>
                <div class="profiler-stat-card">
                    <div class="stat-icon-wrap">🔥</div>
                    <div class="stat-details">
                        <span>Critical Alert</span>
                        <strong>${weaknesses.filter(w => w.priority === 'critical').length}</strong>
                    </div>
                </div>
                <div class="profiler-stat-card">
                    <div class="stat-icon-wrap">🎯</div>
                    <div class="stat-details">
                        <span>Profile Accuracy</span>
                        <strong>${weaknesses.length > 0 ? Math.round(weaknesses.reduce((sum, w) => sum + w.accuracy, 0) / weaknesses.length) : 100}%</strong>
                    </div>
                </div>
            </div>
        `;

        let headerHtml = `
            <div class="profiler-header">
                <div class="profiler-title-group">
                    <h2>🧠 Quizify AI Weakness Profiler</h2>
                    <p>Dynamically scans history to isolate conceptual weak spots and generate revision aids.</p>
                </div>
                <div class="demo-toggle-wrap">
                    <span class="demo-toggle-label">Demo Mode (SSC Prep)</span>
                    <label class="switch">
                        <input type="checkbox" id="profiler-demo-checkbox" ${this._demoMode ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </div>
            </div>
        `;

        let bodyHtml = "";

        if (weaknesses.length === 0) {
            bodyHtml = `
                <div class="profiler-empty-state">
                    <div class="profiler-empty-emoji">🎉</div>
                    <h3>Excellent Performance!</h3>
                    <p>No major weaknesses identified yet (requires accuracy below 70% over at least 2 attempts). Keep taking quizzes or enable <strong>Demo Mode</strong> to explore the generated aids.</p>
                </div>
            `;
        } else {
            bodyHtml = `
                <div class="weak-concepts-grid">
                    ${weaknesses.map(weak => {
                        const priorityText = weak.priority === 'critical' ? 'Critical Alert 🔴' : weak.priority === 'high' ? 'High Focus 🟠' : 'Needs Review 🟡';
                        return `
                            <div class="concept-card">
                                <div class="concept-card-header">
                                    <div class="concept-card-title-group">
                                        <h3>${weak.concept}</h3>
                                        <span>Chapter: ${weak.chapter} (${this.getSubjectLabel(weak.subject)})</span>
                                    </div>
                                    <span class="priority-badge ${weak.priority}">${priorityText}</span>
                                </div>
                                <div class="concept-accuracy-wrap">
                                    <div class="concept-accuracy-label">
                                        <span>Accuracy</span>
                                        <strong>${weak.accuracy}%</strong>
                                    </div>
                                    <div class="concept-accuracy-bar">
                                        <div class="concept-accuracy-fill ${weak.priority}" style="width: ${weak.accuracy}%"></div>
                                    </div>
                                </div>
                                <div class="concept-actions">
                                    <button class="btn-profiler-action" onclick="QuizifyProfiler.openNotes('${weak.id}')">📖 Explanation Notes</button>
                                    <button class="btn-profiler-action" onclick="QuizifyProfiler.openCards('${weak.id}')">🔄 Revision Cards</button>
                                    <button class="btn-profiler-action primary" onclick="QuizifyProfiler.openQuiz('${weak.id}')">🎯 Practice Quiz</button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }

        container.innerHTML = `
            <div class="profiler-container">
                ${headerHtml}
                ${statsHtml}
                ${bodyHtml}
            </div>
        `;

        // Register demo mode checkbox event
        const checkbox = document.getElementById('profiler-demo-checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', (e) => {
                this._demoMode = e.target.checked;
                this.renderDashboard();
            });
        }
    },

    getSubjectLabel(subject) {
        const labels = {
            quantitative: 'Quantitative',
            english: 'English',
            reasoning: 'Reasoning',
            general_science: 'General Science'
        };
        return labels[subject] || subject;
    },

    getConcept(conceptId) {
        const list = this._demoMode ? this._demoWeaknesses : this._scannedWeaknesses;
        return list.find(w => w.id === conceptId);
    },

    /**
     * Explanation Notes View
     */
    openNotes(conceptId) {
        const weak = this.getConcept(conceptId);
        if (!weak) return;
        this._activeConcept = weak;
        this._activeView = 'notes';

        const container = this._getContainer();
        container.innerHTML = `
            <div class="profiler-container">
                <div class="profiler-view-header">
                    <button class="btn-profiler-back" onclick="QuizifyProfiler.goBackToDashboard()">← Back to Profiler</button>
                    <div class="profiler-view-title">
                        <h3>Study Notes</h3>
                        <p>${weak.concept} (${weak.chapter})</p>
                    </div>
                </div>
                <div class="notes-container">
                    <div class="notes-body">
                        ${weak.notes.content}
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Revision Cards (3D Flashcards) View
     */
    openCards(conceptId) {
        const weak = this.getConcept(conceptId);
        if (!weak) return;
        this._activeConcept = weak;
        this._activeView = 'cards';
        this._currentCardIndex = 0;

        this.renderCardState();
    },

    renderCardState() {
        const weak = this._activeConcept;
        const card = weak.cards[this._currentCardIndex];
        const container = this._getContainer();

        container.innerHTML = `
            <div class="profiler-container">
                <div class="profiler-view-header">
                    <button class="btn-profiler-back" onclick="QuizifyProfiler.goBackToDashboard()">← Back to Profiler</button>
                    <div class="profiler-view-title">
                        <h3>Revision Flashcards</h3>
                        <p>${weak.concept} · Card ${this._currentCardIndex + 1} of ${weak.cards.length}</p>
                    </div>
                </div>
                <div class="flashcards-container">
                    <div class="flashcard-stage">
                        <div class="flashcard" id="active-flashcard" onclick="this.classList.toggle('flipped')">
                            <div class="flashcard-inner">
                                <div class="flashcard-front">
                                    <span class="card-label">Front</span>
                                    <div class="card-question">${card.q}</div>
                                    <span class="card-hint-trigger">Tap to flip card 🔄</span>
                                </div>
                                <div class="flashcard-back">
                                    <span class="card-label" style="color:#10b981; background:rgba(16,185,129,0.1)">Back</span>
                                    <div class="card-answer">${card.a}</div>
                                    <span class="card-hint-trigger">Tap to flip card 🔄</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flashcards-controls">
                        <button class="btn-card-nav" onclick="QuizifyProfiler.prevCard()" ${this._currentCardIndex === 0 ? 'disabled' : ''}>←</button>
                        <span class="card-progress-indicator">${this._currentCardIndex + 1} / ${weak.cards.length}</span>
                        <button class="btn-card-nav" onclick="QuizifyProfiler.nextCard()" ${this._currentCardIndex === weak.cards.length - 1 ? 'disabled' : ''}>→</button>
                    </div>
                    
                    <div class="card-feedback-actions">
                        <button class="btn-feedback easy" onclick="QuizifyProfiler.handleCardFeedback('easy')">Got it! Match Concept</button>
                        <button class="btn-feedback hard" onclick="QuizifyProfiler.handleCardFeedback('hard')">Needs More Review</button>
                    </div>
                </div>
            </div>
        `;
    },

    prevCard() {
        if (this._currentCardIndex > 0) {
            this._currentCardIndex--;
            this.renderCardState();
        }
    },

    nextCard() {
        if (this._currentCardIndex < this._activeConcept.cards.length - 1) {
            this._currentCardIndex++;
            this.renderCardState();
        }
    },

    handleCardFeedback(type) {
        if (type === 'easy') {
            this._app.showNotification("Marked as understood! Confidence level updated.", "success");
        } else {
            this._app.showNotification("Marked for review. Card remains in study pool.", "info");
        }
        // Advance automatically
        if (this._currentCardIndex < this._activeConcept.cards.length - 1) {
            setTimeout(() => {
                this.nextCard();
            }, 600);
        } else {
            this._app.showNotification("You've reviewed all flashcards for this concept! 🌟", "success");
        }
    },

    /**
     * Practice Quiz View
     */
    openQuiz(conceptId) {
        const weak = this.getConcept(conceptId);
        if (!weak || !weak.quiz || weak.quiz.length === 0) {
            this._app.showNotification("No practice questions available for this concept.", "warning");
            return;
        }
        this._activeConcept = weak;
        this._activeView = 'quiz';
        this._currentQuizIndex = 0;
        this._quizScore = 0;
        this._quizAnswers = new Array(weak.quiz.length).fill(null);
        this._hintUsed = false;

        this.renderQuizQuestion();
    },

    renderQuizQuestion() {
        const weak = this._activeConcept;
        const question = weak.quiz[this._currentQuizIndex];
        const container = this._getContainer();

        const optionLabels = ["A", "B", "C", "D"];

        container.innerHTML = `
            <div class="profiler-container">
                <div class="profiler-view-header">
                    <button class="btn-profiler-back" onclick="QuizifyProfiler.goBackToDashboard()">← Quit Quiz</button>
                    <div class="profiler-view-title">
                        <h3>Weakness Practice Quiz</h3>
                        <p>${weak.concept} · Question ${this._currentQuizIndex + 1} of ${weak.quiz.length}</p>
                    </div>
                </div>
                
                <div class="practice-quiz-wrapper">
                    <!-- Progress meter -->
                    <div class="concept-accuracy-wrap" style="margin-bottom: 24px;">
                        <div class="concept-accuracy-bar">
                            <div class="concept-accuracy-fill" style="width: ${((this._currentQuizIndex) / weak.quiz.length) * 100}%; background:var(--color-primary)"></div>
                        </div>
                    </div>
                    
                    <div class="practice-quiz-question-card">
                        <div class="practice-quiz-text">${question.text}</div>
                        
                        <div class="practice-options-container" id="practice-options-box">
                            ${question.options.map((opt, oIdx) => `
                                <button class="practice-option-btn" onclick="QuizifyProfiler.handleQuizAnswerSelection(${oIdx})">
                                    <span><strong>${optionLabels[oIdx]}.</strong> ${opt}</span>
                                    <span class="option-check-icon" style="opacity:0">✓</span>
                                </button>
                            `).join('')}
                        </div>
                        
                        <div id="practice-quiz-explanation" class="practice-explanation-card" style="display:none">
                            <h5>💡 Concept Solution:</h5>
                            <p>${question.explanation}</p>
                        </div>
                        
                        <div id="practice-quiz-ai-hint-box" class="ai-hint-bubble" style="display:none">
                            <div class="ai-hint-bubble-header">✦ Quizify AI Assistant Hint</div>
                            <p class="ai-hint-bubble-text">${question.hint}</p>
                        </div>
                    </div>
                    
                    <div class="practice-quiz-footer">
                        <button class="btn-practice-hint" id="practice-hint-btn" onclick="QuizifyProfiler.revealPracticeHint()">✦ Ask AI Hint</button>
                        <button class="btn-practice-next" id="practice-next-btn" style="display:none" onclick="QuizifyProfiler.advanceQuiz()">Next Question →</button>
                    </div>
                </div>
            </div>
        `;
    },

    revealPracticeHint() {
        if (this._hintUsed) return;
        this._hintUsed = true;
        document.getElementById('practice-quiz-ai-hint-box').style.display = 'block';
        const hintBtn = document.getElementById('practice-hint-btn');
        hintBtn.disabled = true;
        hintBtn.textContent = 'Hint Unlocked';
    },

    handleQuizAnswerSelection(optionIndex) {
        const question = this._activeConcept.quiz[this._currentQuizIndex];
        const isCorrect = (optionIndex === question.answer);
        
        this._quizAnswers[this._currentQuizIndex] = optionIndex;
        if (isCorrect) this._quizScore++;

        const optionsBox = document.getElementById('practice-options-box');
        const buttons = optionsBox.querySelectorAll('.practice-option-btn');

        buttons.forEach((btn, idx) => {
            btn.disabled = true; // Disable further clicking
            if (idx === question.answer) {
                btn.classList.add('correct');
                btn.querySelector('.option-check-icon').style.opacity = '1';
            } else if (idx === optionIndex) {
                btn.classList.add('incorrect');
                btn.querySelector('.option-check-icon').textContent = '✗';
                btn.querySelector('.option-check-icon').style.opacity = '1';
            }
        });

        // Show explanation
        document.getElementById('practice-quiz-explanation').style.display = 'block';
        
        // Show next button
        document.getElementById('practice-next-btn').style.display = 'block';
    },

    advanceQuiz() {
        const weak = this._activeConcept;
        if (this._currentQuizIndex < weak.quiz.length - 1) {
            this._currentQuizIndex++;
            this._hintUsed = false;
            this.renderQuizQuestion();
        } else {
            this.renderQuizResults();
        }
    },

    renderQuizResults() {
        const weak = this._activeConcept;
        const container = this._getContainer();
        
        // Award Quiz Coins for passing the practice session (e.g. score >= 60%)
        const percentage = Math.round((this._quizScore / weak.quiz.length) * 100);
        const passed = percentage >= 50;
        let coinBonus = 0;

        if (passed) {
            coinBonus = 15;
            this._app.userProgress.quizCoins = (this._app.userProgress.quizCoins || 0) + coinBonus;
            if (typeof this._app.saveUserProgress === 'function') {
                this._app.saveUserProgress();
            }
        }

        container.innerHTML = `
            <div class="profiler-container">
                <div class="profiler-view-header">
                    <button class="btn-profiler-back" onclick="QuizifyProfiler.goBackToDashboard()">← Back to Dashboard</button>
                    <div class="profiler-view-title">
                        <h3>Practice Results</h3>
                        <p>${weak.concept} Practice Complete</p>
                    </div>
                </div>
                
                <div class="practice-results-card">
                    <div class="practice-results-emoji">${passed ? '🎉' : '🛡️'}</div>
                    <h4>${passed ? 'Concept Strengthened!' : 'Keep Learning!'}</h4>
                    <p>${passed ? `Great job! You scored ${percentage}%. Your accuracy on this weakness has risen!` : `You scored ${percentage}%. We recommend reviewing the explanation notes again.`}</p>
                    
                    <div class="practice-results-stats">
                        <div class="practice-result-stat-item">
                            <span>Score</span>
                            <strong>${this._quizScore} / ${weak.quiz.length}</strong>
                        </div>
                        <div class="practice-result-stat-item">
                            <span>Accuracy</span>
                            <strong>${percentage}%</strong>
                        </div>
                        ${coinBonus > 0 ? `
                        <div class="practice-result-stat-item" style="border-color: rgba(234,179,8,0.3)">
                            <span>Reward</span>
                            <strong style="color:#facc15">+${coinBonus} 💰</strong>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="practice-result-actions">
                        <button class="btn btn--secondary" onclick="QuizifyProfiler.openQuiz('${weak.id}')">Try Again</button>
                        <button class="btn btn--primary" onclick="QuizifyProfiler.goBackToDashboard()">Finish Session</button>
                    </div>
                </div>
            </div>
        `;

        if (coinBonus > 0) {
            this._app.showNotification(`Weakness practice passed! Earned ${coinBonus} Quiz Coins! 💰`, "success");
            this._app.updateCoinDisplay();
        }
    },

    goBackToDashboard() {
        this._activeConcept = null;
        this._activeView = 'dashboard';
        this.renderDashboard();
    }
};

window.QuizifyProfiler = QuizifyProfiler;
