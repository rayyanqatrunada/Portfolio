import Container from './Container'

/**
 * Editorial Typographic Statement matching Figma top: 3875.95px spec
 * 5-line architectural manifesto with wireframe globe SVG in the center of the 5th line.
 */
export default function EngineeringStatement() {
  return (
    <section
      id="statement"
      aria-label="Development philosophy"
      className="relative pt-16 sm:pt-24 lg:pt-36 pb-14 sm:pb-20 lg:pb-28 bg-white"
    >
      <Container>
        <div className="w-full flex flex-col items-start select-none">
          {/* Eyebrow - Hidden on mobile (< lg) matching Signal-A reference */}
          <div className="hidden lg:block font-mono text-xs text-neutral-500 uppercase tracking-widest mb-8">
            [ PHILOSOPHY &amp; APPROACH ]
          </div>

          {/* Mobile Layout (< lg): Compact Centered Justified Column matching Signal-A reference */}
          <blockquote className="block lg:hidden font-serif text-[25px] xs:text-[28px] sm:text-[34px] text-black leading-[1.12] tracking-tight uppercase w-full max-w-[318px] xs:max-w-[345px] sm:max-w-[400px] mx-auto select-none">
            {/* Line 1: Centered Top */}
            <span className="w-full flex justify-center items-baseline">
              <span>RAYY.DEV BUILDS</span>
            </span>

            {/* Line 2: Rata Kanan Kiri */}
            <span className="w-full flex justify-between items-baseline font-light italic text-neutral-900 mt-1">
              <span>METICULOUSLY</span>
              <span className="text-right">CRAFTED</span>
            </span>

            {/* Line 3: Rata Kanan Kiri */}
            <span className="w-full flex justify-between items-baseline font-light italic text-neutral-900 mt-1">
              <span>BACKEND</span>
              <span className="text-right">ARCHITECTURES</span>
            </span>

            {/* Line 4: Rata Kanan Kiri */}
            <span className="w-full flex justify-between items-baseline mt-1">
              <span>THAT</span>
              <span className="text-right">ELEVATE</span>
            </span>

            {/* Line 5: Rata Kanan Kiri */}
            <span className="w-full flex justify-between items-baseline mt-1">
              <span>SYSTEM</span>
              <span className="text-right">RELIABILITY,</span>
            </span>

            {/* Line 6: Rata Kanan Kiri */}
            <span className="w-full flex justify-between items-baseline font-light mt-1">
              <span>HELPING YOUR</span>
              <span className="text-right">PLATFORM</span>
            </span>

            {/* Line 7: Rata Kanan Kiri */}
            <span className="w-full flex justify-between items-baseline font-light mt-1">
              <span>THRIVE</span>
              <span className="text-right">IN A</span>
            </span>

            {/* Line 8: Centered at bottom (Globe icon removed for responsive mode) */}
            <span className="w-full flex justify-center items-center mt-1.5">
              <span className="font-bold">CROWDED WORLD.</span>
            </span>
          </blockquote>

          {/* Desktop Layout (>= lg): Exact 5-Line Justified Headline */}
          <blockquote className="hidden lg:block font-serif lg:text-7xl xl:text-[84px] text-black leading-[1.02] tracking-tight uppercase w-full">
            <span className="w-full flex justify-between items-baseline">
              <span>RAYY.DEV</span>
              <span>BUILDS</span>
              <span className="text-right">METICULOUSLY</span>
            </span>
            <span className="w-full flex justify-between items-baseline font-light italic text-neutral-900 mt-1 sm:mt-2">
              <span>CRAFTED</span>
              <span>BACKEND ARCHITECTURES</span>
              <span className="text-right">THAT</span>
            </span>
            <span className="w-full flex justify-between items-baseline mt-1 sm:mt-2">
              <span>ELEVATE</span>
              <span>SYSTEM</span>
              <span className="text-right">RELIABILITY,</span>
            </span>
            <span className="w-full flex justify-between items-baseline font-light mt-1 sm:mt-2">
              <span>HELPING YOUR</span>
              <span>PLATFORM</span>
              <span className="text-right">THRIVE IN A</span>
            </span>
            <span className="w-full flex justify-between items-center mt-1.5 sm:mt-3">
              <span>CROWDED</span>
              {/* Wireframe Globe Line Icon matching Figma 68120dd4bd8873ca1d842c87_4 spec */}
              <span
                className="inline-flex items-center justify-center w-8 h-5 sm:w-16 sm:h-10 md:w-20 md:h-12 border border-black text-black bg-white mx-1 sm:mx-2"
                aria-hidden="true"
              >
                <svg viewBox="0 0 36 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full p-0.5 sm:p-1 animate-pulse">
                  <ellipse cx="18" cy="12" rx="16" ry="10" />
                  <line x1="2" y1="12" x2="34" y2="12" />
                  <ellipse cx="18" cy="12" rx="7" ry="10" />
                  <line x1="18" y1="2" x2="18" y2="22" />
                </svg>
              </span>
              <span className="font-bold text-right">WORLD.</span>
            </span>
          </blockquote>

          {/* Bottom Telemetry Bar - Hidden on mobile (< lg) matching Signal-A reference */}
          <div className="hidden lg:flex w-full pt-10 mt-12 border-t border-black flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase text-neutral-600 tracking-wider">
            <span>[ SYSTEM CORE ]</span>
            <span>STRUCTURED SYSTEMS · NORMALIZED DATA · PREDICTABLE APIS</span>
            <span className="text-black font-semibold">JEPARA, ID</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
