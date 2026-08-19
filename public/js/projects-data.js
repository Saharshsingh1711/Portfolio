export const projectsData = [
  // --- Personal Projects ---
  {
    title: 'Project Alpha',
    category: 'personal',
    status: 'deployed', // 'deployed' or 'progress'
    description: 'A full-stack application built to solve X. Coming soon.',
    tech: ['React', 'Node.js', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'Portfolio v1',
    category: 'personal',
    status: 'deployed',
    description: 'My previous developer portfolio built with basic HTML and CSS.',
    tech: ['HTML', 'CSS', 'JS'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    demoUrl: '#',
    githubUrl: '#'
  },
  
  // --- Group Projects ---
  {
    title: 'Team Collab Hub',
    category: 'group',
    status: 'progress',
    description: 'A real-time collaboration tool built with my university team. Coming soon.',
    tech: ['Next.js', 'Socket.io', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    demoUrl: '#',
    githubUrl: '#'
  },

  // --- Freelancing Projects ---
  {
    title: 'E-Commerce Store',
    category: 'freelancing',
    status: 'deployed',
    description: 'A custom e-commerce solution for a local business with integrated payment gateway.',
    tech: ['React', 'Stripe', 'Express'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    demoUrl: '#',
    githubUrl: '#'
  }
];

export function renderProjects(tab = 'personal') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = '';

  const filtered = projectsData.filter(p => p.category === tab);

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center; padding: 40px;">No projects found in this category.</p>`;
    return;
  }

  filtered.forEach((project, index) => {
    const delay = index * 0.1;
    
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${delay}s`;

    const statusHtml = project.status === 'deployed' 
      ? `<div class="project-status status-deployed"><span class="status-dot-small"></span>✅ DEPLOYED</div>`
      : `<div class="project-status status-progress"><span class="status-dot-small"></span>🔧 IN PROGRESS</div>`;

    const techHtml = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

    card.innerHTML = `
      <div class="project-image-wrapper">
        <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy" />
        <div class="project-overlay"></div>
        ${statusHtml}
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="project-tech">
          ${techHtml}
        </div>
        <div class="project-links">
          <a href="${project.demoUrl}" target="_blank" rel="noopener" class="project-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Live Demo
          </a>
          <a href="${project.githubUrl}" target="_blank" rel="noopener" class="project-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            GitHub
          </a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

export function initProjectsTabs() {
  const tabs = document.querySelectorAll('.projects-tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      
      const category = e.target.getAttribute('data-tab');
      renderProjects(category);
    });
  });

  // Initial render
  renderProjects('personal');
}
