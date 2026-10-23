import { ArrowUpRight } from 'lucide-react'

/**
 * Clean ProjectCard Component matching PORTFOLIO 2x2 grid in design reference:
 * - Rectangular gray image preview container displaying the real project UI
 * - Bold uppercase project title underneath
 * - Restrained tech summary and modal deep-dive trigger
 */
export default function ProjectCard({
  project,
  onOpenDetails,
}) {
  return (
    <article
      onClick={() => onOpenDetails?.(project)}
      className="group flex flex-col cursor-pointer focus-visible:outline-2 focus-visible:outline-black"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpenDetails?.(project)
        }
      }}
      aria-label={`View details and architecture spec for ${project.title}`}
    >
      {/* Visual Preview Box */}
      <div className="relative w-full aspect-[16/10] bg-[#e5e7eb] border border-neutral-300 group-hover:border-black p-3 sm:p-4 flex items-center justify-center transition-colors">
        <img
          src={project.image}
          alt={project.imageAlt || `${project.title} screenshot`}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
          width={800}
          height={500}
        />
        {/* Subtle hover icon hint */}
        <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white p-1">
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </div>
      </div>

      {/* Title & Metadata Underneath */}
      <div className="mt-3 text-center">
        <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-neutral-900 group-hover:text-black">
          {project.title}
        </h3>
        <p className="mt-1 text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
          {project.techStack.slice(0, 3).join(' · ')}
        </p>
      </div>
    </article>
  )
}
