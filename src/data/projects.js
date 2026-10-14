import compifyImg from '../assets/projects/compify.svg'
import tsmPortalImg from '../assets/projects/tsm-portal.svg'
import pmartImg from '../assets/projects/pmart.svg'
import inventoryApiImg from '../assets/projects/inventory-api.svg'

/**
 * Projects Portfolio Data
 * Centralized data source for featured projects.
 * Link policy: If URL is null, no dead link or fake href="#" is rendered.
 */
export const projectsData = [
  {
    id: 'compify',
    title: 'Compify — Computer Hardware Store',
    category: 'E-Commerce Platform',
    role: 'Backend Developer',
    description:
      'E-commerce system focusing on product catalog management, category and brand relationships, inventory tracking, and authenticated customer ordering.',
    techStack: ['PHP', 'Laravel', 'MySQL', 'Blade', 'Tailwind CSS'],
    image: compifyImg,
    imageAlt: 'Compify Computer Hardware E-Commerce backend architecture overview',
    liveUrl: null, // Replace with valid URL when available
    repoUrl: null, // Replace with public GitHub URL when published
    status: 'In Active Development',
    featured: true,
  },
  {
    id: 'tsm-portal',
    title: 'TSM Department Portal',
    category: 'Institutional Portal & CMS',
    role: 'Backend Developer',
    description:
      'Content management portal for the Motorcycle Engineering department, featuring role-based access control (RBAC), structured article publishing, and normalized database schemas.',
    techStack: ['PHP', 'Laravel', 'MySQL', 'REST API'],
    image: tsmPortalImg,
    imageAlt: 'TSM Department Portal CMS management dashboard schematic',
    liveUrl: null,
    repoUrl: null,
    status: 'Internal Deployment',
    featured: true,
  },
  {
    id: 'pmart',
    title: 'PMart — Student Commerce Marketplace',
    category: 'Campus Commerce System',
    role: 'Backend Developer',
    description:
      'Marketplace engine supporting student merchant booths, order request dispatching, transaction recording, and structured merchant catalog management.',
    techStack: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
    image: pmartImg,
    imageAlt: 'PMart student commerce transaction processing overview',
    liveUrl: null,
    repoUrl: null,
    status: 'Institutional Project',
    featured: true,
  },
  {
    id: 'inventory-api-gateway',
    title: 'RESTful Inventory & Order Service',
    category: 'API Service & Architecture',
    role: 'Backend Developer',
    description:
      'Modular backend RESTful API service providing structured endpoints, request rate limiting, payload validation, and predictable JSON response structures.',
    techStack: ['PHP', 'REST API', 'MySQL', 'JSON'],
    image: inventoryApiImg,
    imageAlt: 'RESTful API gateway architecture and endpoint viewer',
    liveUrl: null,
    repoUrl: null,
    status: 'Core Service Boilerplate',
    featured: true,
  },
]
