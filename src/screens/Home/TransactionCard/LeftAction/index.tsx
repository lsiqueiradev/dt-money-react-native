import { Pressable, Text, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { ITransaction } from "@/shared/interfaces/transaction-interface";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { useBottomSheetContext } from "@/contexts/bottomsheet.context";
import { EditTransactionForm } from "./EditTransactionForm";

interface LeftActionParams {
  transaction: ITransaction;
}

export function LeftAction({ transaction }: LeftActionParams) {
  const { openBottomSheet } = useBottomSheetContext();
  return (
    <Pressable
      onPress={() =>
        openBottomSheet(<EditTransactionForm transaction={transaction} />, 0)
      }
    >
      <View className="w-[80] h-[140] bg-accent-blue items-center justify-center rounded-l-[6]">
        <MaterialIcons name="edit" size={30} className="text-white" />
      </View>
    </Pressable>
  );
}
