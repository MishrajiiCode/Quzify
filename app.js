
// app.js - Complete Quiz Platform with Class and Competitive Exam functionality
// Only business logic - questions stored in separate data files

// ===================== APP CHANGELOG =====================
const COMMUNITY_POSTS = {
    '1.6.0-Beta.': {
        date: 'Sep 27, 2024',
        changes: [
            'Added class-specific Daily Challenges for academic students (Classes 9-12).',
            'Fixed a bug where the back button would not work after clicking on an empty Daily Challenge.',
            'Added a Community page to view detailed updates.'
         
        ],
        note: "This is a beta version. Features and functionality may change in the final release."
    },
    '1.5.13-Beta.': {
        date: 'Sep 26, 2024',
        changes: [
            'Added an info button to update notifications to show what\'s new.',
            'Replaced all disruptive browser alerts with a new, professional toast notification system.',
            'Moved the bookmark button next to the question for easier access.'
        ]
    }
};
// ===================== APP CONFIGURATION =====================
const APP_VERSION = '1.6.0-Beta.'; // Increment this to show an update notification

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
let bookmarkedQuestions = []; // NEW: For bookmarks
let userProgress = {};

// NEW: Class-related state variables
let currentClass = '';
let currentStream = '';
let academicDailyChallenge = false; // NEW: To distinguish academic vs competitive daily challenge
let classMode = false; // true if user is in class (academic) mode

// NEW: Daily Challenge state
let dailyChallengeMode = false;


// ===================== DATA MAPPING =====================
// Competitive exam data mapping (loaded from external files)
const subjectData = {
    quantitative: window.quantitativeData || null,
    english: window.englishData || null,
    reasoning: window.reasoningData || null
};

// Academic class data (loaded from classes folder)
const classData = window.classesData || null;

// ===================== INITIALIZATION =====================
document.addEventListener('DOMContentLoaded', function() {
    loadBookmarkedQuestions();
    loadUserProgress();
    checkUserProfile();
    initializeTheme();
    checkForUpdates();
    initializeSideMenu(); // New function to handle menu logic
    initializeUpdateDetailsModal(); // Initialize the new update details modal
    initializeHomepageSearch(); // Initialize the new homepage search
    initializeLockedContentModal(); // Initialize the locked content modal
    initializeLogoutConfirmation(); // Initialize the new logout modal
});

function initializeApp() {
    showPage('home-page');
    classMode = false;
    currentClass = '';
    currentStream = '';
    dailyChallengeMode = false;
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
    dailyChallengeMode = false;
    classMode = false;
    currentClass = '';
    currentStream = '';
    currentSubject = '';
    dailyChallengeMode = false; // Ensure daily challenge mode is reset
    academicDailyChallenge = false;
    currentChapter = '';
    showPage('home-page');
}

function goBack() {
    if (dailyChallengeMode) {
        // From daily challenge subject page back to home
        classMode ? goToClass() : goToHome();
    } else if (classMode && currentClass) {
        if (currentClass === '11' || currentClass === '12') {
            if (currentStream && currentSubject) {
                // From academic subject page back to class subjects grid
                currentSubject = '';
                currentChapter = '';
                currentStream = ''; // Go back to stream selection
                displaySubjectsForClass();
                showPage('stream-page');
            } else if (currentStream) {
                // From stream selection back to class selection
                currentStream = '';
                showPage('stream-page');
            } else {
                // From stream selection back to combined home page
                classMode = false;
                currentClass = ''; 
                showPage('home-page');
            }
        } else {
            if (currentSubject) {
                // From academic subject page back to class subjects grid
                currentSubject = '';
                currentChapter = '';
                displaySubjectsForClass();
                showPage('class-page');
            } else {
                // From class subjects grid back to combined home page
                classMode = false;
                currentClass = ''; 
                showPage('home-page');
            }
        }
    } else {
        // Default fallback to home
        showPage('home-page');
    }
}

