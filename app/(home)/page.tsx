import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transaction";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

interface HomeProps {
  searchParams: {
    month: string,
  },
}

const HomePage = async ({searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login")
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }

  const dashboard = await getDashboard(month)
  const userCanAddTransaction = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);
  return (
    <>    
      <Navbar />
      <div className="p-6 space-y-6">
        {/* HEADER/TITLE */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        {/* CONTENT */}
        <div className="grid grid-cols-[2fr,1fr] gap-6">
          {/* MAIN CONTENT */}
          <div className="flex flex-col gap-6">
            <SummaryCards month={month} {...dashboard} userCanAddTransaction={userCanAddTransaction}/>
            

            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionPieChart {...dashboard}/>
              <ExpensesPerCategory expensesPerCategory={dashboard.totalExpensePerCategory}/>
            </div>
          </div>
          {/* SIDE CONTENT */}
          <LastTransactions lastTransactions={dashboard.lastTransactions}/>
        </div>
      </div>
    </>
  );
}
 
export default HomePage;
