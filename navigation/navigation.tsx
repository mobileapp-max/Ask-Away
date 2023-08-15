import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../src/screens/sign-in/SignUpScreen";
import { SignIn } from "../src/screens/sign-in/sign-in";

const MainStack = createStackNavigator();

export const MainStackScreen = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    <MainStack.Screen name="SignIn" component={SignIn} />
  </MainStack.Navigator>
);
