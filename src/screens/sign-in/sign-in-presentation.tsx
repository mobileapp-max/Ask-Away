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
import ModalToAddOrDeleteQuestion from "../../../components/modalToAddOrDeleteQuestion";

export const SignInPresentation = memo(
  ({
    onPressBack,
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
      <Screen onPressBack={onPressBack} title={"SignIn Screen"}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text
              style={{
                ...fonts.note,
                color: "white",
                fontSize: responsiveFontSize(60),
                fontWeight: "bold",
                marginBottom: 0,
                top: responsiveSize(4),
              }}
            >
              {"Join In"}
            </Text>
          </View>
          <ScrollView style={styles.footer}>
            <View style={{}}>
              <Text style={styles.text_footer}>{"Email"}</Text>
              <View style={styles.action}>
                <MaterialIcons
                  name="alternate-email"
                  size={30}
                  color="#f25c54"
                />
                <TextInput
                  placeholder="Enter Email"
                  style={styles.textInput}
                  autoCapitalize="none"
                  placeholderTextColor={"#f5e2c9"}
                  onChangeText={(val) => handleEmailChange(val)}
                />
              </View>
              <Text style={[styles.text_footer, { marginTop: 35 }]}>
                {"Password"}
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color="#f25c54" size={28} />
                <TextInput
                  placeholder="Enter Password"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  placeholderTextColor={"#f5e2c9"}
                  onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                  {data.secureTextEntry ? (
                    <Feather name="eye-off" color="#f25c54" size={20} />
                  ) : (
                    <Feather name="eye" color="white" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  marginTop: responsiveHeight(1),
                }}
                onPress={onPressResetPassword}
              >
                <Text style={styles.resetPassword}>{"Forgot Password"}</Text>
              </TouchableOpacity>
              <View style={styles.button}>
                <TouchableOpacity style={styles.signIn} onPress={onPressLogIn}>
                  <View
                    style={[
                      styles.signIn,
                      {
                        backgroundColor:
                          data?.email && data?.password ? "#52b788" : "#52b788",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "#fff",
                        },
                      ]}
                    >
                      {"Log In"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={onPressSignUpDocsReview}
                >
                  <View
                    style={[
                      styles.signIn,
                      {
                        backgroundColor:
                          data?.email && data?.password ? "#f38375" : "#f38375",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "#fff",
                        },
                      ]}
                    >
                      {"Sign Up"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                  {
                    "By signing up you agree to our Terms of Service and Privacy Policy."
                  }
                </Text>
              </View>
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
    // paddingBottom: 10
  },
  footer: {
    flex: 3,
    backgroundColor: "#f7b267",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    ...fonts.note,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
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
    fontSize: "17",
  },
  button: {
    alignItems: "center",
    marginTop: responsiveHeight(3),
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
  },
  textSign: {
    ...fonts.note,
    fontSize: responsiveFontSize(27),
    fontWeight: "bold",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    alignContent: "center",
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
    color: "#fff",
    fontSize: "14",
    ...fonts.note,
  },
});
