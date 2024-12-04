import { TransactionCategory, TransactionPaymentMethod, TransactionType } from "@prisma/client";
import { z } from "zod";

export const addTransactionSchemas = z.object({
  name: z.string().trim().min(1, { message: "Transaction name is required." }),
  amount: z.number().positive({ message: "Amount must be a positive number." }),
  type: z.nativeEnum(TransactionType, { message: "Invalid transaction type." }),
  category: z.nativeEnum(TransactionCategory, { message: "Invalid transaction category." }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, { message: "Invalid payment method." }),
  date: z.date()
})