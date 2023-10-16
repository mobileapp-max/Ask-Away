import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "../scripts/constants";
import { calculateResults } from "../scripts/calculateResults";
import UseOnLayout from "../scripts/use-on-layout";
import * as Animatable from "react-native-animatable";

export const ReplyResult = ({
  question: incomingQuestion,
  updateQuestionModal,
}) => {
  const { question, answer_1, answer_2 } = incomingQuestion;

  const { currentHeightOfView, currentWidthOfView, captureView } =
    UseOnLayout();

  return (
    <View>
      {calculateResults({ answer_1, answer_2 }).bothZeros ? (
        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            borderRadius: 10,
            overflow: "hidden",
            height: currentHeightOfView,
            width: responsiveWidth(26),
            borderColor: "red",
            borderWidth: responsiveWidth(0.1),
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <Text style={{ alignSelf: "center" }}>{"No Answers"}</Text>
        </View>
      ) : (
        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            borderRadius: 10,
            overflow: "hidden",
            backgroundColor: "white",
            height: currentHeightOfView,
            width: responsiveWidth(26),
            borderColor: "red",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#54a832",
              height: currentHeightOfView,
              width: responsiveWidth(
                (26 / 100) *
                  calculateResults({ answer_1, answer_2 }).answer_1_result
              ),
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Text style={{ color: "white" }}>
              {`Yes\n${Math.round(
                calculateResults({ answer_1, answer_2 }).answer_1_result
              )}%`}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#e32f45",
              height: currentHeightOfView,
              width: responsiveWidth(
                (26 / 100) *
                  calculateResults({ answer_1, answer_2 }).answer_2_result
              ),
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Text style={{ color: "white" }}>
              {`No\n${Math.round(
                calculateResults({ answer_1, answer_2 }).answer_2_result
              )}%`}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    width: responsiveWidth(69),
    padding: 10,
    color: "#e32f45",
    borderWidth: 0.5,
    borderColor: "#FA7465",
    backgroundColor: "white",
    borderRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 8,
    overflow: "visible",
    shadowColor: "#e32f45",
    shadowOffset: {
      width: 0,
      height: 10,
      overflow: "visible",
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
