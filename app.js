


// app.js - Complete Quiz Platform with Class and Competitive Exam functionality
// Only business logic - questions stored in separate data files
// ===================== APP CHANGELOG =====================
const COMMUNITY_POSTS = {
    '1.7.2-Beta.': {
        date: 'Oct 21, 2025',
        type: 'update',
        changes: [
            'General bug fixes and performance improvements.',
            'Enhanced UI responsiveness on smaller devices.',
            'Optimized data loading for a faster startup experience.'
        ],
        note: "We're continuously working to improve Quizify for you. Stay tuned for more updates!"
    },
    '1.7.1-Beta.': {
        date: 'Oct 20, 2025',
        type: 'content', // NEW
        changes: [
            '<strong>Major Content Overhaul!</strong> The English question bank has been fully reviewed and expanded.',
            'Performed a deep-dive review of all existing English questions for 100% accuracy.',
            'Completed all empty question sets in the English section, including Adverb, Preposition, Conjunction, and more.',
            'Fixed various grammatical errors and incorrect answers across all English chapters.'
        ],
        note: "Your learning experience is our top priority. The English section is now more robust and reliable than ever!"
    },
    '1.7.0-Beta.': {
        date: 'Oct 19, 2025',
        type: 'security', // NEW
        changes: [
            '<strong>Critical Security Update!</strong> Your data is now more secure.',
            'Implemented robust server-side security rules for Firestore to protect user scores and quiz history.',
            'Integrated Firebase Anonymous Authentication for secure and unique user tracking on the leaderboard.',
            'These changes prevent unauthorized access and ensure the integrity of your quiz progress.'
        ],
        note: "This backend security update is crucial for protecting your data. More features coming soon!"
    },
    '1.6.2-Beta.': {
        date: 'Sep 28, 2025',
        type: 'feature', // NEW
        changes: [
            '<strong>Major Feature: Online Leaderboard!</strong> Your quiz scores are now saved online.',
            'Added a dynamic Leaderboard to show the top 10 high scores across all quizzes.',
            'The leaderboard now shows each user\'s single best score, making it fair and competitive.',
            'Added a "Your Rank" feature to show your personal rank even if you are not in the top 10.',
            'Fixed several navigation and display bugs for a smoother experience.'
        ],
        note: "This is a major update introducing online scoring. Your feedback is valuable!"
    },
    '1.6.0-Beta.': {
        date: 'Sep 27, 2025',
        type: 'update', // NEW
        changes: [
            'Added class-specific Daily Challenges for academic students (Classes 9-12).',
            'Fixed a bug where the back button would not work after clicking on an empty Daily Challenge.',
            'Added a Community page to view detailed updates.'
        ],
        note: "This is a beta version. Features and functionality may change in the final release."
    },
    '1.5.13-Beta.': {
        date: 'Sep 26, 2025',
        type: 'ui', // NEW
        changes: [
            'Added an info button to update notifications to show what\'s new.',
            'Replaced all disruptive browser alerts with a new, professional toast notification system.',
            'Moved the bookmark button next to the question for easier access.'
        ]
    }
};
// ===================== APP CONFIGURATION =====================
const APP_VERSION = '1.7.2-Beta.'; // Increment this to show an update notification

// NEW: Configuration for the informational/festive popup
const INFO_POPUP_CONFIG = {
    id: 'diwali_wish_2025', // Change this ID for a new message to make it reappear for users.
    // NEW: Set a date range for the popup to appear. Format: YYYY-MM-DD.
    // Set both to null or remove them to disable the popup. It will only show once per session per ID.
    startDate: '2024-01-01', // A past date to ensure it's active for testing.
    endDate: '2025-10-25',   // Example: End date for Diwali week
    icon: '🪔',
    title: 'Happy Diwali!',
    message: 'Wishing you a festival of lights filled with joy, prosperity, and success. May you and your family have a sparkling celebration!',
    subtext: 'Keep learning and shining bright!'
};

// NEW: Achievements Configuration
const ACHIEVEMENTS = {
    first_quiz: { name: 'First Step', description: 'Complete your first quiz.', icon: '🎓' },
    passed_quiz: { name: 'Achiever', description: 'Pass your first quiz with 40% or more.', icon: '✅' },
    perfect_score: { name: 'Perfectionist', description: 'Get a 100% score on any quiz.', icon: '🎯' },
    chapter_master: { name: 'Chapter Master', description: 'Pass all 5 sets in any chapter.', icon: '📚' },
    subject_expert: { name: 'Subject Expert', description: 'Pass all sets in a whole subject.', icon: '🧠' },
    streak_5: { name: 'On a Roll!', description: 'Maintain a 5-day streak.', icon: '🔥' },
    streak_10: { name: 'Unstoppable', description: 'Maintain a 10-day streak.', icon: '🚀' },
    speed_demon: { name: 'Speed Demon', description: 'Pass a quiz with an average of <30s per question.', icon: '⚡' },
    comeback_kid: { name: 'Comeback Kid', description: 'Pass a quiz set you previously failed.', icon: '💪' },
    dedicated_learner: { name: 'Dedicated Learner', description: 'Complete 10 quizzes.', icon: '📖' },
    quiz_master: { name: 'Quiz Master', description: 'Complete 50 quizzes.', icon: '👑' }
};


// ===================== GLOBAL STATE VARIABLES =====================
let currentSubject = '';
let currentChapter = '';
let currentSet = 0;
let currentQuestionIndex = 0;
let userAnswers = [];
let timer = null;
let totalTime = 0;
let timeRemaining = 1200; // 20 minutes for 20 questions
let quizData = null;
let bookmarkedQuestions = []; // Will be loaded from userProgress or Firestore
let userProgress = {}; // This will be the single source of truth for all user data.
let unlockedAchievements = new Set(); // To track newly unlocked achievements in a session

// NEW: Class-related state variables
let currentClass = '';
let currentStream = '';
let academicDailyChallenge = false; // To distinguish academic vs competitive daily challenge
let practiceMode = false; // To handle practice mode logic
let pendingSetIndex = -1; // To hold the set index while the mode modal is open
let classMode = false; // true if user is in class (academic) mode

let dailyCoinReminderInterval = null; // NEW: For the daily coin reminder

// NEW: Daily Challenge state
let dailyChallengeMode = false;
let quizTimerSetting = 60; // NEW: Default time per question in seconds


// ===================== DATA MAPPING =====================
// Competitive exam data mapping (loaded from external files)
const subjectData = {
    quantitative: window.quantitativeData || null,
    english: window.englishData || null,
    reasoning: window.reasoningData || null
};

// Academic class data (loaded from classes folder)
const classData = window.classesData || null;

// ===================== FIREBASE SETUP =====================
 // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAy-7QGZ05wNf0fLG1-AY2FxJy_fdILdoM",
    authDomain: "quizifyapp-4c5ca.firebaseapp.com",
    projectId: "quizifyapp-4c5ca",
    storageBucket: "quizifyapp-4c5ca.firebasestorage.app",
    messagingSenderId: "948606346917",
    appId: "1:948606346917:web:6fdfa4e16adefb5f710f4c"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const resultsCollection = db.collection("quizResults");
const leaderboardCollection = db.collection("leaderboard"); // NEW: Collection for best scores
const userProgressCollection = db.collection("userProgress"); // NEW: Collection for user progress


// ===================== INITIALIZATION =====================
document.addEventListener('DOMContentLoaded', function() {
    // NEW: Make the initialization asynchronous to handle data loading properly
    async function main() {
        await checkUserProfile(); // This now waits for user data to load
        checkForUpdates();
        initializeSideMenu();
        initializeUpdateDetailsModal();
        initializeHomepageSearch();
        initializeFeatureComingSoonModal();
        initializeLockedContentModal();
        initializeSettingsPage();
        initializeQuizModeModal();
        initializeLeaderboard();
        initializeProfilePage();
        initializeAchievements(); // NEW
        initializeSettingsTabs(); // NEW
        initializeProfileTabs(); // NEW
        initializeSparkles();
        initializePurchaseSuccessModal(); // NEW
        initializeEventListeners();
        initializeDailyCoinModal(); // NEW
        initializeStoreUpdatesModal(); // NEW: Add event listeners for the store updates modal
        // NEW: Initialize the store module
        QuizifyStore.init({
            // Pass the necessary state and functions to the store
            get quizCoins() { return userProgress.quizCoins || 0; }, // Read directly from userProgress
            get userProgress() { return userProgress; }, // Pass the whole object
            // NEW: Pass purchased items for store logic
            get purchasedItems() { return userProgress.purchasedItems || { themes: [], avatars: [] }; },
            set purchasedItems(value) { userProgress.purchasedItems = value; },

            saveUserProgress,
            updateCoinDisplay,
            updateLifelineDisplay,
            showNotification,
            showPage,
            showPurchaseSuccessModal // NEW
        });
        initializeLogoutConfirmation();
        initializeInfoPopup();
        checkAndShowPinReminder();
    }
    main();
});

function initializeApp() {
    showPage('home-page');
    classMode = false;
    currentClass = '';
    currentStream = '';
    dailyChallengeMode = false;
}

/**
 * Centralizes all event listeners for the application, separating behavior from HTML.
 */
function initializeEventListeners() {
    // --- Modals ---
    document.querySelector('#onboarding-modal .onboarding-choices button:nth-child(1)').addEventListener('click', () => saveUserPreferences('competitive'));
    document.querySelector('#onboarding-modal .onboarding-choices button:nth-child(2)').addEventListener('click', () => saveUserPreferences('academic'));

    // --- Side Menu ---
    document.getElementById('logout-btn').addEventListener('click', logout);

    // --- Home Page ---
    // Note: Event listeners for dynamically created cards are handled via event delegation below.
    // Use event delegation for dynamically added cards if needed, but direct binding is fine here.
    document.querySelector('.daily-challenge-card').addEventListener('click', startDailyChallenge);

    // Competitive Section
    document.querySelector('[data-subject="quantitative"]').addEventListener('click', () => selectSubject('quantitative'));
    document.querySelector('[data-subject="english"]').addEventListener('click', () => selectSubject('english'));
    document.querySelector('[data-subject="reasoning"]').addEventListener('click', () => selectSubject('reasoning'));

    // Academic Section
    document.querySelector('[data-class="9"]').addEventListener('click', () => selectClass('9'));
    document.querySelector('[data-class="10"]').addEventListener('click', () => selectClass('10'));
    document.querySelector('[data-class="11"]').addEventListener('click', () => selectClass('11'));
    document.querySelector('[data-class="12"]').addEventListener('click', () => selectClass('12'));

    // --- Page-Level Back Buttons ---
    document.querySelector('#stream-page .back-btn').addEventListener('click', goToHome);
    document.querySelector('#class-page .back-btn').addEventListener('click', goBack);
    document.querySelector('#subject-page .back-btn').addEventListener('click', goBack);
    document.querySelector('#chapter-page .back-btn').addEventListener('click', goToSubject);
    document.querySelector('#store-page .back-btn').addEventListener('click', goToHome); // NEW
    document.querySelector('#results-page .action-buttons button:nth-child(3)').addEventListener('click', goToChapter);
    document.querySelector('#review-page .back-btn').addEventListener('click', goToResults);
    document.querySelector('#bookmarks-page .back-btn').addEventListener('click', goToHome);
    document.querySelector('#community-page .back-btn').addEventListener('click', goToHome);
    document.querySelector('#about-us-page .back-btn').addEventListener('click', goToHome); // NEW
    document.querySelector('#profile-page .back-btn').addEventListener('click', goToHome); // NEW
    document.querySelector('#leaderboard-page .back-btn').addEventListener('click', goToHome);
    document.querySelector('#achievements-page .back-btn').addEventListener('click', goToHome); // NEW
    document.querySelector('#settings-page .back-btn').addEventListener('click', goToHome);

    // --- Search ---
    document.getElementById('search-chapters').addEventListener('keyup', filterChapters);

    // --- Quiz Navigation ---
    document.getElementById('prev-btn').addEventListener('click', previousQuestion);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);

    // --- Results Page Actions ---
    document.querySelector('#results-page .action-buttons button:nth-child(1)').addEventListener('click', retakeQuiz);
    document.getElementById('review-answers-btn').addEventListener('click', reviewAnswers);

    // --- Retake Confirmation Modal ---
    document.getElementById('confirm-retake-btn').addEventListener('click', () => {
        // This now handles confirmation from both the results page and the chapter page.
        handleRetakeConfirmation();
    });
    document.getElementById('cancel-retake-btn').addEventListener('click', () => document.getElementById('retake-confirm-modal').classList.remove('visible'));

    // --- Dynamic Content Event Delegation ---
    // For elements that are created dynamically (like stream cards), we use event delegation.
    document.getElementById('streams-grid').addEventListener('click', (e) => {
        const streamCard = e.target.closest('.stream-card');
        if (streamCard && streamCard.dataset.stream) {
            selectStream(streamCard.dataset.stream);
        }
    });

    // --- Lifeline Buttons ---
    document.getElementById('lifeline-5050').addEventListener('click', useFiftyFifty);
    document.getElementById('lifeline-hint').addEventListener('click', useHint);
    document.getElementById('lifeline-skip').addEventListener('click', useSkip);


    document.getElementById('class-content').addEventListener('click', (e) => {
        const subjectCard = e.target.closest('.subject-card:not(.daily-challenge-card)');
        if (subjectCard && subjectCard.dataset.subject) {
            selectClassSubject(subjectCard.dataset.subject);
        }
    });
}

/**
 * NEW: Initializes event listeners for the store updates modal.
 * This was missing, causing the buttons to be unresponsive.
 */
function initializeStoreUpdatesModal() {
    const modal = document.getElementById('store-updates-modal');
    const closeBtn = document.getElementById('close-store-updates-btn');
    const laterBtn = document.getElementById('later-store-updates-btn');
    const goToStoreBtn = document.getElementById('go-to-store-updates-btn');

    if (!modal || !closeBtn || !laterBtn || !goToStoreBtn) {
        return; // Exit if elements are not found
    }

    const closeModal = () => {
        modal.classList.remove('visible');
    };

    // Close button and "Maybe Later" button should just close the modal
    closeBtn.addEventListener('click', closeModal);
    laterBtn.addEventListener('click', closeModal);

    // "Go to Store" button should close the modal and navigate to the store page
    goToStoreBtn.addEventListener('click', () => {
        closeModal();
        // The QuizifyStore object handles the logic for displaying the store page
        QuizifyStore.displayStorePage();
    });
}

/**
 * NEW: Initializes event listeners for the store updates modal.
 * This was missing, causing the buttons to be unresponsive.
 */
function initializeStoreUpdatesModal() {
    const modal = document.getElementById('store-updates-modal');
    const closeBtn = document.getElementById('close-store-updates-btn');
    const laterBtn = document.getElementById('later-store-updates-btn');
    const goToStoreBtn = document.getElementById('go-to-store-updates-btn');

    if (!modal || !closeBtn || !laterBtn || !goToStoreBtn) {
        return; // Exit if elements are not found
    }

    const closeModal = () => {
        modal.classList.remove('visible');
    };

    // Close button and "Maybe Later" button should just close the modal
    closeBtn.addEventListener('click', closeModal);
    laterBtn.addEventListener('click', closeModal);

    // "Go to Store" button should close the modal and navigate to the store page
    goToStoreBtn.addEventListener('click', () => {
        closeModal();
        // The QuizifyStore object handles the logic for displaying the store page
        QuizifyStore.displayStorePage();
    });
}

// ===================== NAVIGATION FUNCTIONS =====================
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function goToHome() {
    if (timer) {
        clearInterval(timer);
    }
    const userFocus = localStorage.getItem('userFocus');

    dailyChallengeMode = false;
    classMode = false;
    currentClass = '';
    currentStream = '';
    currentSubject = '';
    academicDailyChallenge = false;
    QuizifyStore.stopDealsCountdown(); // NEW: Stop the deals timer
    currentChapter = '';    
    updateCoinDisplay(); // NEW: Update coin display on home


    // Correctly show/hide sections based on user preference
    document.getElementById('competitive-section').style.display = userFocus === 'competitive' ? 'block' : 'none';
    document.getElementById('daily-challenge-section').style.display = userFocus === 'competitive' ? 'block' : 'none';
    document.getElementById('academic-section').style.display = userFocus === 'academic' ? 'block' : 'none';

    showPage('home-page');
    // Re-check status only if the user is in competitive mode
    if (userFocus === 'competitive') {
        checkDailyChallengeStatus();
    }
}

function goBack() {
    if (dailyChallengeMode) {
        // From a daily challenge quiz, always go back to the appropriate home screen
        if (academicDailyChallenge) {
            goToClass();
        } else {
            goToHome();
        }
    } else if (classMode) {
        if (currentClass === '11' || currentClass === '12') {
            if (currentStream && currentSubject) {
                currentSubject = '';
                currentChapter = '';
                displaySubjectsForClass();
            } else if (currentStream) {
                // We are on the subject list page, go back to the stream selection.
                currentStream = '';
                showPage('stream-page');
            } else {
                // We are on the stream selection page, go back to the main home page.
                goToHome(); // This correctly resets all state
            }
        } else {
            if (currentSubject) {
                // FIX: Reset subject and chapter when going back to the subject list
                currentSubject = '';
                currentChapter = '';
                goToClass(); // Call this AFTER resetting the state
            } else {
                goToHome();
            }
        }
    } else if (currentSubject) {
        // From competitive chapter list back to competitive subject list
        currentSubject = '';
        showPage('home-page');
    } else {
        // Default fallback to home
        showPage('home-page');
    }
}

function goToClass() {
    if (classMode && currentClass) {
        displaySubjectsForClass();
        showPage('class-page');
        // Re-check status when returning to class page
        checkAcademicDailyChallengeStatus();
    } else {
        showPage('home-page');
    }
}

function goToSubject() {
    // This function should always navigate back to the chapter list for the current subject
    if (classMode) {
        currentChapter = '';
        displayChaptersForClass();
    } else {
        currentChapter = '';
        displayChapters(currentSubject);
    }
    showPage('subject-page');
}

