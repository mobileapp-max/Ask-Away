import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserContext } from "../contexts/user-context-provider";
import { Profile } from "../src/screens/profile/profile";
import { SCREENS } from "./screenNames";

const LogInStack = createStackNavigator();

export const LogInStackScreen = (props: any) => {
  const { user } = useContext(UserContext);
  return (
    <LogInStack.Navigator screenOptions={{ headerShown: false }}>
      <LogInStack.Screen name={SCREENS.PROFILE} component={Profile} />
    </LogInStack.Navigator>
  );
};
