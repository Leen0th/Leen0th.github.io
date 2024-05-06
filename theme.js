document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to toggle dark mode
    function toggleDarkMode() {
        body.classList.toggle('dark-theme');
        const darkModeEnabled = body.classList.contains('dark-theme');
        localStorage.setItem('darkModeEnabled', darkModeEnabled);

        // Toggle theme icon and logo based on dark mode state
        const themeIcon = document.getElementById('theme-icon');
        const logoLight = document.querySelector('.logo-light');
        const logoDark = document.querySelector('.logo-dark');
        if (darkModeEnabled) {
            themeIcon.src = 'images/moon.png';
            themeIcon.alt = 'Switch to Light Theme';
            logoLight.style.display = 'none';
            logoDark.style.display = 'block';
        } else {
            themeIcon.src = 'images/sun.png';
            themeIcon.alt = 'Switch to Dark Theme';
            logoLight.style.display = 'block';
            logoDark.style.display = 'none';
        }
    }

    // Event listener for theme toggle button
    themeToggle.addEventListener('click', toggleDarkMode);

    // Check local storage for previously selected mode
    const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
    if (darkModeEnabled) {
        body.classList.add('dark-theme');
        // Update theme icon and logo based on dark mode state
        const themeIcon = document.getElementById('theme-icon');
        const logoLight = document.querySelector('.logo-light');
        const logoDark = document.querySelector('.logo-dark');
        themeIcon.src = 'images/moon.png';
        themeIcon.alt = 'Switch to Light Theme';
        logoLight.style.display = 'none';
        logoDark.style.display = 'block';
    }
});