function goToChapter() {
    if (dailyChallengeMode) {
        // After a daily challenge, go back to the appropriate home/class screen
        if (academicDailyChallenge) {
            dailyChallengeMode = false;
            academicDailyChallenge = false;
            currentSubject = ''; // Reset subject after academic daily challenge
            goToClass();
        } else {
            dailyChallengeMode = false;
            goToHome();
        }
        return; // Stop further execution
    }
    displayChapterInfo(); // This will handle both class and competitive modes
    showPage('chapter-page');
}

function goToResults() {
    showPage('results-page');
}

function goToPracticeResults() {
    // In practice mode, "Finish" goes back to the chapter page.
    goToChapter();
}

function goToSettings() {
    document.getElementById('timer-duration-input').value = quizTimerSetting;
    showPage('settings-page');
}

function initializeQuizModeModal() {
    const modal = document.getElementById('quiz-mode-modal');
    const timedBtn = document.getElementById('start-timed-quiz-btn');
    const practiceBtn = document.getElementById('start-practice-quiz-btn');
    const closeBtn = document.getElementById('close-quiz-mode-btn'); // NEW

    const closeModal = () => {
        modal.classList.remove('visible');
    };

    timedBtn.onclick = () => {
        closeModal();
        startQuiz(pendingSetIndex);
    };
    practiceBtn.onclick = () => {
        closeModal();
        startPracticeMode(pendingSetIndex);
    };
    closeBtn.onclick = closeModal; // NEW

    // NEW: Close modal when clicking on the overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}
/**
 * Checks if a chapter object contains any questions.
 * @param {object} chapter The chapter object from the data file.
 * @returns {boolean} True if the chapter has at least one question, false otherwise.
 */
function chapterHasQuestions(chapter) {
    if (!chapter || !chapter.sets || !Array.isArray(chapter.sets)) return false;
    return chapter.sets.some(set => Array.isArray(set) && set.length > 0);
}

// ===================== COMPETITIVE EXAM FUNCTIONS (ORIGINAL) =====================
function selectSubject(subject) {
    dailyChallengeMode = false;
    classMode = false;
    currentSubject = subject;
    currentClass = '';
    currentStream = '';
    const subjectTitle = getSubjectTitle(subject);
    document.getElementById('search-chapters').value = ''; // Clear search bar
    document.getElementById('subject-title').textContent = subjectTitle;
    displayChapters(subject);
    showPage('subject-page');
}

function getSubjectTitle(subject) {
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
}

function displayChapters(subject) {
    const chaptersGrid = document.getElementById('chapters-grid');
    chaptersGrid.innerHTML = '';
    
    const data = subjectData[subject];
    if (!data || !data.chapters) {
        chaptersGrid.innerHTML = '<p>No chapters available. Please check back later.</p>';
        return;
    }
    
    data.chapters.forEach((chapter, index) => {
        const hasQuestions = chapterHasQuestions(chapter);
        const chapterCard = document.createElement('div');
        chapterCard.className = `chapter-card ${!hasQuestions ? 'locked' : ''}`;
        chapterCard.innerHTML = `
            <h3>${chapter.name}</h3>
            <p>${chapter.description || 'Practice questions on ' + chapter.name}</p>
            ${!hasQuestions ? '<div class="set-status">Coming Soon</div>' : ''}
        `;

        if (hasQuestions) {
            chapterCard.onclick = function() {
                currentChapter = chapter.name;
                displayChapterInfo();
                showPage('chapter-page');
            };
        } else {
            chapterCard.onclick = showLockedContentMessage;
        }
        chaptersGrid.appendChild(chapterCard);
    });
}

// ===================== NEW: CLASS-BASED FUNCTIONS =====================
function selectClass(cls) {
    dailyChallengeMode = false;
    classMode = true;
    currentClass = cls;
    currentSubject = '';
    currentChapter = '';
    currentStream = '';
    
    if (!classData) {
        showNotification('Class data not available. Please ensure data files are loaded.', 'error');
        return;
    }
    
    if (cls === '9' || cls === '10') {
        // Direct subject selection for class 9 and 10
        displaySubjectsForClass();
        document.getElementById('class-title').textContent = `Class ${cls}`;
        showPage('class-page');
    } else {
        // Stream selection for class 11 and 12
        displayStreamsForClass();
        showPage('stream-page');
    }
}

function displaySubjectsForClass() {
    const grid = document.getElementById('class-content');
    if (!grid) return;
    
    grid.innerHTML = '';
    grid.className = 'subjects-grid';
    
    // NEW: Add Daily Challenge card for academic classes
    const dailyChallengeCard = document.createElement('div');
    dailyChallengeCard.id = `academic-daily-challenge-card-${currentClass}`;
    dailyChallengeCard.className = 'subject-card daily-challenge-card';
    const today = new Date();
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-GB', options);

    dailyChallengeCard.innerHTML = `
        <div class="daily-challenge-header">
            <h2>Daily Challenge</h2>
            <span id="academic-daily-challenge-notification-dot" class="notification-dot" style="display: none;"></span>
        </div>
        <p>A mix of 20 questions from all subjects for Class ${currentClass}.</p>
        <div class="daily-challenge-footer">
            <span id="academic-daily-challenge-date">${formattedDate}</span>
            <span id="academic-daily-challenge-status">A new challenge awaits!</span>
        </div>
    `;
    dailyChallengeCard.onclick = () => startAcademicDailyChallenge();
    grid.appendChild(dailyChallengeCard);

    let subjects = [];
    if (currentClass === '9' || currentClass === '10') {
        subjects = classData[currentClass]?.subjects || [];
    } else if (currentClass === '11' || currentClass === '12') {
        if (!currentStream) return;
        subjects = classData[currentClass]?.streams?.[currentStream] || [];
    }
    
    if (!subjects || subjects.length === 0) {
        grid.innerHTML = '<p>No subjects available for this class.</p>';
        return;
    }
    
    subjects.forEach(subject => {
        const subjectChapters = classData[currentClass]?.chapters?.[subject] || [];
        const hasContent = subjectChapters && subjectChapters.some(chapterHasQuestions);

        const card = document.createElement('div');
        card.className = `subject-card ${!hasContent ? 'locked' : ''}`;
        
        // Add icons for Academic subjects like class 9, 10, 11, 12
        const iconMap = {
            math: 'https://cdn-icons-png.flaticon.com/512/2283/2283349.png',
            science: 'https://cdn-icons-png.flaticon.com/512/3000/3000774.png',
            physics: 'https://cdn-icons-png.flaticon.com/512/3000/3000774.png',
            chemistry: 'https://cdn-icons-png.flaticon.com/512/4341/4341094.png',
            biology: 'https://cdn-icons-png.flaticon.com/512/2783/2783988.png'
        };
        
        card.innerHTML = `
            <img src="${iconMap[subject] || 'https://cdn-icons-png.flaticon.com/512/3131/3131636.png'}" alt="${subject} Icon" class="card-icon">
            <h2>${getSubjectTitle(subject)}</h2>
            <p>Practice ${getSubjectTitle(subject)} for Class ${currentClass}</p>
            ${!hasContent ? '<div class="set-status">Coming Soon</div>' : ''}
        `;
        if (hasContent) {
            card.onclick = function() { 
                selectClassSubject(subject); 
            };
        } else {
            card.onclick = showLockedContentMessage;
        }
        grid.appendChild(card);
    });

    checkAcademicDailyChallengeStatus(); // NEW: Check status when displaying subjects
}

function displayStreamsForClass() {
    const grid = document.getElementById('streams-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const streams = Object.keys(classData[currentClass]?.streams || {});
    
    if (streams.length === 0) {
        grid.innerHTML = '<p>No streams available for this class.</p>';
        return;
    }
    
    streams.forEach(stream => {
        const streamCard = document.createElement('div');
        streamCard.className = 'subject-card';
        
        const streamTitles = {
            pcm: 'Physics, Chemistry, Mathematics',
            pcb: 'Physics, Chemistry, Biology',
            pcmb: 'Physics, Chemistry, Math, Biology'
        };
        
        streamCard.innerHTML = `
            <h2>${stream.toUpperCase()}</h2>
            <p>${streamTitles[stream] || classData[currentClass].streams[stream].map(getSubjectTitle).join(', ')}</p>
        `;
        streamCard.onclick = function() {
            currentStream = stream;
            displaySubjectsForClass();
            document.getElementById('class-title').textContent = `Class ${currentClass} - ${stream.toUpperCase()} Stream`;
            showPage('class-page');
        };
        grid.appendChild(streamCard);
    });
    
    document.getElementById('stream-title').textContent = `Choose Your Stream (Class ${currentClass})`;
}

function selectStream(stream) {
    currentStream = stream;
    displaySubjectsForClass();
    document.getElementById('class-title').textContent = `Class ${currentClass} - ${stream.toUpperCase()} Stream`;
    showPage('class-page');
}

function selectClassSubject(subject) {
    currentSubject = subject;
    document.getElementById('search-chapters').value = ''; // Clear search bar
    document.getElementById('subject-title').textContent = `${getSubjectTitle(subject)} - Class ${currentClass}`;
    displayChaptersForClass();
    showPage('subject-page');
}

function displayChaptersForClass() {
    const grid = document.getElementById('chapters-grid');
    grid.innerHTML = '';
    
    const chapters = classData[currentClass]?.chapters?.[currentSubject] || [];
    
    if (chapters.length === 0) {
        grid.innerHTML = '<p>No chapters available for this subject. Please check back later.</p>';
        return;
    }
    
    chapters.forEach((chapter, index) => {
        const hasQuestions = chapterHasQuestions(chapter);
        const chapterCard = document.createElement('div');
        chapterCard.className = `chapter-card ${!hasQuestions ? 'locked' : ''}`;
        chapterCard.innerHTML = `
            <h3>${chapter.name}</h3>
            <p>Practice questions on ${chapter.name}</p>
            ${!hasQuestions ? '<div class="set-status">Coming Soon</div>' : ''}
        `;
        if (hasQuestions) {
            chapterCard.onclick = function() {
                currentChapter = chapter.name;
                displayChapterInfo();
                showPage('chapter-page');
            };
        } else {
            chapterCard.onclick = showLockedContentMessage;
        }
        grid.appendChild(chapterCard);
    });
}

// ===================== NEW: CHAPTER SEARCH FUNCTION =====================
function filterChapters() {
    const searchTerm = document.getElementById('search-chapters').value.toLowerCase();
    const chapterCards = document.querySelectorAll('#chapters-grid .chapter-card');
    let chaptersFound = false;

    chapterCards.forEach(card => {
        const chapterName = card.querySelector('h3').textContent.toLowerCase();
        if (chapterName.includes(searchTerm)) {
            card.style.display = '';
            chaptersFound = true;
        } else {
            card.style.display = 'none';
        }
    });

    // Display a message if no chapters are found
    let noResultsMessage = document.getElementById('no-results-message');
    if (!chaptersFound && !noResultsMessage) {
        noResultsMessage = document.createElement('p');
        noResultsMessage.id = 'no-results-message';
        noResultsMessage.textContent = 'No chapters found matching your search.';
        document.getElementById('chapters-grid').appendChild(noResultsMessage);
    } else if (chaptersFound && noResultsMessage) {
        noResultsMessage.remove();
    }
}

// ===================== CHAPTER INFO DISPLAY =====================
function displayChapterInfo() {
    document.getElementById('chapter-title').textContent = currentChapter;
    
    let chapterData = null;
    let totalQuestions = 0;
    
    if (classMode) {
        chapterData = classData[currentClass]?.chapters?.[currentSubject]?.find(ch => ch.name === currentChapter);
    } else {
        const data = subjectData[currentSubject];
        chapterData = data?.chapters?.find(ch => ch.name === currentChapter);
    }
    
    if (chapterData && chapterData.sets) {
        totalQuestions = chapterData.sets.reduce((sum, set) => sum + set.length, 0);
    }
    
    document.getElementById('total-questions').textContent = totalQuestions;
    
    // Calculate progress
    let completedSets = 0;
    let totalScore = 0;
    
    for (let i = 0; i < 5; i++) {
        const progressKey = `${currentSubject}_${currentChapter}_${i}`;
        if (userProgress[progressKey] && userProgress[progressKey].score >= 40) { // FIX: Use 40% to correctly count completed sets
            completedSets++;
            totalScore += userProgress[progressKey].score;
        }
    }
    
    const averageScore = completedSets > 0 ? Math.round(totalScore / completedSets) : 0;
    
    document.getElementById('completed-sets').textContent = `${completedSets}/5`;
    document.getElementById('average-score').textContent = `${averageScore}%`;
    
    // Display practice sets
    displayPracticeSets(chapterData);
    displayProgressInfo(completedSets, averageScore);
}

function displayPracticeSets(chapterData) {
    const setsGrid = document.getElementById('sets-grid');
    setsGrid.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const setCard = document.createElement('div');
        setCard.className = 'set-card';
        
        const progressKey = `${currentSubject}_${currentChapter}_${i}`;
        const progress = userProgress[progressKey];
        
        let setStatus = 'Not Started';
        let cardClass = '';
        
        const hasQuestions = chapterData && chapterData.sets && chapterData.sets[i] && chapterData.sets[i].length > 0;

        if (progress) {
            if (progress.score >= 40) { // FIX: Use 40% as the passing criteria
                setStatus = `Passed (${progress.score}%)`;
                cardClass = 'completed';
            } else {
                setStatus = `Failed (${progress.score}%)`;
                cardClass = 'failed';
            }
        }
        
        // Check if set should be locked
        if (i > 0) {
            const prevProgressKey = `${currentSubject}_${currentChapter}_${i-1}`;
            const prevProgress = userProgress[prevProgressKey];
            if (!prevProgress || prevProgress.score < 40) { // FIX: Use 40% to unlock the next set
                setStatus = 'Locked';
                cardClass = 'locked locked-progress'; // Add a specific class for progress-locked sets
            }
        }
        
        // Check if questions are available
        if (!hasQuestions) {
            setStatus = 'Coming Soon';
            cardClass = 'locked';
        }
        
        setCard.className = `set-card ${cardClass}`;
        setCard.innerHTML = `
            <div class="set-title">Set ${i + 1}</div>
            <div class="set-status">${setStatus}</div>
        `;
        
        if (setStatus === 'Coming Soon') {
            // Only 'Coming Soon' cards should show the modal
            setCard.onclick = showLockedContentMessage;
        } else if (!cardClass.includes('locked')) {
            // Clickable only if not locked at all
            setCard.onclick = (e) => {
                const card = e.currentTarget;
                if (card.classList.contains('completed')) {
                    // If the set is already passed, show confirmation modal
                    showRetakeConfirmation(i);
                } else {
                    // Otherwise, show the quiz mode selection modal directly
                    promptQuizMode(i);
                }
            };
        }
        
        setsGrid.appendChild(setCard);
    }
}

/**
 * NEW: Shows the retake confirmation modal.
 * Stores the set index that the user intends to retake.
 * @param {number} setIndex - The index of the quiz set to be retaken.
 */
function showRetakeConfirmation(setIndex) {
    // Store the set index in a global variable or a data attribute
    // Using pendingSetIndex which is already available for this purpose.
    pendingSetIndex = setIndex;
    document.getElementById('retake-confirm-modal').classList.add('visible');
}

/**
 * NEW: Handles the logic after the user confirms the retake.
 * It determines whether to start the quiz directly or show the mode selection.
 */
function handleRetakeConfirmation() {
    const modal = document.getElementById('retake-confirm-modal');
    modal.classList.remove('visible');

    // If currentSet is defined, it means we came from the results page.
    // The 'retakeQuiz' function handles this, so we just start the quiz.
    // If pendingSetIndex is defined, it means we came from the chapter page.
    if (pendingSetIndex !== -1) {
        // User clicked a 'Passed' set on the chapter page, so show the mode choice modal.
        promptQuizMode(pendingSetIndex);
    } else {
        // User clicked 'Retake' on the results page.
        startQuiz(currentSet);
    }
}

function promptQuizMode(setIndex) {
    pendingSetIndex = setIndex;
    const modal = document.getElementById('quiz-mode-modal');
    modal.classList.add('visible');
}

function displayProgressInfo(completedSets, averageScore) {
    const progressInfo = document.getElementById('progress-info');
    progressInfo.innerHTML = `
        <p><strong>Completed Sets:</strong> ${completedSets}/5</p>
        <p><strong>Average Score:</strong> ${averageScore}%</p>
        <p><strong>Chapter Progress:</strong> ${(completedSets / 5 * 100).toFixed(0)}%</p>
    `;
}

// ===================== QUIZ FUNCTIONALITY (PRESERVED) =====================
function startQuiz(setIndex) {
    dailyChallengeMode = false;
    practiceMode = false; // Ensure practice mode is off
    currentSet = setIndex;
    currentQuestionIndex = 0;
    userAnswers = [];
    
    // Get quiz data based on mode
    let chapterData = null;
    if (classMode && !academicDailyChallenge) {
        chapterData = classData[currentClass]?.chapters?.[currentSubject]?.find(ch => ch.name === currentChapter);
    } else if (!classMode && !dailyChallengeMode) {
        const data = subjectData[currentSubject];
        chapterData = data?.chapters?.find(ch => ch.name === currentChapter);
    }
    
    // FIX: The quizData was not being assigned for regular quizzes, causing an error on submission.
    // This was because the check was exiting before quizData could be set.
    if (dailyChallengeMode) {
        // Daily challenge data is already set, so we do nothing here.
    } else if (chapterData && chapterData.sets[setIndex] && chapterData.sets[setIndex].length > 0) {
        quizData = chapterData.sets[setIndex];
    } else {
        showNotification('This set is not available yet. Please check back later.', 'warning');
        return;
    }
    // Initialize user answers array
    userAnswers = new Array(quizData.length).fill(null);
    
    // Setup timer
    timeRemaining = quizData.length * quizTimerSetting; // NEW: Use customizable timer setting
    totalTime = timeRemaining;
    
    displayQuestion();
    startTimer();
    setupQuestionNumbers();
    showPage('quiz-page');
}

function startPracticeMode(setIndex) {
    practiceMode = true;
    dailyChallengeMode = false;
    currentSet = setIndex;
    currentQuestionIndex = 0;
    userAnswers = [];

    // Get quiz data based on mode
    let chapterData = null;
    if (classMode) {
        chapterData = classData[currentClass]?.chapters?.[currentSubject]?.find(ch => ch.name === currentChapter);
    } else {
        const data = subjectData[currentSubject];
        chapterData = data?.chapters?.find(ch => ch.name === currentChapter);
    }

    if (!chapterData || !chapterData.sets[setIndex] || chapterData.sets[setIndex].length === 0) {
        showNotification('This set is not available for practice yet.', 'warning');
        return;
    }

    // Use questions from the selected set
    quizData = chapterData.sets[setIndex];

    // Initialize user answers array
    userAnswers = new Array(quizData.length).fill(null);

    displayQuestion();
    // DO NOT start the timer for practice mode
    setupQuestionNumbers();
    showPage('quiz-page');
    updateLifelineDisplay();
}

function displayQuestion() {
    if (!quizData || currentQuestionIndex >= quizData.length) return;
    
    const question = quizData[currentQuestionIndex];
    
    // Update question counter
    document.getElementById('current-question').textContent = 
        `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    
    // Update current set display
    let setDisplay = practiceMode ? 'Practice' : (currentSet + 1);
    document.getElementById('current-set').textContent = setDisplay;


    // Hide timer in practice mode
    document.getElementById('timer').style.display = practiceMode ? 'none' : 'block';
    // FIX: Show lifelines in BOTH practice and timed mode
    document.getElementById('lifeline-container').style.display = 'flex';

    // Hide previous button in practice mode
    document.getElementById('prev-btn').style.display = practiceMode ? 'none' : 'inline-flex';
    
    // Handle question year badge
    const yearBadge = document.getElementById('question-year-badge');
    if (question.year) {
        yearBadge.textContent = question.year;
        yearBadge.style.display = 'inline-block';
    } else {
        yearBadge.style.display = 'none';
    }

    // Display question
    document.getElementById('question-text').textContent = question.question;
    
    // Display options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        optionDiv.onclick = () => selectOption(index);
        
        if (userAnswers[currentQuestionIndex] === index) {
            optionDiv.classList.add('selected');
        }
        
        optionsContainer.appendChild(optionDiv);
    });
    
    // Clear feedback and hide next button for new question in practice mode
    document.getElementById('practice-feedback').innerHTML = '';
    document.getElementById('next-btn').style.display = practiceMode ? 'none' : 'inline-flex';


    // Update navigation buttons
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    document.getElementById('next-btn').textContent = 
        currentQuestionIndex === quizData.length - 1 ? 'Finish' : 'Next';
    
    // Update bookmark button
    updateBookmarkButton();

    // NEW: Reset and enable lifeline buttons for the new question
    document.getElementById('lifeline-5050').disabled = false;
    document.getElementById('lifeline-hint').disabled = false;
    document.getElementById('lifeline-skip').disabled = false;

    updateQuestionNumbers();
}

function selectOption(optionIndex) {
    if (practiceMode) {
        // In practice mode, provide instant feedback
        const question = quizData[currentQuestionIndex];
        const isCorrect = optionIndex === question.answer;
        const options = document.querySelectorAll('.option');
        const feedbackEl = document.getElementById('practice-feedback');

        // Disable all options after one is selected
        options.forEach(opt => opt.classList.add('disabled'));

        // Highlight the correct answer
        options[question.answer].classList.add('correct-feedback');

        if (isCorrect) {
            feedbackEl.textContent = 'Correct!';
            feedbackEl.className = 'practice-feedback feedback-correct';
        } else {
            // Highlight the user's wrong choice
            options[optionIndex].classList.add('incorrect-feedback');
            feedbackEl.textContent = 'Incorrect!';
            feedbackEl.className = 'practice-feedback feedback-incorrect';
        }

        // Show the 'Next' or 'Finish' button
        const nextBtn = document.getElementById('next-btn');
        nextBtn.style.display = 'inline-flex';
        if (currentQuestionIndex === quizData.length - 1) {
            nextBtn.textContent = 'Finish Practice'; // The main event listener will handle the click
        } else {
            nextBtn.textContent = 'Next Question'; // The main event listener will handle the click
        }
        return; // End execution for practice mode
    }

    // --- Original logic for timed quiz mode ---
    userAnswers[currentQuestionIndex] = optionIndex;
    document.querySelectorAll('.option').forEach((option, index) => {
        option.classList.toggle('selected', index === optionIndex);
    });
    updateQuestionNumbers();
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function nextQuestion() {
    // In practice mode, if it's the last question, the "Finish" button should
    // take the user back to the chapter, not try to submit a quiz.
    if (practiceMode && currentQuestionIndex === quizData.length - 1) {
        goToPracticeResults();
        return;
    }

    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        submitQuiz();
    }
}

function goToQuestion(questionIndex) {
    currentQuestionIndex = questionIndex;
    displayQuestion();
}

function setupQuestionNumbers() {
    const questionNumbers = document.getElementById('question-numbers');
    questionNumbers.innerHTML = '';
    
    for (let i = 0; i < quizData.length; i++) {
        const numberDiv = document.createElement('div');
        numberDiv.className = 'question-number';
        numberDiv.textContent = i + 1;
        numberDiv.onclick = () => goToQuestion(i);
        questionNumbers.appendChild(numberDiv);
    }
}

function updateQuestionNumbers() {
    const questionNumbers = document.querySelectorAll('.question-number');
    questionNumbers.forEach((number, index) => {
        number.classList.remove('current', 'answered');
        if (index === currentQuestionIndex) {
            number.classList.add('current');
        } else if (userAnswers[index] !== null) {
            number.classList.add('answered');
        }
    });
}

function startTimer() {
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Add warning classes
    timerElement.classList.remove('timer-warning', 'timer-danger');
    if (timeRemaining <= 300) { // 5 minutes
        timerElement.classList.add('timer-warning');
    }
    if (timeRemaining <= 60) { // 1 minute
        timerElement.classList.add('timer-danger');
    }
}

/**
 * Checks if a user has previously failed a specific quiz set.
 * @param {string} progressKey - The unique key for the quiz set.
 * @returns {boolean} - True if there is a recorded failed attempt, false otherwise.
 */
function hasPreviouslyFailed(progressKey) {
    const progress = userProgress[progressKey];
    // FIX: Correctly check for a failed attempt in the history.
    // The logic should check if there's more than one attempt AND if any of the previous attempts had a score < 40.
    if (progress && Array.isArray(progress.attempts) && progress.attempts.length > 1) {
        return progress.attempts.slice(0, -1).some(attempt => typeof attempt.score === 'number' && attempt.score < 40);
    }
    return false;
}

function submitQuiz() {
    if (timer) {
        clearInterval(timer);
    }

    if (practiceMode) {
        // Practice mode doesn't have a results page, just goes back to chapter.
        goToChapter();
        return;
    }

    const timeTaken = totalTime - timeRemaining;
    const results = calculateResults();

    // Get user info for saving results
    const userName = localStorage.getItem('userName') || 'Anonymous';
    const userId = getOrCreateUserId(); // NEW: Get a unique ID for the user

    saveResultToFirestore(
        userName,
        userId,
        `${getSubjectTitle(currentSubject)} - ${currentChapter}`,
        results.percentage
    );

    // Handle progress saving based on the quiz mode
    if (academicDailyChallenge) {
        const today = new Date().toISOString().split('T')[0];
        const dailyProgressKey = `daily_challenge_class${currentClass}_${today}`;
        updateStreak(results.passed); // NEW: Update streak
        userProgress[dailyProgressKey] = { score: results.percentage, timeTaken: timeTaken };
        saveUserProgress();
    } else if (dailyChallengeMode) {
        const today = new Date().toISOString().split('T')[0];
        const dailyProgressKey = `daily_challenge_${today}`;
        userProgress[dailyProgressKey] = { score: results.percentage, timeTaken: timeTaken };
        saveUserProgress();
        updateStreak(results.passed); // NEW: Update streak
    } else {
        // NEW: Award coins for regular quiz completion
        let coinsEarned = 0;
        if (results.passed) {
            coinsEarned += 10; // 10 coins for passing
            if (results.percentage === 100) {
                coinsEarned += 25; // Bonus for a perfect score
            }
        }
        if (coinsEarned > 0) {
            quizCoins += coinsEarned;
            showNotification(`You earned ${coinsEarned} Quiz Coins! 💰`, 'success');
            updateCoinDisplay();
        }

        // Save progress for regular chapter sets
        const progressKey = `${currentSubject}_${currentChapter}_${currentSet}`;

        // NEW: Instead of overwriting, we will store a history of attempts.
        const newAttempt = {
            score: results.percentage,
            timeTaken: timeTaken,
            date: new Date().toISOString(),
            answers: userAnswers.slice() // Keep answers for review
        };

        if (!userProgress[progressKey] || !Array.isArray(userProgress[progressKey].attempts)) {
            // If no history exists, create it.
            userProgress[progressKey] = {
                score: newAttempt.score, // Keep the best score at the top level for easy access
                attempts: [newAttempt]
            };
            showNotification('Quiz result saved!', 'success');
        } else {
            // Add the new attempt to the history
            userProgress[progressKey].attempts.push(newAttempt);
            // Update the top-level score only if the new score is higher
            if (newAttempt.score >= userProgress[progressKey].score) {
                userProgress[progressKey].score = newAttempt.score;
                showNotification('New high score saved!', 'success');
            }
        }
        saveUserProgress(); // Save the updated progress with the full history
    }

    // NEW: After any quiz, recalculate and save the overall profile stats.
    // This ensures the user's profile data is always up-to-date in Firestore.
    calculateOverallStats();

    // FIX: Always display results and show the results page for any timed quiz.
    displayResults(results, timeTaken);
    showPage('results-page'); 

    // NEW: Check for achievements AFTER displaying results and saving progress.
    checkAchievements(results, timeTaken);
    updateStreakDisplay(); // NEW: Update streak display after a quiz
}

function calculateResults() {
    let correctCount = 0;
    
    userAnswers.forEach((answer, index) => {
        if (answer === quizData[index].answer) {
            correctCount++;
        }
    });
    
    const percentage = Math.round((correctCount / quizData.length) * 100);
    
    return {
        correctCount,
        incorrectCount: quizData.length - correctCount,
        percentage,
        passed: percentage >= 40
    };
}

function displayResults(results, timeTaken) {
    const scorePercentageEl = document.getElementById('score-percentage');
    const scoreRingCircle = document.getElementById('score-ring-circle');
    const scoreDetailsGrid = document.getElementById('score-details-grid');
    const timeTakenEl = document.getElementById('time-taken');

    // Animate the score percentage text
    animateValue(scorePercentageEl.id, 0, results.percentage, 1000, '%');

    // Animate the SVG progress ring
    const radius = scoreRingCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (results.percentage / 100) * circumference;

    scoreRingCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    scoreRingCircle.style.strokeDashoffset = circumference; // Start with the ring empty
    // A small delay to allow the element to render before transitioning
    setTimeout(() => {
        scoreRingCircle.style.strokeDashoffset = offset;
    }, 100);

    // Set ring color based on pass/fail
    scoreRingCircle.classList.toggle('passed', results.passed);
    scoreRingCircle.classList.toggle('failed', !results.passed);

    // Populate the score details grid
    scoreDetailsGrid.innerHTML = `
        <div class="score-detail-item correct"><strong>${results.correctCount}</strong><span>Correct</span></div>
        <div class="score-detail-item incorrect"><strong>${results.incorrectCount}</strong><span>Incorrect</span></div>
        <div class="score-detail-item time"><strong id="time-taken">0:00</strong><span>Time Taken</span></div>
    `;

    // Format and display time taken
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    document.getElementById('time-taken').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Update result status
    const resultStatus = document.getElementById('result-status');
    if (results.passed) {
        resultStatus.textContent = '🎉 Congratulations! You passed the quiz!';
        resultStatus.className = 'result-status passed';
        triggerConfetti(); // NEW: Trigger confetti on pass
    } else {
        resultStatus.textContent = '❌ You need to score 40% or above to pass. Try again!';
        resultStatus.className = 'result-status failed';
    }
}

/**
 * NEW: Creates and animates confetti for a celebratory effect.
 */
function triggerConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;

    container.innerHTML = ''; // Clear old confetti
    const confettiCount = 100;
    const colors = ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#8b5cf6'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.style.animationDuration = `${2 + Math.random() * 3}s`; // Duration between 2s and 5s
        confetti.style.transform = `rotateZ(${Math.random() * 360}deg)`;

        container.appendChild(confetti);
    }
}

/**
 * NEW: Creates and animates festive sparkles in the background.
 */
function initializeSparkles() {
    const container = document.getElementById('welcome-sparkles');
    if (!container) return;

    const sparkleCount = 25; // Number of sparkles for the welcome message

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'welcome-sparkle';

        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.left = `${Math.random() * 100}%`;
        
        const duration = 1 + Math.random() * 1.5; // Random duration between 1s and 2.5s
        const delay = Math.random() * 2; // Random delay up to 2s

        sparkle.style.animationDuration = `${duration}s`;
        sparkle.style.animationDelay = `${delay}s`;

        container.appendChild(sparkle);
    }
}

function animateValue(id, start, end, duration, suffix = '') {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function retakeQuiz() {
    if (dailyChallengeMode) {
        // Daily challenges have a fixed set of questions for the day, so just restart it.
        if (academicDailyChallenge) {
            startAcademicDailyChallenge();
        } else {
            startDailyChallenge();
        }
        return;
    }

    // --- NEW LOGIC FOR REGULAR QUIZZES ---
    // Find other available (un-passed) sets in the same chapter to avoid repetition.
    let chapterData;
    if (classMode) {
        chapterData = classData[currentClass]?.chapters?.[currentSubject]?.find(ch => ch.name === currentChapter);
    } else {
        chapterData = subjectData[currentSubject]?.chapters?.find(ch => ch.name === currentChapter);
    }

    if (!chapterData || !chapterData.sets) {
        startQuiz(currentSet); // Fallback to restarting the same quiz
        return;
    }

    const totalSets = chapterData.sets.length;
    const availableSets = [];

    for (let i = 0; i < totalSets; i++) {
        if (chapterData.sets[i] && chapterData.sets[i].length > 0) {
            const progressKey = `${currentSubject}_${currentChapter}_${i}`;
            const progress = userProgress[progressKey];
            if (!progress || progress.score < 40) {
                availableSets.push(i);
            }
        }
    }

    const otherAvailableSets = availableSets.filter(set => set !== currentSet);

    if (otherAvailableSets.length > 0) {
        const nextSet = otherAvailableSets[Math.floor(Math.random() * otherAvailableSets.length)];
        showNotification(`Starting another available set: Set ${nextSet + 1}`, 'info');
        startQuiz(nextSet);
    } else {
        // All sets are passed, or this is the only set. Check if the current one is passed.
        const progressKey = `${currentSubject}_${currentChapter}_${currentSet}`;
        const progress = userProgress[progressKey];
        if (progress && progress.score >= 40) {
            // The user has passed this quiz before, so show confirmation.
            // We set currentSet here because retake is from the results page.
            // pendingSetIndex will be -1.
            pendingSetIndex = -1; // Ensure this is reset
            showRetakeConfirmation(currentSet);
        } else {
            // The user has not passed this quiz, so let them retake it directly.
            showNotification("You haven't passed this set yet. Let's try again!", 'info');
            startQuiz(currentSet);
        }
    }
}

function reviewAnswers() {
    // NEW: Set the back button to go to the results page
    const backBtn = document.getElementById('review-page-back-btn');
    backBtn.onclick = goToResults;
    document.getElementById('review-page-title').textContent = 'Review Your Answers';

    // Pass the current quiz data and user answers to the display function
    displayReview(quizData, userAnswers);
    showPage('review-page');
}

/**
 * Displays the review of a quiz, showing user answers against correct answers.
 * @param {Array} questions - The array of question objects for the quiz.
 * @param {Array} userAnswersForQuiz - The array of user's answers for that quiz.
 */
function displayReview(questions, userAnswersForQuiz) {
    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = '';
    
    questions.forEach((question, index) => {
        const userAnswer = userAnswersForQuiz[index];
        const correctAnswer = question.answer;
        const isCorrect = userAnswer === correctAnswer;
        
        const reviewDiv = document.createElement('div');
        reviewDiv.className = `review-question ${isCorrect ? 'correct' : 'incorrect'}`;
        
        let reviewHTML = `
            <h3>Question ${index + 1}</h3>
            ${question.year ? `<p class="review-year">Asked in: <strong>${question.year}</strong></p>` : ''}
            <p><strong>${question.question}</strong></p>
            <div class="review-options">
        `;
        
        question.options.forEach((option, optIndex) => {
            let optionClass = 'review-option';
            if (optIndex === correctAnswer) {
                optionClass += ' correct-answer';
            }
            if (optIndex === userAnswer && userAnswer !== correctAnswer) {
                optionClass += ' user-wrong';
            }
            if (optIndex === userAnswer && userAnswer === correctAnswer) {
                optionClass += ' user-answer';
            }
            
            reviewHTML += `<div class="${optionClass}">${String.fromCharCode(65 + optIndex)}. ${option}</div>`;
        });
        
        reviewHTML += `
            </div>
            <p><strong>Correct Answer:</strong> ${String.fromCharCode(65 + correctAnswer)}</p>
        `;
        
        if (userAnswer === null) {
            reviewHTML += `<p><strong>Your Answer:</strong> Not answered</p>`;
        } else {
            reviewHTML += `<p><strong>Your Answer:</strong> ${String.fromCharCode(65 + userAnswer)}</p>`;
        }
        
        reviewDiv.innerHTML = reviewHTML;
        reviewContainer.appendChild(reviewDiv);
    });
}

// ===================== LOCAL STORAGE FUNCTIONS =====================
/**
 * Saves the user's entire progress object to their document in Firestore.
 */
async function saveUserProgress() {
    const userId = getOrCreateUserId();
    if (!userId || userId.startsWith('user_anonymous')) {
        // Fallback to localStorage if user is not properly identified
        localStorage.setItem('quizProgress', JSON.stringify(userProgress));
        console.log("User not identified, saving progress to localStorage.");
        return;
    }

    userProgress.bookmarks = bookmarkedQuestions; // Ensure latest bookmarks are on the object before saving

    try {
        await userProgressCollection.doc(userId).set(userProgress);
        console.log("User progress saved to Firestore.");
    } catch (error) {
        console.error("Error saving progress to Firestore: ", error);
        // Fallback to localStorage on error
        localStorage.setItem('quizProgress', JSON.stringify(userProgress));
    }
}

/**
 * Loads the user's progress from their document in Firestore.
 * If not found, it checks localStorage for any previously saved progress.
 */
async function loadUserProgress() {
    showSpinnerModal(true, 'Syncing Your Progress', 'Please wait while we fetch your latest data...');
    const userId = getOrCreateUserId();
    if (!userId || userId.startsWith('user_anonymous')) {
        const savedLocal = localStorage.getItem('quizProgress');
        userProgress = savedLocal ? JSON.parse(savedLocal) : {};
        console.log("User not identified, loading progress from localStorage.");
        showSpinnerModal(false); // Hide spinner
        return;
    }

    try {
        const doc = await userProgressCollection.doc(userId).get();
        if (doc.exists) {
            userProgress = doc.data();
        } else {
            // NEW: Initialize for a brand new user on Firestore
            userProgress = {
                quizCoins: 50, // Starting coins
                lifelines: { fiftyFifty: 3, hint: 3, skip: 3 }, // Starting lifelines
                achievements: [],
                bookmarks: [],
                purchasedItems: { themes: ['system', 'light', 'dark'], avatars: ['👤'] },
                activeAvatar: '👤',
                theme: 'system'
            };
            saveUserProgress(); // Save the defaults for the new user immediately
        }
        console.log("User progress loaded from Firestore.");
        showSpinnerModal(false); // Hide spinner on success
    } catch (error) {
        console.error("Error loading progress from Firestore: ", error);
        showSpinnerModal(false); // Hide spinner on error
    }

    // --- NEW: Initialize local state from the loaded userProgress object ---
    // This ensures consistency for both new and existing users.
    quizCoins = userProgress.quizCoins || 50;
    lifelines = userProgress.lifelines || { fiftyFifty: 3, hint: 3, skip: 3 }; // Default lifelines
    bookmarkedQuestions = userProgress.bookmarks || []; // Ensure bookmarks are loaded
    userProgress.purchasedItems = userProgress.purchasedItems || { themes: ['system', 'light', 'dark'], avatars: ['👤'] };
    userProgress.activeAvatar = userProgress.activeAvatar || '👤';
    userProgress.theme = userProgress.theme || 'system';
    // userProgress.utilityTokens = userProgress.utilityTokens || {}; // REVERTED: Removed for now

    // NEW: Apply active avatar
    document.getElementById('profile-avatar-display').textContent = userProgress.activeAvatar || '👤';
    
    // Apply the loaded theme
    applyTheme(userProgress.theme, false); // false to prevent re-saving

}

/**
 * NEW: Calculates and displays the user's single best score across all quizzes.
 */
function displayPersonalBest() {
    const personalBestSection = document.getElementById('personal-best-section');
    const scoreValueEl = document.getElementById('personal-best-score-value');
    const quizNameEl = document.getElementById('personal-best-quiz-name');

    if (!personalBestSection || !scoreValueEl || !quizNameEl) return;

    let bestScore = 0;
    let bestQuizName = 'N/A';

    // Iterate over all progress entries to find the highest score
    for (const key in userProgress) {
        // Ensure we are looking at a quiz progress entry which has a score
        if (userProgress[key] && typeof userProgress[key].score === 'number') {
            if (userProgress[key].score > bestScore) {
                bestScore = userProgress[key].score;
                // Extract a readable name from the progress key
                // e.g., "quantitative_Time and Work_0" -> "Time and Work"
                const parts = key.split('_');
                if (parts.length >= 2) {
                    bestQuizName = parts[1]; // The chapter name
                }
            }
        }
    }

    if (bestScore > 0) {
        // Animate the score and display the card
        animateValue(scoreValueEl.id, 0, bestScore, 1500);
        quizNameEl.textContent = bestQuizName;
        personalBestSection.style.display = 'block';
    } else {
        personalBestSection.style.display = 'none';
    }
}

function loadQuizSettings() {
    // FIX: Load the quiz timer setting from the userProgress object,
    // which is synced with Firestore. Default to 60 if not set.
    quizTimerSetting = userProgress.quizTimer || 60;
}
function updateCoinDisplay() {
    document.getElementById('quiz-coins-balance').textContent = userProgress.quizCoins || 0;
}

/**
 * NEW: Saves the quiz timer setting to the user's progress object.
 * This will be synced to Firestore by saveUserProgress().
 */
function saveQuizSettings() {
    userProgress.quizTimer = quizTimerSetting;
    saveUserProgress();
}

// ===================== UTILITY FUNCTIONS =====================
/**
 * Applies a staggered animation to a list of elements.
 * @param {string} selector The CSS selector for the elements to animate.
 */
function applyStaggeredAnimation(selector) {
}

/**
 * Animates a number from a start to an end value.
 * @param {string} id The ID of the element to update.
 * @param {number} start The starting number.
 * @param {number} end The ending number.
 * @param {number} duration The duration of the animation in ms.
 * @param {string} suffix A suffix to append to the number (e.g., '%').
 */


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// ===================== NEW: THEME SWITCHER =====================
function initializeSettingsPage() {
    const saveAccountBtn = document.getElementById('save-account-btn');
    const saveQuizBtn = document.getElementById('save-quiz-settings-btn');
    const durationInput = document.getElementById('timer-duration-input');
    const nameInput = document.getElementById('account-name-input');
    const pinInput = document.getElementById('account-pin-input');
    const deleteBtn = document.getElementById('delete-account-btn');
    const editBtn = document.getElementById('edit-account-btn');    
    const applyAvatarBtn = document.getElementById('apply-avatar-btn');

    // FIX: Check for all required elements to prevent errors.
    if (!saveAccountBtn || !saveQuizBtn || !durationInput || !nameInput || !pinInput || !deleteBtn || !editBtn || !applyAvatarBtn) return;
    
    // Populate fields when settings page is opened
    const menuSettingsBtn = document.getElementById('menu-settings-btn');
    if (menuSettingsBtn) {
        menuSettingsBtn.addEventListener('click', () => {
            // NEW: Reset fields to disabled state when opening settings
            nameInput.disabled = true;
            pinInput.disabled = true;
            saveAccountBtn.style.display = 'none'; // Hide save button initially
            document.getElementById('avatar-actions').style.display = 'none'; // Hide apply avatar button

            loadQuizSettings(); // Load latest settings
            durationInput.value = quizTimerSetting;
            nameInput.value = localStorage.getItem('userName') || '';
            pinInput.value = localStorage.getItem('userPin') || '';
            goToSettings();
            closeSideMenu();
            // NEW: Populate customization options when settings are opened
            populateCustomizationGrids();
        });
    }

    // Set initial values on first load
    nameInput.disabled = true;
    pinInput.disabled = true;
    loadQuizSettings();
    document.getElementById('avatar-actions').style.display = 'none'; // Hide apply avatar button
    saveAccountBtn.style.display = 'none'; // Hide save button initially
    durationInput.value = quizTimerSetting;
    nameInput.value = localStorage.getItem('userName') || '';
    pinInput.value = localStorage.getItem('userPin') || '';

    // NEW: Event listener for saving ONLY quiz settings
    saveQuizBtn.addEventListener('click', () => {
        const newDuration = parseInt(durationInput.value, 10);
        if (isNaN(newDuration) || newDuration < 10 || newDuration > 180) {
            showNotification('Please enter a duration between 10 and 180 seconds.', 'error');
            return;
        }
        quizTimerSetting = newDuration;
        saveQuizSettings();
        showNotification('Quiz settings saved!', 'success');
    });

    // NEW: Event listener for saving ONLY account settings
    saveAccountBtn.addEventListener('click', () => {
        saveAccountChanges();
    });

    // Add event listeners for delete and edit buttons
    deleteBtn.addEventListener('click', confirmAccountDeletion);
    editBtn.addEventListener('click', confirmAccountEdit);

    // NEW: Event listener for the Apply Avatar button
    applyAvatarBtn.addEventListener('click', () => {
        const selectedAvatarEl = document.querySelector('.selection-item.selected[data-avatar]');
        if (selectedAvatarEl) {
            const newAvatar = selectedAvatarEl.dataset.avatar;
            selectAvatar(newAvatar);
            document.getElementById('avatar-actions').style.display = 'none'; // Hide after applying
        } else {
            showNotification('Please select an avatar first.', 'info');
        }
    });
}

document.getElementById('settings-page').addEventListener('click', (e) => {
    const avatarItem = e.target.closest('.selection-item[data-avatar]');
    if (avatarItem) {
        // NEW: Select avatar visually, don't apply it yet
        document.querySelectorAll('.selection-item[data-avatar]').forEach(item => item.classList.remove('selected'));
        avatarItem.classList.add('selected');
        
        // Show the "Apply" button
        document.getElementById('avatar-actions').style.display = 'block';
    }

    // NEW: Handle theme selection clicks
    const themeItem = e.target.closest('.selection-item[data-theme]');
    if (themeItem) {
        const newTheme = themeItem.dataset.theme;
        // Unlike avatars, themes can be applied instantly for preview.
        applyTheme(newTheme);
    }
});

/**
 * NEW: Shows a confirmation modal before allowing the user to edit account details.
 */
function confirmAccountEdit() {
    const modal = document.getElementById('edit-account-confirm-modal');
    const proceedBtn = document.getElementById('proceed-edit-account-btn');
    const cancelBtn = document.getElementById('cancel-edit-account-btn');
    
    modal.classList.add('visible');

    const closeModal = () => modal.classList.remove('visible');

    cancelBtn.onclick = closeModal;
    proceedBtn.onclick = () => {
        closeModal();
        document.getElementById('account-name-input').disabled = false;
        document.getElementById('account-pin-input').disabled = false;
        document.getElementById('account-name-input').focus();
        document.getElementById('save-account-btn').style.display = 'block'; // Show save button
    };
}

/**
 * Handles updating user account details (name/PIN) and migrating their data in Firestore.
 */
async function saveAccountChanges() {
    const newName = document.getElementById('account-name-input').value.trim();
    const newPin = document.getElementById('account-pin-input').value.trim();
    const oldName = localStorage.getItem('userName');
    const oldPin = localStorage.getItem('userPin');

    if (!newName || !newPin || newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
        showNotification('To save, please enter a valid name and 4-digit PIN.', 'error');
        return;
    }

    if (newName === oldName && newPin === oldPin) {
        showNotification('No changes were made to your account details.', 'info');
        // No need to reload or navigate away
        return;
    }

    // NEW: Show the full-screen updating modal
    const updateModal = document.getElementById('spinner-modal');
    const titleEl = document.getElementById('spinner-modal-title');
    const messageEl = document.getElementById('spinner-modal-message');
    const spinnerContainer = document.getElementById('spinner-modal-spinner-container');
    const successContainer = document.getElementById('spinner-modal-success-container');

    if (updateModal) showSpinnerModal(true, 'Updating Account...', 'Please wait while we migrate your data.');
    
    const oldUserId = getOrCreateUserId(); // Gets ID based on old localStorage values
    const newUserId = `user_${newName.toLowerCase().replace(/[^a-z0-9]/g, '')}_${newPin}`;

    try {
        // Migrate both userProgress and leaderboard data
        await migrateFirestoreDocument(userProgressCollection, oldUserId, newUserId);
        await migrateFirestoreDocument(leaderboardCollection, oldUserId, newUserId, { name: newName });

        // Update localStorage with new details
        localStorage.setItem('userName', newName);
        localStorage.setItem('userPin', newPin);

        // NEW: Show success state in the modal
        if (updateModal) {
            titleEl.textContent = 'Account Updated!';
            messageEl.textContent = 'Your details have been saved. The app will now reload.';
            spinnerContainer.style.display = 'none';
            successContainer.innerHTML = `<svg class="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>`;
            successContainer.style.display = 'block';
        }

        setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
        console.error("Error updating account:", error);
        if (updateModal) showSpinnerModal(false); // Hide modal on failure
        showNotification('Failed to update account. Please try again.', 'error');
    }
}

