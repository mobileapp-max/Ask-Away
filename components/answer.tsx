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

    const {
        currentHeightOfView,
        currentWidthOfView,
        captureView
    } = UseOnLayout()

    return (
        <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: 'red', width: 30, height: 30, borderRadius: 20 }}></TouchableOpacity>
                <TouchableOpacity onLayout={captureView} style={{ borderColor: "red", borderWidth: 2, borderBottomRightRadius: 20, borderTopRightRadius: 8, borderTopLeftRadius: 20, borderBottomLeftRadius: 8, padding: 10, margin: 5 }}>
                    <Text>{answer?.answer}</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity>
                        <AntDesign style={{ marginHorizontal: 4, backgroundColor: 'white', }} name="dislike1" size={20} color="red" />
                    </TouchableOpacity>
                    <Text>5</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity>
                        <AntDesign style={{ marginHorizontal: 4, backgroundColor: 'white' }} name="like1" size={20} color="red" />
                    </TouchableOpacity>
                    <Text>3</Text>
                </View>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', marginLeft: currentWidthOfView, position: 'absolute', top: currentHeightOfView - 8 }}>
                <FontAwesome style={{ marginHorizontal: 9, backgroundColor: 'white' }} name="mail-reply" size={24} color="red" />
            </TouchableOpacity>
        </View >
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