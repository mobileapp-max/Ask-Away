import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Modal, Text, Alert, Pressable } from "react-native";
import TextInput from "./TextInput";
import { COLORS } from "../assets/colors";

const { height, width } = Dimensions.get("window");

export default function AddQ() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <TextInput
        maxLength={40}
        multiline={true}
        numberOfLines={2}
        placeholderTextColor={"grey"}
        placeholder={'Title'}
        style={styles.input}
        autoCapitalize={'words'}
        color={'white '}
      />
      <TextInput
        multiline
        numberOfLines={4}
        maxLength={300}
        placeholderTextColor={"grey"}
        placeholder={'Question (Optional)'}
        style={styles.input}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 20,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: "center",
    backgroundColor: COLORS[1]

  },
  input: {
    // height: 40,
    // margin: 12,
    borderWidth: 1,
    // borderColor: "white",
    borderRadius: 25,
    padding: 13,
    width: width * 0.85,
    backgroundColor: "red",
    fontSize: 25,
  },
});