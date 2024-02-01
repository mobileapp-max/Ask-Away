import { BlurView } from "expo-blur";
import React, { memo } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { responsiveWidth, responsiveFontSize } from "../../scripts/constants";
import fonts from "../../scripts/fonts";

export const ConfirmatioModal = ({
  modalVisible,
  setModalVisible,
  messageToDisplay,
  tintColor,
}: {
  modalVisible: boolean;
  setModalVisible: (isVisible: boolean) => void;
  messageToDisplay: string;
  tintColor: string;
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <BlurView intensity={70} style={styles.centeredView} tint={tintColor}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{messageToDisplay}</Text>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: responsiveWidth(90),
    alignSelf: "center",
    alignItems: "center",
    padding: 8,
    margin: 10,
    color: "#e32f45",
    borderColor: "#FA7465",
    backgroundColor: "#52b788",
    borderRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 8,
    overflow: "visible",
    shadowColor: "#f7b267",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5,
  },
  modalText: {
    ...fonts.note,
    textAlign: "center",
    fontSize: responsiveFontSize(30),
    color: "white",
  },
});
