import { Header } from "@/components/Header";
import { TransactionTypes } from "@/shared/enums/transactions-types";
import { ScrollView, View } from "react-native";
import { TransactionCard } from "./TransactionCard";
import { useTransactionContext } from "@/contexts/transaction.context";

export function ListHeader() {
  const { totalTransactions } = useTransactionContext();
  return (
    <>
      <Header />
      <View className="h-[150] w-full">
        <View className="h-[50] bg-background-primary" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute pl-6 h-[141]"
        >
          <TransactionCard
            type={TransactionTypes.EXPENSE}
            amount={totalTransactions.expense}
          />
          <TransactionCard
            type={TransactionTypes.REVENUE}
            amount={totalTransactions.revenue}
          />
          <TransactionCard type="total" amount={totalTransactions.total} />
        </ScrollView>
      </View>
    </>
  );
}
