import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/navbar'
import { HeroSection } from './components/hero-section'
import { AboutSection } from './components/about-section'
import { ExperienceSection } from './components/experience-section'
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
import { PixelWorldCanvas } from './components/pixel-world-canvas'

// Routing scroll helpers
import { ScrollToTop } from './components/scroll-to-top'
import { ScrollToHash } from './components/scroll-to-hash'

// Case Study Pages
import { FoodHealthCaseStudy } from './components/food-health-case-study'
import { FoodHealthReport } from './components/food-health-report'
import { FoodHealthPresentation } from './components/food-health-presentation'
import { InstacartCaseStudy } from './components/instacart-case-study'
import { InstacartReport } from './components/instacart-report'
import { InstacartPresentation } from './components/instacart-presentation'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent text-ivory selection:bg-terracotta/40 selection:text-ivory">
      <AnimatePresence>{isLoading ? <LoadingScreen /> : null}</AnimatePresence>
      
      {/* Scroll-Controlled Cinematic Pixel-Art Café Engine (cafe1 + cafe2 continuous 600 frames) */}
      <PixelWorldCanvas />

      {/* Global Overlays & Nav */}
      <ScrollProgress />
      <ScrollToTop />
      <ScrollToHash />
      <Navbar />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <main className="relative z-10 mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
              <HeroSection />
              <AboutSection />
              <ExperienceSection />
              <SkillsSection />
              <ProjectsSection />
              <AchievementsSection />
              <CertificationsSection />
              <JourneySection />
              <GithubSection />
              <ResumeSection />
              <ContactSection />
            </main>
          } 
        />
        <Route path="/project/food-health" element={<div className="relative z-10"><FoodHealthCaseStudy /></div>} />
        <Route path="/project/food-health/report" element={<div className="relative z-10"><FoodHealthReport /></div>} />
        <Route path="/project/food-health/presentation" element={<div className="relative z-10"><FoodHealthPresentation /></div>} />
        <Route path="/project/instacart" element={<div className="relative z-10"><InstacartCaseStudy /></div>} />
        <Route path="/project/instacart/report" element={<div className="relative z-10"><InstacartReport /></div>} />
        <Route path="/project/instacart/presentation" element={<div className="relative z-10"><InstacartPresentation /></div>} />
        <Route path="/projects/instacart/report" element={<div className="relative z-10"><InstacartReport /></div>} />
        <Route path="/projects/instacart/presentation" element={<div className="relative z-10"><InstacartPresentation /></div>} />
      </Routes>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}

export default App

