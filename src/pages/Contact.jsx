import { ArrowUpRight, Mail, MapPin, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import AmbientField from '../components/AmbientField';
import PageShell from '../components/PageShell';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import SocialLinks from '../components/SocialLinks';

export default function Contact() {
  const formRef = useRef(null); const [status, setStatus] = useState('idle'); const [message, setMessage] = useState('');
  async function submit(event) {
    event.preventDefault(); if (status === 'sending') return;
    if (!emailjs?.sendForm) { setStatus('error'); setMessage('The message service is unavailable. Please email me directly instead.'); return; }
    setStatus('sending'); setMessage('');
    try { await emailjs.sendForm('service_su6pyfv', 'template_fq7byqe', formRef.current, { publicKey: 'r0Ke9SEJtUOKvP8xw' }); setStatus('success'); setMessage('Message sent successfully. I’ll get back to you soon.'); formRef.current.reset(); }
    catch { setStatus('error'); setMessage('Something went wrong. Please try again or email me directly.'); }
  }
  return <PageShell><SEO title="Contact | Kris Dane Madlambayan" description="Contact Kris Dane Madlambayan to discuss internships, front-end development, web projects, and creative collaboration." />
    <section className="page-hero contact-hero"><AmbientField compact /><div className="container"><span className="page-index-mark">05 / 05</span><p className="eyebrow"><span />Contact</p><h1>Let&apos;s build something<br /><em>thoughtful together.</em></h1><p>I&apos;m open to internships, collaborative projects, creative ideas, and opportunities to grow as a front-end developer.</p></div></section>
    <section className="section contact-section"><div className="container contact-layout"><Reveal className="contact-info"><p className="eyebrow"><span />Start a conversation</p><h2>Have a project or opportunity in mind?</h2><p>Share a little about what you&apos;re working on. I&apos;ll respond as soon as I can.</p><div className="contact-methods"><a href="mailto:krisdane1234@gmail.com"><span><Mail /></span><div><small>Email</small><strong>krisdane1234@gmail.com</strong></div><ArrowUpRight /></a><div><span><MapPin /></span><div><small>Location</small><strong>San Fernando City, Pampanga</strong></div></div></div><SocialLinks labels /></Reveal><Reveal className="form-card" delay={.1}><form ref={formRef} onSubmit={submit}><div className="field-row"><label>Name<input type="text" name="name" autoComplete="name" placeholder="Your name" required /></label><label>Email<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label></div><label>Phone <small>(optional)</small><input type="tel" name="number" autoComplete="tel" placeholder="Your phone number" /></label><label>Message<textarea name="message" rows="7" placeholder="Tell me about your idea or opportunity..." required /></label><button className="button button-primary submit-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : status === 'success' ? 'Message sent' : 'Send message'}<Send size={17} /></button><p className={`form-message ${status}`} role="status" aria-live="polite">{message}</p></form></Reveal></div></section>
  </PageShell>;
}
