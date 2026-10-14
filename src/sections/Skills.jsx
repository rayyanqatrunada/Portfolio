import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { skillCategories } from '../data/skills'
import { Server, Database, Layout, Terminal, Layers } from 'lucide-react'

// Icon resolver for skill categories
const categoryIcons = {
  Server: Server,
  Database: Database,
  Layout: Layout,
  Terminal: Terminal,
}

/**
 * Skills Section ("TECHNICAL SKILLS"):
 * Responsive 4-column card grid displaying categorized technical capabilities without arbitrary percentages.
 */
export default function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-16 py-16 sm:py-24 bg-white border-b border-neutral-100"
    >
      <Container>
        <SectionHeading
          title="Technical Skills"
          description="Tools, frameworks, and databases utilized in building robust web applications and backend systems."
        />

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat) => {
            const IconComp = categoryIcons[cat.iconName] || Layers

            return (
              <div
                key={cat.id}
                className="flex flex-col bg-white border border-neutral-200 p-5 sm:p-6 rounded-xs transition-colors duration-150 hover:border-neutral-400"
              >
                {/* Category Header with Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xs bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900 shrink-0">
                    <IconComp className="w-5 h-5 stroke-[1.75]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-neutral-900">
                      {cat.category}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-neutral-500 mb-5 leading-relaxed">
                  {cat.description}
                </p>

                {/* Skill Items List */}
                <div className="mt-auto space-y-2">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={`${cat.id}-item-${sIdx}`}
                      className="flex items-center justify-between py-1.5 px-2.5 bg-neutral-50 border border-neutral-200/60 rounded-xs text-xs"
                    >
                      <span className="font-semibold text-neutral-800">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
