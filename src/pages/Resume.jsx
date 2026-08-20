import { ArrowRight, Award, Braces, CircleDot, Code2, Download, GraduationCap, Mail, MapPin, Phone, Wrench } from 'lucide-react';
import AmbientField from '../components/AmbientField';
import PageShell from '../components/PageShell';
import Reveal from '../components/Reveal';
import ResumeDownloads from '../components/ResumeDownloads';
import ResumeQuickNav from '../components/ResumeQuickNav';
import ResumeStats from '../components/ResumeStats';
import ResumeTechMatrix from '../components/ResumeTechMatrix';
import SEO from '../components/SEO';
import { certifications } from '../data/site';
import { buildCapabilities, coreStrengths, currentFocus, interestGroups, resumeProfile, workflowTools } from '../data/resume';

function ResumeSectionHeading({ index, eyebrow, title, text }) {
  return <div className="resume-section-heading"><p><span>{index}</span>{eyebrow}</p><div className="resume-heading-mask"><Reveal as="h2" distance={18}>{title}</Reveal></div>{text && <p className="resume-section-intro">{text}</p>}</div>;
}

function BasketballMotif() {
  return <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="32" cy="32" r="26" /><path d="M8 24c15 3 25 13 30 32M56 40C41 37 31 27 26 8M32 6c-7 15-7 37 0 52M6 32h52" /></svg>;
}

