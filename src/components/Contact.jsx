import { useState } from 'react';
import { Send, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { siteConfig } from '../data/site';

const initialFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function Contact() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Name is required.';
    if (!formData.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'Enter a valid email address.';
    if (!formData.subject.trim()) nextErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) nextErrors.message = 'Message is required.';
    else if (formData.message.trim().length < 20) nextErrors.message = 'Message should be at least 20 characters.';
    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('validation-error');
      return;
    }

    if (!siteConfig.contact.endpoint || siteConfig.contact.endpoint.startsWith('YOUR_')) {
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
      window.location.href = `mailto:${siteConfig.socials.email}?subject=${subject}&body=${body}`;
      return;
    }

    try {
      setStatus('sending');
      const response = await fetch(siteConfig.contact.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setFormData(initialFormState);
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  };

  return (
    <section id="contact" className="section-space relative pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build something interesting"
          description="I’m open to discussions about software development, AI applications, IoT systems, embedded projects, automation, and technology ideas."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="glass-card space-y-4 p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name}>
                <input name="name" value={formData.name} onChange={handleChange} className="form-field" />
              </Field>
              <Field label="Email" error={errors.email}>
                <input name="email" type="email" value={formData.email} onChange={handleChange} className="form-field" />
              </Field>
            </div>
            <Field label="Subject" error={errors.subject}>
              <input name="subject" value={formData.subject} onChange={handleChange} className="form-field" />
            </Field>
            <Field label="Message" error={errors.message}>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="6" className="form-field resize-none" />
            </Field>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>

            {status === 'validation-error' ? <p className="text-sm text-rose-300">Please fix the highlighted fields.</p> : null}
            {status === 'configure' ? <p className="text-sm text-amber-200">Configure a contact endpoint in the data file to enable sending.</p> : null}
            {status === 'failed' ? <p className="text-sm text-rose-300">Unable to send the message right now.</p> : null}
            {status === 'sent' ? <p className="text-sm text-emerald-300">Message sent successfully.</p> : null}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="glass-card p-6 sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">Direct links</p>
            <div className="mt-5 space-y-3">
              <a href={siteConfig.socials.github} target="_blank" rel="noreferrer" className="contact-link"><Github className="h-4 w-4" /> GitHub</a>
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" className="contact-link"><Linkedin className="h-4 w-4" /> LinkedIn</a>
              <a href={`mailto:${siteConfig.socials.email}`} className="contact-link"><Mail className="h-4 w-4" /> Email</a>
              <a href={`tel:${siteConfig.socials.phone}`} className="contact-link"><Phone className="h-4 w-4" /> {siteConfig.socials.phone}</a>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-base-950/60 p-5">
              <p className="text-sm font-semibold text-white">What I typically discuss</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>Software systems, API design, and backend architecture</li>
                <li>IoT prototypes, embedded control, and sensor integration</li>
                <li>AI document workflows, search systems, and local LLM tooling</li>
                <li>Freelance delivery, client requirements, and technical collaboration</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs text-rose-300">{error}</span> : null}
    </label>
  );
}
