import { projects } from './projects';
import { certifications, portfolioProfile, skills } from './site';

export const resumeProfile = {
  summaryHeadline: 'Building thoughtful digital experiences where code meets purpose.',
  summary: 'I build responsive, accessible, and user-centered interfaces for websites and web applications. My approach combines clean implementation, thoughtful interaction, and attention to the details that make digital services useful and easy to understand.',
  education: {
    degree: 'Bachelor of Science in Information Technology',
    school: 'Holy Angel University',
    location: 'Angeles City, Pampanga',
    period: '2023 — Present',
    achievement: "Dean's Lister",
    achievementPeriod: '2024 — Present',
    coursework: ['Web Development', 'UI/UX Design', 'System Analysis & Design', 'Database Fundamentals'],
  },
};

export const coreStrengths = [
  { title: 'Responsive implementation', description: 'Builds interfaces that adapt clearly across desktop, tablet, and mobile.' },
  { title: 'User-centered design', description: 'Organizes content and interactions around clarity, accessibility, and real user needs.' },
  { title: 'Full-stack awareness', description: 'Works across front-end interfaces, back-end tools, and database fundamentals.' },
  { title: 'Continuous learning', description: 'Improves through coursework, certifications, documentation, and practical projects.' },
];

const groupDefinitions = [
  ['Frontend', ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Angular', 'TypeScript']],
  ['Styling / UI', ['Responsive Design', 'UI Design', 'UX Design']],
  ['Backend', ['Node.js', 'Express', 'PHP']],
  ['Databases', ['MongoDB', 'Database Fundamentals']],
  ['Tools & others', ['Figma', 'Canva']],
];

export const resumeSkillGroups = groupDefinitions.map(([title, entries]) => ({
  title,
  skills: entries.filter((entry) => skills.includes(entry)),
})).filter((group) => group.skills.length);

const technologyAliases = {
  nodejs: 'node',
  'node.js': 'node',
  node: 'node',
  vue: 'vue',
  'vue.js': 'vue',
  express: 'express',
  'express.js': 'express',
  ts: 'typescript',
  typescript: 'typescript',
  js: 'javascript',
  javascript: 'javascript',
};

const normalizeTechnology = (value) => {
  const normalized = value.toLocaleLowerCase().replace(/\s+/g, ' ').trim();
  return technologyAliases[normalized] || normalized.replace(/\.js$/, '');
};

export const getProjectsForTechnology = (technology) => {
  const normalized = normalizeTechnology(technology);
  if (normalized === 'database fundamentals' || normalized === 'responsive design' || normalized === 'ui design' || normalized === 'ux design' || normalized === 'figma' || normalized === 'canva') return [];
  return projects.filter((project) => project.stack.some((stackItem) => normalizeTechnology(stackItem) === normalized));
};

export const resumeStats = [
  { label: 'Portfolio projects', value: projects.length },
  { label: 'Listed capabilities', value: skills.length },
  { label: 'Certificates', value: certifications.length },
  { label: 'Expertise areas', value: resumeSkillGroups.length },
];

export const buildCapabilities = [
  { title: 'Responsive websites & landing pages', detail: 'HTML · CSS · JavaScript · Responsive Design' },
  { title: 'Web applications & dashboards', detail: 'Vue.js · Angular · Node.js' },
  { title: 'REST API integrations', detail: 'Node.js · Express · MongoDB' },
  { title: 'Database-backed applications', detail: 'MongoDB · Database Fundamentals' },
  { title: 'Interface systems & prototypes', detail: 'UI Design · UX Design · Figma' },
];

export const currentFocus = [
  'Building more complete full-stack web systems',
  'Improving responsive UI/UX and interaction design',
  'Strengthening TypeScript, APIs, and database fundamentals',
];

export const workflowTools = ['Figma', 'Canva', 'GitHub', 'Vercel', 'Cloudinary'];

export const interestGroups = [
  {
    title: 'Programming Related',
    items: [
      'Building and improving responsive websites',
      'Practicing front-end and full-stack web development',
      'Creating personal, academic, and group web projects',
      'Exploring UI/UX design and micro-interactions',
      'Improving website performance and responsiveness',
      'Working with APIs, databases, and backend systems',
      'Learning modern web technologies and development tools',
    ],
  },
  { title: 'Outside the screen', items: portfolioProfile.interests },
];

export const resumeDownloads = [
  { label: 'PDF', href: '/downloads/resume.pdf', filename: 'Kris-Dane-Madlambayan-Resume.pdf', primary: true },
  { label: 'DOCX', href: '/downloads/resume.docx', filename: 'Kris-Dane-Madlambayan-Resume.docx' },
  { label: 'Image', href: '/downloads/resume.png', filename: 'Kris-Dane-Madlambayan-Resume.png' },
];
