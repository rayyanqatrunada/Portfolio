import { useEffect, useRef } from 'react'

/**
 * ScrollProgress Component
 * Renders an ultra-slim, high-contrast monochrome progress bar pinned to the bottom border of the navbar.
 * Uses requestAnimationFrame and direct transform: scaleX() manipulation to guarantee 120 FPS
 * performance with zero React re-renders during scrolling.
 */
export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let ticking = false

    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress =
        scrollHeight > 0
          ? Math.min(Math.max(window.scrollY / scrollHeight, 0), 1)
          : 0

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`
        barRef.current.setAttribute(
          'aria-valuenow',
          Math.round(progress * 100).toString()
        )
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateProgress()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[2px] w-full overflow-hidden bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="0"
        className="h-full w-full origin-left bg-gradient-to-r from-neutral-500 via-white to-white transition-transform duration-75 ease-out will-change-transform motion-reduce:transition-none"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
