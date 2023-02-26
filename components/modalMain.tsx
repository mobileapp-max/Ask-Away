import React, { useEffect, useState, Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    Modal
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from '../scripts/constants';
import { QuestionsContext } from '../contexts/questions-context-provider';
import { useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { QuestionRow } from '../components/question-row/question-row';
import { SwipeListView } from 'react-native-swipe-list-view';
import { BlurView } from 'expo-blur';
import { ReplyResult } from '../components/replyResult';
import { calculateResults } from '../scripts/calculateResults';
import { AntDesign } from '@expo/vector-icons';
import PieChart from 'react-native-expo-pie-chart';
import { VictoryBar, VictoryContainer } from "victory-native";
import { VictoryPie } from 'victory-native';

const ModalMain = ({ children, selectedQuestionModal, questionVisible, onPressDismissModal }) => {

    const { question, onPressNextQuestion, onPressAddResponse } = useContext(QuestionsContext)
    const [graphicData, setGraphicData] = useState(defaultGraphicData);
    const graphicColor = ['red', 'green',]; // Colors
    // const wantedGraphicData = [{ y: 10 }, { y: 50 }, { y: 40 }]; // Data that we want to display
    const wantedGraphicData = [{ x: `${selectedQuestionModal?.answer_1} - No`, y: selectedQuestionModal?.answer_2 }, { x: `${selectedQuestionModal?.answer_1} - Yes`, y: selectedQuestionModal?.answer_1 }];
    // const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }];
    const defaultGraphicData = [{ x: 'No', y: 0 }, { x: 'Yes', y: 0 }]; // Data used to make the animate prop work

    useEffect(() => {
        setGraphicData(wantedGraphicData); // Setting the data that we want to display
    }, [selectedQuestionModal]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={questionVisible}
        >
            <BlurView
                intensity={5}
                style={styles.centeredView}>
                <Pressable
                    style={styles.centeredView}
                    onPress={() => onPressDismissModal()}>
                    <View style={styles.inputTextContainer}>
                        {children}
                        {/* <Pressable
                            onPress={() => onPressDismissModal()}
                        >
                            <AntDesign name="closecircle" size={24} color="#e32f45" />
                        </Pressable> */}
                        <Text style={{ padding: 10, width: responsiveWidth(60) }}>{selectedQuestionModal?.question}</Text>
                        {
                            (selectedQuestionModal?.answer_1 > 0 || selectedQuestionModal?.answer_2 > 0)
                            &&
                            // <View style={{ position: 'absolute' }}>
                            <VictoryPie
                                // sortKey="x"
                                // sortOrder="ascending"
                                startAngle={selectedQuestionModal?.answer_1 > selectedQuestionModal?.answer_2 ? 0 : 0}
                                endAngle={selectedQuestionModal?.answer_1 > selectedQuestionModal?.answer_2 ? 360 : 360}
                                radius={responsiveWidth(10)}
                                height={responsiveHeight(30)}
                                width={responsiveWidth(30)}
                                // animate={{ easing: 'exp' }}
                                data={graphicData}
                                colorScale={graphicColor}
                                innerRadius={responsiveWidth(2)}
                                style={{
                                    data: {
                                        fillOpacity: 1, stroke: "#fff", strokeWidth: responsiveWidth(0)
                                    },
                                    labels: {
                                        fill: "#212121",
                                    }
                                }}
                            />
                            // </View>
                        }
                        <View style={styles.answers}>
                            <View style={styles.answersColumn}>
                                <Text style={{ padding: 10 }}>{selectedQuestionModal?.responses_aggregate?.aggregate?.sum?.response_1}</Text>
                                {/* {console.log(selectedQuestionModal)} */}
                                <Text>{'Yes'}</Text>
                            </View>
                            <View style={styles.answersColumn}>
                                <Text style={{ padding: 10 }}>{selectedQuestionModal?.answer_2}</Text>
                                <Text>{'No'}</Text>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </BlurView>
        </Modal>

    )
};

export default ModalMain;

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputTextContainer: {
        // height: responsiveHeight(10),
        // width: responsiveWidth(90),
        // marginTop: responsiveWidth(10),
        alignSelf: 'center',
        alignItems: 'center',
        // flexDirection: 'row',
        padding: 8,
        margin: 10,
        // paddingTop: 5,
        color: '#e32f45',
        borderWidth: 0.5,
        borderColor: '#FA7465',
        // minHeight: height * 0.15,
        backgroundColor: 'white',
        borderRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 8,
        overflow: 'visible',
        shadowColor: "#e32f45",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: 5,
    },
    answers: {
        flexDirection: 'row'
    },
    answersColumn: {
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }

});