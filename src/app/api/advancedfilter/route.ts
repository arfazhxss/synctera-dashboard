import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { applyFilters } from '@/app/api/advancedfilter/filter';
import { Transaction } from '@/types';

async function getTransactions(): Promise<Transaction[]> {
    const filePath = path.join(process.cwd(), 'src', 'data', 'transactions.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContents);
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        // Enforce mandatory `topNumber` and `filterType`
        const topNumber = Number(searchParams.get('topNumber'));
        const filterType = searchParams.get('filterType');

        if (!topNumber || !filterType) {
            return NextResponse.json({ error: '`topNumber` and `filterType` are required' }, { status: 400 });
        }

        const transactions = await getTransactions();

        // Filter options passed only once
        const filterOptions = {
            filterType: filterType,
            topNumber: topNumber,
            yearFrom: searchParams.get('yearFrom') ? Number(searchParams.get('yearFrom')) : undefined,
            yearTo: searchParams.get('yearTo') ? Number(searchParams.get('yearTo')) : undefined,
            amountMin: searchParams.get('amountMin') ? Number(searchParams.get('amountMin')) : undefined,
            amountMax: searchParams.get('amountMax') ? Number(searchParams.get('amountMax')) : undefined,
            currency: searchParams.get('currency') ?? undefined,
            country: searchParams.get('country') ?? undefined,
            city: searchParams.get('city') ?? undefined,
            category: searchParams.get('category') ?? undefined,
            searchId: searchParams.get('searchId') ?? undefined,
            transactionType: searchParams.getAll('transactionType'),
        };

        // Apply filters
        const filteredTransactions = applyFilters(transactions, filterOptions);

        return NextResponse.json(filteredTransactions);

    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json({ error: 'Failed to process transactions' }, { status: 500 });
    }
}