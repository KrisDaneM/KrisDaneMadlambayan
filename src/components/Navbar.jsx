import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import OrbitalMenu from './OrbitalMenu';

const links = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/resume', label: 'Resume' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const navigationRef = useRef(null);
  const coreRef = useRef(null);
  const menuRef = useRef(null);
  const lockedScrollY = useRef(0);
  const closeTimerRef = useRef();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const requestClose = useCallback(() => {
    if (!open || closeTimerRef.current) return;
    setClosing(true);
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 380;
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = undefined;
      setOpen(false);
      setClosing(false);
      requestAnimationFrame(() => coreRef.current?.focus());
    }, duration);
  }, [open]);
  useEffect(() => {
    const didLockScroll = open;
    if (didLockScroll) {
      lockedScrollY.current = window.scrollY;
      document.body.classList.add('menu-open');
      document.body.style.position = 'fixed';
      document.body.style.top = `-${lockedScrollY.current}px`;
      document.body.style.width = '100%';
    }
    const focusTimer = open
      ? window.setTimeout(() => menuRef.current?.querySelector('.orbital-command-close')?.focus(), 360)
      : undefined;
    const close = (event) => {
      if (event.key === 'Escape' && open) {
        requestClose();
      }
      if (event.key === 'Tab' && open && menuRef.current) {
        const focusable = [...menuRef.current.querySelectorAll('a[href],button:not([disabled])')];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
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
  }, [open, requestClose]);
  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);
  const currentIndex = Math.max(0, links.findIndex(({ path }) => path === '/' ? pathname === '/' : pathname.startsWith(path)));
  const current = links[currentIndex];
  const move = (offset) => {
    const target = links[(currentIndex + offset + links.length) % links.length];
    navigate(target.path, { state: { direction: offset } });
  };
  const toggleMenu = () => {
    if (!open && coreRef.current && navigationRef.current) {
      const rect = coreRef.current.getBoundingClientRect();
      navigationRef.current.style.setProperty('--ignition-x', `${rect.left + rect.width / 2}px`);
      navigationRef.current.style.setProperty('--ignition-y', `${rect.top + rect.height / 2}px`);
    }
    if (open) requestClose();
    else setOpen(true);
  };

  return (
    <header ref={navigationRef} className={`orbit-navigation${pathname === '/' ? ' is-home-route' : ''}${open ? ' is-menu-open' : ''}${closing ? ' is-menu-closing' : ''}`}>
      <NavLink to="/" className="kdm-signature" aria-label="KDM home">KDM<span>.</span></NavLink>
      <nav className={`route-orbit ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
        <div className="orbit-ring" aria-hidden="true"><span /><span /><span /></div>
        <button className="orbit-arrow orbit-prev" type="button" aria-label="Previous page" onClick={() => move(-1)}><ChevronLeft /></button>
        <button ref={coreRef} className="orbit-core" type="button" aria-label={open ? 'Close page navigation' : 'Open page navigation'} aria-expanded={open} aria-controls="orbit-menu" onClick={toggleMenu}>
          <span className="orbit-kdm">KDM</span>
          <span className="orbit-route">{current.label}</span>
          <span className="orbit-count">0{currentIndex + 1} / 05</span>
        </button>
        <button className="orbit-arrow orbit-next" type="button" aria-label="Next page" onClick={() => move(1)}><ChevronRight /></button>
      </nav>
      <div className="orbital-ignition" aria-hidden="true"><i /><i /><i /><b /><b /><b /><span /></div>
      <button className={`orbit-menu-backdrop ${open ? 'is-open' : ''}${closing ? ' is-closing' : ''}`} type="button" aria-label="Close navigation" tabIndex={open ? 0 : -1} onClick={requestClose} />
      <OrbitalMenu open={open} closing={closing} links={links} activeIndex={currentIndex} onClose={requestClose} menuRef={menuRef} />
    </header>
  );
}
