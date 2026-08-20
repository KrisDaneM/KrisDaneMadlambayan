import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function ProjectActions({ project }) {
  return <div className="project-explorer-actions" aria-label={`${project.title} links`}>
    <Link className="project-explorer-action arrow-motion arrow-motion--right" to={`/projects/${project.slug}`}>Case study <ArrowRight aria-hidden="true" size={15} /></Link>
    {project.liveUrl && <a className="project-explorer-action arrow-motion arrow-motion--up-right" href={project.liveUrl} target="_blank" rel="noreferrer">Live site <ArrowUpRight aria-hidden="true" size={15} /></a>}
    {project.sourceUrl && <a className="project-explorer-action arrow-motion arrow-motion--up-right" href={project.sourceUrl} target="_blank" rel="noreferrer">Source <ArrowUpRight aria-hidden="true" size={15} /></a>}
  </div>;
}

export default function ProjectExplorerItem({ project, index, view }) {
  const stack = project.featuredStack?.length ? project.featuredStack : project.stack;
  return <article className={`project-explorer-item project-explorer-item--${view}`}>
    <div className="project-explorer-index"><span>{String(index + 1).padStart(2, '0')}</span><small>{project.category}</small></div>
    <div className="project-explorer-copy"><h2>{project.title}</h2><p>{project.description}</p></div>
    <div className="project-explorer-stack" aria-label={`${project.title} technology stack`}>{stack.map((technology) => <span key={technology}>{technology}</span>)}</div>
    <div className="project-explorer-type">{project.type}</div>
    <ProjectActions project={project} />
    <span className="project-explorer-line" aria-hidden="true" />
  </article>;
}
