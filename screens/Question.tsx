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
import { COLORS } from "../assets/colors";
import { Card } from "../components/card";
import { useLazyQuery, useMutation, gql } from "@apollo/client"
import { LinearGradient } from "expo-linear-gradient";
import { QuestionsContext } from "../contexts/questions-context-provider";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "../scripts/constants";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../scripts/constants";
import { Entypo } from "@expo/vector-icons";




export default function Question(props) {
    const { height } = Dimensions.get("window");
    const { navigation, route } = props
    const { params } = route
    const { card } = params
    const { questions, setIsTabsVisible } = useContext(QuestionsContext)
    const [answer, setAnswer] = useState('')
    const [answerVisible, setAnswerVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const onPressAnswerQuestion = () => {
        setIsTabsVisible(false)
        setAnswerVisible(!answerVisible)
    }
    const onPressHideAnswerQuestion = () => {
        setIsTabsVisible(true)
        setAnswerVisible(!answerVisible)
    }



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ alignSelf: 'center', left: responsiveWidth(3) }}>
                    <Ionicons
                        name='chevron-back-circle-outline' size={40} color="white" />
                </TouchableOpacity>
                {/* <Text style={{ color: 'red' }}>{JSON.stringify(card)}</Text> */}
                <Text style={styles.text_header}>{card.title}</Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.action} >
                    <Text style={{ color: 'red', fontSize: 25 }}>{card.text}</Text>
                    <Text style={styles.text_header}>{card.likes}</Text>
                </View>
                <TouchableOpacity
                    onPress={onPressAnswerQuestion}
                    style={{ alignSelf: 'center', left: responsiveWidth(3) }}>
                    <Entypo
                        name="plus" size={40} color="red" />
                </TouchableOpacity>
                {answerVisible &&
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={answerVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TextInput
                                    // style={styles.action}
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
                }
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e32f45'
    },
    header: {
        flex: 1,
        // justifyContent: 'space-evenly',
        paddingRight: 10,
        // paddingVertical: 10,
        // paddingBottom: 20,
        flexDirection: "row"

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
        fontSize: responsiveFontSize(30),
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 23
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        fontSize: 20
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    mask: {
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20,
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
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});