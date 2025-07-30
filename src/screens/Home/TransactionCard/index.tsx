import Swipleable from "react-native-gesture-handler/ReanimatedSwipeable";

import { Text, View } from "react-native";
import { cssInterop } from "nativewind";
import { MaterialIcons } from "@expo/vector-icons";

import { ITransaction } from "@/shared/interfaces/transaction-interface";
import { format } from "date-fns";
import { TransactionTypes } from "@/shared/enums/transactions-types";
import clsx from "clsx";

interface TransactionCardProps {
  transaction: ITransaction;
}

export const StyledSwipleable = cssInterop(Swipleable, {
  containerClassName: "containerStyle",
  childrenContainerClassName: "childrenContainerStyle",
});

export function TransactionCard({ transaction }: TransactionCardProps) {
  const isExpense = transaction.type.id === TransactionTypes.EXPENSE;

  return (
    <StyledSwipleable containerClassName="items-center self-center overflow-hidden w-[90%] mb-4">
      <View className="h-[140] bg-background-tertiary rounded-[6] p-6">
        <Text className="text-white text-base">{transaction.description}</Text>
        <Text
          className={clsx(
            "text-2xl font-bold mt-2",
            isExpense ? "text-accent-red" : "text-accent-brand-light"
          )}
        >
          {isExpense && "-"}R$ {transaction.value.toFixed(2).replace(".", ",")}
        </Text>
        <View className="flex-row w-full justify-between items-center">
          <View className="items-center flex-row mt-3">
            <MaterialIcons
              name="label-outline"
              className="text-gray-700"
              size={23}
            />
            <Text className="text-gray-700 text-base ml-2">
              {transaction.category.name}
            </Text>
          </View>
          <View className="items-center flex-row mt-3">
            <MaterialIcons
              name="calendar-month"
              className="text-gray-700"
              size={20}
            />
            <Text className="text-gray-700 text-base ml-2">
              {format(transaction.createdAt, "dd/MM/yyyy")}
            </Text>
          </View>
        </View>
      </View>
    </StyledSwipleable>
  );
}
