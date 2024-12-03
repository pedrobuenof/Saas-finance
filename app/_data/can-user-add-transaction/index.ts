import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "../get-current-month-transactions";

export const canUserAddTransaction = async () => {
  const [{ userId }, currentMonthTransactions] = await Promise.all([
    auth(),
    getCurrentMonthTransactions(),
  ]);

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await clerkClient().users.getUser(userId);

  if (user.publicMetadata.subscriptionPlan === "premium") {
    return true;
  }

  if (currentMonthTransactions >= 10) {
    return false;
  }
  return true;
};