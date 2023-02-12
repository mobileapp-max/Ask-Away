import React, { useEffect, useState } from 'react';
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
import PieChart from 'react-native-pie-chart';
import { Surface, Shape } from '@react-native-community/art';

const ModalMain = ({ children, selectedQuestionModal, questionVisible, onPressDismissModal }) => {

    const widthAndHeight = 250
    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800']

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

                        <Text style={{ padding: 10 }}>{selectedQuestionModal?.question}</Text>
                        <View style={styles.answers}>
                            <View style={styles.answersColumn}>
                                <Text style={{ padding: 10 }}>{selectedQuestionModal?.answer_1}</Text>
                                <Text>{'Yes'}</Text>
                            </View>
                            <View style={styles.answersColumn}>
                                <Text style={{ padding: 10 }}>{selectedQuestionModal?.answer_2}</Text>
                                <Text>{'No'}</Text>
                                {/* <PieChart
                                    widthAndHeight={widthAndHeight}
                                    series={series}
                                    sliceColor={sliceColor}
                                    doughnut={true}
                                    coverRadius={0.45}
                                    coverFill={'#FFF'}
                                /> */}

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