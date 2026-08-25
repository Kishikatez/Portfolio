import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectsSection } from '../components/ProjectsSection';
import { siteConfig } from '../data/site';

export function Projects() {
  return (
    <>
      <Helmet>
        <title>Projects | {siteConfig.name}</title>
        <meta name="description" content="Featured software, AI, IoT, and embedded systems projects by Kishore S." />
      </Helmet>

      <section className="section-space relative pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to home projects
          </Link>
          <div className="mt-8">
            <SectionHeading
              eyebrow="Projects"
              title="A closer view of the work"
              description="This page can be used as a deeper project gallery while the home page keeps the portfolio concise and recruiter-friendly."
            />
          </div>
        </div>
      </section>
      <ProjectsSection />
    </>
  );
}
