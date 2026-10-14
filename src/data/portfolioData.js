/**
 * Centralized Portfolio Data
 * Central single-source-of-truth configuration separating content from UI components.
 */

export const profileData = {
  name: 'Rayy',
  logoText: 'RAYY.DEV',
  role: 'Backend Developer',
  tagline: 'Building reliable digital experiences.',
  heroEyebrow: 'BACKEND DEVELOPER',
  heroGreeting: 'Hi, I’m',
  heroDescription:
    'I build web applications with a focus on backend systems, APIs, and structured databases.',
  aboutTitle: 'ABOUT ME',
  aboutDescription:
    "I'm a developer interested in building useful web applications, designing reliable backend logic, and organizing data into maintainable systems. I enjoy learning through practical projects and solving problems step by step.",
  aboutFocusList: [
    'Backend application development.',
    'Relational database design.',
    'Clean, maintainable code.',
  ],

  // CTA Section content matching visual reference
  ctaHeading: 'HAVE A PROJECT IN MIND? LET’S BUILD SOMETHING GREAT TOGETHER.',
  ctaDescription:
    'Available for backend systems architecture, RESTful API development, and database engineering collaborations.',

  // Contact section headings
  contactHeading: 'LET’S WORK TOGETHER',
  contactSubheading: 'Get In Touch',
  contactDescription:
    'Feel free to connect for technical discussions, backend development inquiries, or potential project collaborations.',

  // Contact & Social channels (configured with clear placeholders until replaced with real data)
  email: 'your-email@example.com',
  githubUrl: 'https://github.com/your-username',
  linkedinUrl: 'https://linkedin.com/in/your-username',
}

/**
 * Validation helpers to strictly prevent rendering fake/placeholder links as active targets.
 */
export const isRealEmail = (email) =>
  Boolean(
    email &&
      !email.includes('example.com') &&
      !email.includes('your-email') &&
      email.includes('@')
  )

export const isRealUrl = (url) =>
  Boolean(
    url &&
      !url.includes('your-username') &&
      !url.includes('example.com') &&
      url.startsWith('http')
  )

export const navLinks = [
  { id: 'home', label: 'HOME', href: '#home' },
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'skills', label: 'SKILLS', href: '#skills' },
  { id: 'projects', label: 'PROJECTS', href: '#projects' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
]

export const servicesData = [
  {
    id: 'backend-dev',
    title: 'BACKEND DEVELOPMENT',
    description:
      'Building maintainable server-side applications with clear business logic and reliable request handling.',
    iconName: 'Server',
  },
  {
    id: 'api-dev',
    title: 'API DEVELOPMENT',
    description:
      'Designing structured API endpoints with consistent responses, validation, and appropriate access control.',
    iconName: 'Cpu',
  },
  {
    id: 'database-design',
    title: 'DATABASE DESIGN',
    description:
      'Organizing relational data with thoughtful schemas, constraints, and practical query design.',
    iconName: 'Database',
  },
]
