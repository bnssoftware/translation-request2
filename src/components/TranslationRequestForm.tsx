'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { FileText, Download } from "lucide-react"

export interface TranslationRequestData {
  id?: string
  status?: 'draft' | 'new' | 'in-progress' | 'completed' | 'returned' | 'past-due'
  requestType: 'translation' | 'review' | 'other'
  member: string
  phi: 'yes' | 'no'
  memberFacing: 'yes' | 'no'
  raTemplate: 'yes' | 'no'
  guidingCare: 'yes' | 'no'
  level: 'common' | 'intermediate' | 'advanced'
  lineOfBusiness: string
  documentType: string
  language: string
  requestedBy: string
  department: string
  secondContact: string
  pageCount: number
  estimatedTurnaroundTime: string
  days: number
  date: string
  expedite: 'yes' | 'no'
  neededBy: string
  translateIntoEnglish: 'yes' | 'no'
  notes: string
  submittedDate?: string
  assignedTo?: string
  completedDate?: string
  attachments?: { id: string, name: string, size: string }[]
}

interface TranslationRequestFormProps {
  data: TranslationRequestData
  readOnly?: boolean
  onChange?: (field: keyof TranslationRequestData, value: string | number) => void
  errors?: Partial<Record<keyof TranslationRequestData, string>>
}

