// onboarding.js - Interactive tutorial and goal setting

const QuizifyOnboarding = {
    _app: null,
    
    init(app) {
        this._app = app;
        
        // Wait for DOM
        setTimeout(() => {
            this.checkAndStartOnboarding();
        }, 1000);
    },
    
    checkAndStartOnboarding() {
        const completed = localStorage.getItem('onboardingCompleted');
        // Only run once
        if (completed === 'true') return;
        
        this.startTutorial();
    },
    
    startTutorial() {
        const overlay = document.createElement('div');
        overlay.id = 'onboarding-overlay';
        overlay.innerHTML = `
            <div class="onboarding-modal">
                <div class="onboarding-step" id="onboard-step-1">
                    <h2>👋 Welcome to Quizify!</h2>
                    <p>Your interactive learning companion. Let's get you set up.</p>
                    <button class="btn btn--primary" onclick="QuizifyOnboarding.nextStep(2)">Get Started</button>
                </div>
                
                <div class="onboarding-step" id="onboard-step-2" style="display:none;">
                    <h2>🎯 What's your goal?</h2>
                    <p>Help us personalize your experience.</p>
                    <select id="onboard-goal" class="form-control" style="margin-bottom: 15px;">
                        <option value="exams">School Exams</option>
                        <option value="competitive">Competitive Tests (JEE, NEET)</option>
                        <option value="general">General Knowledge & Fun</option>
                    </select>
                    <button class="btn btn--primary" onclick="QuizifyOnboarding.nextStep(3)">Next</button>
                </div>
                
                <div class="onboarding-step" id="onboard-step-3" style="display:none;">
                    <h2>🚀 You're all set!</h2>
                    <p>Explore quizzes, earn XP, complete quests, and climb the leaderboard.</p>
                    <button class="btn btn--success" onclick="QuizifyOnboarding.finishTutorial()">Start Learning</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        
        // Style added dynamically for simplicity, though best placed in styles.css
        const style = document.createElement('style');
        style.innerHTML = `
            #onboarding-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
                z-index: 10000; display: flex; align-items: center; justify-content: center;
                animation: fadeIn 0.3s;
            }
            .onboarding-modal {
                background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
                border: 1px solid rgba(255,255,255,0.2);
                padding: 40px; border-radius: 20px;
                text-align: center; max-width: 400px; width: 90%;
            }
            .onboarding-step h2 { margin-bottom: 15px; font-size: 1.5rem; }
            .onboarding-step p { margin-bottom: 25px; color: rgba(255,255,255,0.8); }
            #onboard-goal {
                width: 100%; padding: 10px 14px; border-radius: 10px;
                background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
                color: #fff; font-size: 0.95rem; margin-bottom: 15px;
                appearance: none; -webkit-appearance: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
                background-repeat: no-repeat; background-position: right 12px center;
                cursor: pointer;
            }
            #onboard-goal option { background: #1e1e2e; color: #fff; }
        `;
        document.head.appendChild(style);
    },
    
    nextStep(stepNumber) {
        document.querySelectorAll('.onboarding-step').forEach(el => el.style.display = 'none');
        const nextEl = document.getElementById('onboard-step-' + stepNumber);
        if (nextEl) nextEl.style.display = 'block';
    },
    
    finishTutorial() {
        const goalEl = document.getElementById('onboard-goal');
        const goal = goalEl ? goalEl.value : (localStorage.getItem('userFocus') || 'competitive');
        localStorage.setItem('userFocus', goal);
        localStorage.setItem('onboardingCompleted', 'true');
        
        // Update home mode if possible
        if (this._app && typeof setHomeMode === 'function') {
            setHomeMode(goal);
        }
        
        const overlay = document.getElementById('onboarding-overlay');
        if (overlay) overlay.remove();
        
        // Show welcome notification
        if (this._app && this._app.showNotification) {
            this._app.showNotification('Tutorial completed! Enjoy Quizify.', 'success');
        }
    }
};

window.QuizifyOnboarding = QuizifyOnboarding;
