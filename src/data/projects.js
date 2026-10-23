import compifyImg from '../assets/Project Image/Compify 3_4.jpg'
import tsmPortalImg from '../assets/Project Image/TSM 3_4.jpg'
import pmartImg from '../assets/Project Image/PMART 3_4.jpg'
import studyImg from '../assets/Project Image/Study 3_4.jpg'
import { projectDetailsData } from './projectDetails'

/**
 * Projects Portfolio Data
 * Centralized data source for featured projects.
 * Link policy: If URL is null, no dead link or fake href="#" is rendered.
 */
export const projectsData = [
  {
    id: 'compify',
    title: 'Compify — Computer Hardware Store',
    displayTitle: 'Compify',
    category: 'E-Commerce Platform',
    role: 'Backend Developer',
    description:
      'Computer hardware e-commerce platform with catalog management, relational brand/category schemas, and customer ordering.',
    techStack: ['PHP', 'Laravel', 'MySQL', 'Livewire'],
    image: compifyImg,
    imageAlt: 'Compify Computer Hardware E-Commerce backend architecture overview',
    liveUrl: null,
    repoUrl: 'https://github.com/rayyanqatrunada/Compify',
    status: 'In Active Development',
    featured: true,
    deepDive: projectDetailsData['compify'],
  },
  {
    id: 'tsm-portal',
    title: 'TSM Department Portal',
    displayTitle: 'TSM Portal',
    category: 'Institutional Portal & CMS',
    role: 'Backend Developer',
    description:
      'Department CMS portal featuring role-based access control (RBAC), structured article publishing, and normalized database schemas.',
    techStack: ['PHP', 'Laravel', 'MySQL', 'Filament'],
    image: tsmPortalImg,
    imageAlt: 'TSM Department Portal CMS management dashboard schematic',
    liveUrl: null,
    repoUrl: 'https://github.com/rayyanqatrunada/toweb',
    status: 'Internal Deployment',
    featured: true,
    deepDive: projectDetailsData['tsm-portal'],
  },
  {
    id: 'pmart',
    title: 'PMart — Student Commerce Marketplace',
    displayTitle: 'PMart',
    category: 'Campus Commerce System',
    role: 'Backend Developer',
    description:
      'Student commerce marketplace engine managing merchant booth requests, transaction records, and structured product catalogs.',
    techStack: ['PHP', 'Laravel', 'MySQL', 'Filament'],
    image: pmartImg,
    imageAlt: 'PMart student commerce transaction processing overview',
    liveUrl: null,
    repoUrl: 'https://github.com/rayyanqatrunada/PMart-test',
    status: 'Institutional Project',
    featured: true,
    deepDive: projectDetailsData['pmart'],
  },
  {
    id: 'study',
    title: 'Study — Knowledge Base & Code Laboratory',
    displayTitle: 'STUDY',
    category: 'Learning & Code Archive',
    role: 'Independent Researcher',
    description:
      'Personal learning repository and code laboratory documenting continuous explorations across Python, algorithms, data structures, and modern web architectures.',
    techStack: ['Python', 'HTML/CSS', 'Algorithms', 'Git'],
    image: studyImg,
    imageAlt: 'Study knowledge base and code experiment archive schematic',
    liveUrl: null,
    repoUrl: 'https://github.com/rayyanqatrunada/Study',
    status: 'Continuous Learning Archive',
    featured: true,
    deepDive: projectDetailsData['study'],
  },
]
