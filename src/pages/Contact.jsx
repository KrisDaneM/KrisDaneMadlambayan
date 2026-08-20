import { AlertCircle, ArrowUpRight, CheckCircle2, Mail, MapPin, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, useReducedMotion } from 'framer-motion';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import SocialLinks from '../components/SocialLinks';
import { portfolioProfile } from '../data/site';

const ease = [0.22, 1, 0.36, 1];

function ContactSignal({ reduce }) {
  return (
    <motion.div
      className="contact-v2-signal-entry"
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0, scale: .98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: .62, delay: .28, ease }}
    >
      <div className="contact-v2-signal-system">
        <div className="contact-v2-signal-grid" />
        <svg viewBox="0 0 620 500" focusable="false">
          <circle className="contact-v2-signal-ring contact-v2-signal-ring--outer" cx="310" cy="250" r="205" />
          <ellipse className="contact-v2-signal-ring contact-v2-signal-ring--ellipse" cx="310" cy="250" rx="270" ry="126" />
          <path className="contact-v2-signal-arc" d="M129 143A224 224 0 0 1 509 166M508 347A224 224 0 0 1 142 373" />
          <path className="contact-v2-signal-cross" d="M77 250h466M310 36v428" />
          <g className="contact-v2-signal-ticks"><path d="M310 36v14M310 450v14M96 250h14M510 250h14M159 99l10 10M451 391l10 10" /></g>
          <circle className="contact-v2-node contact-v2-node--one" cx="118" cy="191" r="5" />
          <circle className="contact-v2-node contact-v2-node--two" cx="493" cy="156" r="4" />
          <circle className="contact-v2-node contact-v2-node--three" cx="468" cy="375" r="5" />
        </svg>
        <div className="contact-v2-signal-route"><i /></div>
        <div className="contact-v2-signal-wave" />
        <div className="contact-v2-signal-core"><i /><b /></div>
        <span className="contact-v2-signal-note contact-v2-signal-note--left">MESSAGE / OUTBOUND</span>
        <span className="contact-v2-signal-note contact-v2-signal-note--right">CHANNEL / OPEN</span>
      </div>
    </motion.div>
  );
}

function Field({ children, delay = 0, error, id, label, optional = false, reduce }) {
  return (
    <motion.div className={`contact-v2-field${error ? ' has-error' : ''}`} initial={reduce ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .42, delay, ease }}>
      <label htmlFor={id}>{label}{optional && <small>OPTIONAL</small>}</label>
      <span className="contact-v2-field-control">{children}<i aria-hidden="true" /></span>
      {error && <small className="contact-v2-field-error" id={`${id}-error`}><AlertCircle aria-hidden="true" />{error}</small>}
    </motion.div>
  );
}

