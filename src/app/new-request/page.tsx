'use client'

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { z } from "zod"
import TranslationRequestForm, { TranslationRequestData } from "@/components/TranslationRequestForm"

// Zod schema for form validation
const translationRequestSchema = z.object({
  requestType: z.enum(['translation', 'review', 'other']),
  member: z.string().min(1, 'Member is required'),
  phi: z.enum(['yes', 'no']),
  memberFacing: z.enum(['yes', 'no']),
  raTemplate: z.enum(['yes', 'no']),
  guidingCare: z.enum(['yes', 'no']),
  level: z.enum(['common', 'intermediate', 'advanced']),
  lineOfBusiness: z.string().min(1, 'Line of Business is required'),
  documentType: z.string().min(1, 'Document Type is required'),
  language: z.string().min(1, 'Language is required'),
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
  const [formData, setFormData] = useState<FormData>({
    requestType: 'translation',
    member: '',
    phi: 'no',
    memberFacing: 'no',
    raTemplate: 'no',
    guidingCare: 'no',
    level: 'common',
    lineOfBusiness: '',
    documentType: '',
    language: '',
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
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const initialFormDataRef = useRef<FormData>(formData)

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

  const handleInputChange = (field: keyof FormData, value: string | number) => {
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
        language: '',
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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">New Translation Request</h1>
          
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
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Submit a new translation request for your content
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <TranslationRequestForm 
          data={formData}
          readOnly={false}
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
  )
}