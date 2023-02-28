import React, { useEffect, useState, Component, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Modal,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from '../scripts/constants';
import { useContext } from 'react';
import { BlurView } from 'expo-blur';
import { VictoryPie } from 'victory-native';
import { UserContext } from '../contexts/user-context-provider';
import { QuestionsContext } from '../contexts/questions-context-provider';
import ButtonQApp from './buttonQApp';
import { deleteAuthUser, logoutUser, updateUsersPassword } from '../api/auth-api';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const ProfileModal = ({ children, profileModalVisible, onPressDismissProfileModal }) => {
    const { user } = useContext(UserContext)

    const [data, setData] = useState({
        username: '',
        password: '',
        email: '',
        check_textInputChange: false,
        secureTextEntry1: true,
        secureTextEntry2: true,
    });

    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }
    const handleEmailChange = (val) => {
        setData({
            ...data,
            email: val
        });
    }

    const updateSecureTextEntry1 = () => {
        setData({
            ...data,
            secureTextEntry1: !data.secureTextEntry1
        });
    }
    const updateSecureTextEntry2 = () => {
        setData({
            ...data,
            secureTextEntry2: !data.secureTextEntry2
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const onPressSignUp = useCallback(
        async () => {
            if (data?.email && data?.password) {
                await signUpNewUser({ email: data?.email, password: data?.password }).then((response) => {
                    // console.log(response)
                    response?.error && Alert.alert(response?.error)
                })
            }
            else {
                Alert.alert('Missing email or password')
            }
        },
        [data],
    )
    const onPressLogIn = useCallback(
        async () => {
            if (data?.email && data?.password) {
                await loginUser({ email: data?.email, password: data?.password }).then((response) => {
                    // console.log(response)
                    response?.error && Alert.alert(response?.error)
                })
            }
            else {
                Alert.alert('Missing email or password')
            }
        },
        [data],
    )
    const onPressResetPassword = async () => {
        if (data?.email) {
            const response = await sendEmailWithPassword(data?.email);
            if (response?.error) {
                Alert.alert(response.error);
            }
            else {
                Alert.alert(`An email to reset your password has been sent to ${data?.email}`);
            }
        }
        else {
            Alert.alert('Enter the email.')
        }
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={profileModalVisible}
        >
            <View
                style={{ flex: 1 }}
                onResponderGrant={() => console.log('closing 1')}
            // onStartShouldSetResponder={() => console.log('closing 1')}
            >
                <BlurView
                    intensity={5}
                    style={{ flex: 1 }}

                >
                    <Pressable
                        style={{ flex: 1 }}
                        onPress={() => onPressDismissProfileModal()}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.inputTextContainer}>
                                {children}
                                <Text
                                    adjustsFontSizeToFit={true}
                                    style={{
                                        // fontSize: 15,
                                        margin: 15,
                                        fontWeight: 'bold'
                                    }}>
                                    {user?.email}
                                </Text>
                                <View
                                    style={{ marginBottom: responsiveHeight(2) }}
                                >
                                    <Text style={[styles.text_footer, {
                                        fontWeight: 'bold',
                                        alignSelf: 'center'
                                    }]}>
                                        {'Update Password'}
                                    </Text>
                                    <View
                                        style={{
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#c5d2e6',
                                            marginBottom: 10,
                                            paddingBottom: 5,
                                        }}
                                    />
                                    <Text style={[styles.text_footer, {
                                    }]}>
                                        {'Current Password'}
                                    </Text>
                                    <View style={styles.action}>
                                        <Feather
                                            name="lock"
                                            color="#e32f45"
                                            size={20}
                                        />
                                        <TextInput
                                            placeholder="Current Password"
                                            onChangeText={val => handleEmailChange(val)}
                                            secureTextEntry={data.secureTextEntry1 ? true : false}
                                            style={styles.textInput}
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            onPress={updateSecureTextEntry1}
                                        >
                                            {data.secureTextEntry1 ?
                                                <Feather
                                                    name="eye-off"
                                                    color="#e32f45"
                                                    size={20}
                                                />
                                                :
                                                <Feather
                                                    name="eye"
                                                    color="#e32f45"
                                                    size={20}
                                                />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={[styles.text_footer, {
                                        marginTop: 35
                                    }]}>
                                        {'New Password'}
                                    </Text>
                                    <View style={styles.action}>
                                        <Feather
                                            name="lock"
                                            color="#e32f45"
                                            size={20}
                                        />
                                        <TextInput
                                            placeholder="New Password"
                                            secureTextEntry={data.secureTextEntry2 ? true : false}
                                            style={styles.textInput}
                                            autoCapitalize="none"
                                            onChangeText={(val) => handlePasswordChange(val)}
                                        />
                                        <TouchableOpacity
                                            onPress={updateSecureTextEntry2}
                                        >
                                            {data.secureTextEntry2 ?
                                                <Feather
                                                    name="eye-off"
                                                    color="#e32f45"
                                                    size={20}
                                                />
                                                :
                                                <Feather
                                                    name="eye"
                                                    color="#e32f45"
                                                    size={20}
                                                />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <ButtonQApp
                                    title={'Update Password'}
                                    // onPress={deleteAuthUser()}
                                    height={responsiveHeight(5)}
                                    color={'silver'}
                                    color2={'green'}
                                />
                                <View
                                    style={{
                                        marginTop: responsiveHeight(1.5)
                                    }}
                                >
                                </View>
                                <ButtonQApp
                                    title={'Delete Account'}
                                    onPress={deleteAuthUser()}
                                    height={responsiveHeight(4)}
                                    color={'#e32f45'}
                                    color2={'pink'}
                                />
                                <ButtonQApp
                                    title={'Log Out'}
                                    onPress={() => logoutUser()}
                                    height={responsiveHeight(7)}
                                    color={'yellow'}
                                    color2={'pink'}
                                />
                            </View>
                        </View>
                    </Pressable>
                </BlurView>
            </View>
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
        height: responsiveHeight(60),
        width: responsiveWidth(70),
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
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        width: responsiveWidth(60)
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },

});