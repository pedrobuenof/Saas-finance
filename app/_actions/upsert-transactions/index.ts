"use server"

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { TransactionCategory, TransactionPaymentMethod, TransactionType } from "@prisma/client";
import { addTransactionSchemas } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

const upsertTransaction = async (params: UpsertTransactionParams) => {
  addTransactionSchemas.parse(params);
  
  const {userId} = await auth();

  if (!userId) {
    throw new Error("unauthorized")
  }
  await db.transaction.upsert({
    update: {...params, userId},
    create: {...params, userId},
    where: {
      id: params?.id ?? "",
    },
  })

  revalidatePath("/transaction")
}
 
export default upsertTransaction;

