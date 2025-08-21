'use client'

import { useState, useMemo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Calendar, Globe, FileText, Clock, CheckCircle, AlertTriangle, User, ArrowUpDown, Eye, Edit } from "lucide-react"
import Link from "next/link"

export interface TranslationRequest {
  id: string
  title: string
  description: string
  sourceLanguage: string
  targetLanguage: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  dueDate: string
  department: string
  requestType: 'document' | 'website' | 'software' | 'marketing' | 'legal' | 'other'
  status: 'new' | 'in-progress' | 'completed' | 'returned' | 'past-due'
  submittedBy: string
  submittedDate: string
  assignedTo?: string
  completedDate?: string
}

interface RequestsDataTableProps {
  data: TranslationRequest[]
  showActions?: boolean
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
  'new': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'returned': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  'past-due': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

const statusIcons = {
  'new': FileText,
  'in-progress': Clock,
  'completed': CheckCircle,
  'returned': AlertTriangle,
  'past-due': AlertTriangle
}

type SortField = 'title' | 'dueDate' | 'priority' | 'status' | 'submittedDate'
type SortDirection = 'asc' | 'desc'

export default function RequestsDataTable({ data, showActions = true }: RequestsDataTableProps) {
  const [sortField, setSortField] = useState<SortField>('submittedDate')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (sortField) {
        case 'title':
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case 'dueDate':
        case 'submittedDate':
          aValue = new Date(a[sortField]).getTime()
          bValue = new Date(b[sortField]).getTime()
          break
        case 'priority':
          const priorityOrder = { low: 1, medium: 2, high: 3, urgent: 4 }
          aValue = priorityOrder[a.priority]
          bValue = priorityOrder[b.priority]
          break
        case 'status':
          const statusOrder = { new: 1, 'in-progress': 2, completed: 3, returned: 4, 'past-due': 5 }
          aValue = statusOrder[a.status]
          bValue = statusOrder[b.status]
          break
        default:
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return sorted
  }, [data, sortField, sortDirection])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const isOverdue = (dueDate: string, status: string) => {
    return status !== 'completed' && new Date(dueDate) < new Date()
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No requests found</h3>
        <p className="text-gray-500 dark:text-gray-400">There are no translation requests in this category.</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="rounded-md border border-gray-200 dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('title')}
                  className="h-auto p-0 font-medium hover:bg-transparent"
                >
                  Request
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Languages</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('status')}
                  className="h-auto p-0 font-medium hover:bg-transparent"
                >
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('priority')}
                  className="h-auto p-0 font-medium hover:bg-transparent"
                >
                  Priority
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('dueDate')}
                  className="h-auto p-0 font-medium hover:bg-transparent"
                >
                  Due Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('submittedDate')}
                  className="h-auto p-0 font-medium hover:bg-transparent"
                >
                  Submitted
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              {showActions && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((request) => {
              const StatusIcon = statusIcons[request.status]
              const overdue = isOverdue(request.dueDate, request.status)
              
              return (
                <TableRow key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <TableCell>
                    <Link 
                      href={`/requests/${request.id}`}
                      className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                    >
                      {request.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                        {languageMap[request.sourceLanguage]}
                      </span>
                      <span>→</span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                        {languageMap[request.targetLanguage]}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1).replace('-', ' ')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[request.priority]}`}>
                      {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className={`text-sm ${overdue ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-900 dark:text-gray-100'}`}>
                      {formatDate(request.dueDate)}
                      {overdue && (
                        <div className="flex items-center mt-1">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          <span className="text-xs">Overdue</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {request.assignedTo ? (
                        <span className="text-sm text-gray-900 dark:text-gray-100">{request.assignedTo}</span>
                      ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">Unassigned</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(request.submittedDate)}
                    </div>
                  </TableCell>
                  {showActions && (
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Link href={`/requests/${request.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      
      {/* Summary */}
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Showing {sortedData.length} of {data.length} requests
      </div>
    </div>
  )
}