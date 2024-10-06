'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Dashboard from "@/components/TransactionDashboard"
import CustomerDashboard from "@/components/CustomerDashboard"
import FinanceInsights from "@/components/FinanceInsights"
import { AlertProvider } from "@/contexts/AlertContext"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Synctera from '@/lib/synctera-black.svg'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <Image
            src={Synctera}
            alt="Synctera"
            width={200}
            height={100}
            className="mb-4"
          />
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AlertProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow mt-20 container mx-auto px-4 py-8 z-[0]">
          <CustomerDashboard />
          <div className="w-full">
            <Dashboard />
          </div>
          <div className="mt-2">
            <FinanceInsights />
          </div>
        </main>
        <div className="mt-6">
          <Footer />
        </div>
      </div>
    </AlertProvider>
  )
}