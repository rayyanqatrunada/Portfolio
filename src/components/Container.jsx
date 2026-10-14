/**
 * Reusable Container component to constrain max-width, center content,
 * and provide consistent responsive horizontal padding across sections.
 */
export default function Container({
  children,
  className = '',
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={`mx-auto w-full max-w-[1140px] px-4 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
