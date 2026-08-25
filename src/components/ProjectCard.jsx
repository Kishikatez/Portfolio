import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProjectIllustration } from './ProjectIllustration';

export function ProjectCard({ project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
      className={`group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-glow transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 ${
        project.spotlight ? 'lg:col-span-2' : ''
      }`}
    >
      <div className={`grid h-full gap-0 ${project.spotlight ? 'lg:grid-cols-[0.92fr_1.08fr]' : ''}`}>
        <div className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r lg:border-white/10">
          <ProjectIllustration visual={project.visual} title={project.title} />
        </div>
        <div className="flex h-full flex-col p-5 sm:p-6">
          <div className="flex flex-wrap gap-2 text-xs text-cyan-200">
            {project.category.map((item) => (
              <span key={item} className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1">
                {item}
              </span>
            ))}
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-white">{project.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">{project.shortDescription}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.slice(0, 6).map((technology) => (
              <span key={technology} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                {technology}
              </span>
            ))}
          </div>

          <div className="mt-5 space-y-2">
            {project.features.slice(0, 3).map((feature) => (
              <div key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6 flex flex-wrap gap-3">
            <Link
              to={`/projects/${project.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
            >
              View Details
              <ArrowRight className="h-4 w-4" />
            </Link>
            {project.github && !project.github.startsWith('YOUR_') ? (
              <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            ) : null}
            {project.demo && !project.demo.startsWith('YOUR_') ? (
              <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
