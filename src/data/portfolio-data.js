import {
  FaChartLine,
  FaChartBar,
  FaDatabase,
  FaFileExcel,
  FaMicrosoft,
  FaPython,
  FaTable,
  FaRegChartBar,
  FaGithub,
  FaGitAlt,
  FaServer
} from 'react-icons/fa'
import { SiPandas, SiNumpy, SiScikitlearn } from 'react-icons/si'
import { BiBarChartAlt2 } from 'react-icons/bi'

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

export const heroStats = [
  { label: 'Projects Built', value: 8 },
  { label: 'Datasets Analyzed', value: 15 },
  { label: 'Dashboards Designed', value: 5 },
]

export const skills = {
  'Languages': [
    { name: 'Python', icon: FaPython },
    { name: 'SQL', icon: FaDatabase },
  ],
  'Libraries': [
    { name: 'Pandas', icon: SiPandas },
    { name: 'NumPy', icon: SiNumpy },
    { name: 'Scikit-Learn', icon: SiScikitlearn },
    { name: 'Matplotlib', icon: FaChartLine },
  ],
  'Analytics & BI': [
    { name: 'Power BI', icon: FaMicrosoft },
    { name: 'Excel', icon: FaFileExcel },
    { name: 'Data Cleaning', icon: FaTable },
    { name: 'EDA', icon: FaRegChartBar },
    { name: 'Feature Engineering', icon: BiBarChartAlt2 },
  ],
  'Developer Tools': [
    { name: 'Git', icon: FaGitAlt },
    { name: 'GitHub', icon: FaGithub },
    { name: 'MySQL', icon: FaDatabase },
    { name: 'phpMyAdmin', icon: FaServer },
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
    icon: '🥈',
    description: 'Secured 2nd Prize for building an AI-based personalized learning and career guidance platform. Demonstrated strong innovation and AI implementation.',
    image: '/ai-sparkathon-certificate.jpg',
  },
  {
    title: 'Top 10 – National Level Hackathon',
    organization: 'Hackwise 2.0 (9th Place)',
    icon: '🏆',
    description: 'Secured 9th place nationwide. Developed an innovative solution under competitive conditions demonstrating robust problem-solving.',
    image: '/hackwise-certificate.jpg',
  },
  {
    title: 'Hackathon Participation',
    organization: 'AXIOM, Google Agentic AI Day, InUnity Innovation',
    icon: '🚀',
    description: 'Actively participating in high-level hackathons and AI events, continuously exploring edge technologies and building real-world solutions under pressure.',
  },
]

export const projects = [
  {
    title: 'Early Warning System for Urban Pollution Spikes',
    problem: 'Government of India CPCB air quality data needed rigorous analysis to uncover hidden pollution trends, city-wise health risks, and seasonal environmental impacts across Karnataka.',
    approach: 'Engineered a comprehensive analytical pipeline using Python and Power BI to clean, process, and visualize complex environmental datasets, applying statistical techniques to model seasonal variations.',
    result: 'Identified Tumkur, Davangere, and Bengaluru as critical high-risk zones. Discovered actionable correlations between NO₂ levels and traffic, providing data-driven insights for urban planning.',
    tools: ['Power BI', 'Python', 'Pandas', 'Data Cleaning', 'Statistics'],
    insights:
      'Tumkur, Davangere, and Bengaluru emerged as the most polluted cities. Winter recorded the highest pollution levels, while NO₂ indicated traffic as a major pollution source.',
    imageLabel: 'Air Quality Dashboard',
    githubUrl: 'https://github.com/samhoon000/Karnataka_AQI_Analysis.git',
    images: ['/karnataka-aqi-1.png'],
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
    title: 'Smart Pathways for Personalized Learning',
    problem: 'Students lacked a structured approach to discovering curated career resources and improving job readiness through intelligent guidance and realistic simulations.',
    approach: 'Developed an AI-powered platform utilizing the Groq API for automated quiz generation and real-time evaluation. Integrated a robust backend with MongoDB and Node.js.',
    result: 'Delivered an immersive mock interview system and dynamic learning paths, significantly enhancing student job readiness and creating a scalable AI application.',
    tools: ['React', 'Node.js', 'MongoDB', 'Groq API', 'AI / LLM'],
    insights:
      'Built as an Academic Team Project (collaborative development). Integrated Groq API for automated quiz generation and real-time evaluation. Designed mock interview system to simulate real job scenarios. Enabled networking features to connect learners with peers and mentors.',
    imageLabel: 'AI Learning Platform',
    githubUrl: 'https://github.com/samhoon000/Career-Guidance.git',
    demoUrl: 'https://skillquest-xwzr.onrender.com/',
    themeClasses: {
      cardHover: 'hover:border-purple-500/50',
      button: 'border-purple-500/50 bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white focus-visible:ring-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.2)] hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]',
      imageHover: 'hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]',
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
