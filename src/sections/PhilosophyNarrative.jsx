import Container from '../components/Container'

/**
 * Philosophy Narrative Section
 * Matches the exact two-column staggered layout and content from the Signal-A example:
 * - Left Column:
 *   - 4-line bold uppercase headline with indented first line
 *   - Indented narrative paragraph
 * - Right Column (staggered downward):
 *   - Monospace pill bar: ART DIRECTION (+) PRODUCT DESIGN
 *   - Indented narrative paragraph
 */
export default function PhilosophyNarrative() {
  return (
    <section
      id="philosophy-narrative"
      aria-label="Philosophy and strategic approach narrative"
      className="hidden lg:block relative pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-24 lg:pb-32 bg-white select-none"
    >
      <Container>
        {/* Centered balance: 973px block centered to eliminate left-right margin imbalance */}
        <div className="w-full mx-auto lg:w-[973px] flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-[130.34px]">
          {/* Left Column (Figma width: 421.33px, left: 110.33px) */}
          <div className="w-full lg:w-[421.33px] shrink-0 flex flex-col">
            {/* Headline (Bold statement matching reference) */}
            <div className="w-full pb-[36px] sm:pb-[60px]">
              <h3 className="font-sans font-bold text-[15px] sm:text-[17px] leading-[22px] sm:leading-[20px] uppercase tracking-tight text-black flex flex-col gap-1 sm:gap-0">
                <span className="w-full flex justify-between items-baseline pl-[50px] sm:pl-[60px]">
                  <span>RAYY.DEV</span>
                  <span>BELIEVES</span>
                  <span>THAT</span>
                </span>
                <span className="block whitespace-nowrap">
                  GOOD SYSTEMS BEGIN WITH CLARITY,
                </span>
                <span className="block whitespace-nowrap">
                  AND GROW THROUGH PURPOSEFUL
                </span>
                <span className="block whitespace-nowrap">
                  ENGINEERING.
                </span>
              </h3>
            </div>

            {/* Left Paragraph (Figma spec: width: 421.33px, font-size: 15px, line-height: 20px, letter-spacing: 0.5px, font-weight: 300, indent: 70px) */}
            <p className="font-sans font-light text-[14px] sm:text-[15px] leading-[22px] sm:leading-[24px] tracking-[0.3px] text-black text-justify w-full lg:w-[421.33px]">
              <span className="inline-block w-[60px] sm:w-[70px]" aria-hidden="true" />
              The foundation of meaningful software comes from understanding the problem before writing the solution. Rushed decisions may produce quick results, but rarely create lasting value. I believe that thoughtful planning, structured logic, and consistent execution lead to systems that are reliable, maintainable, and built around real needs.
            </p>
          </div>

          {/* Right Column (Figma width: 421.33px, left: 662px, top: 265px, right: 220.67px) */}
          <div className="w-full lg:w-[421.33px] shrink-0 flex flex-col lg:pt-[265px]">
            {/* Pill Bar: TECHNICAL PRECISION (+) PRACTICAL PURPOSE */}
            <div className="w-full flex items-center justify-between font-mono font-light text-[11px] sm:text-[12px] leading-[12px] uppercase text-black select-none">
              <span className="text-left whitespace-nowrap">TECHNICAL PRECISION</span>
              <span
                className="inline-flex items-center justify-center w-[50px] h-[23px] rounded-full border border-black bg-white select-none shrink-0 mx-2"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="w-4 h-2.5 text-black"
                >
                  <line x1="12" y1="1" x2="12" y2="11" />
                  <line x1="6" y1="6" x2="18" y2="6" />
                </svg>
              </span>
              <span className="text-right whitespace-nowrap">PRACTICAL PURPOSE</span>
            </div>

            {/* Paragraph 2 (Figma gap: 100px from pill bar, width: 421.33px, font-size: 15px, line-height: 20px, letter-spacing: 0.5px, font-weight: 300, indent: 70px) */}
            <p className="font-sans font-light text-[14px] sm:text-[15px] leading-[22px] sm:leading-[24px] tracking-[0.3px] text-black text-justify mt-[50px] sm:mt-[100px] w-full lg:w-[421.33px]">
              <span className="inline-block w-[60px] sm:w-[70px]" aria-hidden="true" />
              My approach focuses on the balance between technical precision and practical purpose. From database design to application logic, every decision should serve a reason. The goal is not to build the most complex system, but to create dependable digital products that solve problems clearly, perform consistently, and remain useful over time.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
