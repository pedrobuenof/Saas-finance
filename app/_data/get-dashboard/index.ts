import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";

export const getDashboard = async (month: string) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  }

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum.amount,
  );;
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum.amount,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: {...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum.amount,
  );;
  const balance = depositsTotal - investmentsTotal - expensesTotal;
  
  const transactionsTotal = Number( 
    (
      await db.transaction.aggregate({
      where,
      _sum: {amount: true},
      })
    )._sum.amount
  );

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
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
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));
  
  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory
  }
}