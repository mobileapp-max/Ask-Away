import React, { useContext, useRef, useState } from "react";
import { StyleSheet, View, Animated, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "react-native-vector-icons/Entypo";
import { LogInStackScreen } from "./logInSignUpNav";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveSize,
  responsiveWidth,
} from "../scripts/constants";
import { Octicons } from "@expo/vector-icons";
import { UserContext } from "../contexts/user-context-provider";
import { AddQuestion } from "../src/screens/add-question/add-question";
import { AnswerQuestions } from "../src/screens/answer-questions/answer-questions";
import { Profile } from "../src/screens/profile/profile";

const Tab = createBottomTabNavigator();

const CustomTabButton = (props) => {
  const { user } = useContext(UserContext);
  const children = props?.children;
  const onPress = props?.onPress;
  const currentScreen = props?.currentScreen;
  const startImageRotation = props?.onPress;
  const [plusSign, setplusSign] = useState(new Animated.Value(0));
  const rotatePlusSign = () => {
    Animated.timing(plusSign, {
      toValue: 0.25,
      duration: 500,
      // easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setplusSign(new Animated.Value(0));
    }, 500);
  };
  const onPressPlusSign = () => {
    rotatePlusSign();
    onPress();
  };

  // console.log(user)

  return (
    <Pressable
      style={{
        top: -responsiveFontSize(17),
        justifyContent: "center",
        alignItems: "center",
        ...style.shadow,
      }}
      onPress={onPressPlusSign}
    >
      <Animated.View
        style={{
          width: 80,
          height: 80,
          borderRadius: 50,
          // borderWidth: responsiveWidth(1),
          borderColor: "#f7b267",
          backgroundColor: currentScreen === "Profile2" ? "#f7b267" : "#f25c54",
          transform: [
            {
              rotate: plusSign.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"],
              }),
            },
          ],
        }}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};

const Tabs = (props) => {
  const ProfileScreen = () => <LogInStackScreen />;

  return (
    // <RootStackScree>

    <Tab.Navigator
      screenOptions={{
        activeTintColor: "#f7b267",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#f25c54",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          height: responsiveSize(30),
          // shadowColor: "#f25c54",
          // shadowOffset: {
          //     width: 0,
          //     height: 5,
          // },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.5,
          // elevation: 5
        },
      }}
    >
      <Tab.Screen
        name="Main"
        component={AnswerQuestions}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: responsiveSize(3),
                position: "absolute",
              }}
            >
              <Octicons
                name="question"
                size={40}
                color={focused ? "white" : "#f7b267"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile2"
        component={AddQuestion}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Entypo
                name="plus"
                size={80}
                color={focused ? "white" : "#f7b267"}
              />
            </View>
          ),
          tabBarButton: (props) => {
            return <CustomTabButton {...props} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile3"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: responsiveSize(3),
                position: "absolute",
              }}
            >
              <Octicons
                name="feed-person"
                size={40}
                color={focused ? "white" : "#f7b267"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  shadow: {
    shadowColor: "#f7b267",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default Tabs;
