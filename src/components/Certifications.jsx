import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { certifications } from '../data/certifications';

export function Certifications() {
  return (
    <section className="section-space relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials that support the technical profile"
          description="Certificate images, IDs, and verification links can be connected later without changing the card layout."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {certifications.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="glass-card p-5"
            >
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/6 to-cyan-400/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{item.category}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.issuer}</p>
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                {item.credentialId && !item.credentialId.includes('PLACEHOLDER') ? <p><span className="text-slate-400">Credential ID:</span> {item.credentialId}</p> : null}
                {item.verifyLink && !item.verifyLink.includes('PLACEHOLDER') ? <p><span className="text-slate-400">Verify:</span> {item.verifyLink}</p> : null}
              </div>
              <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-300">
                <span>{item.image ? 'View certificate' : 'Certificate image unavailable'}</span>
                {item.image ? <ExternalLink className="h-4 w-4" /> : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
