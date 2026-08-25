import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { useTheme } from './hooks/useTheme';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useActiveSection } from './hooks/useActiveSection';

const homeSections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const scrollProgress = useScrollProgress();
  const location = useLocation();
  const activeSection = useActiveSection(homeSections);

  useEffect(() => {
    const scrollTargetId = location.hash.replace('#', '');
    if (scrollTargetId) {
      requestAnimationFrame(() => {
        document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <ScrollProgress progress={scrollProgress} />
      <AnimatedBackground />
      <div className="relative z-10 min-h-screen">
        <Navbar theme={theme} onToggleTheme={toggleTheme} activeSection={activeSection} />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.main
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <Home />
                </motion.main>
              }
            />
            <Route
              path="/projects"
              element={
                <motion.main
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <Projects />
                </motion.main>
              }
            />
            <Route
              path="/projects/:projectId"
              element={
                <motion.main
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <ProjectDetails />
                </motion.main>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
}
