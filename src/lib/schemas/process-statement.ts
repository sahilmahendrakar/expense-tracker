import { z } from "zod";

export const processStatementSchema = z.object({
  accountId: z.string().min(1, "Account ID is required"),
  month: z.coerce.number().int().min(1).max(12),
  year: z.coerce.number().int().min(2000).max(2100),
});

export type ProcessStatementInput = z.infer<typeof processStatementSchema>;
