import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../screens/SignUpScreen";

const MainStack = createStackNavigator();

export const MainStackScreen = () => (
    <MainStack.Navigator
        screenOptions={{ headerShown: false }}>
        <MainStack.Screen name='SignUpScreen' component={SignUpScreen} />
    </MainStack.Navigator>

)

