import { Text, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { PublicStackParamList } from "@/routes/PublicRoutes";

export function Login() {
  const navigation = useNavigation<StackNavigationProp<PublicStackParamList>>();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Tela de Login</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}
