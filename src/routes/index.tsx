import { Login } from "@/screens/Login";
import { Register } from "@/screens/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export type PublicStackParamList = {
  Login: undefined;
  Register: undefined;
};

export function Routes() {
  const PublicStack = createStackNavigator<PublicStackParamList>();

  return (
    <NavigationContainer>
      <PublicStack.Navigator screenOptions={{ headerShown: false }}>
        <PublicStack.Screen name="Login" component={Login} />
        <PublicStack.Screen name="Register" component={Register} />
      </PublicStack.Navigator>
    </NavigationContainer>
  );
}
