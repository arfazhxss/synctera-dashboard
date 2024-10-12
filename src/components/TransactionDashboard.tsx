"use client";

import React, { useState, useEffect } from "react";
import { getHeaderMappings } from "@/components/HeaderMapping";
import { useLoading } from "@/contexts/LoadingContext";
import { Transaction } from "@/types";
import AdvancedFilter from "@/components/AdvancedFilters";
import TransactionTable from "@/components/TransactionTable";

export default function Dashboard() {
    const [selectedTransaction, setSelectedTransaction] =
        useState<Transaction | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [advancedFilterQuery, setAdvancedFilterQuery] = useState("");
    const [filter, setFilter] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const { setIsLoading } = useLoading();
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        setIsLoading(true);
        let url = "/api/transactions";

        if (advancedFilterQuery) {
            url = `/api/advancedfilter?${advancedFilterQuery}`;
            setCurrentPage(1);
        } else {
            url += `?filter=${filter}`;
            setCurrentPage(1);
        }

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setTransactions(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching transactions:", error);
                setIsLoading(false);
            });
    }, [filter, advancedFilterQuery, setIsLoading]);

    const handleAdvancedFilters = (
        queryString: React.SetStateAction<string>,
    ) => {
        setAdvancedFilterQuery(queryString);
        setCurrentPage(1);
    };

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
        if (newFilter !== "off") {
            setFilter(newFilter);
            setAdvancedFilterQuery("");
        }
    };

    const totalTransactions = transactions.length;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = transactions.slice(
        indexOfFirstItem,
        indexOfLastItem,
    );
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const currentHeaders = getHeaderMappings(filter);

    return (
        <div className="flex flex-col w-full xl:flex-row lg:space-x-6">
            <div className="w-full mb-4 lg:mb-0">
                <TransactionTable
                    selectedTransaction={selectedTransaction}
                    setSelectedTransaction={setSelectedTransaction}
                    currentTransactions={currentTransactions}
                    filter={filter}
                    setFilter={handleFilterChange}
                    currentPage={currentPage}
                    totalTransactions={totalTransactions}
                    itemsPerPage={itemsPerPage}
                    paginate={paginate}
                    currentHeaders={currentHeaders}
                />
            </div>
            <div className="hidden xl:block">
                <AdvancedFilter onApplyFilters={handleAdvancedFilters} />
            </div>
        </div>
    );
}
