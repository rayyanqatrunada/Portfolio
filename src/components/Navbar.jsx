import { useState, useEffect, useRef } from 'react'
import { profileData } from '../data/portfolioData'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*+-=[]{}|;:<>'

/**
 * MenuNavItem:
 * Individual menu link styled with the website's signature font-mono uppercase theme.
 * On hover: letters scramble rapidly through glyphs and progressively resolve back to target text.
 */
function MenuNavItem({ item, isActive, onClick }) {
  const [displayText, setDisplayText] = useState(item.label)
  const animRef = useRef(null)

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  const triggerScramble = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current)

    const target = item.label
    const length = target.length
    const startTime = performance.now()
    const DURATION_MS = 320

    const step = (now) => {
      const elapsed = now - startTime
      if (elapsed >= DURATION_MS) {
        setDisplayText(target)
        animRef.current = null
        return
      }

      const progress = elapsed / DURATION_MS
      const lockThreshold =
        progress < 0.25 ? 0 : Math.floor(((progress - 0.25) / 0.75) * length)

      const result = target
        .split('')
        .map((char, i) => {
          if (char === ' ' || char === '↗') return char
          if (i < lockThreshold) return target[i]
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join('')

      setDisplayText(result)
      animRef.current = requestAnimationFrame(step)
    }

    animRef.current = requestAnimationFrame(step)
  }

  const handleMouseLeave = () => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current)
      animRef.current = null
    }
    setDisplayText(item.label)
  }

  return (
    <a
      href={item.href}
      target={item.isExternal ? '_blank' : undefined}
      rel={item.isExternal ? 'noopener noreferrer' : undefined}
      onClick={(e) => onClick(item.href, e)}
      onMouseEnter={triggerScramble}
      onMouseLeave={handleMouseLeave}
      onFocus={triggerScramble}
      onBlur={handleMouseLeave}
      className={`h-[23px] flex items-center justify-end font-mono text-[11px] sm:text-[12px] uppercase tracking-wider transition-colors duration-150 select-none ${
        isActive
          ? 'text-black font-semibold'
          : 'text-[#24363F]/75 hover:text-black'
      }`}
    >
      <span className="tabular-nums">{displayText}</span>
    </a>
  )
}

/**
 * Editorial Navbar matching user's refinement:
 * - Ultra-compact height (50px closed / 148px open)
 * - Zero bottom border (garis hitam di bawah navbar dihilangkan)
 * - Theme-consistent typography: font-mono uppercase throughout
 * - Live GMT clock shifted close to the menu button for balanced proportion
 * - Hover randomize scramble strictly on the menu items (hanya isi menu)
 * - Smooth, unforced two-phase menu glide and height expansion
 */
