export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Stack' },
  { id: 'achievements', label: 'Recognition' },
  { id: 'certifications', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
]

export const heroStats = [
  { label: 'Projects Built', value: 8 },
  { label: 'Datasets Analyzed', value: 15 },
  { label: 'Dashboards Designed', value: 5 },
]

export const experiences = [
  {
    role: 'Data Analyst Intern',
    company: 'Trinetro Labs',
    location: 'Remote',
    period: 'August 2026 – Present',
    companyUrl: 'https://trinetrolabs.com/',
    linkedinUrl: 'https://www.linkedin.com/company/trinetrolabs/posts/?feedView=all',
    description: [
      'Joined Trinetro Labs as a remote Data Analyst Intern.',
      'Working with SQL databases and AI-powered business intelligence solutions.',
      'Gaining hands-on experience in data analysis, semantic modeling, and analytics workflows.',
      'Collaborating with the product and engineering team in a startup environment.'
    ]
  }
]

export const skills = {
  'Languages': [
    { name: 'Python', logo: 'https://api.iconify.design/logos/python.svg', description: 'Data analysis · Automation · ML' },
    { name: 'SQL', logo: 'https://api.iconify.design/vscode-icons/file-type-sql.svg', description: 'Querying · Analytics · Databases' },
  ],
  'Libraries & Frameworks': [
    { name: 'Pandas', logo: 'https://api.iconify.design/logos/pandas-icon.svg', description: 'Data manipulation' },
    { name: 'NumPy', logo: 'https://api.iconify.design/logos/numpy.svg', description: 'Numerical computing' },
    { name: 'Scikit-learn', logo: 'https://api.iconify.design/simple-icons/scikitlearn.svg?color=%23f7931e', description: 'Machine learning' },
    { name: 'Matplotlib', logo: 'https://api.iconify.design/logos/matplotlib-icon.svg', description: 'Data visualization' },
  ],
  'Analytics & BI': [
    { name: 'Power BI', logo: 'https://api.iconify.design/logos/microsoft-power-bi.svg', description: 'Business intelligence' },
    { name: 'Excel', logo: 'https://api.iconify.design/vscode-icons/file-type-excel.svg', description: 'Modeling · Reporting' },
    { name: 'Data Cleaning', description: 'Reliable, analysis-ready data' },
    { name: 'EDA', description: 'Patterns · Outliers · Insight' },
    { name: 'Feature Engineering', description: 'Signal from raw variables' },
  ],
  'Development & Databases': [
    { name: 'Git', logo: 'https://api.iconify.design/logos/git-icon.svg', description: 'Version control' },
    { name: 'GitHub', logo: 'https://api.iconify.design/mdi/github.svg?color=%23f4f2ed', description: 'Code collaboration' },
    { name: 'AWS', logo: 'https://api.iconify.design/logos/aws.svg', description: 'Cloud infrastructure' },
    { name: 'MySQL', logo: 'https://api.iconify.design/logos/mysql-icon.svg', description: 'Relational databases' },
    { name: 'phpMyAdmin', logo: 'https://api.iconify.design/simple-icons/phpmyadmin.svg?color=%236c78af', description: 'Database administration' },
  ]
}

export const certifications = [
  {
    title: 'Databases and SQL for Data Science with Python',
    provider: 'IBM (via Coursera)',
    date: '',
    description: 'Successfully completed a course focused on SQL, database fundamentals, data retrieval, filtering, joins, aggregations, and working with databases using Python. Strengthened foundational skills in SQL and data analysis for real-world applications.',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/XD4ZGS1BGITR',
    image: '/sql-certificate.png',
    theme: 'sql',
  },
  {
    title: 'Supervised Machine Learning: Regression and Classification',
    provider: 'DeepLearning.AI & Stanford University (via Coursera)',
    date: '',
    description: 'Completed a foundational machine learning course covering regression and classification techniques, model evaluation, and real-world applications. Gained hands-on understanding of core ML concepts guided by Andrew Ng.',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/UMQEPYDUIT2M?utm_source=mobile&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course',
    image: '/ml-certificate.png',
    theme: 'ai',
  },
]

export const achievements = [
  {
    title: '2nd Prize – AI Sparkathon 2025',
    organization: 'Bearys Institute of Technology',
    badge: '2nd Place',
    icon: 'Trophy',
    description: 'Secured second place for developing an AI-powered personalized learning and career guidance platform. Demonstrated strong teamwork, solution design, and practical AI implementation in a competitive environment.',
    image: '/ai-sparkathon-certificate.jpg',
  },
  {
    title: 'Top 10 – National Level Hackathon',
    organization: 'Hackwise 2.0',
    badge: '9th National Rank',
    icon: 'Award',
    description: 'Ranked among the Top 10 teams nationally by designing and presenting an innovative technology solution within a time-constrained hackathon.',
    image: '/hackwise-certificate.jpg',
  },
  {
    title: 'Technical Events & Innovation',
    organization: 'AXIOM • Google Agentic AI Day • InUnity Innovation',
    badge: 'Participant',
    icon: 'Shield',
    description: 'Participated in multiple AI and software development events, collaborating with teams to prototype innovative solutions, explore emerging technologies, and strengthen practical problem-solving skills.',
  },
]

