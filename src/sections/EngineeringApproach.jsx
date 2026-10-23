import Container from '../components/Container'
import { profileData } from '../data/portfolioData'

/**
 * Phase 4D — Engineering Approach Section (Signal-A Inspired)
 * - Three concise principles: Structure & Separation, Relational Data Integrity, Predictable Interfaces
 * - Editorial columns with small indices and thin rules
 * - Zero fake dashboards or unverified diagrams
 */
export default function EngineeringApproach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="relative scroll-mt-20 py-16 sm:py-24 bg-white border-b border-[#e0e0e0]"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-black mb-12 sm:mb-16">
          <div>
            <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-1.5">
              [ 04 / METHODOLOGY ]
            </div>
            <h2
              id="approach-heading"
              className="font-serif text-3xl sm:text-5xl md:text-6xl text-black uppercase tracking-tight"
            >
              ENGINEERING APPROACH
            </h2>
          </div>

          <div className="flex flex-col md:items-end font-mono text-xs text-neutral-600 uppercase tracking-wider">
            <span>THREE FACTUAL PRINCIPLES</span>
            <span className="text-neutral-400">APPLIED ACROSS BACKEND SYSTEMS</span>
          </div>
        </div>

        {/* 3 Principles Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#e0e0e0] border-t border-b border-[#e0e0e0]">
          {profileData.approachPrinciples.map((principle) => (
            <div
              key={principle.index}
              className="py-8 lg:py-10 lg:px-8 first:lg:pl-0 last:lg:pr-0 flex flex-col justify-between"
            >
              <div>
                {/* Large Display Number */}
                <div className="font-serif text-4xl sm:text-5xl text-neutral-300 font-light mb-4">
                  /{principle.index}
                </div>

                <div className="font-mono text-[10px] uppercase text-neutral-400 tracking-widest mb-1">
                  {principle.subtitle}
                </div>

                <h3 className="font-serif text-2xl text-black uppercase tracking-tight mb-4">
                  {principle.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                  {principle.description}
                </p>
              </div>

              {/* Factual Principle Tags */}
              <div className="pt-4 border-t border-neutral-100 flex flex-wrap gap-1.5 font-mono text-[10px] text-neutral-600 uppercase">
                {principle.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="bg-[#f7f7f7] border border-[#e0e0e0] px-2 py-0.5 text-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
