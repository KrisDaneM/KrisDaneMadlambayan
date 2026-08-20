import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  CircleDot,
  Code2,
  Database,
  GraduationCap,
  MonitorSmartphone,
  PanelsTopLeft,
  Search,
  Send,
  Share2,
  Sparkles,
  Target,
  UserRound,
  UserRoundCheck,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  SiAngular,
  SiCloudinary,
  SiCss,
  SiExpress,
  SiFigma,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPhp,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from 'react-icons/si';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import { skills } from '../data/site';
import { projects } from '../data/projects';
import { resumeProfile, workflowTools } from '../data/resume';

const ease = [0.22, 1, 0.36, 1];

function CanvaIcon(props) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4" /><path d="M15.8 8.4c-.8-1-1.9-1.5-3.2-1.5-2.8 0-4.8 2.2-4.8 5.2 0 2.9 1.8 5 4.6 5 1.4 0 2.6-.5 3.5-1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
}

const sectionRail = [
  ['about', 'About'],
  ['identity', 'Identity'],
  ['philosophy', 'Philosophy'],
  ['process', 'Process'],
  ['toolkit', 'Toolkit'],
  ['capabilities', 'Capabilities'],
  ['education', 'Education'],
];

const philosophy = [
  ['Curiosity', Search, 'I ask why, explore constantly, and enjoy learning beyond the obvious.'],
  ['Practice', Code2, 'Ideas become real through consistent practice and building in public.'],
  ['Direction', Send, 'I focus on impact, solve real problems, and keep moving forward.'],
];

const process = [
  ['Responsive by default', 'Interfaces should remain useful, readable, and intentional on every screen.'],
  ['People before patterns', 'Good decisions begin with what a person needs to understand and accomplish.'],
  ['Clean implementation', 'Structure, consistency, and maintainability matter as much as the visual result.'],
  ['Always learning', 'I keep exploring tools and approaches where they add genuine value.'],
];

const technologyIcons = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  'Vue.js': SiVuedotjs,
  Angular: SiAngular,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  PHP: SiPhp,
  Figma: SiFigma,
  Canva: CanvaIcon,
  GitHub: SiGithub,
  Vercel: SiVercel,
  Cloudinary: SiCloudinary,
  'Responsive Design': MonitorSmartphone,
  'UI Design': PanelsTopLeft,
  'UX Design': UserRoundCheck,
  'Database Fundamentals': Database,
};

const fromSkills = (items) => items.filter((item) => skills.includes(item));
const toolkitGroups = [
  { id: 'frontend', title: 'Front-End', items: fromSkills(['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Angular', 'TypeScript']) },
  { id: 'design', title: 'Design / UI', items: fromSkills(['Responsive Design', 'UI Design', 'UX Design', 'Figma', 'Canva']) },
  { id: 'backend', title: 'Back-End', items: fromSkills(['Node.js', 'Express', 'PHP']) },
  { id: 'data', title: 'Data', items: fromSkills(['MongoDB', 'Database Fundamentals']) },
  { id: 'workflow', title: 'Tools / Workflow', items: workflowTools.filter((item) => ['GitHub', 'Vercel', 'Cloudinary'].includes(item)) },
].filter((group) => group.items.length);

const toolkitBuildFlow = [
  ['Design', 'Figma', SiFigma],
  ['Build', 'Front-end', Code2],
  ['Connect', 'APIs', Braces],
  ['Store', 'MongoDB', SiMongodb],
  ['Ship', 'Vercel', SiVercel],
];

