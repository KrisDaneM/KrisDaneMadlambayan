import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, text, align = 'left' }) {
  return <Reveal className={`section-heading section-heading-${align}`}><p className="eyebrow"><span />{eyebrow}</p><h2>{title}</h2>{text && <p className="section-intro">{text}</p>}</Reveal>;
}
