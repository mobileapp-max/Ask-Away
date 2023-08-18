import React, { useEffect, useState, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Onboarding } from "../src/screens/onboarding/onboarding.tsx";
import AuthenticatedStack from "./aunthenticatedstack.tsx";
import { UserContext } from "../contexts/user-context-provider.tsx";
import { useOnboardingFunctions } from "../src/screens/onboarding/onboarding-functions";
import { SCREENS } from "./screenNames";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { user } = useContext(UserContext);
  const {
    checkIfAlreadyOnboarded,
    showOnboarding,
    onPressBack,
    handleDone,
    setShowOnboarding,
    isLoading,
  } = useOnboardingFunctions();

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  console.log("showOnboarding1: ", showOnboarding);

  if (showOnboarding == null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <Stack.Navigator initialRouteName={SCREENS.ONBOARDING}>
        <Stack.Screen
          name={SCREENS.ONBOARDING}
          options={{ headerShown: false }}
          component={Onboarding}
        />
        <Stack.Screen
          name={SCREENS.AUTHENTICATED_STACK}
          options={{ headerShown: false }}
          component={AuthenticatedStack}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator initialRouteName={SCREENS.AUTHENTICATED_STACK}>
        <Stack.Screen
          name={SCREENS.ONBOARDING}
          options={{ headerShown: false }}
          component={Onboarding}
        />
        <Stack.Screen
          name={SCREENS.AUTHENTICATED_STACK}
          options={{ headerShown: false }}
          component={AuthenticatedStack}
        />
      </Stack.Navigator>
    );
  }
}
