import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Info, X } from 'lucide-react';
import {
  SiAngular,
  SiCloudinary,
  SiCss,
  SiExpress,
  SiFigma,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPhp,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from 'react-icons/si';
import { workflowTools, getProjectsForTechnology } from '../data/resume';
import { skills } from '../data/site';

function CanvaMark(props) {
  return (
    <svg viewBox="0 0 24 24" role="img" {...props}>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM6.962 7.68c.754 0 1.337.549 1.405 1.2.069.583-.171 1.097-.822 1.406-.343.171-.48.172-.549.069-.034-.069 0-.137.069-.206.617-.514.617-.926.548-1.508-.034-.378-.308-.618-.583-.618-1.2 0-2.914 2.674-2.674 4.629.103.754.549 1.646 1.509 1.646.308 0 .65-.103.96-.24.5-.264.799-.47 1.097-.8-.073-.885.704-2.046 1.851-2.046.515 0 .926.205.96.583.068.514-.377.582-.514.582s-.378-.034-.378-.17c-.034-.138.309-.07.275-.378-.035-.206-.24-.274-.446-.274-.72 0-1.131.994-1.029 1.611.035.275.172.549.447.549.205 0 .514-.31.617-.755.068-.308.343-.514.583-.514.102 0 .17.034.205.171v.138c-.034.137-.137.548-.102.651 0 .069.034.171.17.171.092 0 .436-.18.777-.459.117-.59.253-1.298.253-1.357.034-.24.137-.48.617-.48.103 0 .171.034.205.171v.138l-.136.617c.445-.583 1.097-.994 1.508-.994.172 0 .309.102.309.274 0 .103 0 .274-.069.446-.137.377-.309.96-.412 1.474 0 .137.035.274.207.274.171 0 .685-.206 1.096-.754l.007-.004c-.002-.068-.007-.134-.007-.202 0-.411.035-.754.104-.994.068-.274.411-.514.617-.514.103 0 .205.069.205.171 0 .035 0 .103-.034.137-.137.446-.24.857-.24 1.269 0 .24.034.582.102.788 0 .034.035.069.07.069.068 0 .548-.445.89-1.028-.308-.206-.48-.549-.48-.96 0-.72.446-1.097.858-1.097.343 0 .617.24.617.72 0 .308-.103.65-.274.96h.102a.77.77 0 0 0 .584-.24.293.293 0 0 1 .134-.117c.335-.425.83-.74 1.41-.74.48 0 .924.205.959.582.068.515-.378.618-.515.618l-.002-.002c-.138 0-.377-.035-.377-.172 0-.137.309-.068.274-.376-.034-.206-.24-.275-.446-.275-.686 0-1.13.891-1.028 1.611.034.275.171.583.445.583.206 0 .515-.308.652-.754.068-.274.343-.514.583-.514.103 0 .17.034.205.171 0 .069 0 .206-.137.652-.17.308-.171.48-.137.617.034.274.171.48.309.583.034.034.068.102.068.102 0 .069-.034.138-.137.138-.034 0-.068 0-.103-.035-.514-.205-.72-.548-.789-.891-.205.24-.445.377-.72.377-.445 0-.89-.411-.96-.926a1.609 1.609 0 0 1 .075-.649c-.203.13-.422.203-.623.203h-.17c-.447.652-.927 1.098-1.27 1.303a.896.896 0 0 1-.377.104c-.068 0-.171-.035-.205-.104-.095-.152-.156-.392-.193-.667-.481.527-1.145.805-1.453.805-.343 0-.548-.206-.582-.55v-.376c.102-.754.377-1.2.377-1.337a.074.074 0 0 0-.069-.07c-.24 0-1.028.824-1.166 1.373l-.103.445c-.068.309-.377.515-.582.515-.103 0-.172-.035-.206-.172v-.137l.046-.233c-.435.31-.87.508-1.075.508-.308 0-.48-.172-.514-.412-.206.274-.445.412-.754.412-.352 0-.696-.24-.862-.593-.244.275-.523.553-.852.764-.48.309-1.028.549-1.68.549-.582 0-1.097-.309-1.371-.583-.412-.377-.651-.96-.686-1.509-.205-1.68.823-3.84 2.4-4.8.378-.205.755-.343 1.132-.343zm9.77 3.291c-.104 0-.172.172-.172.343 0 .274.137.583.309.755a1.74 1.74 0 0 0 .102-.583c0-.343-.137-.515-.24-.515z" />
    </svg>
  );
}

const coreTechnologies = [
  { key: 'HTML', label: 'HTML5', Icon: SiHtml5, color: '#E34F26', category: 'Markup language', description: 'Semantic structure for accessible, responsive web interfaces.' },
  { key: 'CSS', label: 'CSS3', Icon: SiCss, color: '#663399', category: 'Styling', description: 'Layout, responsive presentation, and interface styling.' },
  { key: 'JavaScript', label: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E', category: 'Language', description: 'Interactive behavior and application logic for the web.' },
  { key: 'TypeScript', label: 'TypeScript', Icon: SiTypescript, color: '#3178C6', category: 'Language', description: 'Typed JavaScript for clearer, more maintainable applications.' },
  { key: 'PHP', label: 'PHP', Icon: SiPhp, color: '#777BB4', category: 'Back-end language', description: 'Server-side functionality for web projects.' },
  { key: 'Vue.js', label: 'Vue.js', Icon: SiVuedotjs, color: '#4FC08D', category: 'Front-end framework', description: 'Component-based interfaces for interactive applications.' },
  { key: 'Angular', label: 'Angular', Icon: SiAngular, color: '#DD0031', category: 'Front-end framework', description: 'Structured front-end applications built with TypeScript.' },
  { key: 'Node.js', label: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E', category: 'Back-end runtime', description: 'JavaScript runtime used for server-side development.' },
  { key: 'Express', label: 'Express', Icon: SiExpress, color: 'currentColor', category: 'Back-end framework', description: 'Web framework used to build APIs and server routes.' },
  { key: 'MongoDB', label: 'MongoDB', Icon: SiMongodb, color: '#47A248', category: 'Database', description: 'Document database used for persistent application data.' },
];

const supportingTools = [
  { key: 'GitHub', label: 'GitHub', Icon: SiGithub, color: 'currentColor', category: 'Development platform', description: 'Source control collaboration and project hosting.' },
  { key: 'Figma', label: 'Figma', Icon: SiFigma, color: '#F24E1E', category: 'Design tool', description: 'Interface design, prototyping, and visual collaboration.' },
  { key: 'Vercel', label: 'Vercel', Icon: SiVercel, color: 'currentColor', category: 'Deployment platform', description: 'Deployment and hosting for modern web applications.' },
  { key: 'Cloudinary', label: 'Cloudinary', Icon: SiCloudinary, color: '#3448C5', category: 'Media service', description: 'Cloud-based media storage and delivery.' },
  { key: 'Canva', label: 'Canva', Icon: CanvaMark, color: '#00C4CC', category: 'Design tool', description: 'Visual asset creation for project presentation.' },
];

const isVerified = (key) => skills.includes(key) || workflowTools.includes(key);

const brandIcons = Object.fromEntries(
  [...coreTechnologies, ...supportingTools].map(({ key, Icon, color }) => [key, { Icon, color }]),
);

export function BrandTechnologyIcon({ name }) {
  const brand = brandIcons[name];
  if (!brand) return null;
  const { Icon, color } = brand;
  return <Icon aria-hidden="true" style={{ '--brand-color': color }} />;
}

export default function AboutTechnologyStack() {
  const rootRef = useRef(null);
  const [previewKey, setPreviewKey] = useState(null);
  const [pinnedKey, setPinnedKey] = useState(null);
  const technologies = coreTechnologies.filter(({ key }) => isVerified(key));
  const tools = supportingTools.filter(({ key }) => isVerified(key));
  const allItems = [...technologies, ...tools];
  const activeKey = previewKey || pinnedKey;
  const activeItem = allItems.find(({ key }) => key === activeKey);
  const activeProjects = activeItem ? getProjectsForTechnology(activeItem.key) : [];

  useEffect(() => {
    if (!pinnedKey) return undefined;
    const dismiss = (event) => {
      if (event.key === 'Escape') setPinnedKey(null);
      if (event.type === 'pointerdown' && !rootRef.current?.contains(event.target)) setPinnedKey(null);
    };
    document.addEventListener('keydown', dismiss);
    document.addEventListener('pointerdown', dismiss);
    return () => {
      document.removeEventListener('keydown', dismiss);
      document.removeEventListener('pointerdown', dismiss);
    };
  }, [pinnedKey]);

  const renderCard = (technology, compact = false) => {
    const { key, label, Icon, color } = technology;
    const relatedProjects = getProjectsForTechnology(key);
    const visibleProjects = relatedProjects.slice(0, compact ? 1 : 2);
    const remaining = relatedProjects.length - visibleProjects.length;
    const selected = activeKey === key;

    return (
      <button
        className={`about-tech-card${compact ? ' is-compact' : ''}${selected ? ' is-active' : ''}`}
        type="button"
        key={key}
        aria-expanded={selected}
        aria-controls="about-tech-detail"
        onMouseEnter={() => setPreviewKey(key)}
        onMouseLeave={() => setPreviewKey(null)}
        onFocus={() => setPreviewKey(key)}
        onBlur={() => setPreviewKey(null)}
        onClick={() => setPinnedKey((current) => current === key ? null : key)}
      >
        <Info className="about-tech-info" aria-hidden="true" />
        <span className="about-tech-logo"><Icon aria-hidden="true" style={{ '--brand-color': color }} /></span>
        <strong>{label}</strong>
        <small>{relatedProjects.length ? `Used in ${relatedProjects.length} ${relatedProjects.length === 1 ? 'project' : 'projects'}` : 'Development toolkit'}</small>
        <span className="about-tech-chips" aria-hidden="true">
          {visibleProjects.map((project) => <i key={project.slug}>{project.title}</i>)}
          {remaining > 0 && <i>+{remaining} more</i>}
        </span>
        <span className="about-tech-view">View details <ArrowRight aria-hidden="true" /></span>
      </button>
    );
  };

  return (
    <div className="about-tech-stack" ref={rootRef}>
      <p className="about-tech-intro">A curated set of technologies and tools I use to build modern, responsive, and scalable applications.</p>
      <div className="about-tech-core-grid">{technologies.map((technology) => renderCard(technology))}</div>

      {tools.length > 0 && <section className="about-tech-supporting">
        <p>Supporting tools</p>
        <div>{tools.map((technology) => renderCard(technology, true))}</div>
      </section>}

      {activeItem && <aside id="about-tech-detail" className={`about-tech-detail${pinnedKey ? ' is-pinned' : ''}`} aria-live="polite">
        <button type="button" onClick={() => { setPinnedKey(null); setPreviewKey(null); }} aria-label="Close technology details"><X aria-hidden="true" /></button>
        <span className="about-tech-detail-logo"><activeItem.Icon aria-hidden="true" style={{ '--brand-color': activeItem.color }} /></span>
        <small>Category / {activeItem.category}</small>
        <h3>{activeItem.label}</h3>
        <p>{activeItem.description}</p>
        <strong>Used in</strong>
        {activeProjects.length > 0
          ? <ul>{activeProjects.map((project) => <li key={project.slug}>{project.title}</li>)}</ul>
          : <p>No mapped portfolio project yet.</p>}
      </aside>}
    </div>
  );
}
