// API Configuration utility
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  ENDPOINTS: {
    TRANSLATION_REQUESTS: process.env.NEXT_PUBLIC_TRANSLATION_REQUESTS_ENDPOINT || '/translation-requests',
    USER: '/user'
  }
}

/**
 * Builds a full API URL from the base URL and endpoint path
 * @param endpoint - The API endpoint path
 * @returns Full API URL
 */
export function buildApiUrl(endpoint: string): string {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}

/**
 * Builds a translation requests API URL
 * @param id - Optional request ID
 * @returns Translation requests API URL
 */
export function buildTranslationRequestsUrl(id?: string): string {
  const baseUrl = buildApiUrl(API_CONFIG.ENDPOINTS.TRANSLATION_REQUESTS)
  return id ? `${baseUrl}/${id}` : baseUrl
}