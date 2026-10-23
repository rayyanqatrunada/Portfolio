/**
 * Reusable Button component with primary, secondary, dark, white, and link variants.
 * Styled for the clean light wireframe aesthetic from the design reference.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-150 rounded-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

  const sizes = {
    sm: 'text-[11px] px-4 py-1.5',
    md: 'text-xs px-6 py-2.5',
    lg: 'text-xs sm:text-sm px-8 py-3',
  }

  const variants = {
    primary:
      'bg-neutral-300 text-neutral-900 border border-neutral-400/80 hover:bg-neutral-400 active:bg-neutral-400',
    secondary:
      'bg-neutral-200 text-neutral-900 border border-neutral-300 hover:bg-neutral-300 active:bg-neutral-400',
    dark:
      'bg-neutral-900 text-white border border-neutral-900 hover:bg-black active:bg-neutral-800',
    white:
      'bg-white text-neutral-900 border border-transparent hover:bg-neutral-100 active:bg-neutral-200 shadow-xs',
    outline:
      'bg-transparent text-neutral-900 border border-neutral-400 hover:bg-neutral-100 active:bg-neutral-200',
    link:
      'bg-transparent text-neutral-600 hover:text-black underline-offset-4 hover:underline p-0 border-transparent',
  }

  const combinedClasses = `${baseStyles} ${
    variant === 'link' ? '' : sizes[size] || sizes.md
  } ${variants[variant] || variants.primary} ${className}`

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        aria-disabled={disabled ? 'true' : undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
