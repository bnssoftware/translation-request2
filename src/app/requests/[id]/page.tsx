'use client'

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useTranslationRequest } from "@/hooks/useTranslationRequest"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Loader2, RefreshCw, Copy } from "lucide-react"
import Link from "next/link"
import TranslationRequestForm from "@/components/TranslationRequestForm"
import RequestHistoryTable from "@/components/RequestHistoryTable"
import RequestEmailsTable from "@/components/RequestEmailsTable"
import RequestToolbar from "@/components/RequestToolbar"
import { mapTranslationRequestToFormData } from "@/lib/data-mappers"

export default function RequestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const requestId = params.id as string
  const [activeTab, setActiveTab] = useState("general")
  const [showReviewDialog, setShowReviewDialog] = useState(false)

  const tabs = [
    { id: "general", label: "General" },
    { id: "history", label: "History" },
    { id: "emails", label: "Emails" },
  ]
  
  const { 
    data: request, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useTranslationRequest(requestId)


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

  // Map the API data to form data structure when available, otherwise use empty data
  const formData = request ? mapTranslationRequestToFormData(request) : {
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
    pageCount: 0,
    estimatedTurnaroundTime: '',
    days: 0,
    date: '',
    expedite: 'no' as const,
    neededBy: '',
    translateIntoEnglish: 'no' as const,
    notes: ''
  }

  const handleReview = () => {
    setShowReviewDialog(true)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <TranslationRequestForm 
            data={formData} 
            readOnly 
            loading={isLoading} 
          />
        )
      case "history":
        return <RequestHistoryTable requestId={requestId} />
      case "emails":
        return <RequestEmailsTable requestId={requestId} />
      default:
        return null
    }
  }

  return (
    <div className="w-full">
      {/* Request Toolbar */}
      <RequestToolbar 
        requestId={requestId}
        requestStatus={request?.status}
        isLoading={isLoading}
        onReview={handleReview}
        showReviewDialog={showReviewDialog}
        onReviewDialogChange={setShowReviewDialog}
      />

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}