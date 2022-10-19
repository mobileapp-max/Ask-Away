import * as React from "react"
import { Image, Text, View, TouchableOpacity, TouchableWithoutFeedbackBase, TextInput, StyleSheet, TextInputComponent, TouchableWithoutFeedback } from "react-native"
import { COLORS } from "../assets/colors"
import { LinearGradient } from "expo-linear-gradient"
import ShadeColor from "../scripts/shade-color"
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "../scripts/constants"
import { FontAwesome } from "@expo/vector-icons"
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useState } from "react"
import Animated, { color } from "react-native-reanimated"


export const ProfileSetting = (props) => {

    const {
        style = {},
        onPressAnswerQuestion,
        customPlaceholder,
        text,
        iconName,
        component

    } = props

    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            // padding: 10,
            paddingTop: 90,
            paddingLeft: 20,
            alignItems: 'center',
            ...style,
        }}>
            <View style={{
                backgroundColor: "#e32f45",
                width: responsiveWidth(14),
                height: responsiveWidth(14),
                borderRadius: 50,
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <FontAwesome
                    name={iconName}
                    color="white"
                    size={40} />
            </View>
            <Text style={{
                fontSize: responsiveFontSize(25),
            }}>{text}</Text>
        </TouchableOpacity>

    )
}