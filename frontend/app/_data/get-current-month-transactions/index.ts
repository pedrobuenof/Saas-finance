import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { endOfMonth, startOfMonth } from "date-fns";

const getUserId = () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not ");
  }

  return userId
}

export const getCurrentMonthTransactions = async () => {
  const userId = getUserId();

  return db.transaction.count({
    where: {
      userId,
      created: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });
};