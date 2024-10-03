"use client"

import { useState } from 'react'
import TransactionsTable from '@/components/TransactionTable'
import LoadingOverlay from '@/components/LoadingOverlay'
import { AlertProvider } from '@/contexts/AlertContext'
import AnimatedLogoComponent from '@/components/AnimatedLogo'
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import FinanceInsights from '@/components/finance-insights'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Home() {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <AlertProvider>
      <div className="flex flex-col min-h-screen">
        <nav className="bg-background border-b">
          <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <div className="w-[300px] z-[0]">
              <AnimatedLogoComponent />
            </div>
            <div className="flex items-center space-x-4 top-50">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5 z-[0]" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 z-[0]">
                    <User className="h-5 w-5" />
                    <span>John Doe</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>

        <main className="flex-grow container mx-auto px-4 py-8 z-[0]">
          <LoadingOverlay />
          <div className="flex flex-col md:flex-row items-center justify-center w-full">
            <div className="flex md:space-x-6">
              <TransactionsTable />
            </div>
          </div>
        </main>
        <div className='mt-32'>
          <FinanceInsights />
        </div>
        <footer className="bg-primary text-primary-foreground py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                <span className="font-semibold">Synctera, Inc</span>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-xs">NASDAQ: FNTP</span>
              </div>
              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                <Button variant="link" size="sm" className="text-primary-foreground p-0">
                  About
                </Button>
                <Button variant="link" size="sm" className="text-primary-foreground p-0">
                  Careers
                </Button>
                <Button variant="link" size="sm" className="text-primary-foreground p-0">
                  Investors
                </Button>
                <Button variant="link" size="sm" className="text-primary-foreground p-0">
                  Legal
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>© 2024 Synctera, Inc. All rights reserved.</span>
              <div className="flex space-x-2">
                <Button variant="link" size="sm" className="text-primary-foreground p-0 text-xs">
                  Privacy Policy
                </Button>
                <Button variant="link" size="sm" className="text-primary-foreground p-0 text-xs">
                  Terms of Service
                </Button>
                <Button variant="link" size="sm" className="text-primary-foreground p-0 text-xs">
                  Cookie Policy
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AlertProvider>
  )
}