import { SectionHeading } from './section-heading'
import { BiCoffeeTogo } from 'react-icons/bi'
import { FaLaptopCode, FaChartPie } from 'react-icons/fa'

export function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="About Me"
        title="Engineering data into strategic business insights"
        description="AI & Data Science undergraduate and Data Analyst Intern passionate about solving high-impact problems with modern analytics pipelines."
      />
      <div className="cafe-card pixel-corners rounded-2xl p-6 sm:p-8 backdrop-blur-md">
        <div className="grid gap-6 md:grid-cols-[1fr_auto]">
          <div className="space-y-4">
            <p className="text-base leading-relaxed text-[#FFF1D6] font-sans">
              My expertise lies in extracting meaningful patterns from complex datasets and presenting them through intuitive dashboards, statistical models, and automated data pipelines. With hands-on experience in <strong className="text-[#E39A73] font-semibold">SQL, Python, Power BI, and Machine Learning</strong>, I thrive in environments that demand rapid, rigorous problem-solving.
            </p>
            <p className="text-base leading-relaxed text-[#FFF1D6] font-sans">
              I am currently gaining practical industry experience as a <strong className="text-[#E39A73] font-semibold">Data Analyst Intern at Trinetro Labs</strong>, building analytical systems and AI-powered business intelligence workflows. I love taking messy real-world datasets and crafting clean, actionable business narratives.
            </p>
          </div>
        </div>

        {/* Quick Highlights Row */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#6B4535]/50">
          <div className="rounded-xl p-4 flex items-center gap-3.5 bg-[#3A241D]/90 border border-[#6B4535]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4A2F25] border border-[#6B4535] text-[#E39A73]">
              <FaLaptopCode className="text-lg" />
            </div>
            <div>
              <p className="font-pixel text-xs text-[#E8D2B5] uppercase">Role</p>
              <p className="text-sm font-semibold text-[#FFF1D6]">Data Analyst Intern</p>
            </div>
          </div>

          <div className="rounded-xl p-4 flex items-center gap-3.5 bg-[#3A241D]/90 border border-[#6B4535]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4A2F25] border border-[#6B4535] text-[#E39A73]">
              <FaChartPie className="text-lg" />
            </div>
            <div>
              <p className="font-pixel text-xs text-[#E8D2B5] uppercase">Education</p>
              <p className="text-sm font-semibold text-[#FFF1D6]">B.E. in AI & Data Science</p>
            </div>
          </div>

          <div className="rounded-xl p-4 flex items-center gap-3.5 bg-[#3A241D]/90 border border-[#6B4535]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4A2F25] border border-[#6B4535] text-[#E39A73]">
              <BiCoffeeTogo className="text-xl" />
            </div>
            <div>
              <p className="font-pixel text-xs text-[#E8D2B5] uppercase">Focus</p>
              <p className="text-sm font-semibold text-[#FFF1D6]">BI & Machine Learning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
