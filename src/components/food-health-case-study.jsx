import { CaseStudyLayout } from './case-study-layout'

const project = {
  category: 'Data engineering · Business intelligence',
  shortName: 'Nutrition analytics',
  title: 'Food Nutrition & Health Risk Analytics System',
  summary: 'An end-to-end BI system for auditing nutritional quality, identifying product risk, and comparing healthier alternatives.',
  tools: ['Python', 'Pandas', 'SQL', 'MySQL', 'Power BI', 'ETL'],
  images: ['/food-health-dashboard.png'],
  github: 'https://github.com/samhoon000/food-health-risk-analysis',
  reportRoute: '/project/food-health/report',
  presentationRoute: '/project/food-health/presentation',
  problem: 'Food manufacturers, nutrition analysts, and quality teams often manage large product databases without a centralized way to compare nutritional quality, flag risky products, or prioritize healthier alternatives. Manual review makes catalog-wide decisions slow and inconsistent.',
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
  takeaway: 'A repeatable catalog audit that turns nutritional attributes into clear product decisions.',
  outcome: 'Delivered an interactive dashboard for risk segmentation, inventory quality audits, and healthier-product recommendations.',
  outcomeLong: 'The completed pipeline connects raw nutritional data to a normalized database, reusable SQL analysis, engineered health metrics, and an interactive Power BI experience. It gives product and quality teams a clearer basis for catalog audits, reformulation review, and healthier alternative mapping.',
}

export function FoodHealthCaseStudy() {
  return <CaseStudyLayout project={project} />
}
