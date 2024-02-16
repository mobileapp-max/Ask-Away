import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { QuestionsProvider } from "./contexts/questions-context-provider";
import { ApolloProvider } from "@apollo/client";
import makeApolloClient from "./apollo";
import { UserProvider } from "./contexts/user-context-provider";
import { View, Text } from "react-native";
import { UnauthenticatedStack } from "./navigation/unauthenticatedstack";
import AppNavigation from "./navigation/onboardingNavigation";
import { LoadingScreen } from "./src/components/loading-screen/loading-screen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { client } = makeApolloClient();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [fontsLoaded, fontError] = useFonts({
    NotoSansDisplay: require("./assets/fonts/NotoSansDisplay-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  onLayoutRootView();

  return (
    <View style={styles.container}>
      {client ? (
        <ApolloProvider client={client}>
          <UserProvider
            user={user}
            setUser={setUser}
            setIsLoading={setIsLoading}
          >
            <QuestionsProvider>
              <NavigationContainer>
                {isLoading ? (
                  <>
                    <LoadingScreen />
                  </>
                ) : user?.uid ? (
                  <AppNavigation showOnboarding={false} />
                ) : (
                  <UnauthenticatedStack />
                )}
              </NavigationContainer>
            </QuestionsProvider>
          </UserProvider>
        </ApolloProvider>
      ) : (
        <View>
          <LoadingScreen />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
