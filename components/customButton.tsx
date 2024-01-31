import React, { useCallback, useState, useMemo } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import fonts from "../scripts/fonts";

const CustomButton = ({
  title,
  onPress,
  height,
  disabled,
  color,
  fontSize,
}: {
  title: string;
  onPress: () => void;
  height: number;
  disabled?: boolean;
  color: string;
  fontSize: number;
}) => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      signIn: {
        backgroundColor: color,
        width: "100%",
        height: height,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 5,
        shadowColor: "#e32f45",
        shadowOffset: {
          width: 0,
          height: 5,
        },
      },
      textSign: {
        ...fonts.note,
        fontSize: fontSize,
        color: "#fff",
      },
    });
  }, [height]);

  return (
    <TouchableOpacity
      style={styles.signIn}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.signIn}>
        <Text style={styles.textSign}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default CustomButton;
