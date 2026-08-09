const asset = (name) => `/assets/${name}`;

export const projects = [
  {
    id: '01', slug: 'thryve', title: 'Thryve', category: 'Wellness Tracking Application', type: 'Group project',
    description: 'An interactive wellness platform that brings workouts, meals, hydration, sleep, goals, and achievements into one organized experience.',
    overview: 'Thryve encourages consistency and self-discipline through progress indicators, daily streaks, achievement rewards, mood tracking, personalized goals, and long-term wellness insights.',
    purpose: 'Health data often lives in separate tools. This project explored how one clear dashboard could make everyday wellness tracking easier to understand and maintain.',
    solution: 'The team designed a connected experience with focused tracking views, visual progress, analytics, reminders, and milestone rewards.',
    stack: ['MongoDB', 'Express', 'Vue.js', 'Node.js'], liveUrl: 'https://thryvefitness.vercel.app/', cover: asset('featureimage.webp'),
    images: [
      { src: asset('dashboard.webp'), title: 'Dashboard', alt: 'Thryve wellness dashboard', description: 'Tracks calories, sleep, water intake, and progress toward daily goals in one organized view.' },
      { src: asset('meal.webp'), title: 'Meal Tracking', alt: 'Thryve meal tracking page', description: 'Manages meals, calories, and protein intake with analytics for reviewing eating patterns.' },
      { src: asset('workout.webp'), title: 'Workout Tracking', alt: 'Thryve workout tracking page', description: 'Records activities, workout duration, and calories burned with progress summaries.' },
      { src: asset('water.webp'), title: 'Hydration', alt: 'Thryve water tracking page', description: 'Uses visual progress, quick-add controls, and logs to encourage hydration consistency.' },
      { src: asset('sleep.webp'), title: 'Sleep', alt: 'Thryve sleep tracking page', description: 'Logs sleep habits, monitors goals, and presents weekly insights and patterns.' },
      { src: asset('achievements.webp'), title: 'Achievements', alt: 'Thryve achievements page', description: 'Rewards completed health and fitness milestones with unlockable badges.' },
    ],
    features: ['Unified wellness dashboard', 'Meal and nutrition tracking', 'Workout activity logs', 'Hydration progress', 'Sleep insights', 'Achievement rewards'],
    learning: 'The project strengthened practical experience building a multi-feature application with the MEVN stack and coordinating related health data across distinct views.',
  },
  {
    id: '02', slug: 'smartcalc', title: 'SmartCalc', category: 'Utility Web Application', type: 'Personal project',
    description: 'A collection of interactive health, finance, time, and everyday calculators with immediate results and a straightforward interface.',
    overview: 'SmartCalc brings commonly needed calculations into one convenient platform, helping users check personal metrics, plan finances, and organize dates without switching between tools.',
    purpose: 'Everyday calculations can be repetitive and scattered across unrelated websites. SmartCalc gathers them into a consistent, approachable experience.',
    solution: 'Calculators are organized into clear categories, use focused inputs, and return immediate results with simple explanations.',
    stack: ['HTML', 'CSS', 'JavaScript'], liveUrl: 'https://smart-calc-kdm.vercel.app/', cover: asset('calc.webp'),
    images: [
      { src: asset('smarthome.webp'), title: 'Calculator Library', alt: 'SmartCalc home page', description: 'A central library for fitness, money, time, and date calculators.' },
      { src: asset('smartfit.webp'), title: 'Fitness Calculators', alt: 'SmartCalc fitness calculators', description: 'Includes BMI, heart rate, waist-to-height ratio, and daily water intake tools.' },
      { src: asset('money.webp'), title: 'Money & Budget', alt: 'SmartCalc money calculators', description: 'Supports tips, discounts, savings goals, and profit or loss calculations.' },
      { src: asset('age.webp'), title: 'Time & Date', alt: 'SmartCalc age calculator', description: 'Covers age, date differences, countdowns, and work-hour calculations.' },
    ],
    features: ['Health and fitness calculators', 'Money and budget tools', 'Age calculator', 'Date difference calculator', 'Countdown calculator', 'Work-hours calculator'],
    learning: 'SmartCalc provided practice in input validation, calculation logic, immediate interface feedback, and organizing many small utilities within one coherent system.',
  },
  {
    id: '03', slug: 'recowebdation', title: 'Recowebdation', category: 'Learning Resource Website', type: 'Personal project',
    description: 'A learning-resource website that helps students and beginners discover approachable coding platforms, tutorials, tools, and guided paths.',
    overview: 'Recowebdation makes technology feel more approachable by curating learning resources and giving beginners clear guidance for learning, practice, projects, debugging, and continued motivation.',
    purpose: 'New learners often struggle to identify reliable starting points among a large number of coding resources.',
    solution: 'The website organizes recommendations with concise descriptions, direct learning links, structured guidance, and an accessible navigation system.',
    stack: ['HTML', 'CSS', 'JavaScript'], liveUrl: 'https://recowebdation.vercel.app/', cover: asset('recowebdation.webp'),
    images: [
      { src: asset('homereco.webp'), title: 'Home', alt: 'Recowebdation home page', description: 'Introduces curated coding resources, project guides, recommendations, and learning paths.' },
      { src: asset('websitereco.webp'), title: 'Websites', alt: 'Recowebdation coding websites page', description: 'Presents free learning websites with concise descriptions and direct access.' },
      { src: asset('aboutreco.webp'), title: 'About', alt: 'Recowebdation about page', description: 'Explains the project’s mission, vision, and values behind its recommendations.' },
      { src: asset('contactreco.webp'), title: 'Contact', alt: 'Recowebdation contact page', description: 'Offers a clear form and contact channels for questions and collaboration.' },
    ],
    features: ['Curated learning platforms', 'Beginner-friendly explanations', 'Structured learning paths', 'Project and tutorial guidance', 'Mission and values', 'Contact experience'],
    learning: 'The project developed skills in content hierarchy, beginner-focused UX, accessible navigation, and presenting recommendations clearly.',
  },
  {
    id: '04', slug: 'attheblanc', title: 'AtTheBlanc', category: 'Café Website Concept', type: 'Practice project — not commissioned',
    description: 'A practice café website concept created to explore brand storytelling, menus, community initiatives, events, and a welcoming online presence.',
    overview: 'AtTheBlanc simulates a functional café platform where visitors can explore the café’s story, atmosphere, featured offerings, events, and community-focused content. It was built only for learning and was not sold to or commissioned by the business.',
    purpose: 'The goal was to practice translating a physical café atmosphere into a polished, responsive digital experience.',
    solution: 'A visually led site combines café storytelling, featured drinks, imagery, video content, useful FAQs, and clear navigation.',
    stack: ['HTML', 'CSS', 'JavaScript'], liveUrl: 'https://attheblanc.vercel.app/', cover: asset('attheblanc.webp'),
    images: [
      { src: asset('athome.webp'), title: 'Home', alt: 'AtTheBlanc home page', description: 'Introduces the café’s atmosphere, coffee, pastries, and visitor information through an FAQ.' },
      { src: asset('atfeat.webp'), title: 'Features', alt: 'AtTheBlanc features page', description: 'Uses a photo collage, featured drinks, and video reels to communicate the café experience.' },
      { src: asset('atabout.webp'), title: 'About', alt: 'AtTheBlanc about page', description: 'Presents the café concept, its story, community character, and the values behind the experience.' },
    ],
    features: ['Café story and atmosphere', 'Featured drinks', 'Photo-led experience', 'Video reels', 'Visitor FAQs', 'Responsive presentation'],
    learning: 'This concept project focused on visual storytelling, responsive layout, interactive presentation, and creating a believable hospitality experience without implying a client relationship.',
  },
  {
    id: '05', slug: 'qzone', title: 'Q-Zone', category: 'Auto Detailing Website Concept', type: 'Group practice project',
    description: 'A group-built practice website for an auto detailing business, presenting services, pricing, appointments, company information, and team content.',
    overview: 'Q-Zone demonstrates how an auto-detailing business can clearly present services, promotions, company values, branches, and contact options online. It was a learning exercise rather than a commercial client project.',
    purpose: 'The project explored how a service business can make complex packages and company information easy for customers to browse.',
    solution: 'The experience uses structured service tiers, a clear booking journey, business storytelling, team profiles, FAQs, and project showcases.',
    stack: ['Angular', 'TypeScript', 'JavaScript', 'PHP'], liveUrl: 'https://qzoneph.netlify.app/', cover: asset('qzone.webp'),
    images: [
      { src: asset('homeq.webp'), title: 'Home', alt: 'Q-Zone home page', description: 'Introduces detailing, paint protection, coatings, the service process, recent projects, testimonials, and FAQs.' },
      { src: asset('aboutq.webp'), title: 'About', alt: 'Q-Zone about page', description: 'Shares the company overview, mission, vision, origin story, values, achievements, and branches.' },
      { src: asset('servicesq.webp'), title: 'Services', alt: 'Q-Zone services page', description: 'Explains service packages, pricing, inclusions, coatings, restoration, and protection options.' },
      { src: asset('employeq.webp'), title: 'Team', alt: 'Q-Zone employees page', description: 'Introduces the founder and team roles while highlighting craftsmanship, teamwork, and professionalism.' },
    ],
    features: ['Service packages and pricing', 'Appointment journey', 'Mission and vision', 'Company story', 'Team presentation', 'Promotions and branches'],
    learning: 'The group project provided experience organizing a service-heavy business website and combining a modern Angular interface with PHP-based functionality.',
  },
];

export const featuredProjects = projects.slice(0, 3);
export const getProject = (slug) => projects.find((project) => project.slug === slug);
