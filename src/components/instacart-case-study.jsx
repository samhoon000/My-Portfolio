import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  FaClock,
  FaRunning,
  FaTools,
  FaAward,
  FaFilter,
  FaSeedling,
  FaChartBar,
} from 'react-icons/fa'

export function InstacartCaseStudy() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const dashboardImages = [
    '/instacart-executive-overview.png',
    '/instacart-customer-insights.png'
  ]

  // Preload dashboard images for instant switching
  useEffect(() => {
    dashboardImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

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
          className="grid gap-8 lg:grid-cols-[1fr_1.25fr] items-center mb-20 border-b border-stroke pb-16"
        >
          <div>
            <div className="inline-block rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-semibold text-accent mb-4 tracking-wider uppercase">
              Project Case Study
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
              Instacart Customer Analytics Dashboard
            </h1>
            <p className="readable-text mt-4 text-base text-textSecondary border-l-2 border-accent pl-4 italic">
              End-to-End Retail Business Intelligence & Customer Analytics Platform
            </p>
            <p className="readable-text mt-2 text-sm text-textMuted leading-relaxed">
              Analyzing over 3.4 million customer orders and product transactions to deliver decision-level business insights into purchasing trends and customer segments.
            </p>

            {/* Tech Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['Power BI', 'Python', 'DuckDB', 'SQL', 'Pandas', 'Data Analytics'].map((tech) => (
                <span
                  key={tech}
                  className="readable-text rounded-full border border-stroke bg-panel px-3 py-1 text-xs text-textMuted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="relative group/carousel w-full flex flex-col items-center">
            
            {/* Carousel Content Wrapper (contains Image and Arrows) */}
            <div className="relative w-full flex items-center justify-center">
              {/* Glow background */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent to-emerald-400 opacity-20 blur transition duration-1000 group-hover/carousel:opacity-35" />
              
              {/* Image Container */}
              <div 
                className="relative rounded-2xl border border-stroke bg-[#0F1115] shadow-2xl w-full cursor-pointer flex items-center justify-center z-10"
                onClick={() => setSelectedImage(dashboardImages[currentImageIndex])}
              >
                {/* Dummy spacer image in flow to reserve natural height */}
                <img 
                  src={dashboardImages[currentImageIndex]} 
                  className="w-full h-auto opacity-0 pointer-events-none p-3 sm:p-4" 
                  alt="layout spacer" 
                />
                
                <AnimatePresence initial={false}>
                  <motion.img
                    key={currentImageIndex}
                    src={dashboardImages[currentImageIndex]}
                    alt={`Instacart Customer Analytics Dashboard Preview ${currentImageIndex + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full object-contain p-3 sm:p-4"
                  />
                </AnimatePresence>
              </div>

              {/* Left navigation arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prev) => (prev === 0 ? dashboardImages.length - 1 : prev - 1));
                }}
                className="absolute left-[-16px] sm:left-[-28px] md:left-[-36px] top-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(18,21,27,0.75)] text-white backdrop-blur-sm shadow-md transition-all duration-[250ms] select-none
                  w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                  hover:scale-105 hover:border-[#27C5FF]/50 hover:bg-[rgba(26,31,38,0.8)] hover:text-[#27C5FF] hover:shadow-[0_0_15px_rgba(39,197,255,0.35)]"
                aria-label="Previous Dashboard"
              >
                <span className="text-xl sm:text-2xl font-bold leading-none select-none">←</span>
              </button>

              {/* Right navigation arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prev) => (prev === dashboardImages.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-[-16px] sm:right-[-28px] md:right-[-36px] top-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(18,21,27,0.75)] text-white backdrop-blur-sm shadow-md transition-all duration-[250ms] select-none
                  w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                  hover:scale-105 hover:border-[#27C5FF]/50 hover:bg-[rgba(26,31,38,0.8)] hover:text-[#27C5FF] hover:shadow-[0_0_15px_rgba(39,197,255,0.35)]"
                aria-label="Next Dashboard"
              >
                <span className="text-xl sm:text-2xl font-bold leading-none select-none">→</span>
              </button>
            </div>

            {/* Dashboard Indicator Dots (Outside container at bottom center) */}
            <div className="mt-4 flex items-center gap-2 bg-[rgba(18,21,27,0.75)] border border-[rgba(255,255,255,0.08)] backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-md select-none z-10">
              {dashboardImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentImageIndex === idx ? 'bg-accent w-4' : 'bg-white/40 hover:bg-white/70 w-2'
                  }`}
                  aria-label={`Go to dashboard screenshot ${idx + 1}`}
                />
              ))}
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
              The <strong>Instacart Customer Analytics Dashboard</strong> is a high-performance business intelligence solution built to transform over 3.4 million customer orders into strategic insights. The solution features a lightweight, local SQL data pipeline built with Python and DuckDB, allowing ultra-fast queries across millions of order records. By normalizing customer purchasing trends, reorder patterns, basket composition, and department metrics, the database supports complex analytical queries in seconds. A custom-engineered loyalty segmentation scoring model identifies high-value users, while retention analysis aids marketing teams in identifying subscription-potential items. Finally, interactive dashboards in Power BI present senior executives with operational and customer-centric views to drive inventory alignment and promotional marketing.
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
                  Retail businesses generate millions of transactional records every day but often lack a centralized analytics solution to monitor customer purchasing behavior, measure product performance, identify loyal customers, and support data-driven inventory and marketing decisions. Business teams require meaningful insights into reorder behavior, customer retention, and purchasing trends to improve operational efficiency and customer engagement.
                </p>
                
                <h3 className="font-sans text-xs font-bold tracking-wider text-textMuted uppercase mb-4">Key Challenges</h3>
                <div className="space-y-3.5">
                  {[
                    {
                      title: "Data Volume & Scaling",
                      description: "Processing over 3.4 million customer orders and 30 million transaction rows efficiently without high database infrastructure overhead.",
                      icon: FaDatabase
                    },
                    {
                      title: "Customer Retention Monitoring",
                      description: "Lacking automatic reorder rate tracking across different product categories and departments to identify loyalty trends.",
                      icon: FaHeartbeat
                    },
                    {
                      title: "Inventory & Stock Alignment",
                      description: "Struggling to align stock availability with peak purchasing hours and days to minimize cart abandonment.",
                      icon: FaClock
                    },
                    {
                      title: "Loyalty & Segmentation Gap",
                      description: "Inability to categorize customers dynamically based on purchasing frequency and basket sizes for targeted marketing.",
                      icon: FaRunning
                    },
                    {
                      title: "Actionable Revenue Insights",
                      description: "Missing a central dashboard to identify high-value subscription-potential products and recurring revenue channels.",
                      icon: FaLightbulb
                    }
                  ].map((challenge, idx) => (
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

        {/* 4. OBJECTIVES */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 border-b border-stroke pb-2">Objectives</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Analyze customer purchasing behavior", desc: "Identify peak order times, days, and reordering behaviors to capture active times." },
              { title: "Measure reorder rates", desc: "Pinpoint products with high repeat-purchase patterns to identify high-retention items." },
              { title: "Identify loyal customers", desc: "Build segments based on purchase frequency to customize loyalty rewards." },
              { title: "Optimize inventory planning", desc: "Establish demand forecasts based on hourly order loads to prevent stock outages." },
              { title: "Analyze department performance", desc: "Benchmark sales and reorders across all 21 retail departments." },
              { title: "Discover subscription opportunities", desc: "Filter fast-moving goods matching regular purchasing intervals for subscriptions." }
            ].map((obj, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="glass-card rounded-xl bg-panelSoft p-5 border border-stroke transition hover:-translate-y-1 hover:border-accent"
              >
                <div className="rounded-lg bg-accent/10 w-10 h-10 flex items-center justify-center text-accent mb-4">
                  <FaCheck size={16} />
                </div>
                <h3 className="font-display text-sm font-semibold text-white mb-2">{obj.title}</h3>
                <p className="readable-text text-xs text-textSecondary leading-relaxed">{obj.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 5. DATASET OVERVIEW */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 border-b border-stroke pb-2">Dataset Overview</h2>
          <div className="glass-card rounded-2xl bg-panelSoft p-6 sm:p-8 shadow-card">
            <p className="readable-text text-base text-textSecondary text-justify leading-relaxed mb-6">
              The project utilizes the <strong>Instacart Online Grocery Shopping Dataset</strong>, which contains transactional data of grocery orders over time. This dataset represents a rich repository of real-world shopping history, tracking millions of user baskets and product classifications.
            </p>
            <div className="grid gap-6 md:grid-cols-4 mb-8">
              {[
                { label: "Orders", value: "3.4M Orders" },
                { label: "Customers", value: "206K Customers" },
                { label: "Products", value: "49K Products" },
                { label: "Transactions", value: "30M+ Transactions" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-panel border border-stroke rounded-xl p-4 text-center">
                  <p className="text-xs text-textMuted uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-accent mt-1">{stat.value}</p>
                </div>
              ))}
            </div>
            
            <h3 className="font-sans text-xs font-bold tracking-wider text-textMuted uppercase mb-3">Database Tables Used</h3>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {[
                { name: "Orders", desc: "Captures order numbers, days of the week, hour of day, and order spacing." },
                { name: "Products", desc: "Contains product titles, associated aisle mappings, and department keys." },
                { name: "Departments", desc: "Lists all 21 retail departments (e.g., Produce, Dairy, Beverages)." },
                { name: "Aisles", desc: "Catalog of 134 separate aisles (e.g., fresh fruits, yogurt)." },
                { name: "Order Products Prior", desc: "Transactional link table detailing items added to cart and reorder status." }
              ].map((table, idx) => (
                <div key={idx} className="p-3 border border-stroke/50 bg-panel/20 rounded-lg">
                  <h4 className="font-display text-sm font-semibold text-white">{table.name}</h4>
                  <p className="font-sans text-xs text-textMuted mt-1">{table.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 6. TECH STACK */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 border-b border-stroke pb-2">Tech Stack</h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {[
              { name: "Python", category: "Language" },
              { name: "Pandas", category: "Library" },
              { name: "DuckDB", category: "Database" },
              { name: "SQL", category: "Analysis" },
              { name: "Power BI", category: "BI & Visualization" },
              { name: "Git", category: "Version Control" },
              { name: "GitHub", category: "Repository" }
            ].map((tech, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="glass-card rounded-xl bg-panelSoft p-4 border border-stroke text-center">
                <div className="text-accent text-lg font-semibold font-display mb-1">{tech.name}</div>
                <div className="font-sans text-xs text-textMuted font-medium">{tech.category}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 7. WORKFLOW */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 border-b border-stroke pb-2">Workflow</h2>
          <div className="glass-card rounded-2xl bg-panelSoft p-8 shadow-card">
            {/* Desktop Timeline */}
            <div className="hidden md:flex items-center justify-between relative">
              <div className="absolute top-[35px] left-8 right-8 h-0.5 bg-stroke z-0" />

              {[
                { title: "Raw CSV Data", desc: "Ingested transactional orders" },
                { title: "Data Cleaning", desc: "Python handling missing values" },
                { title: "DuckDB Database", desc: "Lightweight high-speed database" },
                { title: "SQL Business Analysis", desc: "Queries across millions of rows" },
                { title: "Feature Engineering", desc: "Loyalty score & intervals" },
                { title: "Power BI Dashboard", desc: "Interactive BI visualizations" },
                { title: "Business Insights", desc: "Strategic actions and outcomes" }
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
                { title: "Raw CSV Data", desc: "Ingested transactional orders" },
                { title: "Data Cleaning", desc: "Python handling missing values" },
                { title: "DuckDB Database", desc: "Lightweight high-speed database" },
                { title: "SQL Business Analysis", desc: "Queries across millions of rows" },
                { title: "Feature Engineering", desc: "Loyalty score & intervals" },
                { title: "Power BI Dashboard", desc: "Interactive BI visualizations" },
                { title: "Business Insights", desc: "Strategic actions and outcomes" }
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

        {/* 8. BUSINESS ANALYSIS */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-2 border-b border-stroke pb-2">Business Analysis</h2>
          <p className="readable-text text-sm text-textMuted mb-6 font-sans">
            Raw transactional data was loaded into a DuckDB database. We designed targeted SQL queries to perform business intelligence analysis, grouped into key operational categories:
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Group 1: Customer Analytics */}
            <div className="glass-card rounded-2xl bg-panelSoft p-6 border border-stroke shadow-card">
              <h3 className="font-display text-lg font-bold text-accent mb-4 border-b border-stroke pb-2">Customer Analytics</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent mt-0.5"><FaRunning size={14} /></div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">Customer Segmentation</h4>
                    <p className="font-sans text-xs text-textMuted leading-relaxed mt-1">Classified customer ordering frequencies and volume to isolate loyal power buyers from occasional shoppers.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent mt-0.5"><FaAward size={14} /></div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">Loyalty Score</h4>
                    <p className="font-sans text-xs text-textMuted leading-relaxed mt-1">Calculated a composite metric of order frequency, reorder rates, and order interval consistency.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent mt-0.5"><FaClock size={14} /></div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">Customer Retention</h4>
                    <p className="font-sans text-xs text-textMuted leading-relaxed mt-1">Tracked how long cohorts stay active and measured churn rates across order intervals.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent mt-0.5"><FaDatabase size={14} /></div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">Average Basket Size</h4>
                    <p className="font-sans text-xs text-textMuted leading-relaxed mt-1">Evaluated items per order to identify high-capacity baskets and purchase trends.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Group 2: Sales Analytics */}
            <div className="glass-card rounded-2xl bg-panelSoft p-6 border border-stroke shadow-card">
              <h3 className="font-display text-lg font-bold text-accent mb-4 border-b border-stroke pb-2">Sales Analytics</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent mt-0.5"><FaClock size={14} /></div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">Orders by Hour</h4>
                    <p className="font-sans text-xs text-textMuted leading-relaxed mt-1">Analyzed diurnal ordering spikes to align server loads and logistics dispatch schedules.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent mt-0.5"><FaClock size={14} /></div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">Orders by Day</h4>
                    <p className="font-sans text-xs text-textMuted leading-relaxed mt-1">Mapped ordering trends over the week to optimize warehouse staffing and stock levels.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent mt-0.5"><FaAward size={14} /></div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">Top Products</h4>
                    <p className="font-sans text-xs text-textMuted leading-relaxed mt-1">Identified highest volume products to ensure inventory availability and catalog placement.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent mt-0.5"><FaChartBar size={14} /></div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">Department Performance</h4>
                    <p className="font-sans text-xs text-textMuted leading-relaxed mt-1">Benchmarked transactions and volume share across all 21 departments.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Group 3: Retention Analytics */}
            <div className="glass-card rounded-2xl bg-panelSoft p-6 border border-stroke shadow-card">
              <h3 className="font-display text-lg font-bold text-accent mb-4 border-b border-stroke pb-2">Retention Analytics</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent mt-0.5"><FaHeartbeat size={14} /></div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">Reorder Rate</h4>
                    <p className="font-sans text-xs text-textMuted leading-relaxed mt-1">Measured overall catalog repeat purchases to gauge platform stickiness and user retention.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent mt-0.5"><FaFilter size={14} /></div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">Department Reorder Rate</h4>
                    <p className="font-sans text-xs text-textMuted leading-relaxed mt-1">Analyzed which departments (e.g., Produce, Dairy) boast the highest repeat customers.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent mt-0.5"><FaSeedling size={14} /></div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">Subscription Opportunity Products</h4>
                    <p className="font-sans text-xs text-textMuted leading-relaxed mt-1">Isolated products bought on highly regular cycles to support automatic subscription recommendations.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Group 4: Business Intelligence */}
            <div className="glass-card rounded-2xl bg-panelSoft p-6 border border-stroke shadow-card">
              <h3 className="font-display text-lg font-bold text-accent mb-4 border-b border-stroke pb-2">Business Intelligence</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent mt-0.5"><FaChartBar size={14} /></div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">Executive KPIs</h4>
                    <p className="font-sans text-xs text-textMuted leading-relaxed mt-1">Synthesized transactional tables into high-level business health indicators for senior managers.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent mt-0.5"><FaTools size={14} /></div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">Inventory Planning</h4>
                    <p className="font-sans text-xs text-textMuted leading-relaxed mt-1">Supplied operational teams with hourly distribution maps to minimize inventory run-out.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent mt-0.5"><FaLightbulb size={14} /></div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">Customer Insights</h4>
                    <p className="font-sans text-xs text-textMuted leading-relaxed mt-1">Isolated detailed user shopping profiles to understand churn triggers and drop-off risks.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent mt-0.5"><FaExclamationTriangle size={14} /></div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">Marketing Recommendations</h4>
                    <p className="font-sans text-xs text-textMuted leading-relaxed mt-1">Generated cross-department bundling suggestions and custom discount codes based on baskets.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* 9. DASHBOARD SHOWCASE */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-20"
        >
          <div className="mb-6 border-b border-stroke pb-2 animate-reveal">
            <h2 className="font-display text-2xl font-bold text-white">Dashboard Showcase</h2>
            <p className="font-sans text-sm text-textMuted mt-1">
              Explore the walkthrough of the interactive, high-fidelity Power BI dashboards developed for Instacart.
            </p>
          </div>

          <div className="relative group/video w-full max-w-4xl mx-auto mb-6 z-10">
            {/* Glow background */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent to-purple-600 opacity-20 blur transition duration-1000 group-hover/video:opacity-35" />
            
            {/* Video Container */}
            <div className="relative rounded-2xl border border-stroke bg-[#0F1115] shadow-card w-full aspect-video overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]">
              <iframe
                src="https://www.youtube.com/embed/tBa116WrGZE?rel=0&modestbranding=1"
                title="Instacart Customer Analytics Dashboard Walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              ></iframe>
            </div>
          </div>

          <p className="font-sans text-xs sm:text-sm text-textMuted text-center max-w-2xl mx-auto leading-relaxed italic">
            Watch a complete walkthrough of the interactive Power BI dashboard, showcasing customer behavior, purchasing trends, retention analysis, and executive business insights.
          </p>
        </motion.section>

        {/* 10. KEY INSIGHTS */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 border-b border-stroke pb-2">Key Insights</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "58.97% Overall Reorder Rate", desc: "Indicates high repeat purchase patterns, primarily anchored by dairy products, produce, and baby food departments.", icon: FaHeartbeat, color: "text-emerald-400 border-emerald-400/20 hover:border-emerald-400/50" },
              { title: "Peak Ordering Hours", desc: "Highly concentrated order spikes between 9:00 AM and 4:00 PM, identifying the optimal times for logistics and staffing.", icon: FaClock, color: "text-sky-400 border-sky-400/20 hover:border-sky-400/50" },
              { title: "Top Performing Departments", desc: "Produce (fruits/vegetables) and Dairy & Eggs account for over 35% of total transactional volumes, driving core revenues.", icon: FaChartBar, color: "text-purple-400 border-purple-400/20 hover:border-purple-400/50" },
              { title: "High-Value Customer Segments", desc: "Loyal power shoppers (30+ orders) represent 18% of the customer base but drive 45% of total checkout items.", icon: FaAward, color: "text-yellow-400 border-yellow-400/20 hover:border-yellow-400/50" },
              { title: "Customer Retention Trends", desc: "High repeat purchases drop 12% after the first order but stabilize after the third order, highlighting critical early retention stages.", icon: FaRunning, color: "text-rose-400 border-rose-400/20 hover:border-rose-400/50" },
              { title: "Subscription Opportunity Products", desc: "Surplus of high-frequency items (milk, seltzer, bananas) perfectly fit an automated subscription box model to lock in recurring sales.", icon: FaSeedling, color: "text-green-400 border-green-400/20 hover:border-green-400/50" }
            ].map((insight, idx) => {
              const IconComp = insight.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className={`glass-card rounded-xl p-5 border bg-panelSoft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${insight.color}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-white/5 shrink-0">
                      <IconComp size={18} />
                    </div>
                    <h3 className="font-display text-sm font-semibold text-white">{insight.title}</h3>
                  </div>
                  <p className="font-sans text-xs text-textMuted leading-relaxed">
                    {insight.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* 11. BUSINESS IMPACT */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 border-b border-stroke pb-2">Business Impact</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Improved customer behavior visibility: Surfaced customer purchasing habits, cart trends, and ordering times.",
              "Enabled inventory optimization: Provided warehouse managers with accurate predictive stocking schedules based on hourly order patterns.",
              "Supported targeted marketing: Segmented customer cohorts to power tailored email marketing campaigns and product recommendations.",
              "Identified recurring revenue opportunities: Identified and packaged top reordered products into subscription program recommendations.",
              "Enhanced executive decision-making: Delivered a centralized, unified Power BI report for management to monitor cross-department KPIs."
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
            Examine the entire Python data processing script, SQL database pipelines, and dashboards setup details directly on GitHub.
          </p>
          <a
            href="https://github.com/samhoon000/instacart-customer-analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-xs sm:text-sm font-semibold text-base transition hover:-translate-y-0.5 hover:bg-accentSoft hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]"
          >
            <FaGithub size={16} /> View GitHub Repository
          </a>
        </motion.section>

      </div>

      {/* Zoom Modal Overlay */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-base/90 p-4 sm:p-6 md:p-8 backdrop-blur-sm transition-all duration-300">
          <div className="relative max-h-full w-full max-w-6xl rounded-2xl border border-stroke bg-panel p-5 sm:p-8 shadow-[0_0_40px_rgba(56,189,248,0.15)] flex flex-col animate-scaleIn">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 sm:right-6 sm:top-6 z-10 rounded-full bg-base/80 p-2 text-textSecondary transition hover:bg-accent hover:text-base focus:outline-none shadow-md"
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>
            
            <h3 className="mb-6 text-xl sm:text-2xl font-semibold text-textPrimary pr-12">
              {selectedImage === '/instacart-executive-overview.png' ? 'Executive Overview Dashboard' : 'Customer & Product Insights Dashboard'}
            </h3>
            
            <div className="relative flex-1 overflow-y-auto rounded-xl bg-base border border-stroke/50 p-4 sm:p-6 flex items-center justify-center">
              <div className="group relative overflow-hidden rounded-xl bg-panelSoft border border-stroke flex items-center justify-center max-w-4xl mx-auto">
                <img 
                  src={selectedImage} 
                  alt="Dashboard preview zoom"
                  className="max-h-[55vh] sm:max-h-[60vh] lg:max-h-[65vh] w-auto max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
