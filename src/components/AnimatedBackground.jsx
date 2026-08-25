import { motion, useReducedMotion } from 'framer-motion';

export function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-soft bg-[size:28px_28px] opacity-[0.06]" />
      <div className="absolute inset-0 bg-hero-radial opacity-100" />

      {!shouldReduceMotion ? (
        <>
          <motion.div
            className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl"
            animate={{ y: [0, -16, 0], x: [0, 18, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute right-0 top-24 h-80 w-80 rounded-full bg-purple-500/15 blur-3xl"
            animate={{ y: [0, 20, 0], x: [0, -18, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      ) : null}

      <svg className="absolute inset-0 h-full w-full opacity-[0.08]" viewBox="0 0 1440 960" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path d="M0 160C180 120 260 250 420 220S720 80 880 130s250 150 560 40" fill="none" stroke="url(#bg-line)" strokeWidth="1.5" strokeDasharray="6 12" />
        <path d="M0 650C200 580 320 720 510 680s300-140 460-95 310 120 470 35" fill="none" stroke="url(#bg-line)" strokeWidth="1.25" strokeDasharray="4 10" />
      </svg>
    </div>
  );
}
