import { z } from "zod";

export const createPropertySchema = z.object({
  name: z.string().min(1, "Property name is required").max(200),
  address: z.string().max(500).optional(),
  units: z.number().int().min(1).optional(),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
