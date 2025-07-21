import { createStackNavigator } from "@react-navigation/stack";

import { Login } from "@/screens/Login";
import { Register } from "@/screens/Register";

export type PublicStackParamList = {
  Login: undefined;
  Register: undefined;
};

export function PublicRoutes() {
  const PublicStack = createStackNavigator<PublicStackParamList>();

  return (
    <PublicStack.Navigator screenOptions={{ headerShown: false }}>
      <PublicStack.Screen name="Login" component={Login} />
      <PublicStack.Screen name="Register" component={Register} />
    </PublicStack.Navigator>
  );
}
