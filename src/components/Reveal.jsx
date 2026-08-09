import { motion, useReducedMotion } from 'framer-motion';

export default function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  const supportsViewportAnimation = typeof globalThis.IntersectionObserver === 'function';
  const motionProps = reduce
    ? { initial: false }
    : supportsViewportAnimation
      ? { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.16 } }
      : { initial: false, animate: { opacity: 1, y: 0 } };

  return <Component className={className} {...motionProps} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</Component>;
}
