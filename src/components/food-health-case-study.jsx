import { CaseStudyLayout } from './case-study-layout'

const project = {
  category: 'Data engineering · Business intelligence',
  shortName: 'Nutrition analytics',
  title: 'Food Nutrition & Health Risk Analytics System',
  summary: 'An end-to-end BI system for auditing nutritional quality, identifying product risk, and comparing healthier alternatives.',
  systemLabel: 'NUTRITION INTELLIGENCE',
  heroNodes: ['PRODUCT DATA', 'NUTRITION METRICS', 'SQL ANALYSIS', 'RISK SCORES'],
  tools: ['Python', 'Pandas', 'SQL', 'MySQL', 'Power BI', 'ETL'],
  images: ['/food-health-dashboard.png'],
  github: 'https://github.com/samhoon000/food-health-risk-analysis',
  reportRoute: '/project/food-health/report',
  presentationRoute: '/project/food-health/presentation',
  problem: 'Food manufacturers, nutrition analysts, and quality teams often manage large product databases without a centralized way to compare nutritional quality, flag risky products, or prioritize healthier alternatives. Manual review makes catalog-wide decisions slow and inconsistent.',
  problemShort: 'Large product catalogs made nutritional comparison, risk screening, and healthier-alternative discovery slow and inconsistent.',
  problemSources: ['PRODUCT CATALOG', 'NUTRIENT ATTRIBUTES', 'MANUAL REVIEW'],
  solutionSignals: ['RISK BANDS', 'DENSITY INDEX', 'HEALTHIER OPTIONS'],
  inputTypes: ['PRODUCTS', 'MACRONUTRIENTS', 'MICRONUTRIENTS', 'THRESHOLDS'],
  storageLabel: 'MYSQL',
  outputTypes: ['RISK SEGMENTS', 'PRODUCT RANKINGS', 'QUALITY AUDITS'],
  approach: [
    { label: 'Preparation', title: 'Clean and standardize', text: 'Used Python and Pandas to resolve missing values, standardize nutritional attributes, and prepare a consistent analytical dataset.' },
    { label: 'Modeling', title: 'Engineer decision metrics', text: 'Created Health Risk Score and Nutrition Density Index measures to compare products on risk and nutritional value.' },
    { label: 'Delivery', title: 'Query and visualize', text: 'Stored normalized data in MySQL, answered business questions in SQL, and built an interactive Power BI dashboard.' },
  ],
  data: [
    { value: '1,028', label: 'catalog items' },
    { value: '14', label: 'SQL questions' },
    { value: '2', label: 'engineered indices' },
  ],
  dataNote: 'Semi-structured nutritional product profiles with macro- and micronutrient attributes, standardized for catalog-level comparison.',
  process: ['Raw nutrition data intake', 'Python and Pandas cleaning', 'HRS and NDI feature engineering', 'MySQL relational storage', 'SQL business analysis', 'Power BI dashboard delivery'],
  pipelineTools: ['SOURCE DATA', 'PYTHON · PANDAS', 'HRS · NDI', 'MYSQL', 'SQL', 'POWER BI'],
  engineeringFlow: ['CLEAN', 'STANDARDIZE', 'SCORE', 'SEGMENT', 'RANK'],
  engineLabel: 'SQL + ENGINEERED INDICES',
  analysis: [
    { title: 'Risk segmentation', text: 'Grouped the catalog into low, moderate, and high-risk bands using nutritional thresholds.' },
    { title: 'Nutrient density', text: 'Compared nutrient contribution against caloric load to surface stronger food options.' },
    { title: 'Healthier alternatives', text: 'Cross-analyzed risk and density scores to rank products and identify safer substitutes.' },
    { title: 'Threshold auditing', text: 'Flagged elevated sodium, sugar, and saturated-fat profiles for closer review.' },
  ],
  insights: [
    { title: 'Critical sodium exposure', text: 'The analysis identified that 15% of catalog products exceeded critical sodium thresholds.' },
    { title: 'Healthier choices became comparable', text: 'Combining HRS and NDI created a consistent way to surface nutrient-dense, lower-risk products.' },
    { title: 'Specialized filters revealed alternatives', text: 'Queries surfaced high-fiber, low-glycemic foods and high-protein options without excessive sodium or fat.' },
    { title: 'Risk moved from manual review to a system', text: 'Catalog-wide segmentation gave quality teams a repeatable path for audits and reformulation priorities.' },
  ],
  technologyMap: [
    { name: 'Python', use: 'Data preparation' },
    { name: 'Pandas', use: 'Cleaning and features' },
    { name: 'MySQL', use: 'Relational storage' },
    { name: 'SQL', use: 'Business analysis' },
    { name: 'Power BI', use: 'Decision interface' },
    { name: 'ETL', use: 'Pipeline orchestration' },
  ],
  impactMetrics: [
    { value: '1,028', label: 'Products analyzed', note: 'Catalog-wide comparison' },
    { value: '14', label: 'SQL questions', note: 'Reusable business analysis' },
    { value: '2', label: 'Engineered indices', note: 'HRS and NDI' },
    { value: '15%', label: 'Critical sodium exposure', note: 'Products above threshold' },
  ],
  before: { title: 'Manual catalog review', signals: ['SCATTERED ATTRIBUTES', 'NO SHARED SCORE', 'SLOW COMPARISON'] },
  after: { title: 'Repeatable nutrition audit', signals: ['RISK SEGMENTS', 'PRODUCT RANKINGS', 'ACTIONABLE FILTERS'] },
  takeaway: 'A repeatable catalog audit that turns nutritional attributes into clear product decisions.',
  outcome: 'Delivered an interactive dashboard for risk segmentation, inventory quality audits, and healthier-product recommendations.',
  outcomeLong: 'The completed pipeline connects raw nutritional data to a normalized database, reusable SQL analysis, engineered health metrics, and an interactive Power BI experience. It gives product and quality teams a clearer basis for catalog audits, reformulation review, and healthier alternative mapping.',
}

export function FoodHealthCaseStudy() {
  return <CaseStudyLayout project={project} />
}
