import { getDb } from "@/lib/firebase-admin";
import type { Statement } from "@/lib/types";

const COLLECTION = "statements";

export interface StatementFilters {
  accountId?: string;
}

export async function getStatements(
  userId: string,
  filters?: StatementFilters
): Promise<Statement[]> {
  const db = getDb();
  let query: FirebaseFirestore.Query = db
    .collection(COLLECTION)
    .where("userId", "==", userId);

  if (filters?.accountId) {
    query = query.where("accountId", "==", filters.accountId);
  }

  query = query.orderBy("uploadedAt", "desc");

  const snapshot = await query.get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Statement[];
}

export interface CreateStatementData {
  accountId: string;
  month: number;
  year: number;
  fileName: string;
  status: Statement["status"];
  transactionCount: number;
  extractionWarnings?: string[];
}

export async function createStatement(
  userId: string,
  data: CreateStatementData
): Promise<Statement> {
  const db = getDb();
  const now = new Date().toISOString();

  const docData = {
    userId,
    accountId: data.accountId,
    month: data.month,
    year: data.year,
    fileName: data.fileName,
    status: data.status,
    transactionCount: data.transactionCount,
    uploadedAt: now,
    extractionWarnings: data.extractionWarnings ?? [],
  };

  const ref = await db.collection(COLLECTION).add(docData);

  return { id: ref.id, ...docData };
}
