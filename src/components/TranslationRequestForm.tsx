'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Download } from "lucide-react"

export interface TranslationRequestData {
  id?: string
  status?: 'draft' | 'new' | 'in-progress' | 'completed' | 'returned' | 'past-due'
  requestType: 'translation' | 'review'
  member: string
  phi: 'yes' | 'no'
  memberFacing: 'yes' | 'no'
  raTemplate: 'yes' | 'no'
  guidingCare: 'yes' | 'no'
  level: 'clinical' | 'common' | 'legal'
  lineOfBusiness: string
  documentType: string
  language: string[]
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
  loading?: boolean
  onChange?: (field: keyof TranslationRequestData, value: string | number | string[]) => void
  errors?: Partial<Record<keyof TranslationRequestData, string>>
}

export default function TranslationRequestForm({ 
  data, 
  readOnly = false, 
  loading = false,
  onChange = () => {},
  errors = {}
}: TranslationRequestFormProps) {
  const lineOfBusinessOptions = [
    'Medi-Cal',
    'OCC (OneCare Connect)',
    'OneCare',
    'PACE'
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
    'Arabic',
    'Chinese',
    'Farsi',
    'Korean',
    'Russian',
    'Spanish',
    'Vietnamese',
    'Other'
  ]

  const handleChange = (field: keyof TranslationRequestData, value: string | number | string[]) => {
    if (!readOnly) {
      onChange(field, value)
    }
  }

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (!readOnly) {
      const currentLanguages = Array.isArray(data.language) ? data.language : []
      let newLanguages: string[]
      
      if (checked) {
        newLanguages = [...currentLanguages, language]
      } else {
        newLanguages = currentLanguages.filter(lang => lang !== language)
      }
      
      onChange('language', newLanguages)
    }
  }

  // Show loading skeletons when loading
  if (loading) {
    return (
      <div className="w-full space-y-6">
        {/* Form Content Skeleton */}
        <div className="space-y-6">
          {/* Request Details Card */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  </div>
                ))}
              </div>
              {/* Right Column */}
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Section */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(9)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4 animate-pulse"></div>
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
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
              {readOnly ? (
                <div className="flex items-center">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                    Request Type
                  </Label>
                  <p className="text-gray-900 dark:text-gray-100 capitalize flex items-center">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {data.requestType}
                  </p>
                </div>
              ) : (
                <div className="flex items-center">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                    Request Type
                  </Label>
                  <RadioGroup 
                    value={data.requestType} 
                    onValueChange={(value) => handleChange('requestType', value)}
                    className="flex space-x-6 flex-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="translation" id="request-type-translation" />
                      <Label htmlFor="request-type-translation" className="text-sm">Translation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="review" id="request-type-review" />
                      <Label htmlFor="request-type-review" className="text-sm">Review</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
              {errors.requestType && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1 ml-44">{errors.requestType}</p>
              )}
            </div>

            <div>
              <div className="flex items-center">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                  Member
                </Label>
                <div className="w-64">
                  {readOnly ? (
                    <p className="text-gray-900 dark:text-gray-100">{data.member}</p>
                  ) : (
                    <Input 
                      value={data.member} 
                      onChange={(e) => handleChange('member', e.target.value)}
                      className={errors.member ? 'border-red-500' : ''}
                    />
                  )}
                </div>
              </div>
              {errors.member && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1 ml-44">{errors.member}</p>
              )}
            </div>

            <div className="flex items-center">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                PHI
              </Label>
              <RadioGroup 
                value={data.phi} 
                disabled={readOnly} 
                onValueChange={(value) => handleChange('phi', value)}
                className="flex space-x-6 flex-1"
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

            <div className="flex items-center">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                Member Facing
              </Label>
              <RadioGroup 
                value={data.memberFacing} 
                disabled={readOnly} 
                onValueChange={(value) => handleChange('memberFacing', value)}
                className="flex space-x-6 flex-1"
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

            <div className="flex items-center">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                RA Template
              </Label>
              <RadioGroup 
                value={data.raTemplate} 
                disabled={readOnly} 
                onValueChange={(value) => handleChange('raTemplate', value)}
                className="flex space-x-6 flex-1"
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

            <div className="flex items-center">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                GuidingCare
              </Label>
              <RadioGroup 
                value={data.guidingCare} 
                disabled={readOnly} 
                onValueChange={(value) => handleChange('guidingCare', value)}
                className="flex space-x-6 flex-1"
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
              <div className="flex items-center">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                  Level
                </Label>
                <div className="w-48">
                  <Select value={data.level} disabled={readOnly} onValueChange={(value) => handleChange('level', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clinical">Clinical</SelectItem>
                      <SelectItem value="common">Common</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                  Line of Business
                </Label>
                <div className="w-64">
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
                </div>
              </div>
              {errors.lineOfBusiness && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1 ml-44">{errors.lineOfBusiness}</p>
              )}
            </div>

            <div>
              <div className="flex items-center">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                  Document Type
                </Label>
                <div className="w-64">
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
                </div>
              </div>
              {errors.documentType && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1 ml-44">{errors.documentType}</p>
              )}
            </div>

            <div>
              <div className="flex">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0 pt-1">
                  Language
                </Label>
                <div className="flex-1">
                  {readOnly ? (
                    <div className="text-gray-900 dark:text-gray-100 pt-1">
                      {Array.isArray(data.language) ? data.language.join(', ') : data.language}
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-4">
                      {languageOptions.map(option => {
                        const isChecked = Array.isArray(data.language) ? data.language.includes(option) : false
                        return (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`language-${option}`}
                              checked={isChecked}
                              onCheckedChange={(checked) => handleLanguageChange(option, !!checked)}
                              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                            <Label 
                              htmlFor={`language-${option}`}
                              className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              {option}
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
              {errors.language && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1 ml-44">{errors.language}</p>
              )}
            </div>

            <div className="flex items-center">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                Translate into English
              </Label>
              <RadioGroup 
                value={data.translateIntoEnglish} 
                disabled={readOnly} 
                onValueChange={(value) => handleChange('translateIntoEnglish', value)}
                className="flex space-x-6 flex-1"
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

            <div className="flex items-center">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                Requested By
              </Label>
              <div className="flex items-center space-x-2 flex-1">
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
                <p className="text-sm text-red-600 dark:text-red-400 mt-1 ml-44">{errors.requestedBy}</p>
              )}
            </div>

            <div className="flex items-center">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                Department
              </Label>
              <div className="flex-1">
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
              </div>
              {errors.department && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1 ml-44">{errors.department}</p>
              )}
            </div>

            <div className="flex items-center">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                2nd Contact
              </Label>
              <div className="flex items-center space-x-2 flex-1">
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

            <div className="flex items-center">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                Page Count
              </Label>
              <div className="flex-1">
                {readOnly ? (
                  <Input type="number" value={data.pageCount} readOnly className="w-20 bg-gray-50 dark:bg-gray-800" />
                ) : (
                  <Input 
                    type="number" 
                    value={data.pageCount} 
                    onChange={(e) => handleChange('pageCount', parseInt(e.target.value) || 0)}
                    className={`w-20 ${errors.pageCount ? 'border-red-500' : ''}`}
                    min="1"
                    max="999"
                  />
                )}
              </div>
              {errors.pageCount && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1 ml-44">{errors.pageCount}</p>
              )}
            </div>

            <div className="flex items-center">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                Estimated Turnaround Time
              </Label>
              <div className="flex-1">
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
            </div>

            <div className="flex items-center">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                Days
              </Label>
              <div className="flex-1">
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
              </div>
              {errors.days && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1 ml-44">{errors.days}</p>
              )}
            </div>

            <div className="flex items-center">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                Date
              </Label>
              <div className="flex-1">
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
              </div>
              {errors.date && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1 ml-44">{errors.date}</p>
              )}
            </div>

            <div className="flex items-center">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                Expedite
              </Label>
              {readOnly ? (
                <p className="text-gray-900 dark:text-gray-100">{data.expedite}</p>
              ) : (
                <RadioGroup 
                  value={data.expedite} 
                  onValueChange={(value) => handleChange('expedite', value)}
                  className="flex space-x-6 flex-1"
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

            <div className="flex items-center">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-44 flex-shrink-0">
                Needed By
              </Label>
              <div className="flex-1">
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
              </div>
              {errors.neededBy && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1 ml-44">{errors.neededBy}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Documents</h3>
          {!readOnly && (
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          )}
        </div>
        
        {data.attachments && data.attachments.length > 0 ? (
          <div className="space-y-3">
            {data.attachments.map(attachment => (
              <div key={attachment.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-4">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{attachment.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{attachment.size}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  {!readOnly && (
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-2">No documents uploaded</p>
            {!readOnly && (
              <p className="text-sm text-gray-400">Upload documents to get started</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}