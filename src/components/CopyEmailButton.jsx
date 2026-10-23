import { useState, useRef, useEffect } from 'react'
import { Copy, Check, AlertCircle } from 'lucide-react'
import { isRealEmail } from '../data/portfolioData'

/**
 * CopyEmailButton Component (Signal-A Editorial Redesign):
 * Copies the verified email address to clipboard with accessible announcements,
 * sharp 0px corners, and monochrome styling.
 */
export default function CopyEmailButton({
  email,
  className = '',
  size = 'sm',
}) {
  const [copyStatus, setCopyStatus] = useState('idle')
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  if (!isRealEmail(email)) {
    return null
  }

  const handleCopy = async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = email
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        textArea.style.left = '-9999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)
        if (!successful) throw new Error('Fallback execCommand failed')
      }

      setCopyStatus('success')
      timerRef.current = setTimeout(() => {
        setCopyStatus('idle')
      }, 2500)
    } catch {
      setCopyStatus('error')
      timerRef.current = setTimeout(() => {
        setCopyStatus('idle')
      }, 3000)
    }
  }

  const sizeClasses =
    size === 'sm'
      ? 'text-xs px-3.5 py-2'
      : 'text-xs sm:text-sm px-5 py-2.5'

  return (
    <div className="relative inline-flex flex-col items-start">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={
          copyStatus === 'success'
            ? 'Email address copied to clipboard'
            : copyStatus === 'error'
            ? 'Failed to copy email, please select manually'
            : `Copy email address ${email} to clipboard`
        }
        className={`inline-flex items-center justify-center gap-2 font-mono uppercase tracking-wider transition-colors duration-150 focus-visible:outline-1 focus-visible:outline-black cursor-pointer ${sizeClasses} ${
          copyStatus === 'success'
            ? 'bg-black text-white border border-black'
            : copyStatus === 'error'
            ? 'bg-neutral-100 text-black border border-neutral-400'
            : 'bg-white text-black border border-black hover:bg-neutral-100 active:bg-neutral-200'
        } ${className}`}
      >
        {copyStatus === 'idle' && (
          <>
            <Copy className="w-3.5 h-3.5 text-neutral-600 shrink-0" aria-hidden="true" />
            <span>Copy Address</span>
          </>
        )}

        {copyStatus === 'success' && (
          <>
            <Check className="w-3.5 h-3.5 text-white shrink-0 stroke-[2.5]" aria-hidden="true" />
            <span>Copied to Clipboard</span>
          </>
        )}

        {copyStatus === 'error' && (
          <>
            <AlertCircle className="w-3.5 h-3.5 text-black shrink-0" aria-hidden="true" />
            <span>Select Manually</span>
          </>
        )}
      </button>

      <span className="sr-only" role="status" aria-live="polite">
        {copyStatus === 'success' && `Email ${email} copied to clipboard.`}
        {copyStatus === 'error' && `Failed to copy ${email}. Please copy manually.`}
      </span>
    </div>
  )
}
