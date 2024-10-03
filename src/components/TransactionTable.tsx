"use client"

import React, { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TransactionDetailsDialog from '@/components/TransactionDetailsDialog'
import { getHeaderMappings } from '@/components/HeaderMapping';
import TransactionRow from '@/components/TransactionRow';
import { cellMappings } from '@/components/CellMapping';
import { useLoading } from '@/contexts/LoadingContext';
import FilterSelect from '@/components/FilterSelect';
import Pagination from "@/components/Pagination"
import { Transaction } from '@/types';
import AdvancedFilter from '@/components/AdvancedFilters';

export default function TransactionsTable() {
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [advancedFilterQuery, setAdvancedFilterQuery] = useState('')
    const [filter, setFilter] = useState<string>('all')
    const [currentPage, setCurrentPage] = useState(1)
    const { setIsLoading } = useLoading();
    const [itemsPerPage] = useState(10)

    useEffect(() => {
        setIsLoading(true)
        let url = '/api/transactions'

        if (advancedFilterQuery) {
            url = `/api/advancedfilter?${advancedFilterQuery}`
        } else if (filter !== 'all') {
            url += `?filter=${filter}`
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setTransactions(data)
                setIsLoading(false)
            })
            .catch(error => {
                console.error('Error fetching transactions:', error)
                setIsLoading(false)
            })
    }, [filter, advancedFilterQuery, setIsLoading])

    const handleAdvancedFilters = (queryString: React.SetStateAction<string>) => {
        setAdvancedFilterQuery(queryString)
        setCurrentPage(1)
    }

    const totalTransactions = transactions.length
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem)
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
    const currentHeaders = getHeaderMappings(filter);

    return (
        <div className="flex md:space-x-6">
            <div className="flex justify-center w-full rounded-p-lg">
                <Card className="w-[800px]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-bold">Transactions</CardTitle>
                        <div className="flex-shrink-0">
                            <FilterSelect currentFilter={filter} onChange={setFilter} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border px-6 py-0 overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {/* Conditionally render the table headers based on the filter using currentHeaders */}
                                        <TableHead className="w-[140px]">
                                            {currentHeaders.date}
                                        </TableHead>
                                        <TableHead className="w-[210px]">Description</TableHead>
                                        <TableHead className="w-[200px]">
                                            {currentHeaders.category}
                                        </TableHead>
                                        <TableHead className="w-[50px] text-right">
                                            {currentHeaders.amount}
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {currentTransactions.map((transaction) => (
                                        <TransactionRow
                                            key={transaction.id}
                                            transaction={transaction}
                                            onClick={setSelectedTransaction}
                                            cellMappings={cellMappings[filter]}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Conditionally render the pagination component */}
                        <Pagination
                            currentPage={currentPage}
                            totalItems={totalTransactions}
                            itemsPerPage={itemsPerPage}
                            onPageChange={paginate}
                        />
                    </CardContent>

                    <TransactionDetailsDialog
                        open={selectedTransaction !== null}
                        onOpenChange={() => setSelectedTransaction(null)}
                        transaction={selectedTransaction}
                    />
                </Card>
            </div>
            <AdvancedFilter onApplyFilters={handleAdvancedFilters} />
        </div>
    )
}
