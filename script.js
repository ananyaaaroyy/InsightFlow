// --- Authentication Simulation ---
const toggleModal = (id, show) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('active', show);
};

const showGoogleAccountSelector = () => toggleModal('google-modal', true);
const openCreationModal = () => toggleModal('creation-modal', true);
const closeCreationModal = () => toggleModal('creation-modal', false);

const simulateGoogleLogin = (name, email) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);
    window.location.assign('welcome.html');
};

const toggleMobileMenu = () => {
    const nav = document.getElementById('main-nav-links');
    if (nav) nav.classList.toggle('active');
};

const toggleDropdown = (e) => {
    e.preventDefault();
    const dropdown = e.target.closest('.dropdown');
    document.querySelectorAll('.dropdown').forEach(d => {
        if (d !== dropdown) d.classList.remove('active');
    });
    if (dropdown) dropdown.classList.toggle('active');
};

const handleSocialLogin = (provider) => provider === 'Google' ? showGoogleAccountSelector() : window.location.assign('welcome.html');

// --- Survey Logic ---
let surveys = JSON.parse(localStorage.getItem('surveys') || '[]');
let surveyCount = 2 + surveys.length;
let selectedOption = null;

const saveSurveys = () => localStorage.setItem('surveys', JSON.stringify(surveys));

const addAnswerInput = () => {
    const container = document.getElementById('answers-container');
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.gap = '8px';
    div.style.marginBottom = '8px';
    div.innerHTML = `
        <input type="text" class="survey-answer-input" placeholder="New Option">
        <button class="btn-secondary" style="padding: 0 12px;" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(div);
};

const openSurvey = (title, question, options) => {
    document.getElementById('survey-view-title').innerText = title;
    document.getElementById('survey-view-question').innerText = `Q: ${question}`;

    const container = document.getElementById('options-view-container');
    container.innerHTML = '';
    selectedOption = null;

    options.forEach(opt => {
        const div = document.createElement('div');
        div.className = 'option-item';
        div.innerText = opt;
        div.onclick = () => selectOption(div);
        container.appendChild(div);
    });

    toggleModal('take-survey-modal', true);
};

const selectOption = (el) => {
    document.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');
    selectedOption = el.innerText;
};

const submitVote = () => {
    if (!selectedOption) return alert('Please select an option!');
    alert(`Thank you for voting! You selected: ${selectedOption}`);
    toggleModal('take-survey-modal', false);
};

const renderSurveyCard = (title, question, answers, isNew = false) => {
    const container = document.getElementById('surveys-container');
    const card = document.createElement('div');
    card.className = 'survey-card';
    card.style.cursor = 'pointer';

    card.onclick = () => openSurvey(title, question, answers);

    card.innerHTML = `
        <div class="survey-tag" style="background:${isNew ? '#f1f5f9' : '#e0f2fe'}; color:${isNew ? '#475569' : '#0369a1'};">${isNew ? 'NEW' : 'RESEARCH'}</div>
        <div class="survey-title">${title}</div>
        <div class="survey-question" style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 10px;">Q: ${question}</div>
        <div class="survey-stats">📊 0 Responses • ${answers.length} Options</div>
    `;
    container.prepend(card);
};

const createNewSurvey = () => {
    const title = document.getElementById('new-survey-title').value;
    const question = document.getElementById('new-survey-question').value;
    const answerInputs = document.querySelectorAll('.survey-answer-input');
    const answers = Array.from(answerInputs).map(input => input.value).filter(val => val.trim() !== '');

    if (!title) return alert('Title required!');
    if (!question) return alert('Question required!');
    if (answers.length < 2) return alert('At least 2 answer options are required!');

    const newSurvey = { title, question, answers };
    surveys.push(newSurvey);
    saveSurveys();

    renderSurveyCard(title, question, answers, true);

    if (document.getElementById('total-surveys-count')) {
        document.getElementById('total-surveys-count').innerText = ++surveyCount;
    }

    // Reset form
    document.getElementById('new-survey-title').value = '';
    document.getElementById('new-survey-question').value = '';
    document.getElementById('answers-container').innerHTML = `
        <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <input type="text" class="survey-answer-input" placeholder="Option 1">
            <button class="btn-secondary" style="padding: 0 12px;" onclick="this.parentElement.remove()">×</button>
        </div>
        <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <input type="text" class="survey-answer-input" placeholder="Option 2">
            <button class="btn-secondary" style="padding: 0 12px;" onclick="this.parentElement.remove()">×</button>
        </div>
    `;

    closeCreationModal();
};

// --- Core Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const path = window.location.pathname.split('/').pop() || 'index.html';

    // UI Updates
    document.querySelectorAll('.auth-required').forEach(el => el.style.display = isLoggedIn ? 'block' : 'none');
    document.querySelectorAll('.guest-only').forEach(el => el.style.display = isLoggedIn ? 'none' : 'block');

    if (isLoggedIn && (path === 'login.html' || path === 'signup.html')) window.location.assign('dashboard.html');

    if (path === 'dashboard.html' && isLoggedIn) {
        // Render saved surveys
        surveys.forEach(s => renderSurveyCard(s.title, s.question, s.answers, true));

        if (document.getElementById('total-surveys-count')) {
            document.getElementById('total-surveys-count').innerText = surveyCount;
        }

        // Make existing hardcoded cards clickable
        const existingCards = document.querySelectorAll('.survey-card');
        existingCards.forEach(card => {
            if (!card.onclick) { // Don't overwrite if already set by renderSurveyCard
                card.style.cursor = 'pointer';
                const titleElement = card.querySelector('.survey-title');
                if (titleElement) {
                    const title = titleElement.innerText;
                    const question = "Market Research Survey";
                    const options = ["Highly Likely", "Likely", "Neutral", "Unlikely"];
                    card.onclick = () => openSurvey(title, question, options);
                }
            }
        });
    }

    // Backgrounds
    const bg = document.getElementById('cinematic-bg');
    if (bg) {
        const img = new Image();
        img.src = (path === 'login.html' || path === 'signup.html')
            ? 'assets/images/auth.jpg'
            : 'assets/images/hero.jpg';
        img.className = 'bg-cinematic-img';
        img.onload = () => { img.classList.add('loaded'); bg.appendChild(img); };
    }
});

// Event Listeners
window.addEventListener('click', (e) => {
    if (e.target.id === 'google-modal') toggleModal('google-modal', false);
    if (e.target.id === 'creation-modal') toggleModal('creation-modal', false);
    if (e.target.id === 'take-survey-modal') toggleModal('take-survey-modal', false);
});

const handleLoginFormSubmit = (e, url) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    window.location.assign(url);
};

const lForm = document.getElementById('login-form');
const dForm = document.getElementById('dashboard-login-form');
if (lForm) lForm.addEventListener('submit', e => handleLoginFormSubmit(e, 'dashboard.html'));
if (dForm) dForm.addEventListener('submit', e => handleLoginFormSubmit(e, 'welcome.html'));

const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.assign('index.html');
};


