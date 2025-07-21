
import { NavigationRoutes } from "@/routes";

import { MaterialIcons } from '@expo/vector-icons';

import { cssInterop } from "nativewind";

import '@/styles/global.css';

cssInterop(MaterialIcons, {
  className: {
    target: 'style',
  }
});

export function App() {
  return (
    <NavigationRoutes />
  );
}