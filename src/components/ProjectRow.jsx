import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectRow({ project, compact = false, number }) {
  const titleClass = project.title.length > 9 ? 'project-title project-title--long' : 'project-title';
  const description = compact ? project.featuredDescription || project.description : project.description;
  const type = compact ? project.featuredType || project.type : project.type;
  const stack = compact ? project.featuredStack || project.stack : project.stack;
  return <article className={`work-row${compact ? ' work-row-compact' : ''}`}>
    <span className="work-row-number" aria-hidden="true">{number || project.id}</span>
    <div className="work-row-copy">
      <p>{project.category}</p>
      <h3 className={titleClass}><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3>
      <p className="work-row-description">{description}</p>
    </div>
    <div className="work-row-meta"><span>{type}</span><p>{stack.join(' / ')}</p></div>
    <div className="work-row-actions">
      <Link to={`/projects/${project.slug}`}>Case study <ArrowRight aria-hidden="true" /></Link>
      {!compact && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live site <ArrowUpRight aria-hidden="true" /></a>}
    </div>
    <span className="work-row-accent" aria-hidden="true" />
  </article>;
}
