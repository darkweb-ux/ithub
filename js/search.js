// js/search.js - Modern Command Palette Search

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('palette-overlay');
  const input = document.getElementById('palette-input');
  const resultsContainer = document.getElementById('palette-results');
  const triggers = document.querySelectorAll('.search-trigger');
  
  if (!overlay || !input || !resultsContainer) return;

  const { topics, categories, commands, glossary } = window.knowledgeData;
  let selectedIndex = 0;
  let currentResults = [];

  // Open Palette
  function openPalette() {
    overlay.classList.add('active');
    input.value = '';
    renderDefaultView();
    setTimeout(() => input.focus(), 50);
    document.body.style.overflow = 'hidden';
  }

  // Close Palette
  function closePalette() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggers.forEach(t => t.addEventListener('click', openPalette));

  // Global Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openPalette();
    }
    if (e.key === '/' && !overlay.classList.contains('active') && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      openPalette();
    }
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closePalette();
    }
  });

  // Close on outside click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePalette();
  });

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (query.length < 2) {
      renderDefaultView();
      return;
    }
    performSearch(query);
  });

  input.addEventListener('keydown', (e) => {
    const items = resultsContainer.querySelectorAll('.palette-item');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % items.length;
      updateSelection(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
      updateSelection(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (items[selectedIndex]) {
        items[selectedIndex].click();
      }
    }
  });

  function updateSelection(items) {
    items.forEach((item, idx) => {
      if (idx === selectedIndex) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('selected');
      }
    });
  }

  function renderDefaultView() {
    currentResults = [];
    resultsContainer.innerHTML = `
      <div class="palette-group-title">Suggestions</div>
      <div class="palette-item" onclick="window.location.href='pages/topics.html'">
        <div class="palette-item-title">Explore all topics</div>
        <div class="palette-item-desc">Browse the full knowledge base</div>
      </div>
      <div class="palette-item" onclick="window.location.href='pages/commands.html'">
        <div class="palette-item-title">Command Center</div>
        <div class="palette-item-desc">CLI reference</div>
      </div>
    `;
    // Fix relative links if on subpage
    const isRoot = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');
    if (!isRoot) {
      resultsContainer.querySelectorAll('.palette-item').forEach(el => {
        const onclick = el.getAttribute('onclick');
        if (onclick) {
          el.setAttribute('onclick', onclick.replace("'pages/", "'"));
        }
      });
    }
    selectedIndex = 0;
  }

  function performSearch(query) {
    let html = '';
    let resultCount = 0;
    
    // Topics
    const matchedTopics = topics.filter(t => 
      t.title.toLowerCase().includes(query) || 
      t.desc.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query)
    );

    if (matchedTopics.length > 0) {
      html += `<div class="palette-group-title">Topics</div>`;
      matchedTopics.slice(0, 4).forEach(t => {
        html += `
          <div class="palette-item" data-type="topic" data-id="${t.id}">
            <div class="palette-item-title">${t.icon} ${t.title}</div>
            <div class="palette-item-desc">${t.category} • ${t.difficulty}</div>
          </div>
        `;
        resultCount++;
      });
    }

    // Commands
    const matchedCmds = commands.filter(c => 
      c.cmd.toLowerCase().includes(query) || 
      c.desc.toLowerCase().includes(query)
    );

    if (matchedCmds.length > 0) {
      html += `<div class="palette-group-title">Commands</div>`;
      matchedCmds.slice(0, 3).forEach(c => {
        html += `
          <div class="palette-item" data-type="command">
            <div class="palette-item-title" style="font-family: var(--font-mono)">${c.cmd}</div>
            <div class="palette-item-desc">${c.desc}</div>
          </div>
        `;
        resultCount++;
      });
    }

    // Glossary
    const matchedGlossary = glossary.filter(g => 
      g.term.toLowerCase().includes(query)
    );

    if (matchedGlossary.length > 0) {
      html += `<div class="palette-group-title">Glossary</div>`;
      matchedGlossary.slice(0, 3).forEach(g => {
        html += `
          <div class="palette-item" data-type="glossary">
            <div class="palette-item-title">${g.term}</div>
            <div class="palette-item-desc">${g.definition}</div>
          </div>
        `;
        resultCount++;
      });
    }

    if (resultCount === 0) {
      html = `
        <div class="palette-item" style="cursor:default">
          <div class="palette-item-title">No results found for "${query}"</div>
          <div class="palette-item-desc">Try a different search term</div>
        </div>
      `;
    }

    resultsContainer.innerHTML = html;
    selectedIndex = 0;
    const items = resultsContainer.querySelectorAll('.palette-item');
    if (items.length > 0 && resultCount > 0) updateSelection(items);

    // Bind click events
    items.forEach((item, idx) => {
      item.addEventListener('mouseenter', () => {
        selectedIndex = idx;
        updateSelection(items);
      });
      
      item.addEventListener('click', () => {
        const type = item.getAttribute('data-type');
        closePalette();
        
        const isRoot = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');
        const prefix = isRoot ? 'pages/' : '';

        if (type === 'topic') {
          const id = item.getAttribute('data-id');
          if (typeof window.openTopicModal === 'function') {
            window.openTopicModal(id);
          } else {
            window.location.href = prefix + 'topics.html?topic=' + id;
          }
        } else if (type === 'command') {
          window.location.href = prefix + 'commands.html';
        } else if (type === 'glossary') {
          window.location.href = prefix + 'glossary.html';
        }
      });
    });
  }
});
