// js/boot-sequence.js
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export function initBootSequence() {
  const bootOverlay = document.getElementById('boot-overlay');
  if (!bootOverlay) return;

  // Check if we already booted this session
  const hasBooted = sessionStorage.getItem('saharsh_booted');
  
  if (hasBooted) {
    bootOverlay.style.display = 'none';
    initHeroAnimations();
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      bootOverlay.classList.add('hidden-boot');
      sessionStorage.setItem('saharsh_booted', 'true');
      setTimeout(() => {
        bootOverlay.style.display = 'none';
        initHeroAnimations();
      }, 1000); // Wait for fade out
    }
  });

  tl.to('#boot-line-1', {
    duration: 0.8,
    text: '> INITIALIZING SAHARSH.DEV...',
    ease: "none",
    opacity: 1
  })
  .to('#boot-line-2', {
    duration: 0.5,
    text: '> ESTABLISHING SECURE CONNECTION...',
    ease: "none",
    opacity: 1
  }, "+=0.3")
  .to('#boot-line-3', {
    duration: 0.5,
    text: '> LOADING MODULES...',
    ease: "none",
    opacity: 1
  }, "+=0.2")
  .to('.boot-progress', {
    duration: 0.1,
    opacity: 1
  })
  .to('#boot-progress-bar', {
    duration: 1.5,
    width: '100%',
    ease: "power2.inOut"
  })
  .to('#boot-line-4', {
    duration: 0.3,
    text: '> SYSTEM ONLINE.',
    ease: "none",
    opacity: 1
  }, "+=0.2")
  .to('.boot-terminal', {
    duration: 0.5,
    opacity: 0,
    y: -20,
    ease: "power2.in"
  }, "+=0.5");
}

function initHeroAnimations() {
  const tl = gsap.timeline();
  
  tl.fromTo('.hero-greeting', 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
  )
  .fromTo('.hero-name-line', 
    { opacity: 0, x: -50 },
    { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" },
    "-=0.4"
  );

  // Typewriter effect for tagline
  gsap.to('#typed-tagline', {
    duration: 2,
    text: "Full-Stack Developer · Builder of Digital Worlds",
    ease: "none",
    delay: 1.5
  });
  
  gsap.fromTo('.hero-cta', 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 2 }
  );
}
