import { useEffect, useState } from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { codeExperiments } from '../data/codeExperiments';
import { siteConfig } from '../data/site';

export function GitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const hasConfiguredUsername = siteConfig.github.username && !siteConfig.github.username.startsWith('YOUR_');

  useEffect(() => {
    if (!hasConfiguredUsername) {
      return undefined;
    }

    const abortController = new AbortController();

    const fetchRepos = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.github.com/users/${siteConfig.github.username}/repos?sort=updated&per_page=6`, {
          signal: abortController.signal,
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (!response.ok) {
          throw new Error('Unable to fetch repositories');
        }
        const data = await response.json();
        setRepos(data);
      } catch {
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
    return () => abortController.abort();
  }, [hasConfiguredUsername]);

  const displayedRepos = hasConfiguredUsername ? repos : codeExperiments;

  return (
    <section className="section-space relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Code & Experiments"
          title="Open-source style work and GitHub-ready experiments"
          description="A live view of my public repositories, refreshed directly from GitHub."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {displayedRepos.map((repo) => (
            <motion.article
              key={repo.id ?? repo.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{repo.language ?? 'Repository'}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{repo.name}</h3>
                </div>
                <Github className="h-5 w-5 text-slate-300" />
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{repo.description ?? 'No description available yet.'}</p>
              <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
                <span className="inline-flex items-center gap-2"><Star className="h-4 w-4" /> {repo.stars ?? repo.stargazers_count ?? '—'}</span>
                <span>
                  {repo.updated ?? (repo.updated_at || repo.pushed_at ? new Date(repo.updated_at ?? repo.pushed_at).toLocaleDateString() : '—')}
                </span>
              </div>
              <a
                href={repo.html_url ?? siteConfig.socials.github}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10"
              >
                View on GitHub
                <ExternalLink className="h-4 w-4" />
              </a>
            </motion.article>
          ))}
        </div>

        {loading ? <p className="mt-6 text-sm text-slate-400">Fetching public repositories...</p> : null}
      </div>
    </section>
  );
}
