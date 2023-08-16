import React, { useCallback, useState } from "react";
import {
  Alert,
} from "react-native";
import { signUpNewUser } from "../../../api/auth-api";
import { loginUser } from "../../../api/auth-api";
import { sendEmailWithPassword } from "../../../api/auth-api";


export const useSignInFunctions = (props: any) => {

  const { navigation, route } = props
  const { params } = route


    const onPressBack = (): void => {
      navigation.goBack()
    }

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
  
    const onPressSignUp = useCallback(async () => {
      if (data?.email && data?.password) {
        await signUpNewUser({
          email: data?.email,
          password: data?.password,
        }).then((response) => {
          response?.error && Alert.alert(response?.error);
        });
      } else {
        Alert.alert("Missing email or password.");
      }
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
      onPressBack,
      handleEmailChange,
      handlePasswordChange,
      updateSecureTextEntry,
      onPressResetPassword,
      onPressLogIn,
      onPressSignUp,
      data,
    }
}