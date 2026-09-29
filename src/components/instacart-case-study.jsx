import { CaseStudyLayout } from './case-study-layout'

const project = {
  category: 'Customer analytics · Business intelligence',
  shortName: 'Instacart analytics',
  title: 'Instacart Customer Analytics Dashboard',
  summary: 'A scalable analytics pipeline for understanding customer behavior, reorder patterns, product performance, and retention opportunities.',
  systemLabel: 'CUSTOMER INTELLIGENCE',
  heroNodes: ['ORDERS', 'PRODUCTS', 'CUSTOMERS', 'REORDERS'],
  tools: ['Python', 'Pandas', 'DuckDB', 'SQL', 'Power BI', 'DAX'],
  images: ['/instacart-executive-overview.png', '/instacart-customer-insights.png'],
  github: 'https://github.com/samhoon000/instacart-customer-analytics',
  reportRoute: '/project/instacart/report',
  presentationRoute: '/project/instacart/presentation',
  problem: 'Retail teams generate millions of transactions but often lack a centralized view of purchasing behavior, reorders, customer loyalty, and department performance. That gap limits informed inventory, retention, and marketing decisions.',
  problemShort: 'Millions of retail transactions existed without one clear view of demand, loyalty, reorders, and department performance.',
  problemSources: ['ORDER FILES', 'PRODUCT CATALOG', 'CUSTOMER HISTORY'],
  solutionSignals: ['DEMAND PATTERNS', 'LOYALTY SEGMENTS', 'REORDER SIGNALS'],
  inputTypes: ['ORDERS', 'PRODUCTS', 'AISLES', 'DEPARTMENTS'],
  storageLabel: 'DUCKDB',
  outputTypes: ['CUSTOMER SEGMENTS', 'REORDER PATTERNS', 'DEPARTMENT KPIS'],
  approach: [
    { label: 'Pipeline', title: 'Build for analytical scale', text: 'Loaded and transformed the source data with Python, Pandas, DuckDB, and SQL for fast analysis across millions of records.' },
    { label: 'Modeling', title: 'Connect behavior signals', text: 'Analyzed order cadence, baskets, reorders, departments, and customer segments through targeted business queries.' },
    { label: 'Delivery', title: 'Design executive views', text: 'Built Power BI dashboards that connect operational KPIs with customer and retention insights.' },
  ],
  data: [
    { value: '3.4M+', label: 'customer orders' },
    { value: '30M', label: 'transaction rows' },
    { value: '21', label: 'departments' },
  ],
  dataNote: 'The Instacart Online Grocery Shopping Dataset tracks orders over time, basket composition, products, aisles, departments, and reorder behavior.',
  process: ['Raw CSV ingestion', 'Python and Pandas preparation', 'DuckDB analytical storage', 'SQL business queries', 'Customer and loyalty modeling', 'Power BI executive dashboards'],
  pipelineTools: ['CSV', 'PYTHON · PANDAS', 'DUCKDB', 'SQL', 'SEGMENTATION', 'POWER BI · DAX'],
  engineeringFlow: ['INGEST', 'JOIN', 'GROUP', 'AGGREGATE', 'SEGMENT'],
  engineLabel: 'SQL + CUSTOMER MODELING',
  analysis: [
    { title: 'Customer analytics', text: 'Segmented shoppers by frequency and volume, then examined loyalty, retention, and basket size.' },
    { title: 'Sales patterns', text: 'Mapped orders by hour and day while ranking products and department performance.' },
    { title: 'Reorder behavior', text: 'Measured repeat purchase patterns by product and department to identify recurring demand.' },
    { title: 'Business intelligence', text: 'Translated the analysis into executive KPIs, inventory signals, and marketing opportunities.' },
  ],
  insights: [
    { title: '58.97% overall reorder rate', text: 'Repeat purchasing was especially strong across dairy, produce, and baby-food departments.' },
    { title: 'Demand peaks from 9 AM to 4 PM', text: 'The ordering pattern provides a practical window for staffing, logistics, and availability planning.' },
    { title: 'Core departments lead volume', text: 'Produce and Dairy & Eggs together account for more than 35% of transactional volume.' },
    { title: 'Power shoppers drive outsized activity', text: 'Customers with 30 or more orders represent 18% of customers and 45% of checkout items.' },
  ],
  technologyMap: [
    { name: 'Python', use: 'Pipeline processing' },
    { name: 'Pandas', use: 'Data preparation' },
    { name: 'DuckDB', use: 'Analytical storage' },
    { name: 'SQL', use: 'Business queries' },
    { name: 'Power BI', use: 'Executive dashboards' },
    { name: 'DAX', use: 'Business measures' },
  ],
  impactMetrics: [
    { value: '3.4M+', label: 'Orders analyzed', note: 'Customer purchase history' },
    { value: '30M', label: 'Transaction rows', note: 'Product-level activity' },
    { value: '58.97%', label: 'Overall reorder rate', note: 'Recurring demand signal' },
    { value: '18% → 45%', label: 'Power-shopper impact', note: 'Customers → checkout items' },
  ],
  before: { title: 'Disconnected retail records', signals: ['NO CENTRAL VIEW', 'HIDDEN LOYALTY', 'UNCLEAR DEMAND'] },
  after: { title: 'Unified customer intelligence', signals: ['SEGMENTATION', 'REORDER SIGNALS', 'EXECUTIVE KPIS'] },
  takeaway: 'Customer, product, and reorder signals become one decision surface for retail teams.',
  outcome: 'Delivered executive and customer dashboards supporting inventory optimization, retention analysis, and targeted marketing decisions.',
  outcomeLong: 'The finished solution combines a lightweight analytical database, SQL business logic, customer segmentation, reorder analysis, and two Power BI views. It gives decision-makers a centralized way to understand demand patterns, loyal customers, department performance, and recurring-revenue opportunities.',
}

export function InstacartCaseStudy() {
  return <CaseStudyLayout project={project} />
}
