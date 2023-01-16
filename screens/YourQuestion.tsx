import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from '../scripts/constants';
import { QuestionsContext } from '../contexts/questions-context-provider';
import { useTheme } from 'react-native-paper';
import FontAwesome5 from '@expo/vector-icons/build/FontAwesome5';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { ProfileSetting } from '../components/profileSetting';
import { useContext } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';


// import { AuthContext } from '../components/context';

// import Users from '../model/users';

const Profile = ({ navigation }) => {
    const { onPressAddQuestion, questions, question, onPressNextQuestion } = useContext(QuestionsContext)
    const renderItem = {

    }
    const QuestionRow = ({ question: incomingQuestion }) => {
        const {
            question,
            answer_1,
            answer_2,
        } = incomingQuestion;

        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    // paddingTop: responsiveWidth(1),
                    marginVertical: responsiveWidth(0.8),
                    marginHorizontal: responsiveWidth(0.8)

                }}>
                <View style={[
                    styles.inputText, {
                        // minHeight: responsiveHeight(12), 

                    }]}>
                    <Text
                        numberOfLines={2}
                        style={{
                        }}>{question}</Text>
                </View>

                <View style={{
                    alignSelf: 'center',
                    flexDirection: "row",
                    borderRadius: 10,
                    // width: responsiveWidth(90),
                    overflow: 'hidden',
                    backgroundColor: 'red',
                }}>
                    <View
                        style={{
                            backgroundColor: "#54a832",
                            height: responsiveHeight(5.5),
                            width: responsiveWidth(14),
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                        }}><Text style={{ fontWeight: 'bold', color: "white" }}>Yes {100 * answer_1 / (answer_1 + answer_2)}%</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: "#e32f45",
                            height: responsiveHeight(5.5),
                            width: responsiveWidth(14),
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center'
                        }}><Text style={{ fontWeight: 'bold', color: "white" }}>No {100 * answer_2 / (answer_1 + answer_2)}%</Text>
                    </View>
                </View>

            </View>
        );
    };

    // if (loading) {
    //     return <Text>Fetching data...</Text> //while loading return this
    // }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#e32f45', flex: 1.9 }}>
                <Text style={{
                    fontWeight: 'bold',
                    top: responsiveWidth(11),
                    alignSelf: 'center',
                    fontSize: responsiveFontSize(30),
                    color: 'white'
                }}>
                    {'Profile'}
                </Text>
            </View>


            <View style={{ flex: 5, backgroundColor: 'white', }}>

                <FlatList
                    data={questions}
                    renderItem={({ item }) => <QuestionRow question={item} />}
                    keyExtractor={(item, index) => index}
                />
            </View>
            {/* <View style={{
                position: 'absolute',
                backgroundColor: 'white',
                width: responsiveWidth(85),
                height: responsiveHeight(25),
                alignSelf: 'center',
                borderRadius: 25,
                top: responsiveHeight(10),
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
                <View style={{
                    backgroundColor: 'pink',
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    top: 20,
                    alignSelf: 'center',
                    justifyContent: 'center',


                }}>
                    <View style={{
                        backgroundColor: "#e32f45",
                        width: 70,
                        height: 70,
                        borderRadius: 50,
                        alignSelf: 'center',
                        justifyContent: 'center',

                    }} />
                </View>
                <Text style={{
                    top: 35,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(25),
                }}>{'?Profile Name?'}</Text>

            </View> */}

        </View>
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
});