import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../screens/SignUpScreen";
import YourQuestion from "../screens/YourQuestion";
import { UserContext } from "../contexts/user-context-provider";

const LogInStack = createStackNavigator();

export const YourScreen = (props: any) => {
    const { user } = useContext(UserContext)
    return <LogInStack.Navigator
        screenOptions={{ headerShown: false }}>
        <LogInStack.Screen name='Profile' component={SignUpScreen} />
    </LogInStack.Navigator>

}

