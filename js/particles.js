import { prefersReducedMotion, randomBetween } from './utils.js';

export const initParticles = () => {
  const canvas = document.querySelector('.particle-overlay');
  if (!canvas || prefersReducedMotion()) return;

  const context = canvas.getContext('2d');
  const particles = [];
  const pointer = { x: null, y: null };
  let width = 0;
  let height = 0;
  let animationFrame = 0;

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  };

  const createParticles = () => {
    particles.length = 0;
    const count = Math.round(Math.min(width, height) / 5.5);
    for (let index = 0; index < count; index += 1) {
      particles.push({
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        vx: randomBetween(-0.18, 0.18),
        vy: randomBetween(-0.12, 0.12),
        radius: randomBetween(0.7, 1.8),
      });
    }
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = 'rgba(255, 255, 255, 0.92)';
    context.strokeStyle = 'rgba(0, 245, 255, 0.08)';

    particles.forEach((particle) => {
      if (pointer.x !== null && pointer.y !== null) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 120) {
          particle.vx += dx / distance * 0.015;
          particle.vy += dy / distance * 0.015;
        }
      }

      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });

    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const a = particles[i];
        const b = particles[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance < 120) {
          context.globalAlpha = 1 - distance / 120;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }
    }

    context.globalAlpha = 1;
    animationFrame = requestAnimationFrame(draw);
  };

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  window.addEventListener('pointermove', (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  }, { passive: true });

  resize();
  createParticles();
  draw();

  return () => cancelAnimationFrame(animationFrame);
};
