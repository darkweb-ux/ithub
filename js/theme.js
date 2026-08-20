// js/theme.js - Theme Management

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // Initialize Theme
  const savedTheme = localStorage.getItem('it-hub-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
  }

  // Toggle Event
  themeToggle.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'dark') {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('it-hub-theme', 'light');
      themeToggle.textContent = '🌙';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('it-hub-theme', 'dark');
      themeToggle.textContent = '☀️';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
  });
});
