import { ArrowRight, Search, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

const pageCommands = [
  { id: 'home', label: 'Home', path: '/', group: 'Navigation' },
  { id: 'about', label: 'About', path: '/about', group: 'Navigation' },
  { id: 'projects', label: 'Projects', path: '/projects', group: 'Navigation' },
  { id: 'resume', label: 'Resume', path: '/resume', group: 'Navigation' },
  { id: 'contact', label: 'Contact', path: '/contact', group: 'Navigation' },
];

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

export default function CommandPalette() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);
  const closeTimerRef = useRef(null);

  const commands = useMemo(() => [
    ...pageCommands,
    ...projects.map((project) => ({
      id: `project-${project.slug}`,
      label: project.title,
      path: `/projects/${project.slug}`,
      group: 'Projects',
    })),
    { id: 'toggle-theme', label: 'Toggle theme', group: 'Actions', action: () => document.querySelector('.universe-switch')?.click() },
    { id: 'assistant', label: 'Open KDM Assistant', group: 'Actions', action: () => window.dispatchEvent(new CustomEvent('kdm:open-assistant')) },
    { id: 'download-cv', label: 'Download CV', group: 'Actions', action: () => { const link = document.createElement('a'); link.href = '/downloads/resume.pdf'; link.download = 'Kris-Dane-Madlambayan-Resume.pdf'; link.click(); } },
    { id: 'contact-kris', label: 'Contact Kris', path: '/contact', group: 'Actions' },
  ], []);

  const filteredCommands = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    if (!search) return commands;
    return commands.filter((command) => `${command.label} ${command.group}`.toLocaleLowerCase().includes(search));
  }, [commands, query]);

  const finishClose = useCallback(() => {
    setMounted(false);
    setQuery('');
    setActiveIndex(0);
    if (previousFocusRef.current?.isConnected) previousFocusRef.current.focus();
  }, []);

  const closePalette = useCallback(() => {
    window.clearTimeout(closeTimerRef.current);
    setOpen(false);
    if (reducedMotion()) finishClose();
    else closeTimerRef.current = window.setTimeout(finishClose, 210);
  }, [finishClose]);

  const openPalette = useCallback(() => {
    window.clearTimeout(closeTimerRef.current);
    previousFocusRef.current = document.activeElement;
    setQuery('');
    setActiveIndex(0);
    setMounted(true);
    window.requestAnimationFrame(() => {
      setOpen(true);
      window.requestAnimationFrame(() => inputRef.current?.focus());
    });
  }, []);

  const runCommand = useCallback((command) => {
    if (!command) return;
    if (command.action) command.action();
    else navigate(command.path);
    closePalette();
  }, [closePalette, navigate]);

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === 'k') {
        event.preventDefault();
        if (mounted && open) closePalette();
        else openPalette();
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [closePalette, mounted, open, openPalette]);

  useEffect(() => {
    if (!mounted) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleDialogKeys = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closePalette();
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (!filteredCommands.length) return;
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        setActiveIndex((current) => (current + direction + filteredCommands.length) % filteredCommands.length);
      } else if (event.key === 'Enter' && filteredCommands.length) {
        event.preventDefault();
        runCommand(filteredCommands[activeIndex] ?? filteredCommands[0]);
      } else if (event.key === 'Tab') {
        const focusable = panelRef.current?.querySelectorAll('input, button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleDialogKeys);
    return () => {
      document.removeEventListener('keydown', handleDialogKeys);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, closePalette, filteredCommands, mounted, runCommand]);

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);

  return (
    <>
      <button type="button" className="command-palette-trigger" onClick={openPalette} aria-label="Open KDM quick access (Control K or Command K)" aria-haspopup="dialog">
        <span>KDM / QUICK ACCESS</span><kbd>CTRL K</kbd>
      </button>

      {mounted && (
        <div className={`command-palette-overlay${open ? ' is-open' : ''}`} onMouseDown={(event) => event.target === event.currentTarget && closePalette()}>
          <section ref={panelRef} className="command-palette-panel" role="dialog" aria-modal="true" aria-labelledby="command-palette-title">
            <header className="command-palette-header">
              <div><span>KDM / QUICK ACCESS</span><h2 id="command-palette-title">Go anywhere.</h2></div>
              <button type="button" onClick={closePalette} aria-label="Close quick access"><X aria-hidden="true" size={17} /></button>
            </header>
            <div className="command-palette-search">
              <Search aria-hidden="true" size={17} strokeWidth={1.6} />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }}
                placeholder="Search pages or projects..."
                aria-label="Search pages or projects"
                aria-controls="command-palette-results"
                aria-activedescendant={filteredCommands[activeIndex] ? `command-${filteredCommands[activeIndex].id}` : undefined}
                role="combobox"
                aria-expanded="true"
                autoComplete="off"
              />
              <kbd>ESC</kbd>
            </div>
            <div id="command-palette-results" className="command-palette-results" role="listbox">
              {['Navigation', 'Projects', 'Actions'].map((group) => {
                const groupCommands = filteredCommands.filter((command) => command.group === group);
                if (!groupCommands.length) return null;
                return (
                  <div className="command-palette-group" key={group}>
                    <p>{group}</p>
                    {groupCommands.map((command) => {
                      const commandIndex = filteredCommands.indexOf(command);
                      const isActive = commandIndex === activeIndex;
                      return (
                        <button id={`command-${command.id}`} type="button" role="option" aria-selected={isActive} className={isActive ? 'is-active' : ''} key={command.id} onMouseEnter={() => setActiveIndex(commandIndex)} onClick={() => runCommand(command)}>
                          <span>{command.label}</span><ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
                        </button>
                      );
                    })}
                  </div>
                );
              })}
              {!filteredCommands.length && <p className="command-palette-empty">No matching page or project.</p>}
            </div>
            <footer className="command-palette-footer"><span>↑↓ Select</span><span>Enter Open</span><span>Esc Close</span></footer>
          </section>
        </div>
      )}
    </>
  );
}
