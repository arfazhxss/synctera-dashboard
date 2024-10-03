import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FilterSelectProps = {
    currentFilter: string;
    onChange: (value: string) => void;
}

export default function FilterSelect({ currentFilter, onChange }: Readonly<FilterSelectProps>) {
    return (
        <Select value={currentFilter} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select filter" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="top-merchants">Top Merchants</SelectItem>
                <SelectItem value="top-amount">Top Amounts</SelectItem>
                <SelectItem value="top-categories">Top Categories</SelectItem>
            </SelectContent>
        </Select>
    );
}
