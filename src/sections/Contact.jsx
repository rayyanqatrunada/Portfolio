import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import { profileData, isRealEmail, isRealUrl } from '../data/portfolioData'
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons'
import { Mail, ExternalLink } from 'lucide-react'

/**
 * Contact & CTA Section:
 * Features the signature light-gray CTA banner from reference visual,
 * followed by verified, honest contact channels (email, GitHub, LinkedIn).
 */
export default function Contact() {
  const emailValid = isRealEmail(profileData.email)
  const githubValid = isRealUrl(profileData.githubUrl)
  const linkedinValid = isRealUrl(profileData.linkedinUrl)

  return (
    <section id="contact" className="scroll-mt-16 bg-white">
      {/* 1. Signature CTA Banner matching the reference visual */}
      <div className="bg-[#F0F0F0] border-y border-neutral-200 py-14 sm:py-20">
        <Container className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-neutral-900 max-w-2xl mx-auto leading-tight">
            {profileData.ctaHeading}
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
            {profileData.ctaDescription}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {emailValid ? (
              <Button href={`mailto:${profileData.email}`} variant="primary">
                Contact Me
              </Button>
            ) : (
              <Button href="#contact-channels" variant="primary">
                Contact Channels
              </Button>
            )}
            <Button href="#projects" variant="secondary">
              View My Work
            </Button>
          </div>
        </Container>
      </div>

      {/* 2. Direct Contact Channels */}
      <div id="contact-channels" className="py-16 sm:py-24 border-b border-neutral-100">
        <Container>
          <SectionHeading
            title="Get In Touch"
            description="Whether you have an inquiry regarding backend architecture, APIs, or data schemas, feel free to reach out."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Email Channel */}
            <div className="flex flex-col bg-white border border-neutral-200 p-6 rounded-xs transition-colors hover:border-neutral-400">
              <div className="w-10 h-10 rounded-xs bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900 mb-4">
                <Mail className="w-5 h-5 stroke-[1.75]" aria-hidden="true" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                Direct Email
              </h3>
              {emailValid ? (
                <a
                  href={`mailto:${profileData.email}`}
                  className="text-sm font-bold text-neutral-900 hover:text-neutral-600 underline-offset-4 hover:underline break-all"
                >
                  {profileData.email}
                </a>
              ) : (
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-neutral-800 break-all select-all">
                    {profileData.email}
                  </span>
                  <span className="text-[11px] font-medium text-neutral-500 italic">
                    (Placeholder — update in portfolioData.js)
                  </span>
                </div>
              )}
            </div>

            {/* GitHub Channel */}
            <div className="flex flex-col bg-white border border-neutral-200 p-6 rounded-xs transition-colors hover:border-neutral-400">
              <div className="w-10 h-10 rounded-xs bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900 mb-4">
                <GithubIcon className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                GitHub Repository
              </h3>
              {githubValid ? (
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-neutral-900 hover:text-neutral-600 underline-offset-4 hover:underline break-all"
                >
                  View Profile
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </a>
              ) : (
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-neutral-800 break-all">
                    {profileData.githubUrl}
                  </span>
                  <span className="text-[11px] font-medium text-neutral-500 italic">
                    (Placeholder — update in portfolioData.js)
                  </span>
                </div>
              )}
            </div>

            {/* LinkedIn Channel */}
            <div className="flex flex-col bg-white border border-neutral-200 p-6 rounded-xs transition-colors hover:border-neutral-400">
              <div className="w-10 h-10 rounded-xs bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900 mb-4">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                LinkedIn Network
              </h3>
              {linkedinValid ? (
                <a
                  href={profileData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-neutral-900 hover:text-neutral-600 underline-offset-4 hover:underline break-all"
                >
                  Connect Profile
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </a>
              ) : (
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-neutral-800 break-all">
                    {profileData.linkedinUrl}
                  </span>
                  <span className="text-[11px] font-medium text-neutral-500 italic">
                    (Placeholder — update in portfolioData.js)
                  </span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
