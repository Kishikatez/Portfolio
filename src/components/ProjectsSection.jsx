import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { ProjectCard } from './ProjectCard';
import { projectCategories, projects } from '../data/projects';

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }

    return projects.filter((project) => project.category.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="section-space relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Projects that connect software, AI, and hardware"
          description="The collection is organized around practical systems rather than student-style demos, with the most important work centered on private cloud AI, embedded robotics, and real client applications."
        />

        <div className="mt-8 flex flex-wrap gap-3">
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                activeFilter === category
                  ? 'border-cyan-300/40 bg-cyan-400/15 text-white'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/25 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
            No projects match the selected filter.
          </div>
        ) : null}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-sm text-slate-400"
        >
          Explore each project for system architecture, challenges, features, and future improvements.
        </motion.p>
      </div>
    </section>
  );
}