export default function Contact() {
  const formRef = useRef(null);
  const reduce = useReducedMotion();
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const describeInvalidField = (field) => {
    if (field.validity.valueMissing) return `${field.dataset.label} is required.`;
    if (field.validity.typeMismatch) return 'Enter a valid email address.';
    return `Check the ${field.dataset.label.toLowerCase()} field.`;
  };

  const handleInvalid = (event) => {
    const field = event.target;
    if (!field.name) return;
    setErrors((current) => ({ ...current, [field.name]: describeInvalidField(field) }));
  };

  const handleInput = (event) => {
    const field = event.target;
    if (status === 'success' || status === 'error') {
      setStatus('idle');
      setMessage('');
    }
    if (field.name && field.validity.valid && errors[field.name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field.name];
        return next;
      });
    }
  };

  async function submit(event) {
    event.preventDefault();
    if (status === 'sending') return;
    if (!emailjs?.sendForm) {
      setStatus('error');
      setMessage('The message service is unavailable. Please email me directly instead.');
      return;
    }
    setStatus('sending');
    setMessage('');
    const form = formRef.current;
    try {
      await emailjs.sendForm('service_su6pyfv', 'template_fq7byqe', form, { publicKey: 'r0Ke9SEJtUOKvP8xw' });
      setStatus('success');
      setMessage('Message sent successfully. I’ll get back to you soon.');
      setErrors({});
      form?.reset();
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again or email me directly.');
    }
  }

  const lineMotion = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 14, clipPath: 'inset(100% 0 0 0)' },
    animate: { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' },
    transition: { duration: .52, delay, ease },
  });

  return (
    <PageShell>
      <SEO title="Contact | Kris Dane Madlambayan" description="Contact Kris Dane Madlambayan to discuss internships, front-end development, web projects, and creative collaboration." />
      <div className={`contact-v2${reduce ? ' is-reduced' : ''}`}>
        <section className="contact-v2-hero" aria-labelledby="contact-title">
          <div className="contact-v2-grid" aria-hidden="true" />
          <div className="container contact-v2-hero-layout">
            <div className="contact-v2-hero-copy">
              <motion.p className="contact-v2-label" initial={reduce ? false : { opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .45, delay: .1, ease }}><i aria-hidden="true" />CONTACT</motion.p>
              <h1 id="contact-title">
                <motion.span {...lineMotion(.18)}>Let&apos;s build</motion.span>
                <motion.span {...lineMotion(.25)}>something</motion.span>
                <motion.span className="contact-v2-title-accent" {...lineMotion(.32)}>thoughtful together.</motion.span>
              </h1>
              <motion.p className="contact-v2-hero-intro" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .45, ease }}>I&apos;m open to internships, collaborative projects, creative ideas, and opportunities to grow as a front-end developer.</motion.p>
            </div>
            <ContactSignal reduce={reduce} />
          </div>
        </section>

        <section className="contact-v2-section" aria-labelledby="get-in-touch-title">
          <div className="container">
            <motion.div className="contact-v2-divider" initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .4, ease }}>
              <h2 id="get-in-touch-title"><i aria-hidden="true" />GET IN TOUCH</h2>
              <motion.span aria-hidden="true" initial={reduce ? false : { opacity: 0, x: '-70vw' }} whileInView={{ opacity: [0, 1, 1], x: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .7, ease }} />
            </motion.div>

            <div className="contact-v2-layout">
              <motion.aside className="contact-v2-info-panel" initial={reduce ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .52, ease }}>
                <i className="contact-v2-corner contact-v2-corner--top" aria-hidden="true" />
                <i className="contact-v2-corner contact-v2-corner--bottom" aria-hidden="true" />
                <div className="contact-v2-send-mark" aria-hidden="true"><span><Send /></span></div>
                <p className="contact-v2-panel-label">KDM / DIRECT CHANNEL</p>
                <h3>Have a project or<br />opportunity in mind?</h3>
                <p>Share a little about what you&apos;re working on. I&apos;ll respond as soon as I can.</p>

                <div className="contact-v2-methods">
                  <a href={`mailto:${portfolioProfile.email}`}>
                    <span><Mail aria-hidden="true" /></span>
                    <div><small>EMAIL</small><strong>{portfolioProfile.email}</strong></div>
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                  <div>
                    <span><MapPin aria-hidden="true" /></span>
                    <div><small>LOCATION</small><strong>{portfolioProfile.location}</strong></div>
                  </div>
                </div>

                <div className="contact-v2-socials"><small>SOCIAL CHANNELS</small><SocialLinks labels /></div>
              </motion.aside>

              <motion.div className="contact-v2-form-panel" initial={reduce ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .52, delay: .08, ease }}>
                <motion.i className="contact-v2-form-accent" aria-hidden="true" initial={reduce ? false : { opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .5, delay: .16, ease }} />
                <header className="contact-v2-form-header">
                  <div><p>MESSAGE CHANNEL</p><h3>Send a message.</h3></div>
                  <span aria-hidden="true"><i />CHANNEL READY</span>
                </header>

                <form ref={formRef} onSubmit={submit} onInvalid={handleInvalid} onInput={handleInput} aria-busy={status === 'sending'}>
                  <div className="contact-v2-field-row">
                  <Field id="contact-name" label="YOUR NAME" error={errors.name} reduce={reduce}>
                      <input id="contact-name" type="text" name="name" data-label="Name" autoComplete="name" placeholder="Your name" required aria-invalid={errors.name ? 'true' : undefined} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
                    </Field>
                    <Field id="contact-email" label="EMAIL ADDRESS" error={errors.email} reduce={reduce} delay={.04}>
                      <input id="contact-email" type="email" name="email" data-label="Email" autoComplete="email" placeholder="you@example.com" required aria-invalid={errors.email ? 'true' : undefined} aria-describedby={errors.email ? 'contact-email-error' : undefined} />
                    </Field>
                  </div>
                  <Field id="contact-number" label="PHONE NUMBER" optional error={errors.number} reduce={reduce} delay={.08}>
                    <input id="contact-number" type="tel" name="number" data-label="Phone number" autoComplete="tel" placeholder="Your phone number" aria-invalid={errors.number ? 'true' : undefined} aria-describedby={errors.number ? 'contact-number-error' : undefined} />
                  </Field>
                  <Field id="contact-message" label="MESSAGE" error={errors.message} reduce={reduce} delay={.12}>
                    <textarea id="contact-message" name="message" data-label="Message" rows="7" placeholder="Tell me about your idea or opportunity..." required aria-invalid={errors.message ? 'true' : undefined} aria-describedby={errors.message ? 'contact-message-error' : undefined} />
                  </Field>

                  <div className="contact-v2-submit-row">
                    <button className="contact-v2-submit" type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'}>
                      <span>{status === 'sending' ? 'SENDING' : status === 'success' ? 'MESSAGE SENT' : 'SEND MESSAGE'}</span>
                      {status === 'sending' ? <i className="contact-v2-loading" aria-hidden="true"><b /><b /><b /></i> : <Send aria-hidden="true" />}
                    </button>
                    <p>I&apos;ll get back to you as soon as I can.</p>
                  </div>
                  <p className={`contact-v2-form-message ${status}`} role="status" aria-live="polite">
                    {status === 'success' && <CheckCircle2 aria-hidden="true" />}
                    {status === 'error' && <AlertCircle aria-hidden="true" />}
                    {message}
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
