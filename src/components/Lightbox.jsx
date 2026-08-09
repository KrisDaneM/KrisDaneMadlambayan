import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return undefined;
    const close = (event) => event.key === 'Escape' && onClose();
    document.body.classList.add('menu-open'); window.addEventListener('keydown', close);
    return () => { document.body.classList.remove('menu-open'); window.removeEventListener('keydown', close); };
  }, [image, onClose]);
  if (!image) return null;
  return <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${image.title} image viewer`} onMouseDown={(event) => event.target === event.currentTarget && onClose()}><button type="button" className="lightbox-close" onClick={onClose} aria-label="Close image viewer" autoFocus><X /></button><figure><img src={image.src} alt={image.alt} /><figcaption><strong>{image.title}</strong><span>{image.description}</span></figcaption></figure></div>;
}
