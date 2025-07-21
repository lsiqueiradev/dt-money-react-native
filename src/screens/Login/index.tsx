import { Text, TextInput, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { DismissKeyboardView } from "@/components/DismissKeyboardView";
import { PublicStackParamList } from "@/routes/PublicRoutes";

export function Login() {
  const navigation = useNavigation<StackNavigationProp<PublicStackParamList>>();

  return (
    <DismissKeyboardView>
      <Text>Tela de Login</Text>

      <TextInput className="bg-gray-500 w-full" />

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text>Registrar</Text>
      </TouchableOpacity>
    </DismissKeyboardView>
  );
}
