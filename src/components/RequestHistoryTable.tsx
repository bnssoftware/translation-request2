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
import { Clock, User, FileText, CheckCircle, AlertTriangle, MessageSquare } from "lucide-react"

interface HistoryEntry {
  id: string
  date: string
  time: string
  action: string
  user: string
  details: string
  status?: 'info' | 'success' | 'warning' | 'error'
}

interface RequestHistoryTableProps {
  requestId: string
}

const mockHistoryData: HistoryEntry[] = [
  {
    id: '1',
    date: '2024-12-01',
    time: '2:30 PM',
    action: 'Request Created',
    user: 'John Smith',
    details: 'Translation request submitted for Spanish translation',
    status: 'info'
  },
  {
    id: '2', 
    date: '2024-12-01',
    time: '2:45 PM',
    action: 'Request Assigned',
    user: 'System',
    details: 'Automatically assigned to Maria Garcia based on language expertise',
    status: 'info'
  },
  {
    id: '3',
    date: '2024-12-02',
    time: '9:15 AM', 
    action: 'Translation Started',
    user: 'Maria Garcia',
    details: 'Began translation work on source document',
    status: 'info'
  },
  {
    id: '4',
    date: '2024-12-03',
    time: '11:20 AM',
    action: 'Status Updated',
    user: 'Maria Garcia', 
    details: 'Status changed to In Progress - 50% complete',
    status: 'success'
  },
  {
    id: '5',
    date: '2024-12-04',
    time: '3:45 PM',
    action: 'Comment Added',
    user: 'John Smith',
    details: 'Requested clarification on technical terminology in section 3',
    status: 'warning'
  },
  {
    id: '6',
    date: '2024-12-05',
    time: '10:30 AM',
    action: 'Document Updated',
    user: 'Maria Garcia',
    details: 'Uploaded revised translation with terminology corrections',
    status: 'success'
  }
]

const actionIcons = {
  'Request Created': FileText,
  'Request Assigned': User,
  'Translation Started': Clock,
  'Status Updated': CheckCircle,
  'Comment Added': MessageSquare,
  'Document Updated': FileText,
}

const statusColors = {
  'info': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'success': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'warning': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'error': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

export default function RequestHistoryTable({ requestId }: RequestHistoryTableProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockHistoryData.map((entry) => {
              const ActionIcon = actionIcons[entry.action as keyof typeof actionIcons] || FileText
              
              return (
                <TableRow key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {formatDate(entry.date)}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {entry.time}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <ActionIcon className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {entry.action}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-900 dark:text-gray-100">{entry.user}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-700 dark:text-gray-300">{entry.details}</span>
                  </TableCell>
                  <TableCell>
                    {entry.status && (
                      <Badge className={statusColors[entry.status]}>
                        {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      
      {/* Summary */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Showing {mockHistoryData.length} history entries for Request #{requestId}
      </div>
    </div>
  )
}