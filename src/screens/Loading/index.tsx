import { useAuthContext } from "@/contexts/auth.context";
import { useEffect } from "react";
import { ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LoadingProps {
  setLoading: (value: boolean) => void;
}

export function Loading({ setLoading }: LoadingProps) {
  const { handleLogout, restoreUserSession } = useAuthContext();

  useEffect(() => {
    (async () => {
      try {
        const user = await restoreUserSession();

        if (!user) {
          await handleLogout();
        }
      } catch (error) {
        await handleLogout();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView className="bg-background-primary items-center justify-center flex-1">
      <>
        <Image
          className="h-[48px] w-[255px]"
          source={require("@/assets/Logo.png")}
        />
        <ActivityIndicator className="mt-20 text-white" />
      </>
    </SafeAreaView>
  );
}
