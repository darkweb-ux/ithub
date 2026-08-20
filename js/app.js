// js/app.js - Main Application Logic (Rendering components)

document.addEventListener('DOMContentLoaded', () => {
  const { categories, topics, paths, commands, glossary } = window.knowledgeData;

  // 1. Render Categories (Dashboard)
  const categoryGrid = document.getElementById('category-grid');
  if (categoryGrid) {
    categoryGrid.innerHTML = categories.map(cat => `
      <a href="pages/topics.html" class="category-card">
        <div class="cat-icon-container">${cat.icon}</div>
        <h3 class="cat-title">${cat.name}</h3>
        <p class="cat-desc">${cat.desc}</p>
        <div class="cat-footer">
          <span>${cat.count} Topics</span>
          <span class="cat-arrow">→</span>
        </div>
      </a>
    `).join('');
  }

  // Popular Topics (Mocked from first few topics for demo)
  const popularGrid = document.getElementById('popular-grid');
  if (popularGrid) {
    popularGrid.innerHTML = topics.slice(0, 4).map(topic => `
      <div class="horizontal-card" onclick="window.openTopicModal('${topic.id}')">
        <div class="hc-left">
          <div class="hc-title">${topic.title}</div>
          <div class="hc-meta">${topic.category} • ${topic.difficulty}</div>
        </div>
        <div class="hc-arrow" style="color: var(--color-primary); font-weight: bold;">→</div>
      </div>
    `).join('');
  }

  // 2. Render Topics
  const topicGrid = document.getElementById('topic-grid');
  if (topicGrid) {
    topicGrid.innerHTML = topics.map(topic => `
      <div class="category-card" onclick="window.openTopicModal('${topic.id}')">
        <div class="cat-icon-container">${topic.icon}</div>
        <h3 class="cat-title">${topic.title}</h3>
        <p class="cat-desc">${topic.desc}</p>
        <div class="cat-footer">
          <span class="badge badge-outline">${topic.difficulty}</span>
          <span class="cat-arrow">Learn More →</span>
        </div>
      </div>
    `).join('');
  }

  // 3. Render Paths
  const pathsGrid = document.getElementById('paths-grid');
  if (pathsGrid) {
    pathsGrid.innerHTML = paths.map(path => {
      // Fake progress for frontend demo
      const progress = path.level === 'Beginner' ? 25 : 0;
      return `
      <div class="path-card">
        <div class="path-header">
          <h3 class="path-title">${path.title}</h3>
          <span class="badge badge-info">${path.level}</span>
        </div>
        <div class="progress-container">
          <div class="progress-header">
            <span>Progress</span>
            <span>${progress}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
        <div class="path-meta" style="margin-bottom: 1.5rem">
          <span>${path.topicsCount} Topics</span> • <span>${path.time}</span>
        </div>
        <button class="btn btn-primary" style="width: 100%;">Start Learning →</button>
      </div>
    `}).join('');
  }

  // 4. Render Glossary
  const glossaryGrid = document.getElementById('glossary-grid');
  if (glossaryGrid) {
    glossaryGrid.innerHTML = glossary.map(item => `
      <div class="category-card" style="padding: 1.5rem">
        <div class="cat-title" style="color: var(--color-primary)">${item.term}</div>
        <div class="cat-desc" style="margin-bottom:0">${item.definition}</div>
      </div>
    `).join('');
  }

  // 5. Render Commands
  const commandsGrid = document.getElementById('commands-grid');
  if (commandsGrid) {
    commandsGrid.innerHTML = commands.map((cmd, idx) => `
      <div class="cmd-card">
        <div class="cmd-header">
          <span class="badge badge-outline">${cmd.category}</span>
        </div>
        <p class="cmd-desc">${cmd.desc}</p>
        <div class="cmd-block">
          <code id="cmd-text-${idx}">${cmd.cmd}</code>
          <button class="cmd-copy" onclick="copyCommand('cmd-text-${idx}', this)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy
          </button>
        </div>
      </div>
    `).join('');
  }

  // --- Copy Logic ---
  window.copyCommand = function(textElementId, btnElement) {
    const text = document.getElementById(textElementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
      const originalHTML = btnElement.innerHTML;
      btnElement.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
      btnElement.classList.add('copied');
      setTimeout(() => {
        btnElement.innerHTML = originalHTML;
        btnElement.classList.remove('copied');
      }, 2000);
    });
  };

  // --- Slide-over Modal Logic ---
  const slideOverlay = document.getElementById('slide-over');
  const slideContent = document.getElementById('slide-content');
  const slideTitle = document.getElementById('slide-title');
  const slideMeta = document.getElementById('slide-meta');

  window.openTopicModal = function(id) {
    if (!slideOverlay || !slideContent) return;
    
    const topic = topics.find(t => t.id === id);
    if (!topic) return;

    if (slideTitle) slideTitle.innerHTML = `${topic.icon} ${topic.title}`;
    if (slideMeta) slideMeta.innerHTML = `<span class="badge badge-outline">${topic.category}</span><span class="badge badge-info">${topic.difficulty}</span>`;

    let html = `
      <div class="prose">
        <div class="tab-pane active" id="tab-overview">
          <h3>Overview</h3>
          <p>${topic.content.overview}</p>
          
          <h3>Why it matters</h3>
          <p>${topic.content.whyItMatters}</p>
          
          <h3>How it works</h3>
          <p>${topic.content.howItWorks}</p>
          
          <h3>Key Concepts</h3>
          <ul>
            ${topic.content.keyConcepts.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>
        
        <div class="tab-pane" id="tab-architecture">
    `;

    if (topic.visualFlow) {
      // Mock visual flow using arch diagrams
      const nodes = topic.visualFlow.split('→').map(s => s.trim());
      html += `
          <h3>Architecture Flow</h3>
          <div class="arch-diagram" style="flex-direction: column; gap: 1rem; align-items: center; margin: 2rem 0; background: var(--color-surface-hover); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--color-border);">
            ${nodes.map((node, i) => `
              <div class="arch-node ${i === 0 || i === nodes.length -1 ? 'accent' : ''}">${node}</div>
              ${i < nodes.length - 1 ? '<div style="color: var(--color-border-hover);">↓</div>' : ''}
            `).join('')}
          </div>
      `;
    } else {
      html += `<p>No architecture flow available for this topic.</p>`;
    }

    html += `
        </div>
        
        <div class="tab-pane" id="tab-security">
          <h3>Security Considerations</h3>
          <ul>
            ${topic.content.security.map(c => `<li>${c}</li>`).join('')}
          </ul>
          <h3>Best Practices</h3>
          <ul>
            ${topic.content.bestPractices.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    slideContent.innerHTML = html;
    
    // Reset tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.tab-btn[data-target="tab-overview"]').classList.add('active');

    slideOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeTopicModal = function() {
    if (slideOverlay) {
      slideOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  const closeBtn = document.getElementById('close-slide');
  if (closeBtn) closeBtn.addEventListener('click', closeTopicModal);
  
  if (slideOverlay) {
    slideOverlay.addEventListener('click', (e) => {
      if (e.target === slideOverlay) closeTopicModal();
    });
  }

  // Tab switching logic
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(btn.getAttribute('data-target')).classList.add('active');
    });
  });

  // Handle URL parameters for opening modal directly
  const urlParams = new URLSearchParams(window.location.search);
  const topicId = urlParams.get('topic');
  if (topicId) {
    setTimeout(() => {
      if (typeof window.openTopicModal === 'function') {
        window.openTopicModal(topicId);
      }
    }, 100);
  }
});
