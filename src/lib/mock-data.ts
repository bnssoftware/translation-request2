export interface TranslationRequest {
  id: number
  title: string
  description: string
  sourceLanguage: string
  targetLanguage: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'completed' | 'review'
  requestedBy: string
  requestedDate: string
  dueDate: string
  estimatedWords: number
  projectType: string
  specialInstructions: string
}

export const mockTranslationRequests: TranslationRequest[] = [
  {
    id: 1,
    title: 'Website Homepage Translation',
    description: 'Translate the main homepage content from English to Spanish',
    sourceLanguage: 'en',
    targetLanguage: 'es',
    priority: 'high',
    status: 'pending',
    requestedBy: 'john.doe@company.com',
    requestedDate: '2025-08-15T10:30:00Z',
    dueDate: '2025-08-25T17:00:00Z',
    estimatedWords: 1200,
    projectType: 'website',
    specialInstructions: 'Please maintain formal tone and include cultural adaptations for Spanish market'
  },
  {
    id: 2,
    title: 'Technical Documentation Translation',
    description: 'Translate API documentation from English to French',
    sourceLanguage: 'en',
    targetLanguage: 'fr',
    priority: 'medium',
    status: 'in-progress',
    requestedBy: 'sarah.smith@company.com',
    requestedDate: '2025-08-10T14:15:00Z',
    dueDate: '2025-08-30T12:00:00Z',
    estimatedWords: 2500,
    projectType: 'documentation',
    specialInstructions: 'Technical terminology must be accurate and consistent'
  },
  {
    id: 3,
    title: 'Marketing Brochure Translation',
    description: 'Translate marketing materials from English to German and Italian',
    sourceLanguage: 'en',
    targetLanguage: 'de,it',
    priority: 'low',
    status: 'completed',
    requestedBy: 'mike.wilson@company.com',
    requestedDate: '2025-08-05T09:00:00Z',
    dueDate: '2025-08-20T16:00:00Z',
    estimatedWords: 800,
    projectType: 'marketing',
    specialInstructions: 'Adapt marketing copy for local markets'
  },
  {
    id: 4,
    title: 'Legal Contract Translation',
    description: 'Translate service agreement from English to Japanese',
    sourceLanguage: 'en',
    targetLanguage: 'ja',
    priority: 'high',
    status: 'review',
    requestedBy: 'legal@company.com',
    requestedDate: '2025-08-18T11:45:00Z',
    dueDate: '2025-08-28T15:30:00Z',
    estimatedWords: 3200,
    projectType: 'legal',
    specialInstructions: 'Requires certified translation with legal accuracy'
  }
]

export function getTranslationRequestById(id: number): TranslationRequest | undefined {
  return mockTranslationRequests.find(request => request.id === id)
}