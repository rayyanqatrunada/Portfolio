import { useState, useEffect, useRef } from 'react'
import Container from '../components/Container'
import { technicalSkillsList } from '../data/skills'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*+-=[]{}|;:<>'

/**
 * ScrambleText Component:
 * - Starts fully visible (in-place scramble, does not start from empty).
 * - When hovered, randomizes characters briefly (~340ms) and locks back cleanly to text.
 * - Strictly scoped to the hovered row only.
 */
function ScrambleText({ text, isHovered, className = '' }) {
  const [displayText, setDisplayText] = useState(text)
  const [prevText, setPrevText] = useState(text)
  const animRef = useRef(null)
  const prevHoveredRef = useRef(isHovered)

  if (text !== prevText) {
    setPrevText(text)
    setDisplayText(text)
  }

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  useEffect(() => {
    if (isHovered && !prevHoveredRef.current) {
      if (animRef.current) cancelAnimationFrame(animRef.current)

      const startTime = performance.now()
      const length = text.length
      const DURATION_MS = 340

      const step = (now) => {
        const elapsed = now - startTime
        if (elapsed >= DURATION_MS) {
          setDisplayText(text)
          animRef.current = null
          return
        }

        const progress = elapsed / DURATION_MS
        const lockThreshold =
          progress < 0.25 ? 0 : Math.floor(((progress - 0.25) / 0.75) * length)

        const scrambled = text
          .split('')
          .map((char, i) => {
            if (
              char === ' ' ||
              char === '/' ||
              char === '·' ||
              char === ':' ||
              char === '[' ||
              char === ']' ||
              char === '-' ||
              char === '+' ||
              char === '&' ||
              char === '(' ||
              char === ')'
            ) {
              return char
            }
            if (i < lockThreshold) return text[i]
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join('')

        setDisplayText(scrambled)
        animRef.current = requestAnimationFrame(step)
      }

      animRef.current = requestAnimationFrame(step)
    } else if (!isHovered && prevHoveredRef.current) {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current)
        animRef.current = null
      }
      setDisplayText(text)
    }

    prevHoveredRef.current = isHovered
  }, [isHovered, text])

  return <span className={className}>{displayText}</span>
}

/**
 * Editorial Skills & Technologies Section
 * Designed to match the exact Swiss typographic layout from the example image:
 * - Two-column asymmetric layout (642px left / 642px right on desktop)
 * - Left column: "SKILLS & TECHNOLOGIES" in monospace uppercase at top, clean whitespace below
 * - Right column: Full-width table with border-t and border-b per row:
 *   - Left: Bold sans uppercase title (e.g. PHP, LARAVEL, RESTFUL APIS)
 *   - Right: Monospace uppercase scope/status (e.g. BACKEND RUNTIME · PHP 8.2+)
 */
export default function Skills() {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative scroll-mt-20 pt-16 sm:pt-24 lg:pt-36 pb-16 sm:pb-24 lg:pb-36 bg-white"
    >
      <Container>
        {/* Two-Column Grid matching Signal-A & Figma spec: 642px + 20px gap + 642px */}
        <div className="w-full border-t border-black flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-[20px]">
          {/* Left Column (Figma width: 642px): Aligned with row 1 under the unified top line */}
          <div className="w-full lg:w-[642px] shrink-0 min-h-[36px] sm:min-h-[50px] lg:h-[54px] flex items-center">
            <h2
              id="skills-heading"
              className="font-mono text-[11px] sm:text-[12px] uppercase tracking-wider text-black select-none"
            >
              SKILLS &amp; TECHNOLOGIES
            </h2>
          </div>

          {/* Right Column (Figma width: 642px): Clean ruled table starting on row 1 directly under top line */}
          <div className="w-full lg:w-[642px] flex flex-col shrink-0">
            {technicalSkillsList.map((skill) => {
              const isHovered = hoveredId === skill.id

              return (
                <div
                  key={skill.id}
                  onMouseEnter={() => setHoveredId(skill.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group w-full h-[38px] xs:h-[42px] sm:h-[48px] lg:h-[54px] border-b border-black flex items-center justify-between gap-3 px-0 sm:px-2 select-none hover:bg-[#fafafa] transition-colors"
                >
                  {/* Left: Bold Title matching example screenshot */}
                  <span className="font-sans font-bold text-[12px] xs:text-[13.5px] sm:text-[15px] lg:text-[17px] tracking-tight uppercase text-black transition-all truncate pr-2">
                    {skill.name}
                  </span>

                  {/* Right: Monospace Uppercase Metadata matching example screenshot */}
                  <span className="font-mono text-[10.5px] xs:text-[11px] sm:text-[11.5px] lg:text-[12px] uppercase tracking-wider text-neutral-600 sm:text-neutral-800 group-hover:text-black text-right shrink-0">
                    <ScrambleText text={skill.detail} isHovered={isHovered} />
                  </span>
                </div>
              )
            })}

            {/* Bottom Link matching Signal-A spec (height: 55px, border-b): ABOUT THE DEVELOPER / RESUME */}
            <div className="w-full border-b border-black">
              <a
                href="#/resume"
                className="w-full h-[55px] flex items-center justify-between font-mono text-[11px] sm:text-[12px] uppercase tracking-wider text-black hover:opacity-60 transition-opacity"
              >
                <span>CURRICULUM VITAE / RESUME</span>
                <span className="text-sm font-sans">→</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
