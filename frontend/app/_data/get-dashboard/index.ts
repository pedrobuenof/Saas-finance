import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";
import { auth } from "@clerk/nextjs/server";

const getUserId = () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not ");
  }

  return userId
}

export const getDashboard = async (month: string) => {  
  const userId = getUserId();
  
  const where = {
    userId,
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  }

  const [
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    transactionsTotal,
    lastTransactions,
  ] = await Promise.all([
    db.transaction.aggregate({
      where: { ...where, type: "DEPOSIT" },
      _sum: { amount: true },
    }).then(res => Number(res?._sum.amount || 0)),
  
    db.transaction.aggregate({
      where: { ...where, type: "INVESTMENT" },
      _sum: { amount: true },
    }).then(res => Number(res?._sum.amount || 0)),
  
    db.transaction.aggregate({
      where: { ...where, type: "EXPENSE" },
      _sum: { amount: true },
    }).then(res => Number(res?._sum.amount || 0)),
  
    db.transaction.aggregate({
      where,
      _sum: { amount: true },
    }).then(res => Number(res?._sum.amount || 0)),

    // Consultando as últimas transações
    db.transaction.findMany({
      where,
      orderBy: { date: "desc" },
      take: 15,
    }),
  ]);

  const balance = depositsTotal - investmentsTotal - expensesTotal;

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: transactionsTotal ? Math.round((depositsTotal / transactionsTotal) * 100) : 0,
    [TransactionType.EXPENSE]: transactionsTotal ? Math.round((expensesTotal / transactionsTotal) * 100) : 0,
    [TransactionType.INVESTMENT]: transactionsTotal ? Math.round((investmentsTotal / transactionsTotal) * 100) : 0,
  };

  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number( category._sum.amount || 0 ),
    percentageOfTotal: expensesTotal ? Math.round(
      (Number(category._sum.amount || 0) / expensesTotal) * 100) : 0,
  }));
  
  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions: JSON.parse(JSON.stringify(lastTransactions))
  }
}