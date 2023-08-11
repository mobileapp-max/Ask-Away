import { Screen } from "../../components/screen/screen";
import { AddQuestionProps } from "./add-question-interface";
import React, { memo } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  ScrollView,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../../scripts/constants";
import { CharacterLimit } from "../../../components/character-limit/character-limit";
import { BlurView } from "expo-blur";
import ButtonQApp from "../../../components/buttonQApp";
import fonts from "../../../scripts/fonts";
import { Ionicons } from "@expo/vector-icons";
import ModalToDelete from "../../../components/modalToDelete";

export const AddQuestionPresentation = memo(
  ({
    onPressBack,
    onPressTrashCan,
    disableButton,
    text,
    deleteModalVisible,
    onPessDeleteQuestionYes,
    onPressDeleteQuestionNo,
    modalVisible,
    setModalVisible,
    handleButtonPress,
    handleKeyPress,
    handleOnSubmitEditing,
    inputRef,
    newString,
    fontSize,
    handleChangeText,
    handleClearText,
  }: AddQuestionProps): JSX.Element => {
    return (
      <Screen onPressBack={onPressBack} title={"AddQuestion Screen"}>
        <View style={styles.container}>
          <StatusBar backgroundColor="#e32f45" barStyle="light-content" />
          <View style={styles.header}>
            <Text style={styles.text_header}>{"Ask"}</Text>
            <Text
              style={{
                ...styles.text_header,
                paddingTop: 0,
                fontSize: responsiveFontSize(30),
                top: responsiveHeight(0),
              }}
            >
              {"Yes-No Question"}
            </Text>
          </View>
          <View style={styles.footer}>
            <ModalToDelete
              text={"Add this Question?"}
              text2={text}
              deleteModalVisible={deleteModalVisible}
              onPessDeleteQuestionYes={onPessDeleteQuestionYes}
              onPressDeleteQuestionNo={onPressDeleteQuestionNo}
            />
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <BlurView intensity={70} style={styles.centeredView} tint="light">
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{"Question Added!"}</Text>
                </View>
              </BlurView>
            </Modal>
            <ScrollView
              keyboardDismissMode="on-drag"
              style={styles.scrollView}
              behavior={Platform.OS === "ios" ? "height" : "height"}
              keyboardVerticalOffset={responsiveWidth(400)}
            >
              <Pressable
                onPress={handleButtonPress}
                style={{
                  ...styles.inputTextContainer,
                  height: responsiveHeight(40),
                  width: responsiveWidth(90),
                  marginTop: responsiveHeight(6),
                  justifyContent: "center",
                  alignSelf: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <TextInput
                  textAlign={text ? "center" : "right"}
                  onKeyPress={handleKeyPress}
                  onSubmitEditing={handleOnSubmitEditing}
                  ref={inputRef}
                  value={newString}
                  placeholder={"Add your question..."}
                  multiline={true}
                  maxLength={250}
                  placeholderTextColor="#f5e2c9"
                  secureTextEntry={false}
                  style={{
                    ...fonts.note,
                    color: "white",
                    fontSize: fontSize,
                    fontWeight: "bold",
                  }}
                  autoCapitalize="sentences"
                  onChangeText={handleChangeText}
                />
                {text.length > 0 && (
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: responsiveHeight(34),
                      left: responsiveWidth(80),
                    }}
                    onPress={handleClearText}
                  >
                    <Ionicons
                      name={
                        Platform.OS === "ios"
                          ? "ios-close-circle"
                          : "md-close-circle"
                      }
                      size={30}
                      color="#fff"
                    />
                  </TouchableOpacity>
                )}
              </Pressable>
              {text?.length >= 250 && (
                <CharacterLimit errorMessage={"Character limit - 250"} />
              )}
              <View style={styles.button}>
                {disableButton === true ? null : (
                  <ButtonQApp
                    fontSize={responsiveFontSize(35)}
                    disabled={disableButton}
                    title={"Ask Away"}
                    onPress={onPressTrashCan}
                    height={responsiveHeight(8)}
                    color="#52b788"
                    color2="#52b788"
                  />
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Screen>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f25c54",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: responsiveWidth(8),
  },
  footer: {
    flex: 4.5,
    backgroundColor: "#f7b267",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  text_header: {
    ...fonts.note,
    color: "white",
    fontWeight: "bold",
    fontSize: responsiveFontSize(50),
    paddingTop: responsiveHeight(6),
    top: responsiveHeight(1.5),
  },
  button: {
    alignItems: "center",
    marginTop: responsiveHeight(3),
    shadowColor: "#e32f45",
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  modalView: {
    width: responsiveWidth(90),
    alignSelf: "center",
    alignItems: "center",
    padding: 8,
    margin: 10,
    color: "#e32f45",
    borderColor: "#FA7465",
    backgroundColor: "#52b788",
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
    // paddingVertical: responsiveHeight(1),
  },
  modalText: {
    ...fonts.note,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: responsiveFontSize(30),
    color: "white",
  },
  inputTextContainer: {
    height: responsiveHeight(60),
    width: responsiveWidth(70),
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    padding: 8,
    margin: 10,
    color: "#e32f45",
    borderColor: "#FA7465",
    backgroundColor: "#f79d65",
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
});
