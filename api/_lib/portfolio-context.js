import { projects } from '../../src/data/projects.js';
import { portfolioProfile, skills, socialLinks } from '../../src/data/site.js';

function projectLine(project) {
  const details = [
    `${project.title} (${project.type})`,
    `category: ${project.category}`,
    project.role ? `Kris's role: ${project.role}` : null,
    `summary: ${project.description}`,
    project.stack.length ? `technologies: ${project.stack.join(', ')}` : null,
    `case study: /projects/${project.slug}`,
    project.dataSource ? `data source: ${project.dataSource}` : null,
    project.notice ? `important notice: ${project.notice}` : null,
    project.liveUrl ? `live website: ${project.liveUrl}` : null,
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
    `PERSONAL PROFILE\nName: ${portfolioProfile.name}\nGender: ${portfolioProfile.gender}\nInterests:\n${portfolioProfile.interests.map((interest) => `- ${interest}`).join('\n')}\nGOAT: ${portfolioProfile.goat}\nFavorite dish / favorite food / favorite ulam: ${portfolioProfile.favoriteDish}\nCelebrity crush: ${portfolioProfile.celebrityCrush}\nCelebrity lookalike: ${portfolioProfile.celebrityLookalike}`,
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
- The approved public personal facts are limited to name, gender, listed interests, GOAT, favorite dish, celebrity crush, and celebrity lookalike, plus the existing public education, location, and contact details above.
- Personal facts must come only from the labeled PERSONAL PROFILE fields. Never guess, merge, substitute, or infer one field from another.
- GOAT is ${portfolioProfile.goat}. Celebrity crush is ${portfolioProfile.celebrityCrush}. Celebrity lookalike is ${portfolioProfile.celebrityLookalike}. These are separate facts and must never be substituted for one another.
- Favorite food, favorite dish, favorite ulam, fav food, fav dish, paboritong pagkain, and paboritong ulam all refer to the Favorite dish field.
- For hobbies, interests, or what Kris does outside coding, mention only the listed interests unless another labeled personal fact is specifically requested.
- Do not infer age, birthday, exact address, relationship status, family information, sexuality, religion, political views, private accounts, private contacts, additional hobbies, or additional celebrity crushes.
- When asked for a personal fact that is not supplied, answer exactly: “I don't have that information in Kris's public portfolio profile.”`,
    'NAVIGATION\nHome: /; About: /about; Projects: /projects; Resume: /resume; Contact: /contact',
  ].join('\n\n');
}

export function buildQuestionGroundingGuard(message) {
  if (/\bgoat\b/i.test(message)) {
    return `The GOAT field in Kris's approved public profile is exactly "${portfolioProfile.goat}". Do not use the celebrity crush or celebrity lookalike. Answer in one conversational sentence matching the visitor's language. Suitable Filipino: "Easy. Si ${portfolioProfile.goat} ang GOAT ni Kris." Suitable English: "Easy one. Kris's GOAT is ${portfolioProfile.goat}. Believe it!" Keep any Naruto reference to one light touch.`;
  }
  if (/\b(fav(?:orite)?\s*(?:food|dish|ulam)|paboritong\s*(?:ulam|pagkain))\b/i.test(message)) {
    return `Kris's Favorite dish field is exactly "${portfolioProfile.favoriteDish}". Answer in one conversational sentence matching the visitor's language. Suitable Filipino: "${portfolioProfile.favoriteDish}. Yan ang favorite ulam ni Kris." Suitable English: "Kris's favorite dish is ${portfolioProfile.favoriteDish}. Solid choice." Do not infer food from another field.`;
  }
  if (/\b(lookalike|kamukha)\b/i.test(message)) {
    return `Kris's chosen celebrity lookalike is exactly "${portfolioProfile.celebrityLookalike}". This is not his celebrity crush and is not an objective biometric claim. Answer briefly and conversationally in the visitor's language. Suitable English: "For the fun answer, Kris lists ${portfolioProfile.celebrityLookalike} as his celebrity lookalike."`;
  }
  if (/\b(crush|celebrity crush)\b/i.test(message)) {
    return `Kris's celebrity crush is exactly "${portfolioProfile.celebrityCrush}". This is not his GOAT or celebrity lookalike. Answer briefly and playfully in the visitor's language. Suitable Filipino: "Ayan easy. Si ${portfolioProfile.celebrityCrush} ang celebrity crush ni Kris."`;
  }
  if (/\b(hobb(?:y|ies)|interests?|outside coding|anime|marvel|basketball|mga trip)\b/i.test(message)) {
    return `Kris's complete approved interests are: ${portfolioProfile.interests.join(', ')}. For general hobbies or outside-coding questions, mention these interests only, then optionally add one short playful KDM-style phrase. For a yes/no question about one listed interest, confirm it directly. Match the visitor's language. Suitable Filipino: "Mahilig si Kris sa basketball, manood ng anime, at Marvel. Code + hoops + anime combo."`;
  }
  if (/\bnaruto\b/i.test(message)) {
    return `${portfolioProfile.goat} is in scope only as the character Kris considers his GOAT. Keep the answer concise and connected to Kris; do not become a general Naruto encyclopedia.`;
  }
  if (/kathryn\s+bernardo/i.test(message)) {
    return `Kathryn Bernardo is in scope only because the approved public profile identifies her as Kris's celebrity crush. Answer this question briefly in the visitor's language and keep it connected to Kris. Do not provide general celebrity biography or invent additional facts. A suitable English answer is: “Kathryn Bernardo is the celebrity crush listed in Kris's public profile.” A suitable Filipino answer is: “Si Kathryn Bernardo ang celebrity crush na nakalista sa public profile ni Kris.”`;
  }
  if (/ac[-\s]?core/i.test(message)) {
    const project = projects.find(({ slug }) => slug === 'ac-core');
    return `AC-CORE grounding for this answer: identify it as a group project by MMPA Works. Kris's role is “${project?.role}”. If discussing his contribution, stay within this exact verified statement: “${project?.contribution}” Do not replace “focused on” or “contributing to” with designed, implemented, built, owned, led, or created.`;
  }
  if (/socconsult/i.test(message)) {
    return 'SOCConsult grounding for this answer: identify it as a group academic consultation system. No individual role for Kris is supplied. Do not attribute team features, technologies, or implementation work personally to Kris. Do not present reserved future AI functionality as operational.';
  }
  return null;
}
