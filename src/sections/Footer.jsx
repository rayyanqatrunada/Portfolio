import Container from '../components/Container'
import SignalArrow from '../components/SignalArrow'
import { profileData } from '../data/portfolioData'

const currentYear = new Date().getFullYear()

/**
 * Footer Marquee Component matching Figma spec:
 * 6800023133dde14e0bd02836_footer-marquee.svg
 * Runs continuously at 118px height with alternating editorial weights and asterisks.
 */
function FooterMarquee() {
  const marqueeItems = [
    { text: 'RAYY.DEV', font: 'font-sans font-black tracking-tight' },
    { text: 'Rayy.dev', font: 'font-serif font-light italic' },
    { text: 'RAYY.DEV', font: 'font-mono tracking-widest font-normal' },
    { text: 'Rayy.dev', font: 'font-serif uppercase font-normal' },
  ]

  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]

  return (
    <div className="w-full overflow-hidden border-t border-black bg-white h-[90px] sm:h-[118px] flex items-center select-none pointer-events-none">
      <div className="animate-marquee flex items-center whitespace-nowrap pointer-events-none">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 sm:gap-10 mr-6 sm:mr-10">
            <span className={`text-4xl sm:text-6xl md:text-7xl lg:text-[80px] text-black ${item.font}`}>
              {item.text}
            </span>
            <span className="text-xl sm:text-2xl text-neutral-400 select-none font-serif">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Editorial Footer (Signal-A & Figma Spec)
 * - Top Links: GITHUB (left: 0px), LINKEDIN & EMAIL (right: 0px)
 * - Divider at 32px
 * - 4-Column Directory at 33px (height: 230px):
 *   Col 1: left 0px (RAYY.DEV)
 *   Col 2: left 110.33px (HOME, CASE STUDIES, ABOUT)
 *   Col 3: left 441.33px (PHILOSOPHY, CHANNELS, DIRECT INQUIRY)
 *   Col 4: left 772.33px (SCHEDULE A TECHNICAL CALL ↗)
 * - Bottom Paragraphs: left 331px (width 311px) and left 993px (width 311px)
 * - Divider at 385.4px
 * - Running Marquee at 396.4px (height 118px)
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="no-print bg-white pt-24 sm:pt-32 lg:pt-40 pb-0 text-black">
      <Container>
        {/* Top Links Bar — standard border-b border-black matching all other section dividers */}
        <div className="flex items-center justify-between pb-4 border-b border-black font-mono text-xs uppercase tracking-wider mb-3 sm:mb-3.5">
          <div>
            <a
              href="https://github.com/rayyanqatrunada"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:opacity-60 transition-opacity"
            >
              GITHUB
            </a>
          </div>

          <div className="flex items-center gap-6 text-right">
            <a
              href="https://linkedin.com/in/rayyanqatrunada"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:opacity-60 transition-opacity"
            >
              LINKEDIN
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="text-black hover:opacity-60 transition-opacity"
            >
              EMAIL
            </a>
          </div>
        </div>

        {/* 4-Column Directory — +35% middle gap & snug to top line */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-8 pb-8 sm:pb-11">
          {/* Col 1: Brand Wordmark (width: 200.66px) */}
          <div className="w-full sm:w-[180px] lg:w-[200.66px] shrink-0">
            <a
              href="#home"
              className="font-sans text-[17px] uppercase font-normal tracking-wide text-black hover:opacity-75 transition-opacity"
              aria-label="RAYY.DEV - Back to top"
            >
              {profileData.logoText || 'RAYY.DEV'}
            </a>
            <div className="pt-3 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
              BACKEND ARCHITECTURE
            </div>
          </div>

          {/* Col 2: Directory Links (Figma left: 110.33px) */}
          <div className="w-full sm:w-[150px] lg:w-[180px] space-y-2 shrink-0">
            <a href="#home" className="block font-mono text-xs uppercase tracking-wider text-black hover:opacity-60 transition-opacity">
              HOME
            </a>
            <a href="#projects" className="block font-mono text-xs uppercase tracking-wider text-neutral-700 hover:text-black transition-colors">
              MY PROJECT
            </a>
            <a href="#about" className="block font-mono text-xs uppercase tracking-wider text-neutral-700 hover:text-black transition-colors">
              ABOUT DEVELOPER
            </a>
          </div>

          {/* Col 3: Channels Links (Figma left: 441.33px) */}
          <div className="w-full sm:w-[150px] lg:w-[180px] space-y-2 shrink-0">
            <a href="#statement" className="block font-mono text-xs uppercase tracking-wider text-neutral-700 hover:text-black transition-colors">
              PHILOSOPHY
            </a>
            <a href="#skills" className="block font-mono text-xs uppercase tracking-wider text-neutral-700 hover:text-black transition-colors">
              SKILLS
            </a>
            <a href="#/resume" className="block font-mono text-xs uppercase tracking-wider text-neutral-700 hover:text-black transition-colors">
              RESUME / CV
            </a>
            <a href={`mailto:${profileData.email}`} className="block font-mono text-xs uppercase tracking-wider text-neutral-700 hover:text-black transition-colors">
              DIRECT INQUIRY
            </a>
          </div>

          {/* Col 4: Action link (Figma left: 772.33px) */}
          <div className="w-full sm:w-[260px] lg:w-[320px] flex flex-col items-start sm:items-end shrink-0">
            <a
              href={`mailto:${profileData.email}`}
              className="font-sans text-[16px] sm:text-[17px] uppercase font-normal text-black border-b border-black pb-1 hover:opacity-60 transition-opacity"
            >
              SCHEDULE A TECHNICAL CALL ↗
            </a>

            <div className="pt-4 sm:pt-6">
              <button
                type="button"
                onClick={scrollToTop}
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-black border border-black px-4 py-1.5 hover:bg-black hover:text-white transition-colors cursor-pointer focus-visible:outline-1 focus-visible:outline-black"
                aria-label="Scroll back to top of the page"
              >
                <span>TOP</span>
                <SignalArrow direction="left" className="rotate-90 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Paragraph Metadata Blocks */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start pt-6 sm:pt-8 pb-3.5 sm:pb-4 font-mono text-[11px] uppercase tracking-wider text-neutral-600 gap-6">
          <div className="w-full lg:ml-[331px] lg:w-[450px] space-y-1 shrink-0">
            <p>DESIGNED &amp; ENGINEERED FOR RELIABLE SYSTEMS</p>
            <p>RELATIONAL SCHEMAS · DEFENSIVE JSON ENVELOPES</p>
            <p>© {currentYear} RAYYAN QATRUNADA · ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </Container>

      {/* Infinite Running Marquee — Figma top: 396.4px, height: 118px */}
      <FooterMarquee />
    </footer>
  )
}
