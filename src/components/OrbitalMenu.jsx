import { ArrowRight, FileText, Folder, Home, Send, UserRound, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const iconMap = { Home, About: UserRound, Projects: Folder, Resume: FileText, Contact: Send };

function OrbitalHub({ activeIndex }) {
  return <div className="orbital-menu-hub" aria-hidden="true">
    <svg className="orbital-hub-svg" viewBox="0 0 560 620">
      <g className="orbital-hub-guides">
        <path d="M45 311H516M280 45V576" />
        <circle cx="280" cy="311" r="214" /><circle cx="280" cy="311" r="174" /><circle cx="280" cy="311" r="132" />
        <path d="M70 230C158 122 418 114 493 250C561 373 414 510 264 494C98 477 21 351 70 230Z" />
        <path d="M81 405C177 517 421 499 490 350" strokeDasharray="3 9" />
      </g>
      <g className="orbital-hub-live">
        <path d="M91 394A204 204 0 0 0 437 454" />
        <path d="M130 172A174 174 0 0 1 444 241" />
      </g>
      <g className="orbital-hub-ticks">
        <path d="M280 78v18M280 527v18M47 311h18M495 311h18" />
        <path d="M115 146l14 14M431 462l14 14M116 476l14-14M432 160l14-14" />
      </g>
      {[0,1,2,3,4].map((index) => <circle key={index} className={index === activeIndex ? 'is-active' : ''} cx={[125,452,91,421,280][index]} cy={[173,251,394,457,526][index]} r={index === activeIndex ? 9 : 5} />)}
    </svg>
    <div className="orbital-hub-core"><strong>KDM</strong><span>Portfolio</span><i /></div>
  </div>;
}

function OrbitalConnections({ activeIndex }) {
  const path = 'M218 312C278 252 267 79 329 55C375 37 395 103 358 151C320 201 326 250 351 292C382 345 342 402 352 454C362 508 329 554 294 615';
  return <svg className="orbital-menu-connections" viewBox="0 0 500 650" preserveAspectRatio="none" aria-hidden="true">
    <path className="orbital-rail-base" d={path} />
    <path className="orbital-rail-signal" d={path} />
    {[0,1,2,3,4].map((index) => <g key={index} className={index === activeIndex ? 'is-active' : ''} transform={`translate(${[329,350,351,351,302][index]} ${[55,174,294,415,568][index]})`}><circle r="8" /><circle r="3" /></g>)}
  </svg>;
}

function NavigationCapsule({ link, index, active, onClose }) {
  const Icon = iconMap[link.label];
  return <NavLink to={link.path} className={`orbital-nav-capsule orbital-nav-capsule--${index + 1}${active ? ' is-active' : ''}`} aria-current={active ? 'page' : undefined} onClick={onClose}>
    <span className="orbital-capsule-icon"><Icon aria-hidden="true" /></span>
    <span className="orbital-capsule-copy"><small>0{index + 1}</small><strong>{link.label}</strong></span>
    <ArrowRight className="orbital-capsule-arrow" aria-hidden="true" />
  </NavLink>;
}

export default function OrbitalMenu({ open, closing, links, activeIndex, onClose, menuRef }) {
  return <div ref={menuRef} id="orbit-menu" className={`orbit-menu orbital-command${open ? ' is-open' : ''}${closing ? ' is-closing' : ''}`} role="dialog" aria-modal="true" aria-labelledby="orbital-menu-title" aria-hidden={!open} inert={!open}>
    <svg className="orbital-command-silhouette" viewBox="0 0 500 980" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="orbital-panel-surface" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--orbital-panel-2)" />
          <stop offset=".6" stopColor="var(--orbital-panel)" />
          <stop offset="1" stopColor="var(--orbital-panel-edge)" />
        </linearGradient>
      </defs>
      <path d="M31 66C43 25 79 22 119 29C186 40 225 99 294 101C357 103 379 43 435 51C474 57 489 84 489 123V901C489 947 466 970 422 970H72C29 970 11 946 11 901V137C11 100 18 77 31 66Z" />
      <path className="orbital-silhouette-highlight" d="M43 45C84 20 120 31 158 50C205 74 237 102 294 102C347 102 376 52 423 50" />
    </svg>
    <div className="orbital-command-header">
      <div><span>Navigate</span><strong id="orbital-menu-title">KDM</strong><i /><em>Portfolio</em></div>
      <button className="orbital-command-close" type="button" onClick={onClose} aria-label="Close navigation"><X /></button>
    </div>
    <div className="orbital-command-scroll">
      <div className="orbital-command-body">
        <OrbitalHub activeIndex={activeIndex} />
        <OrbitalConnections activeIndex={activeIndex} />
        <nav className="orbital-capsules" aria-label="Portfolio pages">
          {links.map((link, index) => <NavigationCapsule key={link.path} link={link} index={index} active={index === activeIndex} onClose={onClose} />)}
        </nav>
        <div className="orbital-command-motto" aria-hidden="true"><i /><span>Design</span><span>Develop</span><span>Explore</span></div>
      </div>
      <div className="orbital-command-appearance"><ThemeToggle /><span>Adjust your view</span></div>
    </div>
    <div className="orbital-command-detail" aria-hidden="true"><i /><i /><span /></div>
  </div>;
}
