// js/navigation.js - Sidebar & Mobile Menu

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeSidebarBtn = document.getElementById('close-sidebar-btn');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Highlight active link based on current URL
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    // Basic match: if link href is in current path or both are root
    const linkHref = link.getAttribute('href');
    if (linkHref) {
      const isRoot = (currentPath === '/' || currentPath.endsWith('index.html')) && (linkHref === '/' || linkHref.endsWith('index.html'));
      const isPage = linkHref.includes(currentPath.split('/').pop()) && currentPath.split('/').pop() !== '';
      if (isRoot || isPage) {
        link.classList.add('active');
      }
    }
  });

  // Mobile Sidebar Toggle
  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.add('active');
    });
  }

  if (closeSidebarBtn && sidebar) {
    closeSidebarBtn.addEventListener('click', () => {
      sidebar.classList.remove('active');
    });
  }

  // Close sidebar if clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('active')) {
      if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        sidebar.classList.remove('active');
      }
    }
  });
});
