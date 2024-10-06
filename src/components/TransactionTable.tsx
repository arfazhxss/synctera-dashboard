"use client"

import React from 'react'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TransactionDetailsDialog from '@/components/TransactionDetailsDialog'
import TransactionRow from '@/components/TransactionRow';
import { cellMappings } from '@/components/CellMapping';
import FilterSelect from '@/components/FilterSelect';
import Pagination from "@/components/Pagination"
import { Transaction } from '@/types';
import GrainedA from '@/lib/grained-a.png'

interface TransactionTableProps {
    selectedTransaction: Transaction | null;
    setSelectedTransaction: (transaction: Transaction | null) => void;
    currentTransactions: Transaction[];
    filter: string;
    setFilter: (filter: string) => void;
    currentPage: number;
    totalTransactions: number;
    itemsPerPage: number;
    paginate: (pageNumber: number) => void;
    currentHeaders: { date: string; category: string; amount: string };
}

export default function TransactionTable({
    selectedTransaction,
    setSelectedTransaction,
    currentTransactions,
    filter,
    setFilter,
    currentPage,
    totalTransactions,
    itemsPerPage,
    paginate,
    currentHeaders
}: Readonly<TransactionTableProps>) {
    return (
        <div className="w-full">
            <Card className="w-full mx-auto">
                <div
                    className="relative rounded-md px-6 py-0"
                    style={{
                        backdropFilter: 'blur(1px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        backgroundImage: `url(${GrainedA.src}), linear-gradient(175deg, rgba(255,255,255,0.7) 45%, rgba(240,240,240,0.8))`,
                        backgroundBlendMode: 'overlay',
                        minWidth: '500px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-bold">Transactions</CardTitle>
                        <div className="flex-shrink-0">
                            <FilterSelect currentFilter={filter} onChange={setFilter} />
                        </div>
                    </CardHeader>
                    <CardContent style={{ position: 'relative', zIndex: 1 }}>
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[140px]">{currentHeaders.date}</TableHead>
                                    <TableHead className="w-[210px]">Description</TableHead>
                                    <TableHead className="w-[200px]">{currentHeaders.category}</TableHead>
                                    <TableHead className="w-[50px] text-right">{currentHeaders.amount}</TableHead>
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
                        filterType={filter}
                    />
                </div>
            </Card >
        </div >
    )
}
