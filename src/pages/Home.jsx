import { ArrowDown, ArrowRight, Download } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AmbientField from '../components/AmbientField';
import LiveMetrics from '../components/LiveMetrics';
import ProofOfWork from '../components/ProofOfWork';
import PageShell from '../components/PageShell';
import ProjectRow from '../components/ProjectRow';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import { featuredProjects } from '../data/projects';
import { skills } from '../data/site';

const capabilityGroups = [
  { number: '01', title: 'Interface', items: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'] },
  { number: '02', title: 'Application', items: ['Vue.js', 'Node.js', 'Express', 'MongoDB'] },
  { number: '03', title: 'Experience', items: ['UI Design', 'UX Design', 'Figma', 'Canva'] },
];

export default function Home() {
  const reduce = useReducedMotion();
  return <PageShell><SEO title="Kris Dane Madlambayan | Web Developer Portfolio" description="The portfolio of Kris Dane Madlambayan, a front-end-focused web developer creating responsive, accessible, and thoughtfully designed digital experiences." />
    <section className="type-hero">
      <AmbientField />
      <div className="container type-hero-grid">
        <motion.div className="hero-index" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }}><span>Portfolio / 2026</span><span>San Fernando, Pampanga</span></motion.div>
        <h1 className="hero-name" aria-label="Kris Dane Madlambayan">
          <motion.span initial={reduce ? false : { opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>Kris</motion.span>
          <motion.span className="hero-name-dane" initial={reduce ? false : { opacity: 0, x: -45 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .08, duration: .65 }}>Dane</motion.span>
          <motion.span className="hero-name-last" initial={reduce ? false : { opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16, duration: .7 }}>Madlambayan<span>.</span></motion.span>
        </h1>
        <motion.div className="hero-profession" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .26 }}><span>Web developer</span><span>Front-end developer</span><span>Creative technologist</span></motion.div>
        <motion.p className="hero-statement" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .32 }}>I build responsive digital experiences where clean implementation, thoughtful interaction, and purposeful design work as one.</motion.p>
        <motion.div className="hero-link-rail" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .4 }}>
          <Link to="/projects">Selected work <ArrowRight /></Link>
          <a href="/downloads/resume.pdf" download="Kris-Dane-Madlambayan-Resume.pdf">Download CV <Download /></a>
          <Link to="/contact">Start a conversation <ArrowRight /></Link>
        </motion.div>
        <a className="editorial-scroll" href="#manifesto"><span><i /></span>Scroll / Explore <ArrowDown /></a>
      </div>
    </section>

    <LiveMetrics />

    <section className="manifesto-section" id="manifesto"><div className="container editorial-grid"><div className="vertical-label">00 / Manifesto</div><Reveal className="manifesto-copy"><p>I care about the space where</p><h2><em>code</em> becomes experience.</h2><p>My work combines front-end development, visual systems, and user-centered thinking to make interfaces that are clear, useful, and considered.</p></Reveal><Reveal className="manifesto-note"><span>Approach</span><p>Professional first.<br />Creative with intent.<br />Always learning.</p></Reveal></div></section>

    <section className="home-work" id="featured"><div className="container"><div className="editorial-heading"><div><span>01 / 05</span><p>Selected work</p></div><h2>Digital products with a clear reason to exist.</h2><Link to="/projects">Full project index <ArrowRight /></Link></div><div className="work-list work-list-selected">{featuredProjects.map((project, index) => <Reveal key={project.slug} delay={index * .06}><ProjectRow project={project} compact number={String(index + 1).padStart(2, '0')} /></Reveal>)}</div></div></section>

    <ProofOfWork />

    <section className="capability-index"><div className="container"><div className="editorial-heading"><div><span>03 / 05</span><p>Capabilities</p></div><h2>A technical toolkit organized around outcomes.</h2></div><div className="capability-rows">{capabilityGroups.map((group) => <Reveal className="capability-row" key={group.title}><span>{group.number}</span><h3>{group.title}</h3><div>{group.items.map((item) => <span key={item}>{item}</span>)}</div></Reveal>)}</div><p className="capability-footnote">Also represented across current work: {skills.filter((skill) => !capabilityGroups.some((group) => group.items.includes(skill))).join(' / ')}</p></div></section>

    <section className="home-about-teaser"><div className="container editorial-grid"><div className="vertical-label">04 / About</div><Reveal className="home-about-statement"><span>Bachelor of Science in Information Technology</span><h2>Learning through building.<br />Refining through design.</h2><p>I&apos;m an Information Technology student at Holy Angel University focused primarily on front-end development, with experience across back-end tools and interface design.</p><Link to="/about">Read my story <ArrowRight /></Link></Reveal><div className="about-coordinate" aria-hidden="true">KDM / PAMPANGA<br />PHILIPPINES</div></div></section>

    <section className="home-contact"><div className="container"><Reveal><span>05 / Continue</span><p>Next page in the sequence</p><Link to="/contact"><strong>Let&apos;s build<br /><em>something.</em></strong><ArrowRight /></Link></Reveal></div></section>
  </PageShell>;
}
