import { useState, useEffect, useRef } from 'react'
import Container from '../components/Container'
import SignalArrow from '../components/SignalArrow'
import developerPortrait from '../assets/developer-portrait.jpg'
import { profileData } from '../data/portfolioData'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

/**
 * useSequentialScramble Hook:
 * Matches the randomize behavior in "my project":
 * - Reveals strictly character-by-character from the very first letter (index 0).
 * - Current character randomizes through GLYPHS for a few ticks.
 * - Previous characters stay firmly locked.
 * - Subsequent characters are not yet shown.
 * - Once current character locks, next character begins randomizing until complete.
 * - Triggers on initial mount, on scroll-return, and when triggerKey increments.
 */
function useSequentialScramble(targetText, triggerKey, ticksPerChar = 2) {
  const [displayText, setDisplayText] = useState('')
  const [prevTrigger, setPrevTrigger] = useState(triggerKey)
  const [prevTarget, setPrevTarget] = useState(targetText)
  const animRef = useRef(null)

  if (triggerKey !== prevTrigger) {
    setPrevTrigger(triggerKey)
    setPrevTarget(targetText)
    setDisplayText('')
  } else if (targetText !== prevTarget) {
    setPrevTarget(targetText)
    setDisplayText(targetText)
  }

  useEffect(() => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current)
      animRef.current = null
    }

    const length = targetText.length
    if (length === 0) {
      return
    }

    let currentCharIndex = 0
    let currentTick = 0

    const animate = () => {
      if (currentCharIndex >= length) {
        setDisplayText(targetText)
        animRef.current = null
        return
      }

      // If current character is a space, advance immediately
      if (targetText[currentCharIndex] === ' ') {
        currentCharIndex++
        currentTick = 0
        setDisplayText(targetText.slice(0, currentCharIndex))
        animRef.current = requestAnimationFrame(animate)
        return
      }

      // Previous characters are locked; only current character randomizes
      const lockedPart = targetText.slice(0, currentCharIndex)
      const randomChar = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      setDisplayText(lockedPart + randomChar)

      currentTick++
      if (currentTick >= ticksPerChar) {
        currentCharIndex++
        currentTick = 0
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current)
        animRef.current = null
      }
    }
  }, [triggerKey, targetText, ticksPerChar])

  return displayText || targetText
}

function ScrambleText({ text, triggerKey, ticksPerChar = 2, className = '' }) {
  const displayText = useSequentialScramble(text, triggerKey, ticksPerChar)
  return <span data-no-page-scramble="true" className={className}>{displayText}</span>
}

function getWibTimeString() {
  try {
    return (
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date()) + ' WIB'
    )
  } catch {
    return '14:45 WIB'
  }
}

/**
 * Editorial Hero Section (Exact Figma & Signal-A Coordinates)
 * - Top Coordinates: right-aligned, NO bottom border, compact monospace text
 * - Studio Eyebrow: centered above headline matching ( S—A STUDIO )
 * - 4-line display headline: justified across full width with balanced leading
 * - Submenu: two 311px columns with hairline borders
 * - About Block: centered two-column composition with developer portrait
 */
