import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import VisitTracker from './components/VisitTracker';
import CommandPalette from './components/CommandPalette';
import PortfolioAssistant from './components/PortfolioAssistant';
import SplashScreen from './components/SplashScreen';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Resume = lazy(() => import('./pages/Resume'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const location = useLocation();
  return <><VisitTracker /><ScrollToTop /><Navbar /><CommandPalette /><PortfolioAssistant /><Suspense fallback={<main className="route-loading" aria-label="Loading page" />}><AnimatePresence mode="wait"><Routes location={location} key={location.pathname}><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/projects" element={<Projects />} /><Route path="/projects/:slug" element={<ProjectDetail />} /><Route path="/resume" element={<Resume />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes></AnimatePresence></Suspense><Footer /><SplashScreen /></>;
}
