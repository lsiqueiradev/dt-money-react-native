import { Text, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { TransactionTypes } from "@/shared/enums/transactions-types";
import clsx from "clsx";

interface TransactionTypeSelectorProps {
  setTransactionType: (type: TransactionTypes) => void;
  typeId?: number;
}

export function TransactionTypeSelector({
  setTransactionType,
  typeId,
}: TransactionTypeSelectorProps) {
  return (
    <View className="flex-row items-center justify-between gap-3 mt-2">
      <TouchableOpacity
        onPress={() => setTransactionType(TransactionTypes.REVENUE)}
        className={clsx(
          "flex-row items-center p-2 flex-1 justify-center h-[58px] rounded-lg",
          typeId === TransactionTypes.REVENUE
            ? "bg-accent-brand"
            : "bg-background-tertiary"
        )}
      >
        <MaterialIcons
          name="arrow-circle-up"
          className={clsx(
            "mr-2",
            typeId === TransactionTypes.REVENUE
              ? "text-white"
              : "text-accent-brand-light"
          )}
          size={30}
        />
        <Text className="text-white font-bold">Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setTransactionType(TransactionTypes.EXPENSE)}
        className={clsx(
          "flex-row items-center p-2 flex-1 justify-center h-[58px] rounded-lg",
          typeId === TransactionTypes.EXPENSE
            ? "bg-accent-red-background-primary"
            : "bg-background-tertiary"
        )}
      >
        <MaterialIcons
          name="arrow-circle-down"
          className={clsx(
            "mr-2",
            typeId === TransactionTypes.EXPENSE
              ? "text-white"
              : "text-accent-red"
          )}
          size={30}
        />
        <Text className="text-white font-bold">Saída</Text>
      </TouchableOpacity>
    </View>
  );
}
