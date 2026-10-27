import { useEffect, useRef } from 'react'

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * PixelTransitionOverlay:
 * Full-screen canvas overlay executing a high-performance grid transition:
 * Phase 1 (In): Random white squares rise from bottom to top, progressively filling the screen with solid white.
 * Hold: Brief hold at 100% solid white where page route updates cleanly and scroll resets to (0,0).
 * Phase 2 (Out): Random white squares rise from bottom to top and dissolve away, uncovering the new page.
 *
 * Smooth, lightweight (Canvas 2D), zero DOM layout thrashing, 60/120fps.
 */
export default function PixelTransitionOverlay({
  isTransitioning,
  onCovered,
  onComplete,
}) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const isRunningRef = useRef(false)

  // Keep callback refs fresh
  const onCoveredRef = useRef(onCovered)
  onCoveredRef.current = onCovered
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (!isTransitioning || isRunningRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    isRunningRef.current = true

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = window.innerWidth
    const h = window.innerHeight

    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    ctx.scale(dpr, dpr)

    // Calculate grid dimensions
    // Mobile: ~8-10 cols, Desktop: ~16-22 cols
    const targetTileSize = w < 640 ? 44 : w < 1024 ? 54 : 64
    const cols = Math.max(6, Math.ceil(w / targetTileSize))
    const rows = Math.max(6, Math.ceil(h / targetTileSize))
    const tileW = w / cols
    const tileH = h / rows
    const totalTiles = cols * rows

    // Pre-generate randomized jitter for each tile
    const jitters = new Float32Array(totalTiles)
    for (let i = 0; i < totalTiles; i++) {
      jitters[i] = Math.random()
    }

    // Durations tuned for snappy, fluid feel ("smooth dan jangan terlalu lama")
    const DURATION_IN = 360 // Fill with white
    const DURATION_HOLD = 80 // Screen 100% white
    const DURATION_OUT = 380 // Clear white screen

    const startTime = performance.now()
    let coveredCalled = false

    const frame = (now) => {
      const elapsed = now - startTime
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#ffffff'

      if (elapsed < DURATION_IN) {
        // === PHASE 1: FILL SCREEN FROM BOTTOM TO TOP ===
        const p = elapsed / DURATION_IN

        for (let r = 0; r < rows; r++) {
          const bottomRatio = (rows - 1 - r) / Math.max(1, rows - 1)

          for (let c = 0; c < cols; c++) {
            const jitter = jitters[r * cols + c]
            const tileStart = bottomRatio * 0.58 + jitter * 0.26
            const tileDuration = 0.24
            const tileEnd = tileStart + tileDuration

            const x = c * tileW
            const y = r * tileH

            if (p >= tileEnd) {
              ctx.fillRect(x - 0.5, y - 0.5, tileW + 1, tileH + 1)
            } else if (p > tileStart) {
              const localP = (p - tileStart) / tileDuration
              const ease = easeOutCubic(localP)
              const currentY = y + (1 - ease) * tileH * 1.3
              const currentH = tileH * Math.min(1, ease * 1.15)
              ctx.fillRect(x - 0.5, currentY, tileW + 1, currentH + 0.5)
            }
          }
        }
      } else if (elapsed < DURATION_IN + DURATION_HOLD) {
        // === HOLD PHASE: 100% SOLID WHITE ===
        ctx.fillRect(0, 0, w, h)

        if (!coveredCalled) {
          coveredCalled = true
          if (onCoveredRef.current) {
            onCoveredRef.current()
          }
        }
      } else if (elapsed < DURATION_IN + DURATION_HOLD + DURATION_OUT) {
        // === PHASE 2: CLEAR WHITE SCREEN FROM BOTTOM TO TOP ===
        if (!coveredCalled) {
          coveredCalled = true
          if (onCoveredRef.current) {
            onCoveredRef.current()
          }
        }

        const outElapsed = elapsed - (DURATION_IN + DURATION_HOLD)
        const cp = outElapsed / DURATION_OUT

        for (let r = 0; r < rows; r++) {
          const bottomRatio = (rows - 1 - r) / Math.max(1, rows - 1)

          for (let c = 0; c < cols; c++) {
            const jitter = jitters[r * cols + c]
            const tileStart = bottomRatio * 0.58 + jitter * 0.26
            const tileDuration = 0.24
            const tileEnd = tileStart + tileDuration

            const x = c * tileW
            const y = r * tileH

            if (cp <= tileStart) {
              // Not started clearing yet: solid white
              ctx.fillRect(x - 0.5, y - 0.5, tileW + 1, tileH + 1)
            } else if (cp < tileEnd) {
              // Clearing in progress: rising upward & shrinking away
              const localP = (cp - tileStart) / tileDuration
              const ease = easeOutCubic(localP)
              const currentY = y - ease * tileH * 1.3
              const currentH = tileH * Math.max(0, 1 - ease)
              const currentW = tileW * Math.max(0, 1 - ease * 0.2)
              const currentX = x + (tileW - currentW) / 2
              ctx.fillRect(currentX - 0.5, currentY, currentW + 1, currentH + 0.5)
            }
            // Once cp >= tileEnd: completely cleared (transparent)
          }
        }
      } else {
        // === FINISHED ===
        ctx.clearRect(0, 0, w, h)
        isRunningRef.current = false
        animRef.current = null
        if (onCompleteRef.current) {
          onCompleteRef.current()
        }
        return
      }

      animRef.current = requestAnimationFrame(frame)
    }

    animRef.current = requestAnimationFrame(frame)

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current)
        animRef.current = null
      }
      isRunningRef.current = false
    }
  }, [isTransitioning])

  if (!isTransitioning) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[99999] pointer-events-auto select-none"
      aria-hidden="true"
    />
  )
}
