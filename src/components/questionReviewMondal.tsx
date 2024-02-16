import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveSize,
} from "../../scripts/constants";
import { BlurView } from "expo-blur";
import fonts from "../../scripts/fonts";

const QuestionReviewModal = ({
  children,
  selectedQuestionForReviewModal,
  QuestionReviewModalVisible,
  onPressDissmissQuestionReviewModal,
}: {
  children?: any;
  selectedQuestionForReviewModal: any;
  QuestionReviewModalVisible: boolean;
  onPressDissmissQuestionReviewModal: () => void;
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={QuestionReviewModalVisible}
    >
      <BlurView intensity={9} style={styles.centeredView}>
        <Pressable
          style={styles.centeredView}
          onPress={() => onPressDissmissQuestionReviewModal()}
        >
          <View style={styles.inputTextContainer}>
            {children}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
                {selectedQuestionForReviewModal?.question}
              </Text>
            </View>
            <View style={styles.answers}>
              <View style={styles.answerSection}>
                <View style={styles.answerRow}>
                  <Text style={[styles.text, styles.textPadding]}>
                    {"Yes - "}
                  </Text>
                  <View style={styles.answersColumn}>
                    <Text style={styles.text}>
                      {selectedQuestionForReviewModal?.answer_1 || 0}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.answerSection}>
                <View style={styles.answerRow}>
                  <View style={styles.answersColumn}>
                    <Text style={styles.text}>
                      {selectedQuestionForReviewModal?.answer_2 || 0}
                    </Text>
                  </View>
                  <Text style={[styles.text, styles.textPadding]}>
                    {" - No"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </BlurView>
    </Modal>
  );
};

export default QuestionReviewModal;

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
  },
  answers: {
    flexDirection: "row",
    alignContent: "space-around",
    justifyContent: "space-around",
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
  questionContainer: {
    backgroundColor: "#ffe6c9",
    borderRadius: 15,
    minWidth: responsiveSize(3),
    minHeight: responsiveSize(5),
    marginBottom: responsiveSize(7),
    borderBottomRightRadius: 20,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 8,
  },
  questionText: {
    ...fonts.note,
    color: "#f25c54",
    padding: 10,
    width: responsiveWidth(75),
    textAlign: "center",
    fontSize: responsiveFontSize(20),
  },
  answerSection: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  answerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textPadding: {
    padding: 0,
  },
});
