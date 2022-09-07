/*
* Use this file to create your component! 
* Components should not contain internal state or logic! Leave that to containers or screens!
* Use the presets file to create new variations of your component 
* Each preset can have it's own variables that are used to render it, like styles or boolean flags
*/

import * as React from "react"
import { Image, Text, View, TouchableOpacity, TextInput, StyleSheet, TextInputComponent, TouchableWithoutFeedback } from "react-native"
import { COLORS } from "../assets/colors"


/**
 * Describe your new component here...
 */
export const Card = (props) => {


    const {
        card,
        isSelected,
        onPressUpperAreaCard,
        onPressQuestionNavigate
    } = props

    return (
        <TouchableWithoutFeedback onPress={() => onPressUpperAreaCard(card.id)}>
            <View style={[styles.card, { backgroundColor: 'red' }]}>
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
                            <Text >{card.text}</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    card: {
        // height: cardTitle,
        borderRadius: 25,
        // borderTopLeftRadius: 17,
        padding: 10,
        // backgroundColor: "yellow",
        shadowRadius: 3,
        shadowOpacity: 3,
        shadowOffset: { width: 3, height: 3 },
        margin: 6,


    },
    text: {
        fontSize: 17,
        paddingVertical: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    title: {
        flexDirection: "row",
        justifyContent: 'space-between'

    },
    box: {
        paddingVertical: 60,
        backgroundColor: COLORS.white,
        marginHorizontal: -10,
        marginBottom: -10,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
    }
});