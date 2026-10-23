/**
 * Signal-A Minimalist Arrow Icon
 * Matches 678647420591fa3fa98d5609_s-a-arrow-icon.svg from the Figma design spec.
 * Dimensions: 23px x 13px with 1px hairline stroke.
 */
export default function SignalArrow({
  className = '',
  direction = 'right',
}) {
  if (direction === 'left') {
    return (
      <svg
        className={`w-[23px] h-[13px] shrink-0 ${className}`}
        viewBox="0 0 23 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="22" y1="6.5" x2="1" y2="6.5" stroke="currentColor" strokeWidth="1" />
        <path d="M7 1L1.5 6.5L7 12" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
      </svg>
    )
  }

  return (
    <svg
      className={`w-[23px] h-[13px] shrink-0 ${className}`}
      viewBox="0 0 23 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="1" y1="6.5" x2="22" y2="6.5" stroke="currentColor" strokeWidth="1" />
      <path d="M16 1L21.5 6.5L16 12" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
    </svg>
  )
}
