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
import { useLazyQuery, useMutation, gql } from "@apollo/client"
import { QuestionsContext } from "../contexts/questions-context-provider";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "../scripts/constants";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../scripts/constants";
import { Answer } from "../components/answer";
import UseOnLayout from "../scripts/use-on-layout";
import { TextInputApp } from "../components/textInputApp";
import AppModal from "../components/appModal";
import { TextInputter } from "../components/text-inputter/text-inputter";

export default function Question(props) {
    const { navigation, route, answer } = props
    const { params } = route
    const { question } = params
    const { questions, setIsTabsVisible } = useContext(QuestionsContext)
    const [answerVisible, setAnswerVisible] = useState(false)
    const [openedAnswerId, setOpenedAnswerId] = useState(null);


    const onPressAnswerQuestion = () => {
        setIsTabsVisible(false)
        setAnswerVisible(!answerVisible)
    }
    const onPressHideAnswerQuestion = () => {
        setIsTabsVisible(true)
        setAnswerVisible(!answerVisible)
    }
    const {
        currentHeightOfView,
        currentWidthOfView,
        captureView
    } = UseOnLayout()


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ alignSelf: 'center', left: responsiveWidth(3) }}>
                    <Ionicons
                        name='chevron-back-circle-outline' size={40} color="white" />
                </TouchableOpacity>
                <Text style={styles.text_header}>{question.title}</Text>
            </View>
            <View style={styles.footer}>
                {question?.text ?
                    <View style={styles.question_style}>
                        <Text style={{
                            color: 'red',
                            fontSize: 18,
                            justifyContent: 'space-between',
                            fontWeight: 'bold'
                        }}>
                            {question.text}
                        </Text>
                        <Text style={styles.text_header}>{question.likes}</Text>
                    </View>
                    :
                    <></>
                }
                <View style={{ height: '100%', paddingTop: 5 }}>

                    {/* <TextInputApp
                    // onPressAnswerQuestion={onPressAnswerQuestion}
                    /> */}
                    <TextInputter data={[{ title: 'hey', text: 'hello' }]} />
                    <FlatList

                        data={question.answers}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item: answer, index: i }) => {
                            return (
                                <>
                                    <Answer
                                        onPressAnswerQuestion={onPressAnswerQuestion}
                                        answer={answer}
                                        isAnswerOpen={openedAnswerId === answer.answer_id}
                                        setOpenedAnswerId={setOpenedAnswerId}
                                    />

                                </>
                            )
                        }}
                    />
                </View>
                {answerVisible &&
                    <AppModal
                        onPressHideAnswerQuestion={onPressHideAnswerQuestion}
                        answerVisible={answerVisible}
                        answer={answer}
                    />
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