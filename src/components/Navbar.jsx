import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { siteConfig } from '../data/site';

const navItems = [
  { label: 'Home', href: '/#home', id: 'home' },
  { label: 'About', href: '/#about', id: 'about' },
  { label: 'Skills', href: '/#skills', id: 'skills' },
  { label: 'Projects', href: '/#projects', id: 'projects' },
  { label: 'Experience', href: '/#experience', id: 'experience' },
  { label: 'Education', href: '/#education', id: 'education' },
  { label: 'Contact', href: '/#contact', id: 'contact' },
];

export function Navbar({ theme, onToggleTheme, activeSection }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  const isHomeRoute = location.pathname === '/';
  const currentActive = isHomeRoute ? activeSection : 'projects';

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled ? 'border-white/10 bg-base-950/80 backdrop-blur-xl' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/#home"
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold tracking-[0.24em] text-white shadow-glow backdrop-blur-sm transition hover:border-cyan-300/40 hover:bg-white/10"
          aria-label={`${siteConfig.name} home`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-fuchsia-500 text-sm font-bold text-slate-950">KS</span>
          <span className="hidden sm:inline">KISHORE S</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm lg:flex">
          {navItems.map((item) => {
            const isActive = currentActive === item.id;
            return (
              <Link
                key={item.id}
                to={item.href}
                className={`rounded-full px-4 py-2 text-sm transition duration-300 ${
                  isActive ? 'bg-white text-slate-950 shadow-lg shadow-cyan-950/20' : 'text-slate-300 hover:bg-white/8 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-cyan-300/40 hover:bg-white/10 lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="border-t border-white/10 bg-base-950/95 px-4 py-4 backdrop-blur-xl lg:hidden"
          >
            <nav className="mx-auto grid max-w-7xl gap-2">
              {navItems.map((item) => {
                const isActive = currentActive === item.id;
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={`rounded-2xl px-4 py-3 text-sm transition ${
                      isActive ? 'bg-white text-slate-950' : 'bg-white/5 text-slate-200 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
