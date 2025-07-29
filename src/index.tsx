import { NavigationRoutes } from "@/routes";

import { MaterialIcons } from "@expo/vector-icons";

import { cssInterop } from "nativewind";

import { AuthContextProvider } from "./contexts/auth.context";
import { BottomSheetProvider } from "./contexts/bottomsheet.context";
import { SnackbarContextProvider } from "./contexts/snackbar.context";

import { Snackbar } from "./components/Snackbar";

import "@/styles/global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TransactionContextProvider } from "./contexts/transaction.context";

cssInterop(MaterialIcons, {
  className: {
    target: "style",
  },
});

export function App() {
  return (
    <GestureHandlerRootView className="flex-1 bg-background-primary">
      <SafeAreaProvider className="flex-1 bg-background-primary">
        <SnackbarContextProvider>
          <AuthContextProvider>
            <TransactionContextProvider>
              <BottomSheetProvider>
                <NavigationRoutes />
                <Snackbar />
              </BottomSheetProvider>
            </TransactionContextProvider>
          </AuthContextProvider>
        </SnackbarContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
