import compifyImg from '../assets/Project Image/Compify 3_4.jpg'
import tsmPortalImg from '../assets/Project Image/TSM 3_4.jpg'
import lyricWidgetImg from '../assets/Project Image/Lyric Widget 3_4.jpg'
import pmartImg from '../assets/Project Image/PMART 3_4.jpg'
import studyImg from '../assets/Project Image/Study 3_4.jpg'
import compify11Img from '../assets/Project Image/1_1 compify.jpg'
import tsmPortal11Img from '../assets/Project Image/1_1 tsm.jpg'
import lyricWidget11Img from '../assets/Project Image/1_1 lyric widget.jpg'
import pmart11Img from '../assets/Project Image/1_1 pmart.jpg'
import study11Img from '../assets/Project Image/1_1 study.jpg'
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
    squareImage: compify11Img,
    imageAlt: 'Compify Computer Hardware E-Commerce backend architecture overview',
    liveUrl: null,
    repoUrl: 'https://github.com/rayyanqatrunada/Compify',
    status: 'In Active Development',
    featured: true,
    titleFontClass:
      'font-serif font-light italic tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[96px]',
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
    squareImage: tsmPortal11Img,
    imageAlt: 'TSM Department Portal CMS management dashboard schematic',
    liveUrl: null,
    repoUrl: 'https://github.com/rayyanqatrunada/toweb',
    status: 'Internal Deployment',
    featured: true,
    titleFontClass:
      'font-mono font-light uppercase tracking-wide text-3xl sm:text-4xl md:text-5xl lg:text-[62px] xl:text-[70px]',
    deepDive: projectDetailsData['tsm-portal'],
  },
  {
    id: 'lyric-widget',
    title: 'Lyric Widget — Desktop Audio-Synced Lyrics Overlay',
    displayTitle: 'Lyric Widget',
    category: 'Desktop App & System Integration',
    role: 'Systems & Core Developer',
    description:
      'Native sub-25MB RAM synchronized lyrics overlay for Linux & KDE Plasma 6 with MPRIS 2.0 integration and zero-downtime 3-tier fallback architecture.',
    techStack: ['QML / Qt 6', 'Kirigami', 'D-Bus MPRIS', 'Python'],
    image: lyricWidgetImg,
    squareImage: lyricWidget11Img,
    imageAlt: 'Lyric Widget desktop synced lyrics overlay for Linux and KDE Plasma 6',
    liveUrl: null,
    repoUrl: 'https://github.com/rayyanqatrunada/Lyric-widget',
    status: 'Active Open Source',
    featured: true,
    titleFontClass:
      'font-metal font-normal tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[92px]',
    mobileTitleFontClass: 'font-metal text-[17px] sm:text-[19px] tracking-normal font-normal',
    deepDive: projectDetailsData['lyric-widget'],
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
    squareImage: pmart11Img,
    imageAlt: 'PMart student commerce transaction processing overview',
    liveUrl: null,
    repoUrl: 'https://github.com/rayyanqatrunada/PMart-test',
    status: 'Institutional Project',
    featured: true,
    titleFontClass:
      'font-serif uppercase tracking-normal font-normal text-4xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[96px]',
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
    squareImage: study11Img,
    imageAlt: 'Study knowledge base and code experiment archive schematic',
    liveUrl: null,
    repoUrl: 'https://github.com/rayyanqatrunada/Study',
    status: 'Continuous Learning Archive',
    featured: true,
    titleFontClass:
      'font-sans font-black uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-[66px] xl:text-[74px]',
    deepDive: projectDetailsData['study'],
  },
]
