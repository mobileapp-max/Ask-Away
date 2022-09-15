/*
* Use this file to create your component! 
* Components should not contain internal state or logic! Leave that to containers or screens!
* Use the presets file to create new variations of your component 
* Each preset can have it's own variables that are used to render it, like styles or boolean flags
*/

import * as React from "react"
import { Image, Text, View, TouchableOpacity, TextInput, StyleSheet, TextInputComponent, TouchableWithoutFeedback } from "react-native"
import { COLORS } from "../assets/colors"
import { LinearGradient } from "expo-linear-gradient"
import ShadeColor from "../scripts/shade-color"
import { responsiveFontSize, responsiveHeight } from "../scripts/constants"


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
                style={{ ...styles.card, ...style }}>

                <View style={styles.title}>

                    <Text style={styles.text}>
                        {` ${card.title}`}
                    </Text>
                    <Text style={styles.text}>
                        {`${card.likes}`}
                    </Text>



                </View>



                {isSelected &&
                    <TouchableOpacity onPress={() => onPressQuestionNavigate(card)}>
                        <View style={styles.box}>
                            <Text style={{ fontSize: 15 }}>{card.text}</Text>

                        </View>
                    </TouchableOpacity>
                }

            </LinearGradient>



        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    card: {
        // height: cardTitle,
        borderRadius: 15,
        // borderTopLeftRadius: 17,
        padding: 10,
        // backgroundColor: "yellow",
        // shadowRadius: 3,
        // shadowOpacity: 3,
        // shadowOffset: { width: 6, height: 5 },

        // shadowColor: 'white'


    },
    text: {
        fontSize: 17,
        paddingVertical: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    title: {
        flexDirection: "row",
        justifyContent: 'space-between'

    },
    box: {
        paddingVertical: responsiveHeight(3),
        backgroundColor: 'white',
        marginHorizontal: -9,
        marginBottom: -10,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        paddingHorizontal: 10,
        top: responsiveHeight(-0.4),

    }
});