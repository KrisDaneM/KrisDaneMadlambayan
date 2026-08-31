import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  Database,
  GraduationCap,
  Grid2X2,
  List,
  PanelsTopLeft,
  Search,
  UserRound,
  UsersRound,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import PageShell from '../components/PageShell';
import ProjectExplorerItem from '../components/ProjectExplorerItem';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import { projects } from '../data/projects';

const ease = [0.22, 1, 0.36, 1];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'personal', label: 'Personal' },
  { id: 'group', label: 'Group' },
  { id: 'academic', label: 'Academic' },
  { id: 'practice', label: 'Practice' },
];

const categoryNavigation = [
  { id: 'all', label: 'All projects', description: 'Browse everything', Icon: Grid2X2 },
  { id: 'personal', label: 'Personal', description: 'Solo builds', Icon: UserRound },
  { id: 'group', label: 'Group projects', description: 'Collaboration', Icon: UsersRound },
  { id: 'academic', label: 'Academic', description: 'School projects', Icon: GraduationCap },
  { id: 'practice', label: 'Practice', description: 'Concepts & experiments', Icon: Code2 },
];

function matchesFilter(project, filter) {
  if (filter === 'all') return true;
  const metadata = `${project.type} ${project.category}`.toLowerCase();
  return metadata.includes(filter);
}

function matchesSearch(project, query) {
  if (!query.trim()) return true;
  const searchable = [project.title, project.type, project.category, project.description, ...(project.stack || []), ...(project.searchTerms || [])]
    .join(' ')
    .toLowerCase();
  return searchable.includes(query.trim().toLowerCase());
}

function ProjectSystemGraphic({ reduceMotion }) {
  const layers = [
    { className: 'projects-system-layer--design', label: 'Design layer', Icon: PanelsTopLeft },
    { className: 'projects-system-layer--code', label: 'Code layer', Icon: Code2 },
    { className: 'projects-system-layer--data', label: 'Data layer', Icon: Database },
  ];

  return (
    <div className="projects-system" aria-hidden="true">
      <motion.div
        className="projects-system-orbit"
        initial={reduceMotion ? false : { opacity: 0, scale: .92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .56, delay: .2, ease }}
      ><i /><i /><i /></motion.div>
      <svg className="projects-system-signals" viewBox="0 0 420 470" preserveAspectRatio="none">
        <motion.path d="M210 42V428" initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: .7, delay: .48, ease }} />
        <motion.path d="M86 115L42 92M334 115L378 92M86 235L38 260M334 235L382 260M86 355L48 392M334 355L372 392" initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: .75, delay: .55, ease }} />
      </svg>
      <div className="projects-system-stack">
        {layers.map(({ className, label, Icon }, index) => <motion.div
          className={`projects-system-layer ${className}`}
          key={label}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .48, delay: .3 + (2 - index) * .09, ease }}
        >
          <svg className="projects-system-plane" viewBox="0 0 260 138" preserveAspectRatio="none">
            <polygon className="projects-system-plane-top" points="130,4 252,61 130,118 8,61" />
            <path className="projects-system-plane-side" d="M8 61V72L130 132L252 72V61M8 72L130 118L252 72" />
            <polygon className="projects-system-plane-inner" points="130,24 211,61 130,98 49,61" />
            {index === 0 && <><polygon className="projects-system-plane-detail" points="130,38 179,61 130,84 81,61" /><polygon className="projects-system-plane-detail" points="130,48 158,61 130,74 102,61" /></>}
            {index === 1 && <path className="projects-system-plane-detail" d="M46 61H82M178 61H214" />}
          </svg>
          <span><Icon /></span><small>{label}</small>
        </motion.div>)}
      </div>
      <span className="projects-system-glow" />
      <i className="projects-system-node projects-system-node--one" />
      <i className="projects-system-node projects-system-node--two" />
      <i className="projects-system-node projects-system-node--three" />
    </div>
  );
}

