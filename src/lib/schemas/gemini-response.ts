import { z } from "zod";

export const geminiTransactionSchema = z.object({
  date: z.string(),
  description: z.string(),
  amount: z.number(),
  type: z.string().optional(),
  balance: z.number().optional(),
});

export const geminiExtractionResponseSchema = z.object({
  bankName: z.string().optional(),
  accountLast4: z.string().optional(),
  statementStartDate: z.string().optional(),
  statementEndDate: z.string().optional(),
  transactions: z.array(geminiTransactionSchema),
  warnings: z.array(z.string()).default([]),
});

export type GeminiExtractionResponse = z.infer<typeof geminiExtractionResponseSchema>;
