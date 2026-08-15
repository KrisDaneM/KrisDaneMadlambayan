import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import VisitTracker from './components/VisitTracker';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import CommandPalette from './components/CommandPalette';

export default function App() {
  const location = useLocation();
  return <><VisitTracker /><ScrollToTop /><Navbar /><CommandPalette /><AnimatePresence mode="wait"><Routes location={location} key={location.pathname}><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/projects" element={<Projects />} /><Route path="/projects/:slug" element={<ProjectDetail />} /><Route path="/resume" element={<Resume />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes></AnimatePresence><Footer /></>;
}
