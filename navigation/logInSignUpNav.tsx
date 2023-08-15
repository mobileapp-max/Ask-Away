import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserContext } from "../contexts/user-context-provider";
import { Profile } from "../src/screens/profile/profile";

const LogInStack = createStackNavigator();

export const LogInStackScreen = (props: any) => {
  const { user } = useContext(UserContext);
  return (
    <LogInStack.Navigator screenOptions={{ headerShown: false }}>
      <LogInStack.Screen name="Profile" component={Profile} />
    </LogInStack.Navigator>
  );
};
