import { NavigationContainer } from "@react-navigation/native";

import { SystemBars } from "react-native-edge-to-edge";

import { useAuthContext } from "@/contexts/auth.context";
import { useCallback } from "react";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export function NavigationRoutes() {
  const { user, token } = useAuthContext();

  const Routes = useCallback(() => {
    if (!user || !token) {
      return <PublicRoutes />;
    } else {
      return <PrivateRoutes />;
    }
  }, [user]);

  return (
    <NavigationContainer>
      <SystemBars style="light" />
      <Routes />
    </NavigationContainer>
  );
}
