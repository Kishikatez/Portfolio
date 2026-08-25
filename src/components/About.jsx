import { motion } from 'framer-motion';
import { Cpu, Layers3, ShieldCheck, Zap } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { siteConfig } from '../data/site';

const stats = [
  { label: 'Real-World Projects', value: 'Client and personal systems', icon: Layers3 },
  { label: 'Full-Stack Experience', value: 'APIs, databases, and UI', icon: ShieldCheck },
  { label: 'IoT & Embedded Work', value: 'ESP32, sensors, and control', icon: Cpu },
  { label: 'Technical Focus', value: 'Practical problem solving', icon: Zap },
];

export function About() {
  return (
    <section id="about" className="section-space relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About Me"
          title="Building software people can rely on"
          description={siteConfig.summary}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6 sm:p-8"
          >
            <p className="text-base leading-8 text-slate-300 sm:text-lg">
              I am a software-focused developer with experience across full-stack engineering, artificial intelligence, backend systems, and modern web development.
            </p>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
              I enjoy taking a product from a clear idea to a working system: shaping the interface, designing APIs, modeling data, integrating AI, and deploying software that is practical to use and maintain.
            </p>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
              I also bring hands-on IoT and embedded experience when a product needs to connect software with the physical world.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 p-2 text-cyan-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{stat.label}</h3>
                        <p className="mt-1 text-sm text-slate-300">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="glass-card p-6 sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">Focus Profile</p>
            <div className="mt-6 space-y-5">
              <div>
                <div className="flex items-center justify-between text-sm text-slate-200">
                  <span>IoT & Embedded Systems</span>
                  <span>{siteConfig.focusRatio.hardware}%</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500" style={{ width: `${siteConfig.focusRatio.hardware}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm text-slate-200">
                  <span>Software, Full-Stack & AI</span>
                  <span>{siteConfig.focusRatio.software}%</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400" style={{ width: `${siteConfig.focusRatio.software}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-base-950/70 p-5">
              <p className="text-sm font-semibold text-white">Engineering style</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                I prefer systems that are practical, secure, modular, and easy to maintain. The goal is not just to make something work, but to make it usable, scalable, and understandable.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
