import React, { useEffect, useState, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Onboarding } from "../src/screens/onboarding/onboarding.tsx";
import AuthenticatedStack from "./authenticatedStack";
import { UserContext } from "../contexts/user-context-provider.tsx";
import { useOnboardingFunctions } from "../src/screens/onboarding/onboarding-functions";
import { SCREENS } from "./screenNames";
import { LoadingScreen } from "../src/components/loading-screen/loading-screen";

const Stack = createNativeStackNavigator();

export default function AppNavigation({ showOnboarding }) {
  if (showOnboarding == null) {
    return null;
    // return <LoadingScreen />;
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
