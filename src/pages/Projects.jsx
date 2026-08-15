import AmbientField from '../components/AmbientField';
import PageShell from '../components/PageShell';
import ProjectRow from '../components/ProjectRow';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import { projects } from '../data/projects';

export default function Projects() {
  return <PageShell><SEO title="Projects | Kris Dane Madlambayan" description="Explore web applications and interface projects by Kris Dane Madlambayan, including Thryve, SmartCalc, Recowebdation, AtTheBlanc, Q-Zone, AC-CORE, and SOCConsult." />
    <section className="project-index-hero"><AmbientField compact /><div className="container"><div className="page-index-mark">03 / 05</div><p className="eyebrow"><span />Project index</p><h1>Work that moves between <em>systems</em> and stories.</h1><div className="project-hero-bottom"><p>A collection of personal, academic, and collaborative web projects—presented honestly and built to strengthen both technical and design practice.</p><span>{String(projects.length).padStart(2, '0')} projects / Scroll to inspect</span></div></div></section>
    <section className="work-index"><div className="container"><div className="work-index-head" aria-hidden="true"><span>No.</span><span>Project / Discipline</span><span>Type / Stack</span><span>Action</span></div><div className="work-list">{projects.map((project, index) => <Reveal key={project.slug} delay={index * .045}><ProjectRow project={project} /></Reveal>)}</div></div></section>
  </PageShell>;
}