export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [gmtTime, setGmtTime] = useState('')
  // Animation states: 'closed' | 'sliding_to_clock' | 'open' | 'shrinking' | 'sliding_to_edge'
  const [animStep, setAnimStep] = useState('closed')
  const [slideDistance, setSlideDistance] = useState(122)

  const navRef = useRef(null)
  const timer1Ref = useRef(null)
  const timer2Ref = useRef(null)

  // Clear animation timers safely
  const clearTimers = () => {
    if (timer1Ref.current) clearTimeout(timer1Ref.current)
    if (timer2Ref.current) clearTimeout(timer2Ref.current)
    timer1Ref.current = null
    timer2Ref.current = null
  }

  // Live clock formatted for Asia/Jakarta (GMT+7)
  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date()
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Jakarta',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
        const parts = formatter.formatToParts(now)
        const hour = parts.find((p) => p.type === 'hour')?.value || '12'
        const minute = parts.find((p) => p.type === 'minute')?.value || '00'
        const dayPeriod = (parts.find((p) => p.type === 'dayPeriod')?.value || 'am').toUpperCase()
        setGmtTime(`GMT+7 ${hour}:${minute} ${dayPeriod}`)
      } catch {
        const now = new Date()
        const h = now.getHours()
        const m = String(now.getMinutes()).padStart(2, '0')
        const ampm = h >= 12 ? 'PM' : 'AM'
        const h12 = h % 12 || 12
        setGmtTime(`GMT+7 ${h12}:${m} ${ampm}`)
      }
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  // Responsive slide distance (122px on desktop, 110px on small mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlideDistance(110)
      } else {
        setSlideDistance(122)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Hash route tracking for activeSection ('resume' or 'projects')
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      if (hash === '#/resume' || hash === '#resume') {
        setActiveSection('resume')
      } else if (hash.includes('project')) {
        setActiveSection('projects')
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // Active section intersection observer
  useEffect(() => {
    const hash = window.location.hash
    if (hash === '#/resume' || hash === '#resume' || hash.includes('project')) {
      return
    }

    const sectionIds = ['home', 'projects', 'about', 'statement', 'skills']
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          )
          setActiveSection(topEntry.target.id)
        }
      },
      {
        rootMargin: '-15% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const openMenu = () => {
    clearTimers()
    // Step 1: Slide button smoothly to the left beside the clock (normal size 24px)
    setAnimStep('sliding_to_clock')
    timer1Ref.current = setTimeout(() => {
      // Step 2: Once beside the clock, expand height to 120px & show links
      setAnimStep('open')
    }, 420)
  }

  const closeMenu = () => {
    clearTimers()
    // Step 1: Shrink height back to 24px & hide links
    setAnimStep('shrinking')
    timer1Ref.current = setTimeout(() => {
      // Step 2: Slide button smoothly back to far right
      setAnimStep('sliding_to_edge')
      timer2Ref.current = setTimeout(() => {
        setAnimStep('closed')
      }, 400)
    }, 300)
  }

  // Close menu on click outside or Escape key
  useEffect(() => {
    if (animStep === 'closed') return

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        closeMenu()
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [animStep])

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimers()
  }, [])

  const handleToggle = () => {
    if (animStep === 'closed' || animStep === 'sliding_to_edge') {
      openMenu()
    } else {
      closeMenu()
    }
  }

  const handleLinkClick = (href, e) => {
    closeMenu()
    if (href === '#/resume' || href === '#resume') {
      if (e) e.preventDefault()
      window.location.hash = '#/resume'
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (href.startsWith('#')) {
      const id = href.replace('#', '')
      if (id === 'home') {
        if (window.location.hash.includes('project') || window.location.hash.includes('resume')) {
          window.location.hash = '#home'
        } else {
          if (e) e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } else {
        if (window.location.hash.includes('project') || window.location.hash.includes('resume')) {
          window.location.hash = href
        } else {
          const el = document.getElementById(id)
          if (el) {
            if (e) e.preventDefault()
            el.scrollIntoView({ behavior: 'smooth' })
          } else {
            window.location.hash = href
          }
        }
      }
    }
  }

  // Visual flags derived from animation step
  const isShifted =
    animStep === 'sliding_to_clock' ||
    animStep === 'open' ||
    animStep === 'shrinking'
  const isExpanded = animStep === 'open'
  const buttonLabel = isExpanded ? 'close' : 'menu'
  const showLinks = isExpanded

  const navItems = [
    { id: 'home', label: 'HOME', href: '#home' },
    { id: 'projects', label: 'MY PROJECT', href: '#projects' },
    { id: 'statement', label: 'PHILOSOPHY', href: '#statement' },
    { id: 'skills', label: 'SKILLS', href: '#skills' },
    {
      id: 'resume',
      label: 'RESUME',
      href: '#/resume',
    },
  ]

  return (
    <header className="no-print sticky top-0 z-50 w-full h-[50px]">
      <div
        ref={navRef}
        className={`absolute top-0 left-0 w-full bg-[#FDFDFD] select-none transition-[height,box-shadow] duration-[340ms] ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden ${
          isExpanded ? 'shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06)]' : ''
        }`}
        style={{ height: isExpanded ? '148px' : '50px' }}
      >
        <div className="relative mx-auto w-full h-full max-w-[1736px] px-6 sm:px-8 flex items-start justify-between pt-[13px]">
          {/* Left: Pure text logo without icon */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick('#home', e)}
            className="flex items-center h-[24px] text-[#24363F] hover:opacity-70 transition-opacity shrink-0"
            aria-label="Backend Developer - Home"
          >
            <span className="font-mono text-[11px] sm:text-[12px] font-medium tracking-widest uppercase">
              BACKEND DEVELOPER
            </span>
          </a>

          {/* Center: Tech by Rayy */}
          <div className="hidden md:flex items-center justify-center h-[24px] font-mono text-[11px] sm:text-[12px] uppercase tracking-wider text-[#24363F]/65 select-none absolute left-1/2 -translate-x-1/2 top-[13px]">
            TECH BY RAYY
          </div>

          {/* Right: GMT Clock & Animated Menu Stage */}
          <div className="flex items-start gap-3 sm:gap-4 shrink-0">
            {/* Live GMT Clock — shifted close to menu button for balanced proportion */}
            <div className="hidden sm:flex items-center h-[24px] font-mono text-[11px] sm:text-[12px] uppercase tracking-wider text-[#24363F]/65 select-none shrink-0">
              {gmtTime || 'GMT+7 1:25 AM'}
            </div>

            {/* Interactive Menu Stage */}
            <div className="relative w-[162px] sm:w-[174px] h-[120px] pointer-events-auto">
              {/* The Animated Button */}
              <button
                type="button"
                onClick={handleToggle}
                aria-expanded={isExpanded}
                aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                className="absolute top-0 left-0 w-[48px] sm:w-[52px] bg-[#24363F]/[0.08] hover:bg-[#24363F]/[0.14] text-[#24363F] flex items-center justify-center cursor-pointer select-none z-20"
                style={{
                  height: isExpanded ? '120px' : '24px',
                  transform: isShifted
                    ? 'translateX(0)'
                    : `translateX(${slideDistance}px)`,
                  transition:
                    'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), height 340ms cubic-bezier(0.22, 1, 0.36, 1), background-color 200ms ease',
                }}
              >
                <span className="font-mono text-[11px] sm:text-[12px] lowercase leading-[20px] tracking-normal transition-opacity duration-200">
                  {buttonLabel}
                </span>
              </button>

              {/* The Menu Links with Hover Scramble Randomize */}
              <nav
                aria-label="Navigation Links"
                className="absolute top-0 right-0 w-[112px] sm:w-[122px] h-[120px] flex flex-col items-end justify-between z-10"
                style={{
                  opacity: showLinks ? 1 : 0,
                  transform: showLinks ? 'translateX(0)' : 'translateX(6px)',
                  pointerEvents: showLinks ? 'auto' : 'none',
                  transition:
                    'opacity 260ms ease, transform 280ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {navItems.map((item) => (
                  <MenuNavItem
                    key={item.id}
                    item={item}
                    isActive={activeSection === item.id}
                    onClick={handleLinkClick}
                  />
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
