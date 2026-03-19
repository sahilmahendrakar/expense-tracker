"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCheck, Download } from "lucide-react";
import { ReviewFilters } from "@/components/review/review-filters";
import { TransactionTable } from "@/components/review/transaction-table";
import { transactions as initialTransactions } from "@/lib/mock-data";
import type { Transaction, ExpenseCategory } from "@/lib/types";

export default function ReviewPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [filters, setFilters] = useState({
    accountId: "all",
    propertyId: "all",
    category: "all",
    needsReviewOnly: "all",
  });

  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      if (filters.accountId !== "all" && txn.accountId !== filters.accountId)
        return false;
      if (filters.propertyId !== "all" && txn.propertyId !== filters.propertyId)
        return false;
      if (filters.category !== "all" && txn.finalCategory !== filters.category)
        return false;
      if (filters.needsReviewOnly === "review" && !txn.needsReview)
        return false;
      return true;
    });
  }, [transactions, filters]);

  const reviewCount = transactions.filter((t) => t.needsReview).length;

  function handleFilterChange(key: string, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleCategoryChange(txnId: string, category: ExpenseCategory) {
    setTransactions((prev) =>
      prev.map((txn) =>
        txn.id === txnId ? { ...txn, finalCategory: category } : txn
      )
    );
    // TODO: Persist category change to backend
  }

  function handleApproveHighConfidence() {
    setTransactions((prev) =>
      prev.map((txn) =>
        txn.needsReview && txn.confidence >= 0.85
          ? { ...txn, needsReview: false }
          : txn
      )
    );
    // TODO: Batch approve via backend API
  }

  function handleExportCSV() {
    // TODO: Implement CSV export from backend or client-side
    alert("CSV export coming soon.");
  }

  return (
    <div className="space-y-6">
      <ReviewFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        reviewCount={reviewCount}
      />

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={handleApproveHighConfidence}>
          <CheckCheck className="size-4 mr-1.5" />
          Approve All High Confidence
        </Button>
        <Button variant="outline" size="sm" onClick={handleExportCSV}>
          <Download className="size-4 mr-1.5" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardContent className="pt-4">
          <TransactionTable
            transactions={filteredTransactions}
            onCategoryChange={handleCategoryChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
