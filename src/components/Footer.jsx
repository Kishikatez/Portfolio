import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/site';

const footerLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-base-950/95">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto_auto] lg:items-start">
          <div>
            <Link to="/#home" className="inline-flex items-center gap-3 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-fuchsia-500 text-sm font-bold text-slate-950">KS</span>
              <span className="font-display text-lg font-semibold tracking-wide">Kishore S</span>
            </Link>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
              Building intelligent systems at the intersection of Software, AI & IoT.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">Navigation</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              {footerLinks.map((link) => (
                <Link key={link.label} to={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">Social</p>
            <div className="mt-4 flex items-center gap-3 text-slate-300">
              <a href={siteConfig.socials.github} target="_blank" rel="noreferrer" className="footer-icon-link" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" className="footer-icon-link" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={`mailto:${siteConfig.socials.email}`} className="footer-icon-link" aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Kishore S. All rights reserved.</p>
          <p>Designed for recruiters, clients, engineering companies, and startups.</p>
        </div>
      </div>
    </footer>
  );
}
