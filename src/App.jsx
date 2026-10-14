import { profileData } from './data/portfolioData'

function App() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-xl p-8 border border-neutral-200 rounded-sm bg-neutral-50 shadow-xs">
        <span className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
          Step 1: Initialization & Project Audit
        </span>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900">
          {profileData.name} Portfolio
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          {profileData.subheading}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 text-xs font-medium bg-neutral-200 text-neutral-800 rounded">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Environment Ready: React + Vite + Tailwind CSS v4
        </div>
      </div>
    </main>
  )
}

export default App
