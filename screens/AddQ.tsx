import React from "react";
import { StyleSheet, View, Dimensions, } from "react-native";
import TextInput from "./TextInput";


const { height, width } = Dimensions.get("window");



export default function AddQ() {

  return (
    <View style={{ ...styles.container, width }}>
      <TextInput
        placeholderTextColor={"black"}
        placeholder={'Title'}
        style={styles.input}
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

  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: width * 0.8,
  },
});