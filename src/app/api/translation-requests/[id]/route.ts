import { NextRequest, NextResponse } from 'next/server'
import { getTranslationRequestById } from '@/lib/mock-data'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const translationRequest = getTranslationRequestById(parseInt(id))
    
    if (!translationRequest) {
      return NextResponse.json(
        { error: 'Translation request not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(translationRequest)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}