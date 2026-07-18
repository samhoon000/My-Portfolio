import { DocumentViewer } from './document-viewer'

export function FoodHealthReport() {
  return (
    <DocumentViewer
      title="Project Report"
      subtitle="Complete methodology, EDA, SQL analysis, dashboard explanation, and business findings."
      docUrl="/food-health-report.pdf"
      backRoute="/project/food-health"
    />
  )
}
