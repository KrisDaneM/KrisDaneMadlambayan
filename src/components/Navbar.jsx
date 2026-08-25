import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const links = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/resume', label: 'Resume' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const coreRef = useRef(null);
  const menuRef = useRef(null);
  const lockedScrollY = useRef(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 600px)').matches;
    const didLockScroll = open && mobile;
    if (didLockScroll) {
      lockedScrollY.current = window.scrollY;
      document.body.classList.add('menu-open');
      document.body.style.position = 'fixed';
      document.body.style.top = `-${lockedScrollY.current}px`;
      document.body.style.width = '100%';
    }
    const focusTimer = open
      ? window.setTimeout(() => menuRef.current?.querySelector('.orbit-menu-links a')?.focus(), 80)
      : undefined;
    const close = (event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        requestAnimationFrame(() => coreRef.current?.focus());
      }
    };
    window.addEventListener('keydown', close);
    return () => {
      if (focusTimer) window.clearTimeout(focusTimer);
      if (didLockScroll) {
        document.body.classList.remove('menu-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, lockedScrollY.current);
      }
      window.removeEventListener('keydown', close);
    };
  }, [open]);
  const currentIndex = Math.max(0, links.findIndex(({ path }) => path === '/' ? pathname === '/' : pathname.startsWith(path)));
  const current = links[currentIndex];
  const move = (offset) => {
    const target = links[(currentIndex + offset + links.length) % links.length];
    navigate(target.path, { state: { direction: offset } });
  };

  return (
    <header className={`orbit-navigation${pathname === '/' ? ' is-home-route' : ''}${open ? ' is-menu-open' : ''}`}>
      <NavLink to="/" className="kdm-signature" aria-label="KDM home">KDM<span>.</span></NavLink>
      <nav className={`route-orbit ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
        <div className="orbit-ring" aria-hidden="true"><span /><span /><span /></div>
        <button className="orbit-arrow orbit-prev" type="button" aria-label="Previous page" onClick={() => move(-1)}><ChevronLeft /></button>
        <button ref={coreRef} className="orbit-core" type="button" aria-label={open ? 'Close page navigation' : 'Open page navigation'} aria-expanded={open} aria-controls="orbit-menu" onClick={() => setOpen(!open)}>
          <span className="orbit-kdm">KDM</span>
          <span className="orbit-route">{current.label}</span>
          <span className="orbit-count">0{currentIndex + 1} / 05</span>
        </button>
        <button className="orbit-arrow orbit-next" type="button" aria-label="Next page" onClick={() => move(1)}><ChevronRight /></button>
      </nav>
      <button className={`orbit-menu-backdrop ${open ? 'is-open' : ''}`} type="button" aria-label="Close navigation" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} />
      <div ref={menuRef} id="orbit-menu" className={`orbit-menu ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
        <NavLink to="/" className="orbit-menu-brand" aria-label="KDM home" onClick={() => setOpen(false)}>KDM<span>.</span></NavLink>
        <div className="orbit-menu-head"><span>Navigate / KDM</span><button type="button" onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button></div>
        <div className="orbit-menu-links">
          {links.map(({ path, label }, index) => <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setOpen(false)}><span>0{index + 1}</span><strong>{label}</strong><i aria-hidden="true" /></NavLink>)}
        </div>
        <ThemeToggle />
        <p>Use the orbit arrows to move through the portfolio in sequence.</p>
        <small className="orbit-menu-footer">KDM / Portfolio 2026</small>
      </div>
    </header>
  );
}
