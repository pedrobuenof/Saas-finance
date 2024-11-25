"use server"

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { addTransactionSchemas } from "./schema";
import { revalidatePath } from "next/cache";

const addTransaction = async (params: Omit<Prisma.TransactionCreateInput, "userId">) => {
  addTransactionSchemas.parse(params);
  
  const {userId} = await auth();

  if (!userId) {
    throw new Error("unauthorized")
  }
  await db.transaction.create({
    data: {...params, userId},
  })

  revalidatePath("/transaction")
}
 
export default addTransaction;

