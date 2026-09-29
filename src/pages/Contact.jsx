import emailjs from '@emailjs/browser';
import { AlertCircle, AtSign, Check, CheckCircle2, Mail, MapPin, MessageSquare, Phone, Send, UserRound } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import SocialLinks from '../components/SocialLinks';
import { portfolioProfile } from '../data/site';

const ease = [0.22, 1, 0.36, 1];
const wait = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));
const activeStates = new Set(['ignition', 'transmitting', 'absorbing', 'processing', 'success', 'preReturn', 'dataRelease', 'reconstructing', 'materializing', 'reappeared', 'restored', 'clearing', 'settling']);
const dataPacketIcons = { name: UserRound, email: AtSign, number: Phone, message: MessageSquare };

function ContactDetails({ reduce }) {
  const reveal = (delay) => ({ initial: reduce ? false : { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: .5, delay, ease } });
  return <div className="contact-terminal-details">
    <motion.p className="contact-terminal-eyebrow" {...reveal(.06)}><i />CONTACT</motion.p>
    <h1 id="contact-title"><motion.span {...reveal(.13)}>Let&apos;s</motion.span><motion.span className="is-accent" {...reveal(.21)}>connect</motion.span><motion.span {...reveal(.29)}>and create.</motion.span></h1>
    <motion.p className="contact-terminal-intro" {...reveal(.38)}>Have a project, opportunity, or just want to say hello?<br />Send a message and I&apos;ll get back to you as soon as I can.</motion.p>
    <motion.div className="contact-terminal-methods" {...reveal(.48)}>
      <a href={`mailto:${portfolioProfile.email}`}><span><Mail aria-hidden="true" /></span><div><small>EMAIL</small><strong>{portfolioProfile.email}</strong></div><i aria-hidden="true" /></a>
      <div><span><MapPin aria-hidden="true" /></span><div><small>LOCATION</small><strong>{portfolioProfile.location}</strong></div><i aria-hidden="true" /></div>
    </motion.div>
    <motion.div className="contact-terminal-socials" {...reveal(.57)}><SocialLinks /></motion.div>
  </div>;
}

function CommunicationOrbit({ activeField, coreRef, orbitRef, phase, reduce, signalLevel, signalToken }) {
  const receiving = ['absorbing', 'processing', 'success', 'preReturn', 'dataRelease', 'reconstructing'].includes(phase);
  const success = phase === 'success';
  const nodes = [['one', 104, 253], ['two', 179, 119], ['three', 430, 151], ['four', 513, 316], ['five', 190, 493]];
  return <motion.div className={`contact-orbit-stage is-${phase}${activeField ? ` has-field-signal field-${activeField}` : ''} signal-level-${signalLevel}`} aria-hidden="true" initial={reduce ? false : { opacity: 0, scale: .88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .72, delay: .25, ease }}>
    <div ref={orbitRef} className="contact-orbit-system">
      <div className="contact-orbit-grid" />
      <svg className="contact-orbit-geometry" viewBox="0 0 600 600" focusable="false">
        <motion.circle cx="300" cy="300" r="240" initial={reduce ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: .6 }} transition={{ duration: .9, delay: .28, ease }} />
        <motion.circle className="orbit-dashed" cx="300" cy="300" r="194" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .85, delay: .36, ease }} />
        <motion.ellipse className="orbit-ellipse orbit-ellipse-one" cx="300" cy="300" rx="257" ry="111" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .85, delay: .43, ease }} />
        <motion.ellipse className="orbit-ellipse orbit-ellipse-two" cx="300" cy="300" rx="224" ry="137" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .85, delay: .5, ease }} />
        <path className="orbit-crosshair" d="M300 30v540M30 300h540" /><path className="orbit-ticks" d="M300 30v18M300 552v18M30 300h18M552 300h18M109 109l13 13M478 478l13 13M109 491l13-13M478 122l13-13" />
        {nodes.map(([name, cx, cy], index) => <motion.circle key={name} className={`contact-orbit-node contact-orbit-node-${name}`} cx={cx} cy={cy} r="5" initial={reduce ? false : { opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .32, delay: .5 + index * .07, ease }} />)}
        <g className="contact-orbit-energy" aria-hidden="true">
          <ellipse className="contact-orbit-energy-glow" cx="300" cy="300" rx="257" ry="111" pathLength="1" />
          <ellipse className="contact-orbit-energy-body" cx="300" cy="300" rx="257" ry="111" pathLength="1" />
          <ellipse className="contact-orbit-energy-core" cx="300" cy="300" rx="257" ry="111" pathLength="1" />
        </g>
      </svg>
      <div className="contact-orbit-rotor contact-orbit-rotor-one"><i /><i /><i /></div><div className="contact-orbit-rotor contact-orbit-rotor-two"><i /><i /></div>
      <div ref={coreRef} className={`contact-orbit-core${receiving ? ' is-receiving' : ''}${phase === 'waiting' ? ' is-waiting' : ''}${success ? ' is-success' : ''}`}><i /><b /></div>
      <div className="contact-orbit-equator" /><div className="contact-orbit-captured-plane"><Send /></div><div className="contact-orbit-pulses"><i /><i /><i /></div>
      <div className="contact-orbit-axis"><i /><b /><em /></div>
      <div className="contact-orbit-response-ring"><i /><b /><em /></div>
      <div className="contact-orbit-sparks">{Array.from({ length: 8 }, (_, index) => <i key={index} style={{ '--spark-index': index }} />)}</div>
      <div className="contact-orbit-data-icons"><UserRound /><AtSign /><Phone /><MessageSquare /></div>
      <div className="contact-orbit-success-mark"><Check /></div>
      {activeField && <i key={signalToken} className="contact-orbit-field-pulse" />}
      <span className="contact-orbit-marker contact-orbit-marker-one">+</span><span className="contact-orbit-marker contact-orbit-marker-two">+</span>
    </div>
  </motion.div>;
}

