import React, { useState } from 'react';
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
import { MaterialCommunityIcons } from '@expo/vector-icons'; import { QuestionRow } from '../components/question-row/question-row';
import { SwipeListView } from 'react-native-swipe-list-view';
import { BlurView } from 'expo-blur';


const Profile = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleId, setModalVisibleId] = useState('');
    const onPressDeleteQuestionModal = (item) => {
        setModalVisible(!modalVisible)
        setModalVisibleId(item?.id)
    }
    const onPressDeleteQuestionYes = () => {
        onPressDeleteQuestion({ questionId: modalVisibleId })
        setModalVisible(!modalVisible)
    }

    const {
        onPressAddQuestion,
        questions,
        onPressDeleteQuestion
    } = useContext(QuestionsContext)

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#e32f45', flex: 1.6 }} />
            <View style={{ flex: 5, backgroundColor: 'white', overflow: 'visible', }}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <BlurView
                        intensity={5}
                        style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Delete Question?</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                <TouchableOpacity
                                    onPress={onPressDeleteQuestionYes}
                                    style={{ margin: 5, padding: 5, backgroundColor: 'red', borderRadius: 15, height: responsiveHeight(7), width: responsiveHeight(7), justifyContent: 'center', alignItems: 'center', }}>
                                    <Text>
                                        {'Yes'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(!modalVisible)}
                                    style={{ margin: 5, padding: 5, backgroundColor: 'green', borderRadius: 15, height: responsiveHeight(7), width: responsiveHeight(7), justifyContent: 'center', alignItems: 'center', }}>
                                    <Text>
                                        {'No'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </BlurView>
                </Modal>
                <SwipeListView
                    data={questions}
                    // rightActivationValue={-75}
                    // onRightActionStatusChange={() => console.log('worked')}
                    // onRightAction={() => onPressDeleteQuestionModal()}
                    renderItem={({ item }) =>
                        <QuestionRow question={item} />
                    }
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{
                        paddingTop: responsiveHeight(4),
                        paddingBottom: responsiveHeight(20)
                    }}
                    renderHiddenItem={({ item }) => {
                        // console.log(item)
                        return (
                            <View style={{
                                flexDirection: "row",
                                justifyContent: 'flex-end',
                                alignContent: 'center',
                                alignItems: 'center',
                                left: responsiveWidth(-5),
                                flex: 1,
                            }}>
                                <Pressable
                                    onPress={() => onPressDeleteQuestionModal(item)}
                                // () => onPressDeleteQuestion({ questionId: item?.id })}
                                >
                                    <MaterialCommunityIcons
                                        name="delete-forever"
                                        size={30}
                                        color='#e32f45'
                                        style={{ margin: 3 }}
                                    />
                                </Pressable>
                            </View>
                        )
                    }}
                    rightOpenValue={-75}
                    disableRightSwipe={true}
                />
            </View>
            <View style={{
                position: 'absolute',
                backgroundColor: 'white',
                width: responsiveWidth(85),
                height: responsiveHeight(20),
                alignSelf: 'center',
                borderRadius: 25,
                top: responsiveHeight(7),
                shadowColor: "#e32f45",
                shadowOffset: {
                    width: 0,
                    height: 10,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.5,
                elevation: 5,
            }}>
                <TouchableOpacity style={{
                    flexDirection: "row-reverse",
                    right: 17,
                    bottom: -17
                }}>
                    <Feather
                        name="edit"
                        color="#e32f45"
                        size={22}
                    />
                </TouchableOpacity>
                <Text style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(25),
                }}>
                    {'?Profile Name?'}
                </Text>
                <View style={{ backgroundColor: 'red', top: 20, flexDirection: 'row' }}>
                    <Text>{'11'}{'\nYour \nquestions'}</Text>
                    <Text>{'Your \nanswers'}</Text>
                    <Text>{'Your questions'}</Text>
                </View>
            </View>
        </View >
    )
};

export default Profile;

const styles = StyleSheet.create({
    inputText: {
        width: responsiveWidth(70),
        padding: 10,
        color: '#e32f45',
        borderWidth: 0.5,
        borderColor: '#FA7465',
        backgroundColor: 'white',
        borderRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 8,
        shadowColor: "#e32f45",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: 5,
    },
    modalView: {
        // margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        borderColor: '#e32f45',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 18,
        color: '#e32f45'

    }, centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,


    },
});