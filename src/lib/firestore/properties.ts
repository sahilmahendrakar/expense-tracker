import { getDb } from "@/lib/firebase-admin";
import type { Property } from "@/lib/types";
import type { CreatePropertyInput } from "@/lib/schemas/property";

const COLLECTION = "properties";

export async function getProperties(userId: string): Promise<Property[]> {
  const db = getDb();
  const snapshot = await db
    .collection(COLLECTION)
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Property[];
}

export async function createProperty(
  userId: string,
  data: CreatePropertyInput
): Promise<Property> {
  const db = getDb();
  const now = new Date().toISOString();

  const docData = {
    userId,
    name: data.name,
    address: data.address ?? "",
    units: data.units ?? 1,
    createdAt: now,
  };

  const ref = await db.collection(COLLECTION).add(docData);

  return { id: ref.id, ...docData };
}
