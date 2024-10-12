'use client'

import { useState, useEffect } from 'react'
import Dashboard from "@/components/TransactionDashboard"
import CustomerDashboard from "@/components/CustomerDashboard"
import FinanceInsights from "@/components/FinanceInsights"
import LoadingScreen from '@/components/LoadingScreen'
// import { AlertProvider } from "@/contexts/AlertContext"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    // <AlertProvider>
    <main className="flex-grow container mx-auto px-4 py-8 z-[0] scale-90">
      <CustomerDashboard />
      <Dashboard />
      <FinanceInsights />
    </main>
    // </AlertProvider>
  )
}