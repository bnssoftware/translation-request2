'use client'

import Image from "next/image";
import { useState } from "react";
import { Search, Clock, CheckCircle, XCircle, AlertTriangle, FileText, User, Plus } from "lucide-react";
import RequestsDataTable, { TranslationRequest } from "@/components/RequestsDataTable";

export default function Home() {
  const [activeTab, setActiveTab] = useState("my-queue")

  const tabs = [
    { id: "my-queue", label: "My Queue" },
    { id: "my-requests", label: "My Requests" },
    { id: "new-requests", label: "New Requests" },
    { id: "in-progress", label: "In Progress" },
    { id: "past-due", label: "Past Due" },
    { id: "completed", label: "Completed" },
    { id: "returned", label: "Returned" },
    { id: "search", label: "Search" },
  ]

  // Mock data for demonstration
  const mockRequests: TranslationRequest[] = [
    {
      id: "1",
      title: "Product Manual Translation",
      description: "Translation of technical product manual from English to Spanish",
      sourceLanguage: "en",
      targetLanguage: "es",
      priority: "high",
      dueDate: "2024-09-15",
      department: "Product",
      requestType: "document",
      status: "new",
      submittedBy: "John Smith",
      submittedDate: "2024-08-20",
      assignedTo: "Maria Garcia"
    },
    {
      id: "2",
      title: "Website Content Localization",
      description: "Localize marketing website content for French market",
      sourceLanguage: "en",
      targetLanguage: "fr",
      priority: "medium",
      dueDate: "2024-09-20",
      department: "Marketing",
      requestType: "website",
      status: "in-progress",
      submittedBy: "Sarah Johnson",
      submittedDate: "2024-08-18",
      assignedTo: "Pierre Dubois"
    },
    {
      id: "3",
      title: "Legal Contract Translation",
      description: "Urgent translation of legal contract for German partnership",
      sourceLanguage: "en",
      targetLanguage: "de",
      priority: "urgent",
      dueDate: "2024-08-25",
      department: "Legal",
      requestType: "legal",
      status: "past-due",
      submittedBy: "Michael Brown",
      submittedDate: "2024-08-15"
    },
    {
      id: "4",
      title: "Software UI Translation",
      description: "Translation of user interface strings for mobile app",
      sourceLanguage: "en",
      targetLanguage: "ja",
      priority: "medium",
      dueDate: "2024-10-01",
      department: "Engineering",
      requestType: "software",
      status: "completed",
      submittedBy: "Lisa Chen",
      submittedDate: "2024-08-10",
      assignedTo: "Yuki Tanaka",
      completedDate: "2024-08-19"
    },
    {
      id: "5",
      title: "Marketing Brochure Translation",
      description: "Translation of product brochure for Chinese market launch",
      sourceLanguage: "en",
      targetLanguage: "zh",
      priority: "low",
      dueDate: "2024-09-30",
      department: "Marketing",
      requestType: "marketing",
      status: "returned",
      submittedBy: "David Wilson",
      submittedDate: "2024-08-12",
      assignedTo: "Wei Zhang"
    },
    {
      id: "6",
      title: "User Manual Update",
      description: "Update existing user manual translation with new features",
      sourceLanguage: "en",
      targetLanguage: "pt",
      priority: "medium",
      dueDate: "2024-09-10",
      department: "Product",
      requestType: "document",
      status: "new",
      submittedBy: "Anna Rodriguez",
      submittedDate: "2024-08-21"
    }
  ]

  // Filter data based on active tab
  const getFilteredData = (): TranslationRequest[] => {
    switch (activeTab) {
      case "my-queue":
        // Assuming current user is "Maria Garcia" for demo
        return mockRequests.filter(req => req.assignedTo === "Maria Garcia")
      case "my-requests":
        // Assuming current user is "John Smith" for demo
        return mockRequests.filter(req => req.submittedBy === "John Smith")
      case "new-requests":
        return mockRequests.filter(req => req.status === "new")
      case "in-progress":
        return mockRequests.filter(req => req.status === "in-progress")
      case "past-due":
        return mockRequests.filter(req => req.status === "past-due")
      case "completed":
        return mockRequests.filter(req => req.status === "completed")
      case "returned":
        return mockRequests.filter(req => req.status === "returned")
      case "search":
        return mockRequests
      default:
        return []
    }
  }

  // Get count for each tab
  const getTabCount = (tabId: string): number => {
    switch (tabId) {
      case "my-queue":
        return mockRequests.filter(req => req.assignedTo === "Maria Garcia").length
      case "my-requests":
        return mockRequests.filter(req => req.submittedBy === "John Smith").length
      case "new-requests":
        return mockRequests.filter(req => req.status === "new").length
      case "in-progress":
        return mockRequests.filter(req => req.status === "in-progress").length
      case "past-due":
        return mockRequests.filter(req => req.status === "past-due").length
      case "completed":
        return mockRequests.filter(req => req.status === "completed").length
      case "returned":
        return mockRequests.filter(req => req.status === "returned").length
      case "search":
        return mockRequests.length
      default:
        return 0
    }
  }
  const renderTabContent = () => {
    const filteredData = getFilteredData()
    
    const getTabInfo = () => {
      switch (activeTab) {
        case "my-queue":
          return {
            title: "My Queue",
            description: "Translation requests assigned to you",
            colorClass: ""
          }
        case "my-requests":
          return {
            title: "My Requests", 
            description: "Translation requests you have submitted",
            colorClass: ""
          }
        case "new-requests":
          return {
            title: "New Requests",
            description: "Recently submitted translation requests",
            colorClass: ""
          }
        case "in-progress":
          return {
            title: "In Progress",
            description: "Translation requests currently being worked on",
            colorClass: ""
          }
        case "past-due":
          return {
            title: "Past Due",
            description: "Translation requests that are overdue",
            colorClass: "text-orange-600 dark:text-orange-400"
          }
        case "completed":
          return {
            title: "Completed",
            description: "Successfully completed translation requests",
            colorClass: "text-green-600 dark:text-green-400"
          }
        case "returned":
          return {
            title: "Returned",
            description: "Translation requests that have been returned for revision",
            colorClass: "text-red-600 dark:text-red-400"
          }
        case "search":
          return {
            title: "Search",
            description: "Search through all translation requests",
            colorClass: ""
          }
        default:
          return {
            title: "",
            description: "",
            colorClass: ""
          }
      }
    }

    const tabInfo = getTabInfo()

    if (activeTab === "search") {
      return (
        <div className="p-6">
          <h2 className={`text-2xl font-bold mb-4 ${tabInfo.colorClass}`}>{tabInfo.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{tabInfo.description}</p>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search requests..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
            <RequestsDataTable data={filteredData} />
          </div>
        </div>
      )
    }

    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold mb-4 ${tabInfo.colorClass}`}>{tabInfo.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{tabInfo.description}</p>
        <RequestsDataTable data={filteredData} />
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const count = getTabCount(tab.id)
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {tab.label}
                    <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium rounded-full ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {count}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-900">
          {renderTabContent()}
        </div>
      </div>

    </div>
  );
}
