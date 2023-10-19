import { Screen } from "../../components/screen/screen";
import { AnswerQuestionsProps } from "./answer-questions-interface";
import React, { memo } from "react";
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
  Platform,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveSize,
  responsiveWidth,
} from "../../../scripts/constants";
import { AntDesign } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Animatable from "react-native-animatable";
import fonts from "../../../scripts/fonts";
import Lottie from "lottie-react-native";

export const AnswerQuestionsPresentation = memo(
  ({
    onPressBack,
    isConditionTrue,
    color1,
    color2,
    handleTextLayout,
    fontSize,
    currentQuestionText,
    question,
    onPressReport,
    onPressNextQuestion,
    answerWidth,
    buttonPressed,
    questionResult_1,
    questionResult_2,
    modalVisible,
    nextButton,
    setModalVisible,
    elephant,
  }: AnswerQuestionsProps): JSX.Element => {
    return (
      <Screen
        style={{ overflow: "visible" }}
        onPressBack={onPressBack}
        title={"AnswerQuestions Screen"}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <StatusBar backgroundColor="#f25c54" barStyle="light-content" />
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
                  {currentQuestionText || (
                    <View style={styles.lottie}>
                      <Lottie source={elephant} autoPlay loop />
                      <Text
                        style={{
                          ...styles.textForButtons,
                          top: responsiveSize(30),
                        }}
                      >
                        {"Loading"}
                      </Text>
                    </View>
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
                    <Text style={styles.textForButtons}>{"Report"}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onPressNextQuestion()}>
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
                            <Text style={styles.textForButtons}>{"Next"}</Text>
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
                marginTop: responsiveSize(8),
                flexDirection: "row",
                overflow: "visible",
                marginBottom: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (buttonPressed === false) questionResult_1();
                }}
                style={{
                  overflow: "visible",
                  backgroundColor: "#52b788",
                  height: responsiveHeight(10),
                  width: responsiveWidth(answerWidth),
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  borderRadius: 10,
                  overflow: "visible",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.5,
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    ...fonts.note,
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
                  overflow: "visible",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.5,
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    ...fonts.note,
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
    overflow: "visible",
  },
  header: {
    backgroundColor: "#f25c54",
    paddingHorizontal: responsiveWidth(8),
  },
  text_header: {
    ...fonts.note,
    color: "white",
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
  },
  inputTextContainer: {
    height: responsiveHeight(45),
    width: responsiveWidth(90),
    marginTop: responsiveWidth(10),
    marginBottom: responsiveWidth(5),
    alignSelf: "center",
    padding: responsiveWidth(3),
    color: "#e32f45",
    // borderColor: '#FA7465',
    borderRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 8,
    // backgroundColor: "#fff",
    overflow: "visible",
    shadowColor: Platform.OS === "ios" ? "#e32f45" : "#780614",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 11,
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
    elevation: Platform.OS === "ios" ? 5 : 0,
  },
  modalText: {
    textAlign: "center",
    fontSize: responsiveFontSize(70),
    color: "#e32f45",
    transform: [{ rotate: "335deg" }],
  },
  lottie: {
    width: responsiveSize(100),
    height: responsiveSize(100),
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  textForButtons: {
    ...fonts.note,
    padding: 7,
    fontSize: responsiveFontSize(20),
    color: "#fff",
  },
});
