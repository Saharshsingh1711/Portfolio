// js/scroll-animations.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GameSystem } from './gamification.js';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  // Setup observers for XP system
  const sections = document.querySelectorAll('.section');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        GameSystem.awardXP(10, `explore_${id}`, `Explored ${id.toUpperCase()}`);
        
        // Mark nav as active
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.toggle('active', link.getAttribute('data-section') === id);
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    sectionObserver.observe(section);
    
    // GSAP Fade Up for sections
    gsap.fromTo(section, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, y: 0, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
  
  // Hide nav on scroll down, show on scroll up
  let lastScroll = 0;
  const nav = document.getElementById('main-nav');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
      if (currentScroll > lastScroll) {
        nav.classList.add('hidden'); // scrolling down
      } else {
        nav.classList.remove('hidden'); // scrolling up
      }
    } else {
      nav.classList.remove('hidden');
    }
    lastScroll = currentScroll;
  });
}
