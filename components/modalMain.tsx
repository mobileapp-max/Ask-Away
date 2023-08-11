import React, { useEffect, useState, Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveSize,
} from "../scripts/constants";
import { QuestionsContext } from "../contexts/questions-context-provider";
import { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { QuestionRow } from "../components/question-row/question-row";
import { SwipeListView } from "react-native-swipe-list-view";
import { BlurView } from "expo-blur";
import { ReplyResult } from "../components/replyResult";
import { calculateResults } from "../scripts/calculateResults";
import { AntDesign } from "@expo/vector-icons";
import PieChart from "react-native-expo-pie-chart";
import { VictoryBar, VictoryContainer } from "victory-native";
import { VictoryPie } from "victory-native";
import { Ionicons } from "@expo/vector-icons";
import fonts from "../scripts/fonts";

const ModalMain = ({
  children,
  selectedQuestionModal,
  questionVisible,
  onPressDismissMainModal,
}) => {
  const { question, onPressNextQuestion, onPressAddResponse } =
    useContext(QuestionsContext);
  const [graphicData, setGraphicData] = useState(defaultGraphicData);
  const graphicColor = ["red", "green"]; // Colors
  // const wantedGraphicData = [{ y: 10 }, { y: 50 }, { y: 40 }]; // Data that we want to display
  const wantedGraphicData = [
    {
      x: `${selectedQuestionModal?.answer_1} - No`,
      y: selectedQuestionModal?.answer_2,
    },
    {
      x: `${selectedQuestionModal?.answer_1} - Yes`,
      y: selectedQuestionModal?.answer_1,
    },
  ];
  // const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }];
  const defaultGraphicData = [
    { x: "No", y: 0 },
    { x: "Yes", y: 0 },
  ]; // Data used to make the animate prop work

  useEffect(() => {
    setGraphicData(wantedGraphicData); // Setting the data that we want to display
  }, [selectedQuestionModal]);

  return (
    <Modal animationType="fade" transparent={true} visible={questionVisible}>
      <BlurView intensity={9} style={styles.centeredView}>
        <Pressable
          style={styles.centeredView}
          onPress={() => onPressDismissMainModal()}
        >
          <View style={styles.inputTextContainer}>
            {children}
            <View
              style={{
                backgroundColor: "#ffe6c9",
                borderRadius: 15,
                minWidth: responsiveSize(3),
                minHeight: responsiveSize(5),
                marginBottom: responsiveSize(7),
                borderBottomRightRadius: 20,
                borderTopRightRadius: 8,
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 8,
              }}
            >
              <Text
                style={{
                  ...fonts.note,
                  color: "#f25c54",
                  padding: 10,
                  width: responsiveWidth(75),
                  textAlign: "center",
                  fontSize: responsiveFontSize(20),
                }}
              >
                {selectedQuestionModal?.question}
              </Text>
            </View>
            <View style={styles.answers}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      ...styles.text,
                      padding: 0,
                    }}
                  >
                    {"Yes - "}
                  </Text>
                  <View style={styles.answersColumn}>
                    <Text style={styles.text}>
                      {selectedQuestionModal?.answer_1 || 0}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.answersColumn}>
                    <Text style={styles.text}>
                      {selectedQuestionModal?.answer_2 || 0}
                    </Text>
                  </View>
                  <Text style={{ ...styles.text, padding: 0 }}>{" - No"}</Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </BlurView>
    </Modal>
  );
};

export default ModalMain;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputTextContainer: {
    alignSelf: "center",
    alignItems: "center",
    padding: 8,
    margin: 10,
    color: "#e32f45",
    borderColor: "#FA7465",
    backgroundColor: "#ffcd96",
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
    // paddingVertical: responsiveSize(7),
    // paddingHorizontal: responsiveSize(6)
  },
  answers: {
    flexDirection: "row",
    alignContent: "space-around",
    justifyContent: "space-around",
    // paddingHorizontal: responsiveFontSize(8)
  },
  answersColumn: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ffe6c9",
    borderRadius: 50,
    width: responsiveSize(20),
    height: responsiveSize(20),
    marginHorizontal: responsiveFontSize(10),
  },
  text: {
    ...fonts.note,
    padding: responsiveSize(2),
    color: "#f25c54",
    fontSize: responsiveSize(8),
  },
});
