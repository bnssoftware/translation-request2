'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface ReviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  requestId?: string
}

export default function ReviewDialog({ open, onOpenChange, requestId }: ReviewDialogProps) {
  const [reviewStatus, setReviewStatus] = useState<'approved' | 'rejected' | 'needs-revision'>('approved')
  const [reviewComments, setReviewComments] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitReview = async () => {
    setIsSubmitting(true)
    
    try {
      // TODO: Implement actual review submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reset form
      setReviewStatus('approved')
      setReviewComments('')
      onOpenChange(false)
      
      // Show success message (you might want to use a toast here)
      alert(`Review submitted for request ${requestId}`)
    } catch (error) {
      alert('Error submitting review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setReviewStatus('approved')
    setReviewComments('')
    onOpenChange(false)
  }

  const getStatusIcon = () => {
    switch (reviewStatus) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'rejected':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'needs-revision':
        return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusColor = () => {
    switch (reviewStatus) {
      case 'approved':
        return 'text-green-700 dark:text-green-400'
      case 'rejected':
        return 'text-red-700 dark:text-red-400'
      case 'needs-revision':
        return 'text-yellow-700 dark:text-yellow-400'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review Request</DialogTitle>
          <DialogDescription>
            {requestId ? `Review translation request ${requestId}` : 'Review translation request'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Review Status */}
          <div className="space-y-2">
            <Label htmlFor="review-status" className="text-sm font-medium">
              Review Status
            </Label>
            <Select value={reviewStatus} onValueChange={(value: any) => setReviewStatus(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approved">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Approved</span>
                  </div>
                </SelectItem>
                <SelectItem value="rejected">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span>Rejected</span>
                  </div>
                </SelectItem>
                <SelectItem value="needs-revision">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span>Needs Revision</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Review Comments */}
          <div className="space-y-2">
            <Label htmlFor="review-comments" className="text-sm font-medium">
              Review Comments
            </Label>
            <Textarea
              id="review-comments"
              placeholder="Enter your review comments here..."
              value={reviewComments}
              onChange={(e) => setReviewComments(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {reviewStatus === 'rejected' || reviewStatus === 'needs-revision' 
                ? 'Comments are required for rejected or revision requests.'
                : 'Optional: Add any additional comments or feedback.'}
            </p>
          </div>

          {/* Status Preview */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2">
              {getStatusIcon()}
              <span className={`text-sm font-medium ${getStatusColor()}`}>
                {reviewStatus === 'approved' && 'This request will be marked as approved'}
                {reviewStatus === 'rejected' && 'This request will be marked as rejected'}
                {reviewStatus === 'needs-revision' && 'This request will be marked as needing revision'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 mt-6">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitReview}
            disabled={isSubmitting || ((reviewStatus === 'rejected' || reviewStatus === 'needs-revision') && !reviewComments.trim())}
            className="min-w-[100px]"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}