import { DocumentViewer } from './document-viewer'

export function InstacartPresentation() {
  return (
    <DocumentViewer
      title="Project Presentation"
      subtitle="Presentation used to explain the project, methodology, and key business outcomes."
      docUrl="/instacart-presentation.pdf"
      backRoute="/project/instacart"
    />
  )
}
