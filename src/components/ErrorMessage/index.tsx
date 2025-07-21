import { Text, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { PropsWithChildren } from "react";

export function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <View className="flex-row items-center mt-1.5">
      <MaterialIcons
        name="error-outline"
        size={16}
        className="text-accent-red-background-primary mr-1"
      />
      <Text className="text-accent-red-background-primary">{children}</Text>
    </View>
  );
}
