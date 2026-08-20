import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const capabilityRows = [
  {
    title: 'Responsive Front-End Development',
    description: 'Building accessible, user-focused interfaces that adapt clearly across desktop, tablet, and mobile experiences.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    projectSlugs: ['recowebdation', 'attheblanc', 'qzone'],
    priority: 'primary',
  },
  {
    title: 'User-Centered Interfaces',
    description: 'Organizing content and interactions around clarity, usability, accessibility, and responsive behavior.',
    tags: ['UI Design', 'UX Design', 'Responsive Design'],
    projectSlugs: ['thryve', 'socconsult'],
    priority: 'primary',
  },
  {
    title: 'Application & API Integration',
    description: 'Connecting front-end experiences with application logic, APIs, and data-driven functionality.',
    tags: ['Vue.js', 'Angular', 'TypeScript'],
    projectSlugs: ['thryve', 'ac-core'],
  },
  {
    title: 'Back-End Foundations',
    description: 'Continuously improving server-side development, API handling, and database fundamentals to build more complete applications.',
    tags: ['Node.js', 'Express', 'MongoDB'],
    projectSlugs: ['thryve', 'ac-core', 'socconsult'],
    priority: 'growing',
  },
  {
    title: 'Workflow & Multi-Role Systems',
    description: 'Contributing to systems with distinct user roles, records, reporting flows, and administrative functionality.',
    tags: ['AC-CORE', 'SOCConsult'],
    projectSlugs: ['ac-core', 'socconsult'],
  },
];

const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));

export default function ProofOfWork() {
  const reduce = useReducedMotion();
  const supportsViewportAnimation = typeof globalThis.IntersectionObserver === 'function';

  return <section className="proof-of-work home-capability-map" aria-label="Capabilities shaped by project work">
    <ol className="proof-of-work-rows">
      {capabilityRows.map((row, index) => {
        const rowProjects = row.projectSlugs.map((slug) => projectsBySlug.get(slug)).filter(Boolean);
        return <motion.li
          className={`proof-of-work-row home-capability-item home-capability-item--${index + 1}${row.priority ? ` is-${row.priority}` : ''}`}
          key={row.title}
          initial={reduce || !supportsViewportAnimation ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .08 }}
          transition={{ duration: .5, delay: index * .065, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="proof-of-work-index">{String(index + 1).padStart(2, '0')}</span>
          <i className="home-capability-signal" aria-hidden="true" />
          <div className="home-capability-copy">
            {row.priority === 'growing' && <small>GROWING CAPABILITY</small>}
            <h3>{row.title}</h3>
            <p>{row.description}</p>
          </div>
          <ul className="home-capability-tags" aria-label={`${row.title} technologies`}>
            {row.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <div className="proof-of-work-projects">
            <span className="proof-of-work-project-label">RELATED WORK</span>
            <div aria-label={`Projects demonstrating ${row.title}`}>
            {rowProjects.map((project) => <Link key={project.slug} to={`/projects/${project.slug}`}><span>{project.title}</span><ArrowRight aria-hidden="true" size={14} strokeWidth={1.6} /></Link>)}
            </div>
          </div>
        </motion.li>;
      })}
    </ol>
  </section>;
}
