import {
  FaChartLine,
  FaChartBar,
  FaDatabase,
  FaFileExcel,
  FaMicrosoft,
  FaPython,
  FaTable,
  FaRegChartBar,
} from 'react-icons/fa'
import { SiPandas, SiNumpy } from 'react-icons/si'
import { BiBarChartAlt2 } from 'react-icons/bi'

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

export const heroStats = [
  { label: 'Projects Built', value: 12 },
  { label: 'Datasets Analyzed', value: 25 },
  { label: 'Dashboards Designed', value: 8 },
]

export const skills = [
  { name: 'SQL', level: 90, icon: FaDatabase },
  { name: 'Python', level: 85, icon: FaPython },
  { name: 'Power BI', level: 88, icon: FaMicrosoft },
  { name: 'Excel', level: 90, icon: FaFileExcel },
  { name: 'Tableau', level: 75, icon: FaChartBar },
  { name: 'Pandas', level: 84, icon: SiPandas },
  { name: 'NumPy', level: 80, icon: SiNumpy },
  { name: 'Statistics', level: 78, icon: FaChartLine },
  { name: 'Data Cleaning', level: 88, icon: FaTable },
  { name: 'Dashboard Design', level: 85, icon: BiBarChartAlt2 },
  { name: 'Data Visualization', level: 87, icon: FaRegChartBar },
]

export const certifications = [
  {
    title: 'Google Data Analytics Professional Certificate',
    provider: 'Coursera / Google',
    date: 'Month 2026',
    credentialUrl: '#',
  },
  {
    title: 'Microsoft Power BI Data Analyst Associate',
    provider: 'Microsoft',
    date: 'Month 2026',
    credentialUrl: '#',
  },
  {
    title: 'SQL for Data Analysis Certification',
    provider: 'DataCamp',
    date: 'Month 2026',
    credentialUrl: '#',
  },
]

export const projects = [
  {
    title: 'Karnataka AQI Analysis',
    problem: 'Analyzed Government of India CPCB air quality data to uncover pollution trends, city-wise health risks, and seasonal environmental impact across Karnataka using Python and Power BI.',
    tools: ['Power BI', 'Python', 'Pandas', 'Data Cleaning', 'Statistics'],
    insights:
      'Tumkur, Davangere, and Bengaluru emerged as the most polluted cities. Winter recorded the highest pollution levels, while NO₂ indicated traffic as a major pollution source.',
    imageLabel: 'Air Quality Dashboard',
    githubUrl: 'https://github.com/samhoon000/Karnataka_AQI_Analysis.git',
    images: ['/karnataka-aqi-1.png'],
  },
  {
    title: 'Customer Churn Prediction',
    problem: 'Subscription business needed early warnings for high-risk customer segments.',
    tools: ['Python', 'Pandas', 'Scikit-learn', 'Tableau'],
    insights:
      'Built a churn scoring workflow that highlighted retention levers such as usage frequency and support delays.',
    imageLabel: 'Churn Model Insights',
    githubUrl: '#',
    demoUrl: '#',
    caseStudyUrl: '#',
  },
  {
    title: 'Apple Stock Price Analysis Dashboard',
    problem: 'Investors and analysts needed historical stock insights to understand Apple’s long-term growth, volatility trends, and monthly performance behavior.',
    tools: ['Power BI', 'Excel', 'DAX', 'Finance Analytics'],
    insights:
      'Built an interactive Power BI dashboard showing stock growth trends, monthly average closing prices, yearly volatility spikes, bullish vs bearish trading days, and trading volume patterns.',
    imageLabel: 'Apple Stock Price Dashboard',
    githubUrl: 'https://github.com/samhoon000/apple-stock-trend-dashboard.git',
    images: ['/Apple-Stock-1.png', '/Apple-Stock-2.png'],
  },
  {
    title: 'SQL Business Insights Explorer',
    problem: 'Decision makers needed self-serve insights from transactional datasets without BI latency.',
    tools: ['SQL', 'PostgreSQL', 'Metabase'],
    insights:
      'Designed analytical SQL queries that surfaced revenue drivers, repeat purchase behavior, and cohort patterns.',
    imageLabel: 'SQL Insights Panel',
    githubUrl: '#',
    demoUrl: '#',
    caseStudyUrl: '#',
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