const projectBySlug = new Map(projects.map((project) => [project.slug, project]));
const capabilityMap = [
  {
    title: 'Responsive front-end development',
    description: 'Building accessible, user-focused interfaces that adapt clearly across desktop, tablet, and mobile experiences.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    projects: ['smartcalc', 'recowebdation', 'attheblanc'],
    primary: true,
  },
  {
    title: 'User-centered interfaces',
    description: 'Organizing content and interactions around clarity, usability, accessibility, and responsive behavior.',
    technologies: ['UI Design', 'UX Design', 'Responsive Design'],
    projects: ['thryve', 'socconsult'],
  },
  {
    title: 'Application & API integration',
    description: 'Connecting front-end experiences with application logic, APIs, and data-driven functionality.',
    technologies: ['Vue.js', 'Angular', 'TypeScript'],
    projects: ['thryve', 'ac-core'],
  },
  {
    title: 'Back-end foundations',
    status: 'Growing capability',
    description: 'Continuously improving server-side development, API handling, and database fundamentals to build more complete applications.',
    technologies: ['Node.js', 'Express', 'MongoDB'],
    projects: ['thryve', 'ac-core', 'socconsult'],
  },
  {
    title: 'Workflow & multi-role systems',
    description: 'Contributing to systems with distinct user roles, records, reporting flows, workflows, and administrative functionality.',
    technologies: ['AC-CORE', 'SOCConsult'],
    projects: ['ac-core', 'socconsult'],
  },
].map((capability) => ({
  ...capability,
  projects: capability.projects.map((slug) => projectBySlug.get(slug)).filter(Boolean),
}));
const capabilityIcons = [MonitorSmartphone, UserRound, Code2, Database, Share2];

function SectionLabel({ index, children }) {
  return <p className="about-v3-label"><span>{index}</span>{children}</p>;
}

function CapabilityArchitecture({ reduce }) {
  return <motion.div className="about-cap-architecture" initial={reduce ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .58, delay: .2, ease }} aria-hidden="true">
    <svg viewBox="0 0 380 470" focusable="false">
      <g className="about-cap-architecture-guides">
        <path d="M190 24V438M42 210H338M76 92L304 342M304 92L76 342" />
        <ellipse cx="190" cy="382" rx="136" ry="58" /><ellipse cx="190" cy="382" rx="104" ry="42" /><ellipse cx="190" cy="382" rx="73" ry="28" />
      </g>
      <g className="about-cap-architecture-stack">
        {[0, 1, 2, 3, 4].map((layer) => <g key={layer} style={{ '--layer': layer }}>
          <polygon points={`190,${116 + layer * 49} 286,${168 + layer * 49} 190,${220 + layer * 49} 94,${168 + layer * 49}`} />
          <path d={`M94 ${168 + layer * 49}V${180 + layer * 49}L190 ${232 + layer * 49}L286 ${180 + layer * 49}V${168 + layer * 49}`} />
        </g>)}
      </g>
      <g className="about-cap-architecture-nodes"><circle cx="42" cy="210" r="3" /><circle cx="338" cy="210" r="3" /><circle cx="190" cy="24" r="3" /><circle cx="190" cy="438" r="3" /><circle cx="77" cy="93" r="2" /><circle cx="303" cy="93" r="2" /></g>
    </svg>
  </motion.div>;
}

function InterfacePreview({ size, type }) {
  return <div className={`about-fe-device about-fe-device--${type}`}>
    <div><i /><span /><span /><b /></div>
    <small>{size}</small>
  </div>;
}

