import { Facebook, Github, Instagram, Linkedin } from 'lucide-react';
import { socialLinks } from '../data/site';

const icons = { GitHub: Github, LinkedIn: Linkedin, Instagram, Facebook };
export default function SocialLinks({ labels = false }) {
  return <div className={`social-links ${labels ? 'social-links-labels' : ''}`}>{socialLinks.map(({ label, href }) => { const Icon = icons[label]; return <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${label}`}><Icon size={18} />{labels && <span>{label}</span>}</a>; })}</div>;
}
