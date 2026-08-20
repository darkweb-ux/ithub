# MJ Solutions

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