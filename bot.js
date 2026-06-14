// bot.js - Quizify AI v4.2 — Advanced AI Assistant (Gemini-style)

const QuizifyBot = {
    _app: null,
    _botModal: null,
    _chatContainer: null,
    _input: null,
    _currentState: 'start',
    _currentQuestion: null,
    _isTyping: false,
    _isOpen: false,                // guard against double-open
    _practiceQueue: [],            // queue for topic quiz practice
    _practiceSubject: null,        // current practice subject
    _practiceIndex: 0,             // question index in practice
    _practiceScore: 0,             // correct count in session

    // ── Small Talk Responses ──
    SMALL_TALK: {
        'greetings': {
            keywords: ['hi', 'hello', 'hey', 'helo', 'hii', 'good morning', 'good evening', 'good afternoon', 'good night', 'sup', 'yo', 'namaste', 'hiya'],
            responses: [
                "Hey there! 👋 Great to see you! I'm here to help with anything — quiz tips, performance stats, or app questions. What's on your mind?",
                "Hello! 😊 I'm **Quizify Bot**, your smart study companion! Ask me about your performance, search for topics, or just chat. How can I help?",
                "Hi! 🌟 Ready to help! You can ask me for your **performance stats**, get a random quiz question, search for content, or ask anything about the app!"
            ]
        },
        'identity': {
            keywords: ['your name', 'who are you', 'what are you', 'what is your name', 'introduce yourself'],
            responses: [
                "I'm **Quizify Bot** 🤖 — your personal AI learning assistant! I can analyze your quiz performance, find content, answer app questions, quiz you on the spot, and much more. Nice to meet you! 😊"
            ]
        },
        'well_being': {
            keywords: ['how are you', 'hows it going', 'how are you doing', 'how do you do', 'how r u'],
            responses: [
                "Running at peak performance! ⚡ All systems green! How about we check your performance too? Just ask me for your **performance summary** or **stats** anytime!",
                "I'm doing fantastic, thanks for asking! 😄 I'm always ready to help you learn. What would you like to do today?"
            ]
        },
        'thanks': {
            keywords: ['thank you', 'thanks', 'thx', 'thankyou', 'thank u', 'ty', 'thank'],
            responses: [
                "You're very welcome! 😊 I'm always here if you need anything else. Keep learning and growing! 🌱",
                "Happy to help! 🎉 Is there anything else I can assist you with? I'm always ready!",
                "Anytime! 💪 That's what I'm here for. Don't hesitate to ask anything else!"
            ]
        },
        'creator': {
            keywords: ['who made you', 'who created you', 'your creator', 'your father', 'who built you', 'developer', 'who developed'],
            responses: [
                "I was lovingly built by **Raj Mishra** 👨‍💻, the developer of Quizify! He designed me to help you learn smarter and navigate the app with ease. If you have feedback, use the **Feedback** option in the side menu! 💬"
            ]
        },
        'bye': {
            keywords: ['bye', 'goodbye', 'see you', 'later', 'close', 'exit', 'quit', 'cya', 'take care'],
            responses: [
                "Goodbye! 👋 Keep learning and have a wonderful day! I'll be right here whenever you need me. 😊",
                "See you soon! 🌟 Remember — every quiz is a step toward your goals. Stay consistent and keep going! 💪",
                "Take care! 👋 Come back anytime you need help. Happy studying! 📚"
            ]
        },
        'help': {
            keywords: ['help', 'what can you do', 'what do you do', 'how can you help', 'assist me', 'your features'],
            responses: [
                "Here's what I can do for you! ✨\n\n📊 **Performance Analytics** — Check your stats, strengths & weaknesses\n🔍 **Search Content** — Find any chapter or topic instantly\n🎯 **Quiz Practice** — Get random questions to test yourself\n🏆 **Achievement Tips** — Advice on earning badges\n⚙️ **App Support** — Help with any app feature\n💬 **General Chat** — Just talk to me!\n\nJust type anything and I'll figure it out! 😊"
            ]
        },
        'motivation': {
            keywords: ['motivate me', 'i am tired', 'i give up', 'i feel lazy', 'not in mood', 'feeling demotivated', 'motivation'],
            responses: [
                "I hear you! 💙 Even the best learners have off days. But remember — every expert was once a beginner. **One quiz today** is better than none. Start small, start now! 💪",
                "You've already come so far! 🌟 Don't stop now. The knowledge you're gaining today will pay off tomorrow. Take a deep breath, and let's tackle just one quiz together. You've got this! 🎯",
                "Every single quiz you complete is progress — even when you fail! 📈 Failure teaches more than success sometimes. Try again, and I promise you'll improve. I believe in you! 🙌"
            ]
        },
        'joke': {
            keywords: ['joke', 'tell me a joke', 'make me laugh', 'funny', 'humor'],
            responses: [
                "Why did the student eat his homework? 😄 Because the teacher told him it was a piece of cake! 🍰 Now back to some actual quizzes — shall we? 😉",
                "Why don't scientists trust atoms? 🤔 Because they make up everything! 😂 Just like some students before exams... Now let's make sure *you're* actually prepared! 💪"
            ]
        }
    },

    // ── Intent Keyword Mapping ──
    KEYWORD_INTENTS: {
        'quiz': 'Quiz & Gameplay', 'gameplay': 'Quiz & Gameplay', 'question': 'Quiz & Gameplay',
        'scoring': 'Quiz & Gameplay', 'timer': 'Quiz & Gameplay', 'time': 'Quiz & Gameplay',
        'lifeline': 'Quiz & Gameplay', 'hint': 'Quiz & Gameplay', 'skip': 'Quiz & Gameplay',
        'account': 'Account & Progress', 'progress': 'Account & Progress', 'pin': 'Account & Progress',
        'name': 'Account & Progress', 'delete': 'Account & Progress', 'profile': 'Account & Progress',
        'streak': 'Account & Progress', 'login': 'Account & Progress', 'sign': 'Account & Progress',
        'store': 'Store & Purchases', 'coin': 'Store & Purchases', 'purchase': 'Store & Purchases',
        'theme': 'Store & Purchases', 'avatar': 'Store & Purchases', 'buy': 'Store & Purchases',
        'shop': 'Store & Purchases', 'item': 'Store & Purchases',
        'support': 'Contact Support', 'contact': 'Contact Support', 'email': 'Contact Support',
        'problem': 'Contact Support', 'issue': 'Contact Support', 'report': 'Contact Support', 'bug': 'Contact Support',
        'search': 'Search Content', 'find': 'Search Content', 'look for': 'Search Content',
        'achievement': 'Achievements & Rewards', 'badge': 'Achievements & Rewards', 'reward': 'Achievements & Rewards',
        'leaderboard': 'Leaderboard & Rankings', 'rank': 'Leaderboard & Rankings', 'ranking': 'Leaderboard & Rankings',
        'daily challenge': 'Daily Challenge', 'challenge': 'Daily Challenge',
        'battle pass': 'Battle Pass', 'battlepass': 'Battle Pass', 'season': 'Battle Pass',
        'quest': 'Quests', 'mission': 'Quests',
        'video': 'Videos & Content', 'cinevix': 'Videos & Content', 'tutorial': 'Videos & Content',
        'notification': 'Notifications', 'remind': 'Notifications',
        'mock': 'Mock Test', 'mock test': 'Mock Test', 'exam': 'Mock Test', 'test': 'Mock Test',
        'friend': 'Friends & Social', 'social': 'Friends & Social', 'community': 'Friends & Social',
        'global chat': 'Friends & Social', 'chat': 'Friends & Social',
    },

    // ── Performance Keywords ──
    PERFORMANCE_KEYWORDS: [
        'performance', 'summary', 'stats', 'statistics', 'my score', 'my progress',
        'how am i doing', 'my result', 'my results', 'review', 'report', 'analytics',
        'overview', 'dashboard', 'how many quiz', 'total quiz', 'overall', 'my data',
        'how i am', 'how i\'m doing', 'show my stats'
    ],
    STRENGTH_KEYWORDS: [
        'strong', 'strength', 'best subject', 'good at', 'top subject', 'where am i good',
        'best topic', 'what am i good', 'my strengths', 'strong topics', 'i am good at'
    ],
    WEAKNESS_KEYWORDS: [
        'weak', 'weakness', 'worst', 'bad at', 'improve', 'need to improve',
        'where am i weak', 'hard topic', 'difficult', 'struggle', 'my weaknesses',
        'what to improve', 'areas to work on', 'where should i focus'
    ],
    HISTORY_KEYWORDS: [
        'history', 'recent quiz', 'last quiz', 'recent attempt', 'quiz history',
        'past quiz', 'previous quiz', 'what i played', 'recent activity', 'what i did',
        'quiz log', 'activity log'
    ],
    SUBJECT_KEYWORDS: [
        'english', 'quantitative', 'reasoning', 'math', 'physics', 'chemistry', 'biology',
        'mathematics', 'quant', 'verbal', 'aptitude', 'general science', 'science'
    ],
    COIN_KEYWORDS: [
        'coins', 'quiz coins', 'how many coins', 'my coins', 'balance', 'coin balance',
        'how to earn coins', 'earn coins', 'get coins', 'coin count'
    ],
    STREAK_KEYWORDS: [
        'streak', 'my streak', 'login streak', 'day streak', 'consecutive days',
        'daily streak', 'how many days', 'daily login'
    ],

    // ── Sample Question Bank ──
    QUESTION_BANK: {
        english: [
            { id: 'eng-1', question: 'Choose the correctly punctuated sentence.', options: ["Its raining outside.", "It's raining outside.", 'Its raining, outside', 'Its raining; outside'], answerIndex: 1, explanation: "The correct contraction for 'it is' is 'it's'." },
            { id: 'eng-2', question: 'Select the antonym of "ancient".', options: ['old', 'historic', 'modern', 'antique'], answerIndex: 2, explanation: 'Modern is the opposite (antonym) of ancient.' },
            { id: 'eng-3', question: 'Which sentence uses "affect" correctly?', options: ['The rain affected the crops.', 'The rain effected the crops.', 'The affect was negative.', 'She effected everyone.'], answerIndex: 0, explanation: '"Affect" is a verb meaning to influence. "Effect" is usually a noun meaning a result.' },
            { id: 'eng-4', question: 'What is a synonym for "eloquent"?', options: ['Quiet', 'Articulate', 'Confused', 'Harsh'], answerIndex: 1, explanation: '"Eloquent" means fluent or persuasive in speaking or writing — similar to "articulate".' },
        ],
        quantitative: [
            { id: 'quant-1', question: 'What is 15% of 200?', options: ['20', '25', '30', '15'], answerIndex: 2, explanation: '15% of 200 = 0.15 × 200 = 30.' },
            { id: 'quant-2', question: 'If a train travels 120 km in 2 hours, what is its speed?', options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'], answerIndex: 1, explanation: 'Speed = Distance ÷ Time = 120 ÷ 2 = 60 km/h.' },
            { id: 'quant-3', question: 'What is the square root of 144?', options: ['11', '12', '13', '14'], answerIndex: 1, explanation: '12 × 12 = 144, so √144 = 12.' },
            { id: 'quant-4', question: 'A shirt originally costs ₹800. It is sold at 25% discount. What is the sale price?', options: ['₹600', '₹650', '₹575', '₹700'], answerIndex: 0, explanation: 'Discount = 25% of 800 = 200. Sale price = 800 - 200 = ₹600.' },
        ],
        reasoning: [
            { id: 'reason-1', question: 'If HOUSE is coded as GRTRA, how is CHAIR coded?', options: ['BGHZQ', 'BGZQH', 'BGHQZ', 'ZQHGB'], answerIndex: 0, explanation: 'Each letter is shifted one position back in the alphabet.' },
            { id: 'reason-2', question: 'Find the odd one out: Circle, Square, Triangle, Cube', options: ['Circle', 'Square', 'Triangle', 'Cube'], answerIndex: 3, explanation: 'Cube is a 3D shape while the others are 2D shapes.' },
        ],
        math: [
            { id: 'math-1', question: 'What is the value of π (Pi) approximately?', options: ['3.14', '2.71', '1.62', '3.41'], answerIndex: 0, explanation: 'Pi (π) ≈ 3.14159... commonly approximated as 3.14.' },
            { id: 'math-2', question: 'What is the area of a circle with radius 7?', options: ['49π', '14π', '7π', '154'], answerIndex: 0, explanation: 'Area = π × r² = π × 7² = 49π.' },
        ],
        physics: [
            { id: 'phy-1', question: 'What is the SI unit of force?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], answerIndex: 2, explanation: 'The Newton (N) is the SI unit of force. F = ma.' },
            { id: 'phy-2', question: 'The speed of light in vacuum is approximately?', options: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10¹⁰ m/s', '3×10⁴ m/s'], answerIndex: 0, explanation: 'The speed of light c ≈ 3×10⁸ metres per second.' },
        ],
        chemistry: [
            { id: 'chem-1', question: 'What is the chemical formula of water?', options: ['H₂O', 'CO₂', 'O₂', 'H₂O₂'], answerIndex: 0, explanation: 'Water consists of 2 hydrogen atoms and 1 oxygen atom — H₂O.' },
            { id: 'chem-2', question: 'Which gas is called the "laughing gas"?', options: ['CO₂', 'N₂O', 'NO₂', 'SO₂'], answerIndex: 1, explanation: 'Nitrous oxide (N₂O) is commonly called laughing gas.' },
        ],
        biology: [
            { id: 'bio-1', question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'], answerIndex: 2, explanation: 'Mitochondria produce ATP through cellular respiration, earning the nickname "powerhouse of the cell".' },
            { id: 'bio-2', question: 'How many chromosomes do humans normally have?', options: ['23', '44', '46', '48'], answerIndex: 2, explanation: 'Humans normally have 46 chromosomes arranged in 23 pairs.' },
        ]
    },

    // ── Conversation Tree ──
    CONVERSATION_TREE: {
        'start': {
            message: "Hi! I'm **Quizify Bot** 🤖. I'm your smart learning assistant — here to help with performance stats, app features, quizzes, and more!\n\nWhat would you like to explore?",
            options: ['📊 Performance Summary', '🎯 Quiz & Gameplay', '🏦 Account & Progress', '🛍️ Store & Purchases', '🔍 Search Content', '🏆 Achievements', '📅 Daily Challenge', '❓ Contact Support']
        },
        'Search Content': { message: "Sure! What topic, chapter, or subject are you looking for? Type it below and I'll find it for you.", action: 'await_search_query' },
        'Quiz & Gameplay': {
            message: "What can I help you with regarding quizzes?",
            options: ['❌ A question seems wrong', "⚠️ My quiz won't start", '📋 How does scoring work?', '⏱️ How does the timer work?', '🃏 What are lifelines?', '🎲 Random Question', '↩ Back to main menu']
        },
        'Account & Progress': {
            message: "What can I help with regarding your account?",
            options: ['📉 My progress is not saving', '✏️ How do I change my name/PIN?', '🔑 How do I change my password?', '🗑️ How do I delete my account?', '🔥 About my streak', '↩ Back to main menu']
        },
        'Store & Purchases': {
            message: "What's your store question?",
            options: ['💰 How do I get more coins?', '🛒 My purchase is not showing up', '🎨 How do I use a theme/avatar?', '🏷️ How do I sell an item?', '↩ Back to main menu']
        },
        'Achievements & Rewards': {
            message: "🏆 **Achievements** are badges you earn for specific milestones:\n\n• **First Step** 🎓 — Complete your first quiz\n• **Achiever** ✅ — Pass your first quiz (40%+)\n• **Perfectionist** 🎯 — Score 100% on any quiz\n• **On a Roll!** 🔥 — 5-day streak\n• **Unstoppable** 🚀 — 10-day streak\n• **Speed Demon** ⚡ — Finish with avg <30s/question\n• **Chapter Master** 📚 — Pass all sets in a chapter\n• **Quiz Master** 👑 — Complete 50 quizzes\n\nView your achievements from the **side menu → Achievements**!",
            options: ['📊 Performance Summary', '↩ Back to main menu']
        },
        'Leaderboard & Rankings': {
            message: "🏅 **Leaderboards** on Quizify:\n\n• **All-Time** — Best overall scores across all users\n• **Weekly** — Top scores this week\n• **Monthly** — Top scores this month\n\nYour scores are updated **automatically** after each quiz. Navigate to **Leaderboard** from the side menu to see your rank!\n\n*Tip: Passing quizzes with high scores pushes you higher!*",
            options: ['📊 Performance Summary', '↩ Back to main menu']
        },
        'Daily Challenge': {
            message: "🔥 **Daily Challenge** — Your info:\n\n• A fresh set of **20 random questions** is available every day\n• Complete it to earn bonus **Quiz Coins** and XP\n• Daily Challenges reset at **midnight** each night\n• Academic students get **class-specific** daily challenges!\n\nFind it on the **Home Page** — look for the Daily Challenge card. 🎯",
            options: ['🔥 My streak info', '💰 Coins & rewards', '↩ Back to main menu']
        },
        'Battle Pass': {
            message: "🎖️ **Battle Pass** is Quizify's seasonal progression system!\n\n• **Earn XP** by completing quizzes, quests, and daily challenges\n• Unlock **free tier** rewards as you level up\n• Premium rewards available for dedicated learners\n• Each season resets — stay active to maximize rewards!\n\nAccess the Battle Pass from the **side menu**.",
            options: ['🎯 About Quests', '↩ Back to main menu']
        },
        'Quests': {
            message: "📋 **Quests** give you goals to complete!\n\n**Daily Quests** (reset every 24 hours):\n• Complete a quiz, Score 80%+, etc.\n\n**Weekly Quests** (reset every 7 days):\n• Complete 5 quizzes, Beat 3 chapters, etc.\n\nEach quest rewards you with **XP** and **Quiz Coins**. Find quests in the **side menu → Quests**. 🗺️",
            options: ['🎖️ Battle Pass info', '💰 How do I get more coins?', '↩ Back to main menu']
        },
        'Videos & Content': {
            message: "🎬 **Cinevix** is Quizify's video learning section!\n\nAccess educational videos, tutorials, and learning content from the **side menu → Cinevix**. New content is added regularly! 📺",
            options: ['↩ Back to main menu']
        },
        'Mock Test': {
            message: "📝 **Mock Test** simulates a real exam environment:\n\n• **Negative Marking**: −0.5 for incorrect answers\n• **Timed**: Exam conditions with a strict timer\n• Multiple sections (English, Quantitative, Reasoning)\n• Results show section-wise analysis\n\nAccess from the **Home Page → Competitive Exams → Mock Test**. 🎓",
            options: ['📋 How does scoring work?', '↩ Back to main menu']
        },
        'Friends & Social': {
            message: "👥 **Friends & Social Features**:\n\n• **Friends System** — Connect with learners, send/accept friend requests\n• **Global Chat** — Chat live with other students! (bottom-right FAB button 💬)\n• **Social Challenges** — Challenge friends to quiz battles!\n• **Leaderboard** — Compete globally for top positions\n\nVisit **Profile → Friends** tab to manage connections! 🤝",
            options: ['↩ Back to main menu']
        },
        'Notifications': {
            message: "🔔 **Smart Notifications** in Quizify:\n\n• **Streak Reminders** — Alerts when your daily streak is at risk\n• **Quest Updates** — Notified when quests are available/expiring\n• **Friend Activity** — Updates from your friend network\n\nNotifications appear via the **toast bar** at the top of the screen. Badge dots appear on the menu for unread items! 🔴",
            options: ['↩ Back to main menu']
        },
        'A question seems wrong': { message: "Thank you for helping improve Quizify! 🙏 Please send us an email with the **Subject**, **Chapter name**, **Set number**, and the **Question text** you think is incorrect. We review every report carefully and fix issues quickly!", options: ['❓ Contact Support', '↩ Back to main menu'] },
        "My quiz won't start": { message: "This can happen if:\n• The question set is **empty** (still under development) — Try another set\n• **Internet connection** is slow — Check your connection\n• A **page refresh** may help in some cases\n\nIf the issue persists across all sets, please contact support.", options: ['❓ Contact Support', '↩ Back to main menu'] },
        'How does scoring work?': { message: "📝 **Scoring System:**\n• You need **40% or more** to pass a quiz\n• Passing unlocks the **next set** in a chapter\n• Your profile shows your **average** across all quizzes\n• **Earn Quiz Coins** for passing and perfect scores!\n• **Mock Tests** have **negative marking** (−0.5 for wrong answers)", options: ['📊 Performance Summary', '↩ Back to main menu'] },
        'How does the timer work?': { message: "⏱️ **Timer Details:**\n• Each quiz set has a **configurable time** per question (default: 60 seconds)\n• The timer counts down — when it reaches 0 for a question, it auto-moves on\n• Use the **⏸ Time Freeze** lifeline to pause the timer for 30 seconds!\n• **Practice Mode** has no timer for relaxed learning", options: ['🃏 What are lifelines?', '↩ Back to main menu'] },
        'What are lifelines?': { message: "🃏 **Lifelines** help you during a quiz:\n\n• **50/50** ✂️ — Removes 2 wrong options (costs 1 lifeline use)\n• **Hint** 💡 — Shows a hint for the question\n• **Skip** ⏭️ — Skip a question without penalty\n• **Time Freeze** ❄️ — Pauses the timer for 30 seconds\n\nLifelines are **purchasable** from the Store with Quiz Coins! 💰", options: ['🛍️ Store & Purchases', '↩ Back to main menu'] },
        'My progress is not saving': { message: "Your progress is tied to your **Firebase account**. Make sure you're:\n• Logged in with the **correct credentials**\n• Connected to the **internet** during quizzes\n• Progress saves **automatically** after each quiz\n\nIf issues persist, try **refreshing the page** or contact support.", options: ['❓ Contact Support', '↩ Back to main menu'] },
        'How do I change my name/PIN?': { message: "Go to **Settings** (from the side menu ☰) → **Account** tab. You can update your **display name** and **PIN** there. Changes save instantly! ✅", options: ['↩ Back to main menu'] },
        'How do I change my password?': { message: "To change your password:\n1. Go to the **Login page** (logout first if needed)\n2. Click **'Forgot password?'** link\n3. Enter your **email address**\n4. Check your inbox for a **reset link**\n5. Click the link and set a new password!\n\nFor Google/Phone sign-in users, passwords are managed by those providers.", options: ['↩ Back to main menu'] },
        'How do I delete my account?': { message: "⚠️ **Account Deletion:**\n\nGo to **Settings** (side menu ☰) → **Danger Zone** tab.\n\n🔴 This action is **permanent** and cannot be undone!\n• All your progress, coins, and achievements will be deleted\n• You'll need to verify your identity before deletion proceeds", options: ['↩ Back to main menu'] },
        'About my streak': { message: "🔥 **Daily Streak** tracks your consecutive login days!\n\n• Log in and complete at least one quiz to maintain your streak\n• **Miss a day?** Your streak resets to 0\n• Streak rewards unlock achievements like **On a Roll!** (5 days) and **Unstoppable** (10 days)\n• Your streak is shown on the **Home page** header 🔥", options: ['📊 Performance Summary', '↩ Back to main menu'] },
        'How do I get more coins?': { message: "💰 **Ways to earn Quiz Coins:**\n• **Daily Login** — Collect 2 coins daily\n• **Pass a Quiz** — Earn 10 coins (first time per set)\n• **Perfect Score** — Bonus 25 coins (first time per set)\n• **Complete Chapter** — 100 coin bonus for clearing all sets\n• **Daily Challenge** — Bonus coins for completion\n• **Quests** — Earn coins by completing quest goals\n• **Bot Quiz** — Earn 5 coins per correct answer here! 🎯", options: ['↩ Back to main menu'] },
        'My purchase is not showing up': { message: "If your purchased item isn't showing:\n1. **Close and reopen** the side menu or settings\n2. **Refresh the page** — items sync from the server\n3. Check **Settings → Customization** tab\n4. If still missing after a page refresh, contact support with your purchase details", options: ['❓ Contact Support', '↩ Back to main menu'] },
        'How do I use a theme/avatar?': { message: "After purchasing from the **Store**:\n1. Open the **side menu** ☰\n2. Go to **Settings**\n3. Navigate to the **Customization** tab\n4. Select and apply your purchased **theme or avatar**\n\nChanges apply immediately! 🎨", options: ['↩ Back to main menu'] },
        'How do I sell an item?': { message: "To sell a purchased item:\n1. Open the **Store** from the side menu\n2. Go to the **Inventory** tab\n3. Find the item you want to sell\n4. Click the **Sell** button\n5. Confirm the sale\n\n⚠️ You receive **30% of the original cost** back as coins when selling.", options: ['↩ Back to main menu'] },
        'My streak info': { message: "🔥 Your streak is displayed on the **Home page** header. It tracks how many consecutive days you've logged in and completed at least one quiz. Keep it alive! 💪", options: ['📊 Performance Summary', '↩ Back to main menu'] },
        'Coins & rewards': { message: "💰 You can see your coin balance in the **bottom of the side menu** (☰). Spend coins in the **Store** on themes, avatars, and lifelines!", options: ['🛍️ Store & Purchases', '↩ Back to main menu'] },
        'Contact Support': { message: "I'm sorry I couldn't fully resolve this! 😔 Our support team is ready to help. Please describe your issue in detail when you email us — include your **username**, **device**, and what happened.", mailto: 'productionrtf@gmail.com' },
        'Back to main menu': { message: "Back to the main menu! What else can I help you with? 😊", options: ['📊 Performance Summary', '🎯 Quiz & Gameplay', '🏦 Account & Progress', '🛍️ Store & Purchases', '🔍 Search Content', '🏆 Achievements', '📅 Daily Challenge', '❓ Contact Support'] }
    },

    // ══════════════════════════════════════════
    //  INITIALIZATION
    // ══════════════════════════════════════════
    init(app) {
        this._app = app;
        this._botModal = document.getElementById('help-bot-modal');
        this._overlay  = document.getElementById('ai-panel-overlay');
        this._chatContainer = document.getElementById('bot-chat-messages');
        this._input = document.getElementById('bot-message-input');
        this._typingIndicator = document.getElementById('ai-typing-indicator');

        if (!this._botModal || !this._chatContainer || !this._input) {
            console.warn('QuizifyBot: Required DOM elements not found.');
            return;
        }

        // Expose the bot globally for inline handlers and external modules.
        window.QuizifyBot = this;

        // Open triggers
        const openBtn    = document.getElementById('open-help-bot-fab');
        const closeBtn   = document.getElementById('close-bot-modal-btn');
        const clearBtn   = document.getElementById('ai-clear-btn');
        const sendBtn    = document.getElementById('send-bot-message-btn');

        if (openBtn)    openBtn.addEventListener('click', () => this.openHelpBot());
        if (closeBtn)   closeBtn.addEventListener('click', () => this.closeHelpBot());
        if (clearBtn)   clearBtn.addEventListener('click', () => this._clearChat());
        if (sendBtn)    sendBtn.addEventListener('click', () => this.handleUserInput());
        if (this._overlay) this._overlay.addEventListener('click', () => this.closeHelpBot());

        // Support inline AI buttons that rely on global `window.QuizifyBot`.
        ['bn-ai', 'ai-home-search-bar', 'ai-home-ask-btn', 'pgv5-ai-btn', 'ai-result-ask-btn', 'ai-profile-btn']
            .forEach((id) => {
                const button = document.getElementById(id);
                if (button) button.addEventListener('click', () => this.openHelpBot());
            });

        // Support quiz-specific AI help buttons that should launch the quiz AI helper.
        ['quiz-ai-help-btn', 'lifeline-ai'].forEach((id) => {
            const button = document.getElementById(id);
            if (button) button.addEventListener('click', () => this.quizAIHelp());
        });

        this._input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });

        // Wire quick-action chips
        const chipsRow = document.getElementById('ai-chips-row');
        if (chipsRow) {
            chipsRow.addEventListener('click', (e) => {
                const chip = e.target.closest('.ai-chip');
                if (!chip) return;
                const prompt = chip.dataset.prompt || chip.textContent.trim();
                if (!prompt) return;

                this.addUserMessage(prompt);
                // Hide chips after first use for clean UI
                chipsRow.style.display = 'none';

                const lower = prompt.toLowerCase();
                setTimeout(() => {
                    if (/stats|performance|summary/.test(lower)) {
                        this.showPerformanceSummary();
                    } else if (/quiz me|random/.test(lower)) {
                        this.presentRandomQuestion();
                    } else if (/study tip|tip/.test(lower)) {
                        const tip = this.generateHomeTip();
                        this.addBotMessage(`💡 **Today's Study Tip:**\n\n${tip}`, ['🎯 Quiz Me', '📊 My Stats', '↩ Back to main menu']);
                    } else if (/streak/.test(lower)) {
                        this.showStreakInfo();
                    } else if (/coin/.test(lower)) {
                        this.showCoinBalance();
                    } else if (/achievement/.test(lower)) {
                        this.handleBotResponse('Achievements & Rewards');
                    } else {
                        // Treat as a normal text query
                        if (this._input) {
                            this._input.value = prompt;
                            this.handleUserInput();
                            // Clear because handleUserInput reads from input
                        }
                    }
                }, 300);
            });
        }

        // Event delegation for clickable elements in chat
        this._chatContainer.addEventListener('click', (e) => {
            const optionBtn = e.target.closest('.bot-option-btn');
            if (optionBtn && this._chatContainer.contains(optionBtn)) {
                const choice = optionBtn.textContent.trim();

                // ── Handle quiz help mode options ──
                if (this._quizHelpMode && this._quizContext) {
                    this.addUserMessage(choice);
                    optionBtn.closest('.bot-options-container')?.querySelectorAll('.bot-option-btn').forEach(b => b.disabled = true);

                    if (choice.includes('Show Correct Answer')) {
                        setTimeout(() => this._revealCorrectAnswer(), 300);
                    } else if (choice.includes('Explain the Concept')) {
                        setTimeout(() => this.explainTopic(null, this._quizContext.questionText, ''), 300);
                    } else if (choice.includes('Give Me a Hint')) {
                        setTimeout(() => {
                            const approach = this._generateApproach(this._quizContext.questionText);
                            this.addBotMessage(`🔍 **Hint:**\n\n${approach}\n\nTry to work through the options using this approach!`, ['✅ Show Correct Answer', '↩ Back to quiz']);
                        }, 300);
                    } else if (choice.includes('Back to quiz')) {
                        this._quizHelpMode = false;
                        this._quizContext = null;
                        this._currentState = 'start';
                        setTimeout(() => this.closeHelpBot(), 400);
                    } else {
                        // Generic response
                        setTimeout(() => this._handleOptionClick(choice), 300);
                    }
                    return;
                }

                this.addUserMessage(choice);
                setTimeout(() => this._handleOptionClick(choice), 300);
                return;
            }

            const questionOption = e.target.closest('.bot-question-option');
            if (questionOption && this._chatContainer.contains(questionOption)) {
                const choiceIndex = parseInt(questionOption.dataset.index, 10);
                const choiceLetter = String.fromCharCode(65 + choiceIndex); // A/B/C/D
                this.addUserMessage(questionOption.textContent.trim());
                if (this._currentState === 'practice_mode') {
                    // Route to practice answer handler (it accepts A/B/C/D)
                    setTimeout(() => this._handlePracticeAnswer(choiceLetter), 300);
                } else {
                    setTimeout(() => this.evaluateAnswer(choiceIndex), 300);
                }
                return;
            }

            const searchBtn = e.target.closest('.bot-search-result-btn');
            if (searchBtn && this._chatContainer.contains(searchBtn)) {
                const raw = searchBtn.getAttribute('data-result');
                let resultData = null;
                try { resultData = JSON.parse(raw); }
                catch (err) {
                    try { resultData = JSON.parse(raw.replace(/'/g, '"')); }
                    catch (err2) { console.error('QuizifyBot: Parse error:', err2); }
                }
                if (resultData) {
                    this.addUserMessage(`Go to "${resultData.chapterName}"`);
                    setTimeout(() => this.navigateToSearchResult(resultData), 300);
                }
                return;
            }
        });

        // Populate inline cards after a short delay
        setTimeout(() => this.refreshInlineCards(), 1200);

        console.log('\u2705 QuizifyBot initialized (AI mode)');
    },

    // ══════════════════════════════════════════
    //  OPEN / CLOSE
    // ══════════════════════════════════════════
    openHelpBot(prefillText = null) {
        if (!this._botModal) return;

        // ── Guard: prevent double open ──
        if (this._isOpen) {
            // Panel already open — just focus input
            if (this._input) this._input.focus();
            if (prefillText) { this._input.value = prefillText; }
            return;
        }
        this._isOpen = true;

        this._botModal.classList.add('open');
        this._botModal.classList.add('typing-active');
        if (this._overlay) this._overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';

        // Hide proactive bubble if visible
        this._hideProactiveBubble();

        // Reset chat & state
        this._chatContainer.innerHTML = '';
        if (this._typingIndicator) this._typingIndicator.style.display = 'none';
        this._currentState = 'start';
        this._currentQuestion = null;
        this._practiceQueue = [];
        this._isTyping = false;

        // Restore chips row
        const chipsRow = document.getElementById('ai-chips-row');
        if (chipsRow) chipsRow.style.display = '';

        let _authUser = null;
        try { _authUser = firebase.auth().currentUser; } catch(e) {}
        const userName = _authUser?.displayName || _authUser?.email?.split('@')[0] || null;
        const up = window.userProgress || {};
        const streak = up.currentStreak || 0;
        const coins = up.quizCoins || 0;

        // Build a dynamic, contextual greeting
        let greeting = userName ? `Hey **${userName}**! ✨` : 'Hey there! ✨';
        let context = '';
        if (streak > 0) context += ` You're on a 🔥 **${streak}-day streak**!`;
        if (coins > 0) context += ` You have **${coins} coins** 💰.`;

        const personalizedMessage = `${greeting}${context}\n\nI'm **Quizify AI** — your personal learning companion!\n\n🎯 **I can:**\n• Quiz you on any subject or topic\n• Analyze your performance\n• Explain concepts step-by-step\n• Navigate to any chapter\n• Answer any question about the app\n\nJust type anything — or tap a chip below! 👇`;

        // Prefill input if coming from an inline context
        if (prefillText && this._input) this._input.value = prefillText;

        setTimeout(() => {
            this.addBotMessage(personalizedMessage, this.CONVERSATION_TREE['start'].options);
        }, 300);

        setTimeout(() => { if (this._input) this._input.focus(); }, 500);
    },

    closeHelpBot() {
        if (this._botModal) {
            this._botModal.classList.remove('open');
            this._botModal.classList.remove('typing-active');
        }
        if (this._overlay) this._overlay.classList.remove('visible');
        document.body.style.overflow = '';
        this._isOpen = false;
    },

    _clearChat() {
        if (this._chatContainer) this._chatContainer.innerHTML = '';
        if (this._typingIndicator) this._typingIndicator.style.display = 'none';
        const chipsRow = document.getElementById('ai-chips-row');
        if (chipsRow) chipsRow.style.display = '';
        this._currentState = 'start';
        this._currentQuestion = null;
        this._practiceQueue = [];
        this._isTyping = false;
    },

    // ══════════════════════════════════════════
    //  PROACTIVE GREETING BUBBLE
    // ══════════════════════════════════════════
    showProactiveGreeting() {
        let _authUser = null;
        try { _authUser = firebase.auth().currentUser; } catch(e) {}
        const userName = _authUser?.displayName || _authUser?.email?.split('@')[0] || null;
        const firstName = userName ? userName.split(' ')[0] : null;
        const up = window.userProgress || {};
        const streak = up.currentStreak || 0;

        let text = firstName ? `Hi ${firstName}! 👋` : 'Hi there! 👋';
        if (streak > 0) {
            text += ` ${streak}-day streak 🔥`;
        } else {
            text += ' Ready to learn?';
        }

        // Create or reuse the bubble element
        let bubble = document.getElementById('ai-proactive-bubble');
        if (!bubble) {
            bubble = document.createElement('div');
            bubble.id = 'ai-proactive-bubble';
            bubble.className = 'ai-proactive-bubble';
            bubble.addEventListener('click', () => this.openHelpBot());
            document.body.appendChild(bubble);
        }

        bubble.innerHTML = `<span class="apb-icon">✦</span><span class="apb-text">${text}</span><button class="apb-close" onclick="event.stopPropagation();document.getElementById('ai-proactive-bubble').classList.remove('show')">×</button>`;
        requestAnimationFrame(() => bubble.classList.add('show'));

        // Auto-dismiss after 7 seconds
        clearTimeout(this._bubbleTimer);
        this._bubbleTimer = setTimeout(() => bubble.classList.remove('show'), 7000);
    },

    _hideProactiveBubble() {
        const bubble = document.getElementById('ai-proactive-bubble');
        if (bubble) bubble.classList.remove('show');
    },

    // ══════════════════════════════════════════
    //  INPUT HANDLING (Advanced NLU)
    // ══════════════════════════════════════════
    handleUserInput() {
        if (!this._input) return;
        const userInput = this._input.value.trim();
        if (!userInput || this._isTyping) return;

        this.addUserMessage(userInput);
        this._input.value = '';

        // ── State-based handling ──
        if (this._currentState === 'await_search_query') { this.performSearch(userInput); return; }
        if (this._currentState === 'practice_mode') { this._handlePracticeAnswer(userInput); return; }

        const lower = userInput.toLowerCase();

        // ── 0. Detect TOPIC PRACTICE intent (highest priority) ──
        // "quiz me on percentage", "practice trigonometry", "test me in chemistry"
        const practiceIntent = /quiz me|practice|test me|give me questions|questions on|prepare me|study (.+)|quiz on|topic quiz/.test(lower);
        if (practiceIntent) {
            const subj = this.detectSubject(lower);
            const topicKw = this._extractTopicKeyword(lower);
            if (subj || topicKw) {
                this.startTopicPractice(subj, topicKw);
                return;
            }
            // Generic random question
            this.presentRandomQuestion(subj);
            return;
        }

        // ── 1. Explain topic intent ──
        if (/explain|what is|tell me about|describe|definition of|how does/.test(lower)) {
            const subj = this.detectSubject(lower);
            const topic = this._extractTopicKeyword(lower);
            if (subj || topic) {
                this.explainTopic(subj, topic, userInput);
                return;
            }
        }

        // ── 1a. Active quiz question helper ──
        const quizHelpIntent = /correct answer|correct option|right answer|show answer|show correct|which option|solve this|help me with this question|answer key|what is the answer/i.test(lower);
        const appCtx = this._app?.getActiveQuizContext?.() || {};
        const activeQuestionText = appCtx?.currentQuestion?.question || document.getElementById('question-text')?.textContent?.trim();
        if (quizHelpIntent && activeQuestionText) {
            this.quizAIHelp();
            return;
        }

        // ── 2. Coin / streak / performance / history keywords ──
        if (this.matchesKeywords(lower, this.COIN_KEYWORDS)) { this.showCoinBalance(); return; }
        if (this.matchesKeywords(lower, this.STREAK_KEYWORDS)) { this.showStreakInfo(); return; }
        if (this.matchesKeywords(lower, this.PERFORMANCE_KEYWORDS)) { this.showPerformanceSummary(); return; }
        if (this.matchesKeywords(lower, this.STRENGTH_KEYWORDS)) { this.showStrengths(); return; }
        if (this.matchesKeywords(lower, this.WEAKNESS_KEYWORDS)) { this.showWeaknesses(); return; }
        if (this.matchesKeywords(lower, this.HISTORY_KEYWORDS)) { this.showRecentQuizHistory(); return; }

        // ── 3. Subject-specific performance ──
        const subjectMatch = this.detectSubject(lower);
        if (subjectMatch && (lower.includes('score') || lower.includes('performance') || lower.includes('how') || lower.includes('stat'))) {
            this.showSubjectPerformance(subjectMatch); return;
        }

        // ── 4. Navigation ──
        if (/go to|take me to|open|navigate to/.test(lower)) {
            if (lower.includes('store'))       { this._navTo('store-page', '🛍️ Opening Store!'); return; }
            if (lower.includes('profile'))     { this._navTo('profile-page', '👤 Opening Profile!'); return; }
            if (lower.includes('leaderboard')) { this._navTo('leaderboard-page', '🏆 Opening Leaderboard!'); return; }
            if (lower.includes('settings'))    { this._navTo('settings-page', '⚙️ Opening Settings!'); return; }
            if (lower.includes('home'))        { this.addBotMessage('🏠 Going home!', []); setTimeout(() => { this.closeHelpBot(); if (window.goToHome) goToHome(); }, 600); return; }
        }

        // ── 5. Small talk ──
        const smallTalk = this.getSmallTalkResponse(userInput);
        if (smallTalk) {
            this.addBotMessage(smallTalk);
            if (!['help', 'motivation', 'joke'].some(k => lower.includes(k))) {
                setTimeout(() => this.handleBotResponse('Back to main menu'), 1600);
            }
            return;
        }

        // ── 6. Keyword intent fallback ──
        const intent = this.getIntentFromInput(userInput);
        if (intent) { setTimeout(() => this.handleBotResponse(intent), 400); }
    },

    _navTo(page, msg) {
        this.addBotMessage(msg, []);
        setTimeout(() => { this.closeHelpBot(); if (this._app?.showPage) this._app.showPage(page); }, 700);
    },

    _extractTopicKeyword(lower) {
        // Remove common verbs to get the topic word
        const cleaned = lower
            .replace(/quiz me on|practice|test me on|test me in|give me questions on|questions on|study|quiz on|prepare me for|explain|what is|tell me about|describe|definition of|how does/g, '')
            .trim();
        if (cleaned.length > 2) return cleaned;
        return null;
    },

    // ══════════════════════════════════════════════════════
    //  TOPIC PRACTICE MODE (Gemini-style sequential quiz)
    // ══════════════════════════════════════════════════════
    startTopicPractice(subject, topicKeyword) {
        // 1. Try to fetch from app curriculum first
        let pool = this._fetchCurriculumQuestions(subject, topicKeyword);

        // 2. Fall back to QUESTION_BANK
        if (!pool || pool.length === 0) {
            if (subject && this.QUESTION_BANK[subject]) {
                pool = [...this.QUESTION_BANK[subject]];
            } else {
                // Gather all
                pool = [];
                for (const key in this.QUESTION_BANK) pool = pool.concat(this.QUESTION_BANK[key]);
            }
        }

        if (!pool || pool.length === 0) {
            this.addBotMessage(
                `I don't have questions for **${topicKeyword || subject || 'that topic'}** yet. Try searching the app for it, or ask me about another subject!\n\nAvailable: English, Quantitative, Reasoning, Math, Physics, Chemistry, Biology`,
                ['🎯 Give me any question', '🔍 Search Content', '↩ Back to main menu']
            );
            return;
        }

        // Shuffle pool and limit to 10 questions per session
        pool = pool.sort(() => Math.random() - 0.5).slice(0, 10);

        this._practiceQueue = pool;
        this._practiceIndex = 0;
        this._practiceScore = 0;
        this._practiceSubject = subject || topicKeyword || 'General';
        this._currentState = 'practice_mode';

        const topicName = topicKeyword || this._getSubjectTitle(subject) || 'General Knowledge';
        this.addBotMessage(
            `🎯 **Practice Session: ${topicName}**\n\n**${pool.length} questions** ready for you! I'll give them one by one and explain each answer.\n\n✅ Type the **option letter** (A, B, C, D) or tap the option to answer.\n\n_Let's go!_ 💪`,
            []
        );

        setTimeout(() => this._showPracticeQuestion(), 600);
    },

    _fetchCurriculumQuestions(subject, topicKeyword) {
        // Try to get questions from the app's quizData global or allQuizData loaded from Firestore
        const quizData = window.quizData || window.QuizifyApp?.quizData || this._app?.getActiveQuizContext?.()?.quizData || window.allQuizData;
        if (!quizData) return null;

        let pool = [];
        const keyword = (topicKeyword || '').toLowerCase();
        const subj = (subject || '').toLowerCase();

        const subjectDocs = Array.isArray(quizData) ? quizData : Object.values(quizData);
        subjectDocs.forEach((doc) => {
            if (!doc || typeof doc !== 'object') return;
            const docKey = (doc.id || doc.subject || '').toLowerCase();
            if (subj && !docKey.includes(subj) && !docKey.includes(subject || '')) return;

            const chapters = Array.isArray(doc.chapters) ? doc.chapters : Object.values(doc.chapters || {});
            chapters.forEach((chapter) => {
                if (!chapter || typeof chapter !== 'object') return;
                const chapterName = (chapter.name || '').toLowerCase();
                if (keyword && !chapterName.includes(keyword) && !(chapterName.includes(subject || '').toLowerCase())) return;

                const sets = Array.isArray(chapter.sets) ? chapter.sets : Object.values(chapter.sets || {});
                sets.forEach((set) => {
                    if (!set || !Array.isArray(set.questions)) return;
                    set.questions.forEach(q => {
                        if (q && q.question && Array.isArray(q.options)) pool.push(q);
                    });
                });
            });
        });

        return pool.length > 0 ? pool : null;
    },

    _findQuestionInQuizData(questionText, options = []) {
        const dataSource = this._app?.allQuizData || window.allQuizData || [];
        const questionLower = String(questionText || '').trim().toLowerCase();
        const optionSet = new Set(Array.isArray(options) ? options.map(opt => String(opt || '').replace(/^[A-D]\.\s*/i, '').trim().toLowerCase()) : []);

        const docs = Array.isArray(dataSource) ? dataSource : Object.values(dataSource);
        for (const doc of docs) {
            if (!doc || typeof doc !== 'object') continue;
            const chapters = Array.isArray(doc.chapters) ? doc.chapters : Object.values(doc.chapters || {});
            for (const chapter of chapters) {
                if (!chapter || typeof chapter !== 'object') continue;
                const sets = Array.isArray(chapter.sets) ? chapter.sets : Object.values(chapter.sets || {});
                for (const set of sets) {
                    if (!set || !Array.isArray(set.questions)) continue;
                    for (const q of set.questions) {
                        if (!q || !q.question || !Array.isArray(q.options)) continue;
                        const qText = String(q.question).trim().toLowerCase();
                        if (questionLower && (qText === questionLower || qText.includes(questionLower) || questionLower.includes(qText))) {
                            return q;
                        }
                        if (optionSet.size > 0 && q.options.some(opt => optionSet.has(String(opt || '').trim().toLowerCase()))) {
                            return q;
                        }
                    }
                }
            }
        }
        return null;
    },

    _showPracticeQuestion() {
        if (this._practiceIndex >= this._practiceQueue.length) {
            this._endPracticeSession();
            return;
        }

        const q = this._practiceQueue[this._practiceIndex];
        this._currentQuestion = q;
        const num = this._practiceIndex + 1;
        const total = this._practiceQueue.length;

        // Progress bar text
        const progressBar = '█'.repeat(num) + '░'.repeat(total - num);

        const msgDiv = this.addMessage(
            `**Q${num}/${total}** ${progressBar}\n\n${q.question}`,
            'bot-message', true
        );
        if (!msgDiv) return;

        setTimeout(() => {
            const opts = document.createElement('div');
            opts.className = 'bot-options-container practice-options';
            q.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'bot-question-option';
                btn.innerHTML = `<span class="bot-question-option-letter">${String.fromCharCode(65 + i)}.</span> ${opt}`;
                btn.dataset.index = i;
                opts.appendChild(btn);
            });
            const content = msgDiv.querySelector('.chat-message-content');
            if (content) content.appendChild(opts);
            this._chatContainer.scrollTop = this._chatContainer.scrollHeight;
        }, 100);
    },

    _handlePracticeAnswer(userInput) {
        const q = this._currentQuestion;
        if (!q) { this._currentState = 'start'; return; }

        // Accept A/B/C/D or 0/1/2/3
        let choiceIndex = -1;
        const lower = userInput.trim().toLowerCase();
        if (lower === 'a' || lower === '1') choiceIndex = 0;
        else if (lower === 'b' || lower === '2') choiceIndex = 1;
        else if (lower === 'c' || lower === '3') choiceIndex = 2;
        else if (lower === 'd' || lower === '4') choiceIndex = 3;
        else choiceIndex = parseInt(lower, 10);

        if (choiceIndex < 0 || choiceIndex >= q.options.length) {
            this.addBotMessage('Please type **A, B, C, or D** to answer.', []);
            return;
        }

        const correct = choiceIndex === q.answerIndex;
        if (correct) {
            this._practiceScore++;
            this.addBotMessage(`✅ **Correct!** 🎉\n\n${q.explanation || ''}`, []);
            try { if (this._app?.awardCoins) this._app.awardCoins(3); } catch(e) {}
        } else {
            const correctText = q.options[q.answerIndex];
            this.addBotMessage(`❌ **Not quite!** Correct answer: **${correctText}**\n\n${q.explanation || ''}\n\n_Don't worry — this is how we learn! 📚_`, []);
        }

        this._practiceIndex++;
        this._currentQuestion = null;

        setTimeout(() => {
            if (this._practiceIndex < this._practiceQueue.length) {
                this._showPracticeQuestion();
            } else {
                this._endPracticeSession();
            }
        }, 1200);
    },

    _endPracticeSession() {
        const total = this._practiceQueue.length;
        const score = this._practiceScore;
        const pct = Math.round((score / total) * 100);
        let emoji = pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : pct >= 40 ? '👍' : '📚';

        this.addBotMessage(
            `${emoji} **Practice Complete!**\n\n**Score: ${score}/${total} (${pct}%)**\n\n${this.generateResultFeedback(pct, this._practiceSubject)}\n\n_You earned ${score * 3} coins! 💰_`,
            ['🔄 Practice Again', '📊 My Stats', '↩ Back to main menu']
        );

        this._currentState = 'start';
        this._currentQuestion = null;
        this._practiceQueue = [];
    },

    // ══════════════════════════════════════════════════════
    //  EXPLAIN TOPIC
    // ══════════════════════════════════════════════════════
    explainTopic(subject, topicKeyword, originalInput) {
        const EXPLANATIONS = {
            percentage: 'A **percentage** is a fraction expressed as a part of 100.\n\n**Formula:** Percentage = (Part / Whole) × 100\n\n**Example:** 25 out of 50 = (25/50) × 100 = **50%**\n\n💡 Tip: To find X% of Y, calculate (X × Y) / 100.',
            ratio: 'A **ratio** compares two quantities.\n\n**Example:** If there are 3 cats and 5 dogs, the ratio is 3:5.\n\nTo simplify, divide both by their GCD.',
            profit: '**Profit & Loss:**\n• Profit = Selling Price − Cost Price\n• Loss = Cost Price − Selling Price\n• Profit% = (Profit / CP) × 100',
            average: '**Average** = Sum of all values ÷ Number of values\n\n**Example:** Average of 10, 20, 30 = 60 / 3 = **20**',
            speed: '**Speed, Distance, Time:**\n• Speed = Distance / Time\n• Distance = Speed × Time\n• Time = Distance / Speed',
            pronoun: 'A **pronoun** replaces a noun.\n\n**Types:** Personal (I, you, he), Possessive (my, your, his), Reflexive (myself, yourself).',
            tense: '**Tenses** show when an action occurs:\n• Present: I **eat**\n• Past: I **ate**\n• Future: I **will eat**\n\nEach has Simple, Continuous, Perfect, and Perfect Continuous forms.',
            cell: 'The **cell** is the basic unit of life. 🔬\n\n**Key parts:**\n• **Nucleus** — control center\n• **Mitochondria** — energy producer\n• **Cell membrane** — protective barrier\n• **Ribosome** — protein factory',
        };

        const topicLower = (topicKeyword || '').toLowerCase();
        const subjLower = (subject || '').toLowerCase();

        // Check built-in explanations
        for (const key in EXPLANATIONS) {
            if (topicLower.includes(key) || subjLower.includes(key)) {
                this.addBotMessage(
                    `📖 **Concept: ${key.charAt(0).toUpperCase() + key.slice(1)}**\n\n${EXPLANATIONS[key]}`,
                    ['🎯 Quiz Me On This', '📚 More Concepts', '↩ Back to main menu']
                );
                return;
            }
        }

        // Fallback: offer to search + quiz
        const topicName = topicKeyword || this._getSubjectTitle(subject) || 'this topic';
        this.addBotMessage(
            `I can help you with **${topicName}**! 📖\n\nWould you like me to:\n• **Quiz you** on ${topicName} questions?\n• **Search** for ${topicName} chapters in the app?`,
            [`🎯 Quiz me on ${topicName}`, `🔍 Search for ${topicName}`, '↩ Back to main menu']
        );
    },



    matchesKeywords(input, keywords) {
        return keywords.some(kw => input.includes(kw));
    },

    detectSubject(input) {
        const subjectMap = {
            'english': 'english', 'verbal': 'english',
            'quantitative': 'quantitative', 'quant': 'quantitative', 'aptitude': 'quantitative',
            'reasoning': 'reasoning', 'logical': 'reasoning',
            'math': 'math', 'mathematics': 'math', 'maths': 'math',
            'physics': 'physics', 'phy': 'physics',
            'chemistry': 'chemistry', 'chem': 'chemistry',
            'biology': 'biology', 'bio': 'biology',
            'science': 'physics'
        };
        for (const [keyword, subject] of Object.entries(subjectMap)) {
            if (input.includes(keyword)) return subject;
        }
        return null;
    },

    getIntentFromInput(input) {
        const lowerInput = input.toLowerCase();

        // Direct search trigger
        if (lowerInput.startsWith('search for ') || lowerInput.startsWith('find ') || lowerInput.startsWith('look for ')) {
            const query = lowerInput.replace(/^(search for|find|look for)\s+/, '');
            this.performSearch(query);
            return null;
        }

        // Multi-word keyword matching (longer first for accuracy)
        const sortedKeywords = Object.keys(this.KEYWORD_INTENTS).sort((a, b) => b.length - a.length);
        for (const keyword of sortedKeywords) {
            if (lowerInput.includes(keyword)) return this.KEYWORD_INTENTS[keyword];
        }

        // Fallback: suggest search if it looks like they want content
        if (lowerInput.length > 3) {
            this.addBotMessage(
                `I'm not quite sure what you mean by **"${input}"**. 🤔\n\nHere's what I can help with:\n• Ask about **performance stats** (e.g., "show my stats")\n• **Search** for content (e.g., "find algebra")\n• Ask about **app features** (e.g., "how do coins work")\n• Get a **random quiz question** (e.g., "quiz me")\n\nOr just pick an option below! 👇`,
                this.CONVERSATION_TREE['Back to main menu'].options
            );
            this._currentState = 'start';
        }
        return null;
    },

    getSmallTalkResponse(input) {
        const lowerInput = input.toLowerCase();
        for (const category in this.SMALL_TALK) {
            const cat = this.SMALL_TALK[category];
            for (const keyword of cat.keywords) {
                if (lowerInput.includes(keyword)) {
                    const responses = cat.responses || [cat.response];
                    return responses[Math.floor(Math.random() * responses.length)];
                }
            }
        }
        return null;
    },

    // ══════════════════════════════════════════
    //  COIN & STREAK DISPLAY
    // ══════════════════════════════════════════
    showCoinBalance() {
        const up = window.userProgress || {};
        const coins = up.quizCoins || 0;
        this.addBotMessage(
            `💰 **Your Quiz Coin Balance: ${coins} coins**\n\nHere's how to earn more:\n• **Daily Login** — 2 coins/day\n• **Pass a Quiz** — 10 coins (first time)\n• **Perfect Score** — 25 coins (first time)\n• **Complete Chapter** — 100 coins\n• **Correct Answer Here** — 5 coins 🤖\n\nSpend them in the **Store** on themes, avatars & lifelines!`,
            ['🛍️ Store & Purchases', '↩ Back to main menu']
        );
    },

    showStreakInfo() {
        const up = window.userProgress || {};
        const streak = up.currentStreak || 0;
        const maxStreak = up.maxStreak || streak;
        let msg = `🔥 **Your Current Streak: ${streak} day${streak !== 1 ? 's' : ''}**\n`;
        if (maxStreak > streak) msg += `🏅 **Best Streak Ever: ${maxStreak} days**\n\n`;
        if (streak === 0) {
            msg += 'Start a new streak today by completing any quiz! 💪';
        } else if (streak < 5) {
            msg += `Keep going! ${5 - streak} more day${5 - streak !== 1 ? 's' : ''} to earn the **On a Roll!** 🔥 achievement!`;
        } else if (streak < 10) {
            msg += `Amazing consistency! ${10 - streak} more day${10 - streak !== 1 ? 's' : ''} to earn **Unstoppable!** 🚀`;
        } else {
            msg += `Legendary streak! 🌟 You're an absolute champion. Keep it going!`;
        }
        this.addBotMessage(msg, ['📊 Performance Summary', '🏆 Achievements', '↩ Back to main menu']);
    },

    // ══════════════════════════════════════════
    //  PERFORMANCE ANALYTICS
    // ══════════════════════════════════════════
    _getStats() {
        try { if (typeof calculateOverallStats === 'function') return calculateOverallStats(); } catch (e) {}
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
        return { totalQuizzes, quizzesPassed, averageScore: totalQuizzes > 0 ? totalScore / totalQuizzes : 0, subjectStats };
    },

    _getTopicAnalysis() {
        try { if (typeof analyzeTopicStrength === 'function') return analyzeTopicStrength(); } catch (e) {}
        return { strengths: [], improvements: [] };
    },

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
            math: 'Mathematics', physics: 'Physics', chemistry: 'Chemistry', biology: 'Biology',
            general_science: 'General Science'
        };
        if (subject && subject.startsWith('class')) {
            try { if (typeof getSubjectTitle === 'function') return getSubjectTitle(subject); } catch(e) {}
        }
        return titles[subject] || (subject ? subject.charAt(0).toUpperCase() + subject.slice(1) : 'Unknown');
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
            this.addBotMessage("📊 You haven't taken any quizzes yet!\n\nHead to the **Home Page** and start a quiz to begin building your performance profile. Every journey starts with a single step! 🎯", ['🎯 Quiz & Gameplay', '↩ Back to main menu']);
            return;
        }

        let html = `<div class="bot-performance-card">
            <h4>📊 Your Performance Summary</h4>
            <div class="bot-stat-row"><span class="bot-stat-label">Quizzes Taken</span><span class="bot-stat-value">${stats.totalQuizzes}</span></div>
            <div class="bot-stat-row"><span class="bot-stat-label">Quizzes Passed</span><span class="bot-stat-value ${this._scoreClass(passRate)}">${stats.quizzesPassed} (${passRate}%)</span></div>
            <div class="bot-stat-row"><span class="bot-stat-label">Average Score</span><span class="bot-stat-value ${this._scoreClass(stats.averageScore)}">${stats.averageScore.toFixed(1)}%</span></div>
            <div class="bot-stat-row"><span class="bot-stat-label">Quiz Coins</span><span class="bot-stat-value">💰 ${coins}</span></div>
            <div class="bot-stat-row"><span class="bot-stat-label">Current Streak</span><span class="bot-stat-value">🔥 ${streak} day${streak !== 1 ? 's' : ''}</span></div>
        </div>`;

        if (Object.keys(stats.subjectStats).length > 0) {
            html += `<div class="bot-performance-card"><h4>📚 Subject Breakdown</h4>`;
            for (const [subject, data] of Object.entries(stats.subjectStats)) {
                const avg = Math.round(data.totalScore / data.count);
                html += `<div class="bot-stat-row"><span class="bot-stat-label">${this._getSubjectTitle(subject)}</span><span class="bot-stat-value ${this._scoreClass(avg)}">${avg}% (${data.count} quiz${data.count !== 1 ? 'zes' : ''})</span></div>`;
            }
            html += `</div>`;
        }

        if (analysis.strengths.length > 0) {
            html += `<div class="bot-performance-card"><h4>💪 Strong Topics</h4>`;
            analysis.strengths.slice(0, 5).forEach(t => { html += `<span class="bot-topic-chip">${t.name} (${t.score}%)</span>`; });
            html += `</div>`;
        }

        if (analysis.improvements.length > 0) {
            html += `<div class="bot-performance-card"><h4>📈 Areas to Improve</h4>`;
            analysis.improvements.slice(0, 5).forEach(t => { html += `<span class="bot-topic-chip weak">${t.name} (${t.score}%)</span>`; });
            html += `</div>`;
        }

        let verdict = '';
        if (stats.averageScore >= 80) verdict = "🌟 **Outstanding!** You're in the top tier of performers. Keep pushing for those perfect scores!";
        else if (stats.averageScore >= 60) verdict = "👍 **Great job!** You're performing well above average. Focus on your weak areas to reach excellence!";
        else if (stats.averageScore >= 40) verdict = "💪 **You're passing!** But there's significant room to grow. Target your weak subjects and practice daily.";
        else verdict = "📖 **Keep going!** Don't be discouraged — consistent practice leads to improvement. Start with easier chapters and build confidence!";
        html += `<p style="margin-top:12px;color:#e2e8f0;">${verdict}</p>`;

        this.addBotMessage(html, ['💪 My Strengths', '📈 My Weaknesses', '📜 Recent History', '↩ Back to main menu']);
    },

    showStrengths() {
        const analysis = this._getTopicAnalysis();
        if (analysis.strengths.length === 0) {
            this.addBotMessage("You need to score **70% or more** on quiz topics to identify your strong areas. Keep practicing — your strengths will emerge! 💪", ['📊 Performance Summary', '↩ Back to main menu']);
            return;
        }
        let html = `<div class="bot-performance-card"><h4>💪 Your Strong Topics</h4>`;
        analysis.strengths.forEach(t => {
            html += `<div class="bot-stat-row"><span class="bot-stat-label">${t.name} <small>(${t.subject})</small></span><span class="bot-stat-value good">${t.score}%</span></div>`;
        });
        html += `</div><p style="color:#e2e8f0;">Excellent work on these topics! 🏆 Consider helping classmates or trying harder chapter sets to deepen your mastery.</p>`;
        this.addBotMessage(html, ['📈 My Weaknesses', '📊 Performance Summary', '↩ Back to main menu']);
    },

    showWeaknesses() {
        const analysis = this._getTopicAnalysis();
        if (analysis.improvements.length === 0) {
            this.addBotMessage("No significant weak areas found! 🎉 Either you're doing great across the board, or you need to attempt more quizzes for a clearer picture. 📚", ['📊 Performance Summary', '↩ Back to main menu']);
            return;
        }
        let html = `<div class="bot-performance-card"><h4>📈 Topics to Improve</h4>`;
        analysis.improvements.forEach(t => {
            html += `<div class="bot-stat-row"><span class="bot-stat-label">${t.name} <small>(${t.subject})</small></span><span class="bot-stat-value warning">${t.score}%</span></div>`;
        });
        html += `</div><p style="color:#e2e8f0;">💡 <strong>Pro Tip:</strong> Re-attempt these quiz sets multiple times. Focus on <em>understanding why</em> answers are correct, not just memorizing them. Understanding beats memorization every time! 🧠</p>`;
        this.addBotMessage(html, ['💪 My Strengths', '📊 Performance Summary', '↩ Back to main menu']);
    },

    showRecentQuizHistory() {
        const history = this._getRecentHistory(8);
        if (history.length === 0) {
            this.addBotMessage("No quiz history found yet! 🎯 Complete some quizzes and I'll show you your recent activity here. Every quiz you take is saved!", ['🎯 Quiz & Gameplay', '↩ Back to main menu']);
            return;
        }
        let html = `<div class="bot-performance-card"><h4>📜 Recent Quiz Activity</h4>`;
        history.forEach(entry => {
            const date = entry.date ? new Date(entry.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 'Unknown';
            const scoreClass = this._scoreClass(entry.score || 0);
            const subject = entry.subject ? this._getSubjectTitle(entry.subject) : '';
            const passed = (entry.score || 0) >= 40 ? '✅' : '❌';
            html += `<div class="bot-stat-row">
                <span class="bot-stat-label">${passed} ${entry.chapter || 'Quiz'} ${subject ? `<small>(${subject})</small>` : ''}<br><small style="opacity:0.6">${date}</small></span>
                <span class="bot-stat-value ${scoreClass}">${entry.score || 0}%</span>
            </div>`;
        });
        html += `</div>`;
        this.addBotMessage(html, ['📊 Performance Summary', '📈 My Weaknesses', '↩ Back to main menu']);
    },

    showSubjectPerformance(subjectKey) {
        const stats = this._getStats();
        const subjectData = stats.subjectStats[subjectKey];
        if (!subjectData) {
            this.addBotMessage(`I don't have any quiz data for **${this._getSubjectTitle(subjectKey)}** yet. Take some quizzes in that subject and I'll analyze your performance! 📝`, ['↩ Back to main menu']);
            return;
        }
        const avg = Math.round(subjectData.totalScore / subjectData.count);
        let html = `<div class="bot-performance-card">
            <h4>📚 ${this._getSubjectTitle(subjectKey)} Performance</h4>
            <div class="bot-stat-row"><span class="bot-stat-label">Quizzes Taken</span><span class="bot-stat-value">${subjectData.count}</span></div>
            <div class="bot-stat-row"><span class="bot-stat-label">Average Score</span><span class="bot-stat-value ${this._scoreClass(avg)}">${avg}%</span></div>
        </div>`;
        const analysis = this._getTopicAnalysis();
        const relatedStrengths = analysis.strengths.filter(t => t.subject === this._getSubjectTitle(subjectKey));
        const relatedWeaknesses = analysis.improvements.filter(t => t.subject === this._getSubjectTitle(subjectKey));
        if (relatedStrengths.length > 0) html += `<p style="color:#10b981;">💪 <strong>Strong chapters:</strong> ${relatedStrengths.map(t => `${t.name} (${t.score}%)`).join(', ')}</p>`;
        if (relatedWeaknesses.length > 0) html += `<p style="color:#f59e0b;">📈 <strong>Needs work:</strong> ${relatedWeaknesses.map(t => `${t.name} (${t.score}%)`).join(', ')}</p>`;
        this.addBotMessage(html, ['📊 Full Summary', '↩ Back to main menu']);
    },

    // ══════════════════════════════════════════
    //  CONVERSATION TREE HANDLER
    // ══════════════════════════════════════════
    _handleOptionClick(choice) {
        // Alias for handleBotResponse — used in both normal and quiz mode
        this.handleBotResponse(choice);
    },

    _revealCorrectAnswer() {
        const ctx = this._quizContext;
        if (!ctx) { this.addBotMessage("I couldn't find the current question. Please try again!", []); return; }

        // Try to find the correct option from the DOM
        const optionsContainer = document.getElementById('options-container');
        let correctText = null;
        let correctLetter = null;

        if (optionsContainer) {
            const btns = optionsContainer.querySelectorAll('button, .option-btn, .option');
            btns.forEach((btn, i) => {
                // Check for 'correct' class or data attribute
                if (btn.classList.contains('correct') || btn.dataset.correct === 'true' || btn.dataset.isCorrect === 'true') {
                    correctText = btn.textContent.trim();
                    correctLetter = String.fromCharCode(65 + i);
                }
            });
        }

        // Try the current app quiz context first
        if ((!correctText || !correctLetter) && this._app?.getActiveQuizContext) {
            const appCtx = this._app.getActiveQuizContext();
            const q = appCtx?.currentQuestion;
            if (q && (q.answer !== undefined || q.answerIndex !== undefined) && Array.isArray(q.options)) {
                const answerIndex = q.answer !== undefined ? q.answer : q.answerIndex;
                if (answerIndex >= 0 && answerIndex < q.options.length) {
                    correctLetter = String.fromCharCode(65 + answerIndex);
                    correctText = q.options[answerIndex];
                }
            }
        }

        // Also check global currentQuestions if available
        if ((!correctText || !correctLetter) && window.currentQuestions) {
            const qIdx = window.currentQuestionIndex || 0;
            const q = currentQuestions[qIdx];
            if (q && (q.answer !== undefined || q.answerIndex !== undefined) && ctx.options) {
                const answerIndex = q.answer !== undefined ? q.answer : q.answerIndex;
                if (answerIndex >= 0 && answerIndex < ctx.options.length) {
                    correctLetter = String.fromCharCode(65 + answerIndex);
                    correctText = ctx.options[answerIndex].replace(/^[A-D]\.\s*/, '');
                }
            }
        }

        // Finally, use the stored question object from the quiz help context if needed
        if ((!correctText || !correctLetter) && ctx.questionObj) {
            const q = ctx.questionObj;
            if (q && (q.answer !== undefined || q.answerIndex !== undefined) && Array.isArray(q.options)) {
                const answerIndex = q.answer !== undefined ? q.answer : q.answerIndex;
                if (answerIndex >= 0 && answerIndex < q.options.length) {
                    correctLetter = String.fromCharCode(65 + answerIndex);
                    correctText = q.options[answerIndex];
                }
            }
        }

        // If we still don't have the answer, search loaded app/Firestore quiz data
        if ((!correctText || !correctLetter) && ctx.questionText) {
            const found = this._findQuestionInQuizData(ctx.questionText, ctx.options || []);
            if (found && (found.answer !== undefined || found.answerIndex !== undefined) && Array.isArray(found.options)) {
                const answerIndex = found.answer !== undefined ? found.answer : found.answerIndex;
                if (answerIndex >= 0 && answerIndex < found.options.length) {
                    correctLetter = String.fromCharCode(65 + answerIndex);
                    correctText = found.options[answerIndex];
                }
            }
        }

        if (correctText && correctLetter) {
            this.addBotMessage(
                `✅ **Correct Answer: ${correctLetter}**\n\n**${correctText}**\n\n${this._generateApproach(ctx.questionText)}\n\n💡 Review this concept so you remember it next time!`,
                ['↩ Back to quiz']
            );
        } else {
            // Fallback — can't determine correct answer
            this.addBotMessage(
                `I'm not able to peek at the answer during this mode, but here's how to solve it:\n\n${this._generateApproach(ctx.questionText)}\n\nTry to apply this step-by-step — you've got this! 💪`,
                ['↩ Back to quiz']
            );
        }
        this._quizHelpMode = false;
    },

    handleBotResponse(key) {
        if (!key) return;

        // Clean emoji prefix from button text
        const cleanKey = key.replace(/^[\u{1F300}-\u{1FFFF}\u{2600}-\u{27FF}\u{FE00}-\u{FEFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}↩📊💪📈📜🎯🏦🛍️🔍🏆📅❓🏅💰🔥🎖️📋⏱️🃏🎲❌⚠️✏️🔑🗑️🛒🎨🏷️]+\s*/u, '').trim();

        const lowerKey = key.toLowerCase();
        const lowerClean = cleanKey.toLowerCase();

        // Performance aliases
        if (lowerClean === 'performance summary' || lowerClean === 'full summary' || lowerKey.includes('performance summary') || lowerKey.includes('full summary')) { this.showPerformanceSummary(); return; }
        if (lowerClean === 'my strengths' || lowerKey.includes('my strengths')) { this.showStrengths(); return; }
        if (lowerClean === 'my weaknesses' || lowerKey.includes('my weaknesses')) { this.showWeaknesses(); return; }
        if (lowerClean === 'recent history' || lowerKey.includes('recent history')) { this.showRecentQuizHistory(); return; }
        if (lowerClean === 'another question' || lowerClean === 'random question' || lowerKey.includes('another question') || lowerKey.includes('random question')) { this.presentRandomQuestion(); return; }
        if (lowerClean === 'my streak info' || lowerKey.includes('streak info') || lowerKey.includes('about my streak')) { this.showStreakInfo(); return; }
        if (lowerKey.includes('coins & rewards') || lowerKey.includes('coins and rewards')) { this.showCoinBalance(); return; }

        let response = this.CONVERSATION_TREE[key] || this.CONVERSATION_TREE[cleanKey];

        // Try partial key matching for robustness
        if (!response) {
            const allKeys = Object.keys(this.CONVERSATION_TREE);
            response = this.CONVERSATION_TREE[allKeys.find(k => k.toLowerCase() === lowerClean || lowerClean.includes(k.toLowerCase()) || k.toLowerCase().includes(lowerClean))] || null;
        }

        if (!response) {
            this.addBotMessage(
                `I'm not sure about that specific topic. 🤔 Let me show you what I can help with!`,
                this.CONVERSATION_TREE['Back to main menu'].options
            );
            this._currentState = 'start';
            return;
        }

        if (response.action) {
            this._currentState = response.action;
            this.addBotMessage(response.message);
            if (this._input) this._input.focus();
            return;
        }

        if (response.mailto) {
            this.addBotMessage(response.message);
            setTimeout(() => {
                const mailtoBtn = document.createElement('a');
                mailtoBtn.href = `mailto:${response.mailto}?subject=Quizify Support Request`;
                mailtoBtn.textContent = `📧 Email Support: ${response.mailto}`;
                mailtoBtn.className = 'btn btn--primary bot-mailto-btn';
                mailtoBtn.target = '_blank';
                this._chatContainer.appendChild(mailtoBtn);
                this._chatContainer.scrollTop = this._chatContainer.scrollHeight;
            }, 100);
        } else {
            this.addBotMessage(response.message, response.options);
        }
        this._currentState = 'start';
    },

    // ══════════════════════════════════════════
    //  SEARCH
    // ══════════════════════════════════════════
    performSearch(query) {
        if (!this._app || typeof this._app.performGlobalSearch !== 'function') {
            this.addBotMessage("Search is not available right now. Please try navigating manually from the Home page.", ['↩ Back to main menu']);
            this._currentState = 'start';
            return;
        }
        const results = this._app.performGlobalSearch(query);
        this._currentState = 'start';

        if (!results || results.length === 0) {
            this.addBotMessage(`No results found for **"${query}"**. 🔍\n\nTry:\n• A different spelling\n• A broader term (e.g., "algebra" instead of "linear algebra")\n• The subject name directly (e.g., "english" or "physics")`, this.CONVERSATION_TREE['start'].options);
            return;
        }

        let html = `<p>Found <strong>${results.length}</strong> result${results.length !== 1 ? 's' : ''} for <strong>"${query}"</strong>:</p><ul>`;
        results.slice(0, 8).forEach(result => {
            const context = result.type === 'academic'
                ? `Class ${result.class} — ${this._getSubjectTitle(result.subject)}`
                : this._getSubjectTitle(result.subject);
            // Safely encode result data
            const resultJson = JSON.stringify(result).replace(/'/g, '&#39;');
            html += `<li><button class="bot-search-result-btn" data-result='${resultJson}'>
                <strong>${result.chapterName}</strong><span>${context}</span>
            </button></li>`;
        });
        html += `</ul>${results.length > 8 ? `<p style="opacity:0.6;font-size:0.8rem;">Showing top 8 of ${results.length} results. Try a more specific search for better results.</p>` : ''}`;
        this.addBotMessage(html, this.CONVERSATION_TREE['start'].options);
    },

    navigateToSearchResult(result) {
        if (!this._app) return;
        const app = this._app;
        app.currentChapter = result.chapterName;
        app.currentSubject = result.subject;
        app.classMode = result.type === 'academic';
        app.currentClass = result.class || '';
        app.currentStream = result.stream || '';
        this.closeHelpBot();
        if (typeof app.displayChapterInfo === 'function') app.displayChapterInfo();
        if (typeof app.showPage === 'function') app.showPage('chapter-page');
        if (typeof app.showNotification === 'function') app.showNotification(`Navigating to ${result.chapterName}...`, 'info');
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
            this.addBotMessage("I don't have questions for that topic yet. Try asking for English, Quantitative, Reasoning, Physics, Chemistry, or Biology questions!", ['↩ Back to main menu']);
            return;
        }

        const q = pool[Math.floor(Math.random() * pool.length)];
        this._currentQuestion = q;

        const messageDiv = this.addMessage(`<strong>🎯 ${q.question}</strong>`, 'bot-message', true);
        if (!messageDiv) return;

        setTimeout(() => {
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'bot-options-container';
            optionsContainer.style.flexDirection = 'column';
            optionsContainer.style.marginTop = '12px';
            q.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'bot-question-option';
                btn.innerHTML = `<span class="bot-question-option-letter">${String.fromCharCode(65 + i)}.</span> ${opt}`;
                btn.dataset.index = i;
                optionsContainer.appendChild(btn);
            });
            const content = messageDiv.querySelector('.chat-message-content');
            if (content) content.appendChild(optionsContainer);
            this._chatContainer.scrollTop = this._chatContainer.scrollHeight;
        }, 100);
    },

    evaluateAnswer(choiceIndex) {
        const q = this._currentQuestion;
        if (!q) {
            this.addBotMessage("No active question! Ask me to give you a random question — just say **'quiz me'**! 🎯");
            return;
        }

        const correct = choiceIndex === q.answerIndex;
        if (correct) {
            this.addBotMessage(`✅ **Correct! Well done!** 🎉\n\n${q.explanation || ''}`);
            try {
                if (this._app && typeof this._app.awardCoins === 'function') {
                    this._app.awardCoins(5);
                    setTimeout(() => this.addBotMessage('You earned **5 Quiz Coins** for that correct answer! 💰'), 800);
                }
            } catch (e) {}
        } else {
            const correctText = q.options[q.answerIndex];
            this.addBotMessage(`❌ **Not quite this time!** The correct answer is: **${correctText}**.\n\n${q.explanation || ''}\n\n*Don't worry — mistakes are how we learn! 📚*`);
        }

        this._currentQuestion = null;
        setTimeout(() => this.addBotMessage('Want to try another question? 🎲', ['🎲 Another question', '📊 Performance Summary', '↩ Back to main menu']), 600);
    },

    // ══════════════════════════════════════════
    //  MESSAGE RENDERING WITH ANIMATIONS
    // ══════════════════════════════════════════
    addMessage(text, sender, hasAvatar = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = sender === 'user-message' ? 'translateX(20px)' : 'translateX(-20px)';

        let avatarHtml = '';
        if (hasAvatar) {
            // Use sparkle AI avatar for the new design
            avatarHtml = `<div class="chat-message-avatar bot-avatar ai-avatar-icon">\u2726</div>`;
        }

        const formattedText = this._formatText(text);
        messageDiv.innerHTML = `${avatarHtml}<div class="chat-message-content">${formattedText}</div>`;
        this._chatContainer.appendChild(messageDiv);

        // Animate in
        requestAnimationFrame(() => {
            messageDiv.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateX(0)';
        });

        this._chatContainer.scrollTop = this._chatContainer.scrollHeight;
        return messageDiv;
    },

    _formatText(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    },

    addUserMessage(text) {
        this.addMessage(this._escapeHtml(text), 'user-message');
    },

    _escapeHtml(text) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(text));
        return div.innerHTML;
    },

    addBotMessage(text, options = []) {
        // Show typing indicator before bot responds
        const typingEl = this._showTypingIndicator();
        const delay = Math.min(400 + Math.ceil((text || '').replace(/<[^>]*>/g, '').length / 8) * 10, 1800);

        setTimeout(() => {
            // Hide/remove typing indicator
            if (typingEl === this._typingIndicator) {
                this._typingIndicator.style.display = 'none';
            } else if (typingEl && typingEl.parentNode) {
                typingEl.parentNode.removeChild(typingEl);
            }
            if (this._botModal) {
                this._botModal.classList.remove('typing-active');
                this._botModal.classList.add('response-glow');
                setTimeout(() => this._botModal?.classList.remove('response-glow'), 600);
            }

            const messageDiv = this.addMessage(text, 'bot-message', true);
            if (!messageDiv) return;

            if (options && options.length > 0) {
                const optionsContainer = document.createElement('div');
                optionsContainer.className = 'bot-options-container';
                options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.className = 'bot-option-btn';
                    btn.textContent = opt;
                    optionsContainer.appendChild(btn);
                });
                const content = messageDiv.querySelector('.chat-message-content');
                if (content) {
                    content.appendChild(optionsContainer);
                }
            }

            this._chatContainer.scrollTop = this._chatContainer.scrollHeight;
            this._isTyping = false;
        }, delay);

        this._isTyping = true;
    },

    _showTypingIndicator() {
        // Use the shared typing indicator element if available
        if (this._typingIndicator) {
            this._typingIndicator.style.display = 'flex';
            if (this._botModal) this._botModal.classList.add('typing-active');
            this._chatContainer.scrollTop = this._chatContainer.scrollHeight;
            return this._typingIndicator;
        }
        // Fallback: create inline typing bubble
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message bot-typing-msg';
        typingDiv.style.opacity = '0';
        typingDiv.innerHTML = `
            <div class="chat-message-avatar bot-avatar ai-avatar-icon">\u2726</div>
            <div class="chat-message-content bot-typing-bubble">
                <div class="ai-typing-dots"><span></span><span></span><span></span></div>
            </div>`;
        this._chatContainer.appendChild(typingDiv);
        requestAnimationFrame(() => {
            typingDiv.style.transition = 'opacity 0.2s ease';
            typingDiv.style.opacity = '1';
        });
        this._chatContainer.scrollTop = this._chatContainer.scrollHeight;
        return typingDiv;
    },

    // ═══════════════════════════════════════
    //  CHIP PROMPT HANDLER
    // ═══════════════════════════════════════
    _handleChipPrompt(prompt) {
        const lower = prompt.toLowerCase();
        if (lower.includes('performance') || lower.includes('stats')) {
            this.showPerformanceSummary();
        } else if (lower.includes('random') || lower.includes('quiz')) {
            this.presentRandomQuestion();
        } else if (lower.includes('study tip') || lower.includes('tip')) {
            const tip = this.generateHomeTip();
            this.addBotMessage(`\uD83D\uDCA1 **Today's Study Tip:**\n\n${tip}`, ['\uD83C\uDFAF Quiz Me', '\uD83D\uDCCA My Stats', '\u21A9 Back to main menu']);
        } else if (lower.includes('streak')) {
            this.showStreakInfo();
        } else if (lower.includes('coin')) {
            this.showCoinBalance();
        } else if (lower.includes('achievement')) {
            this.handleBotResponse('Achievements & Rewards');
        } else {
            this.handleUserInput();
        }
    },

    // ═══════════════════════════════════════
    //  INLINE AI CARDS
    // ═══════════════════════════════════════
    generateHomeTip() {
        const tips = [
            'Practice Quantitative Aptitude daily — even 10 minutes keeps your number-sense sharp! \uD83D\uDD22',
            'Review your wrong answers immediately after a quiz. Your mistakes are your best teachers. \uD83D\uDCDA',
            'Consistency beats intensity. A 20-minute quiz every day outperforms a 3-hour session once a week. \u23F0',
            'Tackle your weakest subject first each session, when your brain is freshest. \uD83E\uDDE0',
            'Use the Hint lifeline wisely — it helps you learn, not just guess. \uD83D\uDCA1',
            'Reading comprehension improves by reading one quality article per day. \uD83D\uDCF0',
            'For Reasoning questions, draw diagrams or tables to visualize problems. \u270F\uFE0F',
            'Attempt the Daily Challenge every day — it covers all subjects and keeps you balanced. \uD83D\uDD25',
            'Speed comes from accuracy. Master concepts first, then build speed. \u26A1',
            'Review the Leaderboard for motivation — seeing your rank improves commitment. \uD83C\uDFC6'
        ];
        // Rotate based on day
        const dayIdx = new Date().getDay();
        return tips[dayIdx % tips.length];
    },

    generateResultFeedback(scorePercent, subject) {
        const subjectTitle = this._getSubjectTitle(subject) || 'this topic';
        if (scorePercent >= 80) {
            return `Excellent performance on **${subjectTitle}** (${scorePercent}%)! \uD83C\uDF1F You're well above the 40% pass threshold. Keep this momentum — try the next chapter!`;
        } else if (scorePercent >= 60) {
            return `Good effort on **${subjectTitle}** (${scorePercent}%)! \uD83D\uDC4D You passed comfortably. Revisiting any wrong answers will push you toward mastery.`;
        } else if (scorePercent >= 40) {
            return `You passed **${subjectTitle}** with ${scorePercent}%. \u2705 That's a solid start! Review incorrect answers and attempt the set again for a higher score.`;
        } else {
            return `Don't be discouraged by ${scorePercent}% on **${subjectTitle}** — every attempt builds knowledge. \uD83D\uDCDA Try reviewing the concepts, then retake the quiz. You'll improve!`;
        }
    },

    generateProfileInsight() {
        const up = window.userProgress || {};
        const history = up.quizHistory || [];
        const streak = up.currentStreak || 0;
        const coins = up.quizCoins || 0;

        if (history.length === 0) {
            return 'Start your first quiz to unlock AI-powered performance insights! Your learning journey begins now. \uD83D\uDE80';
        }

        const recent = history.slice(-5);
        const avgScore = recent.reduce((s, q) => s + (q.score || 0), 0) / recent.length;

        if (avgScore >= 75) {
            return `Your recent average is **${Math.round(avgScore)}%** — outstanding! \uD83C\uDF1F With ${streak} day${streak !== 1 ? 's' : ''} of consistency and ${coins} coins earned, you're on a strong trajectory. Keep challenging yourself with harder chapters!`;
        } else if (avgScore >= 50) {
            return `Your recent average is **${Math.round(avgScore)}%** — solid progress! \uD83D\uDCC8 Focus on reviewing wrong answers to push past 75%. Your ${streak}-day streak shows real commitment!`;
        } else {
            return `Your recent average is **${Math.round(avgScore)}%**. \uD83D\uDCDA Don't worry — building a strong foundation takes time. Try shorter practice sessions daily and use hints to understand concepts. You have ${coins} coins — great for purchasing study lifelines!`;
        }
    },

    refreshInlineCards() {
        // Home tip card
        const tipEl = document.getElementById('ai-home-tip-text');
        if (tipEl) tipEl.textContent = this.generateHomeTip();

        // Profile insight card
        const profileEl = document.getElementById('ai-profile-insight-text');
        if (profileEl) profileEl.textContent = this.generateProfileInsight();
    },

    // ── Support mailto builder ──
    createSupportMailto() {
        const recipient = this.CONVERSATION_TREE['Contact Support'].mailto;
        let _authUser = null;
        try { _authUser = firebase.auth().currentUser; } catch(e) {}
        const userName = _authUser?.displayName || _authUser?.email?.split('@')[0] || 'N/A';
        const appVersion = this._app?.APP_VERSION || 'N/A';
        const subject = `Quizify Support Request from ${userName}`;
        let conversationHistory = "Bot Conversation History:\n";
        if (this._chatContainer) {
            this._chatContainer.querySelectorAll('.chat-message').forEach(msg => {
                const sender = msg.classList.contains('bot-message') ? 'Bot' : 'User';
                const content = msg.querySelector('.chat-message-content');
                if (content) {
                    const text = content.textContent.trim().replace(/\s+/g, ' ');
                    conversationHistory += `[${sender}]: ${text}\n`;
                }
            });
        }
        const body = `Hello Quizify Support,\n\nPlease describe your issue below:\n-------------------------------------\n\n\n\n-------------------------------------\n\nUser Name: ${userName}\nApp Version: ${appVersion}\n\n${conversationHistory}`;
        return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    },

    // ══════════════════════════════════════════════════════
    //  QUIZ AI HELP — reads current question from DOM
    // ══════════════════════════════════════════════════════
    quizAIHelp() {
        // Read the active question from the DOM
        const questionEl = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const yearBadge = document.getElementById('question-year-badge');

        const questionText = questionEl ? questionEl.textContent.trim() : null;
        const yearText = yearBadge && yearBadge.textContent ? yearBadge.textContent.trim() : null;

        // Collect all visible options
        const optionEls = optionsContainer ? optionsContainer.querySelectorAll('button, .option-btn, [data-option]') : [];
        const options = [];
        optionEls.forEach((el, i) => {
            const letter = String.fromCharCode(65 + i);
            options.push(`${letter}. ${el.textContent.trim()}`);
        });

        if (!questionText || questionText === 'Question will appear here') {
            // No active question — open normally
            this.openHelpBot();
            return;
        }

        // Store question context for follow-up
        const appCtx = this._app?.getActiveQuizContext?.() || {};
        const questionObj = appCtx.currentQuestion || null;
        this._quizContext = { questionText, options, yearText, questionObj };
        this._currentState = 'quiz_help';

        // Open AI panel
        if (!this._isOpen) {
            // Manually open without greeting (quiz mode)
            if (!this._botModal) return;
            this._isOpen = true;
            this._botModal.classList.add('open');
            if (this._overlay) this._overlay.classList.add('visible');
            document.body.style.overflow = 'hidden';
            if (this._chatContainer) this._chatContainer.innerHTML = '';
            if (this._typingIndicator) this._typingIndicator.style.display = 'none';
            const chipsRow = document.getElementById('ai-chips-row');
            if (chipsRow) chipsRow.style.display = 'none';
        }

        // Build the quiz help message
        let yearInfo = yearText ? ` (${yearText})` : '';
        const optionList = options.length > 0 ? '\n\n**Options:**\n' + options.join('\n') : '';

        const helpMsg = `📋 **Quiz Help${yearInfo}**\n\n> ${questionText}${optionList}\n\n💡 **How to approach this:**\n${this._generateApproach(questionText)}\n\nWant me to explain the concept, or reveal the correct answer?`;

        setTimeout(() => {
            this.addBotMessage(helpMsg, [
                '📖 Explain the Concept',
                '✅ Show Correct Answer',
                '🔍 Give Me a Hint',
                '↩ Back to quiz'
            ]);
        }, 200);

        // Handle follow-up buttons from quiz help mode
        this._quizHelpMode = true;
    },

    _generateApproach(questionText) {
        const lower = questionText.toLowerCase();

        if (/percentage|%|profit|loss|discount/.test(lower)) {
            return '• This is a **Quantitative** problem — look for keywords like "cost price", "selling price", or percentage values.\n• Formula: Profit% = (Profit / CP) × 100\n• Read all numbers carefully before calculating.';
        }
        if (/synonym|antonym|fill|blank|grammar|tense|pronoun|noun|verb|adjective/.test(lower)) {
            return '• This is an **English** question — eliminate obviously wrong options first.\n• For synonyms/antonyms, think about the root word meaning.\n• Trust your first instinct for grammar rules.';
        }
        if (/series|sequence|pattern|odd|next|missing|analogy/.test(lower)) {
            return '• This is a **Reasoning** question — look for the pattern first.\n• Number series: check differences, ratios, or alternating patterns.\n• Letter series: check alphabetical positions (A=1, B=2...).';
        }
        if (/speed|distance|time|train|km|hour/.test(lower)) {
            return '• **Speed-Distance-Time** problem.\n• Core formula: Speed = Distance / Time\n• Relative speed: objects in same direction → subtract; opposite → add.';
        }
        if (/cell|nucleus|membrane|dna|organism|photosynthesis|respiration/.test(lower)) {
            return '• This is a **Biology** question.\n• Think about the function described — match it to the correct cell organelle or biological process.\n• Process of elimination is very effective here.';
        }
        if (/atom|electron|proton|neutron|element|compound|reaction|acid|base/.test(lower)) {
            return '• This is a **Chemistry** question.\n• Focus on the key scientific term in the question.\n• Eliminate options that are factually impossible first.';
        }
        if (/force|motion|energy|wave|light|sound|current|voltage|resistance/.test(lower)) {
            return '• This is a **Physics** question.\n• Identify the physical quantity being asked about.\n• Apply the relevant formula (F=ma, V=IR, etc.).';
        }
        // Default
        return '• Read the question carefully — underline key terms.\n• Eliminate clearly wrong options first (reduces to 50/50).\n• Use process of elimination for tricky questions.\n• Trust your knowledge — your first instinct is often right!';
    },

    generateHomeTip() {
        const tips = [
            'Practice **Quantitative Aptitude** daily — even 10 minutes keeps your number-sense sharp! 🔢',
            'Review **wrong answers** immediately after a quiz — that is when the lesson sticks the most. 📌',
            'Use the **50/50 lifeline** strategically — save it for questions where you are between two options.',
            '**English vocabulary** grows fastest when you read actively. Try to learn 5 new words daily. 📖',
            'Consistent short sessions (20 min/day) **outperform** long cramming sessions every time. ⏱️',
            '**Reasoning questions** reward practice. The more patterns you see, the faster you recognize them. 🧠',
            'Your streak shows commitment! Even one quiz per day **compounds into massive improvement**. 🔥',
            'For **speed & accuracy**, practice mental math daily — approximation is your best friend! ⚡',
            'Bookmark tough questions and revisit them weekly. **Spaced repetition** is science-backed. 📚',
            'Sleep is essential for memory consolidation. Study before bed, sleep well, **retain more**. 🌙',
        ];
        const up = window.userProgress || {};
        const subject = up.lastSubject;
        if (subject) {
            const subjectTips = {
                quantitative: 'Practice **Quantitative Aptitude** daily — even 10 minutes keeps your number-sense sharp! 🔢',
                english: 'Focus on **English Grammar rules** — they repeat across all competitive exams! 📖',
                reasoning: 'Solve at least 5 **Reasoning puzzles** daily to sharpen your pattern recognition. 🧠',
            };
            if (subjectTips[subject]) return subjectTips[subject];
        }
        return tips[Math.floor(Date.now() / 86400000) % tips.length];
    }
};