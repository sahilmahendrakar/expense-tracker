import { getModel } from "./client";
import {
  geminiExtractionResponseSchema,
  type GeminiExtractionResponse,
} from "@/lib/schemas/gemini-response";
import type { ExtractionResult } from "@/lib/types";

const EXTRACTION_PROMPT = `You are a financial document parser. Extract all transactions from this bank statement.

Return a JSON object with this exact structure:
{
  "bankName": "string or null",
  "accountLast4": "string or null",
  "statementStartDate": "YYYY-MM-DD or null",
  "statementEndDate": "YYYY-MM-DD or null",
  "transactions": [
    {
      "date": "YYYY-MM-DD",
      "description": "merchant/payee description",
      "amount": 123.45,
      "type": "debit" or "credit",
      "balance": 1234.56 or null
    }
  ],
  "warnings": ["any issues or ambiguities encountered"]
}

Rules:
- Use positive numbers for credits/deposits, negative for debits/withdrawals
- Parse dates as YYYY-MM-DD
- Include ALL transactions, do not skip any
- If a field is unclear, include a warning
- Return ONLY valid JSON, no markdown fences`;

export async function extractStatementFromPDF(
  pdfBuffer: Buffer
): Promise<ExtractionResult> {
  const model = getModel();

  const result = await model.generateContent([
    { text: EXTRACTION_PROMPT },
    {
      inlineData: {
        mimeType: "application/pdf",
        data: pdfBuffer.toString("base64"),
      },
    },
  ]);

  const responseText = result.response.text();

  const cleaned = responseText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(
      `Failed to parse Gemini response as JSON: ${cleaned.slice(0, 200)}`
    );
  }

  const validated: GeminiExtractionResponse =
    geminiExtractionResponseSchema.parse(parsed);

  return {
    bankName: validated.bankName,
    accountLast4: validated.accountLast4,
    statementStartDate: validated.statementStartDate,
    statementEndDate: validated.statementEndDate,
    transactions: validated.transactions,
    warnings: validated.warnings,
  };
}
