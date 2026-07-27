import { select } from './utils.js';

export const initLoader = async () => {
  const loader = select('#loader');
  const bar = select('.loader__bar span');
  const label = select('.loader__percentage');
  const loadingText = select('.loader__text');

  if (!loader || !bar || !label) {
    document.body.classList.remove('is-loading');
    return;
  }

  const stages = [
    { value: 18, text: 'Warming motion layers' },
    { value: 46, text: 'Syncing visual systems' },
    { value: 72, text: 'Loading interactive media' },
    { value: 100, text: 'Revealing experience' },
  ];

  for (const stage of stages) {
    await new Promise((resolve) => {
      window.setTimeout(() => {
        bar.style.width = `${stage.value}%`;
        label.textContent = `${stage.value}%`;
        if (loadingText) loadingText.textContent = stage.text;
        resolve();
      }, 220);
    });
  }

  await new Promise((resolve) => window.setTimeout(resolve, 320));
  loader.classList.add('is-hidden');
  document.body.classList.remove('is-loading');
};
