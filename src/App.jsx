import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/navbar'
import { CinematicCafeHero } from './components/cinematic-cafe-hero'
import { CafeBackground } from './components/cafe-background'
import { AboutSection } from './components/about-section'
import { ExperienceSection } from './components/experience-section'
import { SkillsSection } from './components/skills-section'
import { ProjectsSection } from './components/projects-section'
import { AchievementsSection } from './components/achievements-section'
import { CertificationsSection } from './components/certifications-section'
import { ContactSection } from './components/contact-section'
import { Footer } from './components/footer'
import { ScrollProgress } from './components/scroll-progress'

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
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-base text-textPrimary">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollProgress />
      <ScrollToTop />
      <ScrollToHash />
      <Navbar />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="relative w-full">
              {/* Persistent Cozy Interior Background for Main Exploration */}
              <CafeBackground />

              {/* Scene 1 & Scene 1 -> 2 Scroll Transition Hero */}
              <CinematicCafeHero />

              {/* Interior Portfolio Exploration */}
              <div className="cafe-threshold relative z-10" aria-hidden="true">
                <span>come in · warm up · look around</span>
              </div>
              <main id="main-content" className="cafe-interior relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-10">
                <AboutSection />
                <ExperienceSection />
                <SkillsSection />
                <ProjectsSection />
                <AchievementsSection />
                <CertificationsSection />
                <ContactSection />
              </main>
            </div>
          } 
        />
        <Route path="/project/food-health" element={<FoodHealthCaseStudy />} />
        <Route path="/project/food-health/report" element={<FoodHealthReport />} />
        <Route path="/project/food-health/presentation" element={<FoodHealthPresentation />} />
        <Route path="/project/instacart" element={<InstacartCaseStudy />} />
        <Route path="/project/instacart/report" element={<InstacartReport />} />
        <Route path="/project/instacart/presentation" element={<InstacartPresentation />} />
        <Route path="/projects/instacart/report" element={<InstacartReport />} />
        <Route path="/projects/instacart/presentation" element={<InstacartPresentation />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
