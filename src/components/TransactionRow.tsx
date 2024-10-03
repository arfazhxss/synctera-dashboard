import { TableCell, TableRow } from "@/components/ui/table";
import { Transaction } from '@/types';

type TransactionRowProps = {
    transaction: Transaction;
    onClick: (transaction: Transaction) => void;
    cellMappings: {
        date: (transaction: Transaction) => string;
        category: (transaction: Transaction) => JSX.Element | string;
        description: (transaction: Transaction) => JSX.Element | string;
        amount: (transaction: Transaction) => JSX.Element | string;
    }
}

export default function TransactionRow({ transaction, onClick, cellMappings }: Readonly<TransactionRowProps>) {
    return (
        <TableRow onClick={() => onClick(transaction)} className="cursor-pointer hover:bg-muted/50">
            <TableCell className="font-medium">{cellMappings.date(transaction)}</TableCell>
            <TableCell>{cellMappings.description(transaction)}</TableCell>
            <TableCell>{cellMappings.category(transaction)}</TableCell>
            <TableCell className="text-right">{cellMappings.amount(transaction)}</TableCell>
        </TableRow>
    );
}
