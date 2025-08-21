'use client'

import { useEffect, useState } from "react"
import { User, Loader2, Menu, X } from "lucide-react"
import Link from "next/link"
import { buildApiUrl, API_CONFIG } from "@/lib/api-config"

interface WindowsUserData {
  name: string;
  username: string;
  domain: string;
  computerName: string;
  homeDirectory: string;
  platform: string;
  architecture: string;
  osRelease: string;
  osType: string;
}

export default function Header() {
  const [userInfo, setUserInfo] = useState<WindowsUserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.USER))
        const data = await response.json()
        
        if (data.success) {
          setUserInfo(data.user)
        } else {
          setError(data.error || 'Failed to fetch user information')
        }
      } catch (err) {
        setError('Failed to connect to user service')
        console.error('Error fetching user info:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserInfo()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* App Name */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Translation Request
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/new-request" 
              className="text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              New Request
            </Link>
            <Link 
              href="/" 
              className="text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Requests
            </Link>
            <Link 
              href="/vendor-quotes" 
              className="text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Vendor Quotes
            </Link>
            <Link 
              href="/management" 
              className="text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Management
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* User Info */}
          <div className="hidden md:flex items-center space-x-3">
            {loading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Loading...</span>
              </div>
            ) : error ? (
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-red-500" />
                <span className="text-sm text-red-600 dark:text-red-400">
                  User unavailable
                </span>
              </div>
            ) : userInfo ? (
              <div className="text-right">
                <div className="text-sm text-gray-900 dark:text-white font-medium">
                  Logged in as: <span className="font-semibold">{userInfo.name}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {userInfo.domain}\\{userInfo.username}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/new-request"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                New Request
              </Link>
              <Link
                href="/"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Requests
              </Link>
              <Link
                href="/vendor-quotes"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Vendor Quotes
              </Link>
              <Link
                href="/management"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Management
              </Link>
            </div>
            
            {/* Mobile User Info */}
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Loading...</span>
                </div>
              ) : error ? (
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-red-600 dark:text-red-400">
                    User unavailable
                  </span>
                </div>
              ) : userInfo ? (
                <div>
                  <div className="text-sm text-gray-900 dark:text-white font-medium">
                    Logged in as: <span className="font-semibold">{userInfo.name}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {userInfo.domain}\\{userInfo.username}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}