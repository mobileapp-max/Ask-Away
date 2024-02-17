import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveSize,
} from "../../../scripts/constants";
import { calculateResults } from "../../../scripts/calculateResults";
import UseOnLayout from "../../../scripts/use-on-layout";
import fonts from "../../../scripts/fonts";

export const QuestionRow = ({
  question: incomingQuestion,
  updateQuestionModal,
  color,
  colorNo,
  colorYes,
}: {
  question: any;
  updateQuestionModal: any;
  color: string;
  colorNo: string;
  colorYes: string;
}) => {
  const styles = StyleSheet.create({
    inputText: {
      width: responsiveWidth(69),
      padding: 10,
      color: "#e32f45",
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
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.5,
      elevation: 5,
      marginRight: responsiveSize(1),
    },
    centeredView: {
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
    },
    text: {
      ...fonts.note,
      color: "white",
    },
    resultsView: {
      flexDirection: "row",
      borderRadius: 10,
      overflow: "hidden",
      backgroundColor: "#ffe6c9",
      width: responsiveWidth(26),
      borderWidth: responsiveWidth(0.15),
      borderColor: "#ffe6c9",
      justifyContent: "center",
    },
    pressableView: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: responsiveWidth(0.8),
      marginHorizontal: responsiveWidth(2),
    },
    questionText: {
      ...fonts.note,
      fontSize: responsiveFontSize(16),
      color: "#eb5252",
    },
    noAnswersText: {
      ...fonts.note,
      alignSelf: "center",
      color: "#eb5252",
    },
  });

  const { question, responses_aggregate } = incomingQuestion;
  const answer_1 = responses_aggregate?.aggregate?.sum?.response_1;
  const answer_2 = responses_aggregate?.aggregate?.sum?.response_2;
  const { currentHeightOfView, captureView } = UseOnLayout();

  const calculateResult_1 = responsiveWidth(
    (26 / 100) * calculateResults({ answer_1, answer_2 }).answer_1_result
  );
  const calculateResult_2 = responsiveWidth(
    (26 / 100) * calculateResults({ answer_1, answer_2 }).answer_2_result
  );

  return (
    <Pressable
      onPress={() =>
        updateQuestionModal({
          question,
          answer_1,
          answer_2,
        })
      }
      style={styles.pressableView}
    >
      <View onLayout={captureView} style={styles.inputText}>
        <Text numberOfLines={2} style={styles.questionText}>
          {question}
        </Text>
      </View>
      {calculateResults({ answer_1, answer_2 }).bothZeros ? (
        <View style={[styles.resultsView, { height: currentHeightOfView }]}>
          <Text style={styles.noAnswersText}>{"No Answers"}</Text>
        </View>
      ) : (
        <View style={[styles.resultsView, { height: currentHeightOfView }]}>
          <View
            style={[
              {
                backgroundColor: colorYes,
                height: currentHeightOfView,
                width: calculateResult_1 || 0,
              },
              styles.centeredView,
            ]}
          >
            {calculateResult_1 > 40 && (
              <View style={styles.centeredView}>
                <Text style={styles.text}>{`Yes`}</Text>
                <Text style={styles.text}>
                  {`${Math.round(
                    calculateResults({ answer_1, answer_2 })?.answer_1_result
                  )}%`}
                </Text>
              </View>
            )}
          </View>
          {calculateResult_1 < 98 && calculateResult_1 > 1 && (
            <View style={{ width: responsiveWidth(0.2) }} />
          )}
          <View
            style={[
              {
                backgroundColor: colorNo,
                height: currentHeightOfView,
                width: calculateResult_2 || 0,
              },
              styles.centeredView,
            ]}
          >
            {calculateResult_2 > 40 && (
              <View style={styles.centeredView}>
                <Text style={styles.text}>{`No`}</Text>
                <Text style={styles.text}>
                  {`${Math.round(
                    calculateResults({ answer_1, answer_2 }).answer_2_result
                  )}%`}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </Pressable>
  );
};