function goToClass() {
    if (classMode && currentClass) {
        displaySubjectsForClass();
        showPage('class-page');
    } else {
        showPage('home-page');
    }
}

function goToSubject() {
    if (dailyChallengeMode) {
        goToHome();
    } else if (classMode) {
        // In class mode, going "back" from a chapter page should land on the subject list
        displaySubjectsForClass();
        showPage('class-page');
    } else {
        showPage('subject-page');
    }
}

function goToChapter() {
    if (dailyChallengeMode) {
        goToHome();
        return;
    }
    displayChapterInfo(); // This will handle both class and competitive modes
    showPage('chapter-page');
}

function goToResults() {
    showPage('results-page');
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
        
        // Add icons for subjects
        const iconMap = {
            math: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            science: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
            physics: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
            chemistry: 'https://cdn-icons-png.flaticon.com/512/2784/2784428.png',
            biology: 'https://cdn-icons-png.flaticon.com/512/2921/2921073.png'
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
            setCard.onclick = function() {
                startQuiz(i);
            };
        }
        
        setsGrid.appendChild(setCard);
    }
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
    currentSet = setIndex;
    currentQuestionIndex = 0;
    userAnswers = [];
    
    // Get quiz data based on mode
    let chapterData = null;
    if (classMode) {
        if (academicDailyChallenge) {
            // This path is for academic daily challenge, handled by startAcademicDailyChallenge
            return;
        }
        chapterData = classData[currentClass]?.chapters?.[currentSubject]?.find(ch => ch.name === currentChapter);
    } else {
        const data = subjectData[currentSubject];
        chapterData = data?.chapters?.find(ch => ch.name === currentChapter);
    }
    
    if (!chapterData || !chapterData.sets[setIndex] || chapterData.sets[setIndex].length === 0) {
        showNotification('This set is not available yet. Please check back later.', 'warning');
        return;
    }
    
    quizData = chapterData.sets[setIndex];
    
    // Initialize user answers array
    userAnswers = new Array(quizData.length).fill(null);
    
    // Setup timer
    timeRemaining = quizData.length * 60; // 1 minute per question
    totalTime = timeRemaining;
    
    displayQuestion();
    startTimer();
    setupQuestionNumbers();
    showPage('quiz-page');
}