/**
 * NEW: Helper function to show or hide the generic spinner modal and reset its state.
 * @param {boolean} show - True to show the modal, false to hide it.
 * @param {string} [title=''] - The title to display in the modal.
 * @param {string} [message=''] - The message to display in the modal.
 */
function showSpinnerModal(show, title = '', message = '') {
    const modal = document.getElementById('spinner-modal');
    if (!modal) return;

    if (show) {
        // Reset to initial "updating" state before showing
        document.getElementById('spinner-modal-title').textContent = title || 'Loading...';
        document.getElementById('spinner-modal-message').textContent = message || 'Please wait.';
        document.getElementById('spinner-modal-spinner-container').style.display = 'block';
        document.getElementById('spinner-modal-success-container').style.display = 'none';
        modal.classList.add('visible');
    } else {
        modal.classList.remove('visible');
    }
}

/**
 * NEW: Handles the account deletion process.
 */
function confirmAccountDeletion() {
    const modal = document.getElementById('delete-confirm-modal');
    const title = document.getElementById('delete-confirm-title');
    const message = document.getElementById('delete-confirm-message');
    const confirmBtn = document.getElementById('confirm-delete-btn');
    const cancelBtn = document.getElementById('cancel-delete-btn');

    // --- Step 1: Initial Warning ---
    title.textContent = 'Delete Account';
    message.textContent = 'This is a permanent action. Are you sure you want to proceed with deleting your account?';
    confirmBtn.textContent = 'Proceed';
    modal.classList.add('visible');

    const closeInitialModal = () => modal.classList.remove('visible');
    cancelBtn.onclick = closeInitialModal;

    confirmBtn.onclick = () => {
        closeInitialModal();
        // --- Step 2: Show Credential Modal ---
        const credentialModal = document.getElementById('delete-credential-modal');
        credentialModal.classList.add('visible');

        document.getElementById('cancel-credential-btn').onclick = () => credentialModal.classList.remove('visible');
        document.getElementById('confirm-credential-btn').onclick = () => {
            const enteredName = document.getElementById('delete-account-name-input').value.trim();
            const enteredPin = document.getElementById('delete-account-pin-input').value.trim();
            const storedName = localStorage.getItem('userName');
            const storedPin = localStorage.getItem('userPin');

            if (enteredName === storedName && enteredPin === storedPin) {
                credentialModal.classList.remove('visible');
                // --- Step 3: Final Confirmation ---
                title.textContent = 'Final Confirmation';
                message.textContent = 'This will permanently erase all your quiz progress and leaderboard scores. This action cannot be undone. Delete your account?';
                confirmBtn.textContent = 'Delete Permanently';
                modal.classList.add('visible');

                confirmBtn.onclick = () => {
                    modal.classList.remove('visible');
                    deleteAccount(); // Proceed with deletion
                };
                cancelBtn.onclick = () => modal.classList.remove('visible');

            } else {
                showNotification('Invalid credentials. Please try again.', 'error');
                // Clear inputs for re-entry
                document.getElementById('delete-account-name-input').value = '';
                document.getElementById('delete-account-pin-input').value = '';
            }
        };
    }
}

