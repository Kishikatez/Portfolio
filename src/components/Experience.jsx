import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { experiences } from '../data/experience';

export function Experience() {
  return (
    <section id="experience" className="section-space relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience & Technical Journey"
          title="Work shaped by client delivery and technical production"
          description="My background is strongest where implementation needs to be practical, accurate, and dependable."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {experiences.map((experience, index) => (
            <motion.article
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className={`glass-card p-6 sm:p-7 ${experience.emphasis === 'primary' ? 'border-cyan-300/20 shadow-glow' : ''}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">{experience.company}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{experience.role}</h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  {experience.duration}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{experience.summary}</p>

              <div className="mt-5 space-y-2">
                {experience.responsibilities.map((item) => (
                  <div key={item} className="flex gap-2 text-sm text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {experience.projects.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                    {item}
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
