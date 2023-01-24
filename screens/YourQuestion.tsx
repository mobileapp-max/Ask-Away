import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ScrollView,
    Pressable
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
import { MaterialCommunityIcons } from '@expo/vector-icons'; import { QuestionRow } from '../components/question-row/question-row';
import { SwipeListView } from 'react-native-swipe-list-view';

const Profile = ({ navigation }) => {

    const { onPressAddQuestion, questions, question, onPressNextQuestion } = useContext(QuestionsContext)
    const renderItem = {

    }


    // if (loading) {
    //     return <Text>Fetching data...</Text> //while loading return this
    // }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#e32f45', flex: 1.6 }} />
            <View style={{ flex: 5, backgroundColor: 'white', overflow: 'visible', }}>
                <SwipeListView
                    data={questions}
                    renderItem={({ item }) => <QuestionRow question={item} />}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{ paddingTop: responsiveHeight(4), paddingBottom: responsiveHeight(20) }}
                    renderHiddenItem={({ item }) => (
                        <View style={{
                            flexDirection: "row",
                            justifyContent: 'flex-end',
                            alignContent: 'center',
                            alignItems: 'center',
                            // height: responsiveHeight(6),
                            left: responsiveWidth(-5),
                            // borderColor: 'red',
                            // borderWidth: responsiveWidth(0.1),
                            // backgroundColor: 'yellow',
                            flex: 1,
                        }}>
                            <Pressable>
                                <MaterialCommunityIcons
                                    name="delete-forever" size={30}
                                    color='#e32f45'
                                    style={{ margin: 3 }} />
                            </Pressable>
                        </View>
                    )}
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
                    top: 35,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(25),
                }}>{'?Profile Name?'}</Text>

            </View>

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