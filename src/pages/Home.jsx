import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { ProjectsSection } from '../components/ProjectsSection';
import { Experience } from '../components/Experience';
import { Leadership } from '../components/Leadership';
import { Education } from '../components/Education';
import { Certifications } from '../components/Certifications';
import { TimelineSection } from '../components/Timeline';
import { WhatIBuild } from '../components/WhatIBuild';
import { CurrentlyExploring } from '../components/CurrentlyExploring';
import { GitHubRepos } from '../components/GitHubRepos';
import { Contact } from '../components/Contact';
import { siteConfig } from '../data/site';

export function Home() {
  return (
    <>
      <Helmet>
        <title>{siteConfig.seo.title}</title>
        <meta name="description" content={siteConfig.seo.description} />
        <meta property="og:title" content={siteConfig.seo.title} />
        <meta property="og:description" content={siteConfig.seo.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteConfig.seo.title} />
        <meta name="twitter:description" content={siteConfig.seo.description} />
      </Helmet>
      <Hero />
      <About />
      <Skills />
      <WhatIBuild />
      <CurrentlyExploring />
      <ProjectsSection />
      <Experience />
      <Leadership />
      <Education />
      <Certifications />
      <TimelineSection />
      <GitHubRepos />
      <Contact />
    </>
  );
}
