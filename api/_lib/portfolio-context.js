import { projects } from '../../src/data/projects.js';
import { portfolioProfile, skills, socialLinks } from '../../src/data/site.js';

function projectLine(project) {
  const details = [
    `${project.title} (${project.type})`,
    `category: ${project.category}`,
    project.role ? `Kris's role: ${project.role}` : null,
    `summary: ${project.description}`,
    `technologies: ${project.stack.join(', ')}`,
    `case study: /projects/${project.slug}`,
    `live website: ${project.liveUrl}`,
    project.sourceUrl ? `source: ${project.sourceUrl}` : null,
  ].filter(Boolean);

  return `- ${details.join('; ')}`;
}

export function buildPortfolioContext() {
  const socialProfiles = socialLinks.map(({ label, href }) => `${label}: ${href}`).join(', ');

  return [
    `NAME\n${portfolioProfile.name}`,
    `ROLES\n${portfolioProfile.roles.join(' / ')}`,
    `PROFILE\n${portfolioProfile.summary}`,
    `APPROVED PUBLIC PERSONAL PROFILE\nGender: ${portfolioProfile.gender}\nInterests: ${portfolioProfile.interests.join(', ')}\nCelebrity crush: ${portfolioProfile.celebrityCrush}`,
    `EDUCATION\n${portfolioProfile.education}`,
    `LOCATION\n${portfolioProfile.location}`,
    `CONTACT\nEmail: ${portfolioProfile.email}; portfolio route: /contact; ${socialProfiles}`,
    `SKILLS\n${skills.join(', ')}`,
    `PROJECTS\n${projects.map(projectLine).join('\n')}`,
    `ACCURACY NOTES
- AC-CORE is a group-developed project by MMPA Works, not an officially deployed Angeles City government system. Kris is credited as Backend Systems and Database Architect. His verified contribution is: ${projects.find(({ slug }) => slug === 'ac-core')?.contribution} Do not upgrade “focused on” or “contributing to” into claims that he personally designed, implemented, or owned the complete backend, database, APIs, or integrations.
- SOCConsult is a group academic consultation system. No individual role for Kris is verified in the portfolio data. Do not describe reserved or future AI-assisted functionality as operational.
- A project's stack and features describe the team project, not necessarily Kris's individual implementation. Never infer personal ownership or contributions beyond an explicitly supplied role or contribution.`,
    `PERSONAL PROFILE RULES
- The approved public personal facts are limited to name, gender, listed interests, and celebrity crush, plus the existing public education, location, and contact details above.
- Do not infer age, birthday, exact address, relationship status, family information, sexuality, religion, political views, private accounts, private contacts, additional hobbies, or additional celebrity crushes.
- When asked for a personal fact that is not supplied, answer exactly: “I don't have that information in Kris's public portfolio profile.”`,
    'NAVIGATION\nHome: /; About: /about; Projects: /projects; Resume: /resume; Contact: /contact',
  ].join('\n\n');
}

export function buildQuestionGroundingGuard(message) {
  if (/ac[-\s]?core/i.test(message)) {
    const project = projects.find(({ slug }) => slug === 'ac-core');
    return `AC-CORE grounding for this answer: identify it as a group project by MMPA Works. Kris's role is “${project?.role}”. If discussing his contribution, stay within this exact verified statement: “${project?.contribution}” Do not replace “focused on” or “contributing to” with designed, implemented, built, owned, led, or created.`;
  }
  if (/socconsult/i.test(message)) {
    return 'SOCConsult grounding for this answer: identify it as a group academic consultation system. No individual role for Kris is supplied. Do not attribute team features, technologies, or implementation work personally to Kris. Do not present reserved future AI functionality as operational.';
  }
  return null;
}
