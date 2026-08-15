import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import Reveal from './Reveal';

const proofRows = [
  { capability: 'Full-Stack Systems', projectSlugs: ['thryve', 'ac-core', 'socconsult'] },
  { capability: 'Backend & Database', projectSlugs: ['thryve', 'ac-core', 'socconsult'] },
  { capability: 'Multi-Role Applications', projectSlugs: ['ac-core', 'socconsult'] },
  { capability: 'Workflow Systems', projectSlugs: ['ac-core', 'socconsult'] },
  {
    capability: 'Responsive Interfaces',
    projectSlugs: ['thryve', 'attheblanc', 'qzone', 'recowebdation'],
  },
];

const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));

export default function ProofOfWork() {
  return (
    <section className="proof-of-work" aria-labelledby="proof-of-work-title">
      <div className="container">
        <Reveal className="proof-of-work-header" distance={12}>
          <div className="proof-of-work-kicker">
            <span>02 / 05</span>
            <span>Proof of work</span>
          </div>
          <div className="proof-of-work-intro">
            <h2 id="proof-of-work-title">Capabilities backed<br />by actual work.</h2>
            <p>Each capability is tied to projects where it was applied in a real interface, system, or workflow.</p>
          </div>
        </Reveal>

        <ol className="proof-of-work-rows">
          {proofRows.map((row, index) => {
            const rowProjects = row.projectSlugs.map((slug) => projectsBySlug.get(slug)).filter(Boolean);
            return (
              <Reveal as="li" className="proof-of-work-row" delay={index * 0.045} distance={12} key={row.capability}>
                <span className="proof-of-work-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{row.capability}</h3>
                <div className="proof-of-work-projects">
                  {rowProjects.map((project) => (
                    <Link key={project.slug} to={`/projects/${project.slug}`}>
                      <span>{project.title}</span>
                      <ArrowRight aria-hidden="true" size={14} strokeWidth={1.6} />
                    </Link>
                  ))}
                </div>
                <ArrowRight className="proof-of-work-row-arrow" aria-hidden="true" size={19} strokeWidth={1.5} />
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
