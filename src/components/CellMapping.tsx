import React from 'react'
import { Transaction } from '@/types';
const formatTransactionDate = (dateStr: string | number | Date) => {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    return `${month}/${day}`;
};

export const cellMappings: {
    [key: string]: {
        date: (transaction: Transaction) => string,
        category: (transaction: Transaction) => JSX.Element | string,
        description: (transaction: Transaction) => JSX.Element | string,
        amount: (transaction: Transaction) => JSX.Element | string
    }
} = {
    all: {
        date: (transaction) => {
            const date = new Date(transaction.transactionDate);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        },
        category: (transaction) => transaction.category,
        description: (transaction) => (
            <span
                style={{
                    display: 'inline-block',
                    maxWidth: '240px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
                title={transaction.description}  // Optionally, show the full description on hover
            >
                {transaction.description}
            </span>
        ),
        amount: (transaction) =>
            transaction.debit
                ? <span className="text-red-500">-{transaction.debit.toFixed(2)}</span>
                : <span className="text-green-500">{transaction.credit?.toFixed(2)}</span>,
    },
    'top-merchants': {
        date: (transaction) => {
            const [startDateStr, endDateStr] = transaction.transactionDate.split(' to ');
            const startDate = formatTransactionDate(startDateStr);
            const endDate = formatTransactionDate(endDateStr);
            return `${startDate} - ${endDate}`;
        },
        category: (transaction) => (
            <span
                style={{
                    display: 'inline-block',
                    maxWidth: '240px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
                title={transaction.category}
            >
                {transaction.category}
            </span>
        ),
        description: (transaction) => (
            <span
                style={{
                    display: 'inline-block',
                    maxWidth: '240px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
                title={transaction.description}
            >
                {transaction.description}
            </span>
        ),
        amount: (transaction) =>
            transaction.debit
                ? (
                    <span
                        className="amount-span"
                        style={{
                            display: 'inline-block',
                            textAlign: 'right',
                            verticalAlign: 'middle',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        -{transaction.debit}
                    </span>
                )
                : (
                    <span
                        className="amount-span"
                        style={{
                            display: 'inline-block',
                            textAlign: 'right',
                            verticalAlign: 'middle',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {transaction.credit}
                    </span>
                ),
    },
    'top-amount': {
        date: (transaction) => {
            const date = new Date(transaction.transactionDate);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        },
        category: (transaction) => transaction.category,
        description: (transaction) => (
            <span
                style={{
                    display: 'inline-block',
                    maxWidth: '240px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
                title={transaction.description}
            >
                {transaction.description}
            </span>
        ),
        amount: (transaction) =>
            transaction.debit
                ? <span>{transaction.debit}</span>
                : <span>{transaction.credit}</span>,
    },
    'top-categories': {
        date: (transaction) => {
            const [startDateStr, endDateStr] = transaction.transactionDate.split(' to ');
            const startDate = formatTransactionDate(startDateStr);
            const endDate = formatTransactionDate(endDateStr);
            return `${startDate} - ${endDate}`;
        },
        category: (transaction) => transaction.category,
        description: (transaction) => (
            <span
                style={{
                    display: 'inline-block',
                    maxWidth: '240px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
                title={transaction.description}
            >
                {transaction.description}
            </span>
        ),
        amount: (transaction) =>
            transaction.debit
                ? (
                    <span
                        className="amount-span"
                        style={{
                            display: 'inline-block',
                            textAlign: 'right',
                            verticalAlign: 'middle',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        -{transaction.debit}
                    </span>
                )
                : (
                    <span
                        className="amount-span"
                        style={{
                            display: 'inline-block',
                            textAlign: 'right',
                            verticalAlign: 'middle',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {transaction.credit}
                    </span>
                ),
    }
};
