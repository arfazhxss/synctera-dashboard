import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type PaginationProps = {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (pageNumber: number) => void;
}

export default function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: Readonly<PaginationProps>) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return (
        <div className="flex items-center justify-between space-x-2 py-2 z-[0]">
            <div className="flex-1 text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
            </div>
            <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium">Page {currentPage} of {totalPages}</div>
                <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}