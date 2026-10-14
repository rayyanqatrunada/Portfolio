/**
 * Technical Skills Data
 * Categorized technical capabilities focused on backend development, databases, frontend basics, and tooling.
 */

export const skillCategories = [
  {
    id: 'backend',
    category: 'Backend Development',
    iconName: 'Server',
    description: 'Core business logic, MVC frameworks, and API endpoints.',
    skills: [
      { name: 'PHP', level: 'Core' },
      { name: 'Laravel', level: 'Framework' },
      { name: 'RESTful API', level: 'Architecture' },
      { name: 'Authentication', level: 'Security' },
    ],
  },
  {
    id: 'database',
    category: 'Database & Storage',
    iconName: 'Database',
    description: 'Relational data structures, query design, and constraints.',
    skills: [
      { name: 'MySQL', level: 'RDBMS' },
      { name: 'SQL Queries', level: 'Data Querying' },
      { name: 'Relational Schema', level: 'Data Modeling' },
      { name: 'Database Normalization', level: 'Integrity' },
    ],
  },
  {
    id: 'frontend',
    category: 'Frontend Basics',
    iconName: 'Layout',
    description: 'UI integration, responsive templating, and asynchronous requests.',
    skills: [
      { name: 'HTML5 / CSS3', level: 'Markup & Styling' },
      { name: 'JavaScript (ES6+)', level: 'Client Scripting' },
      { name: 'Tailwind CSS', level: 'Utility Styling' },
      { name: 'React', level: 'Component UI' },
    ],
  },
  {
    id: 'tools',
    category: 'Tools & Workflow',
    iconName: 'Terminal',
    description: 'Version control, developer environment, and build pipelines.',
    skills: [
      { name: 'Git', level: 'Version Control' },
      { name: 'GitHub', level: 'Collaboration' },
      { name: 'VS Code', level: 'Development IDE' },
      { name: 'Postman / Bruno', level: 'API Testing' },
    ],
  },
]
