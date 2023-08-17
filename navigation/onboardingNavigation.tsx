import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen.js";
import { getItem } from "../utils/asyncStorage.js";
import { Onboarding } from "../src/screens/onboarding/onboarding.tsx";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem("onboarded");
    console.log(onboarded);
    if (onboarded == 1) {
      // hide onboarding
      setShowOnboarding(false);
    } else {
      // show onboarding
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
          component={Onboarding}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
          component={Onboarding}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
      </Stack.Navigator>
    );
  }
}
