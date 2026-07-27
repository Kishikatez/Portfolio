import { clamp, lerp, prefersReducedMotion } from './utils.js';

export const initMagnetic = () => {
  if (prefersReducedMotion()) return;

  const targets = document.querySelectorAll('.magnetic');

  targets.forEach((target) => {
    let animationFrame = null;
    let currentX = 0;
    let currentY = 0;

    const reset = () => {
      currentX = lerp(currentX, 0, 0.14);
      currentY = lerp(currentY, 0, 0.14);
      target.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      if (Math.abs(currentX) < 0.1 && Math.abs(currentY) < 0.1) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
        return;
      }
      animationFrame = requestAnimationFrame(reset);
    };

    target.addEventListener('pointermove', (event) => {
      const bounds = target.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;
      currentX = clamp(x * 0.22, -18, 18);
      currentY = clamp(y * 0.22, -18, 18);
      target.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      if (animationFrame) cancelAnimationFrame(animationFrame);
    });

    target.addEventListener('pointerleave', () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(reset);
    });
  });
};