async function deleteAccount() {
    const userId = getOrCreateUserId();
    
    // Use the account update modal to show deletion progress
    const updateModal = document.getElementById('spinner-modal');
    const titleEl = document.getElementById('spinner-modal-title');
    const messageEl = document.getElementById('spinner-modal-message');
    if (updateModal && titleEl && messageEl) {
        titleEl.textContent = 'Deleting Account...';
        messageEl.textContent = 'Your data is being permanently removed. Please wait.';
        showSpinnerModal(true, 'Deleting Account...', 'Your data is being permanently removed. Please wait.');
    }

    try {
        // Delete data from Firestore
        await userProgressCollection.doc(userId).delete();
        await leaderboardCollection.doc(userId).delete();

        // Clear local storage
        localStorage.clear(); // Clears everything for a full reset
    userProgress = {}; // Reset in-memory progress

        if (updateModal) showSpinnerModal(false);
        showNotification('Account deleted successfully. Reloading...', 'success');
        setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
        console.error("Error deleting account:", error);
        if (updateModal) showSpinnerModal(false);
        showNotification('Failed to delete account. Please try again.', 'error');
    }
}

/**
 * Initializes the theme based on user preference (light, dark, or system).
 * Defaults to 'system' for new users.
 */
function initializeTheme() {
    // This function is now just for one-time setup.
    // The population logic is moved to populateCustomizationGrids.
    // Add a listener to automatically change theme if OS preference changes and 'system' is selected
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (userProgress.theme === 'system' || !userProgress.theme) {
            const newColorScheme = event.matches ? "dark" : "light";
            document.documentElement.setAttribute('data-color-scheme', newColorScheme);
        }
    });
}

function applyTheme(theme, shouldSave = true) {
    // This function is now called AFTER user profile is loaded.
    
    if (theme === 'system') {
        // Check OS preference and apply it
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-color-scheme', systemPrefersDark ? 'dark' : 'light');
    } else {
        document.documentElement.setAttribute('data-color-scheme', theme);
    }

    // Save the new theme preference
    if (shouldSave) {
        userProgress.theme = theme;
        saveUserProgress();
    }

    // Re-populate to update the 'active' state on the buttons
    populateCustomizationGrids();
}

