import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import Button from '../components/Button'
import { projectsData } from '../data/projects'
import { profileData } from '../data/portfolioData'

/**
 * Projects Section ("FEATURED PROJECTS"):
 * Two-column desktop grid displaying backend engineering and architecture work.
 */
export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-16 py-16 sm:py-24 bg-white border-b border-neutral-100"
    >
      <Container>
        <SectionHeading
          title="Featured Projects"
          description="Selected backend systems, relational schemas, and application logic built with reliability in mind."
        />

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom CTA Button matching reference image layout */}
        <div className="mt-12 sm:mt-16 text-center">
          <Button
            href={profileData.githubUrl || '#contact'}
            variant="secondary"
            target={profileData.githubUrl?.startsWith('http') ? '_blank' : undefined}
            rel={profileData.githubUrl?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            View More on GitHub
          </Button>
        </div>
      </Container>
    </section>
  )
}
