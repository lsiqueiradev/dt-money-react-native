import { useSnackbarContext } from "@/contexts/snackbar.context";
import { Text, View } from "react-native";

export function Snackbar() {
  const { message, type } = useSnackbarContext();

  if (!message || !type) {
    return <></>;
  }

  const bgColor = `${
    type === "SUCCESS"
      ? "bg-accent-brand-background-primary"
      : "bg-accent-red-background-primary"
  }`;

  return (
    <View
      className={`absolute bottom-safe-offset-10 self-center w-[90%] h-[50px] rounded-xl ${bgColor} justify-center p-4 z-10`}
    >
      <Text className="text-white text-base font-bold">{message}</Text>
    </View>
  );
}
