import { getModel } from "./client";
import {
  CATEGORY_RULES,
  EXPENSE_CATEGORIES,
  CONFIDENCE_THRESHOLD,
} from "@/lib/constants/categories";
import type { CategorizationResult, ExpenseCategory } from "@/lib/types";

/**
 * Attempt deterministic categorization via keyword matching first.
 * Falls back to Gemini if no rule matches and useGeminiFallback is true.
 */
export async function categorizeTransaction(
  description: string,
  amount: number,
  options?: { useGeminiFallback?: boolean }
): Promise<CategorizationResult> {
  const ruleResult = categorizeByRules(description);
  if (ruleResult) {
    return ruleResult;
  }

  if (options?.useGeminiFallback !== false) {
    try {
      return await categorizeWithGemini(description, amount);
    } catch {
      // TODO: log Gemini categorization failure
    }
  }

  return {
    suggestedCategory: "Uncategorized",
    confidence: 0,
    needsReview: true,
  };
}

function categorizeByRules(description: string): CategorizationResult | null {
  const lower = description.toLowerCase();

  for (const rule of CATEGORY_RULES) {
    const matched = rule.keywords.some((kw) => lower.includes(kw));
    if (matched) {
      return {
        suggestedCategory: rule.category,
        confidence: rule.confidence,
        needsReview: rule.confidence < CONFIDENCE_THRESHOLD,
      };
    }
  }

  return null;
}

async function categorizeWithGemini(
  description: string,
  amount: number
): Promise<CategorizationResult> {
  const model = getModel();

  const prompt = `You are a rental property expense categorizer.

Given this bank transaction, classify it into exactly one category.

Transaction: "${description}"
Amount: ${amount}

Valid categories: ${EXPENSE_CATEGORIES.join(", ")}

Return ONLY a JSON object:
{
  "category": "one of the valid categories",
  "confidence": 0.0 to 1.0
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const parsed = JSON.parse(cleaned) as {
    category: string;
    confidence: number;
  };

  const category = EXPENSE_CATEGORIES.includes(
    parsed.category as ExpenseCategory
  )
    ? (parsed.category as ExpenseCategory)
    : "Uncategorized";

  const confidence =
    typeof parsed.confidence === "number"
      ? Math.min(1, Math.max(0, parsed.confidence))
      : 0.5;

  return {
    suggestedCategory: category,
    confidence,
    needsReview: confidence < CONFIDENCE_THRESHOLD,
  };
}

/**
 * Batch categorize multiple transactions.
 * Uses deterministic rules first, batches remaining for Gemini.
 */
export async function categorizeTransactions(
  transactions: { description: string; amount: number }[]
): Promise<CategorizationResult[]> {
  const results: CategorizationResult[] = [];

  for (const txn of transactions) {
    const result = await categorizeTransaction(txn.description, txn.amount);
    results.push(result);
  }

  return results;
}
