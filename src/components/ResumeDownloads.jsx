import { Check, Download } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { resumeDownloads } from '../data/resume';
import { trackResumeDownload } from '../services/visitorService';

export default function ResumeDownloads() {
  const [downloaded, setDownloaded] = useState('');
  const timerRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  const acknowledge = (label) => {
    trackResumeDownload().catch(() => {});
    setDownloaded(label);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setDownloaded(''), 1600);
  };
  return <div className="resume-download-actions">{resumeDownloads.map((item) => <a href={item.href} download={item.filename} className={item.primary ? 'is-primary' : ''} onClick={() => acknowledge(item.label)} key={item.label}><span>{item.label}</span>{downloaded === item.label ? <><small>Downloaded</small><Check aria-hidden="true" /></> : <><small>Download</small><Download aria-hidden="true" /></>}</a>)}</div>;
}
