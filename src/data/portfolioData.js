/**
 * Centralized Portfolio Data (Signal-A Editorial Foundation)
 * Factual, verified single-source-of-truth configuration.
 */

export const profileData = {
  name: 'Rayy',
  fullName: 'Rayyan Qatrunada',
  formalFullName: 'Rayyan Qatrunada Qhoniansyah Putra',
  logoText: 'RAYY.DEV',
  role: 'Backend & Systems Developer',
  location: 'Jepara, Indonesia [GMT+7]',
  availability: 'Available for Backend Projects & Systems Architecture',

  // Hero fields
  heroEyebrow: '00 / PURPOSE & ARCHITECTURE',
  heroGreeting: 'Hi, I’m',
  tagline: 'Building reliable digital experiences.',
  heroDescription:
    'Focused on backend application development, relational database modeling, and dependable RESTful APIs with PHP, Laravel, and MySQL.',

  // Large editorial statement (Phase 4A)
  engineeringStatement:
    'STRUCTURED SYSTEMS. CLEAR DATA. THOUGHTFUL SOFTWARE.',
  engineeringStatementNote:
    'PERSISTENCE · SCHEMA INTEGRITY · PREDICTABLE CONTRACTS',

  // About narrative and three focus points (Phase 4B)
  aboutTitle: 'ABOUT ME',
  aboutDescription:
    "I'm a developer interested in building useful web applications, designing reliable backend logic, and organizing data into maintainable systems. I approach development through practical implementation, defensive error handling, and systematic problem solving.",
  aboutFocusList: [
    'Backend application development.',
    'Relational database design.',
    'Clean, maintainable code.',
  ],
  aboutPrinciples: [
    {
      index: '01',
      title: 'APPLICATION DEVELOPMENT',
      description: 'Structured request lifecycles, clear service boundaries, and state management using PHP and the Laravel ecosystem.',
    },
    {
      index: '02',
      title: 'RELATIONAL DATA',
      description: 'Normalized MySQL schemas (3NF), foreign key cascades, atomic transactions, and indexed query paths.',
    },
    {
      index: '03',
      title: 'MAINTAINABLE WORKFLOWS',
      description: 'Predictable RESTful API contracts, defensive input validation, clean codebases, and disciplined Git version control.',
    },
  ],

  // Engineering approach principles (Phase 4D)
  approachPrinciples: [
    {
      index: '01',
      title: 'STRUCTURE & SEPARATION',
      subtitle: 'Modular Architecture',
      description:
        'Controllers remain thin HTTP coordinators while domain rules reside in cohesive service classes or repositories, keeping logic decoupled and maintainable.',
      tags: ['MVC Architecture', 'Service Layer', 'Eloquent ORM', 'Separation of Concerns'],
    },
    {
      index: '02',
      title: 'RELATIONAL DATA INTEGRITY',
      subtitle: 'Schema-First Discipline',
      description:
        'Data models are designed in 3rd Normal Form with explicit foreign key constraints, composite indexing for frequent lookup paths, and transactional rollbacks to prevent orphaned state.',
      tags: ['MySQL 8.0', 'Foreign Keys', 'ACID Transactions', '3NF Normalization'],
    },
    {
      index: '03',
      title: 'PREDICTABLE INTERFACES',
      subtitle: 'Defensive Execution',
      description:
        'All client input is validated at the perimeter via dedicated form request objects before execution touches core business services, emitting consistent JSON response envelopes and HTTP status codes.',
      tags: ['Form Requests', 'Strict Validation', 'JSON Envelopes', 'HTTP Standards'],
    },
  ],

  // Contact section
  ctaHeading: 'HAVE A PROJECT IN MIND? LET’S BUILD SOMETHING GREAT TOGETHER.',
  ctaDescription:
    'Available for backend systems architecture, RESTful API development, and database engineering collaborations.',
  contactHeading: 'LET’S WORK TOGETHER',
  contactSubheading: 'Get In Touch',
  contactDescription:
    'Feel free to connect for technical discussions, backend development inquiries, or potential project collaborations.',

  // Direct verified channels
  email: 'rayyanqatrunada3@gmail.com',
  githubUrl: 'https://github.com/rayyanqatrunada',
  linkedinUrl: null,
  resumeUrl: null,
}

/**
 * Validation helpers
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

export const isRealResume = (url) =>
  Boolean(
    url &&
      typeof url === 'string' &&
      url.trim().length > 0 &&
      !url.includes('example') &&
      url.endsWith('.pdf')
  )

/**
 * Editorial navigation links:
 * - Projects, About, Skills, Approach, Contact
 */
export const navLinks = [
  { id: 'projects', label: 'PROJECTS', href: '#projects', index: '01' },
  { id: 'home', label: 'ABOUT', href: '#home', index: '02' },
  { id: 'statement', label: 'PHILOSOPHY', href: '#statement', index: '03' },
  { id: 'skills', label: 'SKILLS', href: '#skills', index: '04' },
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
