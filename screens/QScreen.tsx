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
                        data={cards}
                        renderItem={({ item: card, index: i }) => {
                            return (
                                <TouchableOpacity onPress={() => SetOpenQ(card.id)}>
                                    <View style={[styles.card, { backgroundColor: card.color }]}   >
                                        <Text>
                                            {` ${card.title} ${card.likes}`}
                                        </Text>
                                        {openQ === card.id && <View style={{ paddingVertical: cardHeight, backgroundColor: 'red', overflow: "hidden" }}>

                                            <Text>{card.text}</Text>
                                        </View>}
                                    </View>
                                </TouchableOpacity>
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
        margin: 16
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