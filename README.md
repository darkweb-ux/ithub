# IT Knowledge Hub

An Enterprise IT Knowledge Platform covering AI, LLMs, Networking, Firewalls, Servers, Cloud, Cybersecurity, IT Operations, and ITSM.

**Tagline:** Learn • Explore • Build • Share

**Created by:** Mayur Talsaniya
**Email:** mayurtalsania3@gmail.com

---

## Architecture & Vision

This platform is currently built as a high-performance, single-page application and static site suitable for deployment on **GitHub Pages**. 

However, it is engineered with a **5-year CTO product strategy**:
- **Data-Driven Frontend:** All topics, commands, glossary items, and paths are stored in centralized JavaScript data structures (`js/data.js`). This avoids HTML duplication and allows seamless migration to a REST API or GraphQL backend in the future.
- **Backend-Ready UI:** The frontend architecture supports future implementation of User Authentication, Admin Panels, Comments, Ratings, and Role-Based Access Control (RBAC).

---

## Tech Stack

* HTML5 (Semantic Structure)
* CSS3 (Custom Variables, Flexbox/Grid, Responsive Design)
* Vanilla JavaScript (DOM manipulation, Search, Modals, LocalStorage)

*No external libraries, frameworks (React/Vue/Angular), or CSS libraries (Tailwind/Bootstrap) were used.*

---

## Project Structure

```text
it-knowledge-hub/
│
├── index.html
│
├── pages/
│   ├── topics.html
│   ├── tutorials.html
│   ├── commands.html
│   ├── glossary.html
│   └── about.html
│
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── components.css
│
├── js/
│   ├── app.js
│   ├── data.js
│   ├── search.js
│   ├── theme.js
│   └── navigation.js
│
├── assets/
│   └── icons/
│
└── README.md
```

---

## Complete QA Test Plan

**Role:** Director of QA

### 1. Functional Testing
* **Sidebar Navigation:** Verify that clicking sidebar links navigates correctly and highlights the active state.
* **Header Navigation:** Test global search functionality, mobile menu toggle, and dark/light mode persistence.
* **Search / API Readiness:** 
  * Test valid searches (e.g., "RAG", "Firewall").
  * Test uppercase/lowercase and partial keyword matching.
  * Verify "No results found" professional empty state.
* **Category Filtering:** Ensure category cards route to the topic index.
* **Topic Modal:** Verify clicking "Learn More" dynamically populates the reusable modal overlay from `data.js`.
* **Learning Paths:** Ensure structured curriculums render correctly and UI flows naturally.
* **Commands / Glossary:** Validate data binding for dictionaries and code snippets.
* **Dark Mode:** Verify `localStorage` securely persists user preference across page reloads.

### 2. UI Testing
* **Alignment & Typography:** Ensure enterprise-grade typography (Inter / Fira Code), consistent spacing, and readable contrast ratios.
* **Cards & Buttons:** Test hover states, borders, and shadows for visual hierarchy.
* **Theme Switching:** Check both Light and Dark mode for contrast and legibility across all components.

### 3. Responsive Testing
* Tested Breakpoints: `320px`, `375px`, `414px`, `768px`, `1024px`, `1440px`, `1920px`.
* Desktop: Fixed Sidebar + Header + Content.
* Tablet (768px): Sidebar transitions to an off-canvas drawer.
* Mobile (414px): Search input hides/shrinks, Grid collapses to 1 column, font sizes scale gracefully. No horizontal overflow.

### 4. Accessibility Testing (a11y)
* Keyboard navigation via `Tab` works smoothly through the sidebar, search, and content cards.
* ARIA labels are present on icon buttons (Theme toggle, Mobile menu, Modal close).
* Semantic HTML5 regions (`<main>`, `<aside>`, `<header>`, `<footer>`) are used heavily.
* Sufficient color contrast validated for WCAG AA compliance.

### 5. Security Testing (Cybersecurity Architect Review)
* **XSS Validation:** The search function avoids unsafe `innerHTML` evaluation of raw user input where possible. No `eval()` is used.
* **LocalStorage:** Used only for safe configuration flags (`it-hub-theme`). No sensitive tokens or PII are stored client-side.
* **Component Isolation:** External links (if added) default to using `rel="noopener noreferrer"`.
* **Static Assets:** No exposed API keys, no hidden credentials in the source code.

### 6. Deployment Validation (GitHub Pages)
* All CSS and JS assets use relative paths (`../css/style.css`) to ensure compatibility with GitHub Pages subfolder routing.
* Refreshing any HTML file directly loads assets without 404 errors.
* No console warnings or script execution errors.