// ===================== NEW: DAILY CHALLENGE =====================
function checkDailyChallengeStatus() {
    if (classMode) return; // This is for competitive daily challenge
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const dailyProgressKey = `daily_challenge_${today}`; // FIX: Use consistent key
    const progress = userProgress[dailyProgressKey];
    const statusEl = document.getElementById('daily-challenge-status');
    const notificationDot = document.getElementById('daily-challenge-notification-dot');
    const dailyChallengeCard = document.getElementById('daily-challenge-section');

    if (!statusEl || !notificationDot || !dailyChallengeCard) return;

    if (progress) {
        // User has attempted the challenge today
        if (progress.score >= 40) {
            // FIX: If passed, always hide the card for the day.
            dailyChallengeCard.style.display = 'none';
            notificationDot.style.display = 'none';
        } else {
            // User has failed, show status and allow retry
            dailyChallengeCard.style.display = 'block'; // Ensure it's visible on failure
            notificationDot.style.display = 'none'; // Hide dot on failed attempt
            statusEl.textContent = `Attempted Today. Score: ${progress.score}%. Try again!`;
            statusEl.style.color = 'var(--color-warning)';
        }
    } else {
        // User has not attempted the challenge today.
        dailyChallengeCard.style.display = 'block';
        statusEl.textContent = 'A new challenge awaits!';
        checkAndResetStreak(); // NEW: Check if streak is broken when the card is shown
        statusEl.style.color = ''; // Reset color
        notificationDot.style.display = 'block';

        // Only show the notification once per day.
        const lastNotificationDate = localStorage.getItem('dailyChallengeNotificationDate');
        if (lastNotificationDate !== today) {
            showNotification('A new Daily Challenge is available!', 'info');
            localStorage.setItem('dailyChallengeNotificationDate', today);
        }
    }
}

function startDailyChallenge() {
    dailyChallengeMode = true;
    academicDailyChallenge = false;
    currentSubject = 'Daily Challenge';
    currentChapter = 'Mixed Questions';
    currentSet = 0;
    currentQuestionIndex = 0;
    userAnswers = []; // Reset answers

    quizData = generateDailyChallengeQuestions();

    if (!quizData || quizData.length < 20) {
        showNotification('Not enough questions for a Daily Challenge. Please add more content.', 'error');
        goToHome();
        return;
    }

    userAnswers = new Array(quizData.length).fill(null); // Ensure answers array is correct size
    timeRemaining = quizData.length * 60;
    totalTime = timeRemaining;

    displayQuestion();
    startTimer();
    updateBookmarkButton(); // Add this line
    setupQuestionNumbers();
    showPage('quiz-page');
}

/**
 * Shuffles an array in place using a seeded pseudo-random number generator.
 * This ensures the shuffle is the same for a given seed (e.g., for a specific day).
 * @param {Array} array The array to shuffle.
 * @param {number} seed The seed for the random number generator.
 * @returns {Array} The shuffled array.
 */
function seededShuffle(array, seed) {
    let currentIndex = array.length, randomIndex;
    const pseudoRandom = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };
    while (currentIndex !== 0) {
        randomIndex = Math.floor(pseudoRandom() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function generateDailyChallengeQuestions() {
    const getQuestionsForSubject = (subjectKey) => {
        const questions = [];
        subjectData[subjectKey]?.chapters?.forEach(chapter => {
            chapter.sets?.forEach(set => {
                if (Array.isArray(set) && set.length > 0) questions.push(...set);
            });
        });
        return questions;
    };

    const today = new Date();
    let seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    const quantQuestions = getQuestionsForSubject('quantitative');
    const reasoningQuestions = getQuestionsForSubject('reasoning');
    const englishQuestions = getQuestionsForSubject('english');

    // Shuffle each subject's questions using the daily seed
    seededShuffle(quantQuestions, seed);
    seededShuffle(reasoningQuestions, seed + 1); // Use a slightly different seed for each
    seededShuffle(englishQuestions, seed + 2);

    let dailyQuestions = [];
    const fallbackPool = [];

    // Take 7 from Quantitative, or as many as available
    dailyQuestions.push(...quantQuestions.splice(0, 7));
    // Take 7 from Reasoning, or as many as available
    dailyQuestions.push(...reasoningQuestions.splice(0, 7));
    // Take 6 from English, or as many as available
    dailyQuestions.push(...englishQuestions.splice(0, 6));

    // If we still need more questions, create a fallback pool
    if (dailyQuestions.length < 20) {
        fallbackPool.push(...quantQuestions, ...reasoningQuestions, ...englishQuestions);
        seededShuffle(fallbackPool, seed + 3); // Shuffle the fallback pool
        const needed = 20 - dailyQuestions.length;
        dailyQuestions.push(...fallbackPool.slice(0, needed));
    }

    // Final shuffle of the 20 selected questions to mix them up
    return seededShuffle(dailyQuestions, seed + 4).slice(0, 20);
}

// ===================== NEW: ACADEMIC DAILY CHALLENGE =====================
function checkAcademicDailyChallengeStatus() {
    if (!classMode || !currentClass) return;

    const today = new Date().toISOString().split('T')[0];
    const dailyProgressKey = `daily_challenge_class${currentClass}_${today}`;
    const progress = userProgress[dailyProgressKey];
    const statusEl = document.getElementById('academic-daily-challenge-status');
    const cardEl = document.getElementById(`academic-daily-challenge-card-${currentClass}`);
    const notificationDot = document.getElementById('academic-daily-challenge-notification-dot');

    if (!statusEl || !notificationDot || !cardEl) return;

    if (progress) {
        notificationDot.style.display = 'none';
        if (progress.score >= 40) {
            // User has passed, hide the card for the rest of the day
            cardEl.style.display = 'none';
        } else {
            // User has failed, show status and allow retry
            cardEl.style.display = 'block';
            statusEl.textContent = `Attempted. Score: ${progress.score}%. Try again!`;
            statusEl.style.color = 'var(--color-warning)';
        }
    } else {
        cardEl.style.display = 'block';
        statusEl.textContent = 'A new challenge awaits!';
        statusEl.style.color = '';
        notificationDot.style.display = 'block';
    }
}

function startAcademicDailyChallenge() {
    dailyChallengeMode = true;
    academicDailyChallenge = true;
    currentSubject = `Class ${currentClass} Daily Challenge`;
    currentChapter = 'Mixed Subjects';
    currentSet = 0;
    currentQuestionIndex = 0;
    userAnswers = [];

    quizData = generateAcademicDailyChallengeQuestions();

    if (!quizData || quizData.length < 20) {
        showNotification(`Not enough questions for a Class ${currentClass} Daily Challenge.`, 'error');
        // Reset flags since the challenge did not start
        dailyChallengeMode = false;
        academicDailyChallenge = false;
        currentSubject = ''; // Reset the subject to fix back navigation
        goToClass();
        return;
    }

    userAnswers = new Array(quizData.length).fill(null);
    timeRemaining = quizData.length * 60;
    totalTime = timeRemaining;

    displayQuestion();
    startTimer();
    updateBookmarkButton();
    setupQuestionNumbers();
    showPage('quiz-page');
}

function generateAcademicDailyChallengeQuestions() {
    const allQuestions = [];
    const subjects = classData[currentClass]?.subjects || [];

    subjects.forEach(subjectKey => {
        classData[currentClass]?.chapters?.[subjectKey]?.forEach(chapter => {
            chapter.sets?.forEach(set => {
                if (Array.isArray(set) && set.length > 0) {
                    allQuestions.push(...set);
                }
            });
        });
    });

    if (allQuestions.length === 0) {
        return [];
    }

    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate() + parseInt(currentClass);

    return seededShuffle(allQuestions, seed).slice(0, 20);
}

// ===================== NEW: ONBOARDING & PERSONALIZATION =====================
async function checkUserProfile() { // NEW: Make this function async
    const userName = localStorage.getItem('userName');
    const userPin = localStorage.getItem('userPin'); // NEW: Check for PIN
    const userFocus = localStorage.getItem('userFocus');

    if (!userName || !userFocus || !userPin) { // NEW: Check for PIN
        document.getElementById('onboarding-modal').classList.add('visible');
        document.getElementById('logout-btn').style.display = 'none';
        initializeTheme(); // Initialize with default theme for new users
    } else {
        document.getElementById('onboarding-modal').classList.remove('visible');
        document.getElementById('logout-btn').style.display = 'inline-flex';
        await loadUserProgress(); // NEW: Wait for progress to load from Firestore
        personalizeHomepage(userName, userFocus);
    }
    // NEW: These are now called after user data is loaded, ensuring they have the correct data.
    initializeTheme();
    initializeInfoPopup();
    QuizifyStore.showStoreUpdatesModal(); // NEW: Moved here to ensure it runs after user data is loaded.
    checkDailyCoinReward(); // NEW: Check for daily coin reward
    updateStreakDisplay();
    document.getElementById('app-version').textContent = `v${APP_VERSION}`;
    document.getElementById('menu-app-version').textContent = `v${APP_VERSION}`;
}

function saveUserPreferences(focus) {
    const nameInput = document.getElementById('user-name-input');
    const pinInput = document.getElementById('user-pin-input'); // NEW: Get PIN input
    const userName = nameInput.value.trim();
    const userPin = pinInput.value.trim(); // NEW: Get PIN value

    if (!userName) {
        showNotification('Please enter your name.', 'error');
        nameInput.focus();
        return;
    }
    // NEW: Validate the PIN
    if (!userPin || userPin.length !== 4 || !/^\d{4}$/.test(userPin)) {
        showNotification('Please enter a valid 4-digit PIN.', 'error');
        pinInput.focus();
        return;
    }

    localStorage.setItem('userName', userName);
    localStorage.setItem('userPin', userPin); // NEW: Save PIN
    localStorage.setItem('userFocus', focus);

    // NEW: Set a flag to show the PIN reminder after the page reloads.
    sessionStorage.setItem('showPinReminder', 'true');

    document.getElementById('onboarding-modal').classList.remove('visible');
    document.getElementById('logout-btn').style.display = 'inline-flex';
    personalizeHomepage(userName, focus);
    window.location.reload(); // Reload to re-initialize the app with the new user ID and load their progress
}

function personalizeHomepage(userName, userFocus) {
    // NEW: Animate the welcome message
    const nameDisplay = document.getElementById('user-name-display');
    if (nameDisplay) {
        nameDisplay.innerHTML = userName
            .split('')
            .map((char, i) => `<span style="animation-delay: ${i * 50}ms">${char === ' ' ? '&nbsp;' : char}</span>`)
            .join('');
    } else {
        // Fallback for older structure
        const welcomeHeading = document.getElementById('welcome-heading');
        if (welcomeHeading) welcomeHeading.textContent = `Welcome, ${userName}!`;
    }

    // Get section elements
    const competitiveSection = document.getElementById('competitive-section');
    const academicSection = document.getElementById('academic-section');
    const dailyChallengeSection = document.getElementById('daily-challenge-section');

    // Show/hide sections based on focus
    if (userFocus === 'competitive') {
        competitiveSection.style.display = 'block';
        dailyChallengeSection.style.display = 'block';
        academicSection.style.display = 'none';
        setDailyChallengeDate(); // Set the date on the card
        checkAndResetStreak(); // NEW: Check if streak is broken
        updateStreakDisplay(); // NEW: Display the current streak
        checkDailyChallengeStatus(); // Check status only for competitive users
    } else if (userFocus === 'academic') {
        competitiveSection.style.display = 'none';
        dailyChallengeSection.style.display = 'none';
        academicSection.style.display = 'block';
    }

    // Initialize the app view
    initializeApp();
}

/**
 * NEW: Checks if the PIN reminder should be shown (on first login of a session)
 * and displays a modal with the user's PIN.
 */
function checkAndShowPinReminder() {
    if (sessionStorage.getItem('showPinReminder') === 'true') {
        const pin = localStorage.getItem('userPin');
        if (pin) {
            const modal = document.getElementById('pin-reminder-modal');
            const pinDisplay = document.getElementById('reminder-pin-display');
            const closeBtn = document.getElementById('close-pin-reminder-btn');

            if (modal && pinDisplay && closeBtn) {
                pinDisplay.textContent = pin;
                modal.classList.add('visible');

                const closeModal = () => {
                    modal.classList.remove('visible');
                    // Remove the flag so it doesn't show again in this session.
                    sessionStorage.removeItem('showPinReminder');
                };

                closeBtn.addEventListener('click', closeModal);
            }
        }
    }
}
/**
 * Sets the current date on the Daily Challenge card.
 */
function setDailyChallengeDate() {
    const dateEl = document.getElementById('daily-challenge-date');
    if (!dateEl) return;

    const today = new Date();
    // Formats the date as "26 Sep 2025"
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    dateEl.textContent = today.toLocaleDateString('en-GB', options);
}

function logout() {
    // Close the side menu for a smoother experience
    if (timer) {
        clearInterval(timer);
    }
    closeSideMenu();
    // Show the custom confirmation modal instead of the browser's confirm dialog
    document.getElementById('logout-confirm-modal').classList.add('visible');
}

// ===================== NEW: LOCKED CONTENT MODAL =====================
function initializeLockedContentModal() {
    const modal = document.getElementById('locked-content-modal');
    const closeBtn = document.getElementById('close-locked-modal-btn');

    if (!modal || !closeBtn) return;

    const closeModal = () => {
        modal.classList.remove('visible');
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function showLockedContentMessage() {
    document.getElementById('locked-content-modal').classList.add('visible');
}

/**
 * NEW: Initializes the "Feature Coming Soon" modal.
 */
function initializeFeatureComingSoonModal() {
    const modal = document.getElementById('feature-coming-soon-modal');
    const closeBtn = document.getElementById('close-feature-coming-soon-btn');

    if (!modal || !closeBtn) return;

    const closeModal = () => modal.classList.remove('visible');

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}

/**
 * NEW: Shows the "Feature Coming Soon" modal.
 */
function showFeatureComingSoonModal() {
    const modal = document.getElementById('feature-coming-soon-modal');
    if (modal) modal.classList.add('visible');
}

/**
 * NEW: Initializes the purchase success modal.
 */
function initializePurchaseSuccessModal() {
    const modal = document.getElementById('purchase-success-modal');
    const closeBtn = document.getElementById('close-purchase-success-btn');

    if (!modal || !closeBtn) return;

    const closeModal = () => modal.classList.remove('visible');

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

/**
 * NEW: Shows the purchase success modal with a custom message.
 * @param {string} itemName - The name of the item that was purchased.
 */
function showPurchaseSuccessModal(itemName) {
    const modal = document.getElementById('purchase-success-modal');
    const messageEl = document.getElementById('purchase-success-message');
    if (!modal || !messageEl) return;

    messageEl.textContent = `You have successfully purchased "${itemName}".`;
    modal.classList.add('visible');
}
// ===================== NEW: LOGOUT CONFIRMATION MODAL =====================
function initializeLogoutConfirmation() {
    const modal = document.getElementById('logout-confirm-modal');
    const confirmBtn = document.getElementById('confirm-logout-btn');
    const cancelBtn = document.getElementById('cancel-logout-btn');

    const closeModal = () => {
        modal.classList.remove('visible');
    };

    confirmBtn.addEventListener('click', () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userFocus');
        localStorage.removeItem('userPin'); // NEW: Clear PIN on logout
    userProgress.activeAvatar = '👤'; // Reset avatar
        window.location.reload();
    });

    cancelBtn.addEventListener('click', closeModal);

    // Also allow closing by clicking the overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

/**
 * NEW: Initializes and displays a generic informational or festive popup.
 * The content is controlled by the INFO_POPUP_CONFIG object.
 * It shows only once per unique message ID to avoid annoying users.
 */
function initializeInfoPopup() {
    const config = INFO_POPUP_CONFIG;
    // NEW: Date-based check
    if (!config.startDate || !config.endDate) {
        return; // Do nothing if dates are not set
    }

    const today = new Date();
    const startDate = new Date(config.startDate);
    const endDate = new Date(config.endDate);

    // Set time to 00:00:00 to compare dates only
    today.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999); // Ensure the end date is inclusive

    if (today < startDate || today > endDate) {
        return; // Do not show if outside the date range
    }
    const modal = document.getElementById('info-modal');
    const closeBtn = document.getElementById('close-info-modal-btn');
    const iconEl = modal.querySelector('.info-icon');
    const titleEl = modal.querySelector('#info-modal-title');
    const messageEl = modal.querySelector('#info-modal-message');
    const subtextEl = modal.querySelector('#info-modal-subtext');

    if (!modal || !closeBtn || !iconEl || !titleEl || !messageEl || !subtextEl) return;

    const lastSeenId = sessionStorage.getItem('seenInfoPopupId');

    if (lastSeenId !== config.id) {
        // Populate the modal with content from the configuration
        iconEl.textContent = config.icon;
        titleEl.textContent = config.title;
        messageEl.textContent = config.message;
        subtextEl.textContent = config.subtext;

        setTimeout(() => {
            modal.classList.add('visible');
            sessionStorage.setItem('seenInfoPopupId', config.id); // Save the ID of the shown popup
        }, 1000);
    }

    const closeModal = () => modal.classList.remove('visible');
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// ===================== ERROR HANDLING =====================
window.addEventListener('error', function(event) {
    console.error('Application error:', event.error);
    showNotification('An unexpected error occurred. Please refresh the page.', 'error');
});

// Check if required data is loaded
function checkDataAvailability() {
    if (!window.classesData && !window.quantitativeData && !window.englishData && !window.reasoningData) {
        console.warn('No quiz data loaded. Please ensure data files are included.');
    }
}

// ===================== UPDATE NOTIFICATION SYSTEM =====================
/**
 * Checks for application and content updates on startup.
 */
function checkForUpdates() {
    const lastVersion = localStorage.getItem('appVersion');

    // 1. Check for App Version Update (for UI/feature changes)
    if (!lastVersion) {
        localStorage.setItem('appVersion', APP_VERSION);
    } else if (lastVersion !== APP_VERSION) {
        const updateInfo = COMMUNITY_POSTS[APP_VERSION];
        const updateDetails = updateInfo?.changes || ['General improvements and bug fixes.'];
        const devNote = updateInfo?.note || null;
        const modalTitle = `New Version Updated: ${APP_VERSION}`;
        showUpdateDetails(updateDetails, modalTitle, devNote);
        localStorage.setItem('appVersion', APP_VERSION);
        // Don't check for content on app version change to avoid multiple notifications
        localStorage.setItem('lastSeenVersion', APP_VERSION); // Mark community post as seen
        return;
    }

    checkCommunityUpdates(); // Check for new community posts only if app version hasn't changed

    // 2. Check for New Content (specific topics)
    const currentContentMap = generateContentMap();
    const lastContentMapString = localStorage.getItem('contentMap');

    if (!lastContentMapString) {
        // First time user, just set the map
        localStorage.setItem('contentMap', JSON.stringify(currentContentMap));
        return;
    }

    const lastContentMap = JSON.parse(lastContentMapString);
    const updatedChapters = [];

    for (const chapterKey in currentContentMap) {
        const currentSetCount = currentContentMap[chapterKey].count;
        const lastSetCount = lastContentMap[chapterKey]?.count || 0;
        if (currentSetCount > lastSetCount) {
            updatedChapters.push(currentContentMap[chapterKey].name);
        }
    }

    if (updatedChapters.length > 0) {
        // Show notifications for new content
        const details = updatedChapters.map(chapterName => `<li>New quiz sets are available in <strong>${chapterName}</strong>.</li>`);
        const modalTitle = "New Quizzes Added!";
        const devNote = "We're constantly adding new content to help you prepare. Happy quizzing!";
        showUpdateDetails(details, modalTitle, devNote);
        // Update the stored map
        localStorage.setItem('contentMap', JSON.stringify(currentContentMap));
    }
}

/**
 * Generates a map of all available content.
 * The map key is a unique identifier, and the value contains the chapter name and set count.
 * e.g., { 'quantitative_Time and Work': { name: 'Time and Work', count: 5 } }
 * @returns {object} The content map.
 */
function generateContentMap() {
    const contentMap = {};

    // Helper to process chapters
    const processChapters = (chapters, subjectKey) => {
        if (!chapters) return;
        chapters.forEach(chapter => {
            if (chapter && chapter.name && chapter.sets) {
                const nonEmptySets = chapter.sets.filter(set => set.length > 0).length;
                if (nonEmptySets > 0) {
                    const key = `${subjectKey}_${chapter.name}`;
                    contentMap[key] = { name: chapter.name, count: nonEmptySets };
                }
            }
        });
    };

    // 1. Process competitive exams
    for (const subjectKey in subjectData) {
        if (subjectData[subjectKey] && subjectData[subjectKey].chapters) {
            processChapters(subjectData[subjectKey].chapters, subjectKey);
        }
    }

    // 2. Process academic classes
    if (classData) {
        Object.values(classData).forEach(cls => {
            const classKey = Object.keys(classData).find(key => classData[key] === cls);
            if (cls && cls.chapters) {
                Object.values(cls.chapters).forEach(subjectChapters => {
                    const subjectKey = Object.keys(cls.chapters).find(key => cls.chapters[key] === subjectChapters);
                    const prefix = `class${classKey}_${subjectKey}`;
                    processChapters(subjectChapters, prefix);
                });
            }
        });
    }

    return contentMap;
}

/**
 * Displays a toast notification.
 * @param {string} message The message to display.
 */
function showNotification(message, type = 'info', details = null, modalTitle = 'What\'s New') {
    const toast = document.getElementById('notification-toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIconContainer = document.getElementById('toast-icon-container');
    const infoBtn = document.getElementById('toast-info-btn');
    const toastSpinner = document.getElementById('toast-spinner');

    if (!toast || !toastMessage || !toastIconContainer || !infoBtn || !toastSpinner) return;

    toastMessage.textContent = message;

    // Clear previous classes and timeouts
    toast.className = 'notification-toast';
    toastIconContainer.innerHTML = ''; // Clear old icon
    toastSpinner.style.display = 'none'; // Hide spinner by default
    if (window.notificationTimeout) {
        clearTimeout(window.notificationTimeout);
    }

    // NEW: Show spinner for 'updating' type
    if (type === 'updating') {
        toastSpinner.style.display = 'block';
    }

    // Create and append the correct icon
    const icon = document.createElement('div');
    icon.id = 'toast-icon';
    toastIconContainer.appendChild(icon);

    // Add new classes for type and visibility
    toast.classList.add(`toast--${type}`);
    toast.classList.add('show');

    // Handle info button
    if (details) {
        infoBtn.style.display = 'block';
        let title = modalTitle;
        if (message.includes('App updated')) {
            title = `New Version Updated: ${APP_VERSION}`;
        }
        infoBtn.onclick = () => showUpdateDetails(details, title);
    } else {
        infoBtn.style.display = 'none';
    }

    // Don't auto-hide 'updating' notifications
    if (type !== 'updating') {
        window.notificationTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 6000); // Hide after 6 seconds
    }
}

function initializeUpdateDetailsModal() {
    const modal = document.getElementById('update-details-modal');
    const closeBtn = document.getElementById('close-update-details-btn');

    const closeModal = () => {
        modal.classList.remove('visible');
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function showUpdateDetails(details, title = 'Update Details', note = null) {
    const modal = document.getElementById('update-details-modal');
    const titleEl = document.getElementById('update-details-title');
    const contentEl = document.getElementById('update-details-content');

    titleEl.textContent = title;    
    
    let html = `<ul>${Array.isArray(details) ? details.map(item => `<li>${item}</li>`).join('') : `<li>${details}</li>`}</ul>`;
    
    if (note) {
        html += `<p class="developer-note"><strong>Developer's Note:</strong> ${note}</p>`;
    }

    contentEl.innerHTML = html;
    modal.classList.add('visible');
}

function closeSideMenu() {
    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');

    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('visible');
    menuToggleBtn.classList.remove('is-active');
}

// ===================== NEW: SIDE MENU (HAMBURGER) =====================
function initializeSideMenu() {
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const menuHomeBtn = document.getElementById('menu-home-btn');
    const menuBookmarksBtn = document.getElementById('menu-bookmarks-btn');
    const menuCommunityBtn = document.getElementById('menu-community-btn');
    const menuAboutUsBtn = document.getElementById('menu-about-us-btn'); // NEW
    const menuSettingsBtn = document.getElementById('menu-settings-btn'); // NEW
    const menuAchievementsBtn = document.getElementById('menu-achievements-btn'); // NEW
    const menuProfileBtn = document.getElementById('menu-profile-btn'); // NEW
    const menuStoreBtn = document.getElementById('menu-store-btn'); // NEW
    const menuLeaderboardBtn = document.getElementById('menu-leaderboard-btn');
    const menuOverlay = document.getElementById('menu-overlay');
    
    const openMenu = () => {
        document.getElementById('side-menu').classList.add('open');
        document.getElementById('menu-overlay').classList.add('visible');
        document.getElementById('menu-toggle-btn').classList.add('is-active');
        updateCoinDisplay(); // FIX: Update coin display when menu opens
        checkCommunityUpdates(); // Re-check to ensure dot is visible if menu was closed
    };

    menuToggleBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeSideMenu);
    menuHomeBtn.addEventListener('click', () => {
        goToHome();
        closeSideMenu();
    });
    menuBookmarksBtn.addEventListener('click', () => {
        displayBookmarkedQuestions();
        closeSideMenu();
    });
    menuCommunityBtn.addEventListener('click', () => {
        displayCommunityPosts();
        closeSideMenu();
    });
    menuAboutUsBtn.addEventListener('click', () => { // NEW
        displayAboutUsPage();
        closeSideMenu();
    });
    menuAchievementsBtn.addEventListener('click', () => { // NEW
        displayAchievements();
        closeSideMenu();
    });
    menuSettingsBtn.addEventListener('click', () => { // NEW
        goToSettings();
        closeSideMenu();
    });
    menuProfileBtn.addEventListener('click', () => { // NEW
        displayProfilePage();
        closeSideMenu();
    });
    menuStoreBtn.addEventListener('click', () => { // NEW
        QuizifyStore.displayStorePage(); // Use the new store module
        closeSideMenu();
    });
    menuLeaderboardBtn.addEventListener('click', () => {
        displayLeaderboard();
        closeSideMenu();
    });
    menuOverlay.addEventListener('click', closeSideMenu);
}

/**
 * NEW: Displays the About Us page.
 */
function displayAboutUsPage() {
    showPage('about-us-page');
}


// ===================== NEW: HOMEPAGE GLOBAL SEARCH =====================
function initializeHomepageSearch() {
    const searchInput = document.getElementById('homepage-search-input');
    const resultsContainer = document.getElementById('homepage-search-results');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();

        if (query.length < 2) {
            resultsContainer.style.display = 'none';
            return;
        }

        const searchResults = performGlobalSearch(query);
        displayHomepageSearchResults(searchResults, query);
    });

    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target)) {
            resultsContainer.style.display = 'none';
        }
    });
}

