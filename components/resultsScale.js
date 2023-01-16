import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    Dimensions,
    StatusBar,
    ScrollView,
    Switch,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    FlatList

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'react-native-paper';
import { useContext } from 'react';
import { QuestionsContext } from '../contexts/questions-context-provider';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../scripts/constants';
import { CharacterLimit } from '../components/character-limit/character-limit';
import SwitchSelector from 'react-native-switch-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'



export const ResultsScale = (props) => {

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [isHidden, setIsHidden] = useState(false)
    const { onPressAddQuestion, questions, question, onPressNextQuestion } = useContext(QuestionsContext)
    const { height } = Dimensions.get("window");
    const { colors } = useTheme();
    const [answerWidth, setAnswerWidth] = useState(45)
    const [buttonPressed, setButtonPressed] = useState(false);
    const [questionNumber, setQuestionNumber] = useState(0)

    const questionResult_1 = function () {
        setAnswerWidth((question?.answer_1 + 1) / (question?.answer_1 + 1 + question?.answer_2) * 90)
        setButtonPressed(true)
    }
    const questionResult_2 = function () {
        setAnswerWidth(question?.answer_1 / (question?.answer_1 + question?.answer_2 + 1) * 90)
        setButtonPressed(true)
    }
    const nextQuestion = function () {
        setQuestionNumber(questionNumber + 1)
        setButtonPressed(false)
        setAnswerWidth(45)
        onPressNextQuestion()


        return (
            <View style={{
                alignSelf: 'center',
                flexDirection: "row",
                borderRadius: 10,
                width: responsiveWidth(90),
                overflow: 'hidden',
            }}>
                <TouchableOpacity
                    onPress={() => { if (buttonPressed === false) questionResult_1() }}
                    style={{
                        backgroundColor: "#54a832",
                        height: responsiveHeight(7),
                        width: responsiveWidth(answerWidth),
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                    }}><Text style={{ fontWeight: 'bold', color: "white" }}>{buttonPressed ? `Yes, ${Math.round(answerWidth * 1.11111)}%` : `Yes`}</Text></TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { if (buttonPressed === false) questionResult_2() }}
                    style={{
                        backgroundColor: "#e32f45",
                        height: responsiveHeight(7),
                        width: responsiveWidth(90 - answerWidth),
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center'
                    }}><Text style={{ fontWeight: 'bold', color: "white" }}>{buttonPressed ? `No, ${Math.round(100 - answerWidth * 1.11111)}%` : `No`}</Text></TouchableOpacity>

            </View>

        )
    }

}