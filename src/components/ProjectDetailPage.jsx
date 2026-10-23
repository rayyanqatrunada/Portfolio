import { useEffect } from 'react'
import Container from './Container'
import SignalArrow from './SignalArrow'
import compify11Img from '../assets/Project Image/1_1 compify.jpg'
import tsm11Img from '../assets/Project Image/1_1 tsm.jpg'
import pmart11Img from '../assets/Project Image/1_1 pmart.jpg'
import study11Img from '../assets/Project Image/1_1 study.jpg'

const PROJECT_1_1_IMAGES = {
  compify: compify11Img,
  'tsm-portal': tsm11Img,
  pmart: pmart11Img,
  study: study11Img,
}

/**
 * Editorial Case Study Content for Compify
 * - Direct adaptation of the user's reference image layout and typography.
 * - Uses the exact same font as the main page: Inter (font-sans).
 * - Exact 3-column Swiss architecture grid:
 *   Column 1: Photo, Title sitting on baseline divider.
 *   Column 2: Visual balance whitespace.
 *   Column 3: Project scope at top, about paragraph above baseline divider.
 *   Middle: 01 / PROJECT OBJECTIVE & 02 / CORE FUNCTION.
 *   Bottom: SERVICES label & Columns A, B, C with solid black row dividers and right-aligned labels.
 */
const COMPIFY_DATA = {
  title: 'COMPIFY',
  scopeLabels: [
    'SCHOOL PROJECT',
    'ART DIRECTION',
    'WEB DESIGN',
  ],
  compifyScopeLabels: [
    'HARDWARE E-COMMERCE',
    'BACKEND ARCHITECTURE',
    'LIVEWIRE & VOLT',
  ],
  about:
    'Compify is a hardware-focused e-commerce platform designed to bring product discovery, purchasing, and store operations into one cohesive experience. Built around the needs of computer enthusiasts and everyday buyers, it combines a structured product catalog with flexible checkout options and centralized store management.',
  objective:
    'The goal was to create a more organized and reliable way to shop for computer hardware. Compify addresses the complexity of browsing technical products, comparing prices, and managing purchases through a unified storefront designed to make the buying process clearer and more convenient.',
  coreFunction:
    'The platform connects product discovery, smart cart management, promotional pricing, shipping, and payment into a single workflow. A dedicated admin panel supports catalog management, order processing, inventory control, and storefront customization, bringing essential e-commerce operations into one place.',
  technology: [
    'LARAVEL 12',
    'LIVEWIRE & VOLT',
    'PHP',
    'MYSQL & ELOQUENT ORM',
    'TAILWIND CSS V4',
    'VITE',
    'MIDTRANS PAYMENT API',
    'RAJAONGKIR SHIPPING API',
    'FONNTE WHATSAPP API',
  ],
  artDirection: [
    'PRECISION TECH MINIMALISM',
    'MONOCHROME PALETTE',
    'MANROPE TYPOGRAPHY',
    'PRODUCT-FIRST HIERARCHY',
    'MODULAR STOREFRONT',
    'STRUCTURED PRODUCT CARDS',
    'SUBTLE BORDERS & SHADOWS',
    'RESPONSIVE LAYOUTS',
    'CONSISTENT ADMIN INTERFACE',
  ],
  productResearch: [
    'HARDWARE PRODUCT DISCOVERY',
    'CATEGORY & BRAND NAVIGATION',
    'PRICE COMPARISON',
    'PROMOTIONAL MECHANICS',
    'CART & WISHLIST FLOWS',
    'CHECKOUT EXPERIENCE',
    'PAYMENT & SHIPPING OPTIONS',
    'INVENTORY CONSISTENCY',
    'ADMIN WORKFLOW EFFICIENCY',
  ],
}

/**
 * Fallback generator for other projects
 */
