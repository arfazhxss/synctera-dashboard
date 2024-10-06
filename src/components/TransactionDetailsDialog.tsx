"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, MapPinIcon, TagIcon, DollarSignIcon, ClockIcon } from "lucide-react"
import { motion } from "framer-motion"

type Transaction = {
    id: number
    transactionDate: string
    description: string
    category: string
    debit: number | null
    credit: number | null
    merchantStreetAddress: string
    merchantCity: string
    merchantState: string
    merchantCountry: string
}

interface TransactionDetailsDialogProps {
    open: boolean
    onOpenChange: () => void
    transaction: Transaction | null
    filterType: string
}

const formatCurrency = (amount: number | null, filterType: string) => {
    if (amount === null) return '-'
    if (filterType === 'all' || filterType === 'top-amount') {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    }
    return amount.toFixed(2)
}

interface CardInfoProps {
    title: string
    icon: React.ComponentType<{ className?: string }>
    children: React.ReactNode
}

const CardInfo: React.FC<CardInfoProps> = ({ title, icon: Icon, children }) => (
    <motion.div
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.3 }}
    >
        <Card className="h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center text-primary">
                    <Icon className="w-4 h-4 mr-2" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    </motion.div>
)

interface TransactionSummaryProps {
    transaction: Transaction
    filterType: string
}

const TransactionSummary: React.FC<TransactionSummaryProps> = ({ transaction, filterType }) => {
    const amount = transaction.debit ?? transaction.credit
    const isDebit = transaction.debit !== null

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.3, delay: 0.5 }}
        >
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center text-primary">
                        <DollarSignIcon className="w-4 h-4 mr-2" />
                        Transaction Summary
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Transaction ID:</span>
                            <span className="font-medium">{transaction.id}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Amount:</span>
                            <span className="font-medium">{formatCurrency(amount, filterType)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Type:</span>
                            <span className="font-medium">{isDebit ? 'Debit' : 'Credit'}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default function TransactionDetailsDialog({ open, onOpenChange, transaction, filterType }: Readonly<TransactionDetailsDialogProps>) {
    if (!transaction) return null

    const amount = transaction.debit ?? transaction.credit
    const isDebit = transaction.debit !== null

    const getDateDisplay = () => {
        if (filterType === 'all' || filterType === 'top-amount') {
            return transaction.transactionDate
        } else {
            const [startDate, endDate] = transaction.transactionDate.split(' to ')
            return `${startDate} - ${endDate}`
        }
    }

    const getAmountDisplay = () => {
        if (filterType === 'top-merchants' || filterType === 'top-categories') {
            return isDebit ? 'Total Spent' : 'Total Received'
        }
        return 'Amount'
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                        Transaction Details
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-6">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="overflow-hidden">
                            <CardHeader className="pb-2 bg-gradient-to-r from-primary/10 to-primary-foreground/10">
                                <CardTitle className="text-xl font-semibold">{transaction.description}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <CalendarIcon className="w-5 h-5 text-primary" />
                                        <span className="text-sm font-medium">{getDateDisplay()}</span>
                                    </div>
                                    <Badge variant={isDebit ? "destructive" : "default"} className="text-lg font-bold px-3 py-1">
                                        {formatCurrency(amount, filterType)}
                                    </Badge>
                                </div>
                                {filterType === 'all' && (
                                    <div className="mt-2 flex items-center space-x-2">
                                        <ClockIcon className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">72 weeks ago</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <CardInfo title="Category" icon={TagIcon}>
                            <span className="text-lg font-semibold">{transaction.category}</span>
                        </CardInfo>

                        <CardInfo title={getAmountDisplay()} icon={DollarSignIcon}>
                            <span className="text-lg font-semibold">{formatCurrency(amount, filterType)}</span>
                        </CardInfo>
                    </div>

                    {filterType === 'all' && (
                        <>
                            <CardInfo title="Merchant Location" icon={MapPinIcon}>
                                <p className="text-base font-medium">{transaction.merchantStreetAddress}</p>
                                <p className="text-base">{transaction.merchantCity}, {transaction.merchantState}</p>
                                <p className="text-base">{transaction.merchantCountry}</p>
                            </CardInfo>

                            <motion.div
                            // ... animation properties
                            >
                                <Card className="overflow-hidden">
                                    <CardContent className="p-0">
                                        <iframe
                                            title="Merchant Location"
                                            width="100%"
                                            height="250"
                                            style={{ border: 0 }}
                                            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(
                                                `${transaction.merchantStreetAddress}, ${transaction.merchantCity}, ${transaction.merchantState}, ${transaction.merchantCountry}`
                                            )}&zoom=15`}
                                            allowFullScreen
                                        />
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </>
                    )}

                    <TransactionSummary transaction={transaction} filterType={filterType} />
                </div>
            </DialogContent>
        </Dialog>
    )
}