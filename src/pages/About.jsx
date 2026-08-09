import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AmbientField from '../components/AmbientField';
import PageShell from '../components/PageShell';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import { skills } from '../data/site';

const softSkills = ['Patience', 'Focus', 'Creativity', 'Time Management', 'Teamwork', 'Adaptability', 'Problem-solving', 'Reliability'];
const principles = [
  ['01', 'Responsive by default', 'Interfaces should remain useful, readable, and intentional on every screen—not only adapt at the end.'],
  ['02', 'People before patterns', 'Good interface decisions begin with what a person needs to understand and accomplish.'],
  ['03', 'Clean implementation', 'Structure, consistency, and maintainability matter as much as the visual result.'],
  ['04', 'Always learning', 'I keep exploring new tools and approaches, then apply them where they create genuine value.'],
];

export default function About() {
  return <PageShell><SEO title="About | Kris Dane Madlambayan" description="Learn about Kris Dane Madlambayan, an Information Technology student and front-end-focused web developer passionate about responsive, accessible digital products." image="/assets/aboutpic.webp" />
    <section className="about-masthead"><AmbientField compact /><div className="container"><span className="page-index-mark">02 / 05</span><p className="eyebrow"><span />About KDM</p><h1>Code is the material.<br /><em>Experience</em> is the outcome.</h1><p className="about-deck">I&apos;m Kris Dane Madlambayan—an Information Technology student developing at the intersection of front-end engineering and thoughtful interface design.</p></div></section>
    <section className="about-story"><div className="container editorial-grid"><div className="vertical-label">01 / Who I am</div><Reveal className="about-story-lead"><p>I began building websites during my second year of college.</p><h2>Curiosity became practice.<br />Practice became direction.</h2></Reveal><Reveal className="about-story-body"><p>My experience includes both front-end and back-end development, with my primary focus on crafting clear, responsive web interfaces.</p><p>I enjoy turning ideas into user-centered experiences, improving how information is organized, and learning the technologies needed to deliver better work.</p></Reveal></div></section>
    <section className="about-portrait-stage"><div className="container"><Reveal className="about-portrait-editorial"><div className="portrait-rail"><span>KDM / Portrait</span><span>San Fernando, Pampanga</span></div><img src="/assets/aboutpic.webp" alt="Portrait of Kris Dane Madlambayan" width="1280" height="1280" /><div className="portrait-caption"><span>02 / Perspective</span><p>I approach each project with curiosity, patience, and a commitment to continuous improvement.</p></div></Reveal></div></section>
    <section className="principle-index"><div className="container"><div className="editorial-heading"><div><span>03 / How I work</span><p>Principles</p></div><h2>A clear process leaves room for better ideas.</h2></div><div className="principle-lines">{principles.map(([number, title, text]) => <Reveal key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div></div></section>
    <section className="about-skills-index"><div className="container editorial-grid"><div className="vertical-label">04 / Toolkit</div><div className="skills-ledger">{skills.map((skill, index) => <Reveal key={skill} as="span" delay={(index % 5) * .025}><i>{String(index + 1).padStart(2, '0')}</i>{skill}</Reveal>)}</div><div className="soft-ledger"><p>How I contribute</p>{softSkills.map((skill) => <span key={skill}>{skill}</span>)}</div></div></section>
    <section className="about-education"><div className="container"><span>05 / Education</span><h2>Holy Angel University</h2><p>Bachelor of Science in Information Technology<br />2023 — Present</p><Link to="/resume">Open full résumé <ArrowRight /></Link></div></section>
  </PageShell>;
}
