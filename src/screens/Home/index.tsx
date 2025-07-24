import { Header } from "@/components/Header";
import { useAuthContext } from "@/contexts/auth.context";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";

export function Home() {
  const { handleLogout } = useAuthContext();
  return (
    <SafeAreaView className="flex-1 bg-background-primary ">
      <Header />
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
