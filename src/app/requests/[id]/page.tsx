'use client'

import { useParams } from "next/navigation"
import { useTranslationRequest } from "@/hooks/useTranslationRequest"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Loader2, RefreshCw, Calendar, User, Globe, FileText, Clock } from "lucide-react"
import Link from "next/link"

export default function RequestDetailPage() {
  const params = useParams()
  const requestId = params.id as string
  
  const { 
    data: request, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useTranslationRequest(requestId)

  if (isLoading) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-96 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description Card */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-3 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>

              {/* Translation Details Card */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i}>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Instructions Card */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-36 mb-3 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Request Information Card */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-36 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  {[...Array(2)].map((_, i) => (
                    <div key={i}>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-1 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline Card */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  {[...Array(2)].map((_, i) => (
                    <div key={i}>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-1 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Request Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error?.message || 'The translation request you\'re looking for doesn\'t exist or has been removed.'}
            </p>
            <div className="space-x-4">
              <Button onClick={() => refetch()} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Link href="/">
                <Button>Back to Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!request) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No Data Available
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              No translation request data was returned from the server.
            </p>
            <Link href="/">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'review': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-orange-100 text-orange-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {request.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Request #{request.id}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getPriorityColor(request.priority)}>
                {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
              </Badge>
              <Badge className={getStatusColor(request.status)}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Description
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{request.description}</p>
            </div>

            {/* Translation Details */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Translation Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Source Language
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{request.sourceLanguage}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Target Language(s)
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{request.targetLanguage}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Project Type
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{request.projectType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Estimated Words
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{request.estimatedWords.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            {request.specialInstructions && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold mb-3">Special Instructions</h3>
                <p className="text-gray-700 dark:text-gray-300">{request.specialInstructions}</p>
              </div>
            )}
          </div>

          {/* Right Column - Metadata */}
          <div className="space-y-6">
            {/* Request Information */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Request Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Requested By
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{request.requestedBy}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Request Date
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {new Date(request.requestedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Timeline
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Due Date
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {new Date(request.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Days Remaining
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {Math.ceil((new Date(request.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}