function getProjectCaseStudyData(project) {
  if (project.id === 'compify') {
    return {
      ...COMPIFY_DATA,
      image: project.squareImage || PROJECT_1_1_IMAGES['compify'],
      repoUrl: project.repoUrl,
    }
  }

  if (project.id === 'study') {
    return {
      title: 'STUDY',
      scopeLabels: [
        'KNOWLEDGE ARCHIVE',
        'PYTHON & ALGORITHMS',
        'WEB FUNDAMENTALS',
      ],
      about:
        'Study is a curated personal learning repository and code laboratory documenting hands-on implementations, language syntax deep-dives (Python, HTML/CSS), and algorithmic problem-solving exercises.',
      objective:
        'To establish a disciplined, centralized archive of technical knowledge, code experiments, and algorithmic challenges as an ongoing reference for building reliable production systems.',
      coreFunction:
        'Structured modular directories covering Python programming, semantic web development, algorithmic data structures, and continuous engineering notes with direct version control via GitHub.',
      technology: [
        'PYTHON 3.X',
        'DATA STRUCTURES',
        'ALGORITHMS & BIG-O',
        'HTML5 & MODERN CSS',
        'JAVASCRIPT (ES6+)',
        'OBJECT-ORIENTED DESIGN',
        'GIT VERSION CONTROL',
        'PROBLEM SOLVING',
        'TECHNICAL DOCUMENTATION',
      ],
      artDirection: [
        'PRECISION TECH MINIMALISM',
        'MONOCHROME PALETTE',
        'STRUCTURED CODE BLOCKS',
        'SWISS RULED TABLES',
        'ALGORITHM DIAGRAMS',
        'MODULAR HIERARCHY',
        'SUBTLE BORDERS & SHADOWS',
        'RESPONSIVE LAYOUTS',
        'STREAMLINED REPO VIEWS',
      ],
      productResearch: [
        'CONTINUOUS LEARNING DISCIPLINE',
        'TIME & SPACE COMPLEXITY',
        'PYTHON SYNTAX EXPLORATION',
        'DATA STRUCTURE BENCHMARKS',
        'WEB SEMANTICS VALIDATION',
        'CLEAN CODE CONVENTIONS',
        'PROBLEM-SOLVING PATTERNS',
        'OPEN-SOURCE SHARING',
        'ENGINEERING MASTERY',
      ],
      image: project.squareImage || PROJECT_1_1_IMAGES['study'],
      repoUrl: project.repoUrl,
    }
  }

  return {
    title: (project.displayTitle || project.title).toUpperCase(),
    scopeLabels: [
      project.category?.toUpperCase() || 'BACKEND SYSTEM',
      project.role?.toUpperCase() || 'SOFTWARE ARCHITECTURE',
      'PHP & LARAVEL',
    ],
    about: project.description || project.deepDive?.overview || '',
    objective:
      project.deepDive?.problemStatement ||
      'Developing structured, predictable backend services and database schemas to solve operational fragmentation and performance bottlenecks.',
    coreFunction:
      project.deepDive?.overview ||
      'Engineered with relational data integrity, clean service boundaries, and robust API endpoints for verified deployment environments.',
    technology:
      project.deepDive?.verifiedStack?.map((s) => s.name.toUpperCase()) || [
        'PHP 8.2+',
        'LARAVEL 11',
        'MYSQL 8.0',
        'RESTFUL APIS',
        'ELOQUENT ORM',
        'FILAMENT ADMIN',
        'TAILWIND CSS',
        'VITE COMPILER',
        'DOCKER RUNTIME',
      ],
    artDirection: [
      'PRECISION TECH MINIMALISM',
      'MONOCHROME PALETTE',
      'HIGH CONTRAST HIERARCHY',
      'SWISS RULED TABLES',
      'PRODUCT-FIRST HIERARCHY',
      'MODULAR ARCHITECTURE',
      'SUBTLE BORDERS & SHADOWS',
      'RESPONSIVE LAYOUTS',
      'STREAMLINED DATA VIEWS',
    ],
    productResearch: [
      'SYSTEM WORKFLOW EFFICIENCY',
      'SCHEMA INTEGRITY VERIFICATION',
      'DATA QUERY OPTIMIZATION',
      'ROLE ACCESS BOUNDARIES',
      'MUTATION AUDITING',
      'EXCEPTION RECOVERY FLOWS',
      'INDEXATION PERFORMANCE',
      'INVENTORY CONSISTENCY',
      'MAINTAINABILITY BENCHMARKS',
    ],
    image: project.squareImage || PROJECT_1_1_IMAGES[project.id] || project.image,
    repoUrl: project.repoUrl,
  }
}

/**
/**
 * Ruled service column (A / B / C)
 * Figma: letter (mono 12px/300) → gap 19.9px → title (17px/400) → gap 19.9px
 * → 9 rows × 55px, each with a 0.73px black top border and right-aligned mono 12px/300 label.
 */
/**
 * Ruled service column (A / B / C)
 * Points (letter & title) made bold, row items made light per user request.
 */
