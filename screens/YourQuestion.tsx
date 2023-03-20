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
import { responsiveHeight, responsiveWidth, responsiveFontSize } from '../scripts/constants';
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


const Profile = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const [questionVisible, setQuestionVisible] = useState(false);
    const [selectedQuestionModal, setSelectedQuestionModal] = useState({})
    const [modalVisibleId, setModalVisibleId] = useState('');

    const onPressDismissDeleteModal = () => {
        setQuestionVisible(!questionVisible)
    }
    const onPressDismissProfileModal = () => {
        setProfileModalVisible(!profileModalVisible)
    }
    const onPressDeleteQuestionModal = (item) => {
        setModalVisible(!modalVisible)
        setModalVisibleId(item?.id)
    }
    useEffect(() => {
        const answer_1 = selectedQuestionModal?.answer_1
        const answer_2 = selectedQuestionModal?.answer_2
    }, [selectedQuestionModal])

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
        response,
        onPressDeleteQuestion,
        userQuestions
    } = useContext(QuestionsContext)

    console.log(userQuestions)
    const { user } = useContext(UserContext)

    const sumAnswers = useMemo(() => {
        let sum = 0
        userQuestions?.forEach(question => {
            sum += question?.responses_aggregate?.aggregate?.sum?.response_1 + question?.responses_aggregate?.aggregate?.sum?.response_2
        })
        return sum
    }, [userQuestions])

    const sumReplies = useMemo(() => {
        let sum = 0
        response?.response.forEach(resp => {
            if (resp?.user_id === user?.uid) {
                if (resp?.response_1 !== 0 || resp?.response_2 !== 0) {
                    sum += 1
                }
            }
        })
        return sum
    }, [response])

    const ExampleItem = ({ text }) => {
        return (
            <View style={{ padding: 16 }}>
                <Text>{text}</Text>
            </View>
        );
    };

    const defaultQuestions = [
        {
            "__typename": "question",
            "answer_1": 0,
            "answer_2": 0,
            "created_at": "2023-03-07T22:03:57.695653+00:00",
            "id": "6834fa7a-683b-492c-9297-1c52464a84f2",
            "question": "Sample Question:                            Do you think aliens exist?",
            "responses_aggregate": {
                "__typename": "response_aggregate",
                "aggregate": {
                    "__typename": "response_aggregate_fields",
                    "sum": {
                        "__typename": "response_sum_fields",
                        "response_1": 51,
                        "response_2": 49,
                    },
                },
            },
            "user_id": "HBlSWJoP5dcK1LEJPMqeGio9JXo2",
        },
    ]

    const renderEmptyComponent = () => {
        return (
            <SwipeListView
                data={defaultQuestions}
                ListEmptyComponent={renderEmptyComponent}
                renderItem={({ item }) =>
                    <QuestionRow
                        updateQuestionModal={updateQuestionModal}
                        question={item}
                        color={'#FEFD97'}
                        colorYes={'#65C18C'}
                        colorNo={'#FF6363'}
                    />
                }
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
                                    color='white'
                                    style={{ margin: 3 }}
                                />
                            </Pressable>
                        </View>
                    )
                }}
                rightOpenValue={- 75}
                disableRightSwipe={true}
            />

        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header} />
            <View
                style={styles.footer}>
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
                                    onPress={() => setModalVisible(!modalVisible)}
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
                </Modal>
                <ModalMain
                    questionVisible={questionVisible}
                    selectedQuestionModal={selectedQuestionModal}
                    onPressDismissDeleteModal={onPressDismissDeleteModal}
                >
                </ModalMain>
                <ProfileModal
                    profileModalVisible={profileModalVisible}
                    onPressDismissProfileModal={onPressDismissProfileModal}
                >
                </ProfileModal>
                <SwipeListView
                    data={userQuestions}
                    ListEmptyComponent={renderEmptyComponent}
                    renderItem={({ item }) =>
                        <QuestionRow
                            question={item}
                            updateQuestionModal={updateQuestionModal}
                            color={'white'}
                            colorYes={'#65C18C'}
                            colorNo={'#FF6363'}
                        />}
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
                                        color='white'
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
                <TouchableOpacity
                    onPress={onPressDismissProfileModal}
                    style={styles.editButton}
                >
                    <Text
                        style={styles.profileName}
                    >
                        {user?.email}
                    </Text>
                    <Feather
                        name="edit"
                        color="#f25c54"
                        size={25}
                    />
                </TouchableOpacity >
                <View style={styles.cardValueRow}>
                    <View style={styles.cardValues}>
                        <Text style={styles.largeNumbers}>{userQuestions?.length}</Text>
                        <Text style={styles.regularText}>{'Questions'}</Text>
                    </View>
                    <View style={styles.cardValues}>
                        <Text style={styles.largeNumbers}>{sumReplies}</Text>
                        <Text style={styles.regularText}>{'Answered'}</Text>
                    </View>
                    <View style={styles.cardValues}>
                        <Text style={styles.largeNumbers}>{sumAnswers}</Text>
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
        backgroundColor: '#f25c54',
        flex: 1.6
    },
    footer: {
        flex: 5,
        backgroundColor: '#f7b267',
        overflow: 'visible',

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
    profileName: {
        ...fonts.note,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(26),
        // paddingRight: responsiveWidth(8)
        color: '#f79d65'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        position: 'absolute',
        backgroundColor: '#FFFAD7',
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
        top: responsiveHeight(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    largeNumbers: {
        ...fonts.note,
        fontSize: responsiveFontSize(29),
        fontWeight: 'bold',
        color: '#f25c54'
    },
    regularText: {
        ...fonts.note,
        fontSize: responsiveFontSize(17),
        textAlign: 'center',
        color: '#f25c54'
    },
    editButton: {
        flexDirection: "row",
        // right: responsiveHeight(2),
        bottom: responsiveWidth(-6),
        justifyContent: "space-between",
        paddingHorizontal: responsiveWidth(7)
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
    inputTextContainer: {
        height: responsiveHeight(10),
        // width: responsiveWidth(90),
        // marginTop: responsiveWidth(10),
        alignSelf: 'center',
        padding: 8,
        color: '#f25c54',
        borderWidth: 0.5,
        borderColor: '#FA7465',
        // minHeight: height * 0.15,
        backgroundColor: 'white',
        borderRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 8,
        overflow: 'allow',
        shadowColor: "#e32f45",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: 5,
    },
});