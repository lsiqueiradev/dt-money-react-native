
import { NavigationRoutes } from "@/routes";

import { MaterialIcons } from '@expo/vector-icons';

import { cssInterop } from "nativewind";

import { AuthContextProvider } from "./contexts/auth.context";
import { BottomSheetProvider } from "./contexts/bottomsheet.context";
import { SnackbarContextProvider } from "./contexts/snackbar.context";

import { Snackbar } from "./components/Snackbar";

import '@/styles/global.css';
import { GestureHandlerRootView } from "react-native-gesture-handler";

cssInterop(MaterialIcons, {
  className: {
    target: 'style',
  }
});

export function App() {
  return (
    <GestureHandlerRootView className="flex-1">
    <SnackbarContextProvider>
      <AuthContextProvider>
        <BottomSheetProvider>
          <NavigationRoutes />
          <Snackbar />
        </BottomSheetProvider>
      </AuthContextProvider>
    </SnackbarContextProvider>
    </GestureHandlerRootView>
  );
}