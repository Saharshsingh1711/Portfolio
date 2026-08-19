import { initBootSequence } from './boot-sequence.js';
import { initSkillsFilter } from './skills-data.js';
import { initProjectsTabs } from './projects-data.js';
import { initContactForm } from './contact.js';
import { initTerminal } from './terminal.js';
import { initCursor } from './cursor.js';
import { initParticles } from './particles.js';
import { initScrollAnimations } from './scroll-animations.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize boot sequence and hero animations
  initBootSequence();

  // Initialize skills hex grid
  initSkillsFilter();

  // Initialize projects tabs
  initProjectsTabs();

  // Initialize contact form
  initContactForm();

  // Initialize features
  initTerminal();
  initCursor();
  initParticles();
  initScrollAnimations();

  // Mobile navigation toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile nav when clicking a link
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
});
