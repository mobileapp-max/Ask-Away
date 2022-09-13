import React, { useEffect, useState, useContext } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    FlatList,

} from "react-native";
import { COLORS } from "../assets/colors";
import { Card } from "../components/card";
import { useLazyQuery, useMutation, gql } from "@apollo/client"
import { LinearGradient } from "expo-linear-gradient";
import { QuestionsContext } from "../contexts/questions-context-provider";

const cardHeight = 60;
const cardTitle = 45;
const cardPadding = 5;

const { height } = Dimensions.get("window");


export default function QScreen({ navigation }) {
    const { questions } = useContext(QuestionsContext)
    const [openQ, setOpenQ] = useState("c82eaca0-f915-4c52-a6c7-010b731f46a2");




    const onPressUpperAreaCard = (cardId) => {
        setOpenQ(cardId)
    }

    const onPressQuestionNavigate = (incomingCard) => {
        navigation.push('QuestionScreen', { card: incomingCard })
    }


    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <View>
                    <FlatList
                        data={questions}
                        renderItem={({ item: card, index: i }) => {
                            return (
                                <Card
                                    style={{ top: 20 }}
                                    card={card}
                                    isSelected={openQ === card.id}
                                    onPressUpperAreaCard={onPressUpperAreaCard}
                                    onPressQuestionNavigate={onPressQuestionNavigate}
                                />
                            )
                        }}
                    />
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