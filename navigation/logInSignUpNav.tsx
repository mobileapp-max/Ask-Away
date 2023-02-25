import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../screens/SignUpScreen";
import YourQuestion from "../screens/YourQuestion";
import Profile from "../screens/YourQuestion";

const LogInStack = createStackNavigator();

export const LogInStackScreen = (props: any) => (
    <LogInStack.Navigator
        screenOptions={{ headerShown: false }}>
        <LogInStack.Screen name='Profile' component={props?.user?.uid ? YourQuestion : SignUpScreen} />
    </LogInStack.Navigator>

)

