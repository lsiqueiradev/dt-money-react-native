import { useAuthContext } from "@/contexts/auth.context";
import { Text, TouchableOpacity, View } from "react-native";

export function Home() {
  const { handleLogout } = useAuthContext();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Tela de Home</Text>

      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
