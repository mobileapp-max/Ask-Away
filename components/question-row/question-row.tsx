import React, { useContext } from "react";
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
} from "../../scripts/constants";
import { calculateResults } from "../../scripts/calculateResults";
import UseOnLayout from "../../scripts/use-on-layout";
import * as Animatable from "react-native-animatable";
import { UserContext } from "../../contexts/user-context-provider";
import fonts from "../../scripts/fonts";

export const QuestionRow = ({
  question: incomingQuestion,
  updateQuestionModal,
  color,
  colorNo,
  colorYes,
}) => {
  const styles = StyleSheet.create({
    inputText: {
      width: responsiveWidth(69),
      padding: 10,
      color: "#e32f45",
      // borderWidth: 0.5,
      borderColor: "#FA7465",
      backgroundColor: color,
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

  const { user } = useContext(UserContext);

  const {
    question,
    // answer_1,
    // answer_2,
    responses_aggregate,
  } = incomingQuestion;

  const answer_1 = responses_aggregate?.aggregate?.sum?.response_1;
  const answer_2 = responses_aggregate?.aggregate?.sum?.response_2;
  // const answer_2 = responses_aggregate?.aggregate?.sum?.response_2
  const { currentHeightOfView, currentWidthOfView, captureView } =
    UseOnLayout();

  return (
    <Pressable
      onPress={() =>
        updateQuestionModal({
          question,
          answer_1,
          answer_2,
        })
      }
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: responsiveWidth(0.8),
        marginHorizontal: responsiveWidth(2),
      }}
    >
      <View onLayout={captureView} style={styles.inputText}>
        <Text
          numberOfLines={2}
          style={{
            ...fonts.note,
            fontSize: responsiveFontSize(16),
            color: "#eb5252",
          }}
        >
          {question}
        </Text>
      </View>

      {
        // (answer_1 && answer_2) ?
        calculateResults({ answer_1, answer_2 }).bothZeros ? (
          <View
            style={{
              // alignSelf: 'center',
              flexDirection: "row",
              borderRadius: 10,
              overflow: "hidden",
              height: currentHeightOfView,
              width: responsiveWidth(26),
              justifyContent: "center",
              backgroundColor: "#ffe6c9",
            }}
          >
            <Text
              style={{
                ...fonts.note,
                alignSelf: "center",
                color: "#eb5252",
              }}
            >
              {"No Answers"}
            </Text>
          </View>
        ) : (
          <View
            style={{
              // alignSelf: 'center',
              flexDirection: "row",
              borderRadius: 10,
              overflow: "hidden",
              // backgroundColor: 'white',
              height: currentHeightOfView,
              width: responsiveWidth(26),
              // borderColor: 'red',
              // justifyContent: 'center'
            }}
          >
            <View
              style={{
                // backgroundColor: "#52b788",
                backgroundColor: colorYes,
                height: currentHeightOfView,
                width:
                  responsiveWidth(
                    (26.5 / 100) *
                      calculateResults({ answer_1, answer_2 }).answer_1_result
                  ) || 0,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Text style={{ color: "white" }}>
                {Math.round(
                  calculateResults({ answer_1, answer_2 }).answer_1_result
                ) > 40 && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        ...fonts.note,
                        color: "white",
                      }}
                    >
                      {`Yes`}
                    </Text>
                    <Text style={{ color: "white" }}>
                      {`${Math.round(
                        calculateResults({ answer_1, answer_2 }).answer_1_result
                      )}%`}
                    </Text>
                  </View>
                )}
              </Text>
            </View>
            <View
              style={{
                // backgroundColor: "#f25c54",
                backgroundColor: colorNo,
                height: currentHeightOfView,
                width:
                  responsiveWidth(
                    (26.5 / 100) *
                      calculateResults({ answer_1, answer_2 }).answer_2_result
                  ) || 0,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              {Math.round(
                calculateResults({ answer_1, answer_2 }).answer_2_result
              ) > 40 && (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <Text
                    style={{
                      ...fonts.note,
                      color: "white",
                    }}
                  >
                    {`No`}
                  </Text>
                  <Text style={{ color: "white" }}>
                    {`${Math.round(
                      calculateResults({ answer_1, answer_2 }).answer_2_result
                    )}%`}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )
      }
    </Pressable>
  );
};
