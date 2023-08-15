import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import YourQuestion from "../src/screens/profile/YourQuestion";
import { UserContext } from "../contexts/user-context-provider";
import { SignIn } from "../src/screens/sign-in/sign-in";

const LogInStack = createStackNavigator();

export const YourScreen = (props: any) => {
  const { user } = useContext(UserContext);
  return (
    <LogInStack.Navigator screenOptions={{ headerShown: false }}>
      <LogInStack.Screen name="Profile" component={SignIn} />
    </LogInStack.Navigator>
  );
};
