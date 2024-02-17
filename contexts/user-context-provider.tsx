import { createContext } from "react";
import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import firebase from "firebase/compat/app";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "../constants/firebaseConfig";

export const UserContext = createContext({
  user: {},
});

export const UserProvider = ({ children, user, setUser, setIsLoading }) => {
  useEffect(() => {
    firebaseConfig;

    const app = firebase.initializeApp(firebaseConfig);
    initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setUser(user);
        setIsLoading(false);
      } else {
        setUser({});
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