function performGlobalSearch(query) {
    const results = [];

    // 1. Search Competitive Exams
    for (const subjectKey in subjectData) {
        subjectData[subjectKey]?.chapters.forEach(chapter => {
            if (chapter.name.toLowerCase().includes(query)) {
                results.push({
                    chapterName: chapter.name,
                    subject: subjectKey,
                    type: 'competitive'
                });
            }
        });
    }

    // 2. Search Academic Classes
    for (const classKey in classData) {
        const classInfo = classData[classKey];
        for (const subjectKey in classInfo.chapters) {
            classInfo.chapters[subjectKey].forEach(chapter => {
                if (chapter.name.toLowerCase().includes(query)) {
                    results.push({
                        chapterName: chapter.name,
                        subject: subjectKey,
                        class: classKey,
                        type: 'academic'
                    });
                }
            });
        }
    }
    return results;
}

function displayHomepageSearchResults(results, query) {
    const resultsContainer = document.getElementById('homepage-search-results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="search-result-item">No chapters found.</div>';
    } else {
        results.forEach(result => {
            const item = document.createElement('div');
            item.className = 'search-result-item';

            // Highlight the matched query in the chapter name
            const chapterName = result.chapterName;
            const highlightedName = chapterName.replace(new RegExp(query, 'gi'), (match) => `<mark>${match}</mark>`);

            const context = result.type === 'academic' ? `(Class ${result.class} - ${getSubjectTitle(result.subject)})` : `(${getSubjectTitle(result.subject)})`;
            item.innerHTML = `${highlightedName} <span>${context}</span>`;
            
            item.onclick = () => {
                currentChapter = result.chapterName;
                currentSubject = result.subject;
                classMode = result.type === 'academic';
                currentClass = result.class || '';
                // Note: Stream is not needed here as we navigate directly to the chapter
                displayChapterInfo();
                showPage('chapter-page');
                
                // Clear search input and hide results after selection
                document.getElementById('homepage-search-input').value = '';
                resultsContainer.style.display = 'none';
            };
            resultsContainer.appendChild(item);
        });
    }
    resultsContainer.style.display = 'block';
}

// ===================== NEW: BOOKMARKING FEATURE =====================
function syncBookmarks() {
    // NEW: Update the userProgress object and save it to Firestore.
    userProgress.bookmarks = bookmarkedQuestions;
    saveUserProgress();
}

function toggleBookmark() {
    const currentQuestion = quizData[currentQuestionIndex];
    // Create a unique ID for the question to check for existence
    const questionId = `${currentSubject}-${currentChapter}-${currentSet}-${currentQuestionIndex}`;

    const existingIndex = bookmarkedQuestions.findIndex(bm => bm.id === questionId);

    if (existingIndex > -1) {
        // Already bookmarked, so remove it
        bookmarkedQuestions.splice(existingIndex, 1);
        showNotification('Bookmark removed.', 'success');
    } else {
        // Not bookmarked, so add it
        bookmarkedQuestions.push({
            id: questionId,
            question: currentQuestion,
            context: {
                subject: getSubjectTitle(currentSubject),
                chapter: currentChapter
            }
        });
        showNotification('Bookmark added!', 'success');
    }

    syncBookmarks(); // NEW: Sync bookmarks with Firestore
    updateBookmarkButton();
}

function updateBookmarkButton() {
    const bookmarkBtn = document.getElementById('bookmark-btn');
    if (!bookmarkBtn) return;

    const questionId = `${currentSubject}-${currentChapter}-${currentSet}-${currentQuestionIndex}`;
    const isBookmarked = bookmarkedQuestions.some(bm => bm.id === questionId);

    bookmarkBtn.classList.toggle('bookmarked', isBookmarked);
    bookmarkBtn.title = isBookmarked ? 'Remove bookmark' : 'Bookmark this question';
    bookmarkBtn.onclick = toggleBookmark;
}

function displayBookmarkedQuestions() {
    const container = document.getElementById('bookmarks-container');
    container.innerHTML = '';

    if (bookmarkedQuestions.length === 0) {
        container.innerHTML = '<p>You have no bookmarked questions yet. You can bookmark questions during a quiz.</p>';
        showPage('bookmarks-page');
        return;
    }

    bookmarkedQuestions.forEach((bm, index) => {
        const div = document.createElement('div');
        div.className = 'review-question';
        div.innerHTML = `
            <h3>${bm.context.subject} - ${bm.context.chapter}</h3>
            <p><strong>${bm.question.question}</strong></p>
            <p><strong>Correct Answer:</strong> ${String.fromCharCode(65 + bm.question.answer)}. ${bm.question.options[bm.question.answer]}</p>
            <button class="remove-bookmark-btn" onclick="removeBookmark(${index})">Remove Bookmark</button>
        `;
        container.appendChild(div);
    });

    showPage('bookmarks-page');
}

function removeBookmark(index) {
    if (index > -1 && index < bookmarkedQuestions.length) {
        bookmarkedQuestions.splice(index, 1);
        syncBookmarks(); // NEW: Sync bookmarks with Firestore
        showNotification('Bookmark removed.', 'success');
        // Refresh the view
        displayBookmarkedQuestions();
    }
}

// ===================== NEW: COMMUNITY PAGE FEATURE =====================
function checkCommunityUpdates() {
    const latestPostVersion = Object.keys(COMMUNITY_POSTS)[0];
    const lastSeenVersion = localStorage.getItem('lastSeenVersion');
    const menuDot = document.getElementById('menu-notification-dot');
    const communityDot = document.getElementById('community-notification-dot');

    // Always remove blinking class first to reset state
    menuDot.classList.remove('blinking-dot');
    communityDot.classList.remove('blinking-dot');

    // Show dot if the user hasn't seen the latest post version
    if (lastSeenVersion !== latestPostVersion) {
        menuDot.style.display = 'block';
        communityDot.style.display = 'block';
        menuDot.classList.add('blinking-dot');
        communityDot.classList.add('blinking-dot');

        // Show a toast notification only once for the new post
        const lastNotifiedVersion = localStorage.getItem('lastNotifiedCommunityVersion');
        if (lastNotifiedVersion !== latestPostVersion) {
            showNotification('You have a new community post!', 'info');
            localStorage.setItem('lastNotifiedCommunityVersion', latestPostVersion);
        }
    } else {
        menuDot.style.display = 'none';
        communityDot.style.display = 'none';
    }
}

function displayCommunityPosts() {
    const container = document.getElementById('community-posts-container');
    container.innerHTML = '';

    const latestPostVersion = Object.keys(COMMUNITY_POSTS)[0];
    // Mark posts as read by storing the latest version key
    localStorage.setItem('lastSeenVersion', latestPostVersion);
    checkCommunityUpdates(); // This will hide the dots

    const versions = Object.keys(COMMUNITY_POSTS); // Keys are already in newest-to-oldest order

    // NEW: Add a timeline container
    const timelineContainer = document.createElement('div');
    timelineContainer.className = 'timeline';
    container.appendChild(timelineContainer);

    versions.forEach(version => {
        const post = COMMUNITY_POSTS[version];
        const postCard = document.createElement('div');
        postCard.className = 'community-post-card';

        // NEW: Icon mapping based on post type
        const iconMap = {
            feature: '⭐',
            security: '🛡️',
            content: '📚',
            ui: '🎨',
            update: '🔧'
        };
        const icon = iconMap[post.type] || '⚙️'; // Default icon

        let bodyHtml = '<ul>';
        post.changes.forEach(change => {
            bodyHtml += `<li>${change}</li>`;
        });
        bodyHtml += '</ul>';

        // NEW: Add a separate developer note section if it exists
        if (post.note) {
            bodyHtml += `<div class="developer-note"><strong>Developer's Note:</strong> ${post.note}</div>`;
        }

        // NEW: Updated card structure for the timeline design
        postCard.innerHTML = `
            <div class="timeline-icon">${icon}</div>
            <div class="community-post-header">
                <h3>Version ${version}</h3>
                <span class="post-date">${post.date || 'N/A'}</span>
            </div>
            <div class="community-post-body">${bodyHtml}</div>
        `;
        timelineContainer.appendChild(postCard);
    });

    showPage('community-page');
}

// ===================== NEW: STREAK COUNTER FEATURE =====================

/**
 * Checks if the user's streak is broken and resets it if necessary.
 * This should be called once when the app loads or when the daily challenge card is displayed.
 */
function checkAndResetStreak() {
    const today = new Date();
    const lastStreakDateStr = userProgress.lastStreakDate;

    if (!lastStreakDateStr) {
        // No streak history, nothing to reset.
        return;
    }

    const lastStreakDate = new Date(lastStreakDateStr);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Normalize dates to compare them without time component
    lastStreakDate.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // If the last streak date is not today and not yesterday, the streak is broken.
    if (lastStreakDate.getTime() < yesterday.getTime()) {
        userProgress.streak = 0;
        showNotification('You missed a day! Your streak has been reset.', 'warning');
        saveUserProgress(); // Save the reset streak
    }
}

/**
 * Updates the user's streak count after completing a daily challenge.
 * @param {boolean} passed - Whether the user passed the daily challenge.
 */
function updateStreak(passed) {
    if (!passed) return; // Streak only updates on passing

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    if (userProgress.lastStreakDate === todayStr) {
        return; // Already completed today, do nothing.
    }

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (userProgress.lastStreakDate === yesterdayStr) {
        userProgress.streak = (userProgress.streak || 0) + 1; // Continue streak
        showNotification(`🔥 Streak extended to ${userProgress.streak} days!`, 'success');
    } else {
        userProgress.streak = 1; // Start a new streak
        showNotification('🔥 New streak started! Keep it going!', 'success');
    }

    userProgress.lastStreakDate = todayStr;
    saveUserProgress();
}

/**
 * Updates the streak counter display on the homepage.
 */
function updateStreakDisplay() {
    const streakCounter = document.getElementById('streak-counter');
    const streakValueEl = document.getElementById('streak-value');
    const userFocus = localStorage.getItem('userFocus');

    if (!streakCounter || !streakValueEl) return;

    const streak = userProgress.streak || 0;

    if (streak > 0 && userFocus === 'competitive') {
        streakValueEl.textContent = streak;
        streakCounter.style.display = 'inline-flex';
    } else {
        streakCounter.style.display = 'none';
    }
}


