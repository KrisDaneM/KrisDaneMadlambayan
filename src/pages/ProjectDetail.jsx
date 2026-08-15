import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import PageShell from '../components/PageShell';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import TechBadge from '../components/TechBadge';
import { getProject, projects } from '../data/projects';
import { trackProjectView } from '../services/visitorService';

export default function ProjectDetail() {
  const { slug } = useParams(); const project = getProject(slug);
  useEffect(() => {
    if (project) trackProjectView(project.slug).catch(() => {});
  }, [project]);
  if (!project) return <Navigate to="/404" replace />;
  const current = projects.indexOf(project); const next = projects[(current + 1) % projects.length];
  const titleClass = project.title.length > 9 ? 'project-detail-title project-detail-title--long' : 'project-detail-title';
  return <PageShell><SEO title={`${project.title}${project.slug === 'thryve' ? ' Fitness Project' : project.slug === 'attheblanc' ? ' Web Design' : project.slug === 'qzone' ? ' Auto Detailing Website' : ''} | Kris Dane Madlambayan`} description={project.seoDescription || `${project.description} Read the ${project.title} project case study.`} image={project.cover} />
    <section className="case-hero"><div className="container"><Link className="back-link" to="/projects"><ArrowLeft size={17} />All projects</Link><div className="case-title"><div className="case-title-copy"><p className="eyebrow"><span />{project.category}</p><h1 className={titleClass}>{project.title}</h1>{project.fullName && <p className="case-full-name">{project.fullName}</p>}<p className="case-type">{project.type}</p></div><div className="case-actions"><Button href={project.liveUrl}>Visit website</Button>{project.sourceUrl && <Button href={project.sourceUrl} variant="secondary">View source</Button>}</div></div><div className="case-meta"><div><span>Project</span><strong>{project.id} / {String(projects.length).padStart(2, '0')}</strong></div><div><span>Role</span><strong>{project.role || project.type}</strong></div><div><span>Technology</span><strong>{(project.metaStack || project.stack).join(' · ')}</strong></div></div></div></section>
    <section className="section"><div className="container case-overview"><Section label="Overview" title="The project in context."><p className="lead">{project.overview}</p></Section><div className="case-notes"><Reveal><p className="eyebrow"><span />Purpose</p><h3>The challenge</h3><p>{project.purpose}</p></Reveal><Reveal delay={.08}><p className="eyebrow"><span />Approach</p><h3>The solution</h3><p>{project.solution}</p></Reveal>{project.contribution && <Reveal delay={.12}><p className="eyebrow"><span />Contribution</p><h3>My role</h3><p>{project.contribution}</p></Reveal>}</div></div></section>
    <section className="section surface-section"><div className="container"><Section label="Key features" title="What the experience includes." /><div className="feature-list">{project.features.map((feature, index) => <Reveal key={feature} className="feature-item" delay={index * .04}><span><Check size={16} /></span><strong>{feature}</strong></Reveal>)}</div></div></section>
    <section className="section case-live-section"><div className="container case-live-cta"><Section label="Interface tour" title="A closer look at the product." /><Reveal className="case-live-action"><p>{project.tourCopy || 'Explore the complete project directly to experience its interface, features, and interactions.'}</p><Button href={project.liveUrl}>View website</Button></Reveal></div></section>
    <section className="section surface-section"><div className="container detail-columns"><Section label="Technology" title="Built with a focused stack."><div className="badge-row large-badges">{project.stack.map((item) => <TechBadge key={item}>{item}</TechBadge>)}</div></Section><Section label="Reflection" title="What I learned."><p>{project.learning}</p></Section></div></section>
    <section className="section"><div className="container next-project"><p>Next case study</p><Link to={`/projects/${next.slug}`}><span>{next.title}</span><ArrowRight /></Link></div></section>
  </PageShell>;
}
function Section({ label, title, children }) { return <Reveal className="detail-section"><p className="eyebrow"><span />{label}</p><h2>{title}</h2>{children}</Reveal>; }
