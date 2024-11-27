import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transationColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

const TransactionPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login")
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });
  const userCanAddTransaction = await canUserAddTransaction();

  return (
    <>
      <Navbar/>
      <div className="p-6 space-y-6">
        {/* TITLE AND BUTTON */}
        <div className="flex items-center justify-between w-full p-6">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction}/>
        </div>

        <DataTable columns={transationColumns} data={transactions}/>
      </div>
    </>
  );
}
 
export default TransactionPage;