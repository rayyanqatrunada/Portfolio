/**
 * Reusable Button component with primary, secondary, and link variants.
 * Renders an anchor tag if `href` is provided, otherwise a semantic button tag.
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
    'inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-colors duration-150 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5',
    md: 'text-xs sm:text-sm px-5 py-2.5',
    lg: 'text-sm px-6 py-3',
  }

  const variants = {
    primary:
      'bg-neutral-900 text-white border border-neutral-900 hover:bg-neutral-800 active:bg-neutral-950',
    secondary:
      'bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-100 active:bg-neutral-200',
    link:
      'bg-transparent text-neutral-900 hover:text-neutral-600 underline-offset-4 hover:underline p-0 border-transparent',
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