// ===================== NEW: PROFILE PAGE FEATURE =====================
let profileChart = null; // To hold the chart instance

function initializeProfilePage() {
    // The menu button handles displaying the page.
    // This function is for any one-time setup if needed.
}

/**
 * NEW: Initializes the event listeners for the profile page tabs.
 */
function initializeProfileTabs() {
    const tabsContainer = document.querySelector('.profile-tabs');
    if (!tabsContainer) return;

    tabsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('profile-tab-btn')) {
            const tabId = e.target.dataset.tab;

            // Update button active state
            document.querySelectorAll('.profile-tab-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // Update content active state
            document.querySelectorAll('.profile-tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        }
    });
}

/**
 * NEW: Initializes the event listeners for the settings page tabs.
 */
function initializeSettingsTabs() {
    const tabsContainer = document.getElementById('settings-tabs-container');
    if (!tabsContainer) return;

    tabsContainer.addEventListener('click', (e) => {
        const targetButton = e.target.closest('.profile-tab-btn');
        if (targetButton) {
            const tabId = targetButton.dataset.tab;

            // Update button active state
            document.querySelectorAll('#settings-tabs-container .profile-tab-btn').forEach(btn => btn.classList.remove('active'));
            targetButton.classList.add('active');

            // Update content active state
            document.querySelectorAll('#settings-page .profile-tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        }
    });
}

function displayProfilePage() {
    const userName = localStorage.getItem('userName') || 'Guest';
    const userFocus = localStorage.getItem('userFocus') || 'Not Set';

    document.getElementById('profile-user-name').textContent = userName;
    document.getElementById('profile-user-focus').textContent = userFocus.charAt(0).toUpperCase() + userFocus.slice(1);

    const stats = calculateOverallStats();

    // NEW: Update avatar on profile page display
    const avatarDisplay = document.getElementById('profile-avatar-display');
    avatarDisplay.textContent = userProgress.activeAvatar || '👤';

    document.getElementById('profile-quizzes-taken').textContent = stats.totalQuizzes;
    document.getElementById('profile-average-score').textContent = `${stats.averageScore.toFixed(0)}%`;
    document.getElementById('profile-quizzes-passed').textContent = stats.quizzesPassed;

    // Create or update the performance chart
    createOrUpdatePerformanceChart(stats.subjectStats);

    // NEW: Analyze and display topic strengths
    const topicAnalysis = analyzeTopicStrength();
    displayTopicStrength(topicAnalysis);

    // NEW: Initialize all history filters and populate the history list
    initializeHistoryFilters();



    showPage('profile-page');
}

function calculateOverallStats() {
    let totalQuizzes = 0;
    let quizzesPassed = 0;
    let totalScore = 0;
    const subjectStats = {};

    for (const key in userProgress) {
        if (userProgress[key] && typeof userProgress[key].score === 'number') {
            totalQuizzes++;
            totalScore += userProgress[key].score;
            if (userProgress[key].score >= 40) {
                quizzesPassed++;
            }

            // Aggregate scores by subject
            const subject = key.split('_')[0]; // e.g., 'quantitative' or 'class9'
            if (!subjectStats[subject]) {
                subjectStats[subject] = { totalScore: 0, count: 0 };
            }
            subjectStats[subject].totalScore += userProgress[key].score;
            subjectStats[subject].count++;
        }
    }

    const averageScore = totalQuizzes > 0 ? totalScore / totalQuizzes : 0;

    // NEW: Save these calculated stats to the userProgress object so they get stored in Firestore.
    saveProfileStats({ totalQuizzes, quizzesPassed, averageScore });

    return { totalQuizzes, quizzesPassed, averageScore, subjectStats };
}

function saveProfileStats(stats) {
    userProgress.totalQuizzes = stats.totalQuizzes;
    userProgress.quizzesPassed = stats.quizzesPassed;
    userProgress.averageScore = stats.averageScore;
}

function createOrUpdatePerformanceChart(subjectStats) {
    const ctx = document.getElementById('profile-chart-container');
    // NEW: Add a list container for mobile view
    ctx.innerHTML = '<canvas id="performanceChart"></canvas><div id="mobile-performance-list" class="mobile-performance-list"></div>';
    const canvas = document.getElementById('performanceChart');
    const mobileList = document.getElementById('mobile-performance-list');

    const labels = Object.keys(subjectStats).map(getSubjectTitle);
    const data = Object.values(subjectStats).map(stat => stat.totalScore / stat.count);

    if (profileChart) {
        profileChart.destroy(); // Destroy old chart instance
    }

    profileChart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Score by Subject',
                data: data,
                backgroundColor: ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#8b5cf6', '#f97316']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Average Score (%)' }
                }
            }
        }
    });

    // NEW: Populate the mobile-friendly list view
    mobileList.innerHTML = ''; // Clear previous list
    labels.forEach((label, index) => {
        const score = data[index];
        const item = document.createElement('div');
        let progressBarColor;

        // NEW: Determine color based on score
        if (score >= 70) {
            progressBarColor = 'linear-gradient(135deg, var(--color-success), #1a9a4a)';
        } else if (score >= 40) {
            progressBarColor = 'linear-gradient(135deg, var(--color-warning), #d48806)';
        } else {
            progressBarColor = 'linear-gradient(135deg, var(--color-error), #c0152f)';
        }

        item.className = 'performance-list-item';
        item.innerHTML = `
            <div class="subject-name">${label} <span>${score.toFixed(0)}%</span></div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${score}%; background: ${progressBarColor};"></div>
            </div>
        `;
        mobileList.appendChild(item);
    });
}

// ===================== NEW: TOPIC STRENGTH ANALYSIS =====================

/**
 * Analyzes user progress to determine strengths and areas for improvement.
 * @returns {{strengths: Array, improvements: Array}}
 */
function analyzeTopicStrength() {
    const chapterScores = {};

    // 1. Aggregate scores for each chapter
    for (const key in userProgress) {
        // FIX: Ignore daily challenges and other non-chapter progress keys.
        if (key.startsWith('daily_challenge') || !key.includes('_')) {
            continue;
        }

        // FIX: Robustly parse the key to handle chapter names with spaces.
        // The key format is 'subject_chapter_name_setIndex'.
        const lastUnderscoreIndex = key.lastIndexOf('_');
        if (lastUnderscoreIndex > 0 && userProgress[key] && typeof userProgress[key].score === 'number') {
            const subjectAndChapter = key.substring(0, lastUnderscoreIndex);
            const firstUnderscoreIndex = subjectAndChapter.indexOf('_');
            if (firstUnderscoreIndex === -1) continue; // Invalid format

            const subject = subjectAndChapter.substring(0, firstUnderscoreIndex);
            const chapter = subjectAndChapter.substring(firstUnderscoreIndex + 1);
            const chapterKey = `${subject}_${chapter}`;
            if (!chapterScores[chapterKey]) {
                chapterScores[chapterKey] = { scores: [], name: chapter, subject: getSubjectTitle(subject) };
            }
            chapterScores[chapterKey].scores.push(userProgress[key].score);
        }
    }

    // 2. Calculate average scores and categorize
    const strengths = [];
    const improvements = [];

    for (const key in chapterScores) {
        const chapterData = chapterScores[key];
        const avgScore = chapterData.scores.reduce((a, b) => a + b, 0) / chapterData.scores.length;

        const topic = {
            name: chapterData.name,
            subject: chapterData.subject,
            score: Math.round(avgScore)
        };

        if (avgScore >= 70) {
            strengths.push(topic);
        } else if (avgScore >= 40) {
            improvements.push(topic);
        }
    }

    // Sort by score (descending for strengths, ascending for improvements)
    strengths.sort((a, b) => b.score - a.score);
    improvements.sort((a, b) => a.score - b.score);

    return { strengths, improvements };
}

/**
 * Displays the topic strength analysis on the profile page.
 * @param {{strengths: Array, improvements: Array}} analysisData
 */
function displayTopicStrength(analysisData) {
    const strengthList = document.getElementById('strength-topics-list');
    const improvementList = document.getElementById('improvement-topics-list');

    strengthList.innerHTML = analysisData.strengths.length ? analysisData.strengths.map(t => `<li>${t.name} <span>${t.score}%</span></li>`).join('') : '<li>Complete more quizzes to identify your strengths!</li>';
    improvementList.innerHTML = analysisData.improvements.length ? analysisData.improvements.map(t => `<li>${t.name} <span>${t.score}%</span></li>`).join('') : '<li>No specific areas for improvement found yet. Keep it up!</li>';
}

/**
 * NEW: Initializes all filters for the quiz history section and populates the initial view.
 */
function initializeHistoryFilters() {
    const subjectFilter = document.getElementById('history-subject-filter');
    const chapterFilter = document.getElementById('history-chapter-filter');
    const statusFilter = document.getElementById('history-status-filter');

    if (!subjectFilter || !chapterFilter || !statusFilter) return;

    // --- 1. Populate Subject Filter ---
    const attemptedSubjects = new Set();
    for (const key in userProgress) {
        if (key.includes('_') && !key.startsWith('daily_challenge')) {
            const subjectKey = key.split('_')[0];
            // Check if it's a valid subject from our data to avoid adding junk keys
            if (subjectData[subjectKey] || Object.values(classData).some(c => c.subjects.includes(subjectKey))) {
                attemptedSubjects.add(subjectKey);
            }
        }
    }

    subjectFilter.innerHTML = '<option value="all">All Subjects</option>';
    attemptedSubjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = getSubjectTitle(subject);
        subjectFilter.appendChild(option);
    });

    // --- 2. Add Event Listeners ---
    // FIX: Populate the status filter dropdown dynamically.
    statusFilter.innerHTML = `
        <option value="all">All</option>
        <option value="passed">Passed</option>
        <option value="failed">Failed</option>
    `;

    subjectFilter.addEventListener('change', () => {
        populateChapterFilter();
        populateQuizHistory();
    });
    chapterFilter.addEventListener('change', populateQuizHistory);
    statusFilter.addEventListener('change', populateQuizHistory);

    // --- 3. Initial Population ---
    populateChapterFilter(); // Populate chapters based on default "All Subjects"
    populateQuizHistory();   // Populate the history list for the first time
}

/**
 * NEW: Populates the chapter filter based on the selected subject.
 */
function populateChapterFilter() {
    const subjectFilter = document.getElementById('history-subject-filter');
    const chapterFilter = document.getElementById('history-chapter-filter');
    const selectedSubject = subjectFilter.value;

    chapterFilter.innerHTML = '<option value="all">All Chapters</option>'; // Reset

    if (selectedSubject === 'all') {
        chapterFilter.disabled = true;
        return;
    }

    const attemptedChapters = new Set();
    for (const key in userProgress) {
        if (key.startsWith(selectedSubject + '_') && userProgress[key] && Array.isArray(userProgress[key].attempts)) {
            const chapterName = key.split('_')[1];
            attemptedChapters.add(chapterName);
        }
    }

    if (attemptedChapters.size > 0) {
        attemptedChapters.forEach(chapter => {
            const option = document.createElement('option');
            option.value = chapter;
            option.textContent = chapter;
            chapterFilter.appendChild(option);
        });
        chapterFilter.disabled = false;
    } else {
        chapterFilter.disabled = true;
    }
}

/**
 * NEW: Gathers, filters, and displays all quiz attempts in the history section.
 */
function populateQuizHistory() {
    const historyContainer = document.getElementById('history-list-container');
    if (!historyContainer) return;

    historyContainer.innerHTML = ''; // Clear previous list

    const subjectFilter = document.getElementById('history-subject-filter').value;
    const chapterFilter = document.getElementById('history-chapter-filter').value;
    const statusFilter = document.getElementById('history-status-filter').value;

    const allAttempts = [];

    // 1. Gather all attempts from the userProgress object
    for (const key in userProgress) {
        // Check for a valid quiz progress key (e.g., 'subject_chapter_setIndex')
        if (key.includes('_') && !key.startsWith('daily_challenge') && userProgress[key] && Array.isArray(userProgress[key].attempts)) {
            const [subject, chapter, setIndex] = key.split('_');
            
            userProgress[key].attempts.forEach(attempt => {
                allAttempts.push({
                    subject,
                    chapter,
                    setIndex: parseInt(setIndex, 10),
                    score: attempt.score,
                    date: new Date(attempt.date),
                    passed: attempt.score >= 40
                });
            });
        }
    }

    // 2. Sort attempts by date, most recent first
    allAttempts.sort((a, b) => b.date - a.date);

    // 3. Filter attempts based on dropdown selections
    const filteredAttempts = allAttempts.filter(attempt => {
        const subjectMatch = (subjectFilter === 'all' || attempt.subject === subjectFilter);
        const chapterMatch = (chapterFilter === 'all' || attempt.chapter === chapterFilter);
        const statusMatch = (statusFilter === 'all' || (statusFilter === 'passed' && attempt.passed) || (statusFilter === 'failed' && !attempt.passed));
        return subjectMatch && chapterMatch && statusMatch;
    });

    // 4. Display the filtered attempts
    if (filteredAttempts.length === 0) {
        historyContainer.innerHTML = '<p class="setting-description" style="text-align: center;">No quiz history found for the selected filters.</p>';
        return;
    }

    filteredAttempts.forEach(attempt => {
        const item = document.createElement('div');
        const statusClass = attempt.passed ? 'passed' : 'failed';
        item.className = `history-item ${statusClass}`;

        // Add data attributes to uniquely identify this attempt for future review functionality
        item.dataset.subject = attempt.subject;
        item.dataset.chapter = attempt.chapter;
        item.dataset.setIndex = attempt.setIndex;
        item.dataset.attemptDate = attempt.date.toISOString(); // Store ISO string for precise lookup

        item.onclick = () => {
            reviewHistoricalQuiz(attempt);
        };

        const formattedDate = attempt.date.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        });

        item.innerHTML = `
            <div class="history-item-details">
                <h4>${getSubjectTitle(attempt.subject)} - ${attempt.chapter} (Set ${attempt.setIndex + 1})</h4>
                <p>Attempted on: ${formattedDate}</p>
            </div>
            <div class="history-item-score">
                <span class="stat-value">${attempt.score}%</span>
            </div>
        `;
        historyContainer.appendChild(item);
    });
}

/**
 * NEW: Prepares and displays the review page for a specific historical quiz attempt.
 * @param {object} attempt - The historical attempt object from userProgress.
 */
function reviewHistoricalQuiz(attempt) {
    // Find the full attempt data from userProgress using the precise date
    const progressKey = `${attempt.subject}_${attempt.chapter}_${attempt.setIndex}`;
    const fullAttemptData = userProgress[progressKey]?.attempts.find(
        a => new Date(a.date).toISOString() === attempt.date.toISOString()
    );

    if (!fullAttemptData || !fullAttemptData.answers) {
        showNotification('Could not find the answers for this quiz attempt.', 'error'); // This was step 1, but I've renumbered for clarity
        return;
    }

    // Find the correct set of questions for this attempt
    let questionSet = null;

    // Check if it's a competitive subject
    const subjectKey = attempt.subject;
    const chapterName = attempt.chapter;
    const setIndex = attempt.setIndex;

    // Try to find in competitive data first
    if (subjectData[subjectKey]) {
        const chapter = subjectData[subjectKey].chapters?.find(ch => ch.name === chapterName);
        if (chapter && chapter.sets[setIndex]) {
            questionSet = chapter.sets[setIndex];
        }
    }

    // If not found, search in academic data
    if (!questionSet && classData) {
        for (const classKey in classData) {
            const classInfo = classData[classKey];
            if (classInfo.chapters && classInfo.chapters[subjectKey]) {
                const chapter = classInfo.chapters[subjectKey].find(ch => ch.name === chapterName);
                if (chapter && chapter.sets[setIndex]) {
                    questionSet = chapter.sets[setIndex];
                    break; // Found it, no need to search other classes
                }
            }
        }
    }

    if (!questionSet) {
        showNotification('Could not load questions for this historical attempt.', 'error');
        return;
    }

    // 2. Set up the review page
    const backBtn = document.getElementById('review-page-back-btn');
    backBtn.onclick = displayProfilePage; // Set back button to go to the profile
    document.getElementById('review-page-title').textContent = `Review: ${attempt.chapter} - Set ${attempt.setIndex + 1}`;

    // 3. Display the review with the historical data
    displayReview(questionSet, fullAttemptData.answers);
    showPage('review-page');
}

// ===================== NEW: FIREBASE & LEADERBOARD FUNCTIONS =====================

/**
 * Saves a quiz result to the Firestore database.
 * Also updates the user's best score in a separate leaderboard collection.
 * @param {string} name - The user's name.
 * @param {string} userId - The unique ID for the user.
 * @param {string} quizTitle - The combined subject and chapter title.
 * @param {number} score - The user's score percentage.
 */
