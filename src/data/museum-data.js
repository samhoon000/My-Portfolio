// Portfolio content and paths to genuine project assets.
export const profile = {
  name: 'Abdul Samhoon',
  headline: 'Turning data into decisions.',
  intro: 'I’m an aspiring data analyst who turns messy information into clear questions, useful dashboards, and decisions people can act on.',
  education: 'B.E. in Artificial Intelligence & Data Science · Class of 2027',
  experience: 'Data Analyst Intern · Trinetro Labs',
  roles: ['Data Analyst Intern', 'Business Analyst Intern', 'BI Analyst Intern', 'Product Analyst Intern'],
  portrait: '/AbdulSamhoon.jpg',
  resume: '/Abdul_Samhoon_Resume.pdf',
  email: 'bdlsmhn@gmail.com',
  github: 'https://github.com/samhoon000',
  linkedin: 'https://www.linkedin.com/in/abdul-samhoon-0bb8b5330/',
}

export const projects = [
  {
    slug: 'instacart', number: '01', title: 'Instacart Customer Analytics', category: 'Customer intelligence', theme: 'cyan',
    teaser: 'What do 3.4 million orders reveal about what customers buy again?',
    problem: 'A large order history can hide the patterns that matter for product, inventory, and retention decisions.',
    data: 'The Instacart market basket dataset contains more than 3.4 million orders and related product and department records.',
    investigation: 'Prepared the data with Python and Pandas, queried it with DuckDB and SQL, then explored reorder behavior, basket composition, customer segments, and department performance in Power BI.',
    insights: 'The dashboard makes purchasing trends, loyalty signals, and reorder behavior visible across an executive overview and customer insights view.',
    implication: 'These views can guide inventory planning and help teams ask more precise retention and merchandising questions.',
    tools: ['Python', 'Pandas', 'DuckDB', 'SQL', 'Power BI'],
    images: ['/instacart-executive-overview.png', '/instacart-customer-insights.png'],
    imageAlts: ['Instacart executive overview dashboard', 'Instacart customer insights dashboard'],
    repo: 'https://github.com/samhoon000/instacart-customer-analytics',
    documents: [{ label: 'Read report', href: '/instacart-report.pdf' }, { label: 'View presentation', href: '/instacart-presentation.pdf' }],
  },
  {
    slug: 'tamil-nadu-air-quality', number: '02', title: 'Tamil Nadu Air Quality Analysis', category: 'Data Analytics / Business Intelligence', theme: 'blue',
    teaser: 'What do five years of Tamil Nadu monitoring records reveal about pollution patterns and data coverage?',
    problem: 'Fragmented government monitoring files make it difficult to compare pollutant concentrations across cities, stations, and years with confidence.',
    data: 'The analysis covers 10,890 verified observations from 31 monitoring stations across 8 Tamil Nadu cities and urban areas, spanning 2011–2015. It examines PM₁₀/RSPM, PM₂.₅, NO₂, and SO₂ concentrations from CPCB and TNPCB ambient monitoring records.',
    investigation: 'Combined yearly CSV files, standardized changing schemas and date formats, audited duplicates and invalid values, and preserved missing readings without arbitrary imputation. Stored the validated dataset in Parquet, queried it with DuckDB and SQL, and built an interactive Power BI dashboard with DAX measures. A 30-observation screening threshold is an analytical safeguard for small-sample city comparisons, not a regulatory rule.',
    insights: 'The analysis observed persistent PM₁₀ concerns, higher chronic PM₁₀ levels in Thoothukudi and Trichy, and stronger NO₂ patterns in commercial and traffic-heavy corridors. Industrial locations showed more variable spikes rather than uniformly higher baselines. Sparse PM₂.₅ coverage and expansion from 16 stations in 5 cities to 31 in 8 limit direct year-over-year comparisons.',
    implication: 'The dashboard helps compare monthly trends, city and station hotspots, location types, extreme observations, and monitoring coverage while keeping data gaps visible. These patterns support further investigation; they do not establish causes.',
    tools: ['Python', 'SQL', 'Pandas', 'DuckDB', 'Power BI', 'DAX', 'Parquet'],
    images: ['/TamilNadu_Dashboard.png'], imageAlts: ['Tamil Nadu Air Quality Analysis Power BI dashboard'],
    repo: 'https://github.com/samhoon000/tamilnadu-air-quality-analysis', documents: [],
  },
  {
    slug: 'food-health', number: '03', title: 'Food Nutrition & Health Risk', category: 'Health analytics', theme: 'green',
    teaser: 'How can a product catalog become a practical nutrition risk view?',
    problem: 'A catalog of nutritional records needed a consistent way to surface potential risk and support product review.',
    data: 'The project analyzes more than 1,000 catalog items with nutrition attributes and semi-structured source records.',
    investigation: 'Cleaned and normalized the data using Python, Pandas, and MySQL; developed Nutritional Density Index and Health Risk Score measures; and built a Power BI review dashboard.',
    insights: 'The project report identifies 15% of catalog products as exceeding its critical sodium threshold.',
    implication: 'Risk segmentation gives product teams a starting point for prioritizing quality audits and exploring reformulation options.',
    tools: ['Python', 'Pandas', 'MySQL', 'SQL', 'Power BI'],
    images: ['/food-health-dashboard.png'], imageAlts: ['Food nutrition and health risk Power BI dashboard'],
    repo: 'https://github.com/samhoon000/food-health-risk-analysis',
    documents: [{ label: 'Read report', href: '/food-health-report.pdf' }, { label: 'View presentation', href: '/food-health-presentation.pdf' }],
  },
  {
    slug: 'food-prices', number: '04', title: 'India Food Price Intelligence', category: 'Market analytics', theme: 'blue',
    teaser: 'Where do commodity prices diverge, and which markets fluctuate most?',
    problem: 'Regional price variation can make market patterns difficult to read at a glance.',
    data: 'The project uses Indian agricultural commodity pricing data. The repository holds the source analysis and dashboard context.',
    investigation: 'Wrangled the pricing data with Python and Pandas and visualized commodity and regional comparisons in Power BI.',
    insights: 'The documented analysis identified tomato as the most volatile commodity studied and wheat as the most stable.',
    implication: 'The dashboard supports closer inspection of regional price differences and possible market inefficiencies.',
    tools: ['Python', 'Pandas', 'Power BI', 'Statistics'],
    images: ['/food-price-1.png', '/food-price-2.png'], imageAlts: ['India food price dashboard overview', 'India food price dashboard detail'],
    repo: 'https://github.com/samhoon000/indian-food-price-volatility', documents: [],
  },
  {
    slug: 'apple-stock', number: '05', title: 'Apple Stock Price Analysis', category: 'Financial analytics', theme: 'violet',
    teaser: 'How can historical market data be easier to explore?',
    problem: 'Long price histories need clear views of trends, trading activity, and volatility.',
    data: 'The project uses historical Apple stock market data for its dashboard analysis.',
    investigation: 'Modeled price and volume measures using Excel, Power BI, and DAX, including monthly averages and bullish versus bearish trading days.',
    insights: 'The dashboard visualizes historical stock trends, volume patterns, and changes in volatility.',
    implication: 'The presentation helps an analyst inspect periods of change before drawing further conclusions.',
    tools: ['Excel', 'Power BI', 'DAX'],
    images: ['/Apple-Stock-1.png', '/Apple-Stock-2.png'], imageAlts: ['Apple stock dashboard overview', 'Apple stock dashboard detail'],
    repo: 'https://github.com/samhoon000/apple-stock-trend-dashboard', documents: [],
  },
]

