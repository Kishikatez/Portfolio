import { clamp, lerp, prefersReducedMotion, setCSSVariable } from './utils.js';

export const initCursor = () => {
  if (prefersReducedMotion()) return;

  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  const state = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,
  };

  const move = (event) => {
    state.targetX = event.clientX;
    state.targetY = event.clientY;
    setCSSVariable('--spot-x', `${(event.clientX / window.innerWidth) * 100}%`);
    setCSSVariable('--spot-y', `${(event.clientY / window.innerHeight) * 100}%`);
  };

  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('pointerdown', () => {
    ring.style.transform = 'translate3d(var(--cursor-x), var(--cursor-y), 0) scale(0.82)';
  });
  window.addEventListener('pointerup', () => {
    ring.style.transform = 'translate3d(var(--cursor-x), var(--cursor-y), 0) scale(1)';
  });

  const tick = () => {
    state.x = lerp(state.x, state.targetX, 0.18);
    state.y = lerp(state.y, state.targetY, 0.18);
    const offsetX = clamp(state.x, 0, window.innerWidth);
    const offsetY = clamp(state.y, 0, window.innerHeight);
    dot.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) translate(-50%, -50%)`;
    ring.style.setProperty('--cursor-x', `${offsetX}px`);
    ring.style.setProperty('--cursor-y', `${offsetY}px`);
    ring.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };

  tick();

  document.addEventListener('mouseover', (event) => {
    const target = event.target.closest('a, button, input, textarea, .tilt-card, .tilt-section');
    ring.style.transform = target
      ? `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) scale(1.8)`
      : `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) scale(1)`;
    dot.style.transform = target
      ? `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) scale(1.4)`
      : `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) scale(1)`;
  });
};
