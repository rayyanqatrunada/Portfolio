/**
 * Technical Skills Data
 * Categorized technical capabilities focused on backend engineering,
 * database modeling, API development, workflow tools, and frontend basics.
 * Pure factual inventory without arbitrary percentage or qualitative ratings.
 */

export const skillCategories = [
  {
    id: 'backend',
    category: 'Backend Development',
    summary: 'Application logic, MVC architecture, and request lifecycle management.',
    skills: [
      'PHP',
      'Laravel',
      'Eloquent ORM',
      'RESTful APIs',
      'Middleware & Auth',
      'Livewire',
    ],
  },
  {
    id: 'database',
    category: 'Database & Storage',
    summary: 'Relational schema design, normalization, and data consistency.',
    skills: [
      'MySQL',
      'SQL Queries & Joins',
      'Relational Schemas (3NF)',
      'Foreign Keys & Constraints',
      'Indexing Basics',
    ],
  },
  {
    id: 'tools',
    category: 'Tools & Workflow',
    summary: 'Version control, developer workspace, and terminal environments.',
    skills: [
      'Git',
      'GitHub',
      'Linux CLI',
      'VS Code',
      'Vite',
    ],
  },
  {
    id: 'frontend',
    category: 'Frontend Fundamentals',
    summary: 'Client views, responsive styling, and basic component interfaces.',
    skills: [
      'Blade Templates',
      'Tailwind CSS',
      'JavaScript (ES6+)',
      'HTML5 / Semantic HTML',
      'React Fundamentals',
    ],
  },
]

/**
 * Currently Exploring
 * Technical concepts and technologies actively being studied
 * to deepen backend architecture capabilities.
 */
export const currentlyExploring = [
  {
    id: 'token-auth',
    topic: 'API Token Authentication (Sanctum / JWT)',
    category: 'Backend Security',
    context: 'Stateless bearer tokens for decoupled clients and mobile APIs.',
  },
  {
    id: 'payment-webhooks',
    topic: 'Payment Gateway Webhooks',
    category: 'Transaction Architecture',
    context: 'Idempotent webhook payload verification and state reconciliation.',
  },
  {
    id: 'clean-architecture',
    topic: 'Clean Architecture & Repositories',
    category: 'System Design',
    context: 'Decoupled domain business logic and repository pattern contracts.',
  },
]

/**
 * Editorial Technical Skills List
 * Matching the exact two-column table design from Signal-A & Figma spec:
 * - Left: Bold Sans-Serif Title (Skill / Technology name)
 * - Right: Monospace Uppercase Metadata (Scope / Core capabilities)
 * Refined to 10 authentic, applied skills focused on Laravel backend development.
 */
export const technicalSkillsList = [
  {
    id: 'php',
    name: 'PHP',
    detail: 'OOP · BACKEND',
    category: 'Backend programming language',
    status: 'applied',
  },
  {
    id: 'laravel',
    name: 'LARAVEL',
    detail: 'MVC · ELOQUENT',
    category: 'Backend web development',
    status: 'applied',
  },
  {
    id: 'mysql',
    name: 'MYSQL',
    detail: 'SQL · SCHEMAS',
    category: 'Relational database',
    status: 'applied',
  },
  {
    id: 'rest-apis',
    name: 'REST APIS',
    detail: 'JSON · ENDPOINTS',
    category: 'API development',
    status: 'applied',
  },
  {
    id: 'database-design',
    name: 'DATABASE DESIGN',
    detail: '3NF · NORMALIZATION',
    category: 'Data modeling',
    status: 'applied',
  },
  {
    id: 'auth',
    name: 'AUTH & RBAC',
    detail: 'ROLES · POLICIES',
    category: 'User access and security',
    status: 'applied',
  },
  {
    id: 'git-github',
    name: 'GIT & GITHUB',
    detail: 'VERSION CONTROL',
    category: 'Version control',
    status: 'applied',
  },
  {
    id: 'blade-tailwind',
    name: 'BLADE & TAILWIND',
    detail: 'UI · RESPONSIVE',
    category: 'Frontend for Laravel applications',
    status: 'applied',
  },
  {
    id: 'livewire',
    name: 'LIVEWIRE',
    detail: 'COMPONENTS · STATE',
    category: 'Reactive Laravel interfaces',
    status: 'applied',
  },
  {
    id: 'linux-cli',
    name: 'LINUX & CLI',
    detail: 'BASH / SHELL',
    category: 'Development environment',
    status: 'applied',
  },
]
