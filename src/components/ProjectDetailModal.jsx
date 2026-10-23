import { useState, useEffect, useRef } from 'react'
import {
  X,
  Layers,
  Database,
  Cpu,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'
import { GithubIcon } from './SocialIcons'

const TABS = [
  { id: 'overview', label: 'Overview & Goals', icon: Cpu },
  { id: 'architecture', label: 'Architecture', icon: Layers },
  { id: 'database', label: 'Database Schema', icon: Database },
  { id: 'decisions', label: 'Decisions & Trade-offs', icon: ShieldCheck },
  { id: 'features', label: 'Verified Capabilities', icon: CheckCircle2 },
]

/**
 * ProjectDetailModal Component (Signal-A Editorial Redesign):
 * Accessible, keyboard-navigable dialog styled under precise monochrome editorial design.
 * Displays verified engineering specifications, architectural decisions, and relational schemas.
 */
export default function ProjectDetailModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('overview')
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)

  const deepDive = project?.deepDive

  // Accessibility: Focus trapping, Escape key, and body scroll lock
  useEffect(() => {
    if (!project) return

    previousFocusRef.current = document.activeElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 50)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus()
      }
    }
  }, [project, onClose])

  if (!project || !deepDive) return null

  const currentTabIndex = TABS.findIndex((t) => t.id === activeTab)
  const nextTab = currentTabIndex < TABS.length - 1 ? TABS[currentTabIndex + 1] : null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Editorial backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div className="relative z-10 w-full h-full sm:h-auto sm:max-h-[90vh] max-w-4xl bg-white border border-black flex flex-col overflow-hidden text-black animate-in fade-in zoom-in-95 duration-150">
        {/* 1. Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#e0e0e0] bg-[#fbfbfb] flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 bg-black text-white">
                  {deepDive.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium uppercase tracking-wider text-neutral-600 bg-white border border-[#e0e0e0] px-2 py-0.5">
                  <span className="w-1.5 h-1.5 bg-black" aria-hidden="true" />
                  {deepDive.status}
                </span>
              </div>
              <h2
                id="modal-project-title"
                className="font-serif text-2xl sm:text-3xl text-black tracking-tight"
              >
                {deepDive.title}
              </h2>
            </div>

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors focus-visible:outline-1 focus-visible:outline-black cursor-pointer"
              aria-label="Close project specifications"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Quick Meta Subbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e0e0e0] text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 uppercase">ROLE:</span>
              <span className="text-black font-semibold">{deepDive.role}</span>
            </div>

            {/* Verified Repo Link if available */}
            {deepDive.repoUrl && (
              <a
                href={deepDive.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-black hover:underline focus-visible:outline-1 focus-visible:outline-black"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Verified Repository</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {/* 2. Structured Tab Navigation */}
        <div className="bg-white border-b border-[#e0e0e0] px-4 sm:px-6 overflow-x-auto scrollbar-none flex gap-1 sm:gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 py-3 px-3 sm:px-4 text-xs font-mono uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-black text-black font-semibold bg-neutral-50'
                    : 'border-transparent text-neutral-500 hover:text-black hover:border-neutral-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* 3. Modal Body Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8 space-y-6">
          {/* TAB 1: OVERVIEW & GOALS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  [ 01 / PROJECT OVERVIEW ]
                </h3>
                <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
                  {deepDive.overview}
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-[#f7f7f7] border border-[#e0e0e0]">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-black mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-black" aria-hidden="true" />
                  PROBLEM STATEMENT &amp; SCOPE
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {deepDive.problemStatement}
                </p>
              </div>

              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  [ 02 / IMPLEMENTATION CONTRIBUTION ]
                </h3>
                <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
                  {deepDive.contribution}
                </p>
              </div>

              {/* Verified Stack Grid */}
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  [ 03 / APPLIED TECHNOLOGIES ]
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {deepDive.verifiedStack.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#f7f7f7] border border-[#e0e0e0] flex flex-col justify-between font-mono"
                    >
                      <span className="text-xs font-bold text-black">{item.name}</span>
                      <span className="text-[10px] uppercase font-medium text-neutral-500 mt-1">
                        {item.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  ARCHITECTURAL PATTERN
                </span>
                <h3 className="text-base sm:text-lg font-bold text-black mt-1">
                  {deepDive.architecture.pattern}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {deepDive.architecture.description}
                </p>
              </div>

              {/* Architectural Highlights */}
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-black mb-3">
                  Key Architectural Decisions
                </h4>
                <div className="space-y-2.5">
                  {deepDive.architecture.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-[#f7f7f7] border border-[#e0e0e0] text-xs sm:text-sm text-neutral-800"
                    >
                      <span className="font-mono text-neutral-500 font-bold shrink-0">
                        0{idx + 1}.
                      </span>
                      <span className="leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DATABASE SCHEMA */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  RELATIONAL DATA MODELING
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {deepDive.database.description}
                </p>
              </div>

              {/* Entity Cards */}
              <div className="space-y-3.5">
                {deepDive.database.entities.map((entity, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#f7f7f7] border border-[#e0e0e0]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-bold text-black uppercase bg-white border border-[#e0e0e0] px-2 py-0.5">
                        TABLE: {entity.name}
                      </span>
                      <span className="font-mono text-[11px] text-neutral-500">
                        {entity.relations}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 mb-3 leading-relaxed">{entity.description}</p>

                    {/* Key Columns */}
                    <div className="flex flex-wrap gap-1.5">
                      {entity.fields.map((field, fIdx) => (
                        <span
                          key={fIdx}
                          className="font-mono text-[10px] sm:text-[11px] bg-white border border-[#e0e0e0] px-2 py-0.5 text-neutral-800"
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ENGINEERING DECISIONS & CHALLENGES */}
          {activeTab === 'decisions' && (
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                APPLIED BACKEND SOLUTIONS &amp; TRADE-OFFS
              </h3>

              <div className="space-y-4">
                {deepDive.challenges.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 bg-[#f7f7f7] border border-[#e0e0e0] space-y-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 bg-black text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-black uppercase tracking-tight">
                        {item.challenge}
                      </h4>
                    </div>

                    <div className="pl-7 space-y-2 text-xs sm:text-sm">
                      <div className="p-3 bg-white border border-[#e0e0e0]">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                          Applied Solution
                        </span>
                        <p className="text-neutral-800 leading-relaxed">{item.solution}</p>
                      </div>

                      <div className="p-2.5 bg-neutral-100 border border-[#e0e0e0]">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-0.5">
                          Direct Impact
                        </span>
                        <p className="text-neutral-700 leading-relaxed text-xs">{item.impact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: KEY COMPLETED FEATURES & AUDIT TRANSPARENCY */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  GENUINELY IMPLEMENTED CAPABILITIES
                </h3>
                <div className="space-y-2">
                  {deepDive.keyFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-[#f7f7f7] border border-[#e0e0e0] text-xs sm:text-sm text-neutral-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audit Transparency Callout */}
              <div className="p-4 bg-[#f7f7f7] border border-[#e0e0e0]">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-black" aria-hidden="true" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                    Source Verification &amp; Audit Note
                  </span>
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed mb-2">
                  {deepDive.verification.notes}
                </p>
                <div className="text-[11px] font-mono text-neutral-500">
                  Source: {deepDive.verification.source}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Modal Footer Navigation */}
        <div className="p-4 sm:p-5 border-t border-[#e0e0e0] bg-[#fbfbfb] flex flex-wrap items-center justify-between gap-3">
          {nextTab ? (
            <button
              type="button"
              onClick={() => setActiveTab(nextTab.id)}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 hover:text-black cursor-pointer focus-visible:outline-1 focus-visible:outline-black"
            >
              <span>Next: {nextTab.label}</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400">
              All architectural sections explored
            </span>
          )}

          <div className="flex items-center gap-3 ml-auto">
            {deepDive.repoUrl && (
              <a
                href={deepDive.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-black text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors focus-visible:outline-1 focus-visible:outline-black"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                View Code
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-black text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-100 transition-colors cursor-pointer focus-visible:outline-1 focus-visible:outline-black"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
