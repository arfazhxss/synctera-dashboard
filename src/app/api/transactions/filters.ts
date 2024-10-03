// filter.ts
import { Transaction } from '@/types';

function formatDateRange(dates: string[]): string {
    const [earliestDate, latestDate] = dates.map(date => new Date(date));

    const formatFullDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'long' }); // Full month name
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };

    return `${formatFullDate(earliestDate)} to ${formatFullDate(latestDate)}`;
}

function filterTopMerchants(transactions: Transaction[], topN: number = 10): Transaction[] {
    const merchantInfo = transactions.reduce((acc, transaction) => {
        const merchantName = transaction.description;
        const category = transaction.category;

        if (!acc[merchantName]) {
            acc[merchantName] = {
                count: 0,
                categories: new Set<string>(),
                dates: [] as string[], // Add a dates array to track transaction dates
            };
        }

        acc[merchantName].count += 1;
        acc[merchantName].categories.add(category);
        acc[merchantName].dates.push(transaction.transactionDate); // Track the transaction dates

        return acc;
    }, {} as Record<string, { count: number; categories: Set<string>; dates: string[] }>);

    // Get the top N merchants based on frequency
    const topMerchants = Object.entries(merchantInfo)
        .sort(([, a], [, b]) => b.count - a.count)
        .slice(0, topN)
        .map(([merchant]) => merchant);

    // Create a new array of modified transactions for top merchants
    const modifiedTransactions = new Map<string, Transaction>();

    // Filter and modify transactions for each top merchant
    topMerchants.forEach(merchant => {
        const merchantData = merchantInfo[merchant];
        const sortedDates = [...merchantData.dates].sort((a, b) => new Date(a).getTime() - new Date(b).getTime()); // Sort dates

        // Format the date range
        const formattedDateRange = formatDateRange(sortedDates);

        // Find the first transaction for this merchant to modify it
        const firstTransaction = transactions.find(t => t.description === merchant);

        if (firstTransaction) {
            modifiedTransactions.set(merchant, {
                ...firstTransaction,
                debit: null, // Set debit to null
                credit: merchantData.count, // Set credit to the merchant's frequency
                category: Array.from(merchantData.categories).join(', '), // Join categories with commas
                transactionDate: formattedDateRange // Set the transactionDate to the formatted range
            });
        }
    });

    return Array.from(modifiedTransactions.values());
}

function filterTopAmount(transactions: Transaction[], topN: number = 10): Transaction[] {
    return transactions
        .toSorted((a, b) =>
            (b.debit ?? b.credit ?? 0) - (a.debit ?? a.credit ?? 0)
        )
        .slice(0, topN);
}

function filterTopCategories(transactions: Transaction[], topN: number = 10): Transaction[] {
    // Step 1: Count how many times each category appears and track merchant names and transaction dates
    const categoryInfo = transactions.reduce((acc, transaction) => {
        const category = transaction.category;
        const merchant = transaction.description;

        if (!acc[category]) {
            acc[category] = {
                count: 0,
                merchants: new Set<string>(),
                dates: [] as string[],
            };
        }

        acc[category].count += 1;
        acc[category].merchants.add(merchant);
        acc[category].dates.push(transaction.transactionDate); // Track the transaction dates

        return acc;
    }, {} as Record<string, { count: number; merchants: Set<string>; dates: string[] }>);

    // Step 2: Get the top N categories based on frequency
    const topCategories = Object.entries(categoryInfo)
        .sort(([, a], [, b]) => b.count - a.count)
        .slice(0, topN)
        .map(([category]) => category);

    // Step 3: Create a new array of modified transactions for top categories
    const modifiedTransactions = new Map<string, Transaction>();

    // Filter and modify transactions for each top category
    topCategories.forEach(category => {
        const categoryData = categoryInfo[category];
        const sortedDates = [...categoryData.dates].sort((a, b) => new Date(a).getTime() - new Date(b).getTime()); // Sort dates

        // Format the date range
        const formattedDateRange = formatDateRange(sortedDates);

        // Find the first transaction for this category to modify it
        const firstTransaction = transactions.find(t => t.category === category);

        if (firstTransaction) {
            modifiedTransactions.set(category, {
                ...firstTransaction,
                debit: null, // Set debit to null
                credit: categoryData.count, // Set credit to the category's frequency
                description: Array.from(categoryData.merchants).join(', '), // Join merchant names with commas
                transactionDate: formattedDateRange, // Set the transactionDate to the formatted range
            });
        }
    });

    return Array.from(modifiedTransactions.values());
}

export function filterTransactions(transactions: Transaction[], filter: string | null, topN: number = 10): Transaction[] {

    switch (filter) {
        case 'top-merchants':
            return filterTopMerchants(transactions, topN);
        case 'top-amount':
            return filterTopAmount(transactions, topN);
        case 'top-categories':
            return filterTopCategories(transactions, topN);
        default:
            return transactions;
    }
}