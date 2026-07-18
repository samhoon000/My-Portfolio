import { DocumentViewer } from './document-viewer'

export function InstacartReport() {
  return (
    <DocumentViewer
      title="Project Report"
      subtitle="Complete methodology, EDA, SQL analysis, DuckDB pipeline explanation, and business findings."
      docUrl="/instacart-report.pdf"
      backRoute="/project/instacart"
    />
  )
}
