import Container from '../components/Container'
import { profileData } from '../data/portfolioData'

/**
 * Phase 4B — About Section (Signal-A Inspired)
 * - Visual two-column composition
 * - Left: Neutral rectangular silhouette frame with fine offset outline (no fake portraits/diagnostics)
 * - Right: "ABOUT ME", concise personal introduction, and 3 factual focus points
 */
export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-me-heading"
      className="relative scroll-mt-20 py-16 sm:py-24 bg-white border-b border-[#e0e0e0]"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Rectangular Silhouette Frame with Fine Offset Outline */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start w-full">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5]">
              {/* Fine Offset Architectural Outline */}
              <div
                className="absolute -top-3.5 -left-3.5 w-full h-full border border-black pointer-events-none"
                aria-hidden="true"
              />

              {/* Neutral Surface & Clear Rectangular Silhouette */}
              <div className="relative z-10 w-full h-full bg-[#f7f7f7] border border-[#e0e0e0] flex flex-col justify-between p-6 select-none">
                {/* Top Plate Coordinate */}
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                  <span>[ FRAME 02 ]</span>
                  <span>SILHOUETTE SPEC</span>
                </div>

                {/* Center Abstract Architectural Crosshair */}
                <div className="my-auto flex items-center justify-center pointer-events-none" aria-hidden="true">
                  <div className="relative w-8 h-8 flex items-center justify-center opacity-30">
                    <div className="absolute w-full h-[1px] bg-neutral-600" />
                    <div className="absolute h-full w-[1px] bg-neutral-600" />
                  </div>
                </div>

                {/* Bottom Plate Coordinate */}
                <div className="pt-3 border-t border-[#e0e0e0] flex items-center justify-between font-mono text-[10px] uppercase text-neutral-400">
                  <span>NEUTRAL CANVAS</span>
                  <span>2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Introduction & Three Focus Points */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow & Main Heading */}
            <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-1">
              [ 02 / ABOUT ]
            </div>
            <h2
              id="about-me-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-black uppercase tracking-tight mb-4"
            >
              ABOUT ME
            </h2>
            <div className="w-full h-[1px] bg-black mb-6" aria-hidden="true" />

            {/* Concise Personal Introduction */}
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-8">
              {profileData.aboutDescription}
            </p>

            {/* Three Short Focus Points Supported by Real Data */}
            <div className="divide-y divide-[#e0e0e0] border-t border-b border-[#e0e0e0]">
              {profileData.aboutPrinciples.map((point) => (
                <div key={point.index} className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                  <span className="font-mono text-xs text-neutral-400 shrink-0 font-semibold">
                    [ {point.index} ]
                  </span>
                  <div>
                    <h3 className="font-mono text-xs sm:text-sm font-bold text-black uppercase tracking-wider mb-1">
                      {point.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
