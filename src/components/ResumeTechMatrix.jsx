import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjectsForTechnology, resumeSkillGroups } from '../data/resume';

export default function ResumeTechMatrix() {
  const firstTraceable = useMemo(() => resumeSkillGroups.flatMap((group) => group.skills).find((skill) => getProjectsForTechnology(skill).length) || '', []);
  const [activeSkill, setActiveSkill] = useState(firstTraceable);
  const relatedProjects = activeSkill ? getProjectsForTechnology(activeSkill) : [];

  return <div className="resume-tech-shell">
    <div className="resume-skill-matrix">{resumeSkillGroups.map((group, groupIndex) => <div className="resume-skill-group" key={group.title}><p><span>{String(groupIndex + 1).padStart(2, '0')}</span>{group.title}</p><div>{group.skills.map((skill) => {
      const hasTrace = getProjectsForTechnology(skill).length > 0;
      return <button type="button" className={activeSkill === skill ? 'is-active' : ''} aria-pressed={activeSkill === skill} onMouseEnter={() => hasTrace && setActiveSkill(skill)} onFocus={() => hasTrace && setActiveSkill(skill)} onClick={() => hasTrace && setActiveSkill(skill)} key={skill}>{skill}{hasTrace && <i aria-hidden="true" />}</button>;
    })}</div></div>)}</div>
    <aside className="resume-tech-trace" aria-live="polite"><span>KDM / Tech trace</span><strong>{activeSkill}</strong>{relatedProjects.length > 0 && <><p>Used in</p><div>{relatedProjects.map((project) => <Link to={`/projects/${project.slug}`} key={project.slug}>{project.title}<span aria-hidden="true">↗</span></Link>)}</div></>}</aside>
  </div>;
}
