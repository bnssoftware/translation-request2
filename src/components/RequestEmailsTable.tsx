'use client'

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Mail, MailOpen, Reply, Forward, Paperclip, Eye, RotateCcw } from "lucide-react"

interface EmailEntry {
  id: string
  date: string
  time: string
  from: string
  to: string
  subject: string
  preview: string
  status: 'sent' | 'received' | 'draft'
  hasAttachment: boolean
  isRead: boolean
}

interface RequestEmailsTableProps {
  requestId: string
}

const mockEmailData: EmailEntry[] = [
  {
    id: '1',
    date: '2024-12-01',
    time: '2:35 PM',
    from: 'John Smith <j.smith@company.com>',
    to: 'Maria Garcia <m.garcia@company.com>',
    subject: 'New Translation Request #76227 - Spanish Translation',
    preview: 'Hi Maria, I\'ve submitted a new translation request for Spanish translation. The document contains technical content that may require...',
    status: 'sent',
    hasAttachment: true,
    isRead: true
  },
  {
    id: '2',
    date: '2024-12-01',
    time: '3:15 PM',
    from: 'Maria Garcia <m.garcia@company.com>',
    to: 'John Smith <j.smith@company.com>',
    subject: 'Re: New Translation Request #76227 - Spanish Translation',
    preview: 'Thanks John! I\'ve received your request and will begin working on it shortly. I have a few questions about the technical terminology...',
    status: 'received',
    hasAttachment: false,
    isRead: true
  },
  {
    id: '3',
    date: '2024-12-03',
    time: '11:45 AM',
    from: 'Maria Garcia <m.garcia@company.com>',
    to: 'John Smith <j.smith@company.com>',
    subject: 'Translation Update - 50% Complete',
    preview: 'Hi John, I wanted to give you a quick update on the translation progress. I\'m about 50% complete and everything is going smoothly...',
    status: 'received',
    hasAttachment: false,
    isRead: true
  },
  {
    id: '4',
    date: '2024-12-04',
    time: '4:20 PM',
    from: 'John Smith <j.smith@company.com>',
    to: 'Maria Garcia <m.garcia@company.com>',
    subject: 'Clarification Needed - Section 3 Technical Terms',
    preview: 'Hi Maria, I reviewed the draft and noticed some technical terms in section 3 that might need clarification. Could you help with...',
    status: 'sent',
    hasAttachment: true,
    isRead: true
  },
  {
    id: '5',
    date: '2024-12-05',
    time: '9:30 AM',
    from: 'Maria Garcia <m.garcia@company.com>',
    to: 'John Smith <j.smith@company.com>',
    subject: 'Re: Clarification Needed - Updated Translation',
    preview: 'Thanks for the feedback! I\'ve updated the translation with the clarified terminology. Please find the revised document attached...',
    status: 'received',
    hasAttachment: true,
    isRead: false
  },
  {
    id: '6',
    date: '2024-12-05',
    time: '2:45 PM',
    from: 'John Smith <j.smith@company.com>',
    to: 'Maria Garcia <m.garcia@company.com>',
    subject: 'Draft: Final Review Request',
    preview: 'Hi Maria, I\'ve reviewed the updated translation and it looks excellent. Just need to do one final review before we can mark this as...',
    status: 'draft',
    hasAttachment: false,
    isRead: false
  }
]

const statusColors = {
  'sent': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'received': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'draft': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
}

const statusIcons = {
  'sent': Mail,
  'received': MailOpen,
  'draft': Mail
}

export default function RequestEmailsTable({ requestId }: RequestEmailsTableProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const extractName = (emailString: string) => {
    const match = emailString.match(/^(.+?)\s*</)
    return match ? match[1] : emailString.split('@')[0]
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>From/To</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockEmailData.map((email) => {
              const StatusIcon = statusIcons[email.status]
              
              return (
                <TableRow 
                  key={email.id} 
                  className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                    !email.isRead ? 'font-semibold' : ''
                  }`}
                >
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {formatDate(email.date)}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {email.time}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {email.status === 'sent' ? 'To: ' : 'From: '}
                        {extractName(email.status === 'sent' ? email.to : email.from)}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                        {email.status === 'sent' ? email.to : email.from}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {!email.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        )}
                        <StatusIcon className="w-4 h-4 text-gray-500 mr-2" />
                        {email.hasAttachment && (
                          <Paperclip className="w-4 h-4 text-gray-400 mr-2" />
                        )}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-[250px]">
                        {email.subject}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[300px]">
                      {email.preview}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[email.status]}>
                      {email.status.charAt(0).toUpperCase() + email.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Resend</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Forward className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Forward</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      
      {/* Summary */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Showing {mockEmailData.length} email communications for Request #{requestId}
      </div>
      </div>
    </TooltipProvider>
  )
}