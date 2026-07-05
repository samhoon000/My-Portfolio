import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaPython,
  FaDatabase,
  FaArrowLeft,
  FaCheck,
  FaGithub,
  FaTimes,
  FaLightbulb,
  FaHeartbeat,
  FaExclamationTriangle,
  FaCookie,
  FaBone,
  FaSeedling,
  FaChartPie,
  FaAward,
  FaChartBar,
  FaFilter,
  FaRunning,
  FaTools,
  FaServer,
  FaChevronRight,
  FaMicrosoft,
  FaClock
} from 'react-icons/fa'
import { SiPandas } from 'react-icons/si'

// Replace this with your actual YouTube Video ID
const YOUTUBE_VIDEO_ID = "Vq4Lz7gYn8U"

export function FoodHealthCaseStudy() {

  // Motion variants for premium, subtle animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  // SQL Analytics Cards Data
  const sqlAnalytics = [
    {
      title: "Protein-to-Calorie Efficiency",
      insight: "Identified top foods offering maximum protein with minimal caloric load, optimizing dietary planning for muscle retention.",
      icon: FaRunning,
      color: "text-sky-400 border-sky-400/20 hover:border-sky-400/50"
    },
    {
      title: "Highest Nutrition Density",
      insight: "Highlighted foods containing the most essential micro-nutrients per calorie, providing the core list for healthy food marketing.",
      icon: FaHeartbeat,
      color: "text-emerald-400 border-emerald-400/20 hover:border-emerald-400/50"
    },
    {
      title: "Highest Health Risk Foods",
      insight: "Flagged products exceeding critical limits for sodium, sugar, and saturated fats. Placed directly on the recipe reformulation queue.",
      icon: FaExclamationTriangle,
      color: "text-red-400 border-red-400/20 hover:border-red-400/50"
    },
    {
      title: "Foods Highest in Sugar",
      insight: "Isolated items containing high hidden sugars disguised as healthy options, preventing misleading catalog entries.",
      icon: FaCookie,
      color: "text-amber-400 border-amber-400/20 hover:border-amber-400/50"
    },
    {
      title: "High Fat & Sugar Foods",
      insight: "Identified products with combined high saturated fat and sugar, indicating high metabolic and cardiovascular health risks.",
      icon: FaExclamationTriangle,
      color: "text-rose-400 border-rose-400/20 hover:border-rose-400/50"
    },
    {
      title: "Calcium-Rich Healthy Foods",
      insight: "Mapped items rich in calcium that maintain a low overall Health Risk Score, supporting specialized bone-health inventory filters.",
      icon: FaBone,
      color: "text-blue-300 border-blue-300/20 hover:border-blue-300/50"
    },
    {
      title: "High Fiber Low Sugar Foods",
      insight: "Located high-fiber, low-glycemic foods that help regulate blood sugar levels, optimizing inventory recommendations for metabolic health.",
      icon: FaSeedling,
      color: "text-green-400 border-green-400/20 hover:border-green-400/50"
    },
    {
      title: "Healthy Protein Sources",
      insight: "Filtered high-protein foods to exclude those high in sodium or fats, surfacing optimal, heart-healthy protein alternatives.",
      icon: FaAward,
      color: "text-indigo-400 border-indigo-400/20 hover:border-indigo-400/50"
    },
    {
      title: "Risk Category Distribution",
      insight: "Segmented the entire 1,028 catalog items into Low, Moderate, and High Risk categories to establish overall safety inventory share.",
      icon: FaChartPie,
      color: "text-purple-400 border-purple-400/20 hover:border-purple-400/50"
    },
    {
      title: "Overall Healthiest Foods",
      insight: "Cross-analyzed HRS and NDI to build the definitive 'Top Healthiest' list, driving product recommendations and catalog features.",
      icon: FaAward,
      color: "text-yellow-400 border-yellow-400/20 hover:border-yellow-400/50"
    }
  ]

  // Key challenges in food nutrition data analytics
  const challenges = [
    {
      title: "Large Product Catalogs",
      description: "Evaluating nutritional information across 1,000+ food products manually is slow and difficult to scale.",
      icon: FaDatabase
    },
    {
      title: "Lack of Standardized Health Metrics",
      description: "Raw nutritional values alone make it difficult to objectively compare products based on their overall healthiness.",
      icon: FaHeartbeat
    },
    {
      title: "Time-Consuming Analysis",
      description: "Identifying foods with excessive sugar, fat, sodium, or low nutritional value requires repetitive manual analysis.",
      icon: FaClock
    },
    {
      title: "Limited Business Visibility",
      description: "Stakeholders lack interactive dashboards to monitor nutritional trends, product risk distribution, and healthier alternatives.",
      icon: FaChartBar
    },
    {
      title: "Delayed Decision Making",
      description: "Without automated analytics, recommending product reformulation or healthier substitutions becomes inefficient.",
      icon: FaRunning
    }
  ]

  return (
    <div className="bg-base min-h-screen text-textPrimary select-none">
      {/* Container wraps case study sections to keep alignment consistent with portfolio */}
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">

        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accentSoft transition"
          >
            <FaArrowLeft /> Back to Portfolio
          </Link>
        </div>

        {/* 1. HERO SECTION */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="grid gap-8 lg:grid-cols-2 items-center mb-20 border-b border-stroke pb-16"
        >
          <div>
            <div className="inline-block rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-semibold text-accent mb-4 tracking-wider uppercase">
              Project Case Study
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
              Food Nutrition & Health Risk Analytics System
            </h1>
            <p className="readable-text mt-4 text-base text-textSecondary border-l-2 border-accent pl-4 italic">
              Building an end-to-end Business Intelligence solution for nutritional risk assessment using Python, SQL, MySQL, ETL pipelines, and Power BI.
            </p>

            {/* Tech Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['Python', 'Pandas', 'SQL', 'MySQL', 'Power BI', 'ETL', 'Data Analysis'].map((tech) => (
                <span
                  key={tech}
                  className="readable-text rounded-full border border-stroke bg-panel px-3 py-1 text-xs text-textMuted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent to-emerald-400 opacity-20 blur transition duration-1000 group-hover:opacity-35" />
            <div className="relative overflow-hidden rounded-2xl border border-stroke bg-panel shadow-2xl">
              <img
                src="/food-health-dashboard.png"
                alt="Food Nutrition & Health Risk Analytics Dashboard Preview"
                className="w-full h-auto object-cover transform transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </motion.section>

        {/* 2. PROJECT OVERVIEW */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 border-b border-stroke pb-2">Project Overview</h2>
          <div className="glass-card rounded-2xl bg-panelSoft p-6 sm:p-8 shadow-card">
            <p className="readable-text text-base text-textSecondary text-justify leading-relaxed">
              The <strong>Food Nutrition & Health Risk Analytics System</strong> is a comprehensive, production-grade business intelligence and engineering pipeline. Rather than just a static dashboard, it is an end-to-end data auditing solution. The system automates the ingestion of raw, semi-structured product nutritional profiles, performs extensive ETL operations in Python, resolves missing value anomalies, calculates proprietary safety metrics, warehouses the normalized datasets in MySQL, and delivers interactive analytics. It enables quality assurance teams and food product managers to systematically audit catalogs, spot safety threshold violations, and optimize inventory formulation decisions instantly.
            </p>
          </div>
        </motion.section>

        {/* 3. BUSINESS PROBLEM */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 border-b border-stroke pb-2">The Business Problem</h2>
          <div className="glass-card rounded-2xl bg-panelSoft p-6 sm:p-8 border border-accent/20 shadow-card transition-all duration-300 hover:border-accent/40">
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              <div className="flex-1">
                <p className="font-sans text-lg font-semibold text-accent mb-3">Business Challenge</p>
                <p className="readable-text text-sm text-textSecondary mb-6 leading-relaxed">
                  Food manufacturers, nutrition analysts, and quality assurance teams often manage large nutritional databases containing hundreds or thousands of products. Analyzing these datasets manually to identify unhealthy products, compare nutritional quality, and generate meaningful business insights is time-consuming and inefficient. Without a centralized analytics solution, organizations struggle to prioritize healthier alternatives, monitor product risk levels, and support data-driven product improvement decisions.
                </p>
                
                <h3 className="font-sans text-xs font-bold tracking-wider text-textMuted uppercase mb-4">Key Challenges</h3>
                <div className="space-y-3.5">
                  {challenges.map((challenge, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="flex items-start gap-3.5 p-3.5 rounded-xl bg-panel/30 border border-stroke/50 hover:bg-panel/60 hover:border-accent/30 transition-all duration-300"
                    >
                      <div className="mt-0.5 flex items-center justify-center shrink-0 rounded-lg bg-accent/10 p-2 text-accent border border-accent/20 w-9 h-9">
                        <challenge.icon size={18} />
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-semibold text-white leading-snug">{challenge.title}</h4>
                        <p className="readable-text mt-1 text-xs text-textMuted leading-relaxed">{challenge.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center shrink-0 md:pt-4">
                <div className="rounded-full bg-accent/10 p-6 text-accent border border-accent/20">
                  <FaChartBar size={48} className="animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 4. MY SOLUTION */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 border-b border-stroke pb-2">My Solution</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {/* Solution Card 1 */}
            <motion.div variants={fadeInUp} className="glass-card rounded-2xl bg-panelSoft p-5 border border-stroke transition hover:-translate-y-1 hover:border-accent">
              <div className="rounded-lg bg-accent/10 w-10 h-10 flex items-center justify-center text-accent mb-4">
                <FaPython size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">Python-Based ETL</h3>
              <p className="readable-text text-xs text-textSecondary leading-relaxed">
                Performed data cleaning and preprocessing using Python and Pandas by handling missing values, standardizing nutritional attributes, and preparing a consistent dataset for analysis.
              </p>
            </motion.div>

            {/* Solution Card 2 */}
            <motion.div variants={fadeInUp} className="glass-card rounded-2xl bg-panelSoft p-5 border border-stroke transition hover:-translate-y-1 hover:border-accent">
              <div className="rounded-lg bg-accent/10 w-10 h-10 flex items-center justify-center text-accent mb-4">
                <FaLightbulb size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">Feature Engineering</h3>
              <p className="readable-text text-xs text-textSecondary leading-relaxed">
                Engineered two custom metrics—Health Risk Score (HRS) and Nutrition Density Index (NDI)—to objectively evaluate food products and enable meaningful nutritional comparisons across the dataset.
              </p>
            </motion.div>

            {/* Solution Card 3 */}
            <motion.div variants={fadeInUp} className="glass-card rounded-2xl bg-panelSoft p-5 border border-stroke transition hover:-translate-y-1 hover:border-accent">
              <div className="rounded-lg bg-accent/10 w-10 h-10 flex items-center justify-center text-accent mb-4">
                <FaDatabase size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">Relational Database</h3>
              <p className="readable-text text-xs text-textSecondary leading-relaxed">
                Designed a normalized MySQL relational database to efficiently store processed nutritional data and support structured SQL analysis.
              </p>
            </motion.div>

            {/* Solution Card 4 */}
            <motion.div variants={fadeInUp} className="glass-card rounded-2xl bg-panelSoft p-5 border border-stroke transition hover:-translate-y-1 hover:border-accent">
              <div className="rounded-lg bg-accent/10 w-10 h-10 flex items-center justify-center text-accent mb-4">
                <FaChartBar size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">SQL Business Analysis</h3>
              <p className="readable-text text-xs text-textSecondary leading-relaxed">
                Developed 14 business-focused SQL queries to identify high-risk foods, rank healthier alternatives, analyze nutritional trends, and generate actionable business insights.
              </p>
            </motion.div>

            {/* Solution Card 5 */}
            <motion.div variants={fadeInUp} className="glass-card rounded-2xl bg-panelSoft p-5 border border-stroke transition hover:-translate-y-1 hover:border-accent">
              <div className="rounded-lg bg-accent/10 w-10 h-10 flex items-center justify-center text-accent mb-4">
                <FaMicrosoft size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">Power BI Dashboard</h3>
              <p className="readable-text text-xs text-textSecondary leading-relaxed">
                Designed an interactive Power BI dashboard featuring KPI cards, risk distribution, nutritional comparisons, product rankings, and dynamic filters to support intuitive data exploration.
              </p>
            </motion.div>

            {/* Solution Card 6 */}
            <motion.div variants={fadeInUp} className="glass-card rounded-2xl bg-panelSoft p-5 border border-stroke transition hover:-translate-y-1 hover:border-accent">
              <div className="rounded-lg bg-accent/10 w-10 h-10 flex items-center justify-center text-accent mb-4">
                <FaFilter size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">Business Insights</h3>
              <p className="readable-text text-xs text-textSecondary leading-relaxed">
                Enabled users to explore nutritional trends, compare food products, identify high-risk categories, and support data-driven decision-making through interactive visual analytics.
              </p>
            </motion.div>

          </div>
        </motion.section>

        {/* 5. PROJECT WORKFLOW */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 border-b border-stroke pb-2">Project Workflow</h2>

          {/* Timeline Wrapper */}
          <div className="glass-card rounded-2xl bg-panelSoft p-8 shadow-card">
            {/* Desktop Timeline */}
            <div className="hidden md:flex items-center justify-between relative">
              <div className="absolute top-[35px] left-8 right-8 h-0.5 bg-stroke z-0" />

              {[
                { title: "Dataset", desc: "Raw Nutrition CSV Data" },
                { title: "Python Cleaning", desc: "Pandas Unit Standardisation" },
                { title: "Feature Engineering", desc: "HRS & NDI Score Formulation" },
                { title: "MySQL Database", desc: "Relational Warehousing" },
                { title: "SQL Analysis", desc: "14 Business Query Run" },
                { title: "Power BI Dashboard", desc: "Interactive BI Visualisation" }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center relative z-10 w-[14%]">
                  <div className="w-10 h-10 rounded-full border-2 border-accent bg-panel flex items-center justify-center font-display text-sm font-semibold text-accent shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                    0{idx + 1}
                  </div>
                  <h4 className="font-display text-xs font-bold text-white mt-3 leading-snug">{step.title}</h4>
                  <p className="font-sans text-[10px] text-textMuted mt-1 leading-normal">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Mobile Timeline (Vertical) */}
            <div className="md:hidden space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stroke">
              {[
                { title: "Dataset", desc: "Raw Nutrition CSV Data" },
                { title: "Python Cleaning", desc: "Pandas Unit Standardisation" },
                { title: "Feature Engineering", desc: "HRS & NDI Score Formulation" },
                { title: "MySQL Database", desc: "Relational Warehousing" },
                { title: "SQL Analysis", desc: "14 Business Query Run" },
                { title: "Power BI Dashboard", desc: "Interactive BI Visualisation" }
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[24px] top-0 w-4.5 h-4.5 rounded-full border-2 border-accent bg-base flex items-center justify-center text-[9px] font-bold text-accent" />
                  <h4 className="font-display text-sm font-bold text-white leading-none">{step.title}</h4>
                  <p className="font-sans text-xs text-textMuted mt-1">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 6. SQL ANALYTICS */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-2 border-b border-stroke pb-2">SQL Analytics</h2>
          <p className="readable-text text-sm text-textMuted mb-6 font-sans">
            Cleaned and normalized data was warehoused in MySQL. Rather than simply dumping SQL query scripts, we translated database queries directly into targeted business intelligence insights.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sqlAnalytics.map((item, idx) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className={`glass-card rounded-xl p-5 border bg-panelSoft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.color}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-white/5 shrink-0">
                      <IconComponent size={18} />
                    </div>
                    <h3 className="font-display text-sm font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="font-sans text-xs text-textMuted leading-relaxed text-justify">
                    {item.insight}
                  </p>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-6 text-center">
            <span className="inline-block rounded-full bg-stroke/60 border border-stroke px-4 py-1.5 text-xs font-semibold text-textSecondary font-sans">
              💡 14 SQL business questions were developed to generate actionable nutritional insights.
            </span>
          </div>
        </motion.section>

        {/* 7. DASHBOARD SECTION */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-20"
        >
          <div className="mb-6 border-b border-stroke pb-2 animate-reveal">
            <h2 className="font-display text-2xl font-bold text-white">Dashboard Demonstration</h2>
            <p className="font-sans text-sm text-textMuted mt-1">
              Watch a walkthrough of the interactive Power BI dashboard, showcasing the key business insights, visualizations, and analytical capabilities developed for this project.
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-2xl border border-stroke bg-panelSoft shadow-glow aspect-video mb-8">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}`}
              title="Food Nutrition & Health Risk Analytics Dashboard Demonstration Walkthrough"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Dashboard Features Card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="glass-card rounded-2xl bg-panelSoft p-6 border border-stroke shadow-card"
            >
              <div className="flex items-center gap-3 mb-4 border-b border-stroke pb-2">
                <div className="rounded-lg bg-accent/10 p-2 text-accent">
                  <FaTools size={18} />
                </div>
                <h3 className="font-display text-lg font-bold text-white">Dashboard Features</h3>
              </div>
              <ul className="space-y-3 font-sans text-xs text-textSecondary">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>KPI cards summarizing overall nutritional metrics</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>Risk Category Distribution using a donut chart</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>Health Risk vs Nutrition Density scatter plot</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>Top 10 Healthiest Foods ranking</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>Top 10 Highest-Risk Foods ranking</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>Interactive slicers and filters for data exploration</span>
                </li>
              </ul>
            </motion.div>

            {/* Business Insights Card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="glass-card rounded-2xl bg-panelSoft p-6 border border-stroke shadow-card"
            >
              <div className="flex items-center gap-3 mb-4 border-b border-stroke pb-2">
                <div className="rounded-lg bg-emerald/10 p-2 text-emerald">
                  <FaLightbulb size={18} />
                </div>
                <h3 className="font-display text-lg font-bold text-white">Business Insights</h3>
              </div>
              <ul className="space-y-3 font-sans text-xs text-textSecondary">
                <li className="flex items-start gap-2.5">
                  <span className="rounded-full bg-emerald/10 p-1 text-emerald shrink-0 mt-0.5"><FaCheck size={8} /></span>
                  <span>High-risk food products requiring attention</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="rounded-full bg-emerald/10 p-1 text-emerald shrink-0 mt-0.5"><FaCheck size={8} /></span>
                  <span>Nutrient-dense alternatives for healthier recommendations</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="rounded-full bg-emerald/10 p-1 text-emerald shrink-0 mt-0.5"><FaCheck size={8} /></span>
                  <span>Products suitable for reformulation</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="rounded-full bg-emerald/10 p-1 text-emerald shrink-0 mt-0.5"><FaCheck size={8} /></span>
                  <span>Distribution of products across health risk categories</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="rounded-full bg-emerald/10 p-1 text-emerald shrink-0 mt-0.5"><FaCheck size={8} /></span>
                  <span>Relationship between nutrition density and health risk</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="rounded-full bg-emerald/10 p-1 text-emerald shrink-0 mt-0.5"><FaCheck size={8} /></span>
                  <span>Inventory quality assessment and decision support</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* 8. DASHBOARD HIGHLIGHTS */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 border-b border-stroke pb-2">Dashboard Highlights</h2>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Highlight Card 1 */}
            <motion.div variants={fadeInUp} className="glass-card rounded-2xl bg-panelSoft p-6 border border-stroke">
              <h3 className="font-display text-lg font-bold text-white mb-4 border-b border-stroke pb-2">KPIs</h3>
              <ul className="space-y-2.5 font-sans text-xs text-textSecondary">
                <li className="flex items-center justify-between">
                  <span className="text-textMuted">Total Food Products</span>
                  <span className="font-bold text-accent">1,028</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-textMuted">Average Health Risk Score</span>
                  <span className="font-bold text-accent">28.63</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-textMuted">Low-Risk Products</span>
                  <span className="font-bold text-accent">65.18%</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-textMuted">Average Nutrition Density</span>
                  <span className="font-bold text-accent">19.00</span>
                </li>
              </ul>
            </motion.div>

            {/* Highlight Card 2 */}
            <motion.div variants={fadeInUp} className="glass-card rounded-2xl bg-panelSoft p-6 border border-stroke">
              <h3 className="font-display text-lg font-bold text-white mb-4 border-b border-stroke pb-2">Visualizations</h3>
              <ul className="space-y-2.5 font-sans text-xs text-textSecondary">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>KPI cards summarizing overall nutritional metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>Risk Category Distribution using a donut chart</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>Health Risk vs Nutrition Density scatter plot</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>Top 10 Healthiest Foods ranking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>Top 10 Highest-Risk Foods ranking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>Interactive filters for category and product exploration</span>
                </li>
              </ul>
            </motion.div>

            {/* Highlight Card 3 */}
            <motion.div variants={fadeInUp} className="glass-card rounded-2xl bg-panelSoft p-6 border border-stroke">
              <h3 className="font-display text-lg font-bold text-white mb-4 border-b border-stroke pb-2">Business Value</h3>
              <ul className="space-y-2.5 font-sans text-xs text-textSecondary">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                  <span><b>Risk Identification</b>: Quickly identify food products with high health risk scores for further analysis.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                  <span><b>Nutritional Comparison</b>: Compare food products using Health Risk Score and Nutrition Density metrics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                  <span><b>Product Ranking</b>: Rank the healthiest and highest-risk foods to support nutritional analysis.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                  <span><b>Interactive Exploration</b>: Filter products by risk category and food type to explore nutritional trends and support data-driven decision-making.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* 9. TECHNICAL STACK */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 border-b border-stroke pb-2">Technical Stack</h2>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {/* Tech 1 */}
            <motion.div variants={fadeInUp} className="glass-card rounded-xl bg-panelSoft p-4 border border-stroke text-center">
              <div className="text-accent text-lg font-semibold font-display mb-1">Languages</div>
              <div className="font-sans text-sm text-white font-medium">Python, SQL</div>
            </motion.div>
            {/* Tech 2 */}
            <motion.div variants={fadeInUp} className="glass-card rounded-xl bg-panelSoft p-4 border border-stroke text-center">
              <div className="text-accent text-lg font-semibold font-display mb-1">Database</div>
              <div className="font-sans text-sm text-white font-medium">MySQL</div>
            </motion.div>
            {/* Tech 3 */}
            <motion.div variants={fadeInUp} className="glass-card rounded-xl bg-panelSoft p-4 border border-stroke text-center">
              <div className="text-accent text-lg font-semibold font-display mb-1">Libraries</div>
              <div className="font-sans text-sm text-white font-medium">Pandas, NumPy</div>
            </motion.div>
            {/* Tech 4 */}
            <motion.div variants={fadeInUp} className="glass-card rounded-xl bg-panelSoft p-4 border border-stroke text-center">
              <div className="text-accent text-lg font-semibold font-display mb-1">Visualization</div>
              <div className="font-sans text-sm text-white font-medium">Power BI</div>
            </motion.div>
            {/* Tech 5 */}
            <motion.div variants={fadeInUp} className="glass-card rounded-xl bg-panelSoft p-4 border border-stroke text-center col-span-2 md:col-span-4 lg:col-span-1">
              <div className="text-accent text-lg font-semibold font-display mb-1">Techniques</div>
              <div className="font-sans text-[11px] text-white font-medium leading-tight">ETL, Feature Engineering, Data Cleaning, BI</div>
            </motion.div>
          </div>
        </motion.section>

        {/* 10. KEY BUSINESS OUTCOMES */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 border-b border-stroke pb-2">Key Business Outcomes</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Processed and standardized nutritional data for 1,028 food products.",
              "Engineered two custom metrics—Health Risk Score (HRS) and Nutrition Density Index (NDI)—for objective product evaluation.",
              "Developed 14 business-focused SQL analyses to uncover nutritional trends and generate actionable insights.",
              "Built an interactive Power BI dashboard featuring KPIs, product rankings, risk distribution, and nutritional comparisons.",
              "Identified high-risk and nutrient-dense food products using custom analytical scoring models.",
              "Delivered a centralized analytics solution that supports nutritional assessment, product comparison, and data-driven decision-making."
            ].map((outcome, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="glass-card rounded-xl bg-panelSoft p-5 border border-stroke flex items-start gap-3 transition-all hover:border-emerald/50"
              >
                <div className="rounded-full bg-emerald/10 p-1.5 text-emerald shrink-0 mt-0.5">
                  <FaCheck size={10} />
                </div>
                <p className="font-sans text-xs font-semibold text-textSecondary leading-normal">
                  {outcome}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 11. REPORT & PRESENTATION (PROJECT DOCUMENTATION) */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 border-b border-stroke pb-2">Project Documentation</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Document 1: Project Report */}
            <div className="glass-card rounded-2xl bg-panelSoft p-6 border border-stroke flex flex-col justify-between">
              <div>
                <span className="inline-block rounded bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold text-accent uppercase tracking-wider mb-3">
                  Technical PDF
                </span>
                <h3 className="font-display text-lg font-bold text-white mb-2">Project Report</h3>
                <p className="font-sans text-xs text-textMuted leading-relaxed mb-6">
                  Complete project report detailing raw data extraction, cleaning methods, ETL pipeline structures, custom KPI formulas, SQL queries, dashboard definitions, and business findings.
                </p>
              </div>
              <Link
                to="/project/food-health/report"
                className="w-full text-center rounded-md border border-accent bg-accent/10 py-2.5 text-xs font-semibold text-accent transition hover:bg-accent hover:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                View Report
              </Link>
            </div>

            {/* Document 2: Presentation */}
            <div className="glass-card rounded-2xl bg-panelSoft p-6 border border-stroke flex flex-col justify-between">
              <div>
                <span className="inline-block rounded bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold text-accent uppercase tracking-wider mb-3">
                  Case Deck PDF
                </span>
                <h3 className="font-display text-lg font-bold text-white mb-2">Project Presentation</h3>
                <p className="font-sans text-xs text-textMuted leading-relaxed mb-6">
                  Slide deck presentation summarizing the project overview, core business problems, data architecture flow, feature formulas, SQL queries results, and key visual outcomes.
                </p>
              </div>
              <Link
                to="/project/food-health/presentation"
                className="w-full text-center rounded-md border border-accent bg-accent/10 py-2.5 text-xs font-semibold text-accent transition hover:bg-accent hover:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                View Presentation
              </Link>
            </div>
          </div>
        </motion.section>

        {/* 12. BOTTOM CTA */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center py-10 border-t border-stroke"
        >
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-4">
            Interested in the implementation?
          </h2>
          <p className="font-sans text-sm text-textMuted max-w-md mx-auto mb-6 leading-relaxed">
            Examine the entire repository database pipeline, raw schemas, python ETL files, and analytical SQL scripts directly on GitHub.
          </p>
          <a
            href="https://github.com/samhoon000/food-health-risk-analysis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-xs sm:text-sm font-semibold text-base transition hover:-translate-y-0.5 hover:bg-accentSoft hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]"
          >
            <FaGithub size={16} /> View GitHub Repository
          </a>
        </motion.section>

      </div>


    </div>
  )
}
