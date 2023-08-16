import React, { memo, useContext, useState } from "react";
import { StyleSheet, View, Animated, Pressable, Text } from "react-native";
import { BottomTabsProps } from "./bottom-tabs-interface";
import { responsiveFontSize, responsiveSize } from "../../../scripts/constants";
import { Entypo, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AnswerQuestionScreen from "../../screens/answer-questions/AnswerQuestions";

/**
 * Describe the new component here...
 */
export const BottomTabs = memo(({ children }: BottomTabsProps): JSX.Element => {
  const navigation = useNavigation();

  const [pressedTab, setPressedTab] = useState({
    answerQuestions: true,
    addQuestion: false,
    profile: false,
  });

  const [plusSign, setplusSign] = useState(new Animated.Value(0));
  const rotatePlusSign = () => {
    Animated.timing(plusSign, {
      toValue: 0.25,
      duration: 250,
      // easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setplusSign(new Animated.Value(0));
      setPressedTab({
        answerQuestions: false,
        addQuestion: true,
        profile: false,
      });
    }, 250);
  };

  return (
    <View style={style.container}>
      <Pressable
        onPress={() => {
          navigation.navigate("AnswerQuestions");
          setPressedTab({
            answerQuestions: true,
            addQuestion: false,
            profile: false,
          });
        }}
        style={{
          top: responsiveSize(3),
        }}
      >
        <Octicons
          name="question"
          size={40}
          color={pressedTab?.answerQuestions ? "#ffffff" : "#f7b267"}
        />
      </Pressable>
      <Pressable
        style={{
          top: -responsiveSize(15),
          justifyContent: "center",
          alignItems: "center",
          ...style.shadow,
        }}
        onPress={() => {
          rotatePlusSign;
          navigation.navigate("AddQuestion");
        }}
      >
        <Animated.View
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            borderColor: "#f7b267",
            backgroundColor: pressedTab?.addQuestion ? "#ffffff" : "#f25c54",
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
          <Entypo name="plus" size={80} color={"#f7b267"} />
        </Animated.View>
      </Pressable>
      <Pressable
        onPress={() =>
          setPressedTab({
            answerQuestions: false,
            addQuestion: false,
            profile: true,
          })
        }
        style={{
          top: responsiveSize(3),
        }}
      >
        <Octicons
          name="feed-person"
          size={40}
          color={pressedTab?.profile ? "#ffffff" : "#f7b267"}
        />
      </Pressable>
    </View>
  );
});

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
  container: {
    // flex: 1,
    backgroundColor: "#f25c54",
    justifyContent: "space-around",
    flexDirection: "row",
    height: responsiveSize(30),
    paddingHorizontal: responsiveSize(10),
  },
});
