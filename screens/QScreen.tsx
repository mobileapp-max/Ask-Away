import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Animated,
    SafeAreaView,
    Dimensions,
    FlatList,
    TouchableOpacity
} from "react-native";
import { Card } from "../components/card";
import { cards } from "./Cards";


const cardHeight = 60;
const cardTitle = 45;
const cardPadding = 5;

const { height } = Dimensions.get("window");


export default function QScreen() {

    const [openQ, SetOpenQ] = useState(cards[cards.length - 1].id);

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <View style={StyleSheet.absoluteFill}>
                    <FlatList
                        inverted
                        data={cards}
                        renderItem={({ item: card, index: i }) => {
                            return (
                                <Card
                                    card={card}
                                    isSelected={openQ === card.id}
                                    onPressCard={() => SetOpenQ(card.id)}
                                />
                                // <TouchableOpacity onPress={() => SetOpenQ(card.id)}>
                                //     <View style={[styles.card, { backgroundColor: card.color }]}   >
                                //         <Text>
                                //             {` ${card.title} ${card.likes}`}
                                //         </Text>
                                //         {openQ === card.id && <View style={{ paddingVertical: cardHeight, backgroundColor: 'red', overflow: "hidden" }}>

                                //             <Text>{card.text}</Text>
                                //         </View>}
                                //     </View>
                                // </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        margin: 3
    },
    container: {
        flex: 1,
        margin: 16
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