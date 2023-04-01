import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    Modal,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { responsiveHeight, responsiveWidth, responsiveFontSize, responsiveSize } from '../scripts/constants';
import { QuestionsContext } from '../contexts/questions-context-provider';
import { useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { QuestionRow } from '../components/question-row/question-row';
import { SwipeListView } from 'react-native-swipe-list-view';
import { BlurView } from 'expo-blur';
import ModalMain from '../components/modalMain';
import { UserContext } from '../contexts/user-context-provider';
import ProfileModal from '../components/profileModal'
import fonts from '../scripts/fonts';



const ModalToDelete = ({ children, text, deleteModalVisible, onPessDeleteQuestionYes, onPressDeleteQuestionNo }) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={deleteModalVisible}
            onRequestClose={onPressDeleteQuestionNo}>
            {children}
            <BlurView
                intensity={5}
                style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{text}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                        <TouchableOpacity
                            onPress={onPessDeleteQuestionYes}
                            style={styles.modalQuestion}>
                            <Text
                                style={{
                                    ...fonts.note,
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                            >
                                {'Yes'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onPressDeleteQuestionNo}
                            style={{ ...styles.modalQuestion, backgroundColor: '#f38375' }}>
                            <Text
                                style={{
                                    ...fonts.note,
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                            >
                                {'No'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BlurView>
        </Modal >
    )
}

export default ModalToDelete;

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        // backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        borderColor: '#f25c54',
        borderWidth: 0.3,
        shadowColor: 'red',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#f7b267'
    },

    modalText: {
        ...fonts.note,
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 18,
        color: 'white',
        marginBottom: responsiveHeight(0.5)
    },
    modalQuestion: {
        margin: 5,
        padding: 5,
        backgroundColor: '#52b788',
        borderRadius: 15,
        height: responsiveHeight(7),
        width: responsiveHeight(7),
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
})