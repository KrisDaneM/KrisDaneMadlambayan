import { Link } from 'react-router-dom';

export default function Brand({ footer = false }) {
  return <Link to="/" className={`brand ${footer ? 'brand-footer' : ''}`} aria-label="KDM home"><span aria-hidden="true">&lt;</span>KDM<span className="brand-slash" aria-hidden="true"> /&gt;</span><i aria-hidden="true" /></Link>;
}
