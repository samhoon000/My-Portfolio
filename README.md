# My Portfolio - Data Analyst Project Showcase

A professional portfolio repository designed to present **Data Analyst capabilities** through project storytelling, structured analysis workflow, and technical documentation. The focus is on demonstrating practical skills in **SQL**, **Python**, and business-focused data analysis for placement and interview discussions.

## Problem Statement

Recruiters and hiring managers often need clear evidence of analytical thinking beyond certificates.  
This project addresses that gap by organizing portfolio content around real-world analysis components: data modeling, SQL querying, insight extraction, and communication of business impact.

## Objectives

- Build a portfolio that highlights **job-ready Data Analyst skills**
- Demonstrate ability to work with **relational schema design** and SQL analytics
- Present analysis outcomes in a structured, recruiter-friendly format
- Provide a clean, maintainable codebase for continuous portfolio updates
- Create a reusable project format for future analytics case studies

## Dataset Description

The analysis context in this portfolio is based on a job-market-style dataset and includes entities such as companies, roles, compensation, and hiring trends.

- **Source type:** Structured tabular data (CSV/SQL-ready format)
- **Scope:** Company-level and job-level records
- **Typical fields:** Company name, role title, salary ranges, location, posting date, required skills, demand indicators
- **Use case:** Trend analysis for salary benchmarking, role demand, and hiring timelines

> Note: Replace this section with exact dataset source links and row/column counts when finalized.

## Database Schema

The analysis model is organized with the following core tables:

- `companies` - company master data (industry, location, organization attributes)
- `jobs` - job postings and role metadata
- `salaries` - compensation fields (min, max, median, currency, normalized values)
- `job_metrics` - computed indicators (demand score, skill frequency, competitiveness index)
- `job_time` - temporal dimensions (posting date, month, quarter, trend windows)

### Example Schema Relationships

- `companies.company_id` -> `jobs.company_id`
- `jobs.job_id` -> `salaries.job_id`
- `jobs.job_id` -> `job_metrics.job_id`
- `jobs.posted_date` -> `job_time.date_key`

## Key SQL Queries / Analysis Performed

- Salary distribution analysis by role and location
- Top in-demand skills by job category
- Company-wise hiring intensity and trend movement
- Time-series analysis of job postings (monthly/quarterly)
- Outlier detection on salary bands and compensation spread
- Role competitiveness analysis using posting volume vs. skill overlap

```sql
-- Example: median salary by role
SELECT
    j.role_title,
    percentile_cont(0.5) WITHIN GROUP (ORDER BY s.salary_normalized) AS median_salary
FROM jobs j
JOIN salaries s ON j.job_id = s.job_id
GROUP BY j.role_title
ORDER BY median_salary DESC;
```

```sql
-- Example: monthly posting trend
SELECT
    jt.year_month,
    COUNT(*) AS total_postings
FROM jobs j
JOIN job_time jt ON j.posted_date = jt.date_key
GROUP BY jt.year_month
ORDER BY jt.year_month;
```

## Insights / Findings

- **Salary variance is role-sensitive:** analyst-specialized tracks show significantly wider salary bands than general reporting roles.
- **Skill concentration matters:** SQL + Python combinations appear most frequently in higher-paying clusters.
- **Hiring activity is cyclical:** posting volume shows periodic spikes aligned with quarter boundaries.
- **Location and compensation are tightly linked:** metro-focused postings trend higher compensation but higher role competition.

> Placeholder: Add 3-5 quantified findings with exact percentages and SQL-backed evidence.

## Tools & Technologies Used

- **SQL:** PostgreSQL/MySQL-style analytical querying
- **Python:** Data cleaning and exploratory analysis (Pandas, NumPy)
- **Visualization:** Matplotlib/Seaborn/BI screenshots (as applicable)
- **Frontend Portfolio Stack:** React, Vite, JavaScript, TailwindCSS, CSS
- **Version Control:** Git, GitHub

## Project Structure

```text
Samhoon_Portfolio/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── README.md
```

## How to Run / Setup Instructions

```bash
# 1) Clone repository
git clone https://github.com/samhoon000/My-Portfolio.git

# 2) Move into project folder
cd My-Portfolio

# 3) Install dependencies
npm install

# 4) Start development server
npm run dev

# 5) Build for production
npm run build
```

## Future Work

- Add a dedicated `sql/` folder with production-grade query scripts
- Publish data dictionary and schema ER diagram
- Integrate Python notebooks for reproducible analysis workflow
- Add KPI dashboard snapshots with business interpretations
- Include benchmark comparisons across industries and regions
- Expand project documentation with test cases and assumptions

## Screenshots

Screenshots are available in the `screenshots/` directory to demonstrate:

- Portfolio landing page
- Project section highlighting data analyst work
- Query output samples / dashboard previews
- Key insight visualization snapshots

> Placeholder: Add image links once screenshot files are finalized.

## Conclusion

This repository is structured as an interview-ready portfolio foundation to communicate **end-to-end Data Analyst capability**: from data modeling and SQL analysis to insight communication and professional presentation. It is designed to be continuously expanded with deeper analytics projects and measurable business outcomes.
