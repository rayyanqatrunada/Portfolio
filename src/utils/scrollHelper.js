/**
 * scrollToSection Helper:
 * Accurately scrolls to a target section on the home page with consistent,
 * editorial breathing room directly beneath the sticky navbar.
 *
 * Automatically finds the first visible heading/content container,
 * ignoring display:none elements (e.g. responsive mobile/desktop variants).
 */
export function scrollToSection(sectionId, behavior = 'smooth') {
  if (!sectionId || sectionId === 'home') {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior,
    })
    return
  }

  const section = document.getElementById(sectionId)
  if (!section) return

  // Search for candidate heading or container elements
  const candidates = section.querySelectorAll(
    'h2, [role="heading"], blockquote, .container, [class*="Container"] > div'
  )

  let focalEl = section
  for (let i = 0; i < candidates.length; i++) {
    const el = candidates[i]
    const rect = el.getBoundingClientRect()
    // Ignore display: none or hidden elements
    if (rect.height > 0 && rect.width > 0 && window.getComputedStyle(el).display !== 'none') {
      focalEl = el
      break
    }
  }

  const isMobile = window.innerWidth < 640
  const navHeight = isMobile ? 56 : 50
  // Refined 24px desktop / 18px mobile breathing room beneath the navbar
  const targetMargin = isMobile ? 18 : 24

  const targetY =
    focalEl.getBoundingClientRect().top + window.scrollY - (navHeight + targetMargin)

  window.scrollTo({
    top: Math.max(0, Math.round(targetY)),
    left: 0,
    behavior,
  })
}
