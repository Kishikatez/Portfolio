import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { SkillCard } from './SkillCard';
import { skillCategories } from '../data/skills';

export function Skills() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('web');
  const selectedCategory = useMemo(
    () => skillCategories.find((category) => category.id === selectedCategoryId) ?? skillCategories[0],
    [selectedCategoryId]
  );

  return (
    <section id="skills" className="section-space relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Technical Skills"
          title="A software toolkit for building useful products"
          description="My core work centers on application development, backend systems, AI workflows, and the infrastructure that keeps products dependable. IoT and embedded systems complement that software foundation."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skillCategories.map((category, index) => (
              <SkillCard
                key={category.id}
                category={category}
                index={index}
                isSelected={selectedCategory.id === category.id}
                onClick={() => setSelectedCategoryId(category.id)}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">Selected category</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{selectedCategory.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{selectedCategory.description}</p>

            <div className="mt-6 space-y-3">
              {selectedCategory.skills.map((skill, index) => {
                const fill = 92 - index * 4;
                return (
                  <div key={skill} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-4 text-sm text-slate-200">
                      <span>{skill}</span>
                      <span className="font-mono text-cyan-200">{fill}%</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500"
                        style={{ width: `${Math.max(34, fill)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
