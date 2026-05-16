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
  { label: 'Projects Built', value: 8 },
  { label: 'Datasets Analyzed', value: 15 },
  { label: 'Dashboards Designed', value: 5 },
]

export const skills = [
  { name: 'SQL', level: 60, icon: FaDatabase },
  { name: 'Python', level: 70, icon: FaPython },
  { name: 'Power BI', level: 70, icon: FaMicrosoft },
  { name: 'Excel', level: 75, icon: FaFileExcel },
  { name: 'Tableau', level: 60, icon: FaChartBar },
  { name: 'Pandas', level: 75, icon: SiPandas },
  { name: 'NumPy', level: 65, icon: SiNumpy },
  { name: 'Statistics', level: 60, icon: FaChartLine },
  { name: 'Data Cleaning', level: 75, icon: FaTable },
  { name: 'Dashboard Design', level: 75, icon: BiBarChartAlt2 },
  { name: 'Data Visualization', level: 75, icon: FaRegChartBar },
]

export const certifications = [
  {
    title: 'Hackwise 2.0 National Hackathon – Top 10 (Secured 9th Place)',
    provider: 'KVG College of Engineering',
    date: '',
    description: 'Secured 9th place in a national-level hackathon by developing an innovative solution under competitive conditions. Demonstrated strong problem-solving, teamwork, and real-world project execution skills.',
    credentialUrl: 'https://hackwise.spherehive.in/verify',
    image: '/hackwise-certificate.jpg',
    theme: 'gold',
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
  {
    title: 'AI Sparkathon 2025 – Second Prize',
    provider: 'Bearys Institute of Technology (BIT), Mangalore',
    date: '',
    description: 'Secured 2nd Prize in AI Sparkathon 2025 for building an AI-based personalized learning and career guidance platform. Demonstrated strong innovation, teamwork, and real-world problem-solving skills.',
    image: '/ai-sparkathon-certificate.jpg',
    theme: 'gold-prominent',
  },
  {
    title: 'Databases and SQL for Data Science with Python',
    provider: 'IBM (via Coursera)',
    date: '',
    description: 'Successfully completed a course focused on SQL, database fundamentals, data retrieval, filtering, joins, aggregations, and working with databases using Python. Strengthened foundational skills in SQL and data analysis for real-world applications.',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/XD4ZGS1BGITR',
    image: '/sql-certificate.png',
    theme: 'sql',
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
