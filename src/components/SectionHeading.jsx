/**
 * SectionHeading component matching the visual reference:
 * Bold heading, optional eyebrow/description, and signature short horizontal accent line.
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
        <p className="mb-2 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
          {eyebrow}
        </p>
      )}

      <HeadingTag className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 uppercase">
        {title}
      </HeadingTag>

      {/* Decorative short horizontal line directly beneath the heading */}
      <div
        className={`mt-2.5 h-[2px] w-12 bg-neutral-900 ${
          isCenter ? 'mx-auto' : ''
        }`}
        aria-hidden="true"
      />

      {description && (
        <p
          className={`mt-4 text-sm sm:text-base text-neutral-600 max-w-2xl ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
