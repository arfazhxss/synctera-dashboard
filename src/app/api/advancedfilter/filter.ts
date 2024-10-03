import { Transaction } from '@/types';

interface FilterOptions {
    filterType?: string;
    topNumber?: number;
    yearFrom?: number;
    yearTo?: number;
    amountMin?: number;
    amountMax?: number;
    currency?: string;
    country?: string;
    city?: string;
    category?: string;
    searchId?: string;
    transactionType?: string[];
}

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

function filterByCurrency(transactions: Transaction[], currency: string): Transaction[] {
    return transactions.filter(t => t.currency === currency);
}

function filterByTransactionType(transactions: Transaction[], types: string[]): Transaction[] {
    return transactions.filter(t => {
        if (t.debit && types.includes('debit')) return true;
        if (t.credit && types.includes('credit')) return true;
        return false;
    });
}

function filterByAmountRange(transactions: Transaction[], min?: number, max?: number): Transaction[] {
    return transactions.filter(t => {
        const amount = t.debit ?? t.credit ?? 0;
        return (!min || amount >= min) && (!max || amount <= max);
    });
}

function filterByYearRange(transactions: Transaction[], from?: number, to?: number): Transaction[] {
    return transactions.filter(t => {
        const year = new Date(t.transactionDate).getFullYear();
        return (!from || year >= from) && (!to || year <= to);
    });
}

function filterByCountry(transactions: Transaction[], country: string): Transaction[] {
    return transactions.filter(t => t.country === country);
}

function filterByCity(transactions: Transaction[], city: string): Transaction[] {
    return transactions.filter(t => t.city === city);
}

function filterByCategory(transactions: Transaction[], category: string): Transaction[] {
    return transactions.filter(t => t.category === category);
}

function filterBySearchId(transactions: Transaction[], searchId: string): Transaction[] {
    return transactions.filter(t => t.id === Number(searchId));
}

function applyAdditionalFilters(transactions: Transaction[], options: FilterOptions): Transaction[] {
    let filtered = [...transactions];

    if (options.currency) {
        filtered = filterByCurrency(filtered, options.currency);
    }

    if (options.transactionType && options.transactionType.length > 0) {
        filtered = filterByTransactionType(filtered, options.transactionType);
    }

    if (options.yearFrom || options.yearTo) {
        filtered = filterByYearRange(filtered, options.yearFrom, options.yearTo);
    }

    if (options.country) {
        filtered = filterByCountry(filtered, options.country);
    }

    if (options.city) {
        filtered = filterByCity(filtered, options.city);
    }

    if (options.searchId) {
        filtered = filterBySearchId(filtered, options.searchId);
    }

    return filtered;
}

export function applyFilters(
    transactions: Transaction[],
    options: FilterOptions,
): Transaction[] {
    let filtered: Transaction[] = [];

    // Apply the top filtering based on filterType
    switch (options.filterType) {
        case 'merchant':
            filtered = filterTopMerchants(transactions, options.topNumber);
            break;
        case 'amount':
            filtered = filterTopAmount(transactions, options.topNumber);
            break;
        case 'category':
            filtered = filterTopCategories(transactions, options.topNumber);
            break;
        default:
            return [];
    }

    // Check for invalid combinations of filters
    if (options.filterType !== 'amount' && (options.amountMin || options.amountMax)) {
        throw new Error('Bad data: amountMin and amountMax can only be used with "amount" filterType');
    }

    // Apply additional filters to the already top-filtered results
    filtered = applyAdditionalFilters(filtered, options);

    return filtered;
}
