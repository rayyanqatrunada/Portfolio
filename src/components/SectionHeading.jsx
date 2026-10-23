/**
 * Minimalist SectionHeading Component matching design reference:
 * Bold heading with signature short black horizontal bar directly beneath.
 */
export default function SectionHeading({
  title,
  eyebrow,
  description,
  align = 'center',
  className = '',
  as: HeadingTag = 'h2',
}) {
  const isCenter = align === 'center'

  return (
    <div
      className={`mb-8 sm:mb-12 ${
        isCenter ? 'text-center' : 'text-left'
      } ${className}`}
    >
      {eyebrow && (
        <p className="mb-2 text-xs font-mono font-medium tracking-[0.2em] text-neutral-500 uppercase">
          {eyebrow}
        </p>
      )}

      <HeadingTag className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 uppercase">
        {title}
      </HeadingTag>

      {/* Signature solid short black line under heading */}
      <div
        className={`w-14 h-[2.5px] bg-black mt-2.5 ${
          isCenter ? 'mx-auto' : ''
        }`}
        aria-hidden="true"
      />

      {description && (
        <p
          className={`mt-4 text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
