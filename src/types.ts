export type Transaction = {
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
    currency: string
}

export type AdvancedFilterOptions = {
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
