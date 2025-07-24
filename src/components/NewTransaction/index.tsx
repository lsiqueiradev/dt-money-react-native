import { useState } from "react";

import { Text, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { useBottomSheetContext } from "@/contexts/bottomsheet.context";
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-resquest";

export function NewTransaction() {
  const { closeBottomSheet } = useBottomSheetContext();
  const [transaction, setTransaction] = useState<CreateTransactionInterface>({
    categoryId: 0,
    description: "",
    typeId: 0,
    value: 0,
  });

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        className="w-full flex-row items-center justify-between"
        onPress={closeBottomSheet}
      >
        <Text className="text-white text-xl font-bold">Nova transação</Text>
        <MaterialIcons name="close" className="text-gray-700" size={20} />
      </TouchableOpacity>
      <Text>asdsad</Text>
    </View>
  );
}
