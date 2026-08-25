import { motion } from 'framer-motion';

const emphasisStyles = {
  high: 'border-cyan-300/30 bg-cyan-400/10 shadow-glow',
  medium: 'border-white/10 bg-white/5',
  low: 'border-white/10 bg-white/[0.03]',
};

export function SkillCard({ category, isSelected, onClick, index }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      onClick={onClick}
      className={`group rounded-3xl border p-5 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/50 ${
        isSelected ? 'border-cyan-300/50 bg-white/8' : emphasisStyles[category.emphasis] ?? emphasisStyles.medium
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/70">Category</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{category.title}</h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          {category.skills.length} skills
        </span>
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-300">{category.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {category.skills.slice(0, 5).map((skill) => (
          <span key={skill} className="rounded-full border border-white/10 bg-base-950/60 px-3 py-1 text-xs text-slate-200">
            {skill}
          </span>
        ))}
        {category.skills.length > 5 ? <span className="rounded-full border border-white/10 bg-base-950/60 px-3 py-1 text-xs text-slate-400">+{category.skills.length - 5}</span> : null}
      </div>
    </motion.button>
  );
}