export default function Hero() {
  const [wibTime, setWibTime] = useState(getWibTimeString)
  const [scrambleKey, setScrambleKey] = useState(1)
  const topAreaRef = useRef(null)
  const hasExitedRef = useRef(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setWibTime(getWibTimeString())
    }, 30000)
    return () => clearInterval(timer)
  }, [])

  // Dual Scroll + Intersection Observer: Triggers scramble when top area scrolls out of view and returns
  useEffect(() => {
    const el = topAreaRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // When user scrolls down so clock & ( RAYY.DEV ) are completely out of view
            hasExitedRef.current = true
          } else if (hasExitedRef.current) {
            // When user returns to top after having scrolled away
            hasExitedRef.current = false
            setScrambleKey((k) => k + 1)
          }
        })
      },
      {
        threshold: 0,
      }
    )

    observer.observe(el)

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      if (rect.bottom <= 0) {
        hasExitedRef.current = true
      } else if (rect.top >= -20 && hasExitedRef.current) {
        hasExitedRef.current = false
        setScrambleKey((k) => k + 1)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section
      id="home"
      aria-label="Introduction and purpose"
      className="relative scroll-mt-20 pt-4 sm:pt-6 pb-12 sm:pb-16 lg:pb-20 bg-white"
    >
      <Container>
        {/* Top Header Area: Clock, Coordinates & ( RAYY.DEV ) Eyebrow (Observed for scroll-away and return scramble triggers) */}
        <div ref={topAreaRef} className="w-full">
          {/* Top Coordinates Strip — Matches Signal-A reference:
              - Positioned under Column 5 (lg:mr-[220.67px], not sticking to the far right edge)
              - Balanced vertical spacing (pt-5 sm:pt-7 and pb-4 sm:pb-6)
              - Refined legible monospace typography: text-[10.5px] sm:text-[11.5px] (slightly enlarged as requested)
              - Formatted time + location (HH:MM WIB UTC/GMT +7 & JEPARA INDONESIA)
          */}
          <div
            className="w-full flex justify-end items-start pt-5 sm:pt-7 pb-4 sm:pb-6 font-mono text-[10.5px] sm:text-[11.5px] uppercase tracking-wider text-black select-none"
          >
            <div className="w-[210px] sm:w-[240px] lg:mr-[220.67px] flex flex-col gap-4 sm:gap-[18px] shrink-0">
              <div className="flex justify-start items-center gap-[2ch]">
                <ScrambleText
                  text={wibTime}
                  triggerKey={scrambleKey}
                  ticksPerChar={2}
                  className="text-black font-medium"
                />
                <ScrambleText
                  text="UTC/GMT +7"
                  triggerKey={scrambleKey}
                  ticksPerChar={2}
                  className="text-neutral-500"
                />
              </div>
              <div className="flex justify-between items-center gap-4 text-neutral-600">
                <ScrambleText
                  text="JEPARA"
                  triggerKey={scrambleKey}
                  ticksPerChar={2}
                  className="text-black"
                />
                <ScrambleText
                  text="INDONESIA"
                  triggerKey={scrambleKey}
                  ticksPerChar={2}
                  className="text-neutral-400"
                />
              </div>
            </div>
          </div>

          {/* Personal Eyebrow matching Signal-A style */}
          <div
            className="w-full lg:w-[421.34px] lg:mx-auto h-[48px] sm:h-[60px] flex items-center justify-center text-center select-none mb-3 sm:mb-4"
          >
            <span className="font-sans text-[16px] sm:text-[19px] md:text-[21px] uppercase tracking-wider text-black font-normal inline-flex items-center">
              <ScrambleText
                text="( RAYY.DEV )"
                triggerKey={scrambleKey}
                ticksPerChar={2}
              />
            </span>
          </div>
        </div>

        {/* Editorial Headline — High Contrast Bold Sans & Elegant Serif matching Signal-A */}
        <div className="mb-8 sm:mb-12 select-none w-full">
          {/* Mobile Layout (< lg): Compact Centered Justified Column matching Signal-A reference */}
          <h1 className="flex lg:hidden text-[23px] xs:text-[25px] sm:text-[31px] md:text-[36px] text-black leading-[1.1] sm:leading-[1.05] uppercase w-full max-w-[315px] xs:max-w-[340px] sm:max-w-[390px] mx-auto flex-col tracking-tight select-none">
            <span className="sr-only">Rayyan Qatrunada Portfolio — Rayyan Qatrunada Qhoniansyah Putra, Backend Developer</span>
            {/* Line 1: Centered Brand Name */}
            <span className="w-full flex justify-center items-center font-serif font-normal">
              <span className="shrink-0 flex items-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="inline-block w-[0.38em] h-[0.38em] text-black mr-[0.25em] align-middle relative -top-[0.05em]"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10.5" />
                </svg>
                <span>RAYY.DEV</span>
              </span>
            </span>

            {/* Line 2: Rata Kanan Kiri (Bold Sans) */}
            <span className="w-full flex justify-between items-baseline font-sans font-bold text-[0.85em] tracking-tight text-black mt-1">
              <span>IS A</span>
              <span className="text-right">BACKEND DEVELOPER</span>
            </span>

            {/* Line 3: Rata Kanan Kiri (Serif) */}
            <span className="w-full flex justify-between items-baseline font-serif font-normal text-black mt-1">
              <span>BUILDING</span>
              <span className="text-right">RELIABLE SYSTEMS</span>
            </span>

            {/* Line 4: Rata Kanan Kiri (Bold Sans) */}
            <span className="w-full flex justify-between items-baseline font-sans font-bold text-[0.85em] tracking-tight text-black mt-1">
              <span>THOUGHTFUL</span>
              <span className="text-right">ENGINEERING</span>
            </span>

            {/* Line 5: Rata Kanan Kiri (Serif) */}
            <span className="w-full flex justify-between items-baseline font-serif font-normal text-black mt-1">
              <span>FOCUSED ON</span>
              <span className="text-right">BUILDING</span>
            </span>

            {/* Line 6: Rata Kanan Kiri (Serif) */}
            <span className="w-full flex justify-between items-baseline font-serif font-normal text-black mt-1">
              <span>SCALABLE</span>
              <span className="text-right">DIGITAL</span>
            </span>

            {/* Line 7: Centered at bottom (Serif) */}
            <span className="w-full flex justify-center items-baseline font-serif font-normal text-black mt-1">
              <span>EXPERIENCES.</span>
            </span>
          </h1>

          {/* Desktop Layout (>= lg): Exact 4-Line Justified Headline */}
          <h1 className="hidden lg:flex text-[60px] xl:text-[72px] 2xl:text-[78px] text-black leading-[0.94] uppercase w-full flex-col">
            <span className="sr-only">Rayyan Qatrunada Portfolio — Rayyan Qatrunada Qhoniansyah Putra, Backend Developer</span>
            {/* Line 1: ● RAYY.DEV IS A (serif) ... BACKEND DEVELOPER (bold sans) */}
            <span className="w-full flex justify-between items-baseline font-serif font-normal whitespace-nowrap">
              <span className="shrink-0 flex items-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="inline-block w-[0.38em] h-[0.38em] text-black mr-[0.25em] align-middle relative -top-[0.05em]"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10.5" />
                </svg>
                <span>RAYY.DEV IS A</span>
              </span>
              <span className="text-right shrink-0 font-sans font-bold text-[0.88em] tracking-tight text-black">
                BACKEND DEVELOPER
              </span>
            </span>

            {/* Line 2: BUILDING RELIABLE SYSTEMS (serif) ... THOUGHTFUL (bold sans) */}
            <span className="w-full flex justify-between items-baseline whitespace-nowrap">
              <span className="shrink-0 font-serif font-normal text-black">
                BUILDING RELIABLE SYSTEMS
              </span>
              <span className="text-right shrink-0 font-sans font-bold text-[0.88em] tracking-tight text-black">
                THOUGHTFUL
              </span>
            </span>

            {/* Line 3: ENGINEERING (bold sans) ... FOCUSED ON (serif) ... BUILDING (serif) */}
            <span className="w-full flex justify-between items-baseline whitespace-nowrap">
              <span className="shrink-0 font-sans font-bold text-[0.88em] tracking-tight text-black">
                ENGINEERING
              </span>
              <span className="text-center px-2 font-serif font-normal text-neutral-800">
                FOCUSED ON
              </span>
              <span className="text-right shrink-0 font-serif font-normal text-black">
                BUILDING
              </span>
            </span>

            {/* Line 4: SCALABLE (serif) ... DIGITAL (serif) ... EXPERIENCES (serif) */}
            <span className="w-full flex justify-between items-baseline font-serif font-normal text-black whitespace-nowrap">
              <span className="shrink-0">
                SCALABLE
              </span>
              <span className="text-center px-2 text-neutral-800">
                DIGITAL
              </span>
              <span className="text-right shrink-0">
                EXPERIENCES.
              </span>
            </span>
          </h1>
        </div>

        {/* Submenu Category Bar — Hidden on mobile (< lg), shown on desktop (>= lg) */}
        <div className="hidden lg:block w-full py-4 border-y border-black font-mono text-[11px] sm:text-xs uppercase tracking-wider mb-14 sm:mb-20">
          <div className="w-full flex flex-col lg:flex-row lg:ml-[331px] lg:w-[642px] justify-between gap-6 lg:gap-[20px]">
            {/* Column A (width: 311px) */}
            <div className="w-full lg:w-[311px] space-y-1 text-neutral-800 shrink-0">
              <div className="flex justify-between items-center">
                <a href="#projects" className="text-black font-semibold hover:opacity-60 transition-opacity">
                  PRODUCTIONS / PROJECTS
                </a>
                <span className="text-neutral-400">05 ARCHIVES</span>
              </div>
              <div className="flex justify-between items-center text-neutral-600">
                <span>TECHNICAL SPECIFICATION</span>
                <span>REST / 3NF</span>
              </div>
              <div className="flex justify-between items-center text-neutral-600">
                <span>CORE ECOSYSTEM</span>
                <span>PHP · LARAVEL</span>
              </div>
            </div>

            {/* Column B (width: 311px) */}
            <div className="w-full lg:w-[311px] space-y-1 text-neutral-800 shrink-0">
              <div className="flex justify-between items-center">
                <a href="#about" className="text-black hover:opacity-60 transition-opacity">
                  ABOUT DEVELOPER
                </a>
                <span className="text-neutral-400">INFO</span>
              </div>
              <div className="flex justify-between items-center text-neutral-600">
                <a href="#statement" className="hover:text-black transition-colors">
                  PHILOSOPHY &amp; APPROACH
                </a>
                <span>MANIFESTO</span>
              </div>
              <div className="flex justify-between items-center">
                <a href={`mailto:${profileData.email}`} className="text-black font-semibold hover:opacity-60 transition-opacity">
                  FOR INQUIRIES
                </a>
                <SignalArrow className="w-4 h-2.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Centered Identity & Portrait Section — Figma width: 862.67px (left: 220.67px; right: 220.67px) */}
        <div id="about" className="scroll-mt-24 w-full lg:w-[862.67px] lg:mx-auto pb-0">
          {/* Eyebrow: [ ABOUT THE DEVELOPER ] */}
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-black pb-3">
            <span>[ ABOUT THE DEVELOPER ]</span>
            <span className="text-neutral-400 hidden sm:inline-block">JEPARA, ID · 2026</span>
          </div>

          {/* Horizontal Divider 862.67px */}
          <div className="h-[1px] bg-black w-full mb-8 sm:mb-12" />

          {/* Two-Column Grid: 421.33px + 421.34px */}
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 lg:gap-[20px] pb-8 w-full">
            {/* Left Column (Figma: width 421.33px; height: 469.89px; padding: 313.89px 0px 0px) */}
            <div className="w-full lg:w-[421.33px] flex flex-col justify-end lg:pt-[240px] shrink-0">
              <p className="font-sans text-[15px] sm:text-[16px] leading-[22px] sm:leading-[24px] tracking-[0.3px] text-black font-light text-justify sm:text-left">
                <span className="inline-block w-[70px]" aria-hidden="true" />
                I am <span className="font-medium text-black">Rayyan Qatrunada</span>, a backend and systems developer who constructs dependable digital architectures, relational database schemas, and robust API endpoints. Focused on clean request lifecycles, normalized data flow, and predictable contracts that allow software to scale with absolute stability.
                <span className="sr-only"> Official portfolio of Rayyan Qatrunada Qhoniansyah Putra.</span>
              </p>

              <div className="pt-8 flex items-center gap-6 font-mono text-[11px] sm:text-xs uppercase tracking-wider">
                <a
                  href="#/resume"
                  className="group inline-flex items-center gap-2 text-black font-semibold border-b border-black pb-0.5 hover:opacity-60 transition-opacity"
                >
                  <span>RESUME</span>
                  <SignalArrow className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#skills"
                  className="text-neutral-600 hover:text-black border-b border-neutral-300 hover:border-black pb-0.5 transition-colors"
                >
                  TECHNICAL SKILLS
                </a>
              </div>
            </div>

            {/* Right Column (Figma: width 421.34px; height: 469.89px) */}
            <div className="w-full lg:w-[421.34px] flex flex-col shrink-0">
              <div className="w-full aspect-square border border-black overflow-hidden bg-neutral-100">
                <img
                  src={developerPortrait}
                  alt="Rayyan Qatrunada — Backend Developer studio portrait"
                  className="w-full h-full object-cover grayscale contrast-105"
                  loading="eager"
                  width={421}
                  height={421}
                />
              </div>

              {/* Caption */}
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-wider text-black">
                <span className="truncate">JEPARA, ID · RAYYAN QATRUNADA</span>
                <span className="text-neutral-500">FIG. 01</span>
              </div>
            </div>
          </div>

          {/* Bottom Social Links Bar matching user request */}
          <div className="w-full flex items-center justify-between border-t border-black pt-2 sm:pt-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider">
            <div className="flex items-center gap-[2ch]">
              <a
                href={profileData.githubUrl || 'https://github.com/rayyanqatrunada'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:opacity-60 transition-opacity"
              >
                Github
              </a>
              <a
                href={profileData.linkedinUrl || 'https://linkedin.com/in/rayyanqatrunada'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:opacity-60 transition-opacity"
              >
                Linkedin
              </a>
            </div>

            <div>
              <a
                href={`mailto:${profileData.email}`}
                className="text-black hover:opacity-60 transition-opacity"
              >
                Gmail
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
