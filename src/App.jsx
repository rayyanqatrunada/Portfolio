import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import EngineeringStatement from './components/EngineeringStatement'
import PhilosophyNarrative from './sections/PhilosophyNarrative'
import Skills from './sections/Skills'
import Footer from './sections/Footer'
import ProjectDetailPage from './components/ProjectDetailPage'
import ResumePage from './components/ResumePage'
import PixelTransitionOverlay from './components/PixelTransitionOverlay'
import ContactEmailModal from './components/ContactEmailModal'
import { projectsData } from './data/projects'
import { usePageTransitionScramble } from './hooks/usePageTransitionScramble'
import { scrollToSection } from './utils/scrollHelper'

function parseRouteFromHash(hash) {
  const cleanHash = typeof hash === 'string' ? hash : ''
  if (cleanHash === '#/resume' || cleanHash === '#resume') {
    return { type: 'resume', key: 'resume', project: null, targetSection: null }
  }
  const match = cleanHash.match(/^#\/?project\/([a-zA-Z0-9_-]+)/)
  if (match) {
    const project = projectsData.find((p) => p.id === match[1])
    if (project) {
      return { type: 'project', key: `project:${project.id}`, project, targetSection: null }
    }
  }
  const sectionId = cleanHash.replace(/^#\/?/, '')
  return {
    type: 'home',
    key: 'home',
    project: null,
    targetSection: sectionId && sectionId !== 'home' ? sectionId : 'home',
  }
}

/**
 * Main Application Root (Signal-A & Figma Design Spec)
 *
 * Integrated Page Transition Experience:
 * 1. PixelTransitionOverlay: Random white squares rising from bottom to top, covering the screen.
 *    Once 100% white, page route state swaps invisibly and scroll position is placed instantly
 *    at the target destination without any visible scroll up or scroll down animation.
 *    White curtain then dissolves with random squares rising from bottom to top.
 * 2. usePageTransitionScramble: Lightweight text scramble targeting ONLY the destination section
 *    (e.g. #projects or #home or #skills), keeping the page completely lightweight and lag-free.
 */
function App() {
  const [currentRoute, setCurrentRoute] = useState(() =>
    parseRouteFromHash(typeof window !== 'undefined' ? window.location.hash : '')
  )
  const [isTransitioning, setIsTransitioning] = useState(false)

  const pendingRouteRef = useRef(null)
  const currentRouteRef = useRef(currentRoute)
  currentRouteRef.current = currentRoute
  const isTransitioningRef = useRef(false)
  isTransitioningRef.current = isTransitioning

  const currentPageKey = currentRoute.key
  const currentTargetSection = currentRoute.targetSection

  // Scramble text strictly on the destination section on page change
  usePageTransitionScramble(currentPageKey, currentTargetSection)

  const navigateToHash = (newHash) => {
    if (window.location.hash === newHash) {
      handleRouteIntent(newHash)
    } else {
      window.location.hash = newHash
    }
  }

  const handleRouteIntent = (hash) => {
    const nextRoute = parseRouteFromHash(hash)
    const currentKey = currentRouteRef.current.key

    // In-page anchor navigation (e.g. #skills or #statement while on Home page):
    // Do NOT trigger transition overlay or page scramble! Just scroll smoothly with accurate navbar offset.
    if (nextRoute.key === currentKey) {
      if (nextRoute.targetSection) {
        scrollToSection(nextRoute.targetSection, 'smooth')
      }
      return
    }

    // Cross-page transition (Home ↔ Project Detail ↔ Resume):
    pendingRouteRef.current = nextRoute
    if (!isTransitioningRef.current) {
      setIsTransitioning(true)
    }
  }

  useEffect(() => {
    const onHashChange = () => {
      handleRouteIntent(window.location.hash)
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const handleTransitionCovered = () => {
    // Screen is now 100% covered in solid white
    if (pendingRouteRef.current) {
      const next = pendingRouteRef.current
      setCurrentRoute(next)

      // Position scroll INSTANTLY under the solid white curtain
      // Eliminates visible scroll-up and scroll-down animations completely
      const applyInstantPosition = () => {
        if (next.type === 'home' && next.targetSection) {
          scrollToSection(next.targetSection, 'instant')
          return
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }

      applyInstantPosition()
      requestAnimationFrame(applyInstantPosition)

      if (next.type === 'resume') {
        document.title = 'Resume / CV — Rayyan Qatrunada | Backend Developer'
      } else if (next.type === 'project' && next.project) {
        document.title = `${next.project.displayTitle || next.project.title} — Rayyan Qatrunada Portfolio`
      } else {
        document.title = 'Rayyan Qatrunada — Portfolio | Backend Developer & Systems Architecture'
      }
    }
  }

  const handleTransitionComplete = () => {
    // Canvas has finished clearing from bottom to top
    // The page is ALREADY at the destination section under the cover; NO post-uncover scroll animation!
    setIsTransitioning(false)
    pendingRouteRef.current = null
  }

  const handleOpenProject = (project) => {
    navigateToHash(`#/project/${project.id}`)
  }

  const handleBackToPortfolio = () => {
    navigateToHash('#projects')
  }

  const handleBackFromResume = () => {
    navigateToHash('#home')
  }

  return (
    <>
      {/* High-performance canvas pixel transition overlay */}
      <PixelTransitionOverlay
        isTransitioning={isTransitioning}
        onCovered={handleTransitionCovered}
        onComplete={handleTransitionComplete}
      />

      {/* Official In-Web Direct Email Modal */}
      <ContactEmailModal />

      {/* 1. Resume Page View */}
      {currentRoute.type === 'resume' ? (
        <div className="min-h-screen bg-white text-black flex flex-col selection:bg-black selection:text-white">
          <Navbar />
          <main id="main-content" className="flex-1">
            <ResumePage onBack={handleBackFromResume} />
          </main>
          <footer className="no-print border-t border-black py-6 bg-white text-black mt-auto">
            <div className="mx-auto w-full max-w-[1736px] px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] sm:text-[12px] uppercase tracking-wider text-neutral-500">
              <span>RAYY.DEV · CURRICULUM VITAE SPECIFICATION</span>
              <span>© {new Date().getFullYear()} RAYYAN QATRUNADA · JEPARA, ID</span>
            </div>
          </footer>
        </div>
      ) : currentRoute.type === 'project' && currentRoute.project ? (
        /* 2. Project Detail View */
        <div className="min-h-screen bg-white text-black flex flex-col selection:bg-black selection:text-white">
          <Navbar />
          <main id="main-content" className="flex-1">
            <ProjectDetailPage
              project={currentRoute.project}
              onBack={handleBackToPortfolio}
            />
          </main>
          <Footer />
        </div>
      ) : (
        /* 3. Main Portfolio Home View */
        <div className="min-h-screen bg-white text-black flex flex-col selection:bg-black selection:text-white">
          {/* Accessible skip link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:text-xs focus:font-mono focus:uppercase focus:tracking-wider focus:outline-1 focus:outline-black"
          >
            Skip to main content
          </a>

          {/* Header & Minimal Editorial Navigation */}
          <Navbar />

          {/* Main Page Flow */}
          <main id="main-content" className="flex-1">
            {/* Editorial Hero Section */}
            <Hero />

            {/* Case Studies Editorial Project List */}
            <Projects onOpenProject={handleOpenProject} />

            {/* Large Typographic Statement */}
            <EngineeringStatement />

            {/* Philosophy Editorial Narrative */}
            <PhilosophyNarrative />

            {/* Skills & Technologies Section */}
            <Skills />
          </main>

          {/* Footer & Infinite Running Marquee */}
          <Footer />
        </div>
      )}
    </>
  )
}

export default App
