import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "../src/screens/sign-in/sign-in";
import { SCREENS } from "./screenNames";

const LogInStack = createStackNavigator();

export const UnauthenticatedStack = (props: any) => {
  return (
    <LogInStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LogInStack.Screen name={SCREENS.LOGIN} component={SignIn} />
    </LogInStack.Navigator>
  );
};
