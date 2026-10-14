import Navbar from './components/Navbar'
import Container from './components/Container'
import SectionHeading from './components/SectionHeading'
import Hero from './sections/Hero'
import Services from './sections/Services'
import About from './sections/About'
import { profileData } from './data/portfolioData'

const currentYear = new Date().getFullYear()

function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-neutral-900 selection:text-white">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Services Section */}
        <Services />

        {/* 4. About Section */}
        <About />

        {/* 5. Projects Section (Slot for Step 4) */}
        <section id="projects" className="scroll-mt-16 py-16 sm:py-24 border-b border-neutral-100 bg-white">
          <Container>
            <SectionHeading
              title="Portfolio"
              description="Selected backend projects, API services, and architectural solutions."
            />
            <div className="border border-dashed border-neutral-300 p-8 text-center text-xs text-neutral-500 rounded-xs bg-[#F0F0F0]/50">
              Projects & Case Studies slot (Scheduled for Step 4)
            </div>
          </Container>
        </section>

        {/* 6. Skills Section (Slot for Step 4) */}
        <section id="skills" className="scroll-mt-16 py-16 sm:py-24 border-b border-neutral-100 bg-white">
          <Container>
            <SectionHeading
              title="Skills"
              description="Core backend technologies, databases, APIs, and development tooling."
            />
            <div className="border border-dashed border-neutral-300 p-8 text-center text-xs text-neutral-500 rounded-xs bg-[#F0F0F0]/50">
              Skills grid slot (Scheduled for Step 4)
            </div>
          </Container>
        </section>

        {/* 7. Contact Section (Slot for Step 5) */}
        <section id="contact" className="scroll-mt-16 py-16 sm:py-24 bg-white">
          <Container>
            <SectionHeading
              title="Contact"
              description="Ready to discuss backend engineering, API requirements, or collaborate on new projects."
            />
            <div className="border border-dashed border-neutral-300 p-8 text-center text-xs text-neutral-500 rounded-xs bg-[#F0F0F0]/50">
              Contact & CTA slot (Scheduled for Step 5)
            </div>
          </Container>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-8 text-center text-xs text-neutral-500">
        <Container>
          <p>© {currentYear} {profileData.name}. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  )
}

export default App
