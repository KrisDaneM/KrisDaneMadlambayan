import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function PageShell({ children }) {
  const reduce = useReducedMotion();
  const location = useLocation();
  const direction = Math.sign(location.state?.direction || 1);
  return <motion.main id="main-content" tabIndex={-1} initial={reduce ? false : { opacity: 0, y: direction * 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? {} : { opacity: 0, y: direction * -8 }} transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.main>;
}
