import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    FlatList,
} from "react-native";
import { COLORS } from "../assets/colors";
import { Card } from "../components/card";
import { useLazyQuery, useMutation, gql } from "@apollo/client"

const cardHeight = 60;
const cardTitle = 45;
const cardPadding = 5;

const { height } = Dimensions.get("window");

export default function QScreen() {

    const [openQ, setOpenQ] = useState("c82eaca0-f915-4c52-a6c7-010b731f46a2");

    const questions = {
        "data": {
            "question": [
                {
                    "id": "c82eaca0-f915-4c52-a6c7-010b731f46a2",
                    "text": "What's the meaning of life",
                    "title": "Meaning of life",
                    "likes": 0
                },
                {
                    "id": "df7ae06c-13a5-4cf3-a47a-d7c5f744a030",
                    "text": null,
                    "title": "Favorite smell?",
                    "likes": 0
                },
                {
                    "id": "50fa6e15-2b73-40d7-88e0-2b2f60af599d",
                    "text": "How to stop/slow down the climate change? Is it not too late yet?",
                    "title": "Climate Change",
                    "likes": 0
                },
                {
                    "id": "d81f45e1-40bc-4ee0-9b15-de4b9440d83e",
                    "text": null,
                    "title": "Why it hurst to live? ",
                    "likes": 0
                },
                {
                    "id": "2cbfcc86-d6a6-4e17-8911-cffda2dadef2",
                    "text": "Should humans alter nature to improve their quality of living? For example, should we build dums that give clean energy but destroy natural habitats?  ",
                    "title": "Human development vs Nature preservation",
                    "likes": 0
                },
                {
                    "id": "9bc034b5-93ae-41ef-909c-e8d0fa05cfb2",
                    "text": "What's your most guiltiest pleasure? ",
                    "title": "Guilty pleasure?",
                    "likes": 0
                },
                {
                    "id": "7323263c-717e-461c-81e5-756d22f05bde",
                    "text": "What would you choose to fall from the sky instead of raindrops?",
                    "title": "It's raining men... alleluia...?",
                    "likes": 0
                },
                {
                    "id": "a715ff23-f63e-4aa0-8879-997057e81df3",
                    "text": "What’s the silliest way you’ve ever injured yourself?",
                    "title": "Silliest injury? ",
                    "likes": 0
                },
                {
                    "id": "89457d06-339f-4cdc-aacc-8e809c2bc396",
                    "text": "Would you switch your sex for a day (from man to women or vs versa)? What's the first thing you'd do?",
                    "title": "Sex change for a day?",
                    "likes": 0
                },
                {
                    "id": "8489b755-e5d3-4f10-8104-e29c4d86dc1c",
                    "text": "What is a gross food no one enjoys but you? ",
                    "title": "Fav gross food",
                    "likes": 0
                },
                {
                    "id": "ba5b8e7e-811d-44f3-a347-d1a9dcb63b64",
                    "text": "What was the most disgusting way someone has hit on you? The worst you used, or you heard from others?",
                    "title": "Worst pick up line",
                    "likes": 0
                },
                {
                    "id": "11c4c09a-a82d-40ef-904d-0eca5ecb75ae",
                    "text": null,
                    "title": "Cutest animal? ",
                    "likes": 0
                },
                {
                    "id": "dec99e43-fb69-48d4-97ce-c1c247744cb3",
                    "text": "The naughtiest thing you have done, you want to do, or you'll never do?  ",
                    "title": "Kinkiest fantasy ",
                    "likes": 0
                },
                {
                    "id": "dc68a469-c641-4beb-9415-02204e2514bf",
                    "text": null,
                    "title": "Roses are red violets are blue...",
                    "likes": 0
                },
                {
                    "id": "eb4e8840-ff85-4636-9583-c28b5d2b3a8b",
                    "text": "Confess anything you want",
                    "title": "Secret confessions:",
                    "likes": 0
                },
                {
                    "id": "2eb0369f-3eb3-48a8-b7c4-8a7c37de02bb",
                    "text": null,
                    "title": "Use a music lyric to describe your life",
                    "likes": 0
                }
            ]
        }
    }

    // const [fetchQuestions, {
    //     loading: questionsLoading,
    //     error: questionsError,
    //     data: questions,
    //     refetch: refetchQuestions,
    // }] = useLazyQuery(gql`query MyQuery {
    //     question {
    //       id
    //       text
    //       title
    //     }
    //   }`)

    // useEffect(() => {
    //     fetchQuestions()
    // }, [])
    console.log('fucking bitch ass laptop')
    console.log('questions', questions)

    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <View>
                    <FlatList
                        inverted
                        data={questions?.data.question}
                        renderItem={({ item: card, index: i }) => {
                            return (
                                <Card
                                    card={card}
                                    isSelected={openQ === card.id}
                                    onPressCard={() => setOpenQ(card.id)}
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