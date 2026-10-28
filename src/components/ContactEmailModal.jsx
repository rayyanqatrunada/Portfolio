import { useState, useEffect, useRef } from 'react'

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * BackButton:
 * Sits above the top-left of the form container within an overflow-hidden slot.
 * On entrance: Slides up from bottom to top (emerging from behind the form).
 * On exit: Slides down from top to bottom (retracting behind the form).
 * Pure architectural slide transition matching reverse closing behavior (no randomize scramble).
 */
function BackButton({ text = 'RETURN TO PORTFOLIO', onClick, isVisible }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-2 font-mono text-[11px] sm:text-[12px] uppercase tracking-wider text-neutral-600 hover:text-black cursor-pointer transition-all select-none ${
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto duration-[360ms] ease-[cubic-bezier(0.16,1,0.3,1)]'
          : 'translate-y-10 opacity-0 pointer-events-none duration-[260ms] ease-[cubic-bezier(0.4,0,0.2,1)]'
      }`}
      aria-label="Close contact modal and return to portfolio"
    >
      <span className="font-sans font-medium text-black">←</span>
      <span className="tabular-nums group-hover:underline underline-offset-4">
        {text}
      </span>
    </button>
  )
}

/**
 * ContactEmailModal:
 * Direct in-web official email transmission modal matching user's exact animation sequence:
 *
 * 1. Open Transition:
 *    - Random white squares rise from bottom to top until screen is 100% solid white.
 *    - Form container appears at center, expanding from top-left into full form.
 *    - Back button appears above the top-left of the form with letter-by-letter randomize scramble.
 *
 * 2. Close Transition:
 *    - Back button slides down and hides behind the form container.
 *    - Form container shrinks back to top-left.
 *    - Random white squares dissolve from bottom to top revealing underlying page.
 *
 * 3. Backend:
 *    - Sends payload to /api/contact (Vercel Serverless Function via Resend).
 */
export default function ContactEmailModal() {
  // Stages: 'idle' | 'covering' | 'expanding' | 'open' | 'closing_button' | 'closing_form' | 'uncovering'
  const [stage, setStage] = useState('idle')

  // Form inputs state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Backend Architecture & Systems',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const canvasRef = useRef(null)
  const animRef = useRef(null)

  // Listen for global open-contact-modal events & mailto clicks
  useEffect(() => {
    const handleOpenModal = (e) => {
      if (e.detail?.subject) {
        setFormData((prev) => ({ ...prev, subject: e.detail.subject }))
      }
      setSubmitSuccess(false)
      setErrorMessage('')
      setStage('covering')
    }

    // Intercept mailto clicks anywhere on the page
    const handleDocumentClick = (e) => {
      const link = e.target.closest('a[href^="mailto:"]')
      if (link && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        handleOpenModal({ detail: {} })
      }
    }

    window.addEventListener('open-contact-modal', handleOpenModal)
    document.addEventListener('click', handleDocumentClick)

    return () => {
      window.removeEventListener('open-contact-modal', handleOpenModal)
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  // Canvas animation controller
  useEffect(() => {
    if (stage !== 'covering' && stage !== 'uncovering') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = window.innerWidth
    const h = window.innerHeight

    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)

    const targetTileSize = w < 640 ? 44 : w < 1024 ? 54 : 64
    const cols = Math.max(6, Math.ceil(w / targetTileSize))
    const rows = Math.max(6, Math.ceil(h / targetTileSize))
    const tileW = w / cols
    const tileH = h / rows
    const totalTiles = cols * rows

    const jitters = new Float32Array(totalTiles)
    for (let i = 0; i < totalTiles; i++) {
      jitters[i] = Math.random()
    }

    if (stage === 'covering') {
      // === PHASE 1: FILL SCREEN WITH WHITE SQUARES ===
      const DURATION_IN = 560
      const startTime = performance.now()

      const frameCover = (now) => {
        const elapsed = now - startTime
        ctx.clearRect(0, 0, w, h)
        ctx.fillStyle = '#ffffff'

        if (elapsed < DURATION_IN) {
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
          animRef.current = requestAnimationFrame(frameCover)
        } else {
          // Screen 100% solid white!
          ctx.fillRect(0, 0, w, h)
          animRef.current = null
          // Architectural pause on solid white before starting vertical line draw
          setTimeout(() => {
            setStage('line_drawing')
            // Line draws downward from top-left (480ms) + landing pause (90ms) = 570ms
            setTimeout(() => {
              setStage('expanding_right')
              // Line sweeps right and unveils form in-place (620ms) + settle pause (100ms) = 720ms
              setTimeout(() => {
                setStage('open')
              }, 720)
            }, 570)
          }, 200)
        }
      }

      animRef.current = requestAnimationFrame(frameCover)
    } else if (stage === 'uncovering') {
      // === PHASE 2: CLEAR WHITE SQUARES FROM BOTTOM TO TOP ===
      const DURATION_OUT = 540
      const startTime = performance.now()

      const frameUncover = (now) => {
        const elapsed = now - startTime
        ctx.clearRect(0, 0, w, h)
        ctx.fillStyle = '#ffffff'

        if (elapsed < DURATION_OUT) {
          const cp = elapsed / DURATION_OUT
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
                ctx.fillRect(x - 0.5, y - 0.5, tileW + 1, tileH + 1)
              } else if (cp < tileEnd) {
                const localP = (cp - tileStart) / tileDuration
                const ease = easeOutCubic(localP)
                const currentY = y - ease * tileH * 1.3
                const currentH = tileH * Math.max(0, 1 - ease)
                const currentW = tileW * Math.max(0, 1 - ease * 0.2)
                const currentX = x + (tileW - currentW) / 2
                ctx.fillRect(currentX - 0.5, currentY, currentW + 1, currentH + 0.5)
              }
            }
          }
          animRef.current = requestAnimationFrame(frameUncover)
        } else {
          ctx.clearRect(0, 0, w, h)
          animRef.current = null
          setStage('idle')
        }
      }

      animRef.current = requestAnimationFrame(frameUncover)
    }

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current)
        animRef.current = null
      }
    }
  }, [stage])

  // Handle closing sequence (reverse):
  // 1. Button slides down behind form (260ms)
  // 2. Line sweeps back to the left, wiping the form content (520ms)
  // 3. Line shrinks back up to top-left (380ms)
  // 4. Deliberate pause on solid white (150ms)
  // 5. White squares dissolve from bottom to top (540ms)
  const handleClose = () => {
    if (stage !== 'open') return

    setStage('closing_button')
    setTimeout(() => {
      setStage('collapsing_left')
      setTimeout(() => {
        setStage('shrinking_line')
        setTimeout(() => {
          setTimeout(() => {
            setStage('uncovering')
          }, 150)
        }, 380)
      }, 520)
    }, 260)
  }

  // Support Escape key to trigger graceful close
  useEffect(() => {
    if (stage !== 'open') return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [stage])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch transmission.')
      }

      setSubmitSuccess(true)
    } catch (err) {
      setErrorMessage(err.message || 'Transmission failed. Please check network.')
    } finally {
      setSubmitting(false)
    }
  }

  if (stage === 'idle') return null

  const isFormExpanded = stage === 'expanding_right' || stage === 'open' || stage === 'closing_button'
  const isExpanding = stage === 'expanding_right'
  const isCollapsing = stage === 'collapsing_left'

  return (
    <div
      className="fixed inset-0 z-[99998] flex items-center justify-center p-4 sm:p-6 selection:bg-black selection:text-white"
      role="dialog"
      aria-modal="true"
      aria-label="Direct Email Inquiry Transmission"
    >
      {/* 1. Background Canvas for random pixel curtain */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Centered Form Stage */}
      <div className="relative z-10 w-full max-w-[580px] flex flex-col items-start">
        {/* Top-Left Action Bar: Sits above the form with overflow mask */}
        <div className="w-full h-[32px] overflow-hidden flex items-center mb-2">
          <BackButton
            text="RETURN TO PORTFOLIO"
            onClick={handleClose}
            isVisible={stage === 'open'}
          />
        </div>

        {/* Form Frame & Unveiling Stage */}
        <div className="relative w-full">
          {/* Line 1: Left Vertical Line (draws downward from top-left, shrinks upward on reverse) */}
          <div
            className="absolute top-0 bottom-0 left-0 w-[1px] bg-black pointer-events-none z-20 origin-top"
            style={{
              transform:
                stage === 'line_drawing' ||
                stage === 'expanding_right' ||
                stage === 'open' ||
                stage === 'closing_button' ||
                stage === 'collapsing_left'
                  ? 'scaleY(1)'
                  : 'scaleY(0)',
              opacity:
                stage === 'idle' || stage === 'covering' || stage === 'uncovering'
                  ? 0
                  : 1,
              transition:
                stage === 'line_drawing'
                  ? 'transform 480ms cubic-bezier(0.16, 1, 0.3, 1), opacity 80ms ease-out'
                  : stage === 'shrinking_line'
                  ? 'transform 380ms cubic-bezier(0.4, 0, 0.2, 1)'
                  : 'none',
            }}
            aria-hidden="true"
          />

          {/* Line 2: Leading Edge Vertical Line (sweeps right to reveal form, sweeps left on reverse) */}
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-black pointer-events-none z-20"
            style={{
              left: isFormExpanded ? 'calc(100% - 1px)' : '0px',
              opacity:
                stage === 'expanding_right' ||
                stage === 'open' ||
                stage === 'closing_button' ||
                stage === 'collapsing_left'
                  ? 1
                  : 0,
              transition: isCollapsing
                ? 'left 520ms cubic-bezier(0.4, 0, 0.2, 1)'
                : isExpanding
                ? 'left 620ms cubic-bezier(0.16, 1, 0.3, 1), opacity 60ms linear'
                : 'none',
            }}
            aria-hidden="true"
          />

          {/* Form Container: Content is static in-place, unveiled as box sweeps to the right */}
          <div
            className={`w-full bg-white border border-black select-auto transition-shadow ${
              stage === 'open'
                ? 'shadow-[0_24px_70px_-20px_rgba(0,0,0,0.18)] duration-300'
                : 'shadow-none'
            }`}
            style={{
              clipPath: isFormExpanded
                ? 'inset(0 0% 0 0)'
                : 'inset(0 100% 0 0)',
              transition: isCollapsing
                ? 'clip-path 520ms cubic-bezier(0.4, 0, 0.2, 1)'
                : isExpanding
                ? 'clip-path 620ms cubic-bezier(0.16, 1, 0.3, 1)'
                : 'none',
            }}
          >
            {/* Header Strip */}
            <div className="border-b border-black px-5 sm:px-7 py-3.5 sm:py-4 flex items-center justify-between bg-white">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-neutral-500">
                  RAYY.DEV · DIRECT INQUIRY
                </span>
                <h2 className="font-sans font-bold text-[15px] sm:text-[16px] uppercase tracking-tight text-black mt-0.5">
                  OFFICIAL TRANSMISSION
                </h2>
              </div>
            </div>

            {submitSuccess ? (
              /* Success State Confirmation */
              <div className="p-6 sm:p-8 flex flex-col items-start gap-4 bg-white">
                <div className="font-mono text-[11px] uppercase tracking-widest text-black flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-black" />
                  <span>TRANSMISSION DISPATCHED</span>
                </div>
                <h3 className="font-sans text-[20px] sm:text-[22px] font-bold uppercase tracking-tight text-black leading-snug">
                  Your message has been delivered to Rayyan Qatrunada.
                </h3>
                <p className="font-mono text-[12px] sm:text-[13px] text-neutral-600 leading-relaxed">
                  Destination: <strong className="text-black">rayyanqatrunada3@gmail.com</strong>
                  <br />
                  A direct technical response will be routed to your email address (
                  <span className="text-black font-semibold">{formData.email}</span>).
                </p>

                <div className="pt-4 border-t border-black w-full flex justify-end">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="font-mono text-[12px] uppercase tracking-wider px-4 py-2 bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    [ RETURN TO PORTFOLIO ↗ ]
                  </button>
                </div>
              </div>
            ) : (
              /* Interactive Form Body */
              <form onSubmit={handleSubmit} className="p-5 sm:p-7 flex flex-col gap-4 sm:gap-5 bg-white">
                {errorMessage && (
                  <div className="p-2.5 bg-neutral-100 border-l-2 border-black font-mono text-[11px] uppercase text-black">
                    ERROR: {errorMessage}
                  </div>
                )}

                {/* Name Field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-wider text-neutral-600"
                  >
                    [ 01 ] SENDER NAME / ORGANIZATION *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan / Engineering Lead"
                    className="w-full h-[40px] px-3 border border-black bg-white font-mono text-[12px] sm:text-[13px] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-email"
                    className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-wider text-neutral-600"
                  >
                    [ 02 ] OFFICIAL EMAIL ADDRESS *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full h-[40px] px-3 border border-black bg-white font-mono text-[12px] sm:text-[13px] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Subject Selector */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-wider text-neutral-600"
                  >
                    [ 03 ] INQUIRY TOPIC / SCOPE
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full h-[40px] px-3 border border-black bg-white font-mono text-[12px] sm:text-[13px] text-black focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
                  >
                    <option value="Backend Architecture & Systems">Backend Architecture & Systems</option>
                    <option value="RESTful API Engineering & Webhooks">RESTful API Engineering & Webhooks</option>
                    <option value="Database Design & 3NF Normalization">Database Design & 3NF Normalization</option>
                    <option value="Project Collaboration / Full-time Role">Project Collaboration / Full-time Role</option>
                    <option value="General Technical Consultation">General Technical Consultation</option>
                  </select>
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-wider text-neutral-600"
                  >
                    [ 04 ] MESSAGE SPECIFICATION *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe technical objectives, system requirements, or scope..."
                    className="w-full p-3 border border-black bg-white font-mono text-[12px] sm:text-[13px] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black resize-none"
                  />
                </div>

                {/* Submit Action Bar */}
                <div className="pt-2 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase text-neutral-500">
                    DIRECT DISPATCH → GMAIL INBOX
                  </span>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto h-[42px] px-6 bg-black text-white font-mono text-[12px] uppercase tracking-wider hover:bg-neutral-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 cursor-pointer select-none"
                  >
                    {submitting ? (
                      <span>TRANSMITTING...</span>
                    ) : (
                      <>
                        <span>TRANSMIT MESSAGE</span>
                        <span>↗</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
