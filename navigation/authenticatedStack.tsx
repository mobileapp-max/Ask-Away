import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Animated, Pressable, Platform } from "react-native";
import { AddQuestion } from "../src/screens/add-question/add-question";
import { AnswerQuestions } from "../src/screens/answer-questions/answer-questions";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons, Entypo } from "@expo/vector-icons";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveSize,
} from "../scripts/constants";
import { Profile } from "../src/screens/profile/profile";
import { useNavigation } from "@react-navigation/native";
import { removeItem } from "../utils/asyncStorage";
import { SCREENS } from "./screenNames";
import { Keyboard } from "react-native";
import { QuestionsContext } from "../contexts/questions-context-provider";

const Tab = createBottomTabNavigator();

const AuthenticatedStack = (props) => {
  const { keyBoardOn } = useContext(QuestionsContext);

  const navigation = useNavigation();
  // const [hidePlusButton, setHidePlusButton] = useState(false);

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     "keyboardDidShow",
  //     () => {
  //       setHidePlusButton(true);
  //     }
  //   );

  //   const keyboardDidHideListener = Keyboard.addListener(
  //     "keyboardDidHide",
  //     () => {
  //       setHidePlusButton(false);
  //     }
  //   );
  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);

  const CustomTabButton = (props) => {
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
      onPress();
      rotatePlusSign();
    };

    return (
      <Pressable
        style={{
          top:
            Platform.OS === "ios"
              ? -responsiveHeight(2)
              : !keyBoardOn
              ? -responsiveHeight(3)
              : responsiveHeight(3),
          justifyContent: "center",
          alignItems: "center",
          ...style.shadow,
          overflow: "visible",
          alignContent: "center",
        }}
        onPress={onPressPlusSign}
      >
        <Animated.View
          style={{
            overflow: "visible",
            width: 80,
            height: 80,
            borderRadius: 50,
            backgroundColor: "#f25c54",
            alignContent: "center",
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

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: Platform.OS === "android" ? true : false,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#f25c54",
          overflow: "visible",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          height: responsiveSize(30),
        },
      }}
    >
      <Tab.Screen
        name={SCREENS.ANSWER_QUESTIONS}
        component={AnswerQuestions}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: responsiveSize(3),
                position: "absolute",
                overflow: "visible",
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
        name={SCREENS.ADD_QUESTIONS}
        component={AddQuestion}
        options={{
          tabBarIcon: ({ focused }) =>
            Platform.OS === "ios" ? (
              <Entypo
                style={{
                  overflow: "visible",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                name="plus"
                size={80}
                color={focused ? "white" : "#f7b267"}
              />
            ) : (
              <Entypo
                style={{
                  overflow: "visible",
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  borderColor: "#f7b267",
                  backgroundColor: "#f25c54",
                  borderWidth: responsiveSize(1),
                  alignItems: "center",
                  justifyContent: "center",
                }}
                name="plus"
                size={80}
                color={focused ? "white" : "#f7b267"}
              />
            ),
          tabBarButton: (props) => {
            return <CustomTabButton {...props} />;
          },
        }}
      />
      <Tab.Screen
        name={SCREENS.PROFILE}
        component={Profile}
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

export default AuthenticatedStack;
const style = StyleSheet.create({
  shadow: {
    // overflow: "visible",
    // zIndex: 100,
    shadowColor: "#f7b267",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 100,
  },
});
