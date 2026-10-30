import { useState, useEffect, useRef } from 'react'
import Container from '../components/Container'
import ProjectDetailModal from '../components/ProjectDetailModal'
import SignalArrow from '../components/SignalArrow'
import { projectsData } from '../data/projects'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

/**
 * Scramble Text Reveal Hook:
 * - When not hovered: text is completely hidden ('').
 * - When hovered: reveals strictly per character sequentially from left to right:
 *   1. Current character randomizes through glyphs for a few ticks.
 *   2. Previous characters remain locked and never randomize.
 *   3. Subsequent characters are not yet shown.
 *   4. Once current character locks, next character begins randomizing.
 * - When cursor leaves (unhover): text disappears immediately.
 */
function useScrambleReveal(targetText, isHovered) {
  const [scrambleSession, setScrambleSession] = useState({ text: '', id: 0 })
  const [prevHovered, setPrevHovered] = useState(isHovered)
  const animRef = useRef(null)

  // Reset state during render when isHovered changes: sets text to '' and increments session id
  // This guarantees absolutely ZERO flash of complete text when hovering starts
  if (isHovered !== prevHovered) {
    setPrevHovered(isHovered)
    setScrambleSession((prev) => ({
      text: '',
      id: isHovered ? prev.id + 1 : prev.id,
    }))
  }

  useEffect(() => {
    if (!isHovered) {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      return
    }

    const currentSessionId = scrambleSession.id
    const length = targetText.length
    if (length === 0) return

    let currentCharIndex = 0
    let currentTick = 0
    // 2 ticks per character for clean, visible scramble reveal (~33ms per character at 60fps)
    const TICKS_PER_CHAR = 2

    const animate = () => {
      if (currentCharIndex >= length) {
        setScrambleSession((prev) =>
          prev.id === currentSessionId ? { ...prev, text: targetText } : prev
        )
        return
      }

      // If current character is a space, advance immediately
      if (targetText[currentCharIndex] === ' ') {
        currentCharIndex++
        currentTick = 0
        setScrambleSession((prev) =>
          prev.id === currentSessionId
            ? { ...prev, text: targetText.slice(0, currentCharIndex) }
            : prev
        )
        animRef.current = requestAnimationFrame(animate)
        return
      }

      // Previous characters are locked; only the current character randomizes
      const lockedPart = targetText.slice(0, currentCharIndex)
      const randomChar = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      setScrambleSession((prev) =>
        prev.id === currentSessionId
          ? { ...prev, text: lockedPart + randomChar }
          : prev
      )

      currentTick++
      if (currentTick >= TICKS_PER_CHAR) {
        currentCharIndex++
        currentTick = 0
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [isHovered, scrambleSession.id, targetText])

  return isHovered ? scrambleSession.text : ''
}

/**
 * ScrambleSpan Component:
 * - Small supporting text scramble: starts with full text visible (never starts from empty).
 * - When that specific row is hovered, characters randomize in-place briefly (~260ms),
 *   then lock back cleanly to normal text.
 * - Only runs for the hovered row.
 */
function ScrambleSpan({ text, isHovered, className = '' }) {
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
      const DURATION_MS = 420

      const step = (now) => {
        const elapsed = now - startTime
        if (elapsed >= DURATION_MS) {
          setDisplayText(text)
          animRef.current = null
          return
        }

        const progress = elapsed / DURATION_MS
        // First 30% (~126ms): full scramble tumble, then lock progressively
        const lockThreshold =
          progress < 0.3 ? 0 : Math.floor(((progress - 0.3) / 0.7) * length)

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
              char === '+'
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
 * Hook for In-Place Randomize Animation:
 * - Text starts fully visible ("langsung munculkan asset yang perlu dimunculkan").
 * - When triggered (on viewport scroll-in, tap, or hover), characters scramble in-place for ~380ms,
 *   then cleanly lock back to target text ("tetap adakan animasi randomize").
 */
function useRandomizeText(text, isHovered, triggerCount = 0) {
  const [displayText, setDisplayText] = useState(text)
  const animRef = useRef(null)
  const prevTriggerRef = useRef(triggerCount)
  const prevHoveredRef = useRef(isHovered)

  useEffect(() => {
    setDisplayText(text)
  }, [text])

  const runRandomize = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current)

    const startTime = performance.now()
    const length = text.length
    const DURATION_MS = 380

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
            char === '+'
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
  }

  useEffect(() => {
    if (isHovered && !prevHoveredRef.current) {
      runRandomize()
    }
    prevHoveredRef.current = isHovered
  }, [isHovered])

  useEffect(() => {
    if (triggerCount !== prevTriggerRef.current) {
      prevTriggerRef.current = triggerCount
      if (triggerCount > 0) {
        runRandomize()
      }
    }
  }, [triggerCount])

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return displayText
}

/**
 * Individual Project Row matching Signal-A & Figma spec:
 * - Desktop (>= lg): 340px height, 662px left column + 421.33px right column with 3:4 floating cursor follower
 * - Responsive (< lg): Directly renders 3:4 ratio thumbnail asset on right, with visible title & randomize animation
 */
function ProjectRow({
  project,
  index,
  isRowHovered,
  onRowEnter,
  onRowLeave,
  onRowMouseMove,
  onSelect,
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [scrambleTrigger, setScrambleTrigger] = useState(0)
  const articleRef = useRef(null)
  const hasAnimatedOnScrollRef = useRef(false)

  const isHovered = isRowHovered || isFocused
  const targetTitle = project.displayTitle || project.title
  const displayText = useScrambleReveal(targetTitle, isHovered)
  const mobileDisplayText = useRandomizeText(targetTitle, isHovered, scrambleTrigger)
  const formattedIndex = String(index + 1).padStart(2, '0')

  // Trigger randomize animation when row scrolls into view on mobile
  useEffect(() => {
    const el = articleRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedOnScrollRef.current) {
            hasAnimatedOnScrollRef.current = true
            setTimeout(() => {
              setScrambleTrigger((prev) => prev + 1)
            }, index * 90)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  const handleRowClick = () => {
    setScrambleTrigger((prev) => prev + 1)
    onSelect(project)
  }

  const titleFontClasses =
    project.titleFontClass ||
    [
      'font-serif font-light italic tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[96px]',
      'font-mono font-light uppercase tracking-wide text-3xl sm:text-4xl md:text-5xl lg:text-[62px] xl:text-[70px]',
      'font-metal font-normal tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[92px]',
      'font-serif uppercase tracking-normal font-normal text-4xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[96px]',
      'font-sans font-black uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-[66px] xl:text-[74px]',
    ][index % 5]

  const mobileTitleFontClasses =
    project.mobileTitleFontClass ||
    [
      'font-serif font-light italic tracking-tight text-2xl sm:text-3xl md:text-4xl',
      'font-mono font-light uppercase tracking-wide text-xl sm:text-2xl md:text-3xl',
      'font-metal text-2xl sm:text-3xl md:text-4xl',
      'font-serif uppercase tracking-normal font-normal text-2xl sm:text-3xl md:text-4xl',
      'font-sans font-black uppercase tracking-tight text-xl sm:text-2xl md:text-3xl',
    ][index % 5]

  return (
    <article
      ref={articleRef}
      data-project-id={project.id}
      onMouseEnter={(e) => onRowEnter(project, e)}
      onMouseMove={onRowMouseMove}
      onMouseLeave={onRowLeave}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
      role="button"
      onClick={handleRowClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleRowClick()
        }
      }}
      aria-label={`View architectural specifications for ${project.title}`}
      className="group relative border-b border-black transition-colors duration-150 hover:bg-[#fafafa] cursor-pointer lg:hover:cursor-none focus-visible:outline-1 focus-visible:outline-black select-none"
    >
      {/* ================= MOBILE / TABLET RESPONSIVE LAYOUT (< lg) =================
          Exact Signal-A Spec (height: 147.87px):
          - Divider at top (border-b on previous / section border)
          - Top left: Category in 10px mono uppercase font-light
          - Top right: Index (A - 1, A - 2, ...) in 10px mono uppercase font-light
          - Bottom left: Project title in clean 13px-14px uppercase sans font-medium
          - Right: Pinned image thumbnail (99px width x 148px height) with border-l border-black
          - Zero small supporting text clutter (no techStack pills, role tags, or specifications buttons)
          - Randomize animation active on title & category
      */}
      <div className="flex lg:hidden relative w-full h-[148px] justify-between items-stretch">
        {/* Left Column: Category & Index on top, Title on bottom */}
        <div className="flex-1 h-full flex flex-col justify-between py-2.5 pr-3 min-w-0">
          {/* Top Row: Category on left, Index on right */}
          <div className="w-full flex items-center justify-between font-mono text-[10px] text-black uppercase tracking-wider">
            <span className="truncate pr-2 font-light">
              <ScrambleSpan text={project.category} isHovered={isHovered} />
            </span>
            <span className="shrink-0 font-light">
              <ScrambleSpan text={`A - ${index + 1}`} isHovered={isHovered} />
            </span>
          </div>

          {/* Bottom: Clean Uppercase / Stylized Title */}
          <div className="w-full pb-0.5">
            <h3
              className={`${
                project.mobileTitleFontClass || 'font-sans font-medium uppercase text-[13px] sm:text-[14px]'
              } leading-tight text-black tracking-tight truncate`}
            >
              {mobileDisplayText}
            </h3>
          </div>
        </div>

        {/* Right Column: Image Thumbnail with separating space from top & bottom lines */}
        <div className="py-2.5 sm:py-3 shrink-0 flex items-center">
          <div className="w-[94px] sm:w-[102px] h-[128px] overflow-hidden bg-neutral-100 relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* ================= DESKTOP LAYOUT (>= lg) =================
          Exact Figma Spec: 340px height, 662px left column + 421.33px right column,
          and floating 3:4 cursor follower on hover.
      */}
      <div className="hidden lg:flex justify-between items-center h-[340px] w-full">
        {/* Left Column (Figma width: 662px; height: 340px): Index, 100px Scramble Title, Category/Stack */}
        <div className="relative w-[662px] h-[340px] flex flex-col justify-between py-9 shrink-0">
          {/* Top: Index */}
          <div className="relative z-10 font-mono text-[11px] sm:text-[12px] uppercase tracking-widest text-black">
            <ScrambleSpan text={`[ ${formattedIndex} ]`} isHovered={isHovered} />
          </div>

          {/* Center: 100px Typographic Title with Randomized Hover Scramble - Only title sits above image (z-30) */}
          <div
            className={`relative ${
              isHovered ? 'z-30' : 'z-10'
            } my-auto py-2 h-[100px] flex items-center overflow-hidden`}
          >
            <h3
              className={`${titleFontClasses} leading-none text-black select-none transition-opacity duration-150`}
            >
              {displayText ? displayText : <span className="opacity-0">·</span>}
            </h3>
          </div>

          {/* Bottom: Stack & Scope - Stays below image (z-10) */}
          <div className="relative z-10 font-mono text-[11px] sm:text-[12px] text-black uppercase tracking-wider flex items-center gap-2">
            <span>
              <ScrambleSpan text={project.category} isHovered={isHovered} />
            </span>
            <span className="text-neutral-400">/</span>
            <span className="text-neutral-600">
              <ScrambleSpan text={project.techStack.join(' · ')} isHovered={isHovered} />
            </span>
          </div>
        </div>

        {/* Right Column (Figma width: 421.33px; height: 340px): Stays below image (z-10) */}
        <div className="relative z-10 w-[421.33px] h-[340px] flex flex-col justify-between items-end py-9 font-mono text-[11px] sm:text-[12px] uppercase shrink-0">
          {/* Top: Category label on left, 4 lines of metadata on right */}
          <div className="w-full flex justify-between items-start">
            <div className="w-[160px] text-left text-neutral-800 text-[11px] sm:text-[12px] leading-relaxed">
              <ScrambleSpan text={project.category} isHovered={isHovered} />
            </div>

            <div className="space-y-1 text-right text-neutral-600 text-[11px] sm:text-[12px] tracking-wider leading-tight">
              <div className="text-black font-semibold">
                <ScrambleSpan text={project.role} isHovered={isHovered} />
              </div>
              <div>
                <ScrambleSpan text={project.status} isHovered={isHovered} />
              </div>
              <div>
                <ScrambleSpan text="SCHEMA: 3NF NORMALIZED" isHovered={isHovered} />
              </div>
              <div className="text-neutral-400">
                <ScrambleSpan text="2026 ARCHITECTURE" isHovered={isHovered} />
              </div>
            </div>
          </div>

          {/* Bottom: Specifications button with exact SignalArrow */}
          <div className="w-full flex justify-between items-center pt-0">
            <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-widest text-black border-b border-transparent group-hover:border-black transition-colors">
              <ScrambleSpan text="SPECIFICATIONS" isHovered={isHovered} />
            </span>
            <div className="flex items-center gap-2 text-black">
              <span className="text-[10px] sm:text-[11px] text-neutral-400 tracking-wider hidden sm:inline-block">
                <ScrambleSpan text="DETAILS" isHovered={isHovered} />
              </span>
              <SignalArrow className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

/**
 * Case Studies Section matching Figma Spec:
 * - Total section height ~2151px
 * - Heading: 55px height, border-bottom 0.727px solid #000000 across full 1304px
 * - Project list: indented at left: 220.67px (width: 1083.33px)
 * - Bottom link: ALL ARCHIVES & PRODUCTION SYSTEMS (width: 1083.33px, height: 55px)
 * - Hover cursor image follower: each row renders its respective project image with 65% opacity
 */
export default function Projects({ onOpenProject }) {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const followerRef = useRef(null)
  const lastMousePosRef = useRef({ clientX: -1000, clientY: -1000 })
  const hoveredProjectRef = useRef(hoveredProject)
  const selectedProjectRef = useRef(selectedProject)

  useEffect(() => {
    hoveredProjectRef.current = hoveredProject
  }, [hoveredProject])

  useEffect(() => {
    selectedProjectRef.current = selectedProject
  }, [selectedProject])

  const updateFollowerPosition = (x, y) => {
    if (followerRef.current) {
      followerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }
  }

  const handleRowMouseMove = (e) => {
    lastMousePosRef.current = { clientX: e.clientX, clientY: e.clientY }
    updateFollowerPosition(e.clientX, e.clientY)
  }

  const handleRowEnter = (project, e) => {
    lastMousePosRef.current = { clientX: e.clientX, clientY: e.clientY }
    if (followerRef.current) {
      followerRef.current.style.transition = 'none'
      updateFollowerPosition(e.clientX, e.clientY)
      void followerRef.current.offsetHeight
      followerRef.current.style.transition = 'transform 0.08s ease-out'
    }
    setHoveredProject(project)
  }

  const handleRowLeave = (e) => {
    // If moving directly into another project row, let the next row's enter handler handle it
    if (e?.relatedTarget?.closest?.('[data-project-id]')) {
      return
    }
    setHoveredProject(null)
  }

  // Synchronize hover state and image follower position on scroll, wheel, and mouse events
  useEffect(() => {
    let scrollRaf = null

    const checkHoverAtCursor = () => {
      // Only operate on desktop devices with fine hover pointer
      if (typeof window === 'undefined' || window.innerWidth < 1024) return
      if (selectedProjectRef.current) return

      const { clientX, clientY } = lastMousePosRef.current
      if (clientX < 0 || clientY < 0) return

      const el = document.elementFromPoint(clientX, clientY)
      const rowEl = el?.closest ? el.closest('[data-project-id]') : null

      if (rowEl) {
        const projectId = rowEl.getAttribute('data-project-id')
        const matched = projectsData.find((p) => p.id === projectId)
        if (matched) {
          updateFollowerPosition(clientX, clientY)
          if (hoveredProjectRef.current?.id !== matched.id) {
            setHoveredProject(matched)
          }
        }
      } else {
        // Cursor is no longer over any project row: immediately dismiss preview
        if (hoveredProjectRef.current !== null) {
          setHoveredProject(null)
        }
      }
    }

    const scheduleCheck = () => {
      if (scrollRaf) cancelAnimationFrame(scrollRaf)
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null
        checkHoverAtCursor()
      })
    }

    const handleGlobalMouseMove = (e) => {
      lastMousePosRef.current = { clientX: e.clientX, clientY: e.clientY }
    }

    const handleWheel = (e) => {
      lastMousePosRef.current = { clientX: e.clientX, clientY: e.clientY }
      scheduleCheck()
    }

    const handleMouseLeaveWindow = (e) => {
      if (!e.relatedTarget && !e.toElement) {
        setHoveredProject(null)
        lastMousePosRef.current = { clientX: -1000, clientY: -1000 }
      }
    }

    const handleWindowBlur = () => {
      setHoveredProject(null)
      lastMousePosRef.current = { clientX: -1000, clientY: -1000 }
    }

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('scroll', scheduleCheck, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeaveWindow)
    window.addEventListener('blur', handleWindowBlur)

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', scheduleCheck)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
      window.removeEventListener('blur', handleWindowBlur)
      if (scrollRaf) cancelAnimationFrame(scrollRaf)
    }
  }, [])

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative scroll-mt-20 pt-16 sm:pt-24 lg:pt-36 pb-16 sm:pb-24 lg:pb-36 bg-white"
    >
      <Container>
        {/* Section Heading Bar: 55px height with bottom border matching Figma spec */}
        <div className="relative z-10 flex items-center justify-between h-[45px] sm:h-[55px] border-b border-black mb-0">
          <h2
            id="projects-heading"
            className="font-sans text-[15px] sm:text-[17px] uppercase font-normal tracking-tight text-black"
          >
            MY PROJECT
          </h2>

          {/* Mobile Right Label: CASE STUDIES matching Figma spec */}
          <div className="font-mono text-[10px] text-black uppercase tracking-wider block sm:hidden">
            CASE STUDIES
          </div>

          <div className="font-mono text-[11px] sm:text-[12px] text-neutral-500 uppercase tracking-widest hidden sm:block">
            {String(projectsData.length).padStart(2, '0')} ARCHITECTURAL PRODUCTIONS
          </div>
        </div>

        {/* Project List Container — Indented at 220.67px on desktop matching Figma left: 220.67px (width: 1083.33px) */}
        <div
          className="lg:ml-[220.67px] lg:w-[1083.33px]"
          onMouseMove={handleRowMouseMove}
          onMouseLeave={handleRowLeave}
        >
          <div>
            {projectsData.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
                isRowHovered={hoveredProject?.id === project.id}
                onRowEnter={handleRowEnter}
                onRowLeave={handleRowLeave}
                onRowMouseMove={handleRowMouseMove}
                onSelect={(p) => {
                  setHoveredProject(null)
                  if (onOpenProject) {
                    onOpenProject(p)
                  } else {
                    setSelectedProject(p)
                  }
                }}
              />
            ))}
          </div>

          {/* Bottom Link matching Figma: 55px height, border-bottom 0.727px solid #000000 */}
          <div className="relative z-10 min-h-[45px] sm:min-h-[55px] py-3 lg:py-0 border-b border-black flex items-center justify-between font-mono text-[10px] sm:text-[12px] uppercase tracking-wider">
            <a
              href="https://github.com/rayyanqatrunada?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 sm:gap-4 text-black hover:opacity-70 transition-opacity"
            >
              <span>ALL ARCHITECTURAL RELEASES (2026)</span>
              <SignalArrow className="group-hover:translate-x-1 transition-transform" />
            </a>

            <span className="text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-widest hidden sm:inline-block">
              [ HOVER OR TAP TO INSPECT ]
            </span>
          </div>
        </div>
      </Container>

      {/* Floating Project Image Cursor Follower:
          - Layered above row backgrounds and supporting text (z-20 vs text z-10)
          - Beneath active project title (z-20 vs title z-30)
          - Non-blocking (pointer-events: none)
          - 100% opacity when hovered, disappears when unhovered
          - Pre-rendered cross-fade across projects for zero-lag instant swap
          - 3:4 Aspect Ratio per user specification (280px width x 373px height)
          - Desktop only (hidden on touch/mobile)
      */}
      <div
        ref={followerRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-20 hidden lg:block"
        style={{
          transform: 'translate3d(-1000px, -1000px, 0) translate(-50%, -50%)',
          willChange: 'transform',
        }}
      >
        <div
          className="transition-all duration-200 ease-out overflow-hidden border border-black bg-white shadow-2xl relative pointer-events-none"
          style={{
            opacity: hoveredProject && !selectedProject ? 1 : 0,
            transform: hoveredProject && !selectedProject ? 'scale(1)' : 'scale(0.92)',
            width: '280px',
            aspectRatio: '3 / 4',
          }}
        >
          {projectsData.map((p) => (
            <img
              key={p.id}
              src={p.image}
              alt={p.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 pointer-events-none ${
                hoveredProject?.id === p.id ? 'opacity-100' : 'opacity-0'
              }`}
              loading="eager"
            />
          ))}
        </div>
      </div>

      {/* Accessible Specifications Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
