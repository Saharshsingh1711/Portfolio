import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollText() {
  const scrollSection = document.getElementById('scroll-text');
  if (!scrollSection) return;

  const items = gsap.utils.toArray('.scroll-list li');
  if (items.length === 0) return;

  // Set initial opacity
  gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) });

  // 1. Animate opacity of list items as we scroll down
  const dimmer = gsap.timeline()
    .to(items.slice(1), { opacity: 1, stagger: 0.5 })
    .to(items.slice(0, items.length - 1), { opacity: 0.2, stagger: 0.5 }, 0);

  ScrollTrigger.create({
    trigger: items[0],
    endTrigger: items[items.length - 1],
    start: "center center",
    end: "center center",
    animation: dimmer,
    scrub: 0.2,
  });

  // 2. Animate color hue across the scroll duration
  const startHue = 180;
  const endHue = 360;
  
  const scroller = gsap.timeline().fromTo(
    scrollSection,
    { "--hue": startHue },
    { "--hue": endHue, ease: "none" }
  );

  ScrollTrigger.create({
    trigger: items[0],
    endTrigger: items[items.length - 1],
    start: "center center",
    end: "center center",
    animation: scroller,
    scrub: 0.2,
  });

  // 3. Fade in Chroma at start of list
  gsap.fromTo(
    scrollSection,
    { "--chroma": 0 },
    {
      "--chroma": 0.3,
      ease: "none",
      scrollTrigger: {
        scrub: 0.2,
        trigger: items[0],
        start: "center center+=40",
        end: "center center",
      },
    }
  );

  // 4. Fade out Chroma at end of list
  gsap.fromTo(
    scrollSection,
    { "--chroma": 0.3 },
    {
      "--chroma": 0,
      ease: "none",
      scrollTrigger: {
        scrub: 0.2,
        trigger: items[items.length - 2],
        start: "center center",
        end: "center center-=40",
      },
    }
  );
}
