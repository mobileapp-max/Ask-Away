import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "../scripts/constants";
import { BlurView } from "expo-blur";
import CustomButton from "./customButton";
import {
  deleteAuthUser,
  logoutUser,
  updateUsersPassword,
} from "../api/auth-api";
import { Ionicons } from "@expo/vector-icons";
import fonts from "../scripts/fonts";
import ModalToAddOrDeleteQuestion from "./modalToAddOrDeleteQuestion";
import { removeItem } from "../utils/asyncStorage";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../navigation/screenNames";
import email from "react-native-email";

const ProfileModal = ({
  children,
  profileModalVisible,
  onPressDismissProfileModal,
  setProfileModalVisible,
}) => {
  const navigation = useNavigation();
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    secureTextEntry1: true,
    secureTextEntry2: true,
  });
  const handleCurrentPasswordChange = (val) => {
    setData({
      ...data,
      currentPassword: val,
    });
  };
  const handleNewPasswordChange = (val) => {
    setData({
      ...data,
      newPassword: val,
    });
  };
  const updateSecureTextEntry1 = () => {
    setData({
      ...data,
      secureTextEntry1: !data.secureTextEntry1,
    });
  };
  const updateSecureTextEntry2 = () => {
    setData({
      ...data,
      secureTextEntry2: !data.secureTextEntry2,
    });
  };

  const [logOutModalVisible, setLogOutModalVisible] = useState(false);
  const [
    modalToAddOrDeleteQuestionVisible,
    setModalToAddOrDeleteQuestionVisible,
  ] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);

  const onPressOpenLogOutModal = () => {
    setLogOutModalVisible(!logOutModalVisible);
  };
  const onPressOpenSupportModal = () => {
    setModalToAddOrDeleteQuestionVisible(!modalToAddOrDeleteQuestionVisible);
  };
  const onPressOpenDeleteAccountModal = () => {
    setDeleteAccountModalVisible(!deleteAccountModalVisible);
  };
  const onPressOpenTutorial = async () => {
    onPressDismissProfileModal();
    // await removeItem("onboardedUserIds");
    navigation.push(SCREENS.ONBOARDING);
  };
  const onPressAddOrDeleteQuestionNo = () => {
    setLogOutModalVisible(false);
    setDeleteAccountModalVisible(false);
  };
  const onPressAddOrDeleteQuestionYes = () => {
    if (logOutModalVisible) {
      setLogOutModalVisible(false);
      onPressDismissProfileModal();
      logoutUser();
    }
    if (deleteAccountModalVisible === true) {
      deleteAuthUser().then(logoutUser);
    }
  };

  const sendEmail = () => {
    const to = ["m.padverbny@gmail.com"]; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      cc: ["ma9nez@gmail.com"], // string or array of email addresses
      // bcc: "mee@mee.com", // string or array of email addresses
      subject: `Ask Away - Support Request - ${Platform.OS} ${Platform.Version}`,
      body: "Please describe the request below:",
      // checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
    }).catch(console.error);
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={profileModalVisible}
      >
        <ModalToAddOrDeleteQuestion
          titleText={"Log Out?"}
          modalToAddOrDeleteQuestionVisible={logOutModalVisible}
          onPressAddOrDeleteQuestionNo={onPressAddOrDeleteQuestionNo}
          onPressAddOrDeleteQuestionYes={onPressAddOrDeleteQuestionYes}
        />
        <ModalToAddOrDeleteQuestion
          titleText={"Delete Account?"}
          modalToAddOrDeleteQuestionVisible={deleteAccountModalVisible}
          onPressAddOrDeleteQuestionNo={onPressAddOrDeleteQuestionNo}
          onPressAddOrDeleteQuestionYes={onPressAddOrDeleteQuestionYes}
        />
        <BlurView intensity={8} style={{ flex: 1 }}>
          <Pressable
            onPress={() => onPressDismissProfileModal()}
            style={styles.centeredView}
          >
            <TouchableWithoutFeedback>
              <View style={styles.inputTextContainer}>
                <TouchableOpacity
                  onPress={() => onPressDismissProfileModal()}
                  style={{
                    position: "absolute",
                    left: responsiveWidth(60),
                    top: responsiveWidth(3.5),
                    zIndex: 1,
                  }}
                >
                  <Ionicons name="ios-close-circle" size={40} color="#ffff" />
                </TouchableOpacity>
                {/* {children} */}
                <View
                  style={{
                    marginBottom: responsiveHeight(3),
                    // marginTop: responsiveHeight(3)
                  }}
                >
                  <Text
                    style={[
                      styles.text_footer,
                      {
                        ...fonts.note,
                        alignSelf: "center",
                        fontSize: responsiveFontSize(29),
                      },
                    ]}
                  >
                    {"Settings"}
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#fff",
                      // marginBottom: responsiveHeight(1),
                      paddingBottom: responsiveHeight(0.5),
                    }}
                  />
                  {/* <Text style={[styles.text_footer, {
                                    }]}>
                                        {'Current Password'}
                                    </Text>
                                    <View style={styles.action}>
                                        <Feather
                                            name="lock"
                                            color='#f25c54'
                                            size={20}
                                        />
                                        <TextInput
                                            placeholder="Current Password"
                                            onChangeText={val => handleCurrentPasswordChange(val)}
                                            secureTextEntry={data.secureTextEntry1 ? true : false}
                                            style={styles.textInput}
                                            autoCapitalize="none"
                                            placeholderTextColor={'#f5e2c9'}
                                        />
                                        <TouchableOpacity
                                            onPress={updateSecureTextEntry1}
                                        >
                                            {data.secureTextEntry1 ?
                                                <Feather
                                                    name="eye-off"
                                                    color="#f25c54"
                                                    size={20}
                                                />
                                                :
                                                <Feather
                                                    name="eye"
                                                    color="white"
                                                    size={20}
                                                />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={[styles.text_footer, {
                                    }]}>
                                        {'New Password'}
                                    </Text>
                                    <View style={styles.action}>
                                        <Feather
                                            name="lock"
                                            color="#f25c54"
                                            size={20}
                                        />
                                        <TextInput
                                            placeholder="New Password"
                                            secureTextEntry={data.secureTextEntry2 ? true : false}
                                            style={styles.textInput}
                                            autoCapitalize="none"
                                            placeholderTextColor={'#f5e2c9'}
                                            onChangeText={(val) => handleNewPasswordChange(val)}
                                        />
                                        <TouchableOpacity
                                            onPress={updateSecureTextEntry2}
                                        >
                                            {data.secureTextEntry2 ?
                                                <Feather
                                                    name="eye-off"
                                                    color="#f25c54"
                                                    size={20}
                                                />
                                                :
                                                <Feather
                                                    name="eye"
                                                    color="white"
                                                    size={20}
                                                />
                                            }
                                        </TouchableOpacity>
                                    </View> */}
                </View>
                {/* <CustomButton
                                    title={'Update Password'}
                                    onPress={() => updateUsersPassword({
                                        currentPassword: data?.currentPassword,
                                        newPassword: data?.newPassword
                                    })}
                                    height={responsiveHeight(5)}
                                    color={'#52b788'}
                                    color2={'#52b788'}
                                    fontSize={responsiveFontSize(20)}
                                /> */}
                <CustomButton
                  title={"Tutorial"}
                  onPress={onPressOpenTutorial}
                  height={responsiveHeight(4)}
                  color={"#e6d387"}
                  color2={"#e6d387"}
                  fontSize={responsiveFontSize(20)}
                />
                <CustomButton
                  title={"Contact Support"}
                  onPress={sendEmail}
                  height={responsiveHeight(4)}
                  color={"#f79f65"}
                  color2={"#f79f65"}
                  fontSize={responsiveFontSize(20)}
                />
                <CustomButton
                  title={"Delete Account"}
                  onPress={onPressOpenDeleteAccountModal}
                  // () => deleteAuthUser()}
                  height={responsiveHeight(4)}
                  color={"#f79165"}
                  color2={"#f79165"}
                  fontSize={responsiveFontSize(20)}
                />
                <CustomButton
                  title={"Log Out"}
                  onPress={onPressOpenLogOutModal}
                  height={responsiveHeight(7)}
                  color={"#f77b65"}
                  color2={"#f77b65"}
                  fontSize={responsiveFontSize(20)}
                />
              </View>
            </TouchableWithoutFeedback>
          </Pressable>
        </BlurView>
      </Modal>
    </>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputTextContainer: {
    width: responsiveWidth(75),
    alignSelf: "center",
    alignItems: "center",
    padding: 8,
    margin: 10,
    color: "#e32f45",
    borderWidth: 0.5,
    borderColor: "#FA7465",
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
    backgroundColor: "#f7b267",
  },
  answers: {
    flexDirection: "row",
  },
  answersColumn: {
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  text_header: {
    color: "#fff",
    fontSize: 30,
  },
  text_footer: {
    ...fonts.note,
    color: "white",
    fontSize: 18,
    marginTop: responsiveHeight(2),
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f79d65",
    paddingBottom: 5,
    width: responsiveWidth(60),
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "white",
  },
});
