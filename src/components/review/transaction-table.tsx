"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency, formatDate, EXPENSE_CATEGORIES } from "@/lib/mock-data";
import type { Transaction, ExpenseCategory } from "@/lib/types";

function confidenceVariant(confidence: number): "default" | "secondary" | "destructive" | "outline" {
  if (confidence >= 0.9) return "default";
  if (confidence >= 0.7) return "secondary";
  return "destructive";
}

interface TransactionTableProps {
  transactions: Transaction[];
  onCategoryChange: (txnId: string, category: ExpenseCategory) => void;
}

export function TransactionTable({
  transactions,
  onCategoryChange,
}: TransactionTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Suggested</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Final Category</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((txn) => (
            <TableRow key={txn.id}>
              <TableCell className="whitespace-nowrap text-muted-foreground">
                {formatDate(txn.date)}
              </TableCell>
              <TableCell className="font-medium max-w-[200px] truncate">
                {txn.description}
              </TableCell>
              <TableCell
                className={`text-right whitespace-nowrap font-medium ${
                  txn.amount >= 0 ? "text-emerald-600" : ""
                }`}
              >
                {formatCurrency(txn.amount)}
              </TableCell>
              <TableCell>
                <span className="text-xs text-muted-foreground">
                  {txn.suggestedCategory}
                </span>
              </TableCell>
              <TableCell>
                <Badge variant={confidenceVariant(txn.confidence)}>
                  {Math.round(txn.confidence * 100)}%
                </Badge>
              </TableCell>
              <TableCell>
                <Select
                  value={txn.finalCategory}
                  onValueChange={(v) => {
                    if (v) onCategoryChange(txn.id, v as ExpenseCategory);
                  }}
                >
                  <SelectTrigger className="h-7 w-[160px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPENSE_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                {txn.needsReview ? (
                  <Badge variant="destructive">Review</Badge>
                ) : (
                  <Badge variant="outline">OK</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
