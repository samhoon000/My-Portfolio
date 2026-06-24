import { useState } from 'react'
import { SectionHeading } from './section-heading'

/**
 * GithubCard Component
 * Handles the rendering of GitHub stats images with loading and error states.
 */
function GithubCard({ src, alt, href }) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card relative flex min-h-[180px] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-panelSoft p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-accent/10 sm:min-h-[210px]"
    >
      {hasError ? (
        <div className="flex flex-col items-center justify-center space-y-3 text-center p-6 opacity-100 transition-opacity duration-500">
          <div className="rounded-full bg-slate-800/50 p-3 ring-1 ring-slate-700">
            <svg
              className="h-6 w-6 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 17c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-200">GitHub stats unavailable right now</p>
            <p className="text-xs text-slate-500">Click to visit profile manually</p>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-panelSoft/80 backdrop-blur-sm transition-opacity duration-300">
              <div className="flex flex-col items-center space-y-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent"></div>
                <span className="text-xs font-medium text-slate-400">Loading stats...</span>
              </div>
            </div>
          )}
          <img
            src={src}
            alt={alt}
            width={495}
            height={195}
            className={`w-full h-auto rounded-md object-contain transition-all duration-500 ${
              isLoading ? 'scale-95 opacity-0 blur-sm' : 'scale-100 opacity-100 blur-0'
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true)
              setIsLoading(false)
            }}
            loading="lazy"
          />
        </div>
      )}
      
      {/* Decorative gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </a>
  )
}

export function GithubSection() {
  const username = "samhoon000"
  
  // Refined URLs with better parameters for the dark theme
  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&title_color=ffffff&text_color=cbd5e1&icon_color=38bdf8&border_color=334155&bg_color=00000000&hide_border=false`
  const languagesUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&title_color=ffffff&text_color=cbd5e1&border_color=334155&bg_color=00000000&hide_border=false`

  return (
    <section id="github" className="py-10 sm:py-12">
      <div className="container px-4">
        <SectionHeading
          eyebrow="GitHub"
          title="Explore my code, SQL queries, and analytics workflows"
          description="Showcasing my GitHub projects, data analysis workflows, and machine learning implementations with real-world applications."
        />
        
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          <GithubCard 
            src={statsUrl} 
            alt="GitHub contribution stats card" 
            href={`https://github.com/${username}`} 
          />
          <GithubCard 
            src={languagesUrl} 
            alt="GitHub top languages card" 
            href={`https://github.com/${username}`} 
          />
        </div>

        <div className="mt-8 text-center">
          <a 
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-accent"
          >
            <span>View all repositories</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
