import { ArrowDownToLine, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Button({ to, href, children, variant = 'primary', download, icon = true, className = '' }) {
  const classes = `button button-${variant} ${className}`;
  const content = <>{children}{icon && (download ? <ArrowDownToLine size={17} /> : <ArrowUpRight size={17} />)}</>;
  if (to) return <Link className={classes} to={to}>{content}</Link>;
  return <a className={classes} href={href} download={download} target={download ? undefined : '_blank'} rel={download ? undefined : 'noopener noreferrer'}>{content}</a>;
}