export default function Projects() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [view, setView] = useState(() => {
    try {
      return sessionStorage.getItem('kdm_projects_view') === 'grid' ? 'grid' : 'list';
    } catch {
      return 'list';
    }
  });
  const indexRef = useRef(null);

  const visibleProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project, filter) && matchesSearch(project, query)),
    [filter, query],
  );

  useEffect(() => {
    try {
      sessionStorage.setItem('kdm_projects_view', view);
    } catch {
      // The view still works when browser storage is unavailable.
    }
  }, [view]);

  const resetView = () => {
    setFilter('all');
    setQuery('');
  };

  const chooseCategory = (id) => {
    setFilter(id);
    indexRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <PageShell>
      <SEO title="Projects — Kris Dane Madlambayan" description="Browse Kris Dane Madlambayan's web development projects and detailed case studies." path="/projects" />

      <section className="projects-index-hero">
        <div className="projects-index-grid-bg" aria-hidden="true" />
        <div className="container projects-index-hero-layout">
          <div className="projects-index-hero-left">
            <motion.div className="projects-index-guide" aria-hidden="true" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .35, delay: .08 }}>
              <span>01</span><motion.i initial={reduceMotion ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: .55, delay: .18, ease }}><b /><b /><b /></motion.i><strong>PROJECT INDEX</strong>
            </motion.div>
            <motion.header className="projects-index-hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .48, delay: .08, ease }}>
              <p><i />PROJECT INDEX</p>
              <h1 aria-label="Work that moves between systems and stories.">
                <span>Work that</span><span>moves between</span><span><em>systems</em> and</span><span>stories.</span>
              </h1>
              <a href="#projects-index"><i />EXPLORE THE WORK <ArrowRight /></a>
            </motion.header>
          </div>

          <ProjectSystemGraphic reduceMotion={reduceMotion} />

          <motion.aside className="projects-index-hero-deck" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .48, delay: .58, ease }}>
            <p>A collection of web applications, visual experiments, and systems built through collaboration, iteration, and practical problem solving.</p>
            <i aria-hidden="true" />
          </motion.aside>
        </div>
      </section>

      <section className="projects-index-section" id="projects-index" ref={indexRef} aria-labelledby="projects-index-title">
        <div className="container projects-index-content">
          <Reveal className="projects-index-heading">
            <div><p className="eyebrow"><span />Explore the work</p><h2 id="projects-index-title">Projects index</h2></div>
          </Reveal>

          <div className="projects-toolbar">
            <div className="projects-filter-scroll" aria-label="Filter projects">
              {filters.map((item) => <button key={item.id} type="button" className={filter === item.id ? 'is-active' : ''} onClick={() => setFilter(item.id)} aria-pressed={filter === item.id}>{item.label}</button>)}
            </div>
            <label className="projects-search"><Search aria-hidden="true" size={15} /><span className="sr-only">Search projects</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" /></label>
            <div className="projects-view-switch" aria-label="View projects as"><span>View as</span><button type="button" className={view === 'grid' ? 'is-active' : ''} onClick={() => setView('grid')} aria-label="Grid view" aria-pressed={view === 'grid'}><Grid2X2 aria-hidden="true" /></button><button type="button" className={view === 'list' ? 'is-active' : ''} onClick={() => setView('list')} aria-label="List view" aria-pressed={view === 'list'}><List aria-hidden="true" /></button></div>
          </div>

          {view === 'list' && visibleProjects.length > 0 && <div className="project-explorer-columns" aria-hidden="true"><span>No. / Discipline</span><span>Project</span><span>Stack</span><span>Type</span><span>Action</span></div>}

          <div className={`project-explorer-collection project-explorer-collection--${view}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div className="project-explorer-motion-list" key={`${filter}-${query}-${view}`} initial={reduceMotion ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .18 }}>
                {visibleProjects.map((project, index) => <motion.div key={project.slug} initial={reduceMotion ? false : { opacity: 0, y: 7 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: reduceMotion ? 0 : .42, delay: reduceMotion ? 0 : Math.min(index * .045, .18), ease }}><ProjectExplorerItem project={project} index={projects.findIndex((item) => item.slug === project.slug)} view={view} /></motion.div>)}
              </motion.div>
            </AnimatePresence>
          </div>

          {!visibleProjects.length && <div className="projects-empty-state" role="status"><p>No projects match this view.</p><button type="button" onClick={resetView}>Reset filter <ArrowRight size={15} /></button></div>}

          <Reveal className="projects-category-nav" as="nav" aria-label="Project categories">
            {categoryNavigation.map(({ id, label, description, Icon }) => <button key={id} type="button" className={filter === id ? 'is-active' : ''} onClick={() => chooseCategory(id)} aria-pressed={filter === id}><Icon aria-hidden="true" /><strong>{label}</strong><small>{description}</small><ArrowRight aria-hidden="true" /></button>)}
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
