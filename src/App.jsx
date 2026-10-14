import Container from './components/Container'
import SectionHeading from './components/SectionHeading'
import Button from './components/Button'
import { profileData, navLinks } from './data/portfolioData'

const currentYear = new Date().getFullYear()

function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-neutral-900 selection:text-white">
      {/* Header / Navbar placeholder */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-[#F0F0F0]/95 backdrop-blur-xs">
        <Container className="flex h-16 items-center justify-between">
          <a
            href="#home"
            className="text-base font-extrabold tracking-wider text-neutral-900 uppercase focus-visible:outline-2 focus-visible:outline-neutral-900"
          >
            {profileData.name}
          </a>
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </Container>
      </header>

      {/* Main Content Area with Semantic Section Slots */}
      <main className="flex-1">
        {/* Section: Home (Hero slot) */}
        <section id="home" className="py-16 sm:py-24 border-b border-neutral-100">
          <Container>
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Hi There!
              </span>
              <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900">
                I'm {profileData.headline}
              </h1>
              <div className="mt-2.5 h-[2px] w-12 bg-neutral-900" aria-hidden="true" />
              <p className="mt-4 text-sm sm:text-base text-neutral-600">
                {profileData.subheading}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="#contact" variant="primary">
                  Contact Me
                </Button>
                <Button href="#projects" variant="secondary">
                  View My Work
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Section: Services slot */}
        <section id="services" className="py-16 sm:py-20 border-b border-neutral-100">
          <Container>
            <SectionHeading
              title="What I Do"
              description="Specialized backend capabilities built on reliable architecture and clean code."
            />
            <div className="border border-dashed border-neutral-300 p-8 text-center text-xs text-neutral-500 rounded-xs bg-[#F0F0F0]/50">
              Services section slot (To be implemented in Step 3)
            </div>
          </Container>
        </section>

        {/* Section: About slot */}
        <section id="about" className="py-16 sm:py-20 border-b border-neutral-100">
          <Container>
            <SectionHeading
              title="About Me"
              align="left"
              description="Dedicated backend developer focused on building scalable, performant, and secure web services."
            />
            <div className="border border-dashed border-neutral-300 p-8 text-center text-xs text-neutral-500 rounded-xs bg-[#F0F0F0]/50">
              About section slot (To be implemented in Step 3)
            </div>
          </Container>
        </section>

        {/* Section: Projects slot */}
        <section id="projects" className="py-16 sm:py-20 border-b border-neutral-100">
          <Container>
            <SectionHeading
              title="Portfolio"
              description="Selected backend projects, API services, and architectural solutions."
            />
            <div className="border border-dashed border-neutral-300 p-8 text-center text-xs text-neutral-500 rounded-xs bg-[#F0F0F0]/50">
              Projects section slot (To be implemented in Step 4)
            </div>
          </Container>
        </section>

        {/* Section: Skills slot */}
        <section id="skills" className="py-16 sm:py-20 border-b border-neutral-100">
          <Container>
            <SectionHeading
              title="Skills"
              description="Technologies, frameworks, databases, and development tooling in active use."
            />
            <div className="border border-dashed border-neutral-300 p-8 text-center text-xs text-neutral-500 rounded-xs bg-[#F0F0F0]/50">
              Skills section slot (To be implemented in Step 4)
            </div>
          </Container>
        </section>

        {/* Section: Contact slot */}
        <section id="contact" className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              title="Get In Touch"
              description="Ready to discuss backend engineering, API requirements, or collaborate on new projects."
            />
            <div className="border border-dashed border-neutral-300 p-8 text-center text-xs text-neutral-500 rounded-xs bg-[#F0F0F0]/50">
              Contact & CTA slot (To be implemented in Step 5)
            </div>
          </Container>
        </section>
      </main>

      {/* Footer placeholder */}
      <footer className="border-t border-neutral-200 bg-white py-8 text-center text-xs text-neutral-500">
        <Container>
          <p>© {currentYear} {profileData.name}. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  )
}

export default App
