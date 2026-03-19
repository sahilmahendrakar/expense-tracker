import { z } from "zod";

export const createAccountSchema = z.object({
  name: z.string().min(1, "Account name is required").max(200),
  institutionName: z.string().max(200).optional(),
  propertyId: z.string().optional(),
  type: z.enum(["checking", "savings", "credit"]).optional(),
  lastFour: z
    .string()
    .regex(/^\d{4}$/, "Must be exactly 4 digits")
    .optional(),
});

export type CreateAccountInput = z.infer<typeof createAccountSchema>;
