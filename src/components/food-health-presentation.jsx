import { DocumentViewer } from './document-viewer'

export function FoodHealthPresentation() {
  return (
    <DocumentViewer
      title="Project Presentation"
      subtitle="Presentation used to explain the project, methodology, and key business outcomes."
      docUrl="/food-health-presentation.pdf"
      backRoute="/project/food-health"
    />
  )
}
