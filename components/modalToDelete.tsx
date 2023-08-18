import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveSize,
} from "../scripts/constants";
import { BlurView } from "expo-blur";
import fonts from "../scripts/fonts";

const ModalToDelete = ({
  children,
  titleText,
  deleteModalVisible,
  onPessDeleteQuestionYes,
  onPressDeleteQuestionNo,
  questionText,
}) => {
  const [fontSize, setFontSize] = useState(responsiveFontSize(26));
  const handleTextLayout = (event) => {
    const decreaseFactor = Math.floor(questionText.length / 50);
    const newFontSize = Math.max(responsiveFontSize(26) - decreaseFactor, 10);
    setFontSize(newFontSize);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={deleteModalVisible}
      onRequestClose={onPressDeleteQuestionNo}
    >
      {children}
      <BlurView intensity={70} tint={"dark"} style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              ...styles.modalText,
              fontSize: responsiveFontSize(35),
              marginTop: responsiveHeight(0),
              marginBottom: responsiveHeight(2),
            }}
          >
            {titleText}
          </Text>
          {questionText && (
            <View
              style={{
                borderRadius: 15,
                backgroundColor: "#f79d65",
                marginBottom: responsiveSize(3),
                width: responsiveWidth(80),
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
                }}
              >
                {questionText}
              </Text>
            </View>
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
              onPress={onPessDeleteQuestionYes}
              style={styles.modalQuestion}
            >
              <Text style={styles.buttonTitle}>{"Yes"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressDeleteQuestionNo}
              style={{ ...styles.modalQuestion, backgroundColor: "#f38375" }}
            >
              <Text style={styles.buttonTitle}>{"No"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default ModalToDelete;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: responsiveWidth(90),
    alignSelf: "center",
    alignItems: "center",
    padding: 8,
    margin: 10,
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
    fontWeight: "bold",
    color: "white",
    marginVertical: responsiveHeight(1),
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
    fontWeight: "bold",
    fontSize: responsiveFontSize(20),
  },
});
