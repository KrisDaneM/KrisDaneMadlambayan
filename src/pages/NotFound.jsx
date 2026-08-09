import Button from '../components/Button';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
export default function NotFound() { return <PageShell><SEO title="Page Not Found | KDM" description="The requested KDM portfolio page could not be found." /><section className="not-found"><div className="container"><span>404</span><p className="eyebrow"><span />Route not found</p><h1>Looks like this route<br />escaped the codebase.</h1><p>The page may have moved, or the address might need another look.</p><Button to="/">Back home</Button></div></section></PageShell>; }
