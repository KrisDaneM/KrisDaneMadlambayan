import { Link } from 'react-router-dom';
import Brand from './Brand';
import SocialLinks from './SocialLinks';
import VisitorCounter from './VisitorCounter';

export default function Footer() {
  return <footer className="footer"><div className="container footer-grid"><div><Brand footer /><p>Building thoughtful digital experiences where clean code meets purposeful design.</p><VisitorCounter /></div><div className="footer-nav"><p className="footer-label">Explore</p><Link to="/about">About</Link><Link to="/projects">Projects</Link><Link to="/resume">Resume</Link><Link to="/contact">Contact</Link></div><div><p className="footer-label">Connect</p><SocialLinks labels /></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Kris Dane Madlambayan</span><span>Designed & developed with intention.</span></div></footer>;
}
