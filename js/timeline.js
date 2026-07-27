import { prefersReducedMotion } from './utils.js';

export const initTimeline = () => {
  const cards = document.querySelectorAll('.testimonial-card');
  if (cards.length === 0) return;

  let currentIndex = 0;
  const rotate = () => {
    if (prefersReducedMotion()) return;
    cards.forEach((card, index) => {
      card.classList.toggle('is-active', index === currentIndex);
    });
    currentIndex = (currentIndex + 1) % cards.length;
  };

  rotate();
  window.setInterval(rotate, 3800);
};
