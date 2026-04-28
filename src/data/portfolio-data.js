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
    title: 'India Food Price Intelligence Dashboard',
    problem: 'Analyzed agricultural commodity price data across India to uncover market volatility, overpaying vs underpaying markets, state-wise price fluctuations, and commodity risk patterns. The goal was to transform raw pricing data into actionable insights for smarter trading and policy decisions.',
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
    problem: 'Investors and analysts needed historical stock insights to understand Apple’s long-term growth, volatility trends, and monthly performance behavior.',
    tools: ['Power BI', 'Excel', 'DAX', 'Finance Analytics'],
    insights:
      'Built an interactive Power BI dashboard showing stock growth trends, monthly average closing prices, yearly volatility spikes, bullish vs bearish trading days, and trading volume patterns.',
    imageLabel: 'Apple Stock Price Dashboard',
    githubUrl: 'https://github.com/samhoon000/apple-stock-trend-dashboard.git',
    images: ['/Apple-Stock-1.png', '/Apple-Stock-2.png'],
  },
  {
    title: 'Smart Pathways for Personalized Learning',
    problem: 'Developed an AI-powered platform to help students navigate structured learning paths, discover curated career resources, and improve job readiness through intelligent guidance.',
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
