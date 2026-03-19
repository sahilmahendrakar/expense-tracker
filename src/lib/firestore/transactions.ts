import { getDb } from "@/lib/firebase-admin";
import type { Transaction, ExpenseCategory } from "@/lib/types";

const COLLECTION = "transactions";

export interface TransactionFilters {
  accountId?: string;
  propertyId?: string;
  category?: string;
  needsReview?: boolean;
  statementId?: string;
}

export async function getTransactions(
  userId: string,
  filters?: TransactionFilters
): Promise<Transaction[]> {
  const db = getDb();
  let query: FirebaseFirestore.Query = db
    .collection(COLLECTION)
    .where("userId", "==", userId);

  if (filters?.accountId) {
    query = query.where("accountId", "==", filters.accountId);
  }
  if (filters?.propertyId) {
    query = query.where("propertyId", "==", filters.propertyId);
  }
  if (filters?.category) {
    query = query.where("finalCategory", "==", filters.category);
  }
  if (filters?.needsReview !== undefined) {
    query = query.where("needsReview", "==", filters.needsReview);
  }
  if (filters?.statementId) {
    query = query.where("statementId", "==", filters.statementId);
  }

  query = query.orderBy("date", "desc");

  const snapshot = await query.get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Transaction[];
}

export interface CreateTransactionData {
  statementId: string;
  accountId: string;
  propertyId?: string;
  date: string;
  description: string;
  descriptionNormalized?: string;
  amount: number;
  direction: "debit" | "credit";
  suggestedCategory: ExpenseCategory;
  finalCategory: ExpenseCategory;
  confidence: number;
  needsReview: boolean;
}

export async function batchCreateTransactions(
  userId: string,
  items: CreateTransactionData[]
): Promise<Transaction[]> {
  const db = getDb();
  const batch = db.batch();
  const now = new Date().toISOString();
  const results: Transaction[] = [];

  for (const item of items) {
    const ref = db.collection(COLLECTION).doc();
    const docData = {
      userId,
      ...item,
      createdAt: now,
    };
    batch.set(ref, docData);
    results.push({ id: ref.id, ...docData });
  }

  await batch.commit();

  return results;
}

export interface UpdateTransactionData {
  finalCategory?: ExpenseCategory;
  needsReview?: boolean;
}

export async function updateTransaction(
  transactionId: string,
  data: UpdateTransactionData
): Promise<void> {
  const db = getDb();
  const ref = db.collection(COLLECTION).doc(transactionId);

  const doc = await ref.get();
  if (!doc.exists) {
    throw new Error(`Transaction ${transactionId} not found`);
  }

  const updates: Record<string, unknown> = {};
  if (data.finalCategory !== undefined) {
    updates.finalCategory = data.finalCategory;
  }
  if (data.needsReview !== undefined) {
    updates.needsReview = data.needsReview;
  }

  await ref.update(updates);
}

export async function getTransactionById(
  transactionId: string
): Promise<Transaction | null> {
  const db = getDb();
  const doc = await db.collection(COLLECTION).doc(transactionId).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Transaction;
}
