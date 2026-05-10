// Typing Effect
const texts = ['AI powered city ecosystem...', 'Smart Food & Transport...', 'Future of Urban Life...'];
let tI = 0, cI = 0, isDeleting = false;

function typeEffect() {
    const target = document.querySelector('.typing');
    if(!target) return;
    const currentText = texts[tI];
    target.textContent = isDeleting ? currentText.substring(0, cI--) : currentText.substring(0, cI++);

    if (!isDeleting && cI > currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
    } else if (isDeleting && cI === 0) {
        isDeleting = false;
        tI = (tI + 1) % texts.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}
typeEffect();

// Modal Logic
const serviceData = {
    restaurants: `<h3>Popular Restaurants:</h3><ul><li>🍕 Bella Italia - 4.5 ⭐</li><li>🍜 Faiza - 4.9 ⭐</li></ul><div class="map-placeholder">📍 Map: Searching couriers...</div>`,
    transport: `<h3>Available Transport:</h3><p>🚖 Taxi: 5 min away</p><p>🛴 Scooters: 12 nearby</p><div class="map-placeholder">🗺 Live Traffic: Clear</div>`,
    estate: `<h3>Top Listings:</h3><p>🏢 Luxury Apartment - $800/mo</p><div class="map-placeholder">🔍 Location: South side</div>`
};

function openService(title, key) {
    showModal(title, serviceData[key] || "Маалымат табылган жок.");
}

function openPlanetPage(title, desc) {
    showModal(title, `<p style="margin-bottom:20px">${desc}</p><div class="glass" style="padding:15px"><h4>Status: Active 🟢</h4></div>`);
}

function showModal(title, bodyHTML) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHTML;
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// AI Assistant
function askAI() {
    const input = document.getElementById('aiInput');
    const history = document.getElementById('chatHistory');
    if (!input.value.trim()) return;

    history.innerHTML += `<div style="margin-bottom:8px"><b>You:</b> ${input.value}</div>`;
    const text = input.value.toLowerCase();
    input.value = '';

    setTimeout(() => {
        let reply = "Кечириңиз, мен маалымат издеп жатам...";
        if (text.includes("салам")) reply = "Салам! CityLife AI сизге жардам берүүгө даяр.";
        if (text.includes("бургер")) reply = "Эң мыкты бургер 'Burger House'до. Заказ беребизби?";
        
        history.innerHTML += `<div style="color:#4da6ff; margin-bottom:8px"><b>AI:</b> ${reply}</div>`;
        history.scrollTop = history.scrollHeight;
    }, 600);
}

// Enter key for AI
document.getElementById('aiInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        askAI();
    }
});

// Theme Toggle
const themeBtn = document.getElementById('themeToggle');
themeBtn.onclick = () => {
    document.body.classList.toggle('light');
    themeBtn.textContent = document.body.classList.contains('light') ? '☀️ Light Mode' : '🌙 Dark Mode';
};

// Analytics
const ctx = document.getElementById('analyticsChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['8:00', '12:00', '16:00', '20:00', '00:00'],
        datasets: [{
            data: [20, 80, 60, 100, 30],
            borderColor: '#4da6ff',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(77, 166, 255, 0.1)'
        }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
});

// Pomodoro
let timerInterval;
let timeLeft = 1500;
function startPomodoro() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        let min = Math.floor(timeLeft / 60);
        let sec = timeLeft % 60;
        document.getElementById('timer').textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
        if (timeLeft <= 0) clearInterval(timerInterval);
    }, 1000);
}

// Tasks
function addTask() {
    const val = document.getElementById('taskInput').value;
    if (val) {
        const li = document.createElement('li');
        li.textContent = `• ${val}`;
        document.getElementById('taskList').appendChild(li);
        document.getElementById('taskInput').value = '';
    }
}

// Utils
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('active');
    });
});

window.addEventListener('mousemove', e => {
    const glow = document.querySelector('.cursor-glow');
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});