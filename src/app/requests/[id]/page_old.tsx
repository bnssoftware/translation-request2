'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import TranslationRequestForm, { TranslationRequestData } from "@/components/TranslationRequestForm"

// Mock data for different request IDs
const mockRequests: Record<string, TranslationRequestData> = {
  '1': {
    id: '76227',
    status: 'draft',
    requestType: 'translation',
    member: 'C/N',
    phi: 'yes',
    memberFacing: 'yes',
    raTemplate: 'yes',
    guidingCare: 'no',
    level: 'common',
    lineOfBusiness: 'Medicare Advantage',
    documentType: 'Member Communication',
    language: 'Spanish',
    requestedBy: 'John Smith',
    department: 'Member Services',
    secondContact: 'Please indicate a 2nd contact if you plan on being out of the office at any point during the processing of this request',
    pageCount: 5,
    estimatedTurnaroundTime: 'Subject to change based on C&L review, or unforeseen circumstances',
    days: 3,
    date: '2024-12-01',
    expedite: 'no',
    neededBy: '72 Hour Expedite',
    translateIntoEnglish: 'no',
    notes: 'Please ensure medical terminology is accurate and culturally appropriate for Spanish-speaking members.',
    submittedDate: '2024-11-01',
    assignedTo: 'Maria Rodriguez',
    attachments: [
      { id: 'a1', name: 'member_communication.pdf', size: '2.4 MB' },
      { id: 'a2', name: 'reference_docs.docx', size: '1.8 MB' }
    ],
    comments: [
      { id: 'c1', author: 'Maria Rodriguez', message: 'Started working on this. Expected completion by Dec 1st.', timestamp: '2024-11-02 09:30' },
      { id: 'c2', author: 'John Smith', message: 'Thanks! Let me know if you need any clarification on medical terms.', timestamp: '2024-11-02 14:15' }
    ]
  },
  '2': {
    id: '76228',
    status: 'in-progress',
    requestType: 'review',
    member: 'Provider',
    phi: 'no',
    memberFacing: 'no',
    raTemplate: 'no',
    guidingCare: 'yes',
    level: 'intermediate',
    lineOfBusiness: 'Commercial',
    documentType: 'Training Materials',
    language: 'French',
    requestedBy: 'Sarah Johnson',
    department: 'Training',
    secondContact: 'Mike Wilson - Training Coordinator',
    pageCount: 12,
    estimatedTurnaroundTime: '5-7 business days',
    days: 5,
    date: '2024-12-05',
    expedite: 'no',
    neededBy: 'Standard Timeline',
    translateIntoEnglish: 'yes',
    notes: 'Technical training materials for provider network. Maintain professional terminology.',
    submittedDate: '2024-10-15',
    assignedTo: 'Pierre Dubois',
    completedDate: '2024-11-20',
    attachments: [
      { id: 'a3', name: 'training_materials.zip', size: '5.2 MB' }
    ],
    comments: [
      { id: 'c3', author: 'Pierre Dubois', message: 'Review completed. Files ready for final approval.', timestamp: '2024-11-20 16:45' },
      { id: 'c4', author: 'Sarah Johnson', message: 'Perfect! Thanks for the thorough review.', timestamp: '2024-11-20 17:00' }
    ]
  },
  '3': {
    id: '76229',
    status: 'past-due',
    requestType: 'translation',
    member: 'Member',
    phi: 'yes',
    memberFacing: 'yes',
    raTemplate: 'no',
    guidingCare: 'no',
    level: 'advanced',
    lineOfBusiness: 'Medicaid',
    documentType: 'Legal Notice',
    language: 'German',
    requestedBy: 'Michael Chen',
    department: 'Legal',
    secondContact: 'Legal Department Assistant',
    pageCount: 8,
    estimatedTurnaroundTime: 'Expedited due to regulatory requirements',
    days: 2,
    date: '2024-11-25',
    expedite: 'yes',
    neededBy: '24 Hour Rush',
    translateIntoEnglish: 'no',
    notes: 'Urgent regulatory notice. Requires certified legal translator with Medicaid experience.',
    submittedDate: '2024-11-10',
    assignedTo: 'Klaus Weber',
    attachments: [
      { id: 'a4', name: 'legal_notice.pdf', size: '892 KB' }
    ],
    comments: [
      { id: 'c5', author: 'Klaus Weber', message: 'Complex legal terms requiring additional research. May need extension.', timestamp: '2024-11-24 11:30' },
      { id: 'c6', author: 'Michael Chen', message: 'Please expedite. Regulatory deadline approaching.', timestamp: '2024-11-25 08:00' }
    ]
  }
}

const languageMap: Record<string, string> = {
  'en': 'English',
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
  'pt': 'Portuguese',
  'zh': 'Chinese',
  'ja': 'Japanese',
  'ko': 'Korean',
  'ar': 'Arabic',
  'ru': 'Russian',
  'hi': 'Hindi'
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

const statusColors = {
  'draft': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  'new': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'returned': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  'past-due': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

const statusIcons = {
  'draft': FileText,
  'new': FileText,
  'in-progress': Clock,
  'completed': CheckCircle,
  'returned': AlertTriangle,
  'past-due': AlertTriangle
}

export default function RequestDetailPage() {
  const params = useParams()
  const requestId = params.id as string
  const [request, setRequest] = useState<TranslationRequest | null>(null)
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    // Simulate API fetch
    const fetchRequest = () => {
      const foundRequest = mockRequests[requestId]
      setRequest(foundRequest || null)
    }

    fetchRequest()
  }, [requestId])

  const handleAddComment = () => {
    if (!newComment.trim() || !request) return

    const comment = {
      id: `c${Date.now()}`,
      author: 'Current User',
      message: newComment,
      timestamp: new Date().toLocaleString()
    }

    setRequest(prev => prev ? {
      ...prev,
      comments: [...prev.comments, comment]
    } : null)

    setNewComment('')
  }

  if (!request) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Request Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The translation request you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  const StatusIcon = statusIcons[request.status]

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full space-y-6">
          {/* Request Details */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Request
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{request.id}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Request Type
                  </label>
                  <p className="text-gray-900 dark:text-gray-100 capitalize flex items-center">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {request.requestType}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Member
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{request.member}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    PHI
                  </Label>
                  <RadioGroup value={request.phi} disabled className="flex space-x-4 mt-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="phi-yes" />
                      <Label htmlFor="phi-yes" className="text-sm">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="phi-no" />
                      <Label htmlFor="phi-no" className="text-sm">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Member Facing
                  </Label>
                  <RadioGroup value={request.memberFacing} disabled className="flex space-x-4 mt-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="member-facing-yes" />
                      <Label htmlFor="member-facing-yes" className="text-sm">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="member-facing-no" />
                      <Label htmlFor="member-facing-no" className="text-sm">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    RA Template
                  </Label>
                  <RadioGroup value={request.raTemplate} disabled className="flex space-x-4 mt-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="ra-template-yes" />
                      <Label htmlFor="ra-template-yes" className="text-sm">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="ra-template-no" />
                      <Label htmlFor="ra-template-no" className="text-sm">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    GuidingCare
                  </Label>
                  <RadioGroup value={request.guidingCare} disabled className="flex space-x-4 mt-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="guiding-care-yes" />
                      <Label htmlFor="guiding-care-yes" className="text-sm">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="guiding-care-no" />
                      <Label htmlFor="guiding-care-no" className="text-sm">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Level
                  </Label>
                  <Select value={request.level} disabled>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="common">Common</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Line of Business
                  </Label>
                  <Select value={request.lineOfBusiness} disabled>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={request.lineOfBusiness}>{request.lineOfBusiness}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Document Type
                  </Label>
                  <Select value={request.documentType} disabled>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={request.documentType}>{request.documentType}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Language
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{request.language}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Translate into English
                  </Label>
                  <RadioGroup value={request.translateIntoEnglish} disabled className="flex space-x-4 mt-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="translate-english-yes" />
                      <Label htmlFor="translate-english-yes" className="text-sm">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="translate-english-no" />
                      <Label htmlFor="translate-english-no" className="text-sm">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes
                  </Label>
                  <Textarea value={request.notes} readOnly rows={3} className="bg-gray-50 dark:bg-gray-800" />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <p className="text-gray-900 dark:text-gray-100 capitalize">{request.status}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Requested By
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input value={request.requestedBy} readOnly className="flex-1 bg-gray-50 dark:bg-gray-800" />
                    <Button variant="outline" size="sm" className="p-2">📁</Button>
                    <Button variant="outline" size="sm" className="p-2">🔍</Button>
                    <Button variant="outline" size="sm" className="p-2">👤</Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Department
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{request.department}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    2nd Contact
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input value={request.secondContact} readOnly className="flex-1 bg-gray-50 dark:bg-gray-800" />
                    <Button variant="outline" size="sm" className="p-2">📁</Button>
                    <Button variant="outline" size="sm" className="p-2">🔍</Button>
                    <Button variant="outline" size="sm" className="p-2">👤</Button>
                  </div>
                  <p className="text-sm text-red-500 mt-1">{request.secondContact}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Page Count
                  </Label>
                  <Input type="number" value={request.pageCount} readOnly className="w-full bg-gray-50 dark:bg-gray-800" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Estimated Turnaround Time
                  </label>
                  <p className="text-sm text-red-500">{request.estimatedTurnaroundTime}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Days
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{request.days}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{request.date}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Expedite
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{request.expedite}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Needed By
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{request.neededBy}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          {request.attachments.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">Documents</h3>
              <div className="space-y-2">
                {request.attachments.map(attachment => (
                  <div key={attachment.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{attachment.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{attachment.size}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

      </div>
    </div>
  )
}