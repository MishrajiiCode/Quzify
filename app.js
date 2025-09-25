// app.js - Complete Quiz Platform with Class and Competitive Exam functionality
// Only business logic - questions stored in separate data files

// ===================== APP CONFIGURATION =====================
const APP_VERSION = '1.3.0'; // Increment this to show an update notification

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
let userProgress = {};

// NEW: Class-related state variables
let currentClass = '';
let currentStream = '';
let classMode = false; // true if user is in class (academic) mode

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
    loadUserProgress();
    initializeApp();
    checkForUpdates();
});

function initializeApp() {
    showPage('home-page');
    classMode = false;
    document.getElementById('app-version').textContent = `v${APP_VERSION}`;
    currentClass = '';
    currentStream = '';
}

// ===================== NAVIGATION FUNCTIONS =====================
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function goToHome() {
    classMode = false;
    currentClass = '';
    currentStream = '';
    currentSubject = '';
    currentChapter = '';
    showPage('home-page');
}

function goBack() {
    if (classMode && currentClass) {
        if (currentClass === '11' || currentClass === '12') {
            if (currentStream && currentSubject) {
                // From academic subject page back to class subjects grid
                currentSubject = '';
                currentChapter = '';
                displaySubjectsForClass();
                showPage('class-page');
            } else if (currentStream) {
                // From class subjects grid back to stream selection
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
    if (classMode) {
        displaySubjectsForClass();
        showPage('class-page');
    } else {
        showPage('subject-page');
    }
}

function goToChapter() {
    displayChapterInfo();
    showPage('chapter-page');
}

function goToResults() {
    showPage('results-page');
}

// ===================== COMPETITIVE EXAM FUNCTIONS (ORIGINAL) =====================
function selectSubject(subject) {
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
        const chapterCard = document.createElement('div');
        chapterCard.className = 'chapter-card';
        chapterCard.innerHTML = `
            <h3>${chapter.name}</h3>
            <p>${chapter.description || 'Practice questions on ' + chapter.name}</p>
        `;
        chapterCard.onclick = function() {
            currentChapter = chapter.name;
            displayChapterInfo();
            showPage('chapter-page');
        };
        chaptersGrid.appendChild(chapterCard);
    });
}

// ===================== NEW: CLASS-BASED FUNCTIONS =====================
function selectClass(cls) {
    classMode = true;
    currentClass = cls;
    currentSubject = '';
    currentChapter = '';
    currentStream = '';
    
    if (!classData) {
        alert('Class data not available. Please ensure class data files are loaded.');
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
    
    let subjects = [];
    if (currentClass === '9' || currentClass === '10') {
        subjects = classData[currentClass]?.subjects || [];
    } else if (currentClass === '11' || currentClass === '12') {
        if (!currentStream) return;
        subjects = classData[currentClass]?.streams?.[currentStream] || [];
    }
    
    if (subjects.length === 0) {
        grid.innerHTML = '<p>No subjects available for this class.</p>';
        return;
    }
    
    subjects.forEach(subject => {
        const card = document.createElement('div');
        card.className = 'subject-card';
        
        // Add icons for subjects
        const iconMap = {
            math: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            physics: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
            chemistry: 'https://cdn-icons-png.flaticon.com/512/2784/2784428.png',
            biology: 'https://cdn-icons-png.flaticon.com/512/2921/2921073.png'
        };
        
        card.innerHTML = `
            <img src="${iconMap[subject] || 'https://cdn-icons-png.flaticon.com/512/3131/3131636.png'}" alt="${subject} Icon" class="card-icon">
            <h2>${getSubjectTitle(subject)}</h2>
            <p>Practice ${getSubjectTitle(subject)} for Class ${currentClass}</p>
        `;
        card.onclick = function() { 
            selectClassSubject(subject); 
        };
        grid.appendChild(card);
    });
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
        const chapterCard = document.createElement('div');
        chapterCard.className = 'chapter-card';
        chapterCard.innerHTML = `
            <h3>${chapter.name}</h3>
            <p>Practice questions on ${chapter.name}</p>
        `;
        chapterCard.onclick = function() {
            currentChapter = chapter.name;
            displayChapterInfo();
            showPage('chapter-page');
        };
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
        if (userProgress[progressKey] && userProgress[progressKey].score >= 98) {
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
        
        if (progress) {
            if (progress.score >= 98) {
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
            if (!prevProgress || prevProgress.score < 98) {
                setStatus = 'Locked';
                cardClass = 'locked';
            }
        }
        
        // Check if questions are available
        const hasQuestions = chapterData && chapterData.sets && chapterData.sets[i] && chapterData.sets[i].length > 0;
        if (!hasQuestions) {
            setStatus = 'Coming Soon';
            cardClass = 'locked';
        }
        
        setCard.className = `set-card ${cardClass}`;
        setCard.innerHTML = `
            <div class="set-title">Set ${i + 1}</div>
            <div class="set-status">${setStatus}</div>
        `;
        
        if (cardClass !== 'locked' && hasQuestions) {
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
        alert('This set is not available yet. Please check back later.');
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
    
    // Save progress
    const progressKey = `${currentSubject}_${currentChapter}_${currentSet}`;
    userProgress[progressKey] = {
        score: results.percentage,
        timeTaken: timeTaken,
        date: new Date().toISOString(),
        answers: userAnswers.slice()
    };
    
    saveUserProgress();
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
        passed: percentage >= 98
    };
}

function displayResults(results, timeTaken) {
    // Update score display
    document.getElementById('score-percentage').textContent = `${results.percentage}%`;
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
        resultStatus.textContent = '❌ You need to score 98% or above to pass. Try again!';
        resultStatus.className = 'result-status failed';
    }
}

function retakeQuiz() {
    // If failed, select a random set that hasn't been completed
    if (!userProgress[`${currentSubject}_${currentChapter}_${currentSet}`] || 
        userProgress[`${currentSubject}_${currentChapter}_${currentSet}`].score < 98) {
        
        // Find available sets
        const availableSets = [];
        for (let i = 0; i < 5; i++) {
            const progressKey = `${currentSubject}_${currentChapter}_${i}`;
            if (!userProgress[progressKey] || userProgress[progressKey].score < 98) {
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

// ===================== UTILITY FUNCTIONS =====================
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// ===================== ERROR HANDLING =====================
window.addEventListener('error', function(event) {
    console.error('Application error:', event.error);
    alert('An error occurred. Please refresh the page and try again.');
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
    // 1. Check for App Version Update (for UI/feature changes)
    const lastVersion = localStorage.getItem('appVersion');
    if (!lastVersion) {
        localStorage.setItem('appVersion', APP_VERSION);
    } else if (lastVersion !== APP_VERSION) {
        showNotification(`App updated to version ${APP_VERSION}! Enjoy the new features.`);
        localStorage.setItem('appVersion', APP_VERSION);
        // Don't check for content on app version change to avoid multiple notifications
        localStorage.setItem('contentMap', JSON.stringify(generateContentMap()));
        return;
    }

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
        if (updatedChapters.length <= 2) {
            updatedChapters.forEach(chapterName => {
                showNotification(`New quiz available for ${chapterName}!`);
            });
        } else {
            showNotification(`${updatedChapters.length} topics have new quizzes. Check them out!`);
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
    const processChapters = (chapters, prefix) => {
        if (!chapters) return;
        chapters.forEach(chapter => {
            if (chapter && chapter.name && chapter.sets) {
                const nonEmptySets = chapter.sets.filter(set => set.length > 0).length;
                if (nonEmptySets > 0) {
                    const key = `${prefix}_${chapter.name}`;
                    contentMap[key] = { name: chapter.name, count: nonEmptySets };
                }
            }
        });
    };

    // 1. Process competitive exams
    Object.values(subjectData).forEach(subject => {
        const subjectKey = Object.keys(subjectData).find(key => subjectData[key] === subject);
        processChapters(subject?.chapters, subjectKey);
    });

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
function showNotification(message) {
    const toast = document.getElementById('notification-toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 6000); // Hide after 6 seconds
}


