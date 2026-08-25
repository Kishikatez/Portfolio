import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { currentlyExploring } from '../data/currentlyExploring';

export function CurrentlyExploring() {
  return (
    <section className="section-space relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Currently Exploring"
          title="Topics I am actively learning and applying"
          description="This list is intentionally data-driven so it can be updated from a single file as the portfolio evolves."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mt-10 glass-card p-6 sm:p-8"
        >
          <div className="flex flex-wrap gap-3">
            {currentlyExploring.map((item, index) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
