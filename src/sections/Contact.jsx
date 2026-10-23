import Container from '../components/Container'
import CopyEmailButton from '../components/CopyEmailButton'
import { profileData, isRealEmail, isRealUrl } from '../data/portfolioData'
import { GithubIcon } from '../components/SocialIcons'
import { Mail, ArrowUpRight } from 'lucide-react'

/**
 * Phase 5 — Restrained Editorial Contact Section (Signal-A Inspired)
 * - Clear "CONTACT" label and index
 * - Large concise invitation
 * - One short supporting sentence
 * - Real email action & functional copy button
 * - Real GitHub link
 * - Monochrome layout with thin structural separators
 * - No fake accounts or availability claims
 */
export default function Contact() {
  const emailValid = isRealEmail(profileData.email)
  const githubValid = isRealUrl(profileData.githubUrl)

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-20 py-16 sm:py-24 bg-white border-b border-[#e0e0e0]"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-black mb-12 sm:mb-16">
          <div>
            <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-1.5">
              [ 05 / INQUIRY ]
            </div>
            <h2
              id="contact-heading"
              className="font-serif text-3xl sm:text-5xl md:text-6xl text-black uppercase tracking-tight"
            >
              CONTACT
            </h2>
          </div>

          <div className="flex flex-col md:items-end font-mono text-xs text-neutral-600 uppercase tracking-wider">
            <span>DIRECT INQUIRIES</span>
            <span className="text-neutral-400">JEPARA, ID [GMT+7]</span>
          </div>
        </div>

        {/* Editorial Invitation & Direct Action */}
        <div className="max-w-4xl">
          {/* Large concise invitation */}
          <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-black tracking-tight leading-[1.08]">
            LET’S DISCUSS BACKEND SYSTEMS &amp; NEW PROJECTS.
          </h3>

          {/* One short supporting sentence */}
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
            Whether you have an inquiry regarding database architecture, service boundaries, or potential project collaborations, feel free to reach out.
          </p>

          {/* Thin Separator & Verified Direct Actions */}
          <div className="mt-10 pt-8 sm:mt-12 sm:pt-10 border-t border-[#e0e0e0]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              {/* Primary Email Link & Copy Action */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {emailValid ? (
                  <a
                    href={`mailto:${profileData.email}`}
                    className="group inline-flex items-center gap-2.5 text-lg sm:text-2xl font-serif text-black hover:text-neutral-600 transition-colors focus-visible:outline-1 focus-visible:outline-black"
                    aria-label={`Send direct email to ${profileData.email}`}
                  >
                    <Mail className="w-5 h-5 text-neutral-400 group-hover:text-black transition-colors shrink-0" aria-hidden="true" />
                    <span className="editorial-link">{profileData.email}</span>
                    <ArrowUpRight
                      className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <span className="text-base font-mono text-neutral-800">
                    {profileData.email}
                  </span>
                )}

                {/* Real Copy Email button */}
                {emailValid && (
                  <CopyEmailButton email={profileData.email} size="sm" />
                )}
              </div>

              {/* Real Verified GitHub Link */}
              {githubValid && (
                <div className="flex items-center">
                  <a
                    href={profileData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors duration-150 focus-visible:outline-1 focus-visible:outline-black"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GITHUB PROFILE</span>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
