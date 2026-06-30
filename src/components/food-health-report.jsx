import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

export function FoodHealthReport() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-24 pb-12 sm:px-6 lg:px-8 min-h-screen animate-reveal">
      <div className="mb-6">
        <Link 
          to="/project/food-health" 
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accentSoft transition"
        >
          <FaArrowLeft /> Back to Project
        </Link>
      </div>
      
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-textPrimary">Project Report</h1>
        <p className="mt-2 text-sm text-textMuted font-sans">
          Complete methodology, EDA, SQL analysis, dashboard explanation, and business findings.
        </p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-stroke bg-panel shadow-card h-[80vh] w-full">
        <iframe 
          src="/food-health-report.pdf" 
          className="w-full h-full border-none bg-white"
          title="Food Nutrition & Health Risk Analytics System - Project Report"
        />
      </div>
    </div>
  )
}
