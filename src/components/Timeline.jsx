import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { timeline } from '../data/timeline';

export function TimelineSection() {
  return (
    <section className="section-space relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Development Timeline"
          title="A practical path from fundamentals to self-hosted AI and IoT"
          description="The timeline emphasizes technical growth, not just academic milestones."
        />

        <div className="mt-10 relative">
          <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-cyan-300/50 via-blue-500/30 to-fuchsia-500/20 md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className={`relative grid gap-4 md:grid-cols-2 ${index % 2 === 0 ? 'md:text-right' : 'md:ml-auto'}`}
              >
                <div className={`md:col-span-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                  <div className={`glass-card p-5 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">{item.year}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                  </div>
                </div>
                <span className="absolute left-5 top-1/2 h-4 w-4 -translate-x-1/2 rounded-full border border-cyan-300/50 bg-base-950 shadow-[0_0_0_6px_rgba(34,211,238,0.08)] md:left-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
