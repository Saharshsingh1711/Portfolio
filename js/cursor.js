// js/cursor.js
export function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  
  if (!dot || !ring) return;
  
  // Only init on non-touch devices
  if (window.matchMedia("(max-width: 768px)").matches || 
      ('ontouchstart' in window) || 
      (navigator.maxTouchPoints > 0)) {
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = window.innerWidth / 2;
  let ringY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows instantly
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Ring follows with easing
  const animateRing = () => {
    // Easing factor
    const ease = 0.15;
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;
    
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    
    requestAnimationFrame(animateRing);
  };
  
  animateRing();

  // Interactive elements hover effect
  const interactives = document.querySelectorAll('a, button, .skill-hex, .projects-tab');
  
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hover');
      ring.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hover');
      ring.classList.remove('hover');
    });
  });
}
