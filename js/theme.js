// js/theme.js - Theme Management

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // Initialize Theme
  const savedTheme = localStorage.getItem('it-hub-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const sunIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = sunIcon;
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    themeToggle.innerHTML = moonIcon;
    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
  }

  // Toggle Event
  themeToggle.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'dark') {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('it-hub-theme', 'light');
      themeToggle.innerHTML = moonIcon;
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('it-hub-theme', 'dark');
      themeToggle.innerHTML = sunIcon;
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
  });
});
