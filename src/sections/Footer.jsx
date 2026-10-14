import Container from '../components/Container'
import { profileData, navLinks, isRealEmail, isRealUrl } from '../data/portfolioData'
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons'
import { Mail, ExternalLink } from 'lucide-react'

const currentYear = new Date().getFullYear()

/**
 * Footer Section:
 * Layout matching bottom of visual reference:
 * Left: Brand logo, dark role badge, dynamic copyright.
 * Middle: Quick navigation links to active sections.
 * Right: Verified contact channels with honest fallbacks.
 */
export default function Footer() {
  const emailValid = isRealEmail(profileData.email)
  const githubValid = isRealUrl(profileData.githubUrl)
  const linkedinValid = isRealUrl(profileData.linkedinUrl)

  return (
    <footer className="border-t border-neutral-200 bg-white py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Brand & Subtitle Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a
              href="#home"
              className="text-lg sm:text-xl font-black uppercase tracking-widest text-neutral-900 focus-visible:outline-2 focus-visible:outline-neutral-900"
            >
              {profileData.logoText || 'RAYY.DEV'}
            </a>

            {/* Pill role badge matching reference */}
            <div className="mt-2.5 inline-block bg-neutral-900 text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-xs">
              {profileData.role || 'Backend Developer'}
            </div>

            <p className="mt-4 text-xs text-neutral-500 leading-relaxed max-w-sm">
              Focusing on high-availability web services, structured database schemas, and performant REST APIs.
            </p>

            <p className="mt-6 text-[11px] text-neutral-400">
              © {currentYear} {profileData.name}. All rights reserved.
            </p>
          </div>

          {/* Quick Navigation Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Navigation
            </h4>
            <nav aria-label="Footer Navigation" className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={`footer-${link.id}`}
                  href={link.href}
                  className="text-xs font-medium uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors w-fit focus-visible:outline-2 focus-visible:outline-neutral-900"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Verified Contact Channels Column */}
          <div className="md:col-span-4 flex flex-col items-start">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Connect
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-600 w-full">
              {emailValid ? (
                <a
                  href={`mailto:${profileData.email}`}
                  className="flex items-center gap-2 hover:text-neutral-950 transition-colors"
                >
                  <Mail className="w-4 h-4 text-neutral-800 shrink-0" />
                  <span className="truncate">{profileData.email}</span>
                </a>
              ) : (
                <div className="flex items-center gap-2 text-neutral-500">
                  <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span className="truncate italic">Email: to be configured</span>
                </div>
              )}

              {githubValid ? (
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-neutral-950 transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-neutral-800 shrink-0" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              ) : (
                <div className="flex items-center gap-2 text-neutral-500">
                  <GithubIcon className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span className="italic">GitHub: to be configured</span>
                </div>
              )}

              {linkedinValid ? (
                <a
                  href={profileData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-neutral-950 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-neutral-800 shrink-0" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              ) : (
                <div className="flex items-center gap-2 text-neutral-500">
                  <LinkedinIcon className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span className="italic">LinkedIn: to be configured</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
