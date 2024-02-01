import React, { memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { MaterialIcons } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveSize,
  responsiveFontSize,
} from "../../../scripts/constants";
import fonts from "../../../scripts/fonts";
import { Screen } from "../../components/screen/screen";
import { SignInProps } from "./sign-in-interface";
import ModalToAddOrDeleteQuestion from "../../components/modalToAddOrDeleteQuestion";
import CustomButton from "../../components/customButton";
import { CharacterLimit } from "../../components/character-limit/character-limit";

export const SignInPresentation = memo(
  ({
    handleEmailChange,
    handlePasswordChange,
    updateSecureTextEntry,
    onPressResetPassword,
    onPressLogIn,
    onPressSignUp,
    data,
    signUpDocsReviewVisible,
    onPressSignUpDocsReview,
  }: SignInProps): JSX.Element => {
    return (
      <Screen>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{"Join In"}</Text>
          </View>
          <ScrollView style={styles.footer}>
            <Text style={styles.text_footer}>{"Email"}</Text>
            <View style={styles.action}>
              <MaterialIcons name="alternate-email" size={30} color="#f25c54" />
              <TextInput
                placeholder="Enter Email"
                style={styles.textInput}
                autoCapitalize="none"
                placeholderTextColor={"#f5e2c9"}
                onChangeText={(val) => handleEmailChange(val)}
              />
            </View>
            <Text style={styles.text_footer}>{"Password"}</Text>
            <View style={styles.action}>
              <Feather name="lock" color="#f25c54" size={28} />
              <TextInput
                placeholder="Enter Password"
                secureTextEntry={data?.secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                placeholderTextColor={"#f5e2c9"}
                onChangeText={(val) => handlePasswordChange(val)}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data?.secureTextEntry ? (
                  <Feather name="eye-off" color="#f25c54" size={20} />
                ) : (
                  <Feather name="eye" color="white" size={20} />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onPressResetPassword}>
              <Text style={styles.resetPassword}>{"Forgot Password"}</Text>
            </TouchableOpacity>
            <View style={styles.button}>
              <CustomButton
                title={"Log In"}
                onPress={onPressLogIn}
                height={responsiveHeight(5.5)}
                color={"#52b788"}
                fontSize={responsiveFontSize(27)}
              />
              <CustomButton
                title={"Sign Up"}
                onPress={onPressSignUpDocsReview}
                height={responsiveHeight(5.5)}
                color={"#f38375"}
                fontSize={responsiveFontSize(27)}
              />
            </View>
            <View style={styles.textPrivate}>
              <Text style={styles.color_textPrivate}>
                {
                  "By signing up you agree to our Terms of Service and Privacy Policy."
                }
              </Text>
            </View>
            <ModalToAddOrDeleteQuestion
              titleText={"Policy Review"}
              modalToAddOrDeleteQuestionVisible={signUpDocsReviewVisible}
              onPressAddOrDeleteQuestionNo={onPressSignUpDocsReview}
              onPressAddOrDeleteQuestionYes={onPressSignUp}
              sendButton={"Accept"}
              cancelButton={"Decline"}
              questionText={"Privacy Policy"}
              link2={"https://padverbny.com/portfolio/ask-away-eula"}
              questionText2={"End-User Agreement"}
              link1={"https://padverbny.com/portfolio/ask-away-privacy-policy"}
            />
          </ScrollView>
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
  header: {
    flex: 0.19,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  headerText: {
    ...fonts.note,
    color: "white",
    fontSize: responsiveFontSize(60),
    marginBottom: 0,
    top: responsiveSize(4),
  },
  footer: {
    flex: 3,
    backgroundColor: "#f7b267",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  text_footer: {
    ...fonts.note,
    color: "white",
    fontSize: 20,
    marginTop: 35,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f79d65",
    paddingBottom: 5,
  },
  textInput: {
    ...fonts.note,
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 5,
    color: "white",
    fontSize: 17,
  },
  button: {
    alignItems: "center",
    marginTop: responsiveHeight(3),
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: responsiveHeight(1),
    alignSelf: "center",
  },
  color_textPrivate: {
    ...fonts.note,
    color: "white",
    textAlign: "center",
  },
  resetPassword: {
    fontWeight: "700",
    fontStyle: "italic",
    textDecorationLine: "underline",
    color: "#ffffff",
    fontSize: 14,
    ...fonts.note,
    marginTop: responsiveHeight(1),
  },
});
