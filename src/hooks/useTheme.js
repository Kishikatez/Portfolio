import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'kishore-portfolio-theme';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const actions = useMemo(
    () => ({
      toggleTheme: () => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark')),
      setDark: () => setTheme('dark'),
      setLight: () => setTheme('light'),
    }),
    []
  );

  return { theme, ...actions };
}
