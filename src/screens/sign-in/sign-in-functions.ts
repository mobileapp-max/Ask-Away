import React, { useCallback, useState } from "react";
import {
  Alert,
} from "react-native";
import { signUpNewUser } from "../../../api/auth-api";
import { loginUser } from "../../../api/auth-api";
import { sendEmailWithPassword } from "../../../api/auth-api";
import { SCREENS } from "../../../navigation/screenNames";


export const useSignInFunctions = (props: any) => {

  const { navigation } = props

  const [data, setData] = useState({
    email: "",
    password: "",
    secureTextEntry: true,
  });

  const handleEmailChange = (val) => {
    setData({
      ...data,
      email: val,
    });
  };
  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const [signUpDocsReviewVisible, setSignUpDocsReviewVisible] =
    useState(false);

  const onPressSignUpDocsReview = () => {
    if (data?.email && data?.password) {
      setSignUpDocsReviewVisible(!signUpDocsReviewVisible)
    } else {
      Alert.alert("Missing email or password.");
    }
  }

  const onPressSignUp = useCallback(async () => {
    await signUpNewUser({
      email: data?.email,
      password: data?.password,
    }).then((response) => {
      if (response?.error) {
        Alert.alert(response?.error);
        setSignUpDocsReviewVisible(false)
      }
      else {
        navigation.push(SCREENS.ONBOARDING);
      }
    });
  }, [data]);

  const onPressLogIn = useCallback(async () => {
    if (data?.email && data?.password) {
      await loginUser({ email: data?.email, password: data?.password }).then(
        (response) => {
          response?.error && Alert.alert(response?.error);
        }
      );
    } else {
      Alert.alert("Missing email or password.");
    }
  }, [data]);

  const onPressResetPassword = async () => {
    if (data?.email) {
      const response = await sendEmailWithPassword(data?.email);
      if (response?.error) {
        Alert.alert(response.error);
      } else {
        Alert.alert(
          `An email to reset your password has been sent to ${data?.email}`
        );
      }
    } else {
      Alert.alert("Email must be entered.");
    }
  };


  return {
    handleEmailChange,
    handlePasswordChange,
    updateSecureTextEntry,
    onPressResetPassword,
    onPressLogIn,
    onPressSignUp,
    data,
    onPressSignUpDocsReview,
    signUpDocsReviewVisible
  }
}
