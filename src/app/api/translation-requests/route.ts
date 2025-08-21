import { NextResponse } from 'next/server'
import { mockTranslationRequests } from '@/lib/mock-data'

export async function GET() {
  try {
    return NextResponse.json(mockTranslationRequests)
  } catch (error) {
    console.error('Error fetching translation requests:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch translation requests'
      },
      { status: 500 }
    )
  }
}