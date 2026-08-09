import { ArrowLeft, ArrowRight, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import Lightbox from '../components/Lightbox';
import PageShell from '../components/PageShell';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import TechBadge from '../components/TechBadge';
import { getProject, projects } from '../data/projects';

export default function ProjectDetail() {
  const { slug } = useParams(); const project = getProject(slug); const [selected, setSelected] = useState(null);
  if (!project) return <Navigate to="/404" replace />;
  const current = projects.indexOf(project); const next = projects[(current + 1) % projects.length];
  return <PageShell><SEO title={`${project.title}${project.slug === 'thryve' ? ' Fitness Project' : project.slug === 'attheblanc' ? ' Web Design' : project.slug === 'qzone' ? ' Auto Detailing Website' : ''} | Kris Dane Madlambayan`} description={`${project.description} Read the ${project.title} project case study.`} image={project.cover} />
    <section className="case-hero"><div className="container"><Link className="back-link" to="/projects"><ArrowLeft size={17} />All projects</Link><div className="case-title"><div><p className="eyebrow"><span />{project.category}</p><h1>{project.title}</h1><p className="case-type">{project.type}</p></div><div className="case-actions"><Button href={project.liveUrl}>Visit website</Button></div></div><div className="case-meta"><div><span>Project</span><strong>{project.id} / 05</strong></div><div><span>Role</span><strong>{project.type}</strong></div><div><span>Technology</span><strong>{project.stack.join(' · ')}</strong></div></div></div></section>
    <section className="section"><div className="container case-overview"><Section label="Overview" title="The project in context."><p className="lead">{project.overview}</p></Section><div className="case-notes"><Reveal><p className="eyebrow"><span />Purpose</p><h3>The challenge</h3><p>{project.purpose}</p></Reveal><Reveal delay={.08}><p className="eyebrow"><span />Approach</p><h3>The solution</h3><p>{project.solution}</p></Reveal></div></div></section>
    <section className="section surface-section"><div className="container"><Section label="Key features" title="What the experience includes." /><div className="feature-list">{project.features.map((feature, index) => <Reveal key={feature} className="feature-item" delay={index * .04}><span><Check size={16} /></span><strong>{feature}</strong></Reveal>)}</div></div></section>
    <section className="section"><div className="container"><Section label="Interface tour" title="A closer look at the product." /><div className="gallery">{project.images.map((image, index) => <Reveal className="gallery-item" key={image.title} delay={index * .04}><button type="button" onClick={() => setSelected(image)} aria-label={`Open larger view of ${image.title}`}><img src={image.src} alt={image.alt} loading="lazy" /><span className="gallery-expand"><ExternalLink size={16} />Expand</span></button><div><span>{String(index + 1).padStart(2, '0')}</span><h3>{image.title}</h3><p>{image.description}</p></div></Reveal>)}</div></div></section>
    <section className="section surface-section"><div className="container detail-columns"><Section label="Technology" title="Built with a focused stack."><div className="badge-row large-badges">{project.stack.map((item) => <TechBadge key={item}>{item}</TechBadge>)}</div></Section><Section label="Reflection" title="What I learned."><p>{project.learning}</p></Section></div></section>
    <section className="section"><div className="container next-project"><p>Next case study</p><Link to={`/projects/${next.slug}`}><span>{next.title}</span><ArrowRight /></Link></div></section><Lightbox image={selected} onClose={() => setSelected(null)} />
  </PageShell>;
}
function Section({ label, title, children }) { return <Reveal className="detail-section"><p className="eyebrow"><span />{label}</p><h2>{title}</h2>{children}</Reveal>; }
