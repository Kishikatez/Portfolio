import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { education } from '../data/education';

export function Education() {
  return (
    <section id="education" className="section-space relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation in computer science"
          description="Primary education is shown here with postgraduate study first, followed by undergraduate work as supporting context."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {education.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className={`glass-card p-6 sm:p-7 ${item.primary ? 'border-cyan-300/20 shadow-glow' : ''}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">{item.institution}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{item.degree}</h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  {item.duration}
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold text-cyan-200">{item.scoreLabel}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.focus.map((focus) => (
                  <span key={focus} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                    {focus}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