function ServiceColumn({ letter, title, items }) {
  return (
    <div className="flex flex-col gap-[19.9px]">
      <span className="font-sans font-bold text-[14px] leading-[14px] uppercase text-black">
        {letter}
      </span>
      <h3 className="font-sans font-bold text-[17px] leading-[17px] uppercase tracking-tight text-black">
        {title}
      </h3>
      <ul>
        {items.map((item) => (
          <li
            key={item}
            className="h-[55px] flex items-center justify-end border-t-[0.73px] border-black font-mono font-light text-[12px] leading-[12px] uppercase text-neutral-600 hover:text-black transition-colors text-right"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Dedicated Project Detail Page
 * - Opens with the portfolio's global Navbar & Footer.
 * - Layout mapped 1:1 from the Figma frame (1384px wide, 40px side margins,
 *   three 421px columns with ~20px gutters).
 * - Middle paragraphs are asymmetrically staggered: left-top and right-bottom.
 * - Services points are bold, row items are light.
 */
export default function ProjectDetailPage({ project, onBack }) {
  const caseStudy = getProjectCaseStudyData(project)

  // Scroll to top and support Escape key navigation
  useEffect(() => {
    window.scrollTo(0, 0)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onBack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onBack])

  return (
    <article className="bg-white text-black font-sans selection:bg-black selection:text-white pb-[91px]">
      <Container>
        {/* Discreet return control inside the 91px top margin (under sticky navbar) */}
        <div className="h-[70px] sm:h-[91px] flex items-center">
          <button
            type="button"
            onClick={onBack}
            className="font-mono font-light text-[12px] leading-[12px] uppercase text-neutral-400 hover:text-black transition-colors cursor-pointer"
            aria-label="Return to portfolio"
          >
            ← Back
          </button>
        </div>

        {/* ================= TOP: image · empty · scope + about ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10">
          {/* Image — 1:1 Square Visual Spec matching Figma 423 × 423 */}
          <div className="w-full aspect-square overflow-hidden bg-white flex items-center justify-center border border-black/10">
            <img
              src={caseStudy.image}
              alt={`${caseStudy.title} visual`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="hidden md:block" aria-hidden="true" />

          {/* Scope (top, at y=97) & About paragraph (bottom, ends ~y=520) */}
          <div className="flex flex-col justify-between pt-[6px] gap-16">
            <div className="flex justify-between items-start text-[15px] leading-[20px] tracking-[0.5px] font-normal uppercase">
              <span>Project Scope</span>
              <div className="text-right">
                {caseStudy.scopeLabels.map((label) => (
                  <p key={label}>{label}</p>
                ))}
              </div>
            </div>

            <p className="text-[15px] leading-[19.5px] tracking-[0.5px] font-light indent-[70px] -mb-[6px]">
              {caseStudy.about}
            </p>
          </div>
        </div>

        {/* Title (y=527, 20px/300) + full-width hairline (y=547) */}
        <div className="mt-[13px]">
          <h1 className="font-sans font-light text-[20px] leading-[12px] uppercase text-black">
            {caseStudy.title}
          </h1>
          <div className="mt-[8px] w-full border-t border-black" />
        </div>

        {/* ================= MIDDLE: Asymmetric Staggered (Kiri Atas & Kanan Bawah) =================
            Posisi agak ke tengah, mengikuti layout 2 paragraf di bawah philosophy (ml-[110.33px], w-[973px], gap-[130.34px]) */}
        <section className="pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16">
          <div className="w-full mx-auto lg:w-[973px] flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-[130.34px]">
            {/* Left Column (Kiri Atas): sits near the top */}
            <div className="w-full lg:w-[421.33px] shrink-0 flex flex-col">
              <h2 className="font-sans font-bold text-[13px] sm:text-[14px] uppercase tracking-wider text-black mb-3">
                01 / Project Objective
              </h2>
              <p className="font-sans font-light text-[14px] sm:text-[15px] leading-[22px] sm:leading-[24px] tracking-[0.3px] text-black text-justify w-full">
                <span className="inline-block w-[60px] sm:w-[70px]" aria-hidden="true" />
                {caseStudy.objective}
              </p>
            </div>

            {/* Right Column (Kanan Bawah): staggered down towards bottom, sits above SERVICES */}
            <div className="w-full lg:w-[421.33px] shrink-0 flex flex-col lg:pt-[220px]">
              <h2 className="font-sans font-bold text-[13px] sm:text-[14px] uppercase tracking-wider text-black mb-3">
                02 / Core Function
              </h2>
              <p className="font-sans font-light text-[14px] sm:text-[15px] leading-[22px] sm:leading-[24px] tracking-[0.3px] text-black text-justify w-full">
                <span className="inline-block w-[60px] sm:w-[70px]" aria-hidden="true" />
                {caseStudy.coreFunction}
              </p>
            </div>
          </div>
        </section>

        {/* ================= BOTTOM: SERVICES + A / B / C ================= */}
        <section>
          {/* SERVICES — right aligned, bold 17px, 20px margin below */}
          <div className="flex justify-end pb-[20px]">
            <span className="font-sans font-bold text-[17px] leading-[17px] uppercase text-black">
              Services
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-14">
            <ServiceColumn letter="A" title="Technology" items={caseStudy.technology} />
            <ServiceColumn letter="B" title="Art Direction" items={caseStudy.artDirection} />
            <ServiceColumn letter="C" title="Product Research" items={caseStudy.productResearch} />
          </div>
        </section>

        {/* Source Repository Link (if available) */}
        {caseStudy.repoUrl && (
          <div className="mt-20 pt-8 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] sm:text-[12px] uppercase tracking-wider">
            <span className="text-neutral-500">[ VERIFIED SOURCE REPOSITORY ]</span>
            <a
              href={caseStudy.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-black hover:opacity-70 transition-opacity font-medium"
            >
              <span>EXPLORE REPOSITORY ON GITHUB</span>
              <SignalArrow className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </Container>
    </article>
  )
}
