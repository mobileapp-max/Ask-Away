import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    Modal,
    ImageBackground
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
import ModalMain from '../components/modalMain';
import { logoutUser } from '../api/auth-api'
import { MaterialIcons } from '@expo/vector-icons';
import { UserContext } from '../contexts/user-context-provider';
import ProfileModal from '../components/profileModal'

const Profile = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const [questionVisible, setQuestionVisible] = useState(false);
    const [selectedQuestionModal, setSelectedQuestionModal] = useState({})
    const [modalVisibleId, setModalVisibleId] = useState('');

    const onPressDismissModal = () => {
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
        onPressDeleteQuestion
    } = useContext(QuestionsContext)
    const { user } = useContext(UserContext)


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
                {/* <Modal
                    animationType="fade"
                    transparent={true}
                    visible={questionVisible}
                    onRequestClose={() => {
                        setQuestionVisible(!questionVisible);
                    }}>
                    <BlurView
                        intensity={5}
                        style={styles.centeredView}>
                        <View style={styles.inputTextContainer}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', alignContent: "center", }}>
                                <Text style={{ padding: 10 }}>{selectedQuestionModal?.question}</Text>
                                <Text style={{ padding: 10 }}>{selectedQuestionModal?.answer_1}</Text>
                                <Text style={{ padding: 10 }}>{selectedQuestionModal?.answer_2}</Text>
                            </View>
                        </View>
                    </BlurView>
                </Modal> */}
                <ModalMain
                    questionVisible={questionVisible}
                    selectedQuestionModal={selectedQuestionModal}
                    onPressDismissModal={onPressDismissModal}
                >
                </ModalMain>
                <ProfileModal
                    profileModalVisible={profileModalVisible}
                    onPressDismissProfileModal={onPressDismissProfileModal}
                >
                </ProfileModal>
                <SwipeListView
                    data={questions}
                    renderItem={({ item }) =>
                        <QuestionRow
                            question={item}
                            updateQuestionModal={updateQuestionModal}
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
                {/* <TouchableOpacity
                            onPress={() => logoutUser()}
                            style={{ paddingLeft: responsiveWidth(3) }}
                        >
                            <MaterialIcons
                                name="exit-to-app"
                                size={34}
                                color="#e32f45"
                            />
                        </TouchableOpacity > */}

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
        backgroundColor: '#f25c54',
        flex: 1.6
    },
    footer: {
        flex: 5,
        backgroundColor: '#f7b267',
        overflow: 'visible',

    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        borderColor: '#f25c54',
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
        color: '#f25c54'

    },
    profileName: {
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
        top: responsiveHeight(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    largeNumbers: {
        fontSize: responsiveFontSize(29),
        fontWeight: 'bold',
        color: '#f25c54'
    },
    regularText: {
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
        backgroundColor: 'red',
        borderRadius: 15,
        height: responsiveHeight(7),
        width: responsiveHeight(7),
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputTextContainer: {
        height: responsiveHeight(10),
        // width: responsiveWidth(90),
        // marginTop: responsiveWidth(10),
        alignSelf: 'center',
        padding: 8,
        // paddingTop: 5,
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