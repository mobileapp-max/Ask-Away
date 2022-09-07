
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    FlatList,
    Text,
} from "react-native";
import { COLORS } from "../assets/colors";
import { Card } from "../components/card";
import { useLazyQuery, useMutation, gql } from "@apollo/client"

const cardHeight = 60;
const cardTitle = 45;
const cardPadding = 5;

const { height } = Dimensions.get("window");


export default function QuestionScreen({ navigation }) {

    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <View>
                    <Text>Privet</Text>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLORS[1]
    },
    container: {
        flex: 1,
        margin: 16,
        backgroundColor: COLORS[1]
    },
    content: {
        height: height * 2
    },
    card: {
        // height: cardTitle,
        borderRadius: 10,
        padding: 14,

    }
});


// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// export const QuestionScreen = ({ navigation }) => {
//     return (
//         <View style={styles.container}>
//             <Text>Queston Screen</Text>
//         </View>
//     )
// }
// // export default ({ route }) => {
// //     const contactInfo = route.params.contact
// //     return <Text>{JSON.stringify(contactInfo, null, 2)}</Text>
// // }
// // ;



// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         // backgroundColor: "blue"
//     }

// })