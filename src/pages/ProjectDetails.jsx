import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { getProjectById } from '../data/projects';
import { siteConfig } from '../data/site';
import { ProjectIllustration } from '../components/ProjectIllustration';

function DetailSection({ title, children }) {
  return (
    <section className="glass-card p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <div className="mt-4 text-sm leading-8 text-slate-300">{children}</div>
    </section>
  );
}

function ListBlock({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ArchitectureCard({ title, items }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{title}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {items.map((item, index) => (
          <span key={item} className="rounded-full border border-white/10 bg-base-950/70 px-3 py-2 text-xs text-slate-200">
            {index + 1}. {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProjectDetails() {
  const { projectId } = useParams();
  const project = getProjectById(projectId);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | {siteConfig.name}</title>
        <meta name="description" content={project.shortDescription} />
      </Helmet>

      <section className="section-space relative pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">Project Details</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{project.title}</h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span key={technology} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                    {technology}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </div>
            </div>
            <div>
              <ProjectIllustration visual={project.visual} title={project.title} />
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <DetailSection title="Overview">{project.overview}</DetailSection>
            <DetailSection title="Problem Statement">{project.problemStatement}</DetailSection>
            <DetailSection title="Solution">{project.solution}</DetailSection>
            <DetailSection title="Key Features"><ListBlock items={project.features} /></DetailSection>
            <DetailSection title="Technology Stack"><ListBlock items={project.technologies} /></DetailSection>
            <DetailSection title="Architecture">
              <div className="space-y-4">
                <ArchitectureCard title={project.architecture.title} items={project.architecture.nodes} />
                <ArchitectureCard title="Data Flow" items={project.architecture.flow} />
              </div>
            </DetailSection>
            <DetailSection title="Screenshots">
              <div className="grid gap-3 sm:grid-cols-3">
                {project.screenshots.map((item) => (
                  <div key={item} className="rounded-2xl border border-dashed border-white/15 bg-base-950/60 p-4 text-center text-sm text-slate-400">
                    {item}
                  </div>
                ))}
              </div>
            </DetailSection>
            <DetailSection title="Challenges & Solutions">
              <div className="grid gap-5">
                <div>
                  <p className="text-sm font-semibold text-white">Challenges</p>
                  <div className="mt-3">
                    <ListBlock items={project.challenges} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Future Improvements</p>
                  <div className="mt-3">
                    <ListBlock items={project.futureImprovements} />
                  </div>
                </div>
              </div>
            </DetailSection>
          </div>

          {project.hardware ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <DetailSection title="Hardware Components">
                <ListBlock items={project.hardware} />
              </DetailSection>
              <DetailSection title="Pin Connections">
                <ListBlock items={project.pinConnections} />
              </DetailSection>
            </div>
          ) : null}

          {project.deployment ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <DetailSection title="Deployment Options">
                <ListBlock items={project.deployment} />
              </DetailSection>
              <DetailSection title="Extended Notes">
                <p>
                  {project.type === 'software'
                    ? 'Deployment guidance includes localhost setup, LAN sharing, and demonstration workflows.'
                    : 'Embedded delivery focuses on wiring validation, power checks, and hardware testing.'}
                </p>
              </DetailSection>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
