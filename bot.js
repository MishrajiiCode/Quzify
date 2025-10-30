// bot.js - Contains all logic for the Quizify Help Bot.

const QuizifyBot = {
    _app: null, // Reference to the main QuizifyApp
    _botModal: null,
    _chatContainer: null,
    _input: null,
    _currentState: 'start', // NEW: To track the bot's conversation state

    // NEW: More advanced keyword mapping for better NLU
    // NEW: Small talk responses for a more intelligent feel
    SMALL_TALK: {
        'greetings': {
            keywords: ['hi', 'hello', 'hey', 'helo', 'hii', 'good morning', 'good evening'],
            response: "Hello! How can I help you today? You can ask me about quizzes, your account, or search for content."
        },
        'identity': {
            keywords: ['your name', 'who are you', 'what are you'],
            response: "I am Quizify Bot, your personal assistant for the Quizify app. I can help you find information or answer common questions."
        },
        'well_being': {
            keywords: ['how are you', 'hows it going', 'how are you doing'],
            response: "I'm a bot, so I'm always running at 100%! How can I assist you?"
        },
        'thanks': {
            keywords: ['thank you', 'thanks', 'thx', 'thankyou'],
            response: "You're welcome! Is there anything else I can help with?"
        },
        'creator': {
            keywords: ['who made you', 'who created you', 'your creator', 'your father'],
            response: "I was created by Raj Mishra, the developer of Quizify. He taught me everything I know! If you have feedback for him, you can use the 'Feedback' link in the side menu."
        }
    },
    KEYWORD_INTENTS: {
        'quiz': 'Quiz & Gameplay', 'gameplay': 'Quiz & Gameplay', 'question': 'Quiz & Gameplay', 'scoring': 'Quiz & Gameplay',
        'account': 'Account & Progress', 'progress': 'Account & Progress', 'pin': 'Account & Progress', 'name': 'Account & Progress', 'delete': 'Account & Progress',
        'store': 'Store & Purchases', 'coin': 'Store & Purchases', 'purchase': 'Store & Purchases', 'theme': 'Store & Purchases', 'avatar': 'Store & Purchases',
        'support': 'Contact Support', 'contact': 'Contact Support', 'email': 'Contact Support', 'help': 'Contact Support',
        'search': 'Search Content', 'find': 'Search Content', 'look for': 'Search Content',
    },

    // NEW: Simple question bank for random question generation and evaluation
    QUESTION_BANK: {
        english: [
            {
                id: 'eng-1',
                question: 'Choose the correctly punctuated sentence.',
                options: [
                    'Its raining outside.',
                    "It\'s raining outside.",
                    'Its raining, outside',
                    'Its raining; outside'
                ],
                answerIndex: 1,
                explanation: "The correct contraction for 'it is' is 'it's'."
            },
            {
                id: 'eng-2',
                question: 'Select the antonym of \"ancient\".',
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
                explanation: '15% of 200 = 0.15 * 200 = 30.'
            }
        ],
        reasoning: [],
        math: [],
        physics: [],
        chemistry: [],
        biology: []
    },

    // Tracks active question presented to the user (null when none)
    _currentQuestion: null,

    // Pre-defined conversation tree for the bot
    CONVERSATION_TREE: {
        'start': {
            message: "Hi! I'm Quizify Bot. I'm here to help you with common issues. Please select a topic below, or type your question.",
            options: ['Quiz & Gameplay', 'Account & Progress', 'Store & Purchases', 'Search Content', 'Contact Support']
        },
        'Search Content': {
            message: "Sure, I can help with that. What topic are you looking for?",
            action: 'await_search_query' // NEW: Special action state
        },
        'Quiz & Gameplay': {
            message: "Okay, what is your issue related to quizzes?",
            options: ['A question seems wrong', 'My quiz won\'t start', 'How does scoring work?', 'Back to main menu']
        },
        'Account & Progress': {
            message: "What can I help you with regarding your account?",
            options: ['My progress is not saving', 'How do I change my name/PIN?', 'How do I delete my account?', 'Back to main menu']
        },
        'Store & Purchases': {
            message: "What is your question about the store?",
            options: ['How do I get more coins?', 'My purchase is not showing up', 'How do I use a theme/avatar?', 'Back to main menu']
        },
        'A question seems wrong': {
            message: "Thank you for helping improve Quizify! The best way to report a question is to send us an email with the Subject, Chapter, and Question text. This helps us find and fix it quickly.",
            options: ['Contact Support', 'Back to main menu']
        },
        'My quiz won\'t start': {
            message: "This can happen if the question set is empty or still under development. Please try another set. If the problem persists across all sets, it might be a network issue. Try refreshing the page.",
            options: ['Contact Support', 'Back to main menu']
        },
        'How does scoring work?': {
            message: "You need to score 40% or more to pass a quiz set. Passing a set unlocks the next one in a chapter. Your profile shows your average score across all quizzes you've taken.",
            options: ['Back to main menu']
        },
        'My progress is not saving': {
            message: "Your progress is tied to your Name and PIN. Please ensure you are logged in with the correct credentials. Progress is saved automatically after each quiz. If you're still facing issues, please contact support.",
            options: ['Contact Support', 'Back to main menu']
        },
        'How do I change my name/PIN?': {
            message: "You can change your Name and PIN from the 'Settings' page, which is accessible from the side menu. Look for the 'Account' tab.",
            options: ['Back to main menu']
        },
        'How do I delete my account?': {
            message: "You can delete your account from the 'Settings' page in the 'Danger Zone' tab. Please be careful, as this action is permanent and cannot be undone.",
            options: ['Back to main menu']
        },
        'How do I get more coins?': {
            message: "You can earn Quiz Coins in several ways: <ul><li><b>Daily Login:</b> Collect your 2 daily coins from the reward modal.</li><li><b>Passing a Quiz:</b> Earn 10 coins the first time you pass any quiz set (score >= 40%).</li><li><b>Perfect Score Bonus:</b> Get an additional 25 coins the first time you score 100% on a quiz set.</li><li><b>Chapter Completion Bonus:</b> Receive a 100 coin bonus for passing all sets in a chapter for the first time.</li></ul>",
            options: ['Back to main menu']
        },
        'My purchase is not showing up': {
            message: "Sometimes it can take a moment to sync. Please try closing and reopening the side menu or settings page. If the item still doesn't appear after a page refresh, please contact support with your purchase details.",
            options: ['Contact Support', 'Back to main menu']
        },
        'How do I use a theme/avatar?': {
            message: "After purchasing a theme or avatar from the store, go to the 'Settings' page (from the side menu) and select the 'Customization' tab. You can apply your purchased items there.",
            options: ['Back to main menu']
        },
        'Contact Support': {
            message: "I'm sorry I couldn't resolve your issue. Please describe your problem in an email, and our support team will get back to you. Click the button below to open your email client.",
            mailto: 'productionrtf@gmail.com'
        },
        'Back to main menu': {
            message: "Is there anything else I can help you with?",
            options: ['Quiz & Gameplay', 'Account & Progress', 'Store & Purchases', 'Search Content', 'Contact Support']
        }
    },

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

        // Use event delegation for option buttons and make it robust to clicks on inner elements
        this._chatContainer.addEventListener('click', (e) => {
            // Option buttons (menu choices)
            const optionBtn = e.target.closest('.bot-option-btn');
            if (optionBtn && this._chatContainer.contains(optionBtn)) {
                const choice = optionBtn.textContent;
                this.addUserMessage(choice);
                this.handleBotResponse(choice);
                return;
            }

            // Question option buttons (answers)
            const questionOption = e.target.closest('.bot-question-option');
            if (questionOption && this._chatContainer.contains(questionOption)) {
                const choiceIndex = parseInt(questionOption.dataset.index, 10);
                this.addUserMessage(questionOption.textContent);
                this.evaluateAnswer(choiceIndex);
                return;
            }

            // Search result buttons
            const searchBtn = e.target.closest('.bot-search-result-btn');
            if (searchBtn && this._chatContainer.contains(searchBtn)) {
                // Use getAttribute to retrieve the raw JSON string
                const raw = searchBtn.getAttribute('data-result');
                let resultData = null;
                try {
                    resultData = JSON.parse(raw);
                } catch (err) {
                    // If parsing fails, attempt a fallback by replacing single quotes with double quotes
                    try {
                        resultData = JSON.parse(raw.replace(/'/g, '"'));
                    } catch (err2) {
                        console.error('Failed to parse search result data:', err2, raw);
                    }
                }
                if (resultData) {
                    this.addUserMessage(`Go to "${resultData.chapterName}"`);
                    this.navigateToSearchResult(resultData);
                }
                return;
            }
        });
    },

    openHelpBot() {
        this._botModal.classList.add('visible');
        this._chatContainer.innerHTML = ''; // Clear previous chat
        this._currentState = 'start';

        const userName = localStorage.getItem('userName');
        const greeting = userName ? `Hi ${userName}!` : "Hi!";
        const startResponse = this.CONVERSATION_TREE['start'];
        const personalizedMessage = startResponse.message.replace('Hi!', greeting);

        this.addBotMessage(personalizedMessage, startResponse.options);
        this._input.focus();
    },

    closeHelpBot() {
        this._botModal.classList.remove('visible');
    },

    handleUserInput() {
        const userInput = this._input.value.trim();
        if (!userInput) return;

        this.addUserMessage(userInput);
        this._input.value = '';

        // NEW: Advanced intent handling
        if (this._currentState === 'await_search_query') {
            this.performSearch(userInput);
            return;
        }

        // NEW: Check for small talk first
        const smallTalkResponse = this.getSmallTalkResponse(userInput);
        if (smallTalkResponse) {
            this.addBotMessage(smallTalkResponse);
            this.handleBotResponse('Back to main menu'); // Guide user back to options
            return;
        }

        // NEW: detect requests for random questions like "give me a random question of english"
        const lowerInput = userInput.toLowerCase();
        if (/random|give me a question|ask me|one question|random question/.test(lowerInput)) {
            // detect subject keyword
            const subjects = Object.keys(this.QUESTION_BANK);
            for (const subj of subjects) {
                if (lowerInput.includes(subj)) {
                    this.presentRandomQuestion(subj);
                    return;
                }
            }
            // no subject found: present a random question across all subjects
            this.presentRandomQuestion();
            return;
        }

        const matchedIntent = this.getIntentFromInput(userInput);
        setTimeout(() => this.handleBotResponse(matchedIntent), 500);
    },

    // NEW: Get intent from user input using keyword mapping
    getIntentFromInput(input) {
        const lowerInput = input.toLowerCase();
        // Check for search intent first
        if (lowerInput.startsWith('search for ') || lowerInput.startsWith('find ') || lowerInput.startsWith('look for ')) {
            const query = lowerInput.replace(/^(search for|find|look for)\s+/, '');
            this.performSearch(query);
            return null; // Stop further processing
        }

        for (const keyword in this.KEYWORD_INTENTS) {
            if (lowerInput.includes(keyword)) {
                return this.KEYWORD_INTENTS[keyword];
            }
        }
        return 'Contact Support'; // Default fallback
    },

    // NEW: Function to handle small talk
    getSmallTalkResponse(input) {
        const lowerInput = input.toLowerCase();
        for (const category in this.SMALL_TALK) {
            const keywords = this.SMALL_TALK[category].keywords;
            for (const keyword of keywords) {
                if (lowerInput.includes(keyword)) {
                    return this.SMALL_TALK[category].response;
                }
            }
        }
        return null; // No small talk match found
    },

    handleBotResponse(key) {
        // QUICK-HANDLE: provide another question when user clicks that option
        if (key === 'Another question') {
            this.presentRandomQuestion();
            return;
        }
        if (!key) return; // Do nothing if intent function handled it

        let response = this.CONVERSATION_TREE[key];
        if (!response) {
            // NEW: Improved fallback message when the bot doesn't understand.
            const fallbackMessage = "I'm sorry, I didn't understand that. I can help with topics like 'Account', 'Scoring', or 'Store'. You can also ask me to 'search for' a specific chapter.";
            const mainMenuResponse = this.CONVERSATION_TREE['Back to main menu'];
            this.addBotMessage(fallbackMessage + "<br><br>" + mainMenuResponse.message, mainMenuResponse.options);
            this._currentState = 'start';
            return;
        }

        // NEW: Handle special action states
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
            mailtoBtn.textContent = `Email Support: ${response.mailto}`;
            mailtoBtn.className = 'btn btn--primary';
            mailtoBtn.style.marginTop = '1rem';
            mailtoBtn.target = '_blank';
            // Add the mailto link inside a container for proper layout
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'bot-options-container';
            buttonContainer.appendChild(mailtoBtn);
            this._chatContainer.appendChild(mailtoBtn);
        } else {
            this.addBotMessage(response.message, response.options);
        }
        this._currentState = 'start'; // Reset state after a response
    },

    // NEW: Search quiz content
    performSearch(query) {
        const results = this._app.performGlobalSearch(query);
        this._currentState = 'start'; // Reset state

        if (results.length === 0) {
            this.addBotMessage(`I couldn't find any chapters matching "${query}". Please try a different search term or select an option from the menu.`, this.CONVERSATION_TREE['start'].options);
            return;
        }

        let resultsHtml = `<p>Here's what I found for "${query}":</p><ul>`;
        results.forEach(result => {
            const context = result.type === 'academic' 
                ? `(Class ${result.class} - ${this._app.getSubjectTitle(result.subject)})` 
                : `(${this._app.getSubjectTitle(result.subject)})`;
            
            // Use a button for each result
            resultsHtml += `<li>
                <button class="bot-search-result-btn" data-result='${JSON.stringify(result)}'>
                    <strong>${result.chapterName}</strong>
                    <span>${context}</span>
                </button>
            </li>`;
        });
        resultsHtml += '</ul><p>Click a result to navigate to it, or ask me something else.</p>';

        this.addBotMessage(resultsHtml, this.CONVERSATION_TREE['start'].options);
    },

    // NEW: Present a random question (optionally scoped to a subject)
    presentRandomQuestion(subject = null) {
        let pool = [];
        if (subject && this.QUESTION_BANK[subject] && this.QUESTION_BANK[subject].length > 0) {
            pool = this.QUESTION_BANK[subject];
        } else {
            // Merge all subjects into pool
            for (const key in this.QUESTION_BANK) {
                pool = pool.concat(this.QUESTION_BANK[key]);
            }
        }

        if (pool.length === 0) {
            this.addBotMessage("I don't have questions for that topic yet. Try another topic or ask for a random question.");
            return;
        }

        const idx = Math.floor(Math.random() * pool.length);
        const q = pool[idx];
        this._currentQuestion = q;

        // Render question with option buttons that include data-index
        const messageDiv = this.addMessage(`<strong>${q.question}</strong>`, 'bot-message', true);
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'bot-options-container';
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

    // NEW: Evaluate selected answer for the current question
    evaluateAnswer(choiceIndex) {
        const q = this._currentQuestion;
        if (!q) {
            this.addBotMessage("There is no active question. Ask me to give a random question first.");
            return;
        }

        const correct = choiceIndex === q.answerIndex;
        if (correct) {
            this.addBotMessage(`<strong>Correct!</strong> ${q.explanation || ''}`);
            // Optionally give a small reward via main app
            try {
                if (this._app && typeof this._app.awardCoins === 'function') {
                    this._app.awardCoins(5); // award 5 coins for correct answer
                    this.addBotMessage('You earned 5 Quiz Coins for that correct answer!');
                }
            } catch (e) {}
        } else {
            const correctText = q.options[q.answerIndex];
            this.addBotMessage(`<strong>Not quite.</strong> The correct answer is: <em>${correctText}</em>. ${q.explanation || ''}`);
        }

        // Clear current question
        this._currentQuestion = null;

        // Offer another question or go back to main menu
        const mainMenu = this.CONVERSATION_TREE['Back to main menu'];
        this.addBotMessage('Would you like another question or go back to the menu?', ['Another question', ...mainMenu.options]);
    },

    // NEW: Navigate to a search result
    navigateToSearchResult(result) {
        // This function will call methods on the main app to change the page
        const app = this._app;

        // Set the state in the main app
        app.currentChapter = result.chapterName;
        app.currentSubject = result.subject;
        app.classMode = result.type === 'academic';
        app.currentClass = result.class || '';
        app.currentStream = result.stream || ''; // Assuming stream might be needed

        // Close the bot and show the chapter page
        this.closeHelpBot();
        app.displayChapterInfo();
        app.showPage('chapter-page');

        // Show a notification in the main app
        app.showNotification(`Navigating to ${result.chapterName}...`, 'info');
    },

    // NEW: Helper to get subject title (to avoid duplicating logic from app.js)
    getSubjectTitle(subject) {
        const titles = {
            quantitative: 'Quantitative Aptitude',
            english: 'English',
            reasoning: 'Reasoning',
            math: 'Mathematics',
            physics: 'Physics',
            chemistry: 'Chemistry',
            biology: 'Biology'
        };
        return titles[subject] || subject;
    },

    addMessage(text, sender, hasAvatar = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;

        let avatarHtml = '';
        if (hasAvatar) {
            avatarHtml = `<div class="chat-message-avatar bot-avatar">🤖</div>`;
        }

        messageDiv.innerHTML = `${avatarHtml}<div class="chat-message-content">${text}</div>`;
        this._chatContainer.appendChild(messageDiv);
        this._chatContainer.scrollTop = this._chatContainer.scrollHeight;
        return messageDiv;
    },

    addUserMessage(text) {
        this.addMessage(text, 'user-message'); // User messages don't have an avatar
    },

    addBotMessage(text, options = []) {
        const messageDiv = this.addMessage(text, 'bot-message', true); // Pass true to add avatar
        
        if (options.length > 0) {
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'bot-options-container';
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'bot-option-btn';
                btn.textContent = opt;
                optionsContainer.appendChild(btn);
            });
            // Append options container after the message content for better structure
            messageDiv.querySelector('.chat-message-content').appendChild(optionsContainer);
        }
        this._chatContainer.scrollTop = this._chatContainer.scrollHeight;
    },

    // NEW: Creates a detailed mailto link for support requests
    createSupportMailto() {
        const recipient = this.CONVERSATION_TREE['Contact Support'].mailto;
        const userName = localStorage.getItem('userName') || 'N/A';
        const appVersion = this._app.APP_VERSION || 'N/A';

        const subject = `Quizify Support Request from ${userName}`;

        // Get conversation history
        let conversationHistory = "Bot Conversation History:\n";
        this._chatContainer.querySelectorAll('.chat-message').forEach(msg => {
            const sender = msg.classList.contains('bot-message') ? 'Bot' : 'User';
            // Clean up the text content to be more readable in an email
            const text = msg.querySelector('.chat-message-content').textContent.trim().replace(/\s+/g, ' ');
            conversationHistory += `[${sender}]: ${text}\n`;
        });

        const body = `Hello Quizify Support,\n\nPlease describe your issue below:\n-------------------------------------\n\n\n\n-------------------------------------\n\nFor reference, here is my information:\nUser Name: ${userName}\nApp Version: ${appVersion}\n\n${conversationHistory}`;

        // Encode the subject and body for the URL
        return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
};
