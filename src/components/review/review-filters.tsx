"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { accounts, properties, EXPENSE_CATEGORIES } from "@/lib/mock-data";

interface ReviewFiltersProps {
  filters: {
    accountId: string;
    propertyId: string;
    category: string;
    needsReviewOnly: string;
  };
  onFilterChange: (key: string, value: string) => void;
  reviewCount: number;
}

export function ReviewFilters({
  filters,
  onFilterChange,
  reviewCount,
}: ReviewFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="text-sm px-3 py-1">
          {reviewCount} transaction{reviewCount !== 1 ? "s" : ""} need
          {reviewCount === 1 ? "s" : ""} review
        </Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5">
          <Label className="text-xs">Account</Label>
          <Select
            value={filters.accountId}
            onValueChange={(v) => onFilterChange("accountId", v ?? "all")}
          >
            <SelectTrigger>
              <SelectValue placeholder="All accounts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All accounts</SelectItem>
              {accounts.map((acct) => (
                <SelectItem key={acct.id} value={acct.id}>
                  {acct.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Property</Label>
          <Select
            value={filters.propertyId}
            onValueChange={(v) => onFilterChange("propertyId", v ?? "all")}
          >
            <SelectTrigger>
              <SelectValue placeholder="All properties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All properties</SelectItem>
              {properties.map((prop) => (
                <SelectItem key={prop.id} value={prop.id}>
                  {prop.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Category</Label>
          <Select
            value={filters.category}
            onValueChange={(v) => onFilterChange("category", v ?? "all")}
          >
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {EXPENSE_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Filter</Label>
          <Select
            value={filters.needsReviewOnly}
            onValueChange={(v) => onFilterChange("needsReviewOnly", v ?? "all")}
          >
            <SelectTrigger>
              <SelectValue placeholder="All transactions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All transactions</SelectItem>
              <SelectItem value="review">Needs review only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
