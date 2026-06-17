import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from './components/navbar'
import { HeroSection } from './components/hero-section'
import { AboutSection } from './components/about-section'
import { SkillsSection } from './components/skills-section'
import { ProjectsSection } from './components/projects-section'
import { AchievementsSection } from './components/achievements-section'
import { CertificationsSection } from './components/certifications-section'
import { JourneySection } from './components/journey-section'
import { GithubSection } from './components/github-section'
import { ResumeSection } from './components/resume-section'
import { ContactSection } from './components/contact-section'
import { Footer } from './components/footer'
import { ScrollProgress } from './components/scroll-progress'
import { LoadingScreen } from './components/loading-screen'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative overflow-x-hidden bg-base text-textPrimary">
      <AnimatePresence>{isLoading ? <LoadingScreen /> : null}</AnimatePresence>
      <ScrollProgress />
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 lg:px-8">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <CertificationsSection />
        <JourneySection />
        <GithubSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
