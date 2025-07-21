
import { NavigationRoutes } from "@/routes";

import { MaterialIcons } from '@expo/vector-icons';

import { cssInterop } from "nativewind";

import '@/styles/global.css';
import { AuthContextProvider } from "./contexts/auth.context";

cssInterop(MaterialIcons, {
  className: {
    target: 'style',
  }
});

export function App() {
  return (
    <AuthContextProvider>
      <NavigationRoutes />
    </AuthContextProvider>
  );
}