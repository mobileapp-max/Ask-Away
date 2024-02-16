import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveSize,
} from "../../scripts/constants";
import { BlurView } from "expo-blur";
import fonts from "../../scripts/fonts";

const ModalToAddOrDeleteQuestion = ({
  children,
  titleText,
  modalToAddOrDeleteQuestionVisible,
  onPressAddOrDeleteQuestionYes,
  onPressAddOrDeleteQuestionNo,
  questionText,
  questionTextInput,
  sendButton,
  cancelButton,
  questionText2,
  link1,
  link2,
}: {
  children?: any;
  titleText: string;
  modalToAddOrDeleteQuestionVisible: boolean;
  onPressAddOrDeleteQuestionYes: () => void;
  onPressAddOrDeleteQuestionNo: () => void;
  questionText?: any;
  questionTextInput?: any;
  sendButton?: string;
  cancelButton?: string;
  questionText2?: string;
  link1?: any;
  link2?: any;
}) => {
  const [fontSize, setFontSize] = useState(responsiveFontSize(26));
  const handleTextLayout = () => {
    const decreaseFactor = Math.floor(
      questionText?.length / 50 || questionTextInput?.length / 50
    );
    const newFontSize = Math.max(responsiveFontSize(26) - decreaseFactor, 10);
    setFontSize(newFontSize);
  };

  const handleOpenWebsite1 = () => {
    Linking.openURL(link1).catch((error) => {
      console.error("Error opening website:", error);
    });
  };
  const handleOpenWebsite2 = () => {
    Linking.openURL(link2).catch((error) => {
      console.error("Error opening website:", error);
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalToAddOrDeleteQuestionVisible}
      onRequestClose={onPressAddOrDeleteQuestionNo}
    >
      {children}
      <BlurView intensity={70} tint={"dark"} style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              ...styles.modalText,
              marginVertical: responsiveHeight(1),
              fontSize: responsiveFontSize(38),
            }}
          >
            {titleText}
          </Text>
          {questionText && (
            <TouchableWithoutFeedback onPress={handleOpenWebsite1}>
              <View
                style={{
                  borderRadius: 15,
                  backgroundColor: "#f79d65",
                  marginBottom: responsiveSize(3),
                  width: responsiveWidth(70),
                  justifyContent: "center",
                  borderBottomRightRadius: 20,
                  borderTopRightRadius: 8,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 8,
                }}
              >
                <Text
                  onLayout={handleTextLayout}
                  style={{
                    ...styles.modalText,
                    color: "#fff",
                    fontSize: fontSize,
                    marginVertical: responsiveHeight(0.5),
                  }}
                >
                  {questionText}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          {questionText2 && (
            <TouchableWithoutFeedback onPress={handleOpenWebsite2}>
              <View
                style={{
                  borderRadius: 15,
                  backgroundColor: "#f79d65",
                  marginBottom: responsiveSize(3),
                  width: responsiveWidth(70),
                  justifyContent: "center",
                  borderBottomRightRadius: 20,
                  borderTopRightRadius: 8,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 8,
                  marginTop: responsiveSize(5),
                }}
              >
                <Text
                  onLayout={handleTextLayout}
                  style={{
                    ...styles.modalText,
                    color: "#fff",
                    fontSize: fontSize,
                    marginVertical: responsiveHeight(0.5),
                  }}
                >
                  {questionText2}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              alignContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={onPressAddOrDeleteQuestionYes}
              style={styles.modalQuestion}
            >
              <Text style={styles.buttonTitle}>{sendButton || "Yes"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressAddOrDeleteQuestionNo}
              style={{ ...styles.modalQuestion, backgroundColor: "#f38375" }}
            >
              <Text style={styles.buttonTitle}>{cancelButton || "No"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default ModalToAddOrDeleteQuestion;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: responsiveWidth(85),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    padding: responsiveSize(2),
    color: "#e32f45",
    borderColor: "#FA7465",
    backgroundColor: "#f7b267",
    borderRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 8,
    overflow: "visible",
    shadowColor: "#f7b267",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5,
  },

  modalText: {
    ...fonts.note,
    textAlign: "center",
    color: "white",
    paddingHorizontal: responsiveSize(5),
    borderRadius: 20,
  },
  modalQuestion: {
    margin: 5,
    padding: 5,
    backgroundColor: "#52b788",
    borderRadius: 15,
    height: responsiveHeight(7),
    width: responsiveHeight(18),
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  buttonTitle: {
    ...fonts.note,
    color: "white",
    fontSize: responsiveFontSize(20),
  },
});
