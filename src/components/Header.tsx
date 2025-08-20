'use client'

import { useEffect, useState } from "react"
import { User, Loader2 } from "lucide-react"
import Link from "next/link"

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/user')
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
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* App Name */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Translation Request
            </Link>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3">
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
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-900 dark:text-white font-medium">
                    Logged in as: <span className="font-semibold">{userInfo.name}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {userInfo.domain}\\{userInfo.username}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}