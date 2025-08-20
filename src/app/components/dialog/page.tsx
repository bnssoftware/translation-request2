'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link'
import { ArrowLeft, Settings, Trash2, User, Info, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'

// Zod schemas
const basicFormSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  username: z.string()
    .min(1, 'Username is required')
    .min(2, 'Username must be at least 2 characters')
    .max(30, 'Username must be less than 30 characters')
    .refine(val => val.startsWith('@'), 'Username must start with @')
    .refine(val => /^@[a-zA-Z0-9_]+$/.test(val), 'Username can only contain letters, numbers, and underscores')
})

const userFormSchema = z.object({
  displayName: z.string()
    .min(1, 'Display name is required')
    .min(2, 'Display name must be at least 2 characters')
    .max(100, 'Display name must be less than 100 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters')
})

type BasicFormData = z.infer<typeof basicFormSchema>
type UserFormData = z.infer<typeof userFormSchema>

export default function DialogPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  
  // Form state
  const [basicForm, setBasicForm] = useState<BasicFormData>({ name: 'Pedro Duarte', username: '@peduarte' })
  const [basicErrors, setBasicErrors] = useState<Partial<Record<keyof BasicFormData, string>>>({})
  
  const [userForm, setUserForm] = useState<UserFormData>({ displayName: 'John Doe', email: 'john@example.com' })
  const [userErrors, setUserErrors] = useState<Partial<Record<keyof UserFormData, string>>>({})

  const handleBasicSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = basicFormSchema.safeParse(basicForm)
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BasicFormData, string>> = {}
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof BasicFormData] = issue.message
        }
      })
      setBasicErrors(fieldErrors)
      return
    }
    
    setBasicErrors({})
    // Close dialog programmatically after successful validation
    const closeButton = (e.target as HTMLFormElement).querySelector('[data-dialog-close]') as HTMLButtonElement
    closeButton?.click()
  }

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = userFormSchema.safeParse(userForm)
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof UserFormData, string>> = {}
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof UserFormData] = issue.message
        }
      })
      setUserErrors(fieldErrors)
      return
    }
    
    setUserErrors({})
    // Close dialog programmatically after successful validation
    const closeButton = (e.target as HTMLFormElement).querySelector('[data-dialog-close]') as HTMLButtonElement
    closeButton?.click()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Link 
          href="/components" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Components
        </Link>
        <h1 className="text-4xl font-bold mb-2">Dialog</h1>
        <p className="text-muted-foreground">
          A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Dialog */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Basic Dialog</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleBasicSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-start gap-4">
                    <label htmlFor="name" className="text-right font-medium pt-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="col-span-3 space-y-1">
                      <input
                        id="name"
                        value={basicForm.name}
                        onChange={(e) => {
                          setBasicForm(prev => ({ ...prev, name: e.target.value }))
                          if (basicErrors.name) setBasicErrors(prev => ({ ...prev, name: undefined }))
                        }}
                        className={`w-full px-3 py-2 border rounded-md transition-colors ${
                          basicErrors.name 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        } focus:ring-2 focus:ring-opacity-50`}
                        placeholder="Enter your full name"
                      />
                      {basicErrors.name && (
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                          <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />
                          {basicErrors.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <label htmlFor="username" className="text-right font-medium pt-2">
                      Username <span className="text-red-500">*</span>
                    </label>
                    <div className="col-span-3 space-y-1">
                      <input
                        id="username"
                        value={basicForm.username}
                        onChange={(e) => {
                          setBasicForm(prev => ({ ...prev, username: e.target.value }))
                          if (basicErrors.username) setBasicErrors(prev => ({ ...prev, username: undefined }))
                        }}
                        className={`w-full px-3 py-2 border rounded-md transition-colors ${
                          basicErrors.username 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        } focus:ring-2 focus:ring-opacity-50`}
                        placeholder="@yourusername"
                      />
                      {basicErrors.username && (
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                          <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />
                          {basicErrors.username}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                  <DialogClose asChild>
                    <button type="button" data-dialog-close className="hidden">Hidden Close</button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </section>

        {/* Dialog with Icons */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">With Icons</h2>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  User Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    User Settings
                  </DialogTitle>
                  <DialogDescription>
                    Configure your user preferences and account settings.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUserSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Display Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={userForm.displayName}
                        onChange={(e) => {
                          setUserForm(prev => ({ ...prev, displayName: e.target.value }))
                          if (userErrors.displayName) setUserErrors(prev => ({ ...prev, displayName: undefined }))
                        }}
                        className={`w-full px-3 py-2 border rounded-md transition-colors ${
                          userErrors.displayName 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        } focus:ring-2 focus:ring-opacity-50`}
                        placeholder="Enter your display name"
                      />
                      {userErrors.displayName && (
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                          <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />
                          {userErrors.displayName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={userForm.email}
                        onChange={(e) => {
                          setUserForm(prev => ({ ...prev, email: e.target.value }))
                          if (userErrors.email) setUserErrors(prev => ({ ...prev, email: undefined }))
                        }}
                        className={`w-full px-3 py-2 border rounded-md transition-colors ${
                          userErrors.email 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        } focus:ring-2 focus:ring-opacity-50`}
                        placeholder="Enter your email address"
                      />
                      {userErrors.email && (
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                          <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />
                          {userErrors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save</Button>
                    <DialogClose asChild>
                      <button type="button" data-dialog-close className="hidden">Hidden Close</button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Preferences
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Preferences
                  </DialogTitle>
                  <DialogDescription>
                    Customize your application preferences.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notifications" />
                    <label htmlFor="notifications" className="text-sm">Enable notifications</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="darkmode" />
                    <label htmlFor="darkmode" className="text-sm">Dark mode</label>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <select className="w-full px-3 py-2 border rounded-md">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Reset</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button>Apply</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Controlled Dialog */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Controlled Dialog</h2>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setIsOpen(true)}>
              Open Controlled Dialog
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Controlled Dialog</DialogTitle>
                  <DialogDescription>
                    This dialog state is controlled by React state.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    You can control when this dialog opens and closes programmatically.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={() => setIsOpen(false)}>
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Confirmation Dialog */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Confirmation Dialog</h2>
          <div className="flex gap-4">
            <Button 
              variant="destructive"
              onClick={() => setConfirmOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Item
            </Button>
            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Confirm Deletion
                  </DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this item? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      setConfirmOpen(false)
                      alert('Item deleted!')
                    }}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Information Dialog */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Information Dialog</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Info className="mr-2 h-4 w-4" />
                Show Info
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  Information
                </DialogTitle>
                <DialogDescription>
                  Here's some important information you should know.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">
                      Did you know?
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      This dialog component is built on top of Radix UI primitives and styled with Tailwind CSS.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h4 className="font-medium text-green-900 dark:text-green-100">
                      Accessibility
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      The dialog automatically handles focus management and keyboard navigation.
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Got it!</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        {/* Large Content Dialog */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Large Content</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">View Terms</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Terms and Conditions</DialogTitle>
                <DialogDescription>
                  Please read our terms and conditions carefully.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 max-h-[400px] overflow-y-auto">
                <div className="space-y-4 text-sm">
                  <h4 className="font-medium">1. Introduction</h4>
                  <p className="text-muted-foreground">
                    These terms and conditions outline the rules and regulations for the use of our service.
                  </p>
                  
                  <h4 className="font-medium">2. Acceptance of Terms</h4>
                  <p className="text-muted-foreground">
                    By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>

                  <h4 className="font-medium">3. Use License</h4>
                  <p className="text-muted-foreground">
                    Permission is granted to temporarily download one copy of the materials on our service for personal, non-commercial transitory viewing only.
                  </p>

                  <h4 className="font-medium">4. Disclaimer</h4>
                  <p className="text-muted-foreground">
                    The materials on our service are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>

                  <h4 className="font-medium">5. Limitations</h4>
                  <p className="text-muted-foreground">
                    In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our service, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Decline</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>Accept</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>
      </div>
    </div>
  )
}