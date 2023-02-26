import React, { useEffect, useState, Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Modal
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from '../scripts/constants';
import { QuestionsContext } from '../contexts/questions-context-provider';
import { useContext } from 'react';
import { BlurView } from 'expo-blur';
import { VictoryPie } from 'victory-native';

const ProfileModal = ({ children, profileVisible, questionVisible, onPressDismissModal }) => {


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
                        <Text>{'Test'}</Text>
                    </View>
                </Pressable>
            </BlurView>
        </Modal>
    )
};

export default ProfileModal;

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