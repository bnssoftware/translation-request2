'use client'

import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowLeft, Download, Mail, Plus } from 'lucide-react'

export default function ButtonsPage() {
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
        <h1 className="text-4xl font-bold mb-2">Buttons</h1>
        <p className="text-muted-foreground">
          Displays a button or a component that looks like a button.
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Variants */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        {/* Sizes */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* With Icons */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">With Icons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              Login with Email
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="secondary" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        </section>

        {/* States */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">States</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
          </div>
        </section>

        {/* Loading State */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Loading</h2>
          <div className="flex flex-wrap gap-4">
            <Button disabled>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent" />
              Loading...
            </Button>
            <Button variant="outline" disabled>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent" />
              Please wait
            </Button>
          </div>
        </section>

        {/* As Child */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">As Link</h2>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/components">Go to Components</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </section>

        {/* Interactive Examples */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Interactive Examples</h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => alert('Default button clicked!')}>
              Click Me
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => confirm('Are you sure you want to delete this?')}
            >
              Delete Item
            </Button>
            <Button 
              variant="outline" 
              onClick={() => console.log('Outline button clicked')}
            >
              Log to Console
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}