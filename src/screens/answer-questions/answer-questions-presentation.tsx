import { Screen } from "../../components/screen/screen";
import { AnswerQuestionsProps } from "./answer-questions-interface";
import React, { useState, memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Modal,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useContext } from "react";
import { QuestionsContext } from "../../../contexts/questions-context-provider";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveSize,
  responsiveWidth,
} from "../../../scripts/constants";
import { AntDesign } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Animatable from "react-native-animatable";
import { UserContext } from "../../../contexts/user-context-provider";
import fonts from "../../../scripts/fonts";

export const AnswerQuestionsPresentation = memo(
  ({
    onPressBack,
    isConditionTrue,
    color1,
    color2,
    handleTextLayout,
    fontSize,
    checkForAnsweredQuestion,
    question,
    onPressReport,
    nextQuestion,
    answerWidth,
    buttonPressed,
    questionResult_1,
    questionResult_2,
    modalVisible,
    nextButton,
    setModalVisible,
  }: AnswerQuestionsProps): JSX.Element => {
    return (
      <Screen onPressBack={onPressBack} title={"AnswerQuestions Screen"}>
        <View style={styles.container}>
          <View style={styles.header}>
            <StatusBar backgroundColor="#e32f45" barStyle="light-content" />
            <View style={{ top: responsiveSize(6) }}>
              <Text style={styles.text_header}>{"Answer"}</Text>
              <Text
                style={{
                  ...styles.text_header,
                  paddingTop: 0,
                  fontSize: responsiveFontSize(50),
                  top: responsiveHeight(-1),
                }}
              >
                {"Questions"}
              </Text>
            </View>
          </View>
          <ScrollView>
            <View
              style={{
                ...styles.inputTextContainer,
                backgroundColor: isConditionTrue ? color1 : color2,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  onLayout={handleTextLayout}
                  adjustsFontSizeToFit={true}
                  style={{
                    ...fonts.note,
                    textAlign: "center",
                    color: "#fff",
                    fontSize: fontSize,
                  }}
                >
                  {question ? (
                    checkForAnsweredQuestion
                  ) : (
                    <ActivityIndicator size="large" color={"#fff"} />
                  )}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "flex-end",
                  flexDirection: "column",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={onPressReport}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <AntDesign
                      name="frown"
                      size={30}
                      color="#fff"
                      style={{ margin: 3 }}
                    />
                    <Text
                      style={{
                        ...fonts.note,
                        fontWeight: "bold",
                        padding: 7,
                        fontSize: responsiveFontSize(20),
                        color: "#fff",
                      }}
                    >
                      {"Report"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => nextQuestion()}>
                    <Animated.View
                      style={{
                        left: nextButton,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {buttonPressed ? (
                        <>
                          <Animatable.View
                            animation="shake"
                            easing="ease"
                            duration={15000}
                            iterationDelay={2000}
                            // delay={2000}
                            iterationCount={"infinite"}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                ...fonts.note,
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: responsiveFontSize(20),
                              }}
                            >
                              {"Next"}
                            </Text>
                            <AntDesign
                              name="caretright"
                              size={38}
                              color="#fff"
                            />
                          </Animatable.View>
                        </>
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              ...fonts.note,
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: responsiveFontSize(20),
                            }}
                          >
                            {"Next"}
                          </Text>
                          <AntDesign name="caretright" size={38} color="#fff" />
                        </View>
                      )}
                    </Animated.View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                alignSelf: "center",
                flexDirection: "row",
                width: responsiveWidth(90),
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.5,
                elevation: 5,
              }}
            >
              <View
                style={{
                  alignSelf: "center",
                  flexDirection: "row",
                  borderRadius: 10,
                  width: responsiveWidth(90),
                  overflow: "allow",
                  marginTop: 30,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (buttonPressed === false) questionResult_1();
                  }}
                  style={{
                    backgroundColor: "#52b788",
                    height: responsiveHeight(10),
                    width: responsiveWidth(answerWidth),
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      ...fonts.note,
                      fontWeight: "bold",
                      color: "white",
                      fontSize: responsiveFontSize(24),
                    }}
                  >
                    {buttonPressed
                      ? `Yes, ${Math.round(answerWidth * 1.11111)}%`
                      : `Yes`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (buttonPressed === false) questionResult_2();
                  }}
                  style={{
                    backgroundColor: "#f38375",
                    height: responsiveHeight(10),
                    width: responsiveWidth(90 - answerWidth),
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      ...fonts.note,
                      fontWeight: "bold",
                      color: "white",
                      fontSize: responsiveFontSize(24),
                    }}
                  >
                    {buttonPressed
                      ? `No, ${Math.round(100 - answerWidth * 1.11111)}%`
                      : `No`}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <BlurView intensity={5} style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Animatable.View animation="tada">
                    <Text style={styles.modalText}>{"Reported"}</Text>
                  </Animatable.View>
                </View>
              </BlurView>
            </Modal>
          </ScrollView>
        </View>
      </Screen>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7b267",
  },
  header: {
    backgroundColor: "#f25c54",
    paddingHorizontal: responsiveWidth(8),
  },
  text_header: {
    ...fonts.note,
    color: "white",
    fontWeight: "bold",
    fontSize: responsiveFontSize(30),
    paddingTop: responsiveHeight(1),
    top: responsiveHeight(2),
  },
  button: {
    alignItems: "center",
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inputTextContainer: {
    height: responsiveHeight(45),
    width: responsiveWidth(90),
    marginTop: responsiveWidth(10),
    alignSelf: "center",
    padding: responsiveWidth(3),
    color: "#e32f45",
    // borderColor: '#FA7465',
    borderRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 8,
    shadowColor: "#e32f45",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    borderRadius: 20,
    top: responsiveHeight(-9),
    padding: 35,
    alignItems: "center",
    shadowColor: "#e32f45",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: responsiveFontSize(70),
    color: "#e32f45",
    transform: [{ rotate: "335deg" }],
  },
});
