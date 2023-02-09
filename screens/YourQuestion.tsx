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
    const [questionVisible, setQuestionVisible] = useState(false);
    const [selectedQuestionModal, setSelectedQuestionModal] = useState({})
    const [modalVisibleId, setModalVisibleId] = useState('');
    const onPressDeleteQuestionModal = (item) => {
        setModalVisible(!modalVisible)
        setModalVisibleId(item?.id)
    }
    const onPressDeleteQuestionYes = () => {
        onPressDeleteQuestion({ questionId: modalVisibleId })
        setModalVisible(!modalVisible)
    }

    const updateQuestionModal = (incomingModalData) => {
        setSelectedQuestionModal(incomingModalData)
        setQuestionVisible(!modalVisible)
    }

    const {
        questions,
        onPressDeleteQuestion
    } = useContext(QuestionsContext)

    return (
        <View style={styles.container}>
            <View style={styles.header} />
            <View style={styles.footer}>
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
                            <Text style={styles.modalText}>{'Delete Question?'}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                <TouchableOpacity
                                    onPress={onPressDeleteQuestionYes}
                                    style={styles.modalQuestion}>
                                    <Text>
                                        {'Yes'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(!modalVisible)}
                                    style={{ ...styles.modalQuestion, backgroundColor: 'green' }}>
                                    <Text>
                                        {'No'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </BlurView>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={questionVisible}
                    onRequestClose={() => {
                        setQuestionVisible(!questionVisible);
                    }}>
                    <BlurView
                        intensity={5}
                        style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{'Delete Question?'}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                <Text>{selectedQuestionModal?.question}</Text>
                            </View>
                        </View>
                    </BlurView>
                </Modal>


                <SwipeListView
                    data={questions}
                    renderItem={({ item }) => <QuestionRow question={item} updateQuestionModal={updateQuestionModal} />}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{
                        paddingTop: responsiveHeight(4),
                        paddingBottom: responsiveHeight(20)
                    }}
                    renderHiddenItem={({ item }) => {
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
            <View style={styles.card}>
                <TouchableOpacity style={styles.editButton}>
                    <Feather
                        name="edit"
                        color="#e32f45"
                        size={22}
                    />
                </TouchableOpacity>
                <Text style={styles.profileName}>
                    {'?Profile Name?'}
                </Text>
                <View style={styles.cardValueRow}>
                    <View style={styles.cardValues}>
                        <Text style={styles.largeNumbers}>{'15'}</Text>
                        <Text style={styles.regularText}>{'Questions'}</Text>
                    </View>
                    <View style={styles.cardValues}>
                        <Text style={styles.largeNumbers}>{'20'}</Text>
                        <Text style={styles.regularText}>{'Answered'}</Text>
                    </View>
                    <View style={styles.cardValues}>
                        <Text style={styles.largeNumbers}>{'36'}</Text>
                        <Text style={styles.regularText}>{'Replies \nrecieved'}</Text>
                    </View>
                </View>
            </View>
        </View >
    )
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: '#e32f45',
        flex: 1.6
    },
    footer: {
        flex: 5,
        backgroundColor: 'white',
        overflow: 'visible',
    },
    modalView: {
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

    },
    profileName: {

        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(25),


    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
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
    },
    cardValues: {
        flexDirection: 'column',
        alignItems: 'center',
        margin: responsiveWidth(3),
        marginHorizontal: responsiveWidth(5)
    },
    cardValueRow: {
        top: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    largeNumbers: {
        fontSize: responsiveFontSize(29),
        fontWeight: 'bold',
        color: '#e32f45'
    },
    regularText: {
        fontSize: responsiveFontSize(17),
        textAlign: 'center'
    },
    editButton: {
        flexDirection: "row-reverse",
        right: responsiveHeight(2),
        bottom: responsiveWidth(-4)
    },
    modalQuestion: {
        margin: 5,
        padding: 5,
        backgroundColor: 'red',
        borderRadius: 15,
        height: responsiveHeight(7),
        width: responsiveHeight(7),
        justifyContent: 'center',
        alignItems: 'center',
    },
});