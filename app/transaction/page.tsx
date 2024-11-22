import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transationColumns } from "./_columns";

const TransactionPage = async () => {
  const transactions = await db.transaction.findMany({})

  return (
    <div className="p-6 space-y-6">
      {/* TITLE AND BUTTON */}
      <div className="flex items-center justify-between w-full p-6">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="rounded-full font-bold">
          Adicionar transações
          <ArrowDownUpIcon/>
        </Button>
      </div>

      <DataTable columns={transationColumns} data={transactions}/>
    </div>
  );
}
 
export default TransactionPage;