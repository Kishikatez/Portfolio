import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { whatIBuild } from '../data/whatIBuild';

export function WhatIBuild() {
  return (
    <section className="section-space relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What I Build"
          title="Systems with a clear purpose and a clean interface"
          description="These are the types of outcomes I focus on when I work on software, embedded systems, and self-hosted infrastructure."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {whatIBuild.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="glass-card p-6"
            >
              <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500" />
              <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
