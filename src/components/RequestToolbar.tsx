'use client'

import { Button } from "@/components/ui/button"
import { Copy, Eye } from "lucide-react"
import Link from "next/link"
import ReviewDialog from "./ReviewDialog"

interface RequestToolbarProps {
  requestId?: string
  requestStatus?: string
  isLoading?: boolean
  onReview?: () => void
  showReviewDialog?: boolean
  onReviewDialogChange?: (open: boolean) => void
}

export default function RequestToolbar({ 
  requestId, 
  requestStatus,
  isLoading = false, 
  onReview,
  showReviewDialog = false,
  onReviewDialogChange
}: RequestToolbarProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Request Number and Status */}
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isLoading ? (
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
            ) : requestId ? (
              <>
                Request {requestId}
                {requestStatus && (
                  <span className="text-gray-600 dark:text-gray-400 font-normal">
                    : {requestStatus.charAt(0).toUpperCase() + requestStatus.slice(1).replace('-', ' ')}
                  </span>
                )}
              </>
            ) : (
              "New Request"
            )}
          </h2>
        </div>

        {/* Right side - Action Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            onClick={onReview}
            variant="outline"
            size="sm"
            disabled={isLoading || !requestId}
            className="flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>Review</span>
          </Button>
          
          {!isLoading && requestId ? (
            <Link href={`/new-request?copy-from-id=${requestId}`} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline" 
                size="sm"
                className="flex items-center space-x-2"
              >
                <Copy className="h-4 w-4" />
                <span>Copy as New</span>
              </Button>
            </Link>
          ) : (
            <Button
              variant="outline" 
              size="sm"
              disabled
              className="flex items-center space-x-2"
            >
              <Copy className="h-4 w-4" />
              <span>Copy as New</span>
            </Button>
          )}
        </div>
      </div>

      {/* Review Dialog */}
      <ReviewDialog
        open={showReviewDialog}
        onOpenChange={onReviewDialogChange || (() => {})}
        requestId={requestId}
      />
    </div>
  )
}