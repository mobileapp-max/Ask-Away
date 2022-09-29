import * as React from "react"
import { Image, Text, View, TouchableOpacity, TouchableWithoutFeedbackBase, TextInput, StyleSheet, TextInputComponent, TouchableWithoutFeedback } from "react-native"
import { COLORS } from "../assets/colors"
import { LinearGradient } from "expo-linear-gradient"
import ShadeColor from "../scripts/shade-color"
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "../scripts/constants"
import { SimpleLineIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import UseOnLayout from "../scripts/use-on-layout";
import { Card } from "../components/card";



export const Answer = (props) => {


    const {
        answer,
    } = props

    return (
        <View style={{ backgroundColor: 'yellow' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'red', width: 30, height: 30, borderRadius: 20 }}></View>
                <View style={{ borderColor: "red", borderWidth: 2, borderBottomRightRadius: 20, borderTopRightRadius: 8, borderTopLeftRadius: 20, borderBottomLeftRadius: 8, padding: 7, margin: 5 }}>
                    <Text>{answer?.answer}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 35, }}>
                <FontAwesome name="mail-reply" size={24} color="black" />
                <AntDesign name="dislike1" size={24} color="black" />
                <AntDesign name="like1" size={24} color="black" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        borderBottomWidth: 5,
        borderLeftWidth: 1,
        borderRightWidth: 2,

    },
    text: {
        fontSize: 17,
        paddingVertical: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 10,
    },
    title: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '90%'
    },
    box: {
        paddingVertical: responsiveHeight(2),
        // marginHorizontal: 1,
        backgroundColor: 'white',
        // borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        paddingHorizontal: 10,
        // top: responsiveHeight(-0.4),
        // zIndex: -100000000,
        width: '90%',


    }
});