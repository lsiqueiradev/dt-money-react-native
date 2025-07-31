import { NavigationRoutes } from "@/routes";

import { MaterialIcons } from "@expo/vector-icons";

import { cssInterop } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthContextProvider } from "./contexts/auth.context";
import { BottomSheetContextProvider } from "./contexts/bottomsheet.context";
import { SnackbarContextProvider } from "./contexts/snackbar.context";
import { TransactionContextProvider } from "./contexts/transaction.context";

import { Snackbar } from "./components/Snackbar";

import "@/styles/global.css";

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
              <BottomSheetContextProvider>
                <NavigationRoutes />
                <Snackbar />
              </BottomSheetContextProvider>
            </TransactionContextProvider>
          </AuthContextProvider>
        </SnackbarContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
