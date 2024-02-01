/*
 * Use this file to create your component!
 * Components should not contain internal state or logic! Leave that to containers or screens!
 * Use the presets file to create new variations of your component
 * Each preset can have it's own variables that are used to render it, like styles or boolean flags
 */

import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { UserStore } from "../../store/userStore";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../theme/constants";
import Button from "../Button";
import { PopupAlertProps } from "./popup-alert-interface";
import { PopupAlertPresets } from "./popup-alert-presets";
import { linearGradientCombos } from "../../theme/colors";
import ShadeColor from "../../utils/shade-color/shade-color";
import { FadeInView } from "../fade-in-view/fade-in-view";

/**
 * Pop-up modal in with dark screen overlay and lower popup window with X-button (or user can click anywhere to dismiss popup)
 */
export const PopupAlert = (props: PopupAlertProps) => {
  // Grab the props here!
  const {
    style,
    preset = "default",
    content,
    visible,
    tintColor,
    modalImage,
    dismissFunction,
    children,
    buttons,
    textStyle,
    isDismissableAnywhere,
  } = props;
  // Grab preset variables here!
  const { textStyles } = PopupAlertPresets[preset];

  return (
    <Modal
      visible={visible}
      transparent
      style={{ alignItems: "center", height: "100%" }}
      animationType={"fade"}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        onResponderGrant={dismissFunction}
        onStartShouldSetResponder={dismissFunction}
      >
        <View style={{ ...popupAlertStyles.backScreenOverlay, ...style }}>
          <View style={{ ...popupAlertStyles.backScreenOverlay, ...style }}>
            <LinearGradient
              colors={linearGradientCombos.darkPopupColors}
              style={popupAlertStyles.lowerPopupWindowContainer}
            >
              <TouchableOpacity
                hitSlop={{ top: 20, bottom: 50, left: 20, right: 20 }}
                style={popupAlertStyles.xButton}
                onPress={dismissFunction}
              >
                <Text style={popupAlertStyles.xTextButton}>{"X"}</Text>
              </TouchableOpacity>
              {modalImage && (
                <Image
                  source={modalImage}
                  style={{
                    tintColor: tintColor,
                    justifyContent: "center",
                    aspectRatio: 2,
                    resizeMode: "contain",
                  }}
                />
              )}
              {content ? (
                <FadeInView duration={350}>
                  <Text
                    style={{
                      ...popupAlertStyles.defaultPopupTextBox,
                      color: "#fff",
                      marginBottom:
                        buttons?.length === 0
                          ? responsiveWidth(15)
                          : responsiveWidth(2),
                      ...textStyle,
                    }}
                  >
                    {buttons?.length > 0 ? `${content}` : `${content}\n`}
                  </Text>
                </FadeInView>
              ) : (
                <View />
              )}
              {buttons?.length > 0 && (
                <FadeInView
                  delay={50}
                  duration={300}
                  style={popupAlertStyles.buttonsContainer}
                >
                  {buttons?.map((popupButton, buttonIndex) => (
                    <View key={`key${buttonIndex}`}>
                      <TouchableOpacity
                        onPress={popupButton.onPressButton}
                        style={{
                          backgroundColor: ShadeColor("#1c1c1c", -40),
                          borderRadius: 300,
                          borderColor:
                            UserStore.currentUser.profile_primary_color,
                          borderWidth: 2,
                          zIndex: 100,
                          paddingVertical: responsiveHeight(1),
                          marginVertical: responsiveHeight(1),
                          marginHorizontal: responsiveWidth(10),
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: UserStore.currentUser.profile_primary_color,
                            fontSize: responsiveFontSize(32),
                            textAlign: "center",
                            fontFamily: "AvenirNext-Bold",
                          }}
                        >
                          {popupButton.text}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    // <Button
                    //   key={`index${buttonIndex}`}
                    //   text={popupButton.text}
                    //   onPress={popupButton.onPressButton}
                    //   style={popupAlertStyles.buttons}
                    //   textStyle={popupAlertStyles.buttonsText}
                    //   colors={[ShadeColor(UserStore.currentUser.profile_primary_color, -10), ShadeColor(UserStore.currentUser.profile_primary_color, -3), UserStore.currentUser.profile_primary_color, ShadeColor(UserStore.currentUser.profile_primary_color, -3), ShadeColor(UserStore.currentUser.profile_primary_color, -10)]}
                    // />
                  ))}
                </FadeInView>
              )}
              {children && children}
            </LinearGradient>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const popupAlertStyles = StyleSheet.create({
  backScreenOverlay: {
    backgroundColor: "#00000099",
    justifyContent: "center",
    alignItems: "center",
    minHeight: responsiveHeight(100),
    width: "100%",
    position: "absolute",
  },
  lowerPopupWindowContainer: {
    width: responsiveWidth(92),
    borderRadius: responsiveWidth(8),
    borderColor: "#C1C1C1",
    borderWidth: 2,
    position: "absolute",
    bottom: responsiveHeight(2),
  },
  defaultPopupTextBox: {
    textAlign: "center",
    fontSize: responsiveFontSize(30),
    marginHorizontal: responsiveWidth(4),
    marginTop: responsiveWidth(15),
    marginBottom: responsiveWidth(2),
    fontFamily: "AvenirNext-DemiBold",
  },
  xButton: {
    backgroundColor: "#ffffff50",
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: responsiveHeight(1),
    right: responsiveHeight(1),
    borderRadius: responsiveWidth(50),
    zIndex: 10000000,
  },
  xTextButton: {
    color: "#1c1c1c",
    position: "absolute",
    textAlign: "center",
    fontWeight: "300",
    fontSize: responsiveFontSize(12),
    transform: [{ scaleX: 2.5 }, { scaleY: 2 }],
  },
  buttons: {
    marginVertical: responsiveHeight(1),
    width: null,
    minWidth: responsiveWidth(54),
  },
  buttonsText: {
    paddingHorizontal: responsiveWidth(7),
  },
  buttonsContainer: {
    marginVertical: responsiveHeight(5),
  },
});