function FrontendSystem({ reduce }) {
  const enter = (delay, x = 0, y = 10) => ({
    initial: reduce ? false : { opacity: 0, x, y },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: .48, delay, ease },
  });

  return <motion.div className="about-fe-system" initial={reduce ? false : { opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .56, delay: .2, ease }} aria-hidden="true">
    <svg className="about-fe-signals" viewBox="0 0 900 620" preserveAspectRatio="none" focusable="false">
      <path className="about-fe-signal about-fe-signal--user" d="M208 32V90H420V132" />
      <path className="about-fe-signal about-fe-signal--code" d="M285 284H340V246H390" />
      <path className="about-fe-signal" d="M565 60H720V138" />
      <path className="about-fe-signal" d="M130 440H264V414" />
      <path className="about-fe-signal" d="M784 278H846V222" />
      <path className="about-fe-signal" d="M765 405H862V378" />
    </svg>

    <motion.div className="about-fe-label about-fe-label--user" {...enter(.62, 0, -8)}><UserRound /><span><i />USER FOCUSED</span></motion.div>
    <motion.div className="about-fe-label about-fe-label--system" {...enter(.66, 8, 0)}><i />FRONT-END SYSTEM</motion.div>
    <motion.div className="about-fe-label about-fe-label--responsive" {...enter(.74, -8, 0)}><i />RESPONSIVE</motion.div>
    <motion.div className="about-fe-label about-fe-label--clean" {...enter(.78, 8, 0)}><Code2 /><span><i />CLEAN CODE</span></motion.div>
    <motion.div className="about-fe-label about-fe-label--details" {...enter(.84, 8, 0)}><i />DETAILS MATTER</motion.div>

    <motion.div className="about-fe-browser-entry" {...enter(.42, 0, 8)}>
      <div className="about-fe-browser">
        <header><div><i /><i /><i /></div><b>KDM<span>.</span></b><small>WORK&nbsp;&nbsp;&nbsp; ABOUT&nbsp;&nbsp;&nbsp; CONTACT</small></header>
        <div className="about-fe-browser-body">
          <div className="about-fe-browser-media"><i /><i /></div>
          <div className="about-fe-browser-copy"><i /><i /><i /><b /></div>
          <div className="about-fe-browser-cards"><i /><i /><i /></div>
        </div>
      </div>
    </motion.div>

    <motion.div className="about-fe-code" {...enter(.5, -12, 0)}>
      <header><Code2 /><span>FRONT-END / JSX</span></header>
      <ol>
        <li><span>01</span><code>&lt;header class=&quot;site-header&quot;&gt;</code></li>
        <li><span>02</span><code>&nbsp;&nbsp;&lt;nav class=&quot;nav&quot;&gt;</code></li>
        <li><span>03</span><code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;a href=&quot;/&quot;&gt;KDM.&lt;/a&gt;</code></li>
        <li><span>04</span><code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;ul class=&quot;nav__list&quot;&gt;</code></li>
        <li><span>05</span><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;Work&lt;/li&gt;</code></li>
        <li><span>06</span><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;About&lt;/li&gt;</code></li>
        <li><span>07</span><code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/ul&gt;</code></li>
        <li><span>08</span><code>&nbsp;&nbsp;&lt;/nav&gt;</code></li>
        <li><span>09</span><code>&lt;/header&gt;</code></li>
      </ol>
    </motion.div>

    <motion.div className="about-fe-devices" {...enter(.64, 0, 8)}>
      <i className="about-fe-breakpoint-signal" />
      <InterfacePreview size="1440PX" type="desktop" />
      <InterfacePreview size="1024PX" type="laptop" />
      <InterfacePreview size="768PX" type="tablet" />
      <InterfacePreview size="375PX" type="mobile" />
    </motion.div>

    <motion.div className="about-fe-components" {...enter(.72, 10, 0)}>
      <section><small>BUTTON</small><div className="about-fe-buttons"><i /><i /></div></section>
      <section><small>INPUT</small><div className="about-fe-input" /></section>
      <section><small>CARD</small><div className="about-fe-card"><i /><span><b /><b /></span></div></section>
    </motion.div>
    <i className="about-fe-ambient-node" />
  </motion.div>;
}

