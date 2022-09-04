import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    FlatList,
} from "react-native";
import { COLORS } from "../assets/colors";
import { Card } from "../components/card";
import { cards } from "./Cards";
import { useLazyQuery, useMutation, gql } from "@apollo/client"

const cardHeight = 60;
const cardTitle = 45;
const cardPadding = 5;

const { height } = Dimensions.get("window");

export default function QScreen() {

    const [openQ, setOpenQ] = useState(cards[cards.length - 1].id);

    const [fetchQuestions, {
        loading: questionsLoading,
        error: questionsError,
        data: questions,
        refetch: refetchQuestions,
    }] = useLazyQuery(gql`query MyQuery {
        question {
          id
          text
          title
        }
      }`)

    useEffect(() => {
        fetchQuestions()
    }, [])
    console.log('fucking bitch ass laptop')
    console.log('questions', questions)

    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <View>
                    <FlatList
                        inverted
                        data={questions}
                        renderItem={({ item: card, index: i }) => {
                            return (
                                <Card
                                    card={card}
                                    isSelected={openQ === card.id}
                                    onPressCard={() => SetOpenQ(card.id)}
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