import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { filterTransactions } from '@/app/api/transactions/filters';
import { Transaction } from '@/types';

export async function GET(request: NextRequest) {
    const filePath = path.join(process.cwd(), 'src', 'data', 'transactions.json');
    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get('filter');

    try {
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const transactions: Transaction[] = JSON.parse(fileContents);

        const filteredTransactions = filterTransactions(transactions, filter);
        return NextResponse.json(filteredTransactions);
    } catch (error) {
        console.error('Error reading transactions:', error);
        return NextResponse.json(
            { error: 'Failed to fetch transactions' },
            { status: 500 }
        );
    }
}