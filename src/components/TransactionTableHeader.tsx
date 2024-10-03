import { TableHead, TableRow } from "@/components/ui/table";

type TransactionTableHeaderProps = {
    headers: Readonly<{
        date: string;
        description: string;
        category: string;
        amount: string;
    }>
}

export default function TransactionTableHeader({ headers }: Readonly<TransactionTableHeaderProps>) {
    return (
        <TableRow>
            <TableHead className="w-[100px]">{headers.date}</TableHead>
            <TableHead className="w-[250px]">{headers.description}</TableHead>
            <TableHead className="w-[200px]">{headers.category}</TableHead>
            <TableHead className="w-[50px] text-right">{headers.amount}</TableHead>
        </TableRow>
    );
}