function DataTransmissionOverlay({ mode, path, reduce, sequence, submittedValues }) {
  if (!path?.packets?.length || reduce || !['transmitting', 'dataRelease', 'reconstructing'].includes(mode)) return null;
  const returning = mode !== 'transmitting';
  const releasing = mode === 'dataRelease';
  const duration = releasing ? .2 : returning ? .3 : .9;
  return <motion.div className={`contact-transmission-overlay is-${mode}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-hidden="true">
    <svg viewBox={`0 0 ${path.width} ${path.height}`} preserveAspectRatio="none">
      <defs>
        <filter id={`contact-beam-glow-${sequence}`} x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <g className="contact-beam-layers" filter={`url(#contact-beam-glow-${sequence})`}>
        {path.packets.map((packet, index) => {
          const beamPath = returning ? packet.returnD : packet.d;
          const delay = index * .085;
          return <g key={`${packet.name}-beam`}><motion.path className="contact-beam contact-beam-glow" d={beamPath} pathLength="1" initial={{ strokeDashoffset: 1, opacity: 0 }} animate={{ strokeDashoffset: [-.28, -1.25], opacity: [0, .62, .45, 0] }} transition={{ duration, delay, times: [0, .12, .82, 1], ease }} /><motion.path className="contact-beam contact-beam-body" d={beamPath} pathLength="1" initial={{ strokeDashoffset: 1, opacity: 0 }} animate={{ strokeDashoffset: [-.28, -1.25], opacity: [0, 1, .82, 0] }} transition={{ duration, delay, times: [0, .1, .84, 1], ease }} /><motion.path className="contact-beam contact-beam-core" d={beamPath} pathLength="1" initial={{ strokeDashoffset: 1, opacity: 0 }} animate={{ strokeDashoffset: [-.28, -1.25], opacity: [0, 1, 1, 0] }} transition={{ duration, delay, times: [0, .08, .86, 1], ease }} /><motion.path className="contact-beam contact-beam-hot" d={beamPath} pathLength="1" initial={{ strokeDashoffset: 1, opacity: 0 }} animate={{ strokeDashoffset: [-.28, -1.25], opacity: [0, .9, 1, 0] }} transition={{ duration, delay: delay + .025, times: [0, .1, .88, 1], ease }} /></g>;
        })}
      </g>
    </svg>
    {path.packets.map((packet, index) => {
      const PacketIcon = dataPacketIcons[packet.name];
      const beamPath = returning ? packet.returnD : packet.d;
      const pathStyle = { offsetPath: `path('${beamPath}')` };
      const delay = index * (releasing ? .025 : returning ? .045 : .085);
      const text = submittedValues[packet.name] || (packet.name === 'number' ? 'No phone provided' : '');
      const startDistance = releasing || !returning ? '0%' : '20%';
      const endDistance = releasing ? '24%' : '100%';
      return <motion.div key={`${sequence}-${mode}-${packet.name}`} className={`contact-data-capsule is-${packet.name}${releasing ? ' is-release-node' : ''}`} style={pathStyle} initial={{ offsetDistance: startDistance, opacity: 0, scale: returning ? 0 : .92 }} animate={{ offsetDistance: endDistance, opacity: releasing ? [0, 1, 1] : [0, 1, 1, 0], scale: releasing ? [0, .72, 1] : returning ? [0, .82, 1, 1] : [.92, 1, .3, 0] }} transition={{ duration, delay, times: releasing ? [0, .55, 1] : [0, .1, .86, 1], ease }}><PacketIcon /><span>{text.length > 46 ? `${text.slice(0, 46)}…` : text}</span><i /></motion.div>;
    })}
    {path.packets.slice(0, 3).flatMap((packet, pathIndex) => [0, 1].map((particleIndex) => { const beamPath = returning ? packet.returnD : packet.d; return <motion.i key={`${sequence}-${mode}-${pathIndex}-${particleIndex}`} className={`contact-flight-particle is-${particleIndex}`} style={{ offsetPath: `path('${beamPath}')` }} initial={{ offsetDistance: `${18 + particleIndex * 24}%`, opacity: 0, scale: 0 }} animate={{ offsetDistance: `${72 + particleIndex * 16}%`, opacity: [0, 1, 0], scale: [0, 1, 0] }} transition={{ duration: .48, delay: pathIndex * .09 + particleIndex * .08, ease: 'easeOut' }} />; }))}
  </motion.div>;
}

function FormReconstructionOverlay({ mode, path, reduce, sequence }) {
  if (reduce || !path?.panel || !['reconstructing', 'materializing'].includes(mode)) return null;
  const { panel, fields, button } = path;
  const outer = `M ${panel.x + 14} ${panel.y} H ${panel.x + panel.width - 22} L ${panel.x + panel.width} ${panel.y + 22} V ${panel.y + panel.height - 22} L ${panel.x + panel.width - 22} ${panel.y + panel.height} H ${panel.x + 22} L ${panel.x} ${panel.y + panel.height - 22} V ${panel.y + 14} Z`;
  const boxes = Object.values(fields);
  const drawing = mode === 'reconstructing';
  const transition = (index) => ({ duration: drawing ? .24 : .2, delay: drawing ? index * .035 : 0, ease });
  const shapeAnimation = drawing ? { pathLength: 1, opacity: [0, 1, .95] } : { pathLength: 1, opacity: [1, .45, 0] };
  return <motion.div key={`${sequence}-${mode}-wireframe`} className={`contact-form-wireframe is-${mode}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-hidden="true">
    <svg viewBox={`0 0 ${path.width} ${path.height}`} preserveAspectRatio="none">
      <defs><filter id={`contact-wire-glow-${sequence}`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.4" result="wireBlur" /><feMerge><feMergeNode in="wireBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
      <g className="contact-wireframe-glow" filter={`url(#contact-wire-glow-${sequence})`}>
        <motion.path d={outer} initial={{ pathLength: 0, opacity: 0 }} animate={shapeAnimation} transition={transition(0)} />
        <motion.path d={`M ${panel.x + 26} ${panel.y + 70} H ${panel.x + panel.width - 26}`} initial={{ pathLength: 0, opacity: 0 }} animate={shapeAnimation} transition={transition(1)} />
        {boxes.map((box, index) => <motion.rect key={`glow-${index}`} x={box.x} y={box.y} width={box.width} height={box.height} rx="8" initial={{ pathLength: 0, opacity: 0 }} animate={shapeAnimation} transition={transition(index + 2)} />)}
        {button && <motion.rect x={button.x} y={button.y} width={button.width} height={button.height} rx="8" initial={{ pathLength: 0, opacity: 0 }} animate={shapeAnimation} transition={transition(6)} />}
      </g>
      <g className="contact-wireframe-core">
        <motion.path d={outer} initial={{ pathLength: 0, opacity: 0 }} animate={shapeAnimation} transition={transition(0)} />
        <motion.path d={`M ${panel.x + 26} ${panel.y + 70} H ${panel.x + panel.width - 26}`} initial={{ pathLength: 0, opacity: 0 }} animate={shapeAnimation} transition={transition(1)} />
        {boxes.map((box, index) => <motion.rect key={`core-${index}`} x={box.x} y={box.y} width={box.width} height={box.height} rx="8" initial={{ pathLength: 0, opacity: 0 }} animate={shapeAnimation} transition={transition(index + 2)} />)}
        {button && <motion.rect x={button.x} y={button.y} width={button.width} height={button.height} rx="8" initial={{ pathLength: 0, opacity: 0 }} animate={shapeAnimation} transition={transition(6)} />}
      </g>
    </svg>
    <div className="contact-wireframe-sparks">{Array.from({ length: 7 }, (_, index) => <i key={index} style={{ '--wire-spark': index }} />)}</div>
  </motion.div>;
}

function FieldSignalOverlay({ activeField, path, reduce, token }) {
  if (!activeField || !path || reduce) return null;
  const pathStyle = { offsetPath: `path('${path.d}')` };
  const packets = activeField === 'email' ? [0, .13, .26] : activeField === 'phone' ? [0, .18] : [0];
  return <motion.div key={`${activeField}-${token}`} className={`contact-field-signal is-${activeField}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-hidden="true">
    <svg viewBox={`0 0 ${path.width} ${path.height}`} preserveAspectRatio="none"><motion.path className="contact-field-signal-glow" d={path.d} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: [.05, .34, .12] }} transition={{ duration: .42, ease }} /><motion.path className="contact-field-signal-line" d={path.d} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .38, ease }} /></svg>
    {packets.map((delay, index) => <motion.i key={index} className="contact-field-packet" style={pathStyle} initial={{ offsetDistance: '0%', opacity: 0, scale: .6 }} animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0], scale: [.6, 1, .86, .35] }} transition={{ duration: .46, delay, ease }} />)}
  </motion.div>;
}

function ContactField({ active, children, error, fieldRef, icon: Icon, id, label, valid }) {
  return <div ref={fieldRef} className={`contact-terminal-field${active ? ' is-active' : ''}${valid ? ' is-valid' : ''}${error ? ' has-error' : ''}`}><label className="sr-only" htmlFor={id}>{label}</label><Icon className="contact-field-icon" aria-hidden="true" />{children}{valid && <Check className="contact-field-check" aria-hidden="true" />}{active && <i className="contact-field-spark" aria-hidden="true" />}{error && <small id={`${id}-error`}><AlertCircle aria-hidden="true" />{error}</small>}</div>;
}

function ContactForm({ activeField, buttonRef, errors, fieldRefs, formRef, onBlurField, onChangeField, onFocusField, onInvalid, onPhoneChange, onPointerLeave, onPointerMove, onSubmit, panelRef, phase, reduce, resetComplete, resetting, values }) {
  const locked = activeStates.has(phase);
  const successful = ['success', 'preReturn', 'dataRelease', 'reconstructing', 'materializing', 'reappeared', 'restored'].includes(phase);
  const resettingToIdle = ['clearing', 'settling'].includes(phase);
  const busy = activeStates.has(phase) && !successful && !resettingToIdle;
  const buttonText = successful ? 'MESSAGE SENT' : busy ? 'SENDING MESSAGE...' : phase === 'error' ? 'TRY AGAIN' : 'SEND MESSAGE';
  const statusText = successful ? 'COMPLETE' : phase === 'error' ? 'CHANNEL INTERRUPTED' : busy ? 'CHANNEL ACTIVE' : 'CHANNEL READY';
  const activityCopy = phase === 'ignition' ? 'Initializing transmission...' : phase === 'processing' ? 'Processing message...' : ['preReturn', 'dataRelease', 'reconstructing', 'materializing'].includes(phase) ? 'Restoring message channel...' : phase === 'restored' ? 'Transmission complete.' : 'Transmitting your message...';
  return <motion.div ref={panelRef} className={`contact-terminal-panel is-${phase}${resetting ? ' is-resetting' : ''}${resetComplete ? ' is-reset-complete' : ''}`} initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .58, delay: .35, ease }}>
    <i className="contact-panel-corner corner-one" /><i className="contact-panel-corner corner-two" /><i className="contact-panel-corner corner-three" /><div className="contact-panel-progress"><i /></div>
    <svg className="contact-panel-trace" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polygon className="contact-panel-trace-glow" points="0,0 95,0 100,5 100,95 95,100 5,100 0,95" pathLength="1" /><polygon className="contact-panel-trace-core" points="0,0 95,0 100,5 100,95 95,100 5,100 0,95" pathLength="1" /></svg>
    <header><p><i />MESSAGE CHANNEL</p><span className={`is-${phase}`}><i />{statusText}</span></header><h2>Send a message.</h2><p className="contact-panel-intro">Share your idea, question, or opportunity.</p>
    <form ref={formRef} onSubmit={onSubmit} onInvalid={onInvalid} aria-busy={activeStates.has(phase)}>
      <div className="contact-terminal-fields">
        <ContactField id="contact-name" label="Your name" icon={UserRound} error={errors.name} active={activeField === 'name'} valid={values.name.trim().length > 1} fieldRef={(node) => { fieldRefs.current.name = node; }}><input id="contact-name" type="text" name="name" data-label="Name" autoComplete="name" placeholder="Your name" required disabled={locked} value={values.name} onFocus={() => onFocusField('name')} onBlur={onBlurField} onChange={(event) => onChangeField('name', event.target.value, event.target)} aria-invalid={errors.name ? 'true' : undefined} aria-describedby={errors.name ? 'contact-name-error' : undefined} /></ContactField>
        <ContactField id="contact-email" label="Email address" icon={AtSign} error={errors.email} active={activeField === 'email'} valid={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)} fieldRef={(node) => { fieldRefs.current.email = node; }}><input id="contact-email" type="email" name="email" data-label="Email" autoComplete="email" placeholder="Email address" required disabled={locked} value={values.email} onFocus={() => onFocusField('email')} onBlur={onBlurField} onChange={(event) => onChangeField('email', event.target.value, event.target)} aria-invalid={errors.email ? 'true' : undefined} aria-describedby={errors.email ? 'contact-email-error' : undefined} /></ContactField>
        <ContactField id="contact-number" label="Phone number (optional)" icon={Phone} error={errors.number} active={activeField === 'phone'} valid={values.number.length >= 7} fieldRef={(node) => { fieldRefs.current.phone = node; }}><input id="contact-number" type="tel" inputMode="numeric" pattern="[0-9]*" name="number" data-label="Phone number" autoComplete="tel" placeholder="Phone number (optional)" disabled={locked} value={values.number} onFocus={() => onFocusField('phone')} onBlur={onBlurField} onChange={onPhoneChange} aria-invalid={errors.number ? 'true' : undefined} aria-describedby={errors.number ? 'contact-number-error' : undefined} /></ContactField>
        <ContactField id="contact-message" label="Your message" icon={MessageSquare} error={errors.message} active={activeField === 'message'} valid={values.message.trim().length > 0} fieldRef={(node) => { fieldRefs.current.message = node; }}><textarea id="contact-message" name="message" data-label="Message" rows="6" placeholder="Tell me about your idea or opportunity..." required disabled={locked} value={values.message} onFocus={() => onFocusField('message')} onBlur={onBlurField} onChange={(event) => onChangeField('message', event.target.value, event.target)} aria-invalid={errors.message ? 'true' : undefined} aria-describedby={errors.message ? 'contact-message-error' : undefined} /></ContactField>
      </div>
      <div className="contact-terminal-submit-row"><div className="contact-launch-pad" aria-hidden="true"><i /><i /><b /><b /><b /></div><button ref={buttonRef} className={`contact-terminal-submit is-${phase}`} type="submit" disabled={activeStates.has(phase)} aria-busy={busy} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}><span>{buttonText}</span>{successful ? <Check aria-hidden="true" /> : busy ? <i className="contact-submit-dots" aria-hidden="true"><b /><b /><b /></i> : <Send aria-hidden="true" />}</button><div className="contact-terminal-status" aria-hidden="true">{busy && <i className="contact-status-spinner" />}{successful && <CheckCircle2 />}{phase === 'error' && <AlertCircle />}<p>{successful ? <>Message delivered.<small>I&apos;ll get back to you as soon as I can.</small></> : busy ? <>{activityCopy}<small>This won&apos;t take long.</small></> : phase === 'error' ? <>Message couldn&apos;t be sent.<small>Please try again.</small></> : <>I&apos;ll get back to you as soon as I can.</>}</p></div></div>
      <p className="sr-only" role="status" aria-live="polite">{successful ? "Message sent successfully. I'll get back to you as soon as I can." : phase === 'error' ? 'Message could not be sent. Please try again.' : busy ? 'Sending message.' : ''}</p>
    </form>
  </motion.div>;
}

export default function Contact() {
  const reduce = useReducedMotion();
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const orbitRef = useRef(null);
  const coreRef = useRef(null);
  const panelRef = useRef(null);
  const compositionRef = useRef(null);
  const fieldRefs = useRef({});
  const frameRef = useRef(0);
  const sequenceRunRef = useRef(0);
  const lastFieldSignalRef = useRef(0);
  const [phase, setPhase] = useState('idle');
  const [errors, setErrors] = useState({});
  const [path, setPath] = useState(null);
  const [fieldPath, setFieldPath] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [signalToken, setSignalToken] = useState(0);
  const [values, setValues] = useState({ name: '', email: '', number: '', message: '' });
  const [submittedValues, setSubmittedValues] = useState({ name: '', email: '', number: '', message: '' });
  const [sequence, setSequence] = useState(0);
  const [resetting, setResetting] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [interactionVisible, setInteractionVisible] = useState(true);

  const calculatePath = () => {
    if (reduce || !compositionRef.current || !coreRef.current || !panelRef.current) { setPath(null); return; }
    const composition = compositionRef.current.getBoundingClientRect();
    const core = coreRef.current.getBoundingClientRect();
    const panel = panelRef.current.getBoundingClientRect();
    const button = buttonRef.current?.getBoundingClientRect();
    if (!composition.width || !composition.height || !core.width) { setPath(null); return; }
    const mobile = window.innerWidth <= 680;
    const coreX = core.left + core.width / 2 - composition.left;
    const coreY = core.top + core.height / 2 - composition.top;
    const fieldBoxes = {};
    const packets = ['name', 'email', 'number', 'message'].map((name, index) => {
      const element = fieldRefs.current[name === 'number' ? 'phone' : name];
      if (!element) return null;
      const field = element.getBoundingClientRect();
      if (!field.width || !field.height) return null;
      fieldBoxes[name] = { x: field.left - composition.left, y: field.top - composition.top, width: field.width, height: field.height };
      if (name === 'number' && !values.number) return null;
      const fieldX = (mobile ? field.left + field.width / 2 : field.left + 22) - composition.left;
      const fieldY = field.top + field.height / 2 - composition.top;
      const endX = mobile ? fieldX + (index - 1.5) * 13 : coreX;
      const endY = mobile ? Math.max(0, fieldY - 88 - index * 7) : coreY;
      const dx = endX - fieldX;
      const dy = endY - fieldY;
      const bend = (index - 1.5) * (mobile ? 7 : 24);
      const d = `M ${fieldX} ${fieldY} C ${fieldX + dx * .28} ${fieldY + dy * .2 + bend}, ${fieldX + dx * .74} ${endY - dy * .08 - bend}, ${endX} ${endY}`;
      const returnD = `M ${endX} ${endY} C ${fieldX + dx * .72} ${endY - dy * .12 + bend}, ${fieldX + dx * .24} ${fieldY + dy * .18 - bend}, ${fieldX} ${fieldY}`;
      return { name, d, returnD };
    }).filter(Boolean);
    setPath({
      packets,
      width: composition.width,
      height: composition.height,
      panel: { x: panel.left - composition.left, y: panel.top - composition.top, width: panel.width, height: panel.height },
      button: button ? { x: button.left - composition.left, y: button.top - composition.top, width: button.width, height: button.height } : null,
      fields: fieldBoxes,
    });
  };
  const calculateFieldPath = (fieldName) => {
    if (reduce || !fieldName || !compositionRef.current || !fieldRefs.current[fieldName] || !coreRef.current) { setFieldPath(null); return; }
    const composition = compositionRef.current.getBoundingClientRect();
    const field = fieldRefs.current[fieldName].getBoundingClientRect();
    const core = coreRef.current.getBoundingClientRect();
    if (!composition.width || !composition.height || !field.width || !core.width) { setFieldPath(null); return; }
    const mobile = window.innerWidth <= 680;
    const startX = (mobile ? field.left + field.width / 2 : field.left + 3) - composition.left;
    const startY = (mobile ? field.top + 3 : field.top + field.height / 2) - composition.top;
    const endX = mobile ? startX : core.left + core.width / 2 - composition.left;
    const endY = mobile ? Math.max(0, startY - 56) : core.top + core.height / 2 - composition.top;
    const bend = { name: -.08, email: .06, phone: .13, message: .2 }[fieldName] || 0;
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const c1x = startX + deltaX * .28;
    const c1y = startY + deltaY * (.32 + bend);
    const c2x = startX + deltaX * .74;
    const c2y = endY - deltaY * (.08 - bend);
    setFieldPath({ d: `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`, width: composition.width, height: composition.height });
  };

  useLayoutEffect(() => {
    let geometryFrame = 0;
    let disposed = false;
    const refresh = () => {
      if (disposed) return;
      window.cancelAnimationFrame(geometryFrame);
      geometryFrame = window.requestAnimationFrame(() => {
        if (disposed) return;
        calculatePath();
        if (activeField && !activeStates.has(phase)) calculateFieldPath(activeField);
      });
    };
    refresh();
    const observer = new ResizeObserver(refresh);
    [compositionRef.current, panelRef.current, orbitRef.current].forEach((element) => { if (element) observer.observe(element); });
    window.addEventListener('resize', refresh, { passive: true });
    window.addEventListener('orientationchange', refresh);
    document.fonts?.ready.then(refresh);
    return () => { disposed = true; observer.disconnect(); window.removeEventListener('resize', refresh); window.removeEventListener('orientationchange', refresh); window.cancelAnimationFrame(geometryFrame); };
  // Geometry is measured after layout and only refreshed when a relevant box changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, activeField, phase]);

  useEffect(() => {
    const section = compositionRef.current;
    if (!section) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInteractionVisible(entry.isIntersecting && entry.intersectionRatio > .05), { threshold: [0, .05, .2] });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => { window.cancelAnimationFrame(frameRef.current); sequenceRunRef.current += 1; }, []);

  const handleOrbitPointer = (event) => {
    if (reduce || event.pointerType === 'touch' || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const { clientX, clientY, currentTarget } = event;
    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => { const rect = currentTarget.getBoundingClientRect(); const x = ((clientX - rect.left) / rect.width - .5) * 10; const y = ((clientY - rect.top) / rect.height - .5) * 8; orbitRef.current?.style.setProperty('--orbit-shift-x', `${x.toFixed(2)}px`); orbitRef.current?.style.setProperty('--orbit-shift-y', `${y.toFixed(2)}px`); });
  };
  const resetOrbitPointer = () => { orbitRef.current?.style.setProperty('--orbit-shift-x', '0px'); orbitRef.current?.style.setProperty('--orbit-shift-y', '0px'); };
  const handleButtonPointer = (event) => { if (reduce || phase !== 'idle' || event.pointerType === 'touch') return; const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--button-x', `${(((event.clientX - rect.left) / rect.width - .5) * 7).toFixed(2)}px`); event.currentTarget.style.setProperty('--button-y', `${(((event.clientY - rect.top) / rect.height - .5) * 7).toFixed(2)}px`); };
  const resetButtonPointer = () => { buttonRef.current?.style.setProperty('--button-x', '0px'); buttonRef.current?.style.setProperty('--button-y', '0px'); };
  const describeInvalidField = (field) => field.validity.valueMissing ? `${field.dataset.label} is required.` : field.validity.typeMismatch ? 'Enter a valid email address.' : `Check the ${field.dataset.label.toLowerCase()} field.`;
  const handleInvalid = (event) => { const field = event.target; if (field.name) setErrors((current) => ({ ...current, [field.name]: describeInvalidField(field) })); };
  const triggerFieldSignal = (fieldName) => {
    if (reduce || activeStates.has(phase)) return;
    const now = performance.now();
    if (now - lastFieldSignalRef.current < 150) return;
    lastFieldSignalRef.current = now;
    calculateFieldPath(fieldName);
    setSignalToken((current) => current + 1);
  };
  const handleFocusField = (fieldName) => {
    if (activeStates.has(phase)) return;
    setActiveField(fieldName);
    window.requestAnimationFrame(() => {
      calculateFieldPath(fieldName);
      setSignalToken((current) => current + 1);
    });
  };
  const handleBlurField = () => setActiveField(null);
  const handleChangeField = (fieldName, value) => {
    if (phase === 'error') setPhase('idle');
    setValues((current) => ({ ...current, [fieldName]: value }));
    if (errors[fieldName]) setErrors((current) => { const next = { ...current }; delete next[fieldName]; return next; });
    triggerFieldSignal(fieldName);
  };
  const handlePhoneChange = (event) => handleChangeField('number', event.currentTarget.value.replace(/\D/g, ''));

  async function submit(event) {
    event.preventDefault();
    if (activeStates.has(phase)) return;
    if (!emailjs?.sendForm) { setPhase('error'); return; }
    calculatePath();
    resetButtonPointer();
    setResetting(false);
    setResetComplete(false);
    setActiveField(null);
    setFieldPath(null);
    setSubmittedValues({ ...values });
    setPhase('ignition');
    setSequence((current) => current + 1);
    const runId = ++sequenceRunRef.current;
    const request = emailjs.sendForm('service_su6pyfv', 'template_fq7byqe', formRef.current, { publicKey: 'r0Ke9SEJtUOKvP8xw' }).then(() => true, () => false);
    const advance = async (nextPhase, duration) => { if (sequenceRunRef.current !== runId) return false; setPhase(nextPhase); await wait(duration); return sequenceRunRef.current === runId; };

    if (reduce) {
      const delivered = await request;
      if (sequenceRunRef.current !== runId) return;
      setPhase(delivered ? 'success' : 'error');
      if (!delivered) return;
      setErrors({});
      await wait(1700);
    } else {
      if (!await advance('ignition', 350)) return;
      if (!await advance('transmitting', 950)) return;
      if (!await advance('absorbing', 520)) return;
      if (!await advance('processing', 720)) return;
      const delivered = await request;
      if (sequenceRunRef.current !== runId) return;
      if (!delivered) { setPhase('error'); return; }
      if (!await advance('success', 720)) return;
      if (!await advance('preReturn', 100)) return;
      if (!await advance('dataRelease', 200)) return;
      if (!await advance('reconstructing', 300)) return;
      if (!await advance('materializing', 400)) return;
      if (!await advance('reappeared', 400)) return;
      if (!await advance('restored', 600)) return;
      setErrors({});
    }
    if (sequenceRunRef.current !== runId) return;
    setPhase('clearing');
    if (!reduce) {
      await wait(300);
      if (sequenceRunRef.current !== runId) return;
      setValues((current) => ({ ...current, name: '' }));
      await wait(60);
      setValues((current) => ({ ...current, email: '' }));
      await wait(60);
      setValues((current) => ({ ...current, number: '' }));
      await wait(60);
      setValues((current) => ({ ...current, message: '' }));
      await wait(120);
    }
    if (sequenceRunRef.current !== runId) return;
    formRef.current?.reset();
    setValues({ name: '', email: '', number: '', message: '' });
    setSubmittedValues({ name: '', email: '', number: '', message: '' });
    setResetting(false);
    setResetComplete(true);
    if (!reduce) setPhase('settling');
    await wait(400);
    if (sequenceRunRef.current !== runId) return;
    setPhase('idle');
    setResetComplete(false);
  }

  const signalLevel = values.message.length > 100 ? 3 : values.message.length > 40 ? 2 : values.message.length > 0 ? 1 : 0;
  return <PageShell><SEO title="Contact | Kris Dane Madlambayan" description="Contact Kris Dane Madlambayan to discuss internships, front-end development, web projects, and creative collaboration." /><main className={`contact-terminal${reduce ? ' is-reduced' : ''}`} onPointerMove={handleOrbitPointer} onPointerLeave={resetOrbitPointer}><div className="contact-terminal-grid" aria-hidden="true" /><div className="contact-terminal-rail contact-terminal-rail-left" aria-hidden="true" /><div className="contact-terminal-rail contact-terminal-rail-right" aria-hidden="true" /><section ref={compositionRef} className="container contact-terminal-composition" aria-labelledby="contact-title"><ContactDetails reduce={reduce} /><CommunicationOrbit activeField={activeField} coreRef={coreRef} orbitRef={orbitRef} phase={phase} reduce={reduce} signalLevel={signalLevel} signalToken={signalToken} /><ContactForm activeField={activeField} buttonRef={buttonRef} errors={errors} fieldRefs={fieldRefs} formRef={formRef} onBlurField={handleBlurField} onChangeField={handleChangeField} onFocusField={handleFocusField} onInvalid={handleInvalid} onPhoneChange={handlePhoneChange} onPointerLeave={resetButtonPointer} onPointerMove={handleButtonPointer} onSubmit={submit} panelRef={panelRef} phase={phase} reduce={reduce} resetComplete={resetComplete} resetting={resetting} values={values} /><div className="contact-interaction-boundary" aria-hidden="true"><AnimatePresence>{interactionVisible && activeField && fieldPath && !activeStates.has(phase) && <FieldSignalOverlay activeField={activeField} path={fieldPath} reduce={reduce} token={signalToken} />}{interactionVisible && ['transmitting', 'dataRelease', 'reconstructing'].includes(phase) && path && <DataTransmissionOverlay key={`${phase}-${sequence}`} mode={phase} path={path} reduce={reduce} sequence={sequence} submittedValues={submittedValues} />}{interactionVisible && ['reconstructing', 'materializing'].includes(phase) && path && <FormReconstructionOverlay key={`${phase}-${sequence}-wireframe`} mode={phase} path={path} reduce={reduce} sequence={sequence} />}</AnimatePresence></div></section></main></PageShell>;
}
