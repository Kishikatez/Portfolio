import { throttle } from './utils.js';

export const initNavbar = () => {
  const navbar = document.querySelector('#navbar');
  const backToTop = document.querySelector('.back-to-top');
  const toggle = document.querySelector('.mobile-menu-toggle');

  let previousScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (navbar) {
      navbar.classList.toggle('is-hidden', currentScrollY > previousScrollY && currentScrollY > 120);
    }
    if (backToTop) {
      backToTop.classList.toggle('is-visible', currentScrollY > 500);
    }
    previousScrollY = currentScrollY;
  };

  window.addEventListener('scroll', throttle(handleScroll, 80), { passive: true });
  handleScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      document.body.classList.toggle('nav-open');
    });
  }
};
