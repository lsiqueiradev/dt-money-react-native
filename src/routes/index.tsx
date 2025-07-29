import { useCallback, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { SystemBars } from "react-native-edge-to-edge";

import { useAuthContext } from "@/contexts/auth.context";

import { Loading } from "@/screens/Loading";

import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export function NavigationRoutes() {
  const [isLoading, setLoading] = useState(true);
  const { user, token } = useAuthContext();

  const Routes = useCallback(() => {
    if (isLoading) {
      return <Loading setLoading={setLoading} />;
    }
    if (!user || !token) {
      return <PublicRoutes />;
    } else {
      return <PrivateRoutes />;
    }
  }, [user, token, isLoading]);

  return (
    <NavigationContainer>
      <SystemBars style="light" />
      <Routes />
    </NavigationContainer>
  );
}
