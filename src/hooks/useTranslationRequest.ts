import { useQuery } from '@tanstack/react-query'
import { TranslationRequest } from '@/lib/mock-data'
import { buildTranslationRequestsUrl } from '@/lib/api-config'

async function fetchTranslationRequest(id: string): Promise<TranslationRequest> {
  const url = buildTranslationRequestsUrl(id)
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error('Failed to fetch translation request')
  }
  
  const result: TranslationRequest = await response.json()
  
  return result
}

export function useTranslationRequest(id: string) {
  return useQuery({
    queryKey: ['translation-request', id],
    queryFn: () => fetchTranslationRequest(id),
    enabled: !!id, // Only run query if id is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  })
}