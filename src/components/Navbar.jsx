import { useState, useEffect } from 'react'
import Container from './Container'
import { profileData, navLinks } from '../data/portfolioData'
import { Menu, X } from 'lucide-react'

/**
 * Navbar component matching visual reference:
 * Light gray #F0F0F0 background, uppercase typography, responsive mobile drawer.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-[#F0F0F0]">
      <Container className="flex h-14 sm:h-16 items-center justify-between">
        {/* Logo linking to #home */}
        <a
          href="#home"
          className="text-sm sm:text-base font-black tracking-widest text-neutral-900 uppercase focus-visible:outline-2 focus-visible:outline-neutral-900"
        >
          {profileData.logoText || 'RAYY.DEV'}
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Desktop Navigation"
          className="hidden md:flex items-center gap-8"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-wider text-neutral-700 hover:text-neutral-950 transition-colors py-1 focus-visible:outline-2 focus-visible:outline-neutral-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center p-2 text-neutral-800 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-neutral-900 cursor-pointer"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </Container>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-t border-neutral-200 bg-[#F0F0F0] px-4 py-3 shadow-xs"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={handleLinkClick}
                className="text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:text-neutral-950 py-2 border-b border-neutral-200/60 last:border-b-0 focus-visible:outline-2 focus-visible:outline-neutral-900"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
