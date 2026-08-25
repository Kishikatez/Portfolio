import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { leadership } from '../data/experience';

export function Leadership() {
  return (
    <section className="section-space relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Leadership & Activities"
          title="Co-founding and collaborative technical learning"
          description="Technical leadership matters when building systems and communities, not just codebases."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {leadership.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="glass-card p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">{item.company}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{item.role}</h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  {item.duration}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.highlights.map((highlight) => (
                  <span key={highlight} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                    {highlight}
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
