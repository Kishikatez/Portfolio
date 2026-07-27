import { initLoader } from './loader.js';
import { initCursor } from './cursor.js';
import { initMagnetic } from './magnetic.js';
import { initNavbar } from './navbar.js';
import { initParticles } from './particles.js';
import { initScroll } from './scroll.js';
import { initHero3D } from './hero3d.js';
import { initTimeline } from './timeline.js';
import { createNoiseDataUrl, loadScript, prefersReducedMotion } from './utils.js';

const setupExternalLibraries = async () => {
  const libraries = [
    'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js',
    'https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js',
    'https://cdn.jsdelivr.net/npm/vanilla-tilt@1.8.1/dist/vanilla-tilt.min.js',
    'https://cdn.jsdelivr.net/npm/splitting@1.0.6/dist/splitting.min.js',
  ];

  await Promise.allSettled(libraries.map((src) => loadScript(src)));

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }
};

const initSplitting = () => {
  if (typeof window.Splitting === 'function') {
    window.Splitting({ target: '.split-text' });
  }
};

const initTilt = () => {
  if (!window.VanillaTilt) return;
  document.querySelectorAll('.tilt-card, .tilt-section').forEach((element) => {
    window.VanillaTilt.init(element, {
      max: 10,
      speed: 900,
      glare: true,
      'max-glare': 0.3,
      scale: 1.02,
      gyroscope: true,
    });
  });
};

const initCounters = () => {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const animateCounter = (element) => {
    const target = Number(element.getAttribute('data-counter')) || 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      element.textContent = String(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
      else element.textContent = String(target);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach((counter) => observer.observe(counter));
};

const initNotifications = () => {
  const notification = document.querySelector('.glass-notification');
  if (!notification) return;

  window.showNotification = (message) => {
    notification.textContent = message;
    notification.classList.add('is-visible');
    window.clearTimeout(notification.hideTimer);
    notification.hideTimer = window.setTimeout(() => notification.classList.remove('is-visible'), 2600);
  };
};

const initTheme = () => {
  const themeToggle = document.querySelector('.theme-toggle');
  const musicToggle = document.querySelector('.music-toggle');
  const savedTheme = localStorage.getItem('future-3d-theme');
  const savedSound = localStorage.getItem('future-3d-sound');

  if (savedTheme === 'light') document.body.classList.add('theme-light');
  if (themeToggle) themeToggle.setAttribute('aria-pressed', String(document.body.classList.contains('theme-light')));
  if (musicToggle) musicToggle.setAttribute('aria-pressed', String(savedSound === 'on'));

  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('theme-light');
    const enabled = document.body.classList.contains('theme-light');
    localStorage.setItem('future-3d-theme', enabled ? 'light' : 'dark');
    themeToggle.setAttribute('aria-pressed', String(enabled));
    window.showNotification?.(enabled ? 'Light theme enabled' : 'Dark theme enabled');
  });

  musicToggle?.addEventListener('click', () => {
    const nextState = musicToggle.getAttribute('aria-pressed') !== 'true';
    musicToggle.setAttribute('aria-pressed', String(nextState));
    localStorage.setItem('future-3d-sound', nextState ? 'on' : 'off');
    window.showNotification?.(nextState ? 'Ambient sound enabled' : 'Ambient sound muted');
  });
};

const initContactForm = () => {
  const form = document.querySelector('.contact__form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!name || !email || !message) {
      window.showNotification?.('Please complete every field');
      return;
    }

    form.reset();
    window.showNotification?.('Message prepared for send-off');
  });
};

const initLazyImages = () => {
  document.querySelectorAll('img[data-src]').forEach((image) => {
    image.loading = 'lazy';
    image.src = image.dataset.src;
  });
};

const initBackgroundNoise = () => {
  const noise = document.querySelector('.noise-layer');
  if (noise) {
    noise.style.backgroundImage = `url(${createNoiseDataUrl()})`;
    noise.style.backgroundSize = '160px 160px';
  }
};

const start = async () => {
  document.body.classList.add('is-loading');
  initBackgroundNoise();
  await setupExternalLibraries();
  initSplitting();
  initTheme();
  initNotifications();
  initLazyImages();
  initCursor();
  initMagnetic();
  initNavbar();
  initParticles();
  initScroll();
  initCounters();
  initTimeline();
  initTilt();
  await initHero3D();
  await initLoader();
  initContactForm();

  if (!prefersReducedMotion()) {
    window.showNotification?.('Future 3D Experience is ready');
  }
};

window.addEventListener('DOMContentLoaded', () => {
  start().catch((error) => {
    console.error(error);
    document.body.classList.remove('is-loading');
    const loader = document.querySelector('#loader');
    if (loader) loader.classList.add('is-hidden');
  });
});
