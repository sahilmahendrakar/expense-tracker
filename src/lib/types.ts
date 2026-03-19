export type ExpenseCategory =
  | "Rental Income"
  | "Mortgage"
  | "Property Tax"
  | "Insurance"
  | "Repairs & Maintenance"
  | "Utilities"
  | "HOA"
  | "Cleaning"
  | "Landscaping"
  | "Supplies"
  | "Legal & Professional"
  | "Travel"
  | "Miscellaneous"
  | "Personal"
  | "Uncategorized";

export interface Property {
  id: string;
  userId: string;
  name: string;
  address: string;
  units?: number;
  createdAt: string;
}

export interface Account {
  id: string;
  userId: string;
  propertyId?: string;
  institutionName?: string;
  name: string;
  type: "checking" | "savings" | "credit";
  lastFour?: string;
  createdAt: string;
}

export type StatementStatus = "processed" | "pending" | "error";

export interface Statement {
  id: string;
  userId: string;
  accountId: string;
  month: number;
  year: number;
  status: StatementStatus;
  transactionCount: number;
  uploadedAt: string;
  fileName: string;
  extractionWarnings?: string[];
}

export interface Transaction {
  id: string;
  userId: string;
  statementId: string;
  accountId: string;
  propertyId?: string;
  date: string;
  description: string;
  descriptionNormalized?: string;
  amount: number;
  direction?: "debit" | "credit";
  suggestedCategory: ExpenseCategory;
  finalCategory: ExpenseCategory;
  confidence: number;
  needsReview: boolean;
  createdAt: string;
}

export interface CategoryBreakdown {
  category: ExpenseCategory;
  amount: number;
}

export interface MonthlySummary {
  month: string;
  expenses: number;
  income: number;
}

export interface RawExtractedTransaction {
  date: string;
  description: string;
  amount: number;
  type?: string;
  balance?: number;
}

export interface ExtractionResult {
  bankName?: string;
  accountLast4?: string;
  statementStartDate?: string;
  statementEndDate?: string;
  transactions: RawExtractedTransaction[];
  warnings: string[];
}

export interface CategorizationResult {
  suggestedCategory: ExpenseCategory;
  confidence: number;
  needsReview: boolean;
}
