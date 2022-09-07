import { LinearGradient } from "expo-linear-gradient";
import * as React from "react"
import { Image, Text, View, TouchableOpacity, Modal, StyleSheet } from "react-native"
import { PopupAlertProps } from "./popup-alert-interface"
import { PopupAlertPresets } from "./popup-alert-presets"


export const maxModal = (props: PopupAlertProps) => {
    // Grab the props here!
    const {
        style,
        preset = 'default',
        content,
        visible,
        tintColor,
        modalImage,
        dismissFunction,
        children,
        buttons,
        textStyle,
        isDismissableAnywhere
    } = props
    // Grab preset variables here!
    const { textStyles } = PopupAlertPresets[preset]

    return (

        <Modal visible={visible} transparent style={{ alignItems: "center", height: "100%", }} animationType={'fade'}>
            <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end", alignItems: "center" }} />
            </Modal>