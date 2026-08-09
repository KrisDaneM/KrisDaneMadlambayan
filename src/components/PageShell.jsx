import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function PageShell({ children }) {
  const reduce = useReducedMotion();
  const location = useLocation();
  const direction = Math.sign(location.state?.direction || 1);
  return <motion.main id="main-content" initial={reduce ? false : { opacity: 0, x: direction * 18 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? {} : { opacity: 0, x: direction * -14 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.main>;
}