export const projects = [
  {
    title: 'Food Nutrition & Health Risk Analytics System',
    problem: 'Nutrition analysts and quality control teams lacked a scalable business intelligence solution to audit product safety profiles, segment inventories by safety parameters, and identify high-risk product lines across a 1,000+ item catalog.',
    approach: 'Engineered a robust ETL and data warehousing pipeline using Python, Pandas, and MySQL. Normalized semi-structured nutritional databases, handled missing data, and engineered two proprietary KPIs: Nutritional Density Index and Health Risk Score. Wrote SQL-based queries to segment inventory into distinct risk categories.',
    result: 'Delivered an interactive Power BI dashboard providing product managers with real-time risk segmentations and inventory quality audits. Successfully identified that 15% of catalog products exceeded critical sodium thresholds, driving recommendations for product reformulation and mapping high-margin healthier alternatives.',
    tools: ['Power BI', 'Python', 'SQL', 'MySQL', 'Pandas', 'Data Analytics'],
    insights:
      'Delivered an interactive Power BI dashboard providing product managers with real-time risk segmentations and inventory quality audits. Successfully identified that 15% of catalog products exceeded critical sodium thresholds, driving recommendations for product reformulation and mapping high-margin healthier alternatives.',
    imageLabel: 'Food Nutrition & Health Risk Analytics System',
    githubUrl: 'https://github.com/samhoon000/food-health-risk-analysis',
    images: ['/food-health-dashboard.png'],
    buttonText: 'Explore Project',
  },
  {
    title: 'Instacart Customer Analytics Dashboard',
    problem: 'Retail businesses generate millions of transactions but often lack centralized analytics to understand purchasing behavior, reorder trends, and product performance, limiting data-driven inventory and marketing decisions.',
    approach: 'Built an end-to-end analytics pipeline using Python, Pandas, DuckDB, SQL, and Power BI to analyze 3.4M+ orders and millions of product transactions. Performed customer segmentation, basket analysis, reorder analysis, and department performance analysis to build executive dashboards with business KPIs.',
    result: 'Delivered an interactive Power BI dashboard highlighting purchasing trends, customer loyalty, reorder behavior, and subscription opportunities. Generated insights supporting inventory optimization, customer retention, and targeted marketing decisions.',
    tools: ['Power BI', 'Python', 'DuckDB', 'SQL', 'Pandas', 'Data Analytics'],
    insights:
      'Delivered an interactive Power BI dashboard highlighting purchasing trends, customer loyalty, reorder behavior, and subscription opportunities. Generated insights supporting inventory optimization, customer retention, and targeted marketing decisions.',
    imageLabel: 'Instacart Customer Analytics Dashboard',
    githubUrl: 'https://github.com/samhoon000/instacart-customer-analytics',
    images: ['/instacart-executive-overview.png', '/instacart-customer-insights.png'],
    buttonText: 'Explore Project',
  },
  {
    title: 'India Food Price Intelligence Dashboard',
    problem: 'Agricultural commodity price volatility lacked transparency, making it difficult to uncover market risks, overpaying regions, and state-wise fluctuations for informed trading.',
    approach: 'Built a robust market intelligence dashboard in Power BI. Utilized Python and Pandas for deep data wrangling and feature extraction from raw pricing datasets.',
    result: 'Successfully mapped overpaying vs. underpaying markets across India. Proved Tomato had the highest price volatility, transforming raw data into a strategic tool for policy and trading decisions.',
    tools: ['Power BI', 'Python', 'Pandas', 'Statistics', 'Market Analytics'],
    insights:
      'Tomato showed the highest price volatility, while Wheat remained most stable. Certain markets significantly overpaid compared to national averages, while others consistently underpaid. Southern and northeastern states showed stronger pricing fluctuations.',
    imageLabel: 'Market Price Dashboard',
    githubUrl: 'https://github.com/samhoon000/indian-food-price-volatility.git',
    images: ['/food-price-1.png', '/food-price-2.png'],
    themeClasses: {
      cardHover: 'hover:border-emerald/50',
      button: 'border-emerald/50 bg-emerald/10 text-emerald hover:bg-emerald hover:text-base focus-visible:ring-emerald shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]',
      imageHover: 'hover:border-emerald/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]',
    }
  },
  {
    title: 'Apple Stock Price Analysis Dashboard',
    problem: 'Investors and analysts needed a clear, historical perspective on Apple’s stock to understand long-term growth, volatility spikes, and trading behavior.',
    approach: 'Engineered an interactive financial analytics dashboard using Excel and Power BI, applying advanced DAX queries to model trading volume and price trends.',
    result: 'Provided a high-fidelity visual analysis of monthly average closing prices and bullish vs. bearish days, enabling quicker and more accurate financial assessments.',
    tools: ['Power BI', 'Excel', 'DAX', 'Finance Analytics'],
    insights:
      'Built an interactive Power BI dashboard showing stock growth trends, monthly average closing prices, yearly volatility spikes, bullish vs bearish trading days, and trading volume patterns.',
    imageLabel: 'Apple Stock Price Dashboard',
    githubUrl: 'https://github.com/samhoon000/apple-stock-trend-dashboard.git',
    images: ['/Apple-Stock-1.png', '/Apple-Stock-2.png'],
  },
]

export const practicalExposure = [
  'Aug 2026 – Present: Data Analyst Intern — Trinetro Labs (Remote)',
  'Built end-to-end analytics projects from data cleaning to dashboard storytelling.',
  'Worked with real-world datasets from healthcare, sales, and customer domains.',
  'Developed strong self-learning habits through hands-on case studies and certifications.',
  'Continuously upskilling in SQL, Python, Power BI, and business analytics frameworks.',
]

export const contactDetails = {
  email: 'bdlsmhn@gmail.com',
  linkedin: 'https://www.linkedin.com/in/abdul-samhoon-0bb8b5330/',
  github: 'https://github.com/samhoon000',
}
