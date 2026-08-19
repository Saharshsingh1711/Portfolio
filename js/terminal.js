// js/terminal.js
import { GameSystem } from './gamification.js';

export function initTerminal() {
  const toggleBtn = document.getElementById('terminal-toggle');
  const overlay = document.getElementById('terminal-overlay');
  const closeBtn = document.getElementById('terminal-close');
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  const body = document.getElementById('terminal-body');

  if (!toggleBtn || !overlay || !input) return;

  const toggleTerminal = () => {
    overlay.classList.toggle('hidden');
    if (!overlay.classList.contains('hidden')) {
      input.focus();
      GameSystem.awardXP(5, 'open_terminal', 'Terminal Accessed');
    }
  };

  toggleBtn.addEventListener('click', toggleTerminal);
  closeBtn.addEventListener('click', toggleTerminal);

  // Close on click outside
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) toggleTerminal();
  });

  const commands = {
    help: () => `
      <span class="t-cyan">Available commands:</span>
      <span class="t-green">help</span>       - Show this message
      <span class="t-green">about</span>      - Operator profile
      <span class="t-green">skills</span>     - List tech stack
      <span class="t-green">projects</span>   - View mission logs
      <span class="t-green">contact</span>    - Show comm channels
      <span class="t-green">clear</span>      - Clear terminal output
      <span class="t-green">sudo hire-me</span> - Execute hiring protocol
    `,
    about: () => `I'm a Full-Stack Developer specializing in modern web technologies, cloud platforms, and AI-powered solutions.`,
    skills: () => `Frontend: React, Next.js, Tailwind, Three.js\nBackend: Node.js, Python, Java\nDatabase: MongoDB, PostgreSQL\nCloud: AWS, GCloud`,
    projects: () => `Check the <span class="t-cyan">#projects</span> section on the main UI.`,
    contact: () => `Email: saharsh@example.com\nGitHub: github.com/Saharshsingh1711`,
    clear: () => {
      output.innerHTML = '';
      return '';
    },
    'sudo hire-me': () => {
      GameSystem.awardXP(50, 'easter_egg_hire', 'Easter Egg Found!');
      return `<span class="t-pink">Initializing hiring protocol...</span>\n<span class="t-green">SUCCESS: Resume deployed. Let's build something awesome.</span>`;
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value.trim().toLowerCase();
      input.value = '';

      if (!val) return;

      // Echo command
      const echo = document.createElement('div');
      echo.className = 'terminal-line';
      echo.innerHTML = `<span class="terminal-prompt">visitor@saharsh.dev:~$ </span>${val}`;
      output.appendChild(echo);

      // Process command
      const response = document.createElement('div');
      response.className = 'terminal-line';
      
      if (commands[val]) {
        response.innerHTML = commands[val]();
        GameSystem.awardXP(5, `cmd_${val}`, `Command Executed: ${val}`);
      } else {
        response.innerHTML = `<span class="t-red">Command not found: ${val}. Type 'help' for available commands.</span>`;
      }

      if (response.innerHTML !== '') {
        output.appendChild(response);
      }
      
      // Auto scroll
      body.scrollTop = body.scrollHeight;
    }
  });
}
