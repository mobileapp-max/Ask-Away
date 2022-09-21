/*
* Use this file to create your component! 
* Components should not contain internal state or logic! Leave that to containers or screens!
* Use the presets file to create new variations of your component 
* Each preset can have it's own variables that are used to render it, like styles or boolean flags
*/

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

/**
 * Describe your new component here...
 */
export const Card = (props) => {


    const {
        card,
        isSelected,
        onPressUpperAreaCard,
        onPressQuestionNavigate,
        style = {}
    } = props

    return (
        <TouchableWithoutFeedback onPress={() => onPressUpperAreaCard(card.id)}>
            <LinearGradient

                start={[0.5, 0]}
                colors={[ShadeColor('#e32f45', -10), ShadeColor('#e32f45', 10), ShadeColor('#e32f45', -10)]}
                style={{
                    ...styles.card,
                    ...style
                }}>
                <Entypo style={{
                    alignSelf: "flex-end",
                    justifyContent: "space-between",
                    alignContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 0,
                    width: '53%',
                }} name="chevron-down" size={24} color="white" />
                <View style={{ flexDirection: 'row', overflow: 'visible' }}>
                    <View style={styles.title}>
                        <Text style={styles.text}>
                            {` ${card.title}`}
                        </Text>
                        <Text style={styles.text}>
                            {`${card.likes}`}
                        </Text>

                    </View>
                    <TouchableOpacity style={{
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: '#ffc8dd',
                        width: '10%',
                        borderBottomRightRadius: 15,
                        overflow: 'visible',
                        borderBottomLeftRadius: 15,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        top: 2
                    }}>


                        <SimpleLineIcons name="arrow-right" size={19} color="white" />

                    </TouchableOpacity>

                </View>
                {isSelected &&
                    <View style={{ flexDirection: 'row', top: 3 }}>
                        <TouchableOpacity style={styles.box} onPress={() => onPressQuestionNavigate(card)}>
                            <Text style={{ fontSize: 15, width: '90%' }}>
                                {card.text}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", backgroundColor: '#ffc8dd', width: '10%', borderBottomRightRadius: 15, borderTopRightRadius: 15, }}>
                            <AntDesign name="pluscircleo" size={24} color='white' />
                        </TouchableOpacity>
                    </View>

                }
            </LinearGradient>
        </TouchableWithoutFeedback >
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