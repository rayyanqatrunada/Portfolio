import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Services from './sections/Services'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

/**
 * Main Application Root
 * Composes the complete single-page portfolio layout strictly adhering to section hierarchy.
 * Includes accessible skip link for keyboard users.
 */
function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-neutral-900 selection:text-white">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-neutral-900 focus:text-white focus:text-xs focus:font-semibold focus:uppercase focus:tracking-wider focus:rounded-xs focus:outline-2 focus:outline-offset-2 focus:outline-neutral-900"
      >
        Skip to main content
      </a>

      {/* 1. Header & Navigation */}
      <Navbar />

      {/* Main Page Flow with main-content landmark */}
      <main id="main-content" className="flex-1">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Services Section ("WHAT I DO") */}
        <Services />

        {/* 4. About Section ("ABOUT ME") */}
        <About />

        {/* 5. Skills Section ("TECHNICAL SKILLS") */}
        <Skills />

        {/* 6. Projects Section ("FEATURED PROJECTS") */}
        <Projects />

        {/* 7. Contact Section & CTA ("LET'S WORK TOGETHER") */}
        <Contact />
      </main>

      {/* 8. Footer */}
      <Footer />
    </div>
  )
}

export default App
