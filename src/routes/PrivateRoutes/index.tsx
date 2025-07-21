import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "@/screens/Home";

export type PrivateStackParamList = {
  Home: undefined;
  TransactionDetail: undefined;
};

export function PrivateRoutes() {
  const PrivateStack = createStackNavigator<PrivateStackParamList>();

  return (
    <PrivateStack.Navigator screenOptions={{ headerShown: false }}>
      <PrivateStack.Screen name="Home" component={Home} />
    </PrivateStack.Navigator>
  );
}
