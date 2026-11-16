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
    title: 'Oribi — DataFrame Intelligence & Dataset Profiling Library',
    problem: 'Analysts and AI systems often start working with a dataset without first understanding its structure, grain, identifiers, missingness, or semantic roles. This can result in incorrect assumptions and unreliable analysis.',
    approach: 'Oribi is an open-source Python library that inspects pandas DataFrames and creates structured, evidence-backed analytical context before analysis. Its deterministic heuristics report likely structure, semantics, keys, grain, observed relationships, and analytical warnings.',
    result: 'A structured dataset snapshot that analysts, data scientists, and downstream AI or data-analysis tooling can use before writing analysis or generating code. Inferences describe evidence and are not guaranteed business meanings.',
    tools: ['Python', 'Pandas', 'Open Source', 'Data Profiling'],
    insights: 'The repository documents dataset shape and duplicates, column statistics and missingness, likely semantic roles, candidate keys, likely grain, observed functional dependencies, and warnings for potential analytical issues.',
    imageLabel: 'Oribi evidence-backed dataset context diagram',
    githubUrl: 'https://github.com/samhoon000/Oribi',
    images: ['/oribi-profile.png'],
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
