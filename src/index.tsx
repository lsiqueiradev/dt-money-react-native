
import { NavigationRoutes } from "@/routes";

import { MaterialIcons } from '@expo/vector-icons';

import { cssInterop } from "nativewind";

import { AuthContextProvider } from "./contexts/auth.context";
import { SnackbarContextProvider } from "./contexts/snackbar.context";

import { Snackbar } from "./components/Snackbar";

import '@/styles/global.css';

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
        <Snackbar />
      </AuthContextProvider>
    </SnackbarContextProvider>
  );
}