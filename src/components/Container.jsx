/**
 * Reusable Container component to constrain max-width, center content,
 * and provide consistent responsive horizontal padding across sections.
 * Configured to the 1360px desktop grid width from the Signal-A design system.
 */
export default function Container({
  children,
  className = '',
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={`relative mx-auto w-full max-w-[1384px] px-4 sm:px-6 md:px-8 lg:px-10 ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
