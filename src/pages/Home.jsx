import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LiveMetrics from '../components/LiveMetrics';
import { BrandTechnologyIcon } from '../components/AboutTechnologyStack';
import PageShell from '../components/PageShell';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import { featuredProjects } from '../data/projects';
import { currentFocus, resumeProfile } from '../data/resume';

const ease = [0.22, 1, 0.36, 1];
const HANDOFF_EVENT = 'kdm:splash-home-handoff';
function Label({ number, children }) { return <p className="home-r-label"><span>{number}</span>{children}</p>; }
function HeroOrbit({ reduce, orbitRef, portalEntry }) {
  const portalDelay = portalEntry ? .12 : .08;
  return (
    <div className="home-hero-orbit-position" aria-hidden="true">
      <motion.div
        key={portalEntry ? 'portal-orbit' : 'standard-orbit'}
        className="home-hero-orbit-entry"
        initial={reduce ? false : { opacity: 0, scale: portalEntry ? .75 : .98, rotate: portalEntry ? -8 : 0 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: portalEntry ? .58 : .45, delay: portalDelay, ease }}
      >
        <div ref={orbitRef} className="home-hero-orbit-motion">
          <div className="home-hero-crosshair"><i /><i /></div>
          <div className="home-hero-orbit-ring home-hero-orbit-ring--outer"><i /></div>
          <div className="home-hero-orbit-ring home-hero-orbit-ring--wide"><i /></div>
          <div className="home-hero-orbit-ring home-hero-orbit-ring--tilt"><i /></div>
          <div className="home-hero-orbit-ring home-hero-orbit-ring--dotted"><i /></div>
          <div className="home-hero-orbit-ring home-hero-orbit-ring--inner" />
          <div className="home-hero-orbit-ticks" />
          <div className="home-hero-signal"><i /></div>
          <motion.div
            className="home-hero-lock-line"
            initial={reduce ? false : { opacity: 0, scaleX: 0 }}
            animate={{ opacity: .72, scaleX: 1 }}
            transition={{ duration: .38, delay: 1.18, ease }}
          />
          <motion.i
            className="home-hero-axis-node home-hero-axis-node--left"
            initial={reduce ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .36, delay: 1.18, ease }}
          />
          <motion.i
            className="home-hero-axis-node home-hero-axis-node--right"
            initial={reduce ? false : { opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .36, delay: 1.18, ease }}
          />
          <motion.i
            className="home-hero-lock-wave"
            initial={reduce ? false : { opacity: 0, scale: 1 }}
            animate={reduce ? { opacity: .24, scale: 1 } : { opacity: [0, .42, 0], scale: [1, 1.035, 1.04] }}
            transition={{ duration: .38, delay: 1.18, ease }}
          />
          <div className="home-hero-core-position">
            <motion.div
              className="home-hero-core-entry"
              initial={reduce ? false : { opacity: 0, scale: .88 }}
              animate={{ opacity: .9, scale: 1 }}
              transition={{ duration: .48, delay: .2, ease }}
            >
              <div className="home-hero-core-breath"><i /><b /><em className="home-hero-core-lock-flash" /></div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
function Globe({ reduce }) { return <div className="home-r-globe" aria-hidden="true"><div><i /><i /><i /></div><span className={reduce ? 'is-static' : ''}><b /></span></div>; }

const toolkitPreview = ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Figma', 'Node.js'];
const capabilityPreview = ['Responsive front-end', 'User-centered interfaces', 'Application foundations'];

export default function Home() {
  const reduce = useReducedMotion();
  const [portalState, setPortalState] = useState('idle');
  const orbitRef = useRef(null);
  const pointerFrameRef = useRef(0);
  const portalTimerRef = useRef(null);
  const supportsViewportAnimation = typeof globalThis.IntersectionObserver === 'function';
  const reveal = (delay = 0, amount = .15) => reduce || !supportsViewportAnimation ? {} : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount }, transition: { duration: .5, delay, ease } };

  useEffect(() => {
    const beginPortalEntry = () => {
      if (reduce) return;
      setPortalState('entering');
      window.clearTimeout(portalTimerRef.current);
      portalTimerRef.current = window.setTimeout(() => setPortalState('complete'), 1250);
    };
    window.addEventListener(HANDOFF_EVENT, beginPortalEntry);
    return () => {
      window.removeEventListener(HANDOFF_EVENT, beginPortalEntry);
      window.clearTimeout(portalTimerRef.current);
      window.cancelAnimationFrame(pointerFrameRef.current);
    };
  }, [reduce]);

  const portalEntry = portalState === 'entering';
  const portalMode = portalState !== 'idle';
  const titleDelay = portalMode ? .18 : .25;

  const moveOrbit = (event) => {
    if (reduce || event.pointerType === 'touch' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const stage = event.currentTarget;
    window.cancelAnimationFrame(pointerFrameRef.current);
    pointerFrameRef.current = window.requestAnimationFrame(() => {
      const rect = stage.getBoundingClientRect();
      const x = -((event.clientX - rect.left) / rect.width - .5) * 12;
      const y = -((event.clientY - rect.top) / rect.height - .5) * 10;
      orbitRef.current?.style.setProperty('--orbit-x', `${x.toFixed(2)}px`);
      orbitRef.current?.style.setProperty('--orbit-y', `${y.toFixed(2)}px`);
    });
  };

  const resetOrbit = () => {
    window.cancelAnimationFrame(pointerFrameRef.current);
    if (!orbitRef.current) return;
    orbitRef.current.style.setProperty('--orbit-x', '0px');
    orbitRef.current.style.setProperty('--orbit-y', '0px');
  };

  return <PageShell><SEO title="Kris Dane Madlambayan | Web Developer Portfolio" description="The portfolio of Kris Dane Madlambayan, a front-end-focused web developer creating responsive, accessible, and thoughtfully designed digital experiences." />
    <main className="home-reference">
      <section className={`home-r-hero home-hero-v3 home-hero-v4${reduce ? ' is-reduced' : ''}${portalEntry ? ' is-portal-entering' : ''}`} onPointerMove={moveOrbit} onPointerLeave={resetOrbit}>
        <div className="home-hero-grid" aria-hidden="true" />
        <div className="container home-hero-stage">
          <HeroOrbit reduce={reduce} orbitRef={orbitRef} portalEntry={portalMode} />

          <motion.i
            className="home-hero-guide-signal"
            aria-hidden="true"
            initial={reduce ? false : { opacity: 0, scaleX: 0 }}
            animate={reduce ? { opacity: 0, scaleX: 1 } : { opacity: [0, 1, 0], scaleX: [0, 1, 1] }}
            transition={{ duration: .42, delay: .18, ease }}
          />
          <motion.i
            className="home-hero-inbound-signal"
            aria-hidden="true"
            initial={reduce ? false : { opacity: 0, x: -92 }}
            animate={reduce ? { opacity: 0, x: 0 } : { opacity: [0, 1, 1, 0], x: [-92, -92, 0, 0] }}
            transition={{ duration: .52, delay: .13, ease }}
          />

          <h1 className="home-hero-title" aria-label="Kris Dane Madlambayan">
            <span className="sr-only">Kris Dane Madlambayan</span>
            <motion.span
              key={portalMode ? 'portal-name-first' : 'standard-name-first'}
              className="home-hero-title-line home-hero-title-line--first"
              aria-hidden="true"
              initial={reduce ? false : { opacity: .2, y: 10, clipPath: 'inset(0 50% 0 50%)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0%)' }}
              transition={{ duration: .6, delay: titleDelay, ease }}
            >
              <span className="home-hero-title-kris">KRIS</span>
              <span className="home-hero-title-dane">DANE<i className="home-hero-dane-sweep" /></span>
            </motion.span>
            <span className="home-hero-title-line home-hero-title-line--surname" aria-hidden="true">
              <motion.i
                className="home-hero-surname-wipe"
                initial={reduce ? false : { opacity: 0, scaleX: 0 }}
                animate={reduce ? { opacity: 0, scaleX: 1 } : { opacity: [0, 1, 0], scaleX: [0, 1, 1] }}
                transition={{ duration: .7, delay: .52, ease }}
              />
              <span className="home-hero-surname-mask">
                <motion.span
                  key={portalMode ? 'portal-surname' : 'standard-surname'}
                  className="home-hero-title-surname"
                  initial={reduce ? false : { opacity: .2, y: 8, clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ duration: portalMode ? .56 : .66, delay: portalMode ? .3 : .54, ease }}
                >MADLAMBAYAN</motion.span>
              </span>
              <motion.span
                key={portalMode ? 'portal-period' : 'standard-period'}
                className="home-hero-title-period"
                initial={reduce ? false : { opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: reduce ? 1 : [0, 1, 1.18, 1] }}
                transition={{ duration: .3, delay: portalMode ? .58 : 1.02, ease }}
              >.</motion.span>
            </span>
          </h1>
          <motion.div className="home-hero-scroll" initial={reduce ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .42, delay: 1.25, ease }} aria-hidden="true"><i /><span>SCROLL TO EXPLORE</span></motion.div>
        </div>
      </section>
      <LiveMetrics />
      <section className="home-r-section home-r-philosophy"><div className="container home-r-philosophy-grid"><motion.div {...reveal()}><Label number="01">PHILOSOPHY</Label><h2><em>code</em> becomes<br />experience.</h2><p>{resumeProfile.summary}</p></motion.div><motion.div className="home-r-principles" {...reveal(.08)}>{['Professional first. Creative with intent.', 'Continuous learning through practical projects and coursework.', 'Clean implementation and user-centered design.', currentFocus[2]].map((item) => <p key={item}><i />{item}</p>)}</motion.div></div></section>
      <section className="home-r-section home-r-work"><div className="container"><div className="home-r-heading"><Label number="02">SELECTED WORK</Label><Link to="/projects">VIEW ALL PROJECTS <ArrowRight /></Link></div><div className="home-r-projects">{featuredProjects.map((project, index) => <Reveal as="article" key={project.slug} delay={index * .06} distance={10}><span className="home-r-project-initial">{project.title.charAt(0)}</span><div><h3>{project.title}</h3><p>{project.featuredDescription || project.description}</p></div><div className="home-r-project-stack"><small>STACK</small><p>{(project.featuredStack || project.stack).join(' · ')}</p></div><Link to={`/projects/${project.slug}`}>CASE STUDY <ArrowRight /></Link></Reveal>)}</div></div></section>
      <section className="home-r-section home-r-capabilities home-teaser home-capabilities-teaser">
        <div className="container home-teaser-layout">
          <motion.div className="home-teaser-copy" {...reveal(0, .08)}>
            <Label number="03">CAPABILITIES</Label>
            <h2>Front-end focused.<br /><em>Built to grow.</em></h2>
            <p>Responsive interfaces and thoughtful interaction come first, supported by growing application and back-end foundations.</p>
            <Link className="home-teaser-link" to="/about#capabilities">VIEW CAPABILITIES <ArrowRight /></Link>
          </motion.div>
          <motion.div className="home-capabilities-preview" {...reveal(.08, .08)} aria-hidden="true">
            <div className="home-preview-hub"><i /><i /><i /><span /></div>
            <ol>{capabilityPreview.map((capability, index) => <li key={capability}><span>{String(index + 1).padStart(2, '0')}</span><i /><strong>{capability}</strong></li>)}</ol>
          </motion.div>
        </div>
      </section>
      <section className="home-r-section home-r-toolkit home-teaser home-toolkit-teaser">
        <div className="home-toolkit-grid-bg" aria-hidden="true" />
        <div className="container home-teaser-layout home-teaser-layout--reverse">
          <motion.div className="home-teaser-copy" {...reveal(0, .08)}>
            <Label number="04">TOOLKIT</Label>
            <h2>A toolkit for <em>responsive experiences.</em></h2>
            <p>Front-end first. Design aware. Back-end growing.</p>
            <Link className="home-teaser-link" to="/about#toolkit">VIEW FULL TOOLKIT <ArrowRight /></Link>
          </motion.div>
          <motion.ul className="home-toolkit-preview" {...reveal(.08, .08)} aria-label="Selected toolkit technologies">
            {toolkitPreview.map((technology) => <li key={technology}><span aria-hidden="true"><BrandTechnologyIcon name={technology} /></span><strong>{technology === 'JavaScript' ? 'JS' : technology.replace('.js', '')}</strong></li>)}
          </motion.ul>
        </div>
      </section>
      <section className="home-r-section home-r-about"><div className="container home-r-about-grid"><motion.div {...reveal()}><Label number="05">ABOUT</Label><h2>Learning through <em>building.</em><br />Refining through <em>design.</em></h2><p>I&apos;m an Information Technology student at Holy Angel University focused primarily on front-end development, with experience across back-end tools and interface design.</p><Link to="/about">READ MY STORY <ArrowRight /></Link></motion.div><Globe reduce={reduce} /></div></section>
      <section className="home-r-cta"><div className="container"><h2>LET&apos;S BUILD<br />SOMETHING.</h2><Link to="/contact">LET&apos;S CONNECT <ArrowRight /></Link></div></section>
    </main>
  </PageShell>;
}