export default function About() {
  const reduce = useReducedMotion();
  const [activeSection, setActiveSection] = useState('about');

  const reveal = (delay = 0) => reduce ? {} : {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .1 },
    transition: { duration: .5, delay, ease },
  };

  useEffect(() => {
    const sections = sectionRail.map(([id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActiveSection(visible[0].target.id);
    }, { rootMargin: '-28% 0px -56% 0px', threshold: [0, .1, .25, .5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const educationPeriod = resumeProfile.education.period;

  return (
    <PageShell>
      <SEO title="About | Kris Dane Madlambayan" description="Learn about Kris Dane Madlambayan, an Information Technology student and front-end-focused web developer passionate about responsive, accessible digital products." image="/assets/aboutpic.webp" path="/about" />
      <main className={`about-v3${reduce ? ' is-reduced' : ''}`}>
        <aside className="about-v3-rail" aria-label="About page sections">
          <i aria-hidden="true" />
          {sectionRail.map(([id, label]) => <a key={id} className={activeSection === id ? 'is-active' : ''} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}><span />{label}</a>)}
        </aside>

        <section className="about-v3-hero" id="about">
          <div className="about-v3-grid" aria-hidden="true" />
          <div className="container about-v3-hero-layout">
            <div className="about-v3-hero-copy">
              <motion.div initial={reduce ? false : { opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .42, delay: .08, ease }}><SectionLabel index="01">ABOUT</SectionLabel></motion.div>
              <h1><motion.span initial={reduce ? false : { opacity: 0, y: 12, clipPath: 'inset(100% 0 0)' }} animate={{ opacity: 1, y: 0, clipPath: 'inset(0)' }} transition={{ duration: .5, delay: .16, ease }}>Building with</motion.span><motion.span initial={reduce ? false : { opacity: 0, y: 12, clipPath: 'inset(100% 0 0)' }} animate={{ opacity: 1, y: 0, clipPath: 'inset(0)' }} transition={{ duration: .5, delay: .23, ease }}>clarity and</motion.span><motion.span initial={reduce ? false : { opacity: 0, y: 12, clipPath: 'inset(100% 0 0)' }} animate={{ opacity: 1, y: 0, clipPath: 'inset(0)' }} transition={{ duration: .5, delay: .3, ease }}><em>purpose.</em></motion.span></h1>
              <motion.p initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .48, delay: .34, ease }}>{resumeProfile.summary}</motion.p>
              <motion.div className="about-v3-hero-actions" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: .41, ease }}>
                <Link className="about-v3-button about-v3-button--primary" to="/projects">VIEW MY WORK <ArrowUpRight /></Link>
                <Link className="about-v3-button" to="/contact">GET IN TOUCH <ArrowUpRight /></Link>
              </motion.div>
            </div>
            <div className="about-v3-hero-visual"><FrontendSystem reduce={reduce} /></div>
          </div>
        </section>

        <section className="about-v3-section about-v3-identity" id="identity">
          <div className="container">
            <motion.article className="about-v3-identity-panel" {...reveal()}>
              <figure className="about-v3-portrait">
                <img src="/assets/aboutpic.webp" alt="Portrait of Kris Dane Madlambayan" width="1280" height="1280" />
                <i aria-hidden="true" /><b aria-hidden="true" />
                <figcaption>KDM / PORTRAIT</figcaption>
              </figure>
              <div className="about-v3-identity-copy">
                <SectionLabel index="02">IDENTITY</SectionLabel>
                <span className="about-v3-quote" aria-hidden="true">“</span>
                <h2>I&apos;m a developer who cares about details, users, and elegance in equal measure.</h2>
                <p>{resumeProfile.summary}</p>
                <div className="about-v3-attributes">
                  <div><Target /><span><small>FOCUS</small>Scalable solutions</span></div>
                  <div><Sparkles /><span><small>MINDSET</small>Growth-driven</span></div>
                  <div><CircleDot /><span><small>MOTIVATION</small>Meaningful impact</span></div>
                </div>
              </div>
            </motion.article>
          </div>
        </section>

        <section className="about-v3-section about-v3-philosophy" id="philosophy">
          <div className="container about-v3-editorial-grid">
            <motion.div {...reveal()}>
              <SectionLabel index="03">PHILOSOPHY</SectionLabel>
              <h2>A mindset<br />for building<br /><em>better.</em></h2>
            </motion.div>
            <div className="about-v3-philosophy-system">
              <motion.i className="about-v3-handoff-line" aria-hidden="true" initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .72, delay: .12, ease }} />
              <div className="about-v3-philosophy-items">
                {philosophy.map(([title, Icon, description], index) => <motion.article key={title} {...reveal(.16 + index * .16)}><span>{String(index + 1).padStart(2, '0')}</span><Icon aria-hidden="true" /><h3>{title}</h3><p>{description}</p><i aria-hidden="true" /></motion.article>)}
              </div>
            </div>
          </div>
        </section>

        <section className="about-v3-section about-v3-process" id="process">
          <div className="container about-process-layout">
            <motion.header className="about-process-intro" {...reveal()}>
              <SectionLabel index="04">PROCESS</SectionLabel>
              <h2>A considered route from screen to system.</h2>
              <p>Each decision moves from understanding the screen and its users toward a clear, maintainable result.</p>
            </motion.header>
            <div className="about-process-track">
              <motion.i className="about-process-rail" aria-hidden="true" initial={reduce ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .62, delay: .1, ease }} />
              {!reduce && <motion.b className="about-process-signal" aria-hidden="true" initial={{ opacity: 0, y: 0 }} whileInView={{ opacity: [0, 1, 1, 1, 0], y: [0, 86, 172, 258, 258] }} viewport={{ once: true, amount: .08 }} transition={{ duration: 1.05, delay: .28, ease }} />}
              <div className="about-process-steps">
                {process.map(([title, description], index) => <motion.article key={title} {...reveal(.22 + index * .1)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                  <i aria-hidden="true" />
                </motion.article>)}
              </div>
            </div>
          </div>
        </section>

        <section className="about-v3-section about-v3-toolkit" id="toolkit">
          <div className="about-toolkit-grid-bg" aria-hidden="true" />
          <div className="container about-toolkit-composition">
            <div className="about-toolkit-top">
              <motion.header className="about-toolkit-intro" {...reveal()}>
                <motion.i className="about-toolkit-guide" aria-hidden="true" initial={reduce ? false : { opacity: 0, scaleY: 0 }} whileInView={{ opacity: 1, scaleY: 1 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .55, delay: .12, ease }}><b /><span /></motion.i>
                <p className="about-toolkit-kicker"><span>01</span>TOOLKIT</p>
                <h2><span>Tools I use to</span><span>turn ideas into</span><em>responsive</em><em>digital</em><em>experiences.</em></h2>
                <p>Organized around the work they support, from interface design and front-end implementation to application foundations and delivery.</p>
              </motion.header>
              <div className="about-toolkit-primary">
                {toolkitGroups.slice(0, 2).map((group, groupIndex) => <motion.article className={`about-toolkit-group about-toolkit-group--${group.id}`} key={group.id} {...reveal(.12 + groupIndex * .1)}>
                  <header><span>{String(groupIndex + 1).padStart(2, '0')}</span><h3>{group.title}</h3><i aria-hidden="true"><b /></i></header>
                  <ul>{group.items.map((technology, itemIndex) => { const Icon = technologyIcons[technology] || Braces; return <motion.li key={technology} initial={reduce ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .45, delay: .2 + groupIndex * .1 + itemIndex * .035, ease }}><Icon aria-hidden="true" /><span>{technology}</span><i aria-hidden="true" /></motion.li>; })}</ul>
                </motion.article>)}
                <div className="about-toolkit-flow">
                  <header><span><b>03</b>BUILD FLOW</span><motion.i aria-hidden="true" initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .58, delay: .32, ease }}><b /></motion.i></header>
                  <ol>{toolkitBuildFlow.map(([stage, tool, Icon], index) => <motion.li key={stage} initial={reduce ? false : { opacity: 0, y: 7 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .38, delay: .38 + index * .06, ease }}><span className="about-toolkit-flow-icon"><Icon aria-hidden="true" /></span><i className="about-toolkit-flow-node" aria-hidden="true" /><strong>{stage}</strong><small>{tool}</small>{index < toolkitBuildFlow.length - 1 && <ArrowRight aria-hidden="true" />}</motion.li>)}</ol>
                </div>
              </div>
            </div>
            <div className="about-toolkit-secondary">
              {toolkitGroups.slice(2).map((group, groupIndex) => <motion.article className={`about-toolkit-group about-toolkit-group--${group.id}`} key={group.id} {...reveal(.28 + groupIndex * .08)}>
                <header><span>{String(groupIndex + 4).padStart(2, '0')}</span><h3>{group.title}</h3><i aria-hidden="true"><b /></i></header>
                <ul>{group.items.map((technology, itemIndex) => { const Icon = technologyIcons[technology] || Braces; return <motion.li key={technology} initial={reduce ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .45, delay: .38 + groupIndex * .08 + itemIndex * .035, ease }}><Icon aria-hidden="true" /><span>{technology}</span><i aria-hidden="true" /></motion.li>; })}</ul>
              </motion.article>)}
            </div>
          </div>
        </section>

        <section className="about-v3-section about-v3-capabilities" id="capabilities">
          <div className="about-cap-map-grid" aria-hidden="true" />
          <div className="container about-cap-layout">
            <motion.header className="about-cap-intro" {...reveal()}>
              <p className="about-cap-kicker"><span>02</span><i>//</i> CAPABILITIES</p>
              <h2><span>Capabilities</span><span>shaped by</span><em>real projects</em><em>and practical</em><em>work.</em></h2>
              <p className="about-cap-summary">I combine clean implementation, thoughtful interaction, and attention to detail to build digital experiences that are useful, usable, and built to last.</p>
              <CapabilityArchitecture reduce={reduce} />
              <a className="about-cap-approach" href="#philosophy"><i aria-hidden="true" />MY APPROACH <ArrowRight aria-hidden="true" /></a>
              <span className="about-cap-intro-guide" aria-hidden="true"><i /></span>
            </motion.header>

            <div className="about-cap-network">
              <div className="about-cap-list">
                <motion.i className="about-cap-timeline" aria-hidden="true" initial={reduce ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: .05 }} transition={{ duration: .82, delay: .08, ease }} />
                {capabilityMap.map((capability, index) => {
                  const CapabilityIcon = capabilityIcons[index];
                  return <motion.article className={`about-cap-item about-cap-item--${index + 1}${capability.primary ? ' is-primary' : ''}`} key={capability.title} {...reveal(.2 + index * .08)}>
                    <div className="about-cap-index"><strong>{String(index + 1).padStart(2, '0')}</strong><span><CapabilityIcon aria-hidden="true" /></span></div>
                    <div className="about-cap-copy">
                      {capability.status && <small>{capability.status}</small>}
                      <h3>{capability.title}</h3>
                      <p>{capability.description}</p>
                      <ul aria-label={`${capability.title} technologies`}>{capability.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                    </div>
                    <div className="about-cap-work">
                      <small>RELATED WORK</small>
                      {capability.projects.map((project) => <Link key={project.slug} to={`/projects/${project.slug}`}>{project.title}<ArrowRight aria-hidden="true" /></Link>)}
                    </div>
                  </motion.article>;
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="about-v3-section about-v3-education" id="education">
          <div className="container">
            <motion.article {...reveal()}>
              <div className="about-v3-education-pattern" aria-hidden="true"><i /><i /><i /></div>
              <div className="about-v3-education-icon" aria-hidden="true"><GraduationCap /></div>
              <div className="about-v3-education-copy">
                <SectionLabel index="07">EDUCATION</SectionLabel>
                <h2>{resumeProfile.education.school}</h2>
                <p>{resumeProfile.education.degree}</p>
                <span>{educationPeriod}</span>
              </div>
              <Link to="/resume">VIEW RÉSUMÉ <ArrowRight /></Link>
            </motion.article>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
