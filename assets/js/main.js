// Update last updated date dynamically
function initializeDate() {
    const lastUpdated = document.getElementById('last-updated');
    if (!lastUpdated) return;

    const now = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    const formattedDate = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    lastUpdated.textContent = `Last updated: ${formattedDate}`;
}

// Theme toggle functions
function setDayMode() {
    document.documentElement.style.setProperty('--primary-bg', '#f5f7fa');
    document.documentElement.style.setProperty('--secondary-bg', '#ffffff');
    document.documentElement.style.setProperty('--accent', '#2563eb');
    document.documentElement.style.setProperty('--accent-soft', '#3b82f6');
    document.documentElement.style.setProperty('--text-primary', '#22223b');
    document.documentElement.style.setProperty('--text-secondary', '#4b5563');
    document.documentElement.style.setProperty('--text-muted', '#6b7280');
    document.documentElement.style.setProperty('--border', '#e5e7eb');
}

function setNightMode() {
    document.documentElement.style.setProperty('--primary-bg', '#0a0e17');
    document.documentElement.style.setProperty('--secondary-bg', '#111827');
    document.documentElement.style.setProperty('--accent', '#3b82f6');
    document.documentElement.style.setProperty('--accent-soft', '#60a5fa');
    document.documentElement.style.setProperty('--text-primary', '#e5e7eb');
    document.documentElement.style.setProperty('--text-secondary', '#9ca3af');
    document.documentElement.style.setProperty('--text-muted', '#6b7280');
    document.documentElement.style.setProperty('--border', '#1f2937');
}

function updateToggleUI(day) {
    const slider = document.getElementById('toggle-slider');
    const label = document.getElementById('toggle-label');

    if (!slider || !label) return;

    // 滑块宽18px，按钮宽44px，内边距2px，滑块初始left:2px
    // 右侧极限位置 = 44 - 2 - 18 = 24px，但由于初始left:2px，所以translateX = 22px
    if (day) {
        slider.style.transform = 'translateX(20px) translateY(-50%)';
        label.textContent = 'off';
        label.style.color = '#fab300';
    } else {
        slider.style.transform = 'translateX(0) translateY(-50%)';
        label.textContent = 'on';
        label.style.color = '#3b82f6';
    }
}

// Initialize theme toggle
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    let isDay = false;

    // Check if system prefers light mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Initialize theme based on localStorage or system preference
    const savedTheme = localStorage.getItem('themeMode');
    if (savedTheme === 'day') {
        setDayMode();
        isDay = true;
        updateToggleUI(true);
    } else if (savedTheme === 'night') {
        setNightMode();
        isDay = false;
        updateToggleUI(false);
    } else {
        // No saved preference, use system preference
        if (prefersDarkMode) {
            setNightMode();
            isDay = false;
            updateToggleUI(false);
        } else {
            setDayMode();
            isDay = true;
            updateToggleUI(true);
        }
    }

    // Add click event listener
    themeToggle.addEventListener('click', () => {
        isDay = !isDay;
        if (isDay) {
            setDayMode();
            localStorage.setItem('themeMode', 'day');
            updateToggleUI(true);
        } else {
            setNightMode();
            localStorage.setItem('themeMode', 'night');
            updateToggleUI(false);
        }
    });
}

// Set active navigation link
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeDate();
    initializeThemeToggle();
    setActiveNav();
});
