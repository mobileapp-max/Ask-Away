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

import { useTheme } from 'react-native-paper';
import FontAwesome5 from '@expo/vector-icons/build/FontAwesome5';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { ProfileSetting } from '../components/profileSetting';

// import { AuthContext } from '../components/context';

// import Users from '../model/users';

const Profile = ({ navigation }) => {



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


            <View style={{ flex: 5, backgroundColor: 'white' }}>
                <View style={{
                    flexDirection: 'column',
                }}>
                    <ProfileSetting
                        text={'Questions'}
                        iconName={'question-circle'}
                    />
                    <ProfileSetting
                        text={'Answers'}
                        iconName={'pencil-square'}
                        style={{ paddingTop: 0 }}
                    />
                    <ProfileSetting
                        text={'Settings'}
                        iconName={'gears'}
                        style={{ paddingTop: 0 }}
                    />
                    <ProfileSetting
                        text={'Log Out'}
                        iconName={'arrow-circle-o-left'}
                        style={{ paddingTop: 0 }}
                    />

                </View>

            </View>
            <View style={{
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
                }}>{'Profile Name'}</Text>

            </View>

        </View>
    )
};

export default Profile;

const styles = StyleSheet.create({

});