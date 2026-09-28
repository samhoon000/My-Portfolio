import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/navbar'
import { HeroSection } from './components/hero-section'
import { AboutSection } from './components/about-section'
import { ExperienceSection } from './components/experience-section'
import { SkillsSection } from './components/skills-section'
import { ProjectsSection } from './components/projects-section'
import { AchievementsSection } from './components/achievements-section'
import { CertificationsSection } from './components/certifications-section'
import { ContactSection } from './components/contact-section'
import { Footer } from './components/footer'
import { ScrollProgress } from './components/scroll-progress'
import { CustomCursor } from './components/custom-cursor'

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
    <div className="app-shell relative min-h-screen overflow-x-hidden">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />
      <ScrollToHash />
      <Navbar />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="relative w-full">
              <HeroSection />
              <main id="main-content" className="portfolio-main relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-10">
                <AboutSection />
                <ExperienceSection />
                <ProjectsSection />
                <SkillsSection />
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