export default function Resume() {
  return <PageShell><SEO title="Resume | Kris Dane Madlambayan" description="View the education, qualifications, technical expertise, achievements, and freeCodeCamp certifications of web developer Kris Dane Madlambayan." />
    <section className="page-hero resume-hero"><AmbientField compact /><div className="container resume-heading"><span className="page-index-mark">04 / 05</span><div className="resume-hero-main"><p className="eyebrow"><span />Résumé</p><h1>Developer mindset.<br /><em>Designer&apos;s eye.</em></h1><p>Aspiring Web Developer and Front-End Specialist focused on responsive, accessible, and intuitive interfaces.</p><div className="resume-contact"><a href="mailto:krisdane1234@gmail.com"><Mail />krisdane1234@gmail.com</a><a href="tel:+639954834034"><Phone />0995 483 4034</a><span><MapPin />Sindalan, San Fernando City, Pampanga</span></div></div><aside className="resume-hero-index" aria-label="Résumé profile overview"><div><span>Profile</span><strong>Web Developer<br />Front-End Developer</strong></div><div><span>Focus</span><strong>Responsive Interfaces<br />UI/UX · Web Applications</strong></div><div><span>Education</span><strong>BS Information Technology<br />Holy Angel University</strong></div><div><span>Location</span><strong>San Fernando, Pampanga</strong></div></aside></div></section>

    <ResumeQuickNav />

    <section className="resume-content-section resume-summary-section" id="resume-summary"><div className="container resume-summary-grid">
      <Reveal className="resume-summary-card" distance={10}><div className="resume-card-label"><span>01 / Professional summary</span><small>KDM / Profile</small></div><h2>{resumeProfile.summaryHeadline}</h2><p>{resumeProfile.summary}</p><div className="resume-tech-visual" aria-hidden="true"><i /><i /><i /><span /><b>KDM / BUILD SYSTEM</b></div></Reveal>
      <Reveal className="resume-education-card" delay={.07} distance={10}><div className="resume-card-label"><span>Education spotlight</span><GraduationCap aria-hidden="true" /></div><p>Current education</p><h2>{resumeProfile.education.degree}</h2><strong>{resumeProfile.education.school}</strong><span>{resumeProfile.education.location}<br />{resumeProfile.education.period}</span><div className="resume-achievement"><Award aria-hidden="true" /><div><strong>{resumeProfile.education.achievement}</strong><small>{resumeProfile.education.achievementPeriod}</small></div></div><p className="resume-coursework">{resumeProfile.education.coursework.join(' / ')}</p></Reveal>
    </div></section>

    <section className="resume-content-section resume-surface" id="resume-strengths"><div className="container"><ResumeSectionHeading index="02" eyebrow="Core strengths" title="A practical mindset for thoughtful digital work." /><div className="resume-strength-grid">{coreStrengths.map((strength, index) => <Reveal className="resume-strength" delay={index * .06} distance={8} key={strength.title}><div><span>{String(index + 1).padStart(2, '0')}</span><CircleDot aria-hidden="true" /></div><h3>{strength.title}</h3><p>{strength.description}</p><i aria-hidden="true" /></Reveal>)}</div></div></section>

    <section className="resume-content-section" id="resume-expertise"><div className="container"><ResumeSectionHeading index="03" eyebrow="Technical expertise" title="A development toolkit organized by purpose." text="Every listed capability comes from the current résumé data. Project connections are derived from the canonical project stack." /><div className="resume-expertise-grid"><Reveal distance={10}><ResumeTechMatrix /></Reveal><Reveal delay={.07} distance={10}><ResumeStats /></Reveal></div></div></section>

    <section className="resume-content-section resume-surface" id="resume-certificates"><div className="container"><ResumeSectionHeading index="04" eyebrow="Credentials" title="Certifications and continued learning." /><div className="resume-cert-grid">{certifications.map((certificate, index) => <Reveal className="resume-cert-card" delay={index * .07} distance={9} key={certificate.title}><div className="resume-cert-top"><span>{String(index + 1).padStart(2, '0')}</span><Award aria-hidden="true" /></div><p>{certificate.issuer}</p><h3>{certificate.title}</h3><div className="resume-cert-description">{certificate.description}</div><div className="resume-cert-footer"><time>{certificate.date}</time><a href={certificate.url} target="_blank" rel="noopener noreferrer">View certificate <ArrowRight aria-hidden="true" /></a></div><i aria-hidden="true" /></Reveal>)}</div></div></section>

    <section className="resume-content-section resume-capability-section"><div className="container"><ResumeSectionHeading index="05" eyebrow="Capability map" title="What I can build—and what I am refining next." /><div className="resume-capability-grid">
      <Reveal className="resume-build-panel" distance={9}><div className="resume-card-label"><span>What I can build</span><Braces aria-hidden="true" /></div><div>{buildCapabilities.map((capability, index) => <article key={capability.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{capability.title}</h3><p>{capability.detail}</p></div><i aria-hidden="true" /></article>)}</div></Reveal>
      <Reveal className="resume-focus-panel" delay={.06} distance={9}><div className="resume-card-label"><span>Current focus</span><CircleDot aria-hidden="true" /></div>{currentFocus.map((focus, index) => <div key={focus}><span>{String(index + 1).padStart(2, '0')}</span><p>{focus}</p><i aria-hidden="true" /></div>)}</Reveal>
      <Reveal className="resume-workflow-panel" delay={.12} distance={9}><div className="resume-card-label"><span>Tools & workflow</span><Wrench aria-hidden="true" /></div><div>{workflowTools.map((tool, index) => <span key={tool}><i>{String(index + 1).padStart(2, '0')}</i>{tool}</span>)}</div></Reveal>
    </div></div></section>

    <section className="resume-content-section resume-surface" id="resume-interests"><div className="container"><ResumeSectionHeading index="06" eyebrow="Interests" title="Curiosity inside and outside the screen." /><div className="resume-interest-grid">{interestGroups.map((group, index) => <Reveal className={`resume-interest-panel resume-interest-${index === 0 ? 'code' : 'outside'}`} delay={index * .07} distance={9} key={group.title}><div className="resume-interest-motif" aria-hidden="true">{index === 0 ? <Code2 /> : <BasketballMotif />}</div><div><span>{String(index + 1).padStart(2, '0')}</span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div></Reveal>)}</div></div></section>

    <section className="resume-content-section resume-download-section" id="resume-download"><div className="container resume-download-panel"><Reveal distance={8}><p className="eyebrow"><Download aria-hidden="true" />Downloads</p><div className="resume-heading-mask"><h2>Take my résumé with you.</h2></div><p>Choose the production file format that works best for your review.</p></Reveal><ResumeDownloads /></div></section>
  </PageShell>;
}
