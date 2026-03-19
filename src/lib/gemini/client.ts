import { GoogleGenerativeAI } from "@google/generative-ai";

let _genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (!_genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing GEMINI_API_KEY environment variable");
    }
    _genAI = new GoogleGenerativeAI(apiKey);
  }
  return _genAI;
}

export function getModel(modelName = "gemini-2.0-flash") {
  return getGenAI().getGenerativeModel({ model: modelName });
}
