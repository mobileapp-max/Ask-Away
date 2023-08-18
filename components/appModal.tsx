import React, { useEffect, useState, useContext, } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    FlatList,
    Text,
    TouchableOpacity,
    TextInput,
    Pressable,
    Modal,
    Alert
} from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "../scripts/constants";
import { colors } from "../scripts/constants";

export default function AppModal(props) {
    const {
        answerVisible,
        answer,
        onPressHideAnswerQuestion,

    } = props

    const { height } = Dimensions.get("window");


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={answerVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        // style={styles.question_style}
                        value={answer}
                        placeholder={"Your sassy reply"}
                        multiline={true}
                        numberOfLines={5}
                        maxLength={500}
                        placeholderTextColor="red"
                        secureTextEntry={false}
                        style={[styles.textInput, {
                            color: colors.text, minHeight: height * 0.15,
                        }]}
                        autoCapitalize="sentences"
                        onChangeText={(newAnswer) => setAnswer(newAnswer)}
                    />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={onPressHideAnswerQuestion}
                    >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e32f45'
    },
    header: {
        flex: 1,
        paddingRight: 10,
        marginTop: 20,
        flexDirection: "row",
        alignItems: 'center'
    },
    footer: {
        flex: 7,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        flexDirection: 'column'
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(25),
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        width: "90%"

    },
    text_footer: {
        color: '#05375a',
        fontSize: 23,
        fontWeight: 'bold',
    },
    question_style: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        alignItems: 'center'
    },
    centeredView: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 200
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },

});