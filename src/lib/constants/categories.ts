import type { ExpenseCategory } from "@/lib/types";

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "Rental Income",
  "Mortgage",
  "Property Tax",
  "Insurance",
  "Repairs & Maintenance",
  "Utilities",
  "HOA",
  "Cleaning",
  "Landscaping",
  "Supplies",
  "Legal & Professional",
  "Travel",
  "Miscellaneous",
  "Personal",
  "Uncategorized",
];

export const CONFIDENCE_THRESHOLD = 0.75;

/**
 * Keyword-based rules for deterministic categorization.
 * Keys are lowercased substrings to match against normalized descriptions.
 * First match wins, so order matters within each category.
 */
export const CATEGORY_RULES: { keywords: string[]; category: ExpenseCategory; confidence: number }[] = [
  // Income
  { keywords: ["rent deposit", "rent payment", "tenant", "rent -"], category: "Rental Income", confidence: 0.95 },

  // Mortgage
  { keywords: ["mortgage", "loan payment", "home loan"], category: "Mortgage", confidence: 0.95 },

  // Property Tax
  { keywords: ["property tax", "tax collector", "county tax", "city tax", "real estate tax"], category: "Property Tax", confidence: 0.92 },

  // Insurance
  { keywords: ["insurance", "state farm", "allstate", "geico", "progressive", "liberty mutual", "farmers ins"], category: "Insurance", confidence: 0.92 },

  // Repairs & Maintenance
  { keywords: ["plumbing", "plumber", "roto-rooter", "electrician", "hvac", "repair", "maintenance", "handyman", "contractor"], category: "Repairs & Maintenance", confidence: 0.85 },
  { keywords: ["home depot", "lowes", "lowe's", "ace hardware", "menards"], category: "Repairs & Maintenance", confidence: 0.70 },

  // Utilities
  { keywords: ["electric", "energy", "gas company", "water utility", "sewer", "trash", "waste management", "pedernales", "austin energy"], category: "Utilities", confidence: 0.92 },
  { keywords: ["comcast", "at&t", "spectrum", "internet", "cable"], category: "Utilities", confidence: 0.85 },

  // HOA
  { keywords: ["hoa", "homeowner", "association fee", "condo fee"], category: "HOA", confidence: 0.95 },

  // Cleaning
  { keywords: ["cleaning", "maid", "janitorial", "merry maids", "molly maid"], category: "Cleaning", confidence: 0.90 },

  // Landscaping
  { keywords: ["landscaping", "lawn", "mowing", "tree service", "garden", "greenscape", "trugreen"], category: "Landscaping", confidence: 0.90 },

  // Supplies
  { keywords: ["supplies", "office depot", "staples", "amazon"], category: "Supplies", confidence: 0.55 },

  // Legal & Professional
  { keywords: ["attorney", "lawyer", "legal", "accounting", "cpa", "tax prep", "bookkeep"], category: "Legal & Professional", confidence: 0.88 },
  { keywords: ["property management", "management fee"], category: "Legal & Professional", confidence: 0.85 },

  // Travel
  { keywords: ["airline", "hotel", "airbnb", "uber", "lyft", "rental car", "mileage"], category: "Travel", confidence: 0.80 },

  // Personal
  { keywords: ["personal", "atm withdrawal", "venmo", "zelle", "cash app", "paypal"], category: "Personal", confidence: 0.50 },
];
