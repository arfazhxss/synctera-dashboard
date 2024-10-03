"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, CreditCardIcon, MapPinIcon, TagIcon } from "lucide-react"

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
}

export default function TransactionDetailsDialog({ open, onOpenChange, transaction }: TransactionDetailsDialogProps) {
    if (!transaction) return null

    const formatCurrency = (amount: number | null) => {
        if (amount === null) return '-'
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    }

    const amount = transaction.debit || transaction.credit
    const isDebit = transaction.debit !== null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Transaction Details</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-medium">{transaction.description}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{transaction.transactionDate}</span>
                                </div>
                                <Badge variant={isDebit ? "destructive" : "default"} className="text-lg font-semibold">
                                    {formatCurrency(amount)}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center">
                                    <TagIcon className="w-4 h-4 mr-2" />
                                    Category
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <span className="text-lg font-semibold">{transaction.category}</span>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center">
                                    <CreditCardIcon className="w-4 h-4 mr-2" />
                                    Transaction Type
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <span className="text-lg font-semibold">{isDebit ? 'Debit' : 'Credit'}</span>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                                <MapPinIcon className="w-4 h-4 mr-2" />
                                Merchant Location
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-base">{transaction.merchantStreetAddress}</p>
                            <p className="text-base">{transaction.merchantCity}, {transaction.merchantState}</p>
                            <p className="text-base">{transaction.merchantCountry}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-0">
                            <iframe
                                title="Merchant Location"
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(
                                    `${transaction.merchantStreetAddress}, ${transaction.merchantCity}, ${transaction.merchantState}, ${transaction.merchantCountry}`
                                )}`}
                                allowFullScreen
                            />
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    )
}