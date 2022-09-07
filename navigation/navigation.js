import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import QuestionScreen from "../screens/QuestionScreen";
import QScreen from "../screens/QScreen";

const MainStack = createStackNavigator();

export const MainStackScreen = () => (
    <MainStack.Navigator
        screenOptions={{ headerShown: false }}>
        <MainStack.Screen name='Questions' component={QScreen} />
        <MainStack.Screen name="QuestionScreen" component={QuestionScreen} />
    </MainStack.Navigator>

)

