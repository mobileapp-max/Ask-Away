import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Question from "../screens/Question";
import QScreen from "../screens/ListOfQuestions";

const MainStack = createStackNavigator();

export const MainStackScreen = () => (
    <MainStack.Navigator
        screenOptions={{ headerShown: false }}>
        <MainStack.Screen name='Questions' component={QScreen} />
        <MainStack.Screen name="Question" component={Question} />
    </MainStack.Navigator>

)

