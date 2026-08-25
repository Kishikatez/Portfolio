import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { siteConfig } from '../data/site';

const rotatingTitles = ['Full-Stack Applications', 'AI-Powered Systems', 'IoT Solutions', 'Embedded Projects'];
const techBadges = ['Python', 'ESP32', 'FastAPI', 'Docker', 'PostgreSQL', 'AI', 'Arduino'];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [titleIndex, setTitleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (shouldReduceMotion) {
      setTypedText(rotatingTitles[0]);
      return undefined;
    }

    const activeTitle = rotatingTitles[titleIndex % rotatingTitles.length];
    let charIndex = 0;
    setTypedText('');

    const timer = window.setInterval(() => {
      charIndex += 1;
      setTypedText(activeTitle.slice(0, charIndex));
      if (charIndex >= activeTitle.length) {
        window.clearInterval(timer);
        window.setTimeout(() => setTitleIndex((current) => current + 1), 1500);
      }
    }, 75);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion, titleIndex]);

  const focusBars = useMemo(
    () => [
      { label: 'IoT & Embedded Systems', value: siteConfig.focusRatio.hardware },
      { label: 'Software, Full-Stack & AI', value: siteConfig.focusRatio.software },
    ],
    []
  );

  return (
    <section id="home" className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-28">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium text-cyan-100 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Available for software, AI, IoT, embedded, and freelance opportunities
          </div>

          <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Hi, I&apos;m <span className="bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent">Kishore.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-2xl font-medium leading-tight text-slate-100 sm:text-3xl lg:text-[2.75rem] lg:leading-[1.05]">
            I Build Intelligent Software, IoT & Embedded Systems.
          </p>

          <div className="mt-5 flex min-h-10 items-center gap-3 text-base text-slate-300 sm:text-lg">
            <span className="font-mono text-cyan-300">{typedText}</span>
            <span className="inline-block h-6 w-[2px] animate-pulse bg-cyan-300" />
          </div>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            {siteConfig.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/25 transition hover:-translate-y-0.5"
            >
              Explore Projects
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.ctas.contact}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10"
            >
              Contact Me
            </a>
            <a
              href={siteConfig.ctas.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/5"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <span className="text-slate-400">Find me on</span>
            <a href={siteConfig.socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-cyan-300/40 hover:bg-white/10">
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-cyan-300/40 hover:bg-white/10">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a href={`mailto:${siteConfig.socials.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-cyan-300/40 hover:bg-white/10">
              <Mail className="h-4 w-4" />
              Email
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {focusBars.map((bar) => (
              <div key={bar.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4 text-sm text-slate-200">
                  <span>{bar.label}</span>
                  <span className="font-mono text-cyan-200">{bar.value}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500"
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-fuchsia-500/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-glow backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-base-900/80 p-5">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-2 font-mono">system.architecture</span>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-2xl border border-cyan-300/15 bg-base-950/80 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-300/80">Terminal</p>
                  <div className="mt-4 space-y-3 font-mono text-sm text-slate-300">
                    <p>$ python main.py</p>
                    <p className="text-cyan-200">Initializing intelligent systems...</p>
                    <p>Connecting software, data, and devices.</p>
                    <p className="text-fuchsia-200">Ready for deployment.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-base-950/80 p-4">
                    <p className="font-mono text-xs uppercase tracking-[0.35em] text-slate-400">Active Stack</p>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      {['FastAPI', 'PostgreSQL', 'ESP32', 'Qdrant', 'Docker', 'Ollama'].map((item) => (
                        <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-slate-100">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/10 to-fuchsia-500/10 p-4">
                    <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-200/80">System Focus</p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      Engineering-focused portfolio blending embedded control, practical AI, secure software, and self-hosted infrastructure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {techBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
