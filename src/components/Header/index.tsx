import { Image, Text, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { useAuthContext } from "@/contexts/auth.context";
import { useBottomSheetContext } from "@/contexts/bottomsheet.context";
import { NewTransaction } from "../NewTransaction";

export function Header() {
  const { handleLogout } = useAuthContext();
  const { openBottomSheet } = useBottomSheetContext();
  return (
    <View className="w-full flex-row p-8 items-center justify-between">
      <View>
        <Image
          source={require("@/assets/Logo.png")}
          className="w-[130px] h-[30px]"
        />
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center gap-2 mt-2"
        >
          <MaterialIcons name="logout" className="text-gray-700" size={15} />
          <Text className="text-gray-700 text-base">Sair da conta</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => openBottomSheet(<NewTransaction />, 0)}
        className="bg-accent-brand w-[130px] items-center justify-center rounded-xl h-[50px]"
      >
        <Text className="text-white font-bold text-sm">Nova transação</Text>
      </TouchableOpacity>
    </View>
  );
}