async function saveResultToFirestore(name, userId, quizTitle, score) {
    // 1. Save every individual result for historical data
    try {
        await resultsCollection.add({
            name: name,
            userId: userId,
            quiz: quizTitle,
            score: score,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("Quiz result saved successfully!");
    } catch (error) {
        console.error("Error saving result to Firestore: ", error);
    }

    // 2. Update the leaderboard collection with the user's BEST score
    const userLeaderboardRef = leaderboardCollection.doc(userId);

    try {
        const doc = await userLeaderboardRef.get();
        if (!doc.exists || score > doc.data().score) {
            // If the user is not on the leaderboard OR this new score is higher
            await userLeaderboardRef.set({
                name: name,
                score: score,
                activeAvatar: userProgress.activeAvatar || '👤', // NEW: Save avatar with score
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("Leaderboard updated with new high score!");
        }
    } catch (error) {
        console.error("Error updating leaderboard:", error);
        showNotification('Could not update your leaderboard score.', 'error');
    }
}

/**
 * Fetches and displays the top 10 leaderboard scores from Firestore.
 */
async function displayLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    const userRankContainer = document.getElementById('user-rank-container');
    const userRankDetails = document.getElementById('user-rank-details');
    const spinner = document.getElementById('leaderboard-spinner');

    leaderboardList.innerHTML = ''; // Clear previous list
    spinner.style.display = 'flex'; // Show spinner
    userRankContainer.style.display = 'none'; // Hide user rank initially
    showPage('leaderboard-page');

    try { // Fetch and display top 10
        const snapshot = await leaderboardCollection.orderBy("score", "desc").limit(10).get();
        spinner.style.display = 'none'; // Hide spinner after fetch

        if (snapshot.empty) {
            leaderboardList.innerHTML = '<li>No scores recorded yet. Be the first!</li>';
            return;
        }

        leaderboardList.innerHTML = ''; // Clear loading state
        let rank = 1;
        let userInTop10 = false;
        const currentUserId = getOrCreateUserId();

        snapshot.forEach(doc => {
            const data = doc.data();
            const isCurrentUser = doc.id === currentUserId;
            if (isCurrentUser) {
                userInTop10 = true;
            }
            
            // Add medal classes for top 3
            const rankClass = rank <= 3 ? `rank-${rank}` : '';
            const medalIcon = rank <= 3 ? `<span class="leaderboard-medal"></span>` : '';
            // NEW: Add avatar to each list item
            const avatar = data.activeAvatar || '👤'; // Use saved avatar or default
            const listItem = `<li class="${isCurrentUser ? 'current-user-rank' : ''} ${rankClass}">
                                <span class="leaderboard-rank">${rank}.</span>
                                <span class="leaderboard-avatar">${avatar}</span>
                                ${medalIcon} <span class="leaderboard-name">${data.name}</span> <span class="leaderboard-score">${data.score}%</span>
                              </li>`;
            leaderboardList.innerHTML += listItem;
            rank++;
        });

        // If user is not in top 10, fetch their specific rank
        if (!userInTop10) {
            const userDocRef = leaderboardCollection.doc(currentUserId);
            const userDoc = await userDocRef.get();

            if (userDoc.exists) {
                const userScore = userDoc.data().score;
                const userName = userDoc.data().name;

                // Count users with a higher score to determine rank
                const higherRankSnapshot = await leaderboardCollection.where("score", ">", userScore).get();
                const userRank = higherRankSnapshot.size + 1;

                // Display user's rank
                const userAvatar = userProgress.activeAvatar || '👤';
                userRankDetails.innerHTML = `
                    <span class="leaderboard-rank">${userRank}.</span>
                    <span class="leaderboard-avatar">${userAvatar}</span>
                    <span class="leaderboard-name">${userName} (You)</span> 
                    <span class="leaderboard-score">${userScore}%</span>
                `;
                userRankContainer.style.display = 'block';
            }
        }

    } catch (error) {
        spinner.style.display = 'none'; // Hide spinner on error
        console.error("Error fetching leaderboard: ", error);
        leaderboardList.innerHTML = '<li>Could not load leaderboard. Please try again later.</li>';
        showNotification('Failed to fetch leaderboard data.', 'error');
    }
}

function initializeLeaderboard() {
    // This function can be used for any specific leaderboard initializations if needed in the future.
    // For now, the menu button handles the display.
}

/**
 * Gets a unique ID for the current user from localStorage, or creates one if it doesn't exist.
 * This version creates a consistent ID based on the user's name.
 * This ensures each user's high score is tracked uniquely.
 * @returns {string} The user's unique ID.
 */
function getOrCreateUserId() {
    const userName = localStorage.getItem('userName'); 
    const userPin = localStorage.getItem('userPin'); // NEW: Get PIN

    if (!userName || !userPin) {
        // Fallback for anonymous or error states, though this shouldn't happen in normal flow.
        return 'user_anonymous_' + Date.now();
    }

    // NEW: Create a unique ID from the combination of the sanitized name and the PIN.
    // e.g., "Raj Mishra" + "1234" -> "user_rajmishra_1234"
    const sanitizedName = userName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `user_${sanitizedName}_${userPin}`;
}

/**
 * A generic function to migrate a document in Firestore from an old ID to a new ID.
 * @param {firebase.firestore.CollectionReference} collection - The Firestore collection.
 * @param {string} oldId - The old document ID.
 * @param {string} newId - The new document ID.
 * @param {object} [updateData={}] - Optional data to merge into the new document.
 */
async function migrateFirestoreDocument(collection, oldId, newId, updateData = {}) {
    if (oldId === newId) return; // No migration needed

    const oldDocRef = collection.doc(oldId);
    const oldDoc = await oldDocRef.get();

    if (oldDoc.exists) {
        const data = { ...oldDoc.data(), ...updateData };
        const newDocRef = collection.doc(newId);
        await newDocRef.set(data); // Create new document with merged data
        await oldDocRef.delete(); // Delete the old document
    }
}

// Add a unique ID to each question when it's loaded to help with tracking
function addIdToQuestion(question, subject, chapter, setIndex, qIndex) {
    question.id = `${subject}_${chapter}_${setIndex}_${qIndex}`;
}

// ===================== NEW: ACHIEVEMENTS SYSTEM =====================

function initializeAchievements() {
    const modal = document.getElementById('achievement-unlocked-modal');
    const closeBtn = document.getElementById('close-achievement-modal-btn');
    if (modal && closeBtn) {
        closeBtn.onclick = () => modal.classList.remove('visible');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('visible');
        });
    }
}

/**
 * Checks for and awards achievements based on the latest quiz result and overall progress.
 * @param {object} results - The results object from the just-completed quiz.
 */
function checkAchievements(results, timeTaken) {
    // FIX: Refactor the logic to allow multiple achievements to be unlocked at once.
    // This ensures that on the first quiz, a user can get 'First Step', 'Achiever', and 'Perfectionist' simultaneously.
    if (!userProgress.achievements) userProgress.achievements = [];


    const stats = calculateOverallStats();
    const totalQuizzes = stats.totalQuizzes;

    // Check for 'First Quiz' and 'Achiever' achievements.
    // These should only be awarded once.
    if (totalQuizzes > 0) {
        if (!hasAchievement('first_quiz')) {
            unlockAchievement('first_quiz');
        }
        if (results.passed && !hasAchievement('passed_quiz')) {
            unlockAchievement('passed_quiz');
        }
    }

    // Check for 'Perfect Score'. This can be awarded multiple times if we enhance the system later,
    // but for now, we check if it's the first time.
    if (results.percentage === 100 && !hasAchievement('perfect_score')) {
        unlockAchievement('perfect_score');
    }

    // 4. Chapter Master
    const chapterKeyPrefix = `${currentSubject}_${currentChapter}`;
    let passedSetsInChapter = 0;
    for (let i = 0; i < 5; i++) {
        const progress = userProgress[`${chapterKeyPrefix}_${i}`];
        if (progress && progress.score >= 40) {
            passedSetsInChapter++;
        }
    }
    if (passedSetsInChapter === 5 && !hasAchievement(`chapter_master_${chapterKeyPrefix}`)) {
        unlockAchievement(`chapter_master_${chapterKeyPrefix}`, ACHIEVEMENTS.chapter_master);
    }

    // 5. Streak Achievements
    const streak = userProgress.streak || 0;
    if (streak >= 5 && !hasAchievement('streak_5')) {
        unlockAchievement('streak_5');
    }
    if (streak >= 10 && !hasAchievement('streak_10')) {
        unlockAchievement('streak_10');
    }

    // NEW: Speed Demon - Pass with average time < 30s/question
    const averageTimePerQuestion = timeTaken / (quizData.length || 1); // Avoid division by zero
    if (results.passed && averageTimePerQuestion < 30 && !hasAchievement('speed_demon')) {
        unlockAchievement('speed_demon');
    }

    // NEW: Comeback Kid - Pass a quiz that was previously failed
    const progressKey = `${currentSubject}_${currentChapter}_${currentSet}`;
    if (results.passed && hasPreviouslyFailed(progressKey) && !hasAchievement('comeback_kid')) {
        unlockAchievement('comeback_kid');
    }

    // NEW: Dedicated Learner & Quiz Master
    if (totalQuizzes >= 10 && !hasAchievement('dedicated_learner')) {
        unlockAchievement('dedicated_learner');
    }
    if (totalQuizzes >= 50 && !hasAchievement('quiz_master')) {
        unlockAchievement('quiz_master');
    }

    // After checking, save any new achievements
    if (unlockedAchievements.size > 0) {
        saveUserProgress();
    }
}

function hasAchievement(id) {
    return userProgress.achievements && userProgress.achievements.some(ach => ach.id === id);
}

function unlockAchievement(id, achievementData = null) {
    if (hasAchievement(id)) return;

    const achievement = achievementData || ACHIEVEMENTS[id];
    if (!achievement) return;

    userProgress.achievements.push({ id, name: achievement.name, date: new Date().toISOString() });
    unlockedAchievements.add(id); // Track for this session

    // Show the unlock modal
    const modal = document.getElementById('achievement-unlocked-modal');
    document.getElementById('achievement-icon').textContent = achievement.icon;
    document.getElementById('achievement-name').textContent = achievement.name;
    document.getElementById('achievement-description').textContent = achievement.description;
    modal.classList.add('visible');

    // Update notification dots
    document.getElementById('menu-notification-dot').style.display = 'block';
    document.getElementById('achievements-notification-dot').style.display = 'block';
}

function displayAchievements() {
    const grid = document.getElementById('achievements-grid');
    grid.innerHTML = '';

    // FIX: Ensure userProgress.achievements is an array before trying to access it.
    if (!userProgress.achievements) {
        userProgress.achievements = [];
    }

    for (const id in ACHIEVEMENTS) {
        const achievement = ACHIEVEMENTS[id];
        // FIX: Make the check for multi-instance achievements like 'chapter_master' more specific.
        // This prevents potential conflicts if other achievement IDs share a prefix.
        const isUnlocked = hasAchievement(id) || 
                           (id.startsWith('chapter_master') && userProgress.achievements.some(a => a.id.startsWith('chapter_master_')));

        const card = document.createElement('div');
        card.className = `achievement-card ${isUnlocked ? 'unlocked' : ''}`;
        card.innerHTML = `
            <div class="achievement-card-icon">${achievement.icon}</div>
            <h3 class="achievement-card-title">${achievement.name}</h3>
            <p class="achievement-card-description">${achievement.description}</p>
        `;
        grid.appendChild(card);
    }

    // Hide notification dot after viewing
    document.getElementById('achievements-notification-dot').style.display = 'none';
    if (localStorage.getItem('lastSeenVersion') === Object.keys(COMMUNITY_POSTS)[0]) {
        document.getElementById('menu-notification-dot').style.display = 'none';
    }

    showPage('achievements-page');
}

// ===================== NEW: DAILY COIN REWARD FUNCTIONS =====================

function initializeDailyCoinModal() {
    const modal = document.getElementById('daily-coin-modal');
    const collectBtn = document.getElementById('collect-daily-coin-btn');
    const closeBtn = document.getElementById('close-daily-coin-btn');

    if (!modal || !collectBtn || !closeBtn) return;

    collectBtn.addEventListener('click', () => {
        quizCoins += 2;
        const today = new Date().toISOString().split('T')[0];
        userProgress.lastDailyCoinCollectionDate = today;
        userProgress.quizCoins = quizCoins;
        
        saveUserProgress();
        updateCoinDisplay();
        
        modal.classList.remove('visible');
        if (dailyCoinReminderInterval) {
            clearInterval(dailyCoinReminderInterval);
            dailyCoinReminderInterval = null;
        }
        
        showNotification('You collected 2 daily coins! 💰', 'success');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('visible');
        // The reminder interval is handled in showDailyCoinModal
    });
}

function checkDailyCoinReward() {
    const today = new Date().toISOString().split('T')[0];
    const lastCollectionDate = userProgress.lastDailyCoinCollectionDate;

    if (lastCollectionDate !== today) {
        showDailyCoinModal();
    }
}

function showDailyCoinModal() {
    document.getElementById('daily-coin-modal').classList.add('visible');
    // If user closes it, remind them every 2 minutes until collected
    if (!dailyCoinReminderInterval) {
        dailyCoinReminderInterval = setInterval(showDailyCoinModal, 2 * 60 * 1000); // 2 minutes
    }
}

// ===================== NEW: CUSTOMIZATION FUNCTIONS =====================

/**
 * Populates the avatar and theme selection grids in the settings page.
 */
function populateCustomizationGrids() {
    // --- Populate Themes ---
    const themeGrid = document.getElementById('theme-selection-grid');
    if (!themeGrid) return;

    themeGrid.innerHTML = '';
    const purchasedThemes = userProgress.purchasedItems?.themes || ['system', 'light', 'dark'];
    const allThemes = [
        { id: 'system', name: 'System', icon: '💻' },
        { id: 'light', name: 'Light', icon: '☀️' },
        { id: 'dark', name: 'Dark', icon: '🌙' },
        ...QuizifyStore.STORE_ITEMS.themes // Add purchasable themes
    ];

    allThemes.forEach(theme => {
        if (purchasedThemes.includes(theme.id)) {
            const item = document.createElement('div');
            item.className = 'selection-item';
            item.dataset.theme = theme.id;
            item.title = theme.name;
            item.innerHTML = `<div class="selection-item-icon">${theme.icon}</div>`;
            if (theme.id === (userProgress.theme || 'system')) {
                item.classList.add('active');
            }
            themeGrid.appendChild(item);
        }
    });

    // --- Populate Avatars ---
    const avatarGrid = document.getElementById('avatar-selection-grid');
    if (!avatarGrid) return;

    avatarGrid.innerHTML = '';
    const purchasedAvatarIds = userProgress.purchasedItems?.avatars || ['👤'];

    // Create a combined list of all possible avatars (default + purchasable)
    const allAvatars = [
        { id: '👤', name: 'Default', icon: '👤' }, // Ensure default is always available
        ...QuizifyStore.STORE_ITEMS.avatars
    ];

    // Filter to get the full objects for purchased avatars
    const purchasedAvatars = allAvatars.filter(avatar => purchasedAvatarIds.includes(avatar.id));

    // Use a Set to avoid duplicates if the default '👤' is also in the store items
    const uniquePurchasedAvatars = [...new Map(purchasedAvatars.map(item => [item.id, item])).values()];

    uniquePurchasedAvatars.forEach(avatarObj => {
        const avatar = avatarObj.icon || avatarObj.id; // Use icon or id for the emoji

        const item = document.createElement('div');
        item.className = 'selection-item';
        item.dataset.avatar = avatar;
        item.innerHTML = `<div class="selection-item-icon">${avatar}</div>`;
        if (avatar === (userProgress.activeAvatar || '👤')) {
            item.classList.add('active');
        }
        avatarGrid.appendChild(item);
    });
}

/**
 * Applies the selected theme and saves the preference.
 * @param {string} theme - The theme ID to apply.
 */
/**
 * Sets the selected avatar as active and saves the preference.
 * @param {string} avatar - The avatar emoji/ID to set as active.
 */
function selectAvatar(avatar) {
    if (userProgress.activeAvatar === avatar) return; // No change needed

    userProgress.activeAvatar = avatar;
    saveUserProgress(); // Save to Firestore
    updateLeaderboardAvatar(avatar); // NEW: Update leaderboard immediately

    // Update UI
    document.getElementById('profile-avatar-display').textContent = avatar;
    populateCustomizationGrids(); // Re-render to update the 'active' highlight
    showNotification('Avatar updated!', 'success');
}

/**
 * NEW: Updates the user's avatar in the leaderboard collection in Firestore.
 * This ensures the change is reflected even without a new high score.
 * @param {string} avatar - The new avatar emoji/ID.
 */
async function updateLeaderboardAvatar(avatar) {
    const userId = getOrCreateUserId();
    const userLeaderboardRef = leaderboardCollection.doc(userId);
    try {
        await userLeaderboardRef.update({ activeAvatar: avatar });
        console.log("Leaderboard avatar updated successfully.");
    } catch (error) {
        console.log("Leaderboard avatar update skipped (user may not have a score yet). Error: ", error.code);
    }
}

// ===================== NEW: LIFELINE FUNCTIONS =====================

function updateLifelineDisplay() {
    document.getElementById('lifeline-5050-count').textContent = userProgress.lifelines?.fiftyFifty ?? 0;
    document.getElementById('lifeline-hint-count').textContent = userProgress.lifelines?.hint ?? 0;
    document.getElementById('lifeline-skip-count').textContent = userProgress.lifelines?.skip ?? 0;
}

function useFiftyFifty() {
    if (!userProgress.lifelines || userProgress.lifelines.fiftyFifty <= 0) {
        showNotification("You don't have any 50-50 lifelines!", 'error');
        return;
    }

    // Disable the button immediately to prevent multiple clicks
    const fiftyFiftyBtn = document.getElementById('lifeline-5050');
    if (fiftyFiftyBtn) fiftyFiftyBtn.disabled = true;

    // Decrement lifeline count and save progress
    userProgress.lifelines.fiftyFifty--;
    saveUserProgress();
    updateLifelineDisplay();

    const question = quizData[currentQuestionIndex];
    const correctAnswerIndex = question.answer;
    const optionElements = document.querySelectorAll('.option');
    
    // Get indices of all incorrect options
    let wrongOptions = [0, 1, 2, 3].filter(i => i !== correctAnswerIndex);
    
    // Shuffle the wrong options and pick the first two to hide
    wrongOptions.sort(() => Math.random() - 0.5);
    const optionsToHide = wrongOptions.slice(0, 2);

    // Hide the selected incorrect options
    optionsToHide.forEach(index => {
        if (optionElements[index]) {
            optionElements[index].style.visibility = 'hidden';
            optionElements[index].classList.add('disabled'); // Also disable clicks
        }
    });
}

function useHint() {
    if (userProgress.lifelines.hint <= 0) {
        showNotification("You don't have any hint lifelines!", 'error');
        return;
    }

    userProgress.lifelines.hint--;
    saveUserProgress();
    updateLifelineDisplay();

    const question = quizData[currentQuestionIndex];
    const hint = question.hint || "No hint is available for this question.";
    showNotification(hint, 'info');

    document.getElementById('lifeline-hint').disabled = true; // Disable for this question
}

function useSkip() {
    if (userProgress.lifelines.skip <= 0) {
        showNotification("You don't have any skip lifelines!", 'error');
        return;
    }

    userProgress.lifelines.skip--;
    saveUserProgress();
    updateLifelineDisplay();

    nextQuestion(); // Simply move to the next question
}
