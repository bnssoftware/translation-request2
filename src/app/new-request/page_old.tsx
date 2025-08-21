'use client'

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Upload, Calendar, Globe, FileText, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { z } from "zod"

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

type TranslationRequestData = z.infer<typeof translationRequestSchema>

export default function NewRequestPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<TranslationRequestData>({
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
  
  const [errors, setErrors] = useState<Partial<Record<keyof TranslationRequestData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const initialFormDataRef = useRef<TranslationRequestData>(formData)

  const lineOfBusinessOptions = [
    'Medicare Advantage',
    'Commercial',
    'Medicaid',
    'Dual Special Needs Plans',
    'Other'
  ]

  const documentTypeOptions = [
    'Member Communication',
    'Training Materials',
    'Legal Notice',
    'Policy Documents',
    'Marketing Materials',
    'Provider Communications',
    'Other'
  ]

  const departmentOptions = [
    'Member Services',
    'Training',
    'Legal',
    'Marketing',
    'Provider Relations',
    'Compliance',
    'Operations',
    'Other'
  ]

  const languageOptions = [
    'Spanish',
    'French', 
    'German',
    'Chinese',
    'Arabic',
    'Russian',
    'Portuguese',
    'Other'
  ]

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

  const handleInputChange = (field: keyof TranslationRequestData, value: string | number) => {
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
      const fieldErrors: Partial<Record<keyof TranslationRequestData, string>> = {}
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof TranslationRequestData] = issue.message
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Request Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md transition-colors ${
                  errors.title 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-opacity-50`}
                placeholder="Brief title describing the translation request"
              />
              {errors.title && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />
                  {errors.title}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md transition-colors ${
                  errors.description 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-opacity-50`}
                placeholder="Detailed description of the content to be translated"
              />
              {errors.description && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Source Language <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.sourceLanguage}
                onChange={(e) => handleInputChange('sourceLanguage', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md transition-colors ${
                  errors.sourceLanguage 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-opacity-50`}
              >
                <option value="">Select source language</option>
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
              {errors.sourceLanguage && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />
                  {errors.sourceLanguage}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Language <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.targetLanguage}
                onChange={(e) => handleInputChange('targetLanguage', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md transition-colors ${
                  errors.targetLanguage 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-opacity-50`}
              >
                <option value="">Select target language</option>
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
              {errors.targetLanguage && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />
                  {errors.targetLanguage}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Request Details */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Request Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-3 py-2 border rounded-md transition-colors ${
                  errors.dueDate 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-opacity-50`}
              />
              {errors.dueDate && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />
                  {errors.dueDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md transition-colors ${
                  errors.department 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-opacity-50`}
              >
                <option value="">Select department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />
                  {errors.department}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Request Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.requestType}
                onChange={(e) => handleInputChange('requestType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="document">Document</option>
                <option value="website">Website</option>
                <option value="software">Software</option>
                <option value="marketing">Marketing Material</option>
                <option value="legal">Legal Document</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Additional Information
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              rows={4}
              value={formData.specialInstructions}
              onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md transition-colors ${
                errors.specialInstructions 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-opacity-50`}
              placeholder="Any specific requirements, context, or notes for the translator"
            />
            {errors.specialInstructions && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />
                {errors.specialInstructions}
              </p>
            )}
          </div>

          {/* File Upload Placeholder */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Attach Files (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Drag and drop files here, or click to select
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                PDF, DOC, DOCX, TXT files up to 10MB
              </p>
            </div>
          </div>
        </div>


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