'use client'

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Copy } from "lucide-react"
import { z } from "zod"
import TranslationRequestForm, { TranslationRequestData } from "@/components/TranslationRequestForm"
import { useTranslationRequest } from "@/hooks/useTranslationRequest"
import { mapTranslationRequestToFormData } from "@/lib/data-mappers"
import RequestToolbar from "@/components/RequestToolbar"

// Zod schema for form validation
const translationRequestSchema = z.object({
  requestType: z.enum(['translation', 'review']),
  member: z.string().min(1, 'Member is required'),
  phi: z.enum(['yes', 'no']),
  memberFacing: z.enum(['yes', 'no']),
  raTemplate: z.enum(['yes', 'no']),
  guidingCare: z.enum(['yes', 'no']),
  level: z.enum(['clinical', 'common', 'legal']),
  lineOfBusiness: z.string().min(1, 'Line of Business is required'),
  documentType: z.string().min(1, 'Document Type is required'),
  language: z.array(z.string()).min(1, 'At least one language is required'),
  requestedBy: z.string().min(1, 'Requested By is required'),
  department: z.string().min(1, 'Department is required'),
  secondContact: z.string().optional(),
  pageCount: z.number().min(1, 'Page count must be at least 1'),
  estimatedTurnaroundTime: z.string().optional(),
  days: z.number().min(1, 'Days must be at least 1'),
  date: z.string().min(1, 'Date is required'),
  expedite: z.enum(['yes', 'no']),
  neededBy: z.string().min(1, 'Needed By is required'),
  translateIntoEnglish: z.enum(['yes', 'no']),
  notes: z.string().optional()
})

type FormData = z.infer<typeof translationRequestSchema>

export default function NewRequestPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const copyFromId = searchParams.get('copy-from-id')
  
  // Fetch the request to copy from if copy-from-id is provided
  const { 
    data: copyFromRequest, 
    isLoading: isCopyLoading, 
    isError: isCopyError 
  } = useTranslationRequest(copyFromId || '', { enabled: !!copyFromId })
  
  // Default form data
  const getDefaultFormData = (): FormData => ({
    requestType: 'translation',
    member: '',
    phi: 'no',
    memberFacing: 'no',
    raTemplate: 'no',
    guidingCare: 'no',
    level: 'common',
    lineOfBusiness: '',
    documentType: '',
    language: [],
    requestedBy: '',
    department: '',
    secondContact: '',
    pageCount: 1,
    estimatedTurnaroundTime: '',
    days: 1,
    date: '',
    expedite: 'no',
    neededBy: '',
    translateIntoEnglish: 'no',
    notes: ''
  })
  
  const [formData, setFormData] = useState<FormData>(getDefaultFormData())
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const initialFormDataRef = useRef<FormData>(getDefaultFormData())
  
  // Update form data when copy request is loaded
  useEffect(() => {
    if (copyFromRequest && !isCopyLoading) {
      const copyData = mapTranslationRequestToFormData(copyFromRequest)
      // Remove fields that shouldn't be copied
      const cleanCopyData = {
        ...copyData,
        id: undefined,
        status: undefined,
        submittedDate: undefined,
        assignedTo: undefined,
        completedDate: undefined,
        attachments: undefined
      }
      setFormData(cleanCopyData)
      initialFormDataRef.current = cleanCopyData
    }
  }, [copyFromRequest, isCopyLoading])

  const handleReview = () => {
    // TODO: Implement review functionality for new requests
    console.log('Review button clicked for new request')
  }

  // Check for unsaved changes
  useEffect(() => {
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialFormDataRef.current)
    setHasUnsavedChanges(hasChanges)
  }, [formData])

  // Browser navigation warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?'
        return e.returnValue
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])

  const handleInputChange = (field: keyof FormData, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = translationRequestSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {}
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof FormData] = issue.message
        }
      })
      setErrors(fieldErrors)
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Translation request submitted successfully!')
      
      // Reset form and clear unsaved changes flag
      const resetData = {
        requestType: 'translation' as const,
        member: '',
        phi: 'no' as const,
        memberFacing: 'no' as const,
        raTemplate: 'no' as const,
        guidingCare: 'no' as const,
        level: 'common' as const,
        lineOfBusiness: '',
        documentType: '',
        language: [],
        requestedBy: '',
        department: '',
        secondContact: '',
        pageCount: 1,
        estimatedTurnaroundTime: '',
        days: 1,
        date: '',
        expedite: 'no' as const,
        neededBy: '',
        translateIntoEnglish: 'no' as const,
        notes: ''
      }
      setFormData(resetData)
      initialFormDataRef.current = resetData
      setHasUnsavedChanges(false)
      setErrors({})
      
      // Navigate to home page
      router.push('/')
    } catch (error) {
      alert('Error submitting request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      {/* Request Toolbar */}
      <RequestToolbar 
        requestId={copyFromId || undefined}
        isLoading={isCopyLoading}
        onReview={handleReview}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              {copyFromId && (
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  <Copy className="w-4 h-4 inline mr-1" />
                  This request has been copied from Request #{copyFromId}
                </p>
              )}
            </div>
            
            {/* Save Button */}
            <Button
              type="button"
              disabled={!hasUnsavedChanges}
              onClick={() => {
                setHasUnsavedChanges(false)
                initialFormDataRef.current = { ...formData }
              }}
              className="bg-yellow-600 hover:bg-yellow-700 text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              Save
            </Button>
          </div>
        </div>

      {/* Error handling for copy request */}
      {copyFromId && isCopyError && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
            <p className="text-red-700 dark:text-red-300">
              Unable to load request #{copyFromId} for copying. The form will start with default values.
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <TranslationRequestForm 
          data={formData}
          readOnly={false}
          loading={isCopyLoading}
          onChange={handleInputChange}
          errors={errors}
        />

        {/* Submit Actions */}
        <div className="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            type="button"
            onClick={() => {
              if (hasUnsavedChanges) {
                const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave without saving?')
                if (confirmLeave) {
                  router.push('/')
                }
              } else {
                router.push('/')
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      </form>
      </div>
    </div>
  )
}