import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectRow({ project, compact = false }) {
  const titleClass = project.title.length > 9 ? 'project-title project-title--long' : 'project-title';
  return <article className={`work-row${compact ? ' work-row-compact' : ''}`}>
    <span className="work-row-number" aria-hidden="true">{project.id}</span>
    <div className="work-row-copy">
      <p>{project.category}</p>
      <h3 className={titleClass}><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3>
      <p className="work-row-description">{project.description}</p>
    </div>
    <div className="work-row-meta"><span>{project.type}</span><p>{project.stack.join(' / ')}</p></div>
    <div className="work-row-actions">
      <Link to={`/projects/${project.slug}`}>Case study <ArrowRight aria-hidden="true" /></Link>
      {!compact && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live site <ArrowUpRight aria-hidden="true" /></a>}
    </div>
    <span className="work-row-accent" aria-hidden="true" />
  </article>;
}
