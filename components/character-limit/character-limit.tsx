/*
 * Components should not contain internal state or logic! Leave that to containers or screens!
 * You may choose to use the presets file to create new variations of your component.
 * Don't forget to go add all params to your interface file!
 */

import * as React from "react";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { CharacterLimitProps } from "./character-limit-interface";
import { CharacterLimitPresets } from "./character-limit-presets";
import * as Animatable from "react-native-animatable";
import { responsiveFontSize } from "../../scripts/constants";

/**
 * Describe your new component here...
 */
export const CharacterLimit = (props: CharacterLimitProps) => {
  // INCOMING PROPS
  const { preset = "default", style, data, errorMessage } = props;

  // PRESET VARIABLES
  const { textColor } = CharacterLimitPresets[preset];

  return (
    <>
      <Animatable.View
        animation="bounceIn"
        style={{
          paddingTop: 5,
          ...style,
        }}
      >
        <Text
          style={{
            // left: responsiveWidth(10),
            color: "white",
            fontSize: responsiveFontSize(18),
          }}
        >
          {errorMessage}
        </Text>
      </Animatable.View>
    </>
  );
};

export const CharacterLimitStyles = StyleSheet.create({});
