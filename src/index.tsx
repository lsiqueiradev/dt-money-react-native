
import { NavigationRoutes } from "@/routes";

import { MaterialIcons } from '@expo/vector-icons';

import { cssInterop } from "nativewind";

import '@/styles/global.css';
import { AuthContextProvider } from "./contexts/auth.context";
import { SnackbarContextProvider } from "./contexts/snackbar.context";

cssInterop(MaterialIcons, {
  className: {
    target: 'style',
  }
});

export function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <NavigationRoutes />
      </AuthContextProvider>
    </SnackbarContextProvider>
  );
}