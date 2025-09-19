// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to update button icon
    function updateButtonIcon() {
        if (body.classList.contains('light-mode')) {
            themeToggle.textContent = '☀️';
            themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        } else {
            themeToggle.textContent = '🌙';
            themeToggle.setAttribute('aria-label', 'Switch to light theme');
        }
    }

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }
    updateButtonIcon();

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        updateButtonIcon();

        // Save preference to localStorage
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });

    // Update status line with current time
    function updateStatus() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const statusElement = document.getElementById('est-time');
        if (statusElement) {
            statusElement.textContent = `System online | EST: ${timeString}`;
        }
    }

    // Update time every second
    updateStatus();
    setInterval(updateStatus, 1000);
});
