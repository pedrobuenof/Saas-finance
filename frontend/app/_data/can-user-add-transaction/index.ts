import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "../get-current-month-transactions";

const getUserId = () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not ");
  }

  return userId
}

export const canUserAddTransaction = async () => {
  const userId = getUserId();

  const [currentMonthTransactions, user] = await Promise.all([
    getCurrentMonthTransactions(),
    clerkClient().users.getUser(userId),
  ]);

  if (user.publicMetadata.subscriptionPlan === "premium") {
    return true;
  }

  if (currentMonthTransactions >= 10) {
    return false;
  }
  return true;
};