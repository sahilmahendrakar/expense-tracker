import { getDb } from "@/lib/firebase-admin";
import type { Account } from "@/lib/types";
import type { CreateAccountInput } from "@/lib/schemas/account";

const COLLECTION = "accounts";

export async function getAccounts(userId: string): Promise<Account[]> {
  const db = getDb();
  const snapshot = await db
    .collection(COLLECTION)
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Account[];
}

export async function createAccount(
  userId: string,
  data: CreateAccountInput
): Promise<Account> {
  const db = getDb();
  const now = new Date().toISOString();

  const docData = {
    userId,
    name: data.name,
    institutionName: data.institutionName ?? null,
    propertyId: data.propertyId ?? null,
    type: data.type ?? "checking",
    lastFour: data.lastFour ?? null,
    createdAt: now,
  };

  const ref = await db.collection(COLLECTION).add(docData);

  return { id: ref.id, ...docData } as Account;
}