export default function TranslationRequestForm({ 
  data, 
  readOnly = false, 
  onChange = () => {},
  errors = {}
}: TranslationRequestFormProps) {
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

  const handleChange = (field: keyof TranslationRequestData, value: string | number) => {
    if (!readOnly) {
      onChange(field, value)
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Request Details */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {data.id && (
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Request
                </Label>
                <p className="text-gray-900 dark:text-gray-100">{data.id}</p>
              </div>
            )}

            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Request Type
              </Label>
              {readOnly ? (
                <p className="text-gray-900 dark:text-gray-100 capitalize flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {data.requestType}
                </p>
              ) : (
                <Select value={data.requestType} onValueChange={(value) => handleChange('requestType', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="translation">Translation</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
              {errors.requestType && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.requestType}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Member
              </Label>
              {readOnly ? (
                <p className="text-gray-900 dark:text-gray-100">{data.member}</p>
              ) : (
                <Input 
                  value={data.member} 
                  onChange={(e) => handleChange('member', e.target.value)}
                  className={errors.member ? 'border-red-500' : ''}
                />
              )}
              {errors.member && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.member}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                PHI
              </Label>
              <RadioGroup 
                value={data.phi} 
                disabled={readOnly} 
                onValueChange={(value) => handleChange('phi', value)}
                className="flex space-x-4 mt-1"
              >
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
              <RadioGroup 
                value={data.memberFacing} 
                disabled={readOnly} 
                onValueChange={(value) => handleChange('memberFacing', value)}
                className="flex space-x-4 mt-1"
              >
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
              <RadioGroup 
                value={data.raTemplate} 
                disabled={readOnly} 
                onValueChange={(value) => handleChange('raTemplate', value)}
                className="flex space-x-4 mt-1"
              >
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
              <RadioGroup 
                value={data.guidingCare} 
                disabled={readOnly} 
                onValueChange={(value) => handleChange('guidingCare', value)}
                className="flex space-x-4 mt-1"
              >
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
              <Select value={data.level} disabled={readOnly} onValueChange={(value) => handleChange('level', value)}>
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
              {readOnly ? (
                <Select value={data.lineOfBusiness} disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={data.lineOfBusiness}>{data.lineOfBusiness}</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Select value={data.lineOfBusiness} onValueChange={(value) => handleChange('lineOfBusiness', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select line of business" />
                  </SelectTrigger>
                  <SelectContent>
                    {lineOfBusinessOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {errors.lineOfBusiness && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.lineOfBusiness}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Document Type
              </Label>
              {readOnly ? (
                <Select value={data.documentType} disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={data.documentType}>{data.documentType}</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Select value={data.documentType} onValueChange={(value) => handleChange('documentType', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypeOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {errors.documentType && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.documentType}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Language
              </Label>
              {readOnly ? (
                <p className="text-gray-900 dark:text-gray-100">{data.language}</p>
              ) : (
                <Select value={data.language} onValueChange={(value) => handleChange('language', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {errors.language && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.language}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Translate into English
              </Label>
              <RadioGroup 
                value={data.translateIntoEnglish} 
                disabled={readOnly} 
                onValueChange={(value) => handleChange('translateIntoEnglish', value)}
                className="flex space-x-4 mt-1"
              >
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
              {readOnly ? (
                <Textarea value={data.notes} readOnly rows={3} className="bg-gray-50 dark:bg-gray-800" />
              ) : (
                <Textarea 
                  value={data.notes} 
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={3} 
                  placeholder="Enter any additional notes or requirements"
                />
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {data.status && (
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </Label>
                <p className="text-gray-900 dark:text-gray-100 capitalize">{data.status}</p>
              </div>
            )}

            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Requested By
              </Label>
              <div className="flex items-center space-x-2">
                {readOnly ? (
                  <>
                    <Input value={data.requestedBy} readOnly className="flex-1 bg-gray-50 dark:bg-gray-800" />
                    <Button variant="outline" size="sm" className="p-2">📁</Button>
                    <Button variant="outline" size="sm" className="p-2">🔍</Button>
                    <Button variant="outline" size="sm" className="p-2">👤</Button>
                  </>
                ) : (
                  <Input 
                    value={data.requestedBy} 
                    onChange={(e) => handleChange('requestedBy', e.target.value)}
                    className={`flex-1 ${errors.requestedBy ? 'border-red-500' : ''}`}
                    placeholder="Enter name of person making request"
                  />
                )}
              </div>
              {errors.requestedBy && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.requestedBy}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Department
              </Label>
              {readOnly ? (
                <p className="text-gray-900 dark:text-gray-100">{data.department}</p>
              ) : (
                <Select value={data.department} onValueChange={(value) => handleChange('department', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {errors.department && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.department}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                2nd Contact
              </Label>
              <div className="flex items-center space-x-2">
                {readOnly ? (
                  <>
                    <Input value={data.secondContact} readOnly className="flex-1 bg-gray-50 dark:bg-gray-800" />
                    <Button variant="outline" size="sm" className="p-2">📁</Button>
                    <Button variant="outline" size="sm" className="p-2">🔍</Button>
                    <Button variant="outline" size="sm" className="p-2">👤</Button>
                  </>
                ) : (
                  <Input 
                    value={data.secondContact} 
                    onChange={(e) => handleChange('secondContact', e.target.value)}
                    className="flex-1"
                    placeholder="Optional second contact person"
                  />
                )}
              </div>
              {readOnly && data.secondContact && (
                <p className="text-sm text-red-500 mt-1">{data.secondContact}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Page Count
              </Label>
              {readOnly ? (
                <Input type="number" value={data.pageCount} readOnly className="w-full bg-gray-50 dark:bg-gray-800" />
              ) : (
                <Input 
                  type="number" 
                  value={data.pageCount} 
                  onChange={(e) => handleChange('pageCount', parseInt(e.target.value) || 0)}
                  className={`w-full ${errors.pageCount ? 'border-red-500' : ''}`}
                  min="1"
                />
              )}
              {errors.pageCount && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.pageCount}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Estimated Turnaround Time
              </Label>
              {readOnly ? (
                <p className="text-sm text-red-500">{data.estimatedTurnaroundTime}</p>
              ) : (
                <Input 
                  value={data.estimatedTurnaroundTime} 
                  onChange={(e) => handleChange('estimatedTurnaroundTime', e.target.value)}
                  className="w-full"
                  placeholder="Estimated completion time"
                />
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Days
              </Label>
              {readOnly ? (
                <p className="text-gray-900 dark:text-gray-100">{data.days}</p>
              ) : (
                <Input 
                  type="number" 
                  value={data.days} 
                  onChange={(e) => handleChange('days', parseInt(e.target.value) || 0)}
                  className={`w-full ${errors.days ? 'border-red-500' : ''}`}
                  min="1"
                />
              )}
              {errors.days && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.days}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </Label>
              {readOnly ? (
                <p className="text-gray-900 dark:text-gray-100">{data.date}</p>
              ) : (
                <Input 
                  type="date" 
                  value={data.date} 
                  onChange={(e) => handleChange('date', e.target.value)}
                  className={`w-full ${errors.date ? 'border-red-500' : ''}`}
                />
              )}
              {errors.date && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.date}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Expedite
              </Label>
              {readOnly ? (
                <p className="text-gray-900 dark:text-gray-100">{data.expedite}</p>
              ) : (
                <RadioGroup 
                  value={data.expedite} 
                  onValueChange={(value) => handleChange('expedite', value)}
                  className="flex space-x-4 mt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="expedite-yes" />
                    <Label htmlFor="expedite-yes" className="text-sm">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="expedite-no" />
                    <Label htmlFor="expedite-no" className="text-sm">No</Label>
                  </div>
                </RadioGroup>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Needed By
              </Label>
              {readOnly ? (
                <p className="text-gray-900 dark:text-gray-100">{data.neededBy}</p>
              ) : (
                <Input 
                  value={data.neededBy} 
                  onChange={(e) => handleChange('neededBy', e.target.value)}
                  className={`w-full ${errors.neededBy ? 'border-red-500' : ''}`}
                  placeholder="When is this needed by?"
                />
              )}
              {errors.neededBy && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.neededBy}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Documents */}
      {data.attachments && data.attachments.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4">Documents</h3>
          <div className="space-y-2">
            {data.attachments.map(attachment => (
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
  )
}