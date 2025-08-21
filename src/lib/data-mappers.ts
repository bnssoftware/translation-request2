import { TranslationRequest } from '@/lib/mock-data'
import { TranslationRequestData } from '@/components/TranslationRequestForm'

/**
 * Maps TranslationRequest from API to TranslationRequestData for form component
 */
export function mapTranslationRequestToFormData(request: TranslationRequest): TranslationRequestData {
  return {
    id: request.id.toString(),
    status: mapApiStatusToFormStatus(request.status),
    requestType: 'translation', // Default since API has different structure
    member: 'C/N', // Default value
    phi: 'no', // Default value
    memberFacing: 'no', // Default value
    raTemplate: 'no', // Default value
    guidingCare: 'no', // Default value
    level: 'common', // Default value
    lineOfBusiness: request.projectType,
    documentType: request.projectType,
    language: [request.targetLanguage], // Convert single language to array
    requestedBy: request.requestedBy,
    department: 'General', // Default since API doesn't have this field
    secondContact: '',
    pageCount: Math.ceil(request.estimatedWords / 250), // Estimate pages from word count
    estimatedTurnaroundTime: calculateTurnaroundTime(request.requestedDate, request.dueDate),
    days: calculateDaysFromDates(request.requestedDate, request.dueDate),
    date: new Date(request.requestedDate).toISOString().split('T')[0],
    expedite: request.priority === 'high' ? 'yes' : 'no',
    neededBy: new Date(request.dueDate).toLocaleDateString(),
    translateIntoEnglish: request.targetLanguage === 'en' ? 'yes' : 'no',
    notes: request.specialInstructions || request.description,
    submittedDate: request.requestedDate,
    assignedTo: '', // API doesn't have this field
    completedDate: undefined,
    attachments: [
      { id: 'doc1', name: 'source_document.pdf', size: '2.4 MB' },
      { id: 'doc2', name: 'reference_materials.docx', size: '1.8 MB' },
      { id: 'doc3', name: 'glossary.xlsx', size: '892 KB' }
    ]
  }
}

function mapApiStatusToFormStatus(apiStatus: string): 'draft' | 'new' | 'in-progress' | 'completed' | 'returned' | 'past-due' {
  switch (apiStatus) {
    case 'pending': return 'new'
    case 'in-progress': return 'in-progress'
    case 'completed': return 'completed'
    case 'review': return 'returned'
    default: return 'new'
  }
}

function calculateTurnaroundTime(requestedDate: string, dueDate: string): string {
  const days = calculateDaysFromDates(requestedDate, dueDate)
  if (days <= 1) return '24 Hour Rush'
  if (days <= 3) return '72 Hour Expedite'
  return `${days} business days`
}

function calculateDaysFromDates(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}