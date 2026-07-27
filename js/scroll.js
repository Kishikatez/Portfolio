import { clamp, formatPercent, prefersReducedMotion } from './utils.js';

export const initScroll = () => {
  const sections = document.querySelectorAll('.section');
  const progressBar = document.querySelector('.scroll-progress span');
  const percentageLabel = document.querySelector('.scroll-percentage');
  const transition = document.querySelector('.page-transition');
  const spotlight = document.querySelector('.spotlight');
  const page = document.documentElement;

  if (!prefersReducedMotion() && window.Lenis) {
    const lenis = new window.Lenis({
      lerp: 0.085,
      smoothWheel: true,
      smoothTouch: false,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  const updateScroll = () => {
    const scrollTop = window.scrollY;
    const maxScroll = Math.max(page.scrollHeight - window.innerHeight, 1);
    const progress = clamp((scrollTop / maxScroll) * 100, 0, 100);

    if (progressBar) progressBar.style.width = `${progress}%`;
    if (percentageLabel) percentageLabel.textContent = formatPercent(progress);

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.78 && rect.bottom > window.innerHeight * 0.16;
      section.classList.toggle('is-inview', isVisible);
    });
  };

  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();

  document.addEventListener('pointermove', (event) => {
    if (spotlight) {
      spotlight.style.setProperty('--spot-x', `${(event.clientX / window.innerWidth) * 100}%`);
      spotlight.style.setProperty('--spot-y', `${(event.clientY / window.innerHeight) * 100}%`);
    }
  }, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      if (transition) transition.classList.add('is-active');
      window.setTimeout(() => {
        target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
        if (transition) transition.classList.remove('is-active');
      }, 160);
    });
  });
};
