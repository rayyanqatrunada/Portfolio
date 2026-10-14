import { ExternalLink, Lock } from 'lucide-react'
import { GithubIcon } from './SocialIcons'

/**
 * ProjectCard Component:
 * Clean, minimal portfolio card with consistent image aspect ratio,
 * tech stack pills, and strictly verified action links.
 */
export default function ProjectCard({ project }) {
  const hasLiveUrl = Boolean(project.liveUrl)
  const hasRepoUrl = Boolean(project.repoUrl)

  return (
    <article className="flex flex-col bg-white border border-neutral-200 rounded-xs overflow-hidden transition-colors duration-150 hover:border-neutral-400 group">
      {/* Project Image Frame */}
      <div className="relative w-full aspect-[16/10] bg-[#D6D6D6] overflow-hidden border-b border-neutral-200">
        <img
          src={project.image}
          alt={project.imageAlt || `${project.title} screenshot`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {project.category && (
          <span className="absolute top-3 left-3 bg-neutral-900/90 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-xs backdrop-blur-xs">
            {project.category}
          </span>
        )}
      </div>

      {/* Project Content */}
      <div className="flex-1 flex flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            {project.role || 'Backend Developer'}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-base sm:text-lg font-extrabold text-neutral-900 tracking-tight mb-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Technologies used">
          {project.techStack.map((tech, index) => (
            <span
              key={`${project.id}-tech-${index}`}
              className="inline-block px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[11px] font-semibold tracking-wider uppercase border border-neutral-200 rounded-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links or Honest Status */}
        <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            {hasLiveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-neutral-900 hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-neutral-900"
              >
                Live Demo
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {hasRepoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-neutral-900 hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-neutral-900"
              >
                Source Code
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            )}

            {!hasLiveUrl && !hasRepoUrl && (
              <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-neutral-500">
                <Lock className="w-3.5 h-3.5 text-neutral-400" />
                {project.status || 'Internal Project'}
              </span>
            )}
          </div>

          {/* Right status badge */}
          {project.status && (hasLiveUrl || hasRepoUrl) && (
            <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
              {project.status}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
