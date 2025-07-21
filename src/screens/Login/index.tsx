import { View } from "react-native";

import { AuthHeader } from "@/components/AuthHeader";
import { DismissKeyboardView } from "@/components/DismissKeyboardView";
import { useAuthContext } from "@/contexts/auth.context";
import { LoginForm } from "./LoginForm";

export function Login() {
  const { user } = useAuthContext();

  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <LoginForm />
      </View>
    </DismissKeyboardView>
  );
}
