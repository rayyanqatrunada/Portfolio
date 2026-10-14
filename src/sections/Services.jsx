import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { servicesData } from '../data/portfolioData'
import { Server, Cpu, Database } from 'lucide-react'

// Icon mapping helper
const iconMap = {
  Server: Server,
  Cpu: Cpu,
  Database: Database,
}

/**
 * Services Section ("WHAT I DO"):
 * Displays 3 cards matching the reference layout:
 * - Upper visual/icon placeholder surface (#D6D6D6)
 * - Bold uppercase title
 * - Concise technical description
 */
export default function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-16 py-16 sm:py-24 bg-white border-b border-neutral-100"
    >
      <Container>
        <SectionHeading
          title="What I Do"
          description="Specialized backend capabilities built on reliable architecture, secure data management, and clean code."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.iconName] || Server

            return (
              <div
                key={service.id}
                className="flex flex-col bg-white border border-neutral-200 p-5 sm:p-6 rounded-xs transition-colors duration-150 hover:border-neutral-400"
              >
                {/* Visual placeholder surface matching reference image */}
                <div className="w-full aspect-[4/3] bg-[#D6D6D6] rounded-xs flex items-center justify-center text-neutral-800 mb-5">
                  <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-2xs">
                    <IconComponent className="w-6 h-6 stroke-[1.75]" />
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-neutral-900 mb-2">
                  {service.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed flex-1">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
