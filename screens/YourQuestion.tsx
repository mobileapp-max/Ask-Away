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
import ModalToDelete from '../components/modalToDelete';


const Profile = ({ navigation }) => {

    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [questionVisible, setQuestionVisible] = useState(false);

    const [selectedQuestionModal, setSelectedQuestionModal] = useState({})
    const [modalVisibleId, setModalVisibleId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    const onPressDismissMainModal = () => {
        setQuestionVisible(!questionVisible)
    }
    const onPressDismissProfileModal = () => {
        setProfileModalVisible(!profileModalVisible)
    }
    const onPressDismissDeleteModal = (item) => {
        setDeleteModalVisible(!deleteModalVisible)
        setModalVisibleId(item?.id)
    }
    const onPressDeleteQuestionModal = () => {
        setQuestionVisible(!modalVisible)
        // setModalVisibleId(item?.id)
    }
    // console.log(item?.id)
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


    const defaultQuestions = [
        {
            "__typename": "question",
            "answer_1": 0,
            "answer_2": 0,
            "created_at": "2023-03-07T22:03:57.695653+00:00",
            "id": "6834fa7a-683b-492c-9297-1c52464a84f2",
            "question": "Sample Question: Do you think aliens exist?",
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
                <ModalToDelete
                    text={'Delete Question?'}
                    deleteModalVisible={deleteModalVisible}
                    onPressDismissDeleteModal={onPressDismissDeleteModal}
                    onPressDeleteQuestionYes={onPressDeleteQuestionYes}
                />
                <ModalMain
                    questionVisible={questionVisible}
                    selectedQuestionModal={selectedQuestionModal}
                    onPressDismissMainModal={onPressDismissMainModal}
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
                            color={'#ffe6c9'}
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
                                    onPress={() => onPressDismissDeleteModal(item)}
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
                    <View
                        style={{
                            width: 30,
                            height: 30,
                            backgroundColor: "#ffe6c9",
                            borderRadius: 25,
                            top: responsiveSize(5),
                            left: responsiveSize(4)
                        }}>
                        <Feather
                            name="edit"
                            color="#f25c54"
                            size={25}
                            style={{
                                top: responsiveSize(1),
                                left: responsiveSize(2)
                            }}
                        />
                    </View>
                </TouchableOpacity >
                <View style={styles.cardValueRow}>
                    <View style={{ flexDirection: 'column', }}>
                        <View style={styles.cardValues}>
                            <Text style={styles.largeNumbers}>{userQuestions?.length}</Text>
                        </View>
                        <Text style={styles.regularText}>{'Your'}</Text><Text style={{ ...styles.regularText, top: responsiveHeight(-5.5) }}>{'\nQuestions'}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', }}>
                        <View style={styles.cardValues}>
                            <Text style={styles.largeNumbers}>{sumReplies}</Text>
                        </View>
                        <Text style={styles.regularText}>{'Your'}</Text><Text style={{ ...styles.regularText, top: responsiveHeight(-5.5) }}>{'\nAnswers'}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', }}>
                        <View style={styles.cardValues}>
                            <Text style={styles.largeNumbers}>{sumAnswers}</Text>
                        </View>
                        <Text style={styles.regularText}>{'Replies'}</Text><Text style={{ ...styles.regularText, top: responsiveHeight(-5.5) }}>{'\nRecieved'}</Text>
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
        // alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(26),
        // paddingRight: responsiveWidth(8)
        color: '#FF6363'
    },
    card: {
        position: 'absolute',
        backgroundColor: '#ffcd96',
        width: responsiveWidth(85),
        height: responsiveHeight(20),
        // borderWidth: responsiveWidth(0.1),
        borderColor: '#FF6363',
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
        // marginHorizontal: responsiveWidth(5),
        backgroundColor: '#ffe6c9',
        borderRadius: 50,
        width: responsiveSize(23),
        height: responsiveSize(23)
    },
    cardValueRow: {
        top: responsiveHeight(1),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    largeNumbers: {
        ...fonts.note,
        fontSize: responsiveFontSize(29),
        fontWeight: 'bold',
        color: '#FF6363'
    },
    regularText: {
        ...fonts.note,
        fontSize: responsiveFontSize(17),
        textAlign: 'center',
        color: '#FF6363',
        top: responsiveSize(-5)
    },
    editButton: {
        flexDirection: "row",
        // right: responsiveHeight(2),
        bottom: responsiveWidth(-3),
        justifyContent: "center",
        paddingHorizontal: responsiveWidth(5)
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