import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../screens/SignUpScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Profile from "../screens/YourQuestion";

const LogInStack = createStackNavigator();

export const LogInStackScreen = () => (
    <LogInStack.Navigator
        screenOptions={{ headerShown: false }}>
        <LogInStack.Screen name='Profile' component={Profile} />
        <LogInStack.Screen name="Signup" component={SignUpScreen} />
    </LogInStack.Navigator>

)

