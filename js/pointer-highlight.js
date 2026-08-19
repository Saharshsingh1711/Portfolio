import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initPointerHighlight() {
  const wrapper = document.getElementById('ph-wrapper');
  const target = document.getElementById('ph-target');
  const box = document.getElementById('ph-box');
  const cursor = document.getElementById('ph-cursor');

  if (!wrapper || !target || !box || !cursor) return;

  let dims = { width: 0, height: 0 };
  let animationTimeline = null;

  // Function to measure and animate
  const measureAndAnimate = (isResize = false) => {
    const rect = target.getBoundingClientRect();
    dims.width = rect.width;
    dims.height = rect.height;

    // Reset initial state
    gsap.set(box, { width: 0, height: 0, opacity: 0 });
    gsap.set(cursor, { x: 0, y: 0, opacity: 0 });

    if (animationTimeline) {
      animationTimeline.kill();
    }

    // Create the animation timeline
    animationTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "center 80%", // Trigger when center of element hits 80% of viewport
        toggleActions: "play none none none"
      }
    });

    // 1. Box scales up
    animationTimeline.to(box, {
      opacity: 1,
      width: dims.width,
      height: dims.height,
      duration: 1,
      ease: "power2.inOut"
    }, 0);

    // 2. Cursor moves to bottom right
    animationTimeline.to(cursor, {
      opacity: 1,
      duration: 0.1,
      ease: "power1.inOut"
    }, 0);

    animationTimeline.to(cursor, {
      x: dims.width + 4,
      y: dims.height + 4,
      duration: 1,
      ease: "power2.inOut"
    }, 0);
  };

  // Initial measurement
  measureAndAnimate();

  // Handle window resizing to recalculate dimensions
  const resizeObserver = new ResizeObserver(() => {
    // Only re-run if it's already triggered or we need to recalculate
    measureAndAnimate(true);
  });

  resizeObserver.observe(target);
}
