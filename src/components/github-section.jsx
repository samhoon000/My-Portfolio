import { useState } from 'react'
import { SectionHeading } from './section-heading'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

function GithubCard({ src, alt, href }) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="cafe-card pixel-corners relative flex min-h-[190px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1"
    >
      {hasError ? (
        <div className="flex flex-col items-center justify-center space-y-3 p-6 text-center">
          <div className="rounded-xl bg-panel p-3 border border-stroke text-[#E39A73]">
            <FaGithub className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[#FFF1D6]">GitHub activity view</p>
            <p className="text-xs text-[#C9AA8F]">Click to open profile directly</p>
          </div>
        </div>
      ) : (
        <div className="relative flex h-full w-full items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-panel/80 backdrop-blur-sm">
              <div className="flex flex-col items-center space-y-2">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#E39A73] border-t-transparent" />
                <span className="font-pixel text-xs text-[#C9AA8F]">Loading stats...</span>
              </div>
            </div>
          )}
          <img
            src={src}
            alt={alt}
            width={495}
            height={195}
            className={`h-auto w-full rounded-lg object-contain transition-all duration-500 ${
              isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
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
    </a>
  )
}

export function GithubSection() {
  const username = 'samhoon000'

  // Warm Coffee / Terracotta GitHub Stats theme parameters
  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&title_color=FFF1D6&text_color=E8D2B5&icon_color=E39A73&border_color=4a2f24&bg_color=20130e&hide_border=false`
  const languagesUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&title_color=FFF1D6&text_color=E8D2B5&border_color=4a2f24&bg_color=20130e&hide_border=false`

  return (
    <section id="github" className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Open Source"
        title="GitHub & Code Activity"
        description="Public repositories, SQL scripts, analytics pipelines, and machine learning models."
      />

      <div className="grid gap-6 sm:grid-cols-2">
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
          className="inline-flex items-center gap-2 font-pixel text-xs font-bold text-[#E39A73] hover:text-[#FFF1D6] transition-colors"
        >
          <span>Explore All Repositories on GitHub</span>
          <FaExternalLinkAlt className="text-[10px]" />
        </a>
      </div>
    </section>
  )
}
