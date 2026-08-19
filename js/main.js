// js/main.js
import { initBootSequence } from './boot-sequence.js';
import { initSkillsFilter } from './skills-data.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize boot sequence and hero animations
  initBootSequence();

  // Initialize skills hex grid
  initSkillsFilter();

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
