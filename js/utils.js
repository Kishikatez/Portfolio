export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const lerp = (start, end, amount) => start + (end - start) * amount;

export const debounce = (callback, delay = 200) => {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), delay);
  };
};

export const throttle = (callback, delay = 100) => {
  let lastTime = 0;
  return (...args) => {
    const currentTime = performance.now();
    if (currentTime - lastTime >= delay) {
      lastTime = currentTime;
      callback(...args);
    }
  };
};

export const select = (selector, scope = document) => scope.querySelector(selector);
export const selectAll = (selector, scope = document) => [...scope.querySelectorAll(selector)];

export const setCSSVariable = (name, value, scope = document.documentElement) => {
  scope.style.setProperty(name, value);
};

export const formatPercent = (value) => `${Math.round(value)}%`;

export const randomBetween = (min, max) => min + Math.random() * (max - min);

export const createElement = (tag, className, textContent = '') => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
};

export const loadScript = (src) => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  script.onload = resolve;
  script.onerror = reject;
  document.head.appendChild(script);
});

export const createNoiseDataUrl = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  const imageData = context.createImageData(canvas.width, canvas.height);
  for (let index = 0; index < imageData.data.length; index += 4) {
    const value = Math.random() * 255;
    imageData.data[index] = value;
    imageData.data[index + 1] = value;
    imageData.data[index + 2] = value;
    imageData.data[index + 3] = 28;
  }
  context.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
};
