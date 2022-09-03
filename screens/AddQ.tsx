import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  SafeAreaView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../assets/colors";
import TextInput from "./TextInput";


const { height, width } = Dimensions.get("window");



export default function AddQ() {

  return (
    <View style={{ ...styles.container, width }}>
      <TextInput
        placeholderTextColor={"black"}
        placeholder={'Title'}
        style={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 3,
    // backgroundColor: COLORS[1]
  },
  container: {
    flex: 1,
    margin: 16,
    // backgroundColor: COLORS[1]
  },
  content: {
    height: height * 2
  },
  card: {
    // height: cardTitle,
    borderRadius: 10,
    padding: 14,

  }
});