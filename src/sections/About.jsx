import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { profileData } from '../data/portfolioData'
import { CheckSquare, Code2 } from 'lucide-react'

/**
 * About Section:
 * Two-column desktop layout matching visual reference.
 * Left: Visual placeholder frame with offset accent outline.
 * Right: Left-aligned "ABOUT ME" heading, summary bio, and technical focus checklist.
 */
export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-16 py-16 sm:py-24 bg-white border-b border-neutral-100"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Visual Frame with Offset Accent */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5]">
              {/* Offset outline frame shifted to the top-left */}
              <div
                className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-full h-full border border-neutral-900 pointer-events-none rounded-xs"
                aria-hidden="true"
              />

              {/* Main neutral surface card */}
              <div className="relative z-10 w-full h-full bg-[#D6D6D6] border border-neutral-300 flex flex-col items-center justify-center p-6 text-center select-none shadow-xs rounded-xs">
                <div className="w-16 h-16 rounded-full bg-white/70 flex items-center justify-center text-neutral-800 shadow-2xs mb-4">
                  <Code2 className="w-8 h-8 stroke-[1.75]" />
                </div>
                <p className="text-xs font-bold tracking-widest uppercase text-neutral-800">
                  Engineering Mindset
                </p>
                <p className="text-[11px] font-medium tracking-wider uppercase text-neutral-600 mt-1">
                  Practical & Scalable Backend Solutions
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Content & Focus Checklist */}
          <div className="lg:col-span-7 flex flex-col items-start text-left order-1 lg:order-2">
            <SectionHeading
              title={profileData.aboutTitle || 'ABOUT ME'}
              align="left"
              className="mb-4 sm:mb-6"
            />

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl">
              {profileData.aboutDescription}
            </p>

            {/* Core Competencies / Focus Checklist */}
            <div className="mt-8 w-full max-w-lg space-y-3.5">
              {profileData.aboutFocusList.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200/80 rounded-xs"
                >
                  <CheckSquare className="w-5 h-5 text-neutral-900 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-800 uppercase">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