export const skillGroups = [
  { id: 'sql', number: '01', title: 'SQL & databases', description: 'Shape reliable questions with joins, aggregations, and data models.', tools: ['SQL', 'DuckDB', 'MySQL', 'Data modeling'], projectSlugs: ['instacart', 'tamil-nadu-air-quality', 'food-health'] },
  { id: 'python', number: '02', title: 'Python & analysis', description: 'Clean, explore, and transform raw records into analysis-ready data.', tools: ['Python', 'Pandas', 'NumPy', 'EDA'], projectSlugs: ['instacart', 'tamil-nadu-air-quality', 'food-health', 'food-prices'] },
  { id: 'bi', number: '03', title: 'Business intelligence', description: 'Translate analytical work into dashboards and decision-ready reporting.', tools: ['Power BI', 'DAX', 'Excel', 'KPI analysis'], projectSlugs: ['instacart', 'tamil-nadu-air-quality', 'food-health', 'apple-stock'] },
  { id: 'quality', number: '04', title: 'Data quality', description: 'Check missing values, normalize messy fields, and validate analytical inputs.', tools: ['Cleaning', 'Validation', 'Transformations'], projectSlugs: ['food-health', 'instacart', 'tamil-nadu-air-quality'] },
  { id: 'ml', number: '05', title: 'Statistics & ML', description: 'Use statistical thinking and applied machine learning when the question calls for it.', tools: ['Statistics', 'Scikit-learn', 'Model evaluation'], projectSlugs: ['food-prices'] },
]

export const credentials = [
  { title: 'Databases and SQL for Data Science with Python', issuer: 'IBM · Coursera', image: '/sql-certificate.png', href: 'https://www.coursera.org/account/accomplishments/verify/XD4ZGS1BGITR' },
  { title: 'Supervised Machine Learning: Regression and Classification', issuer: 'DeepLearning.AI & Stanford University · Coursera', image: '/ml-certificate.png', href: 'https://www.coursera.org/account/accomplishments/verify/UMQEPYDUIT2M' },
]

export const recognition = [
  { title: 'AI Sparkathon 2025 · 2nd prize', detail: 'Bearys Institute of Technology', image: '/ai-sparkathon-certificate.jpg' },
  { title: 'Hackwise 2.0 · Top 10', detail: 'National hackathon', image: '/hackwise-certificate.jpg' },
]