function displayQuestion() {
    if (!quizData || currentQuestionIndex >= quizData.length) return;
    
    const question = quizData[currentQuestionIndex];
    
    // Update question counter
    document.getElementById('current-question').textContent = 
        `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    
    // Update current set display
    document.getElementById('current-set').textContent = currentSet + 1;
    
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
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    document.getElementById('next-btn').textContent = 
        currentQuestionIndex === quizData.length - 1 ? 'Finish' : 'Next';
    
    // Update bookmark button
    updateBookmarkButton();

    updateQuestionNumbers();
}

function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Update UI
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

function submitQuiz() {
    if (timer) {
        clearInterval(timer);
    }
    
    const timeTaken = totalTime - timeRemaining;
    const results = calculateResults();

    // Handle progress saving based on the quiz mode
    if (academicDailyChallenge) {
        const today = new Date().toISOString().split('T')[0];
        const dailyProgressKey = `daily_challenge_class${currentClass}_${today}`;
        userProgress[dailyProgressKey] = { score: results.percentage, timeTaken: timeTaken };
        saveUserProgress();
    } else if (dailyChallengeMode) {
        const today = new Date().toISOString().split('T')[0];
        const dailyProgressKey = `daily_challenge_${today}`;
        userProgress[dailyProgressKey] = { score: results.percentage, timeTaken: timeTaken };
        saveUserProgress();
    } else {
        // Save progress for regular chapter sets
        showPage('results-page');
        const progressKey = `${currentSubject}_${currentChapter}_${currentSet}`;
        userProgress[progressKey] = {
            score: results.percentage,
            timeTaken: timeTaken,
            date: new Date().toISOString(),
            answers: userAnswers.slice()
        };
        saveUserProgress();
    }

    displayResults(results, timeTaken);
    showPage('results-page');
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
    // Update score display
    animateValue('score-percentage', 0, results.percentage, 1000, '%');
    document.getElementById('correct-count').textContent = results.correctCount;
    document.getElementById('incorrect-count').textContent = results.incorrectCount;
    
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    document.getElementById('time-taken').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Update result status
    const resultStatus = document.getElementById('result-status');
    if (results.passed) {
        resultStatus.textContent = '🎉 Congratulations! You passed the quiz!';
        resultStatus.className = 'result-status passed';
    } else {
        resultStatus.textContent = '❌ You need to score 40% or above to pass. Try again!';
        resultStatus.className = 'result-status failed';
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
    // If failed, select a random set that hasn't been completed
    const currentProgress = userProgress[`${currentSubject}_${currentChapter}_${currentSet}`];
    if (!currentProgress || currentProgress.score < 40) {
        
        // Find available sets
        const availableSets = [];
        for (let i = 0; i < 5; i++) {
            const progressKey = `${currentSubject}_${currentChapter}_${i}`;
            if (!userProgress[progressKey] || userProgress[progressKey].score < 40) {
                availableSets.push(i);
            }
        }
        
        if (availableSets.length > 0) {
            // Remove current set from available sets to avoid repetition
            const filteredSets = availableSets.filter(set => set !== currentSet);
            if (filteredSets.length > 0) {
                currentSet = filteredSets[Math.floor(Math.random() * filteredSets.length)];
            } else {
                currentSet = availableSets[Math.floor(Math.random() * availableSets.length)];
            }
        }
    }
    
    startQuiz(currentSet);
}

function reviewAnswers() {
    displayReview();
    showPage('review-page');
}

function displayReview() {
    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = '';
    
    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
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
function saveUserProgress() {
    localStorage.setItem('quizProgress', JSON.stringify(userProgress));
}

function loadUserProgress() {
    const saved = localStorage.getItem('quizProgress');
    if (saved) {
        try {
            userProgress = JSON.parse(saved);
        } catch (error) {
            console.error('Error loading progress:', error);
            userProgress = {};
        }
    }
}

function loadBookmarkedQuestions() {
    const saved = localStorage.getItem('bookmarkedQuestions');
    if (saved) {
        try {
            bookmarkedQuestions = JSON.parse(saved);
        } catch (error) {
            console.error('Error loading bookmarks:', error);
            bookmarkedQuestions = [];
        }
    }
}

// ===================== UTILITY FUNCTIONS =====================
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// ===================== NEW: THEME SWITCHER =====================
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-color-scheme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';

    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
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

    // Always show the card by default when this function is called
    dailyChallengeCard.style.display = 'block';

    if (progress) {
        // User has attempted the challenge today
        notificationDot.style.display = 'none';
        if (progress.score >= 40) {
            // User has passed, hide the card for the rest of the day
            dailyChallengeCard.style.display = 'none';
        } else {
            // User has failed, show status and allow retry
            statusEl.textContent = `Attempted Today. Score: ${progress.score}%. Try again!`;
            statusEl.style.color = 'var(--color-warning)';
        }
    } else {
        // User has not attempted the challenge today.
        statusEl.textContent = 'A new challenge awaits!';
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
    const notificationDot = document.getElementById('academic-daily-challenge-notification-dot');

    if (!statusEl || !notificationDot) return;

    if (progress) {
        notificationDot.style.display = 'none';
        statusEl.textContent = `Attempted. Score: ${progress.score}%.`;
        statusEl.style.color = progress.score >= 40 ? 'var(--color-success)' : 'var(--color-warning)';
    } else {
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
function checkUserProfile() {
    const userName = localStorage.getItem('userName');
    const userFocus = localStorage.getItem('userFocus');

    if (!userName || !userFocus) {
        document.getElementById('onboarding-modal').classList.add('visible');
        document.getElementById('logout-btn').style.display = 'none';
    } else {
        document.getElementById('onboarding-modal').classList.remove('visible');
        document.getElementById('logout-btn').style.display = 'inline-flex';
        personalizeHomepage(userName, userFocus);
    }
    document.getElementById('app-version').textContent = `v${APP_VERSION}`;
    document.getElementById('menu-app-version').textContent = `v${APP_VERSION}`;
}

function saveUserPreferences(focus) {
    const nameInput = document.getElementById('user-name-input');
    const userName = nameInput.value.trim();

    if (!userName) {
        showNotification('Please enter your name.', 'error');
        nameInput.focus();
        return;
    }

    localStorage.setItem('userName', userName);
    localStorage.setItem('userFocus', focus);

    document.getElementById('onboarding-modal').classList.remove('visible');
    document.getElementById('logout-btn').style.display = 'inline-flex';
    personalizeHomepage(userName, focus);
}

function personalizeHomepage(userName, userFocus) {
    // Personalize welcome message
    document.getElementById('welcome-heading').textContent = `Welcome, ${userName}!`;

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
        // Reload the page to reset the state and show the onboarding modal
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
        localStorage.setItem('contentMap', JSON.stringify(generateContentMap()));
        return;
    }

    checkCommunityUpdates(); // Check for new community posts

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
        const details = updatedChapters.map(chapterName => `<li>New quiz in <strong>${chapterName}</strong></li>`).join('');
        if (updatedChapters.length <= 2) {
            updatedChapters.forEach(chapterName => {
                const singleDetail = [`<li>A new quiz set is available in <strong>${chapterName}</strong>.</li>`];
                showNotification(`New quiz in ${chapterName}!`, 'info', singleDetail, 'New Content Added');
            });
        } else {
            showNotification(`${updatedChapters.length} topics have new quizzes.`, 'info', details);
        }
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

    if (!toast || !toastMessage || !toastIconContainer || !infoBtn) return;

    toastMessage.textContent = message;

    // Clear previous classes and timeouts
    toast.className = 'notification-toast';
    toastIconContainer.innerHTML = ''; // Clear old icon
    if (window.notificationTimeout) {
        clearTimeout(window.notificationTimeout);
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

    // FIX: Set a timeout to hide the toast for all notifications except app version updates.
    // The app version update is handled by a direct modal pop-up now.
    window.notificationTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 6000); // Hide after 6 seconds
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
    const menuOverlay = document.getElementById('menu-overlay');
    
    const openMenu = () => {
        document.getElementById('side-menu').classList.add('open');
        document.getElementById('menu-overlay').classList.add('visible');
        document.getElementById('menu-toggle-btn').classList.add('is-active');
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
    menuOverlay.addEventListener('click', closeSideMenu);
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
function saveBookmarkedQuestions() {
    localStorage.setItem('bookmarkedQuestions', JSON.stringify(bookmarkedQuestions));
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

    saveBookmarkedQuestions();
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
        saveBookmarkedQuestions();
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

    versions.forEach(version => {
        const post = COMMUNITY_POSTS[version];
        const postCard = document.createElement('div');
        postCard.className = 'community-post-card';

        let bodyHtml = '<ul>';
        post.changes.forEach(change => {
            bodyHtml += `<li>${change}</li>`;
        });
        bodyHtml += '</ul>';

        if (post.note) {
            bodyHtml += `<p class="developer-note"><strong>Developer's Note:</strong> ${post.note}</p>`;
        }

        postCard.innerHTML = `
            <div class="community-post-header">
                <h3>Version ${version}</h3>
                <span class="post-date">${post.date || 'N/A'}</span>
            </div>
            <div class="community-post-body">${bodyHtml}</div>
        `;
        container.appendChild(postCard);
    });

    showPage('community-page');
}

