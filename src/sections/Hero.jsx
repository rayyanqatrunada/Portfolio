import Container from '../components/Container'
import Button from '../components/Button'
import { profileData } from '../data/portfolioData'
import { Terminal } from 'lucide-react'

/**
 * Hero Section:
 * Two-column desktop layout matching visual reference.
 * Left: Greeting, heading, tagline, description, and primary/secondary action buttons.
 * Right: Minimalist portrait placeholder with an offset architectural outline frame.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-16 py-12 sm:py-20 lg:py-28 bg-white border-b border-neutral-100"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-sm sm:text-base font-bold tracking-tight text-neutral-900">
              Hi There!
            </span>
            <div className="mt-1.5 h-[2px] w-10 bg-neutral-900" aria-hidden="true" />

            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              {profileData.heroGreeting} {profileData.name}
            </h1>

            {/* Tagline / Subheading */}
            <div className="mt-3 inline-block bg-neutral-900 text-white px-3 py-1 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xs">
              {profileData.heroEyebrow}
            </div>

            <p className="mt-2 text-base sm:text-lg font-medium text-neutral-800">
              {profileData.tagline}
            </p>

            <p className="mt-4 text-sm sm:text-base text-neutral-600 max-w-xl leading-relaxed">
              {profileData.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Button href="#projects" variant="primary">
                View My Work
              </Button>
              <Button href="#contact" variant="secondary">
                Contact Me
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Frame with Offset Accent */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5]">
              {/* Offset architectural outline frame matching reference composition */}
              <div
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-full h-full border border-neutral-900 pointer-events-none rounded-xs"
                aria-hidden="true"
              />

              {/* Main neutral surface image/placeholder */}
              <div className="relative z-10 w-full h-full bg-[#D6D6D6] border border-neutral-300 flex flex-col items-center justify-center p-6 text-center select-none shadow-xs rounded-xs">
                <div className="w-16 h-16 rounded-full bg-white/70 flex items-center justify-center text-neutral-800 shadow-2xs mb-4">
                  <Terminal className="w-8 h-8" aria-hidden="true" />
                </div>
                <p className="text-xs font-bold tracking-widest uppercase text-neutral-800">
                  {profileData.name}
                </p>
                <p className="text-[11px] font-medium tracking-wider uppercase text-neutral-600 mt-1">
                  Backend Architecture & APIs
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
