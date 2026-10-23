import { useEffect } from 'react'
import Container from './Container'
import SignalArrow from './SignalArrow'
import { profileData } from '../data/portfolioData'
import cvPdf from '../assets/CV Rayyan Qatrunada.pdf'

/**
 * Editorial Resume Page (Curriculum Vitae & Technical Specification)
 * - Exact Swiss architectural layout matching the homepage Skills section:
 *   Content sits directly flush against its top line (border-t border-black).
 * - Generous vertical breathing room between sections (pb-24 sm:pb-32 lg:pb-40) to provide expansive breathing room.
 * - Perfectly aligned two-column asymmetric grid.
 */
export default function ResumePage({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onBack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onBack])

  return (
    <article className="bg-white text-black font-sans selection:bg-black selection:text-white pb-8 sm:pb-24 print:pb-6">
      <Container>
        {/* ================= TOP ACTION BAR (Hidden in Print) ================= */}
        <div className="no-print h-[48px] sm:h-[62px] flex items-center justify-between border-b border-black mb-4 sm:mb-8">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-[13px] uppercase tracking-wider text-neutral-500 hover:text-black transition-colors cursor-pointer select-none"
            aria-label="Return to portfolio"
          >
            <span>←</span>
            <span className="group-hover:underline underline-offset-4">
              <span className="hidden xs:inline">RETURN TO </span>PORTFOLIO
            </span>
          </button>

          <div className="flex items-center gap-2.5 sm:gap-6">
            <a
              href={cvPdf}
              download="CV Rayyan Qatrunada.pdf"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-[13px] uppercase tracking-wider px-2.5 sm:px-3.5 py-1 sm:py-1.5 border border-black bg-white hover:bg-black hover:text-white transition-colors cursor-pointer select-none"
              title="Download CV Rayyan Qatrunada (PDF)"
            >
              <span>[ DOWNLOAD CV ]</span>
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[12px] sm:text-[13px] uppercase tracking-wider text-neutral-600 hover:text-black transition-colors"
            >
              <span>EMAIL</span>
              <SignalArrow className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* ================= HEADER: DOSSIER SPEC ================= */}
        <header className="pb-[105px] sm:pb-[130px] lg:pb-[151px] print:pb-8">
          {/* Prominent Name Only (Clean editorial focus with no cluttering eyebrow or subtitle) */}
          <div className="pt-2 sm:pt-3 pb-3 sm:pb-6">
            <h1 className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-black leading-none">
              RAYYAN{' '}
              <span className="font-serif font-light italic tracking-normal font-normal">
                Qatrunada
              </span>
            </h1>
            <span className="sr-only">Rayyan Qatrunada Qhoniansyah Putra — Curriculum Vitae &amp; Portfolio Specification</span>
          </div>

          {/* 4-Column Ruled Metadata Strip (Concise on mobile, full on desktop) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pt-4 sm:pt-6 mt-4 sm:mt-8 border-t border-black/15 font-mono text-[11px] sm:text-[13px] uppercase tracking-wider">
            <div className="min-w-0">
              <span className="block text-neutral-400 text-[10px] sm:text-[11px] mb-1">LOCATION</span>
              <span className="text-black font-medium text-[11.5px] sm:text-[14px] truncate block">JEPARA, INDONESIA</span>
              <span className="hidden sm:block text-neutral-500 text-[10px] sm:text-[11px] mt-1">GMT+7 [WIB]</span>
            </div>
            <div className="min-w-0">
              <span className="block text-neutral-400 text-[10px] sm:text-[11px] mb-1">SPECIALIZATION</span>
              <span className="text-black font-medium text-[11.5px] sm:text-[14px] truncate block">BACKEND ARCHITECTURE</span>
              <span className="hidden sm:block text-neutral-500 text-[10px] sm:text-[11px] mt-1">RELATIONAL DATA (3NF)</span>
            </div>
            <div className="min-w-0">
              <span className="block text-neutral-400 text-[10px] sm:text-[11px] mb-1">PRIMARY STACK</span>
              <span className="text-black font-medium text-[11.5px] sm:text-[14px] truncate block">PHP 8.2+ · LARAVEL</span>
              <span className="hidden sm:block text-neutral-500 text-[10px] sm:text-[11px] mt-1">MYSQL 8.0 · LIVEWIRE</span>
            </div>
            <div className="min-w-0">
              <span className="block text-neutral-400 text-[10px] sm:text-[11px] mb-1">DIRECT CHANNELS</span>
              <a
                href={`mailto:${profileData.email}`}
                className="block text-black hover:underline truncate text-[11.5px] sm:text-[14px] font-medium"
              >
                {profileData.email}
              </a>
              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:block text-neutral-500 hover:text-black truncate text-[10px] sm:text-[11px] mt-1"
              >
                GITHUB.COM/RAYYANQATRUNADA
              </a>
            </div>
          </div>

          {/* Concise Objective Statement (Punchy 1-sentence on mobile, full elaboration on desktop) */}
          <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-black/10">
            <p className="font-sans font-light text-[13px] sm:text-[16px] leading-relaxed text-black text-left sm:text-justify">
              <span className="font-medium text-black">Profile:</span> Backend developer focused on structured application architecture, normalized relational schemas (3NF), and dependable RESTful APIs with PHP, Laravel, and MySQL.<span className="hidden sm:inline"> Experienced in engineering reliable server-side workflows, from database design and indexing to perimeter FormRequest validation, third-party payment webhooks, and administrative systems.</span>
            </p>
          </div>
        </header>

        {/* ================= 01 / TECHNICAL CAPABILITIES ================= */}
        <section className="w-full border-t border-black pb-[105px] sm:pb-[135px] lg:pb-[168px] print:pb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-1.5 sm:gap-2 lg:gap-[20px]">
            {/* Left Column: Aligned with row 1 under the line */}
            <div className="w-full lg:w-[260px] shrink-0 pt-5 sm:pt-7 pb-2 lg:pb-0 min-h-[36px] lg:h-[52px] flex items-center">
              <h2 className="font-mono text-[11.5px] sm:text-[13px] uppercase tracking-wider text-black select-none">
                01 / TECHNICAL SKILLS
              </h2>
            </div>

            {/* Right Column: Clean ruled rows with comfortable breathing room */}
            <div className="w-full flex-1 flex flex-col shrink-0">
              {/* Row 1 */}
              <div className="w-full py-3 sm:py-0 min-h-[44px] lg:h-[52px] border-b border-black flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 select-none">
                <span className="font-sans font-bold text-[13.5px] sm:text-[16px] uppercase text-black shrink-0">
                  BACKEND &amp; LOGIC
                </span>
                <span className="font-mono text-[11px] sm:text-[12.5px] uppercase tracking-wider text-neutral-700 sm:text-right leading-relaxed">
                  PHP 8.2+ · LARAVEL · ELOQUENT ORM · LIVEWIRE<span className="hidden sm:inline"> &amp; VOLT</span> · RESTFUL APIS<span className="hidden sm:inline"> · RBAC</span>
                </span>
              </div>

              {/* Row 2 */}
              <div className="w-full py-3 sm:py-0 min-h-[44px] lg:h-[52px] border-b border-black flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 select-none">
                <span className="font-sans font-bold text-[13.5px] sm:text-[16px] uppercase text-black shrink-0">
                  DATABASE &amp; STORAGE
                </span>
                <span className="font-mono text-[11px] sm:text-[12.5px] uppercase tracking-wider text-neutral-700 sm:text-right leading-relaxed">
                  MYSQL 8.0 · 3NF NORMALIZATION · INDEXING · ACID TRANSACTIONS<span className="hidden sm:inline"> · MIGRATIONS</span>
                </span>
              </div>

              {/* Row 3 */}
              <div className="w-full py-3 sm:py-0 min-h-[44px] lg:h-[52px] border-b border-black flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 select-none">
                <span className="font-sans font-bold text-[13.5px] sm:text-[16px] uppercase text-black shrink-0">
                  TOOLS &amp; WORKFLOW
                </span>
                <span className="font-mono text-[11px] sm:text-[12.5px] uppercase tracking-wider text-neutral-700 sm:text-right leading-relaxed">
                  GIT &amp; GITHUB · LINUX CLI · TAILWIND CSS · BLADE<span className="hidden sm:inline"> · VITE</span> · POSTMAN
                </span>
              </div>

              {/* Row 4 */}
              <div className="w-full py-3 sm:py-0 min-h-[44px] lg:h-[52px] border-b-0 sm:border-b border-black flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 select-none">
                <span className="font-sans font-bold text-[13.5px] sm:text-[16px] uppercase text-black shrink-0">
                  ARCHITECTURE &amp; STANDARDS
                </span>
                <span className="font-mono text-[11px] sm:text-[12.5px] uppercase tracking-wider text-neutral-700 sm:text-right leading-relaxed">
                  MVC · SERVICE LAYER · FORM REQUEST VALIDATION<span className="hidden sm:inline"> · DEFENSIVE ERROR HANDLING</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 02 / SELECTED PRODUCTION PROJECTS ================= */}
        <section className="w-full border-t border-black pb-[105px] sm:pb-[135px] lg:pb-[168px] print:pb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-1.5 sm:gap-2 lg:gap-[20px]">
            {/* Left Column: Aligned with the top line */}
            <div className="w-full lg:w-[260px] shrink-0 pt-5 sm:pt-7 pb-2 lg:pb-0">
              <h2 className="font-mono text-[11.5px] sm:text-[13px] uppercase tracking-wider text-black select-none">
                02 / SELECTED PROJECTS
              </h2>
            </div>

            {/* Right Column: Starts directly under the top line */}
            <div className="w-full flex-1 flex flex-col">
              {/* Project 1: Compify */}
              <div className="pt-2 sm:pt-3 pb-6 sm:pb-8 border-b border-black/15">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2 pb-1.5">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-sans font-bold text-[16px] sm:text-xl uppercase tracking-tight text-black">
                      COMPIFY
                    </h3>
                    <span className="font-mono text-[11px] sm:text-[12px] uppercase text-neutral-500">
                      — HARDWARE E-COMMERCE
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] sm:text-[12px] uppercase text-neutral-600">
                      2026–PRESENT
                    </span>
                    <a
                      href="https://github.com/rayyanqatrunada/Compify"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] sm:text-[12px] uppercase text-black hover:underline"
                    >
                      <span>GITHUB</span>
                      <SignalArrow className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                <div className="font-mono text-[10.5px] sm:text-[12px] uppercase tracking-wider text-neutral-500 pb-2 leading-relaxed">
                  STACK: PHP 8.2+ · LARAVEL 12 · LIVEWIRE &amp; VOLT · MYSQL 8.0 · MIDTRANS API · RAJAONGKIR
                </div>

                <ul className="list-disc list-inside space-y-1.5 font-sans font-light text-[13px] sm:text-[15px] text-neutral-800 leading-relaxed">
                  <li>
                    Architected normalized 3NF relational database schema with foreign keys and composite indexes for hardware product specifications.
                  </li>
                  <li className="hidden sm:list-item">
                    Built dynamic cart state management with Livewire and integrated Midtrans payment webhooks with idempotent fulfillment handling.
                  </li>
                </ul>
              </div>

              {/* Project 2: TSM Department Portal */}
              <div className="pt-5 sm:pt-7 pb-6 sm:pb-8 border-b border-black/15">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2 pb-1.5">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-sans font-bold text-[16px] sm:text-xl uppercase tracking-tight text-black">
                      TSM DEPARTMENT PORTAL
                    </h3>
                    <span className="font-mono text-[11px] sm:text-[12px] uppercase text-neutral-500">
                      — INSTITUTIONAL CMS
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] sm:text-[12px] uppercase text-neutral-600">
                      2026
                    </span>
                    <a
                      href="https://github.com/rayyanqatrunada/toweb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] sm:text-[12px] uppercase text-black hover:underline"
                    >
                      <span>GITHUB</span>
                      <SignalArrow className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                <div className="font-mono text-[10.5px] sm:text-[12px] uppercase tracking-wider text-neutral-500 pb-2 leading-relaxed">
                  STACK: PHP · LARAVEL 11 · MYSQL 8.0 · FILAMENT ADMIN · RBAC POLICIES
                </div>

                <ul className="list-disc list-inside space-y-1.5 font-sans font-light text-[13px] sm:text-[15px] text-neutral-800 leading-relaxed">
                  <li>
                    Designed granular Role-Based Access Control (RBAC) separating administrative powers, content editors, and public visitors.
                  </li>
                  <li className="hidden sm:list-item">
                    Constructed normalized database tables for departmental announcements, academic publications, and audit logs.
                  </li>
                </ul>
              </div>

              {/* Project 3: PMart */}
              <div className="pt-5 sm:pt-7 pb-6 sm:pb-8 border-b border-black/15">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2 pb-1.5">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-sans font-bold text-[16px] sm:text-xl uppercase tracking-tight text-black">
                      PMART
                    </h3>
                    <span className="font-mono text-[11px] sm:text-[12px] uppercase text-neutral-500">
                      — STUDENT COMMERCE ENGINE
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] sm:text-[12px] uppercase text-neutral-600">
                      2026
                    </span>
                    <a
                      href="https://github.com/rayyanqatrunada/PMart-test"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] sm:text-[12px] uppercase text-black hover:underline"
                    >
                      <span>GITHUB</span>
                      <SignalArrow className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                <div className="font-mono text-[10.5px] sm:text-[12px] uppercase tracking-wider text-neutral-500 pb-2 leading-relaxed">
                  STACK: PHP · LARAVEL · MYSQL · FILAMENT · BLADE · TAILWIND CSS
                </div>

                <ul className="list-disc list-inside space-y-1.5 font-sans font-light text-[13px] sm:text-[15px] text-neutral-800 leading-relaxed">
                  <li>
                    Implemented database transaction rollbacks (ACID) to prevent concurrent booking conflicts and inventory race conditions.
                  </li>
                  <li className="hidden sm:list-item">
                    Enforced perimeter validation via dedicated FormRequest objects ensuring data consistency before database writes.
                  </li>
                </ul>
              </div>

              {/* Project 4: Study */}
              <div className="pt-5 sm:pt-7">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2 pb-1.5">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-sans font-bold text-[16px] sm:text-xl uppercase tracking-tight text-black">
                      STUDY
                    </h3>
                    <span className="font-mono text-[11px] sm:text-[12px] uppercase text-neutral-500">
                      — SYSTEMS CODE ARCHIVE
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] sm:text-[12px] uppercase text-neutral-600">
                      CONTINUOUS
                    </span>
                    <a
                      href="https://github.com/rayyanqatrunada/Study"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] sm:text-[12px] uppercase text-black hover:underline"
                    >
                      <span>GITHUB</span>
                      <SignalArrow className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                <div className="font-mono text-[10.5px] sm:text-[12px] uppercase tracking-wider text-neutral-500 pb-2 leading-relaxed">
                  STACK: PYTHON 3.X · DATA STRUCTURES &amp; ALGORITHMS · WEB FUNDAMENTALS · GIT
                </div>

                <ul className="list-disc list-inside space-y-1.5 font-sans font-light text-[13px] sm:text-[15px] text-neutral-800 leading-relaxed">
                  <li>
                    Curated technical archive documenting algorithmic complexity (Big-O analysis), data structures, and backend patterns.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 03 / ARCHITECTURAL APPROACH ================= */}
        <section className="w-full border-t border-black pb-[105px] sm:pb-[135px] lg:pb-[168px] print:pb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-1.5 sm:gap-2 lg:gap-[20px]">
            {/* Left Column */}
            <div className="w-full lg:w-[260px] shrink-0 pt-5 sm:pt-7 pb-2 lg:pb-0">
              <h2 className="font-mono text-[11.5px] sm:text-[13px] uppercase tracking-wider text-black select-none">
                03 / METHODOLOGY
              </h2>
            </div>

            {/* Right Column: 3 clean columns starting directly under the top line */}
            <div className="w-full flex-1 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 pt-3 sm:pt-4">
              <div>
                <span className="font-mono text-[10.5px] sm:text-[11px] uppercase text-neutral-500 block mb-1">
                  01 / SEPARATION
                </span>
                <h3 className="font-sans font-bold text-[14px] sm:text-[15.5px] uppercase tracking-tight text-black mb-1.5">
                  MODULAR ARCHITECTURE
                </h3>
                <p className="font-sans font-light text-[12.5px] sm:text-[14px] leading-relaxed text-neutral-700">
                  Thin HTTP controllers, dedicated service classes for domain logic, and decoupled data models.
                </p>
              </div>

              <div>
                <span className="font-mono text-[10.5px] sm:text-[11px] uppercase text-neutral-500 block mb-1">
                  02 / PERSISTENCE
                </span>
                <h3 className="font-sans font-bold text-[14px] sm:text-[15.5px] uppercase tracking-tight text-black mb-1.5">
                  RELATIONAL INTEGRITY
                </h3>
                <p className="font-sans font-light text-[12.5px] sm:text-[14px] leading-relaxed text-neutral-700">
                  3NF schema normalization, explicit foreign keys, composite indexes, and atomic ACID transactions.
                </p>
              </div>

              <div>
                <span className="font-mono text-[10.5px] sm:text-[11px] uppercase text-neutral-500 block mb-1">
                  03 / BOUNDARIES
                </span>
                <h3 className="font-sans font-bold text-[14px] sm:text-[15.5px] uppercase tracking-tight text-black mb-1.5">
                  DEFENSIVE VALIDATION
                </h3>
                <p className="font-sans font-light text-[12.5px] sm:text-[14px] leading-relaxed text-neutral-700">
                  Strict perimeter FormRequest validation, uniform JSON response envelopes, and standard HTTP codes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 04 / EDUCATION & CREDENTIALS ================= */}
        <section className="w-full border-t border-black pb-[105px] sm:pb-[135px] lg:pb-[168px] print:pb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-1.5 sm:gap-2 lg:gap-[20px]">
            {/* Left Column */}
            <div className="w-full lg:w-[260px] shrink-0 pt-5 sm:pt-7 pb-2 lg:pb-0">
              <h2 className="font-mono text-[11.5px] sm:text-[13px] uppercase tracking-wider text-black select-none">
                04 / EDUCATION
              </h2>
            </div>

            {/* Right Column: Starts directly under the line */}
            <div className="w-full flex-1 pt-3 sm:pt-4 divide-y divide-black/15">
              {/* SMK Negeri 1 Bangsri */}
              <div className="pb-5 sm:pb-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2 pb-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="font-sans font-bold text-[14.5px] sm:text-[16px] uppercase text-black">
                      SMK NEGERI 1 BANGSRI
                    </h3>
                    <span className="font-mono text-[11px] sm:text-[12px] uppercase text-neutral-500">
                      — SOFTWARE &amp; GAME DEVELOPMENT
                    </span>
                  </div>
                  <span className="font-mono text-[11px] sm:text-[12px] uppercase text-neutral-600 shrink-0">
                    2024–PRESENT
                  </span>
                </div>
                <p className="font-sans font-light text-[13px] sm:text-[14.5px] leading-relaxed text-neutral-700 mt-1">
                  Vocational secondary education focusing on software and game development (PPLG), modern web systems engineering, relational database design with MySQL, and backend architecture with PHP &amp; Laravel.
                </p>
              </div>

              {/* MTSN 2 JEPARA */}
              <div className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
                <div>
                  <h3 className="font-sans font-bold text-[14px] sm:text-[15.5px] uppercase text-black">
                    MTSN 2 JEPARA
                  </h3>
                  <span className="font-mono text-[10.5px] sm:text-[11.5px] uppercase text-neutral-500">
                    JUNIOR HIGH SCHOOL EDUCATION
                  </span>
                </div>
                <span className="font-mono text-[11px] sm:text-[12px] uppercase text-neutral-600 shrink-0">
                  2021–2024
                </span>
              </div>

              {/* SD Negeri 1 Wedelan */}
              <div className="pt-4 sm:pt-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
                <div>
                  <h3 className="font-sans font-bold text-[14px] sm:text-[15.5px] uppercase text-black">
                    SD NEGERI 1 WEDELAN
                  </h3>
                  <span className="font-mono text-[10.5px] sm:text-[11.5px] uppercase text-neutral-500">
                    PRIMARY EDUCATION
                  </span>
                </div>
                <span className="font-mono text-[11px] sm:text-[12px] uppercase text-neutral-600 shrink-0">
                  2015–2021
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 05 / VERIFIED CONTACT CHANNELS ================= */}
        <section className="w-full border-t border-black pb-[105px] sm:pb-[135px] lg:pb-[168px] print:pb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-1.5 sm:gap-2 lg:gap-[20px]">
            {/* Left Column */}
            <div className="w-full lg:w-[260px] shrink-0 pt-5 sm:pt-7 pb-2 lg:pb-0">
              <h2 className="font-mono text-[11.5px] sm:text-[13px] uppercase tracking-wider text-black select-none">
                05 / DISPATCH
              </h2>
            </div>

            {/* Right Column: Starts directly under the line */}
            <div className="w-full flex-1 pt-3 sm:pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 font-mono text-[11px] sm:text-[13px] uppercase tracking-wider">
              <div>
                <span className="block text-neutral-400 text-[10px] sm:text-[11px] mb-1">DIRECT EMAIL</span>
                <a href={`mailto:${profileData.email}`} className="text-black hover:underline font-medium text-[11.5px] sm:text-[14px] break-all">
                  {profileData.email}
                </a>
              </div>
              <div>
                <span className="block text-neutral-400 text-[10px] sm:text-[11px] mb-1">GITHUB REPOSITORY</span>
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:underline font-medium text-[11.5px] sm:text-[14px] break-all"
                >
                  GITHUB.COM/RAYYANQATRUNADA
                </a>
              </div>
              <div>
                <span className="block text-neutral-400 text-[10px] sm:text-[11px] mb-1">LOCATION</span>
                <span className="text-black font-medium text-[11.5px] sm:text-[14px]">JEPARA, ID (GMT+7)</span>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </article>
  )
}
