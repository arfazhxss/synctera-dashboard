"use client"

import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import GrainedB from '@/lib/grained-a.png'

export default function AdvancedFilters({ onApplyFilters }: { readonly onApplyFilters: (queryString: string) => void }) {
    const [filterType, setFilterType] = useState('')
    const [topNumber, setTopNumber] = useState(10)
    const [yearFrom, setYearFrom] = useState('')
    const [yearTo, setYearTo] = useState('')
    const [amountMin, setAmountMin] = useState('')
    const [amountMax, setAmountMax] = useState('')
    const [currency, setCurrency] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [category, setCategory] = useState('')
    const [searchId, setSearchId] = useState('')
    const [transactionType, setTransactionType] = useState({
        credit: false,
        debit: false
    })

    const [showAlert, setShowAlert] = useState(false);
    const buildQueryString = () => {
        const params = new URLSearchParams()
        if (filterType) params.append('filterType', filterType)
        if (topNumber) params.append('topNumber', topNumber.toString())
        if (yearFrom) params.append('yearFrom', yearFrom)
        if (yearTo) params.append('yearTo', yearTo)
        if (amountMin) params.append('amountMin', amountMin)
        if (amountMax) params.append('amountMax', amountMax)
        if (currency) params.append('currency', currency)
        if (country) params.append('country', country)
        if (city) params.append('city', city)
        if (category) params.append('category', category)
        if (searchId) params.append('searchId', searchId)
        if (transactionType.credit) params.append('transactionType', 'credit')
        if (transactionType.debit) params.append('transactionType', 'debit')
        return params.toString()
    }

    const handleApplyFilters = () => {
        // Validation logic: Check if amount range or transaction type is selected
        const isAmountSelected = amountMin || amountMax
        const isTransactionTypeSelected = transactionType.credit || transactionType.debit

        if (!isAmountSelected && !isTransactionTypeSelected) {
            // Optionally, clear the form or show an alert
            setShowAlert(true);
            return
        } else { setShowAlert(false) }

        const queryString = buildQueryString()
        onApplyFilters(queryString)
    }

    const handleFilterTypeChange = (value: string) => {
        setFilterType(value);
    };

    return (
        <div
            className="hidden xl:block w-[400px] px-10 lg:px-0"
            style={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backgroundImage: `url(${GrainedB.src}), linear-gradient(175deg, rgba(255,255,255,0.1) 45%, rgba(240,240,240,0.8))`,
                backgroundBlendMode: 'overlay',
                minWidth: '500px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Card className="bg-gradient-to-b from-background to-secondary/10">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold">Advanced Filters</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 p-4">
                    {showAlert && (
                        <Alert variant="destructive">
                            <ExclamationTriangleIcon className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                Please select at least one amount range or transaction type.
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label htmlFor="filter-type" className="text-xs">Filter Type</Label>
                            <Select onValueChange={handleFilterTypeChange} value={filterType}>
                                <SelectTrigger id="filter-type" className="h-8">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="merchants">Merchants</SelectItem>
                                    <SelectItem value="amount">Amount</SelectItem>
                                    <SelectItem value="category">Category</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="top-number" className="text-xs">Results</Label>
                            <div className="flex items-center space-x-2">
                                <Slider
                                    id="top-number"
                                    value={[topNumber]}
                                    onValueChange={(value) => setTopNumber(value[0])}
                                    max={100}
                                    step={1}
                                    className="flex-grow"
                                />
                                <Input
                                    type="number"
                                    id="top-number-input"
                                    value={topNumber}
                                    onChange={(e) => setTopNumber(Number(e.target.value))}
                                    className="w-14 h-8 text-center text-xs"
                                    min={0}
                                    max={100}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-xs">Year Range</Label>
                        <div className="flex space-x-2">
                            <Select onValueChange={setYearFrom} value={yearFrom}>
                                <SelectTrigger className="h-8">
                                    <SelectValue placeholder="From" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Array.from({ length: 11 }, (_, i) => 2010 + i).map(year => (
                                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select onValueChange={setYearTo} value={yearTo}>
                                <SelectTrigger className="h-8">
                                    <SelectValue placeholder="To" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Array.from({ length: 11 }, (_, i) => 2010 + i).map(year => (
                                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-xs">Amount Range</Label>
                        <div className="flex space-x-2">
                            <Input
                                type="number"
                                placeholder="Min"
                                className="h-8 text-xs"
                                value={amountMin}
                                onChange={(e) => setAmountMin(e.target.value)}
                            />
                            <Input
                                type="number"
                                placeholder="Max"
                                className="h-8 text-xs"
                                value={amountMax}
                                onChange={(e) => setAmountMax(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label htmlFor="currency" className="text-xs">Currency</Label>
                            <Select onValueChange={setCurrency} value={currency}>
                                <SelectTrigger id="currency" className="h-8">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="EUR">EUR</SelectItem>
                                    <SelectItem value="GBP">GBP</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="country" className="text-xs">Country</Label>
                            <Select onValueChange={setCountry} value={country}>
                                <SelectTrigger id="country" className="h-8">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USA">USA</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                    <SelectItem value="UK">UK</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label htmlFor="city" className="text-xs">City</Label>
                            <Select onValueChange={setCity} value={city}>
                                <SelectTrigger id="city" className="h-8">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="New York">New York</SelectItem>
                                    <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                                    <SelectItem value="Chicago">Chicago</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="category" className="text-xs">Category</Label>
                            <Select onValueChange={setCategory} value={category}>
                                <SelectTrigger id="category" className="h-8">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Other Services">Other Services</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="search-id" className="text-xs">Search by ID</Label>
                        <Input
                            type="number"
                            id="search-id"
                            placeholder="Enter ID"
                            className="h-8 text-xs"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label className="text-xs">Transaction Type</Label>
                        <div className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="credit"
                                    className="h-4 w-4"
                                    checked={transactionType.credit}
                                    onCheckedChange={(checked) =>
                                        setTransactionType(prev => ({ ...prev, credit: !!checked }))
                                    }
                                />
                                <Label htmlFor="credit" className="text-xs font-normal">Credit</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="debit"
                                    className="h-4 w-4"
                                    checked={transactionType.debit}
                                    onCheckedChange={(checked) =>
                                        setTransactionType(prev => ({ ...prev, debit: !!checked }))
                                    }
                                />
                                <Label htmlFor="debit" className="text-xs font-normal">Debit</Label>
                            </div>
                        </div>
                    </div>
                    <Button className="w-full h-8 mt-2 text-sm" onClick={handleApplyFilters}>Apply Filters</Button>
                </CardContent>
            </Card>
        </div>
    )
}
