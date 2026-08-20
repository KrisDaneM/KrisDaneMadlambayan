import { memo, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'kdm_splash_seen';
const PROGRESS_START = 280;
const PROGRESS_DURATION = 1820;
const FONT_READY_GRACE = 180;
const LOCK_HOLD = 170;
const EXIT_SAFETY_DURATION = 2050;
const HOME_ENTRY_DELAY = 1040;
const HANDOFF_EVENT = 'kdm:splash-home-handoff';

let showOnThisPageLoad = true;
try { showOnThisPageLoad = window.sessionStorage.getItem(STORAGE_KEY) !== 'true'; } catch { /* Storage can be unavailable. */ }

const easeOutCubic = (value) => 1 - ((1 - value) ** 3);
const phaseFor = (progress) => progress < 34 ? 'CORE WAKE' : progress < 78 ? 'SIGNAL SYNC' : 'INTERFACE READY';
const lockFor = (progress) => progress >= 100 ? 'STABLE' : progress >= 85 ? 'LOCKING' : 'SYNCING';

const SplashLogo = memo(function SplashLogo() {
  return <div className="kdm-signal-logo" aria-hidden="true"><span>K</span><span>D</span><span>M</span><b>.</b><i /></div>;
});

function SignalGeometry() {
  return <div className="kdm-signal-geometry kdm-vortex-part--geometry" aria-hidden="true">
    <div className="kdm-signal-crosshair"><i /><i /></div>
    <svg viewBox="0 0 600 600" focusable="false">
      <circle className="kdm-signal-ring kdm-signal-ring--faint" cx="300" cy="300" r="278" />
      <g className="kdm-signal-orbit kdm-signal-orbit--outer"><path d="M77 294a223 140 0 1 0 446 12" /><circle className="kdm-signal-node kdm-signal-node--orange" cx="506" cy="349" r="5" /></g>
      <g className="kdm-signal-orbit kdm-signal-orbit--reverse"><path className="kdm-signal-dash" d="M135 391a187 112 0 1 1 323-173" /><circle className="kdm-signal-node kdm-signal-node--white" cx="182" cy="440" r="4" /></g>
      <path className="kdm-signal-segment" d="M190 178a164 164 0 0 1 203-20M434 429a164 164 0 0 1-194 21" />
      <circle className="kdm-signal-ring kdm-signal-ring--inner" cx="300" cy="300" r="126" />
      <path className="kdm-signal-progress-arc" pathLength="100" d="M300 426a126 126 0 1 1 89-37" />
      <g className="kdm-signal-ticks"><path d="M300 41v15M300 544v15M41 300h15M544 300h15M117 117l11 11M472 472l11 11M117 483l11-11M472 128l11-11" /></g>
      <path className="kdm-signal-sweep" d="M60 291a240 151 0 0 1 459-41" />
    </svg>
  </div>;
}

function VortexSystem() {
  return <div className="kdm-vortex-system" aria-hidden="true">
    <div className="kdm-vortex-field" />
    <svg className="kdm-vortex-trails" viewBox="0 0 600 600" focusable="false">
      <g className="kdm-vortex-trail-layer kdm-vortex-trail-layer--one">
        <path d="M94 326C128 130 369 54 505 201C624 330 469 526 290 487C147 456 102 362 205 274" />
        <path d="M162 176C317 78 509 205 454 365C414 483 242 492 172 382" />
      </g>
      <g className="kdm-vortex-trail-layer kdm-vortex-trail-layer--two">
        <path d="M62 235C153 34 462 38 548 264C614 438 385 577 210 486" />
        <path d="M222 123C376 75 523 241 445 382C380 500 201 449 173 323" />
      </g>
      <g className="kdm-vortex-trail-layer kdm-vortex-trail-layer--three">
        <path d="M116 430C39 242 194 74 375 110C523 139 567 315 469 421" />
        <path d="M244 454C128 399 137 221 254 167C365 116 489 223 438 337" />
      </g>
    </svg>
    <div className="kdm-vortex-horizon"><i /></div>
  </div>;
}

function ApertureCurtain() {
  return <svg className="kdm-vortex-curtain" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <defs>
      <mask id="kdm-vortex-mask">
        <rect width="100" height="100" fill="white" />
        <circle className="kdm-vortex-aperture" cx="50" cy="50" r="2.8" fill="black" />
      </mask>
    </defs>
    <rect width="100" height="100" fill="#080808" mask="url(#kdm-vortex-mask)" />
  </svg>;
}

const energyStreaks = [
  [-7, '43vmin', 0, 'orange'], [18, '35vmin', 32, 'white'], [43, '40vmin', 12, 'orange'],
  [76, '31vmin', 48, 'white'], [112, '38vmin', 20, 'orange'], [148, '34vmin', 56, 'white'],
  [181, '42vmin', 8, 'orange'], [218, '36vmin', 38, 'white'], [257, '39vmin', 18, 'orange'],
  [301, '33vmin', 52, 'white'], [329, '41vmin', 26, 'orange'],
];
const energyParticles = [
  [4, '31vmin', 0, 'dot'], [29, '27vmin', 44, 'dash'], [57, '34vmin', 18, 'dot'], [88, '25vmin', 62, 'white'],
  [121, '32vmin', 26, 'dash'], [153, '29vmin', 8, 'white'], [187, '35vmin', 54, 'dot'], [216, '27vmin', 34, 'dash'],
  [246, '33vmin', 14, 'white'], [278, '29vmin', 70, 'dot'], [311, '36vmin', 24, 'dash'], [342, '28vmin', 48, 'white'],
];
const orbitFragments = [[-18, '21vmin', 0], [42, '26vmin', 40], [106, '23vmin', 18], [174, '27vmin', 55], [238, '22vmin', 28], [306, '25vmin', 8]];

function HomeIgnition() {
  return <div className="kdm-home-ignition" aria-hidden="true">
    <div className="kdm-energy-core"><i /><b /><em /><span />{[0, 45, 90, 135].map((angle) => <u key={angle} style={{ '--ray-angle': `${angle}deg` }} />)}</div>
    <div className="kdm-energy-waves"><i /><i /><i /></div>
    <div className="kdm-energy-streaks">{energyStreaks.map(([angle, distance, delay, tone], index) => <i key={angle} className={`is-${tone} kdm-energy-streak--${index + 1}`} style={{ '--angle': `${angle}deg`, '--distance': distance, '--delay': `${delay}ms` }} />)}</div>
    <div className="kdm-energy-particles">{energyParticles.map(([angle, distance, delay, kind]) => <i key={angle} className={`is-${kind}`} style={{ '--angle': `${angle}deg`, '--distance': distance, '--delay': `${delay}ms` }} />)}</div>
    <div className="kdm-energy-fragments">{orbitFragments.map(([angle, distance, delay], index) => <i key={angle} className={`kdm-energy-fragment--${index + 1}`} style={{ '--angle': `${angle}deg`, '--distance': distance, '--delay': `${delay}ms` }} />)}</div>
    <div className="kdm-energy-ripples"><i /><i /></div>
  </div>;
}

export default function SplashScreen() {
  const [visible, setVisible] = useState(showOnThisPageLoad);
  const [progress, setProgress] = useState(0);
  const [locked, setLocked] = useState(false);
  const [exiting, setExiting] = useState(false);
  const startedAt = useRef(null);
  const frame = useRef(null);
  const lockTimer = useRef(null);
  const exitTimer = useRef(null);
  const handoffTimer = useRef(null);
  const homeEntryTimer = useRef(null);
  const exitStarted = useRef(false);
  const lastProgress = useRef(0);
  const canPointerSkip = useRef(false);
  const beginLockRef = useRef(null);

  useEffect(() => {
    if (!visible) return undefined;
    try { window.sessionStorage.setItem(STORAGE_KEY, 'true'); } catch { /* Module flag covers this lifecycle. */ }
    showOnThisPageLoad = false;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    let fontsReady = !document.fonts;
    let active = true;
    document.fonts?.ready.then(() => { fontsReady = true; }).catch(() => { fontsReady = true; });

    const beginLock = () => {
      if (!active || exitStarted.current) return;
      exitStarted.current = true;
      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
        frame.current = null;
      }
      lastProgress.current = 100;
      setProgress(100);
      setLocked(true);
      lockTimer.current = window.setTimeout(() => { if (active) setExiting(true); }, LOCK_HOLD);
    };
    beginLockRef.current = beginLock;

    const onKeyDown = (event) => { if (event.key === 'Escape' || event.key === 'Enter') beginLock(); };
    const pointerTimer = window.setTimeout(() => { canPointerSkip.current = true; }, 450);
    window.addEventListener('keydown', onKeyDown);

    if (reducedMotion) {
      beginLock();
    } else {
      const animate = (timestamp) => {
        if (!active || exitStarted.current) return;
        if (startedAt.current === null) startedAt.current = timestamp;
        const elapsed = timestamp - startedAt.current;
        if (elapsed >= PROGRESS_START) {
          const linear = Math.min((elapsed - PROGRESS_START) / PROGRESS_DURATION, 1);
          const visualStep = Math.min(40, Math.round(easeOutCubic(linear) * 40));
          const next = Math.min(100, Math.round(visualStep * 2.5));
          if (next !== lastProgress.current) { lastProgress.current = next; setProgress(next); }
          if (linear >= 1 && (fontsReady || elapsed >= PROGRESS_START + PROGRESS_DURATION + FONT_READY_GRACE)) { beginLock(); return; }
        }
        frame.current = window.requestAnimationFrame(animate);
      };
      frame.current = window.requestAnimationFrame(animate);
    }

    return () => {
      active = false;
      beginLockRef.current = null;
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
      if (lockTimer.current !== null) window.clearTimeout(lockTimer.current);
      if (exitTimer.current !== null) window.clearTimeout(exitTimer.current);
      if (handoffTimer.current !== null) window.clearTimeout(handoffTimer.current);
      if (homeEntryTimer.current !== null) window.clearTimeout(homeEntryTimer.current);
      document.documentElement.classList.remove('kdm-home-handoff-active');
      document.documentElement.classList.remove('kdm-transition-active');
      window.clearTimeout(pointerTimer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [visible]);

  useEffect(() => {
    if (!exiting) return undefined;
    document.documentElement.classList.add('kdm-transition-active');
    homeEntryTimer.current = window.setTimeout(() => {
      document.documentElement.classList.add('kdm-home-handoff-active');
      window.dispatchEvent(new CustomEvent(HANDOFF_EVENT));
    }, HOME_ENTRY_DELAY);
    exitTimer.current = window.setTimeout(() => setVisible(false), EXIT_SAFETY_DURATION);
    handoffTimer.current = window.setTimeout(() => document.documentElement.classList.remove('kdm-home-handoff-active'), 1850);
    return () => {
      window.clearTimeout(exitTimer.current);
      window.clearTimeout(handoffTimer.current);
      window.clearTimeout(homeEntryTimer.current);
      document.documentElement.classList.remove('kdm-home-handoff-active');
      document.documentElement.classList.remove('kdm-transition-active');
    };
  }, [exiting]);

  if (!visible) return null;
  const skip = () => { if (canPointerSkip.current) beginLockRef.current?.(); };
  const handleEnd = (event) => {
    if (event.target === event.currentTarget && (event.animationName === 'kdm-vortex-stage-exit' || event.animationName === 'kdm-vortex-reduced-exit')) setVisible(false);
  };
  const phase = phaseFor(progress);

  return <div
    className={`kdm-splash-stage kdm-signal-stage${exiting ? ' is-exiting' : ''}${locked ? ' is-locked' : progress >= 85 ? ' is-locking' : ''}`}
    aria-hidden="true"
    onPointerUp={skip}
    style={{ '--signal-progress': progress }}
  >
    <div className="kdm-splash-edge" />
    <div className="kdm-splash kdm-signal-surface" onAnimationEnd={handleEnd}>
      <ApertureCurtain />
      <HomeIgnition />
      <SignalGeometry />
      <VortexSystem />
      <div className="kdm-signal-status kdm-signal-status--left"><span>CORE SYNC</span><strong>{progress.toFixed(1)}%</strong></div>
      <div className="kdm-signal-status kdm-signal-status--right"><span>SIGNAL LOCK</span><strong>{lockFor(progress)}</strong></div>
      <div className="kdm-signal-content">
        <div className="kdm-signal-slot kdm-signal-slot--logo"><SplashLogo /></div>
        <div className="kdm-signal-slot kdm-signal-slot--edition"><p className="kdm-splash-edition">PORTFOLIO / 2026</p></div>
        <div className="kdm-signal-slot kdm-signal-slot--counter">
          <div className="kdm-signal-counter">
            <svg className="kdm-signal-counter-arc" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="55" pathLength="100" /></svg>
            <strong>{String(progress).padStart(3, '0')}</strong>
            <span>{phase}</span>
          </div>
        </div>
        <div className="kdm-signal-slot kdm-signal-slot--frame"><p className="kdm-signal-frame">SYS / 2026 / INITIALIZING KDM.OS</p></div>
      </div>
    </div>
  </div>;
}
