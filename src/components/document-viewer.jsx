import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

export function DocumentViewer({ title, subtitle, docUrl, backRoute }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-24 pb-12 sm:px-6 lg:px-8 min-h-screen animate-reveal">
      <div className="mb-6">
        <Link 
          to={backRoute} 
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accentSoft transition"
        >
          <FaArrowLeft /> Back to Project
        </Link>
      </div>
      
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-textPrimary">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-sm text-textMuted font-sans">
            {subtitle}
          </p>
        )}
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-stroke bg-panel shadow-card h-[80vh] w-full">
        <iframe 
          src={docUrl} 
          className="w-full h-full border-none bg-white"
          title={`${title} Viewer`}
        />
      </div>
    </div>
  )
}
