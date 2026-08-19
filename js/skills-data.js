export const skillsData = [
  // Frontend
  { name: 'HTML', icon: '🌐', domain: 'frontend', level: 'Expert' },
  { name: 'CSS', icon: '🎨', domain: 'frontend', level: 'Expert' },
  { name: 'JavaScript', icon: '⚡', domain: 'frontend', level: 'Advanced' },
  { name: 'React.js', icon: '⚛️', domain: 'frontend', level: 'Advanced' },
  { name: 'Next.js', icon: '▲', domain: 'frontend', level: 'Intermediate' },
  { name: 'Tailwind CSS', icon: '💨', domain: 'frontend', level: 'Advanced' },
  { name: 'Bootstrap', icon: '🅱️', domain: 'frontend', level: 'Advanced' },
  { name: 'Three.js', icon: '🧊', domain: 'frontend', level: 'Intermediate' },
  
  // Backend
  { name: 'Node.js', icon: '🟢', domain: 'backend', level: 'Advanced' },
  { name: 'Express.js', icon: '🚂', domain: 'backend', level: 'Advanced' },
  { name: 'Python', icon: '🐍', domain: 'backend', level: 'Intermediate' },
  { name: 'Java', icon: '☕', domain: 'backend', level: 'Intermediate' },
  
  // Database
  { name: 'MongoDB', icon: '🍃', domain: 'database', level: 'Advanced' },
  { name: 'SQL', icon: '🗃️', domain: 'database', level: 'Advanced' },
  { name: 'PostgreSQL', icon: '🐘', domain: 'database', level: 'Intermediate' },
  
  // Cloud & DevOps
  { name: 'AWS', icon: '☁️', domain: 'cloud', level: 'Intermediate' },
  { name: 'Google Cloud', icon: '🌩️', domain: 'cloud', level: 'Intermediate' },
  
  // AI & Intelligence
  { name: 'AI Agents', icon: '🤖', domain: 'ai', level: 'Learning' },
  { name: 'Model APIs', icon: '🧠', domain: 'ai', level: 'Intermediate' }
];

export function renderSkills(filter = 'all') {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  grid.innerHTML = ''; // Clear current grid

  const filtered = filter === 'all' 
    ? skillsData 
    : skillsData.filter(s => s.domain === filter);

  filtered.forEach((skill, index) => {
    const delay = index * 0.05; // Staggered animation
    
    const hex = document.createElement('div');
    hex.className = 'skill-hex';
    hex.style.animationDelay = `${delay}s`;
    
    hex.innerHTML = `
      <div class="skill-tooltip">${skill.level}</div>
      <div class="skill-icon">${skill.icon}</div>
      <div class="skill-name">${skill.name}</div>
    `;
    
    grid.appendChild(hex);
  });
}

export function initSkillsFilter() {
  const buttons = document.querySelectorAll('.skills-filter');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Update active state
      buttons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      // Render filtered grid
      const filter = e.target.getAttribute('data-filter');
      renderSkills(filter);
    });
  });

  // Initial render
  renderSkills('all');
}
