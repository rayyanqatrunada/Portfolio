import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import EngineeringStatement from './components/EngineeringStatement'
import PhilosophyNarrative from './sections/PhilosophyNarrative'
import Skills from './sections/Skills'
import Footer from './sections/Footer'
import ProjectDetailPage from './components/ProjectDetailPage'
import ResumePage from './components/ResumePage'
import { projectsData } from './data/projects'

/**
 * Main Application Root (Signal-A & Figma Design Spec)
 *
 * Exact section sequence matching Figma coordinates and layout:
 * 1. Minimal Navigation (top: 0px)
 * 2. Editorial Hero (top status, 4-line display headline, submenu, excerpt & portrait)
 * 3. Case Studies (top: 1404px — 300px rows with randomized letter-by-letter hover reveal)
 * 4. Large Typographic Statement (top: 3875px — architectural manifesto with wireframe globe)
 * 5. Skills & Technologies (top: 4553px — two-column Swiss ruled table)
 * 6. Footer (top: 5259px — 4-column index & infinite running marquee)
 */
function App() {
  const [activeProject, setActiveProject] = useState(null)
  const [isResume, setIsResume] = useState(false)

  // Listen to hash changes for deep linking (e.g. #/project/compify or #/resume) & browser back button
  useEffect(() => {
    const syncRouteFromHash = () => {
      const hash = window.location.hash

      // 1. Resume page route
      if (hash === '#/resume' || hash === '#resume') {
        setIsResume(true)
        setActiveProject(null)
        window.scrollTo(0, 0)
        return
      }
      setIsResume(false)

      // 2. Project detail route
      const match = hash.match(/^#\/?project\/([a-zA-Z0-9_-]+)/)
      if (match) {
        const projectId = match[1]
        const project = projectsData.find((p) => p.id === projectId)
        if (project) {
          setActiveProject(project)
          window.scrollTo(0, 0)
          return
        }
      }
      setActiveProject(null)

      // Coming from a detail or resume page via a navbar/footer anchor (e.g. #skills):
      // the target section only exists after the portfolio re-renders, so scroll afterwards.
      const sectionId = hash.replace(/^#\/?/, '')
      if (sectionId && sectionId !== 'resume' && !sectionId.startsWith('project/')) {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
        }, 50)
      }
    }

    syncRouteFromHash()
    window.addEventListener('hashchange', syncRouteFromHash)
    return () => window.removeEventListener('hashchange', syncRouteFromHash)
  }, [])

  const handleOpenProject = (project) => {
    window.location.hash = `#/project/${project.id}`
    setActiveProject(project)
    window.scrollTo(0, 0)
  }

  const handleBackToPortfolio = () => {
    window.location.hash = '#projects'
    setActiveProject(null)
    setTimeout(() => {
      const el = document.getElementById('projects')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 50)
  }

  const handleBackFromResume = () => {
    window.location.hash = '#home'
    setIsResume(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // When resume route is active, render the dedicated ResumePage with clean document framing
  if (isResume) {
    return (
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
    )
  }

  // When a project is active, render the dedicated ProjectDetailPage with the same Navbar & Footer
  if (activeProject) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col selection:bg-black selection:text-white">
        <Navbar />
        <main id="main-content" className="flex-1">
          <ProjectDetailPage
            project={activeProject}
            onBack={handleBackToPortfolio}
          />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col selection:bg-black selection:text-white">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:text-xs focus:font-mono focus:uppercase focus:tracking-wider focus:outline-1 focus:outline-black"
      >
        Skip to main content
      </a>

      {/* 1. Header & Minimal Editorial Navigation */}
      <Navbar />

      {/* Main Page Flow with main-content landmark */}
      <main id="main-content" className="flex-1">
        {/* 2. Editorial Hero Section (Top header + 4-line headline + Excerpt & Portrait) */}
        <Hero />

        {/* 3. Case Studies Editorial Project List (Randomized hover reveal) */}
        <Projects onOpenProject={handleOpenProject} />

        {/* 4. Large Typographic Statement (Manifesto + wireframe globe) */}
        <EngineeringStatement />

        {/* 4B. Philosophy Editorial Narrative (Two-column staggered layout) */}
        <PhilosophyNarrative />

        {/* 5. Skills & Technologies Section (matching example layout) */}
        <Skills />
      </main>

      {/* 6. Footer & Infinite Running Marquee */}
      <Footer />
    </div>
  )
}

export default App
