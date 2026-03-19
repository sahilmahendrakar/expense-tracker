import { z } from "zod";
import { EXPENSE_CATEGORIES } from "@/lib/constants/categories";

const categoryEnum = z.enum(
  EXPENSE_CATEGORIES as [string, ...string[]]
);

export const updateTransactionSchema = z.object({
  finalCategory: categoryEnum.optional(),
  needsReview: z.boolean().optional(),
});

export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
