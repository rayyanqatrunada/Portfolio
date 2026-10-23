import Container from '../components/Container'
import SignalArrow from '../components/SignalArrow'
import CopyEmailButton from '../components/CopyEmailButton'
import { profileData } from '../data/portfolioData'

/**
 * ProfilesRecognition Section (Signal-A & Figma Spec)
 * - Matching Figma top: 4553.82px, height: 550.73px
 * - Left column: width 642px (left 0px to 662px)
 *   Top 55px bar: [ PROFILES & ARCHIVES ]
 *   Editorial description & verified accounts
 * - Right column: width 642px (left 662px to 1304px)
 *   Exactly 10 table rows of 55px height each
 *   Separated by border-bottom 0.727px solid #000000
 * - Bottom action row: 55px height with Signal-A arrow
 */
export default function ProfilesRecognition() {
  const channelRows = [
    {
      id: 'github',
      name: 'GITHUB',
      handle: '@rayyanqatrunada',
      badge: 'PUBLIC REPOSITORIES',
      href: profileData.githubUrl || 'https://github.com/rayyanqatrunada',
      isExternal: true,
    },
    {
      id: 'linkedin',
      name: 'LINKEDIN',
      handle: 'RAYYAN QATRUNADA',
      badge: 'PROFESSIONAL NETWORK',
      href: 'https://linkedin.com/in/rayyanqatrunada',
      isExternal: true,
    },
    {
      id: 'email',
      name: 'DIRECT EMAIL',
      handle: profileData.email,
      badge: 'DIRECT INQUIRIES',
      href: `mailto:${profileData.email}`,
      isExternal: false,
      hasCopy: true,
    },
    {
      id: 'portfolio-repo',
      name: 'SOURCE REPOSITORY',
      handle: 'RAYYANQATRUNADA / PORTFOLIO',
      badge: 'VITE + REACT SPEC',
      href: 'https://github.com/rayyanqatrunada/Portfolio',
      isExternal: true,
    },
    {
      id: 'location',
      name: 'BASE REGION',
      handle: 'JEPARA, INDONESIA',
      badge: 'GMT+7 [WIB]',
      href: null,
    },
    {
      id: 'ecosystem',
      name: 'CORE ECOSYSTEM',
      handle: 'PHP 8.2+ · LARAVEL 11',
      badge: 'SYSTEMS & APIS',
      href: null,
    },
    {
      id: 'database',
      name: 'DATA ARCHITECTURE',
      handle: 'MYSQL 8.0 · 3NF SCHEMAS',
      badge: 'RELATIONAL MODEL',
      href: null,
    },
    {
      id: 'interfaces',
      name: 'API SPECIFICATION',
      handle: 'RESTFUL JSON ENVELOPES',
      badge: 'DEFENSIVE CONTRACTS',
      href: null,
    },
    {
      id: 'availability',
      name: 'AVAILABILITY',
      handle: 'OPEN FOR COLLABORATION',
      badge: '2026 ACTIVE',
      href: null,
    },
    {
      id: 'discipline',
      name: 'ENGINEERING SPEC',
      handle: 'CLEAN ARCHITECTURE · REPOSITORIES',
      badge: 'STABLE SYSTEMS',
      href: null,
    },
  ]

  return (
    <section
      id="channels"
      aria-labelledby="channels-heading"
      className="relative scroll-mt-20 pt-10 sm:pt-16 pb-16 sm:pb-24 bg-white border-t border-black"
    >
      <Container>
        {/* Main Two-Column Layout matching Figma left: 0px to 662px and 662px to 1304px (642px + 642px) */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-[20px]">
          {/* Left Column (Figma width: 642px) */}
          <div className="w-full lg:w-[642px] flex flex-col justify-between shrink-0">
            <div>
              {/* Top Row: 55px height with bottom border */}
              <div className="h-[55px] border-b border-black flex items-center justify-between font-mono text-xs uppercase tracking-widest text-black">
                <span>[ PROFILES &amp; ARCHIVES ]</span>
                <span className="text-neutral-400">INDEX // 04</span>
              </div>

              {/* Editorial Description */}
              <div className="pt-8 max-w-md space-y-4">
                <h2
                  id="channels-heading"
                  className="font-sans text-2xl sm:text-3xl uppercase font-normal tracking-tight text-black"
                >
                  ENGINEERING SPEC &amp; PUBLIC CHANNELS
                </h2>
                <p className="text-sm text-neutral-700 leading-relaxed font-sans font-light">
                  Direct communication endpoints, public code repositories, and core backend technology models verified for production development.
                </p>
                <div className="pt-2">
                  <CopyEmailButton email={profileData.email} size="sm" />
                </div>
              </div>
            </div>

            <div className="hidden lg:block pt-24 font-mono text-[11px] text-neutral-400 uppercase tracking-widest">
              JEPARA, INDONESIA · GMT+7
            </div>
          </div>

          {/* Right Column (Figma width: 642px): Exactly 10 rows of 55px each + 55px Inquiry row */}
          <div className="w-full lg:w-[642px] flex flex-col shrink-0">
            {/* Top border matching the 55px table start */}
            <div className="border-t border-black">
              {channelRows.map((row) => {
                const inner = (
                  <div className="w-full h-[55px] flex items-center justify-between gap-4 font-sans select-none">
                    {/* Left label: 17px Neue Haas Grotesk uppercase */}
                    <span className="text-[14px] sm:text-[16px] lg:text-[17px] uppercase font-normal tracking-wide text-black group-hover:italic transition-all">
                      {row.name}
                    </span>

                    {/* Right metadata: 12px Gt America Mono uppercase */}
                    <div className="flex items-center gap-3 sm:gap-4 font-mono text-[11px] sm:text-xs uppercase text-neutral-800 text-right">
                      <span className="text-black font-medium">{row.handle}</span>
                      <span className="text-neutral-400 hidden sm:inline-block">/</span>
                      <span className="text-neutral-500 hidden sm:inline-block tracking-wider">
                        {row.badge}
                      </span>
                      {row.href && (
                        <SignalArrow className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      )}
                    </div>
                  </div>
                )

                if (row.href) {
                  return (
                    <a
                      key={row.id}
                      href={row.href}
                      target={row.isExternal ? '_blank' : undefined}
                      rel={row.isExternal ? 'noopener noreferrer' : undefined}
                      className="group block border-b border-black hover:bg-[#fafafa] transition-colors focus-visible:outline-1 focus-visible:outline-black px-1"
                    >
                      {inner}
                    </a>
                  )
                }

                return (
                  <div
                    key={row.id}
                    className="border-b border-black px-1"
                  >
                    {inner}
                  </div>
                )
              })}
            </div>

            {/* Bottom 55px Direct Inquiry Action Row matching Figma top: 5204.55px */}
            <div className="h-[55px] border-b border-black flex items-center justify-between pt-2">
              <a
                href={`mailto:${profileData.email}`}
                className="group flex items-center justify-between w-full h-[55px] font-sans text-[15px] sm:text-[17px] uppercase font-normal text-black hover:opacity-70 transition-opacity"
              >
                <span>INITIATE DIRECT INQUIRY</span>
                <SignalArrow className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
