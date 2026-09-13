import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

export function DocumentViewer({ title, subtitle, docUrl, backRoute }) {
  return (
    <main id="main-content" className="document-page mx-auto max-w-6xl px-4 pt-28 pb-12 sm:px-6 lg:px-8 min-h-screen">
      <div className="mb-6">
        <Link 
          to={backRoute} 
          className="inline-flex items-center gap-2 text-sm font-medium text-[#E39A73] hover:text-[#F0B08A] transition"
        >
          <FaArrowLeft /> Back to Project
        </Link>
      </div>
      
      <div className="mb-8">
        <h1 className="font-sans text-4xl font-bold tracking-tight text-[#FFF1D6]">{title}</h1>
        {subtitle && (
          <p
            className="mt-2 text-sm font-sans"
            style={{ color: '#FFF1D6' }}
          >
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
    </main>
  )
}
