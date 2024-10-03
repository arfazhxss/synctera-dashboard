
export const getHeaderMappings = (filter: string) => {
    const headerMappings: { [key: string]: { date: string, descripton: string, category: string, amount: string } } = {
        all: {
            date: 'Date',
            descripton: 'Marchants',
            category: 'Category',
            amount: 'Amount',
        },
        'top-merchants': {
            date: 'Date Range',
            descripton: 'Marchants',
            category: 'Multiple Categories',
            amount: 'Frequency',
        },
        'top-amount': {
            date: 'Date Range',
            descripton: 'Marchants',
            category: 'Category',
            amount: 'Total',
        },
        'top-categories': {
            date: 'Date Range',
            descripton: 'Marchants',
            category: 'Category',
            amount: 'Total',
        }
    };

    return headerMappings[filter] || headerMappings['all'];
};