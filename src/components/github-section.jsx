import { SectionHeading } from './section-heading'

export function GithubSection() {
  return (
    <section id="github" className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="GitHub"
        title="Explore my code, SQL queries, and analytics workflows"
        description="Add your GitHub username in the image URLs below to display dynamic contribution and language stats."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <a
          href="https://github.com/samhoon000"
          className="glass-card rounded-xl bg-panelSoft p-4 transition hover:-translate-y-1 hover:border-accent"
        >
          <img
            src="https://github-readme-stats.vercel.app/api?username=samhoon000&show_icons=true&theme=transparent&title_color=ffffff&text_color=cbd5e1&icon_color=38bdf8&border_color=334155&bg_color=00000000"
            alt="GitHub stats"
            className="w-full rounded-md"
          />
        </a>
        <a
          href="https://github.com/samhoon000"
          className="glass-card rounded-xl bg-panelSoft p-4 transition hover:-translate-y-1 hover:border-accent"
        >
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=samhoon000&layout=compact&theme=transparent&title_color=ffffff&text_color=cbd5e1&border_color=334155&bg_color=00000000"
            alt="GitHub top languages"
            className="w-full rounded-md"
          />
        </a>
      </div>
    </section>
  )
}
