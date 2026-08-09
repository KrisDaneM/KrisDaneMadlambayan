import { useEffect } from 'react';

export default function SEO({ title, description, image = '/assets/featureimage.webp' }) {
  useEffect(() => {
    document.title = title;
    const set = (selector, attr, value) => { let el = document.head.querySelector(selector); if (!el) { el = document.createElement('meta'); const [key, name] = selector.includes('property=') ? ['property', selector.match(/"(.+)"/)[1]] : ['name', selector.match(/"(.+)"/)[1]]; el.setAttribute(key, name); document.head.appendChild(el); } el.setAttribute(attr, value); };
    const pageUrl = `${window.location.origin}${window.location.pathname}`;
    const imageUrl = new URL(image, window.location.origin).href;
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = pageUrl;
    set('meta[name="description"]', 'content', description);
    set('meta[property="og:title"]', 'content', title); set('meta[property="og:description"]', 'content', description); set('meta[property="og:type"]', 'content', 'website'); set('meta[property="og:url"]', 'content', pageUrl); set('meta[property="og:image"]', 'content', imageUrl);
    set('meta[name="twitter:card"]', 'content', 'summary_large_image'); set('meta[name="twitter:title"]', 'content', title); set('meta[name="twitter:description"]', 'content', description); set('meta[name="twitter:image"]', 'content', imageUrl);
  }, [title, description, image]);
  return null;
}
