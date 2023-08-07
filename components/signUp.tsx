import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { MaterialIcons } from '@expo/vector-icons';
import { signUpNewUser } from '../api/auth-api';
import { loginUser } from '../api/auth-api'
import { sendEmailWithPassword } from '../api/auth-api'
import { responsiveHeight } from '../scripts/constants';
import fonts from '../scripts/fonts';


const SignUp = ({ navigation }) => {

    const [data, setData] = useState({
        email: '',
        password: '',
        secureTextEntry: true,
    });

    const handleEmailChange = (val) => {
        setData({
            ...data,
            email: val
        });
    }
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const onPressSignUp = useCallback(
        async () => {
            if (data?.email && data?.password) {
                await signUpNewUser({ email: data?.email, password: data?.password }).then((response) => {
                    response?.error && Alert.alert(response?.error)
                })
            }
            else {
                Alert.alert('Missing email or password.')
            }
        },
        [data]
    )
    const onPressLogIn = useCallback(
        async () => {
            if (data?.email && data?.password) {
                await loginUser({ email: data?.email, password: data?.password }).then((response) => {
                    response?.error && Alert.alert(response?.error)
                })
            }
            else {
                Alert.alert('Missing email or password.')
            }
        },
        [data]
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
            Alert.alert('Email must be entered.')
        }
    }

    return (
        <View
            style={styles.container}>
            <Text style={styles.text_footer}>
                {'Email'}
                </Text>
            <View style={styles.action}>
                <MaterialIcons
                    name="alternate-email"
                    size={30}
                    color="#f25c54"
                />
                <TextInput
                    placeholder="Enter Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholderTextColor={'#f5e2c9'}
                    onChangeText={val => handleEmailChange(val)}
                />
            </View>
            <Text style={[styles.text_footer, {marginTop: 35}]}>
                {'Password'}
                </Text>
            <View style={styles.action}>
                <Feather
                    name="lock"
                    color="#f25c54"
                    size={28}
                />
                <TextInput
                    placeholder="Enter Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholderTextColor={'#f5e2c9'}
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ?
                        <Feather
                            name="eye-off"
                            color="#f25c54"
                            size={20}
                        />
                        :
                        <Feather
                            name="eye"
                            color="white"
                            size={20}
                        />
                    }
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={{
                    marginTop: responsiveHeight(1),
                }}
                onPress={onPressResetPassword}
            >
                <Text
                    style={styles.resetPassword}
                >{'Forgot Password'}</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={onPressLogIn}
                >
                    <View
                        style={[styles.signIn,{ backgroundColor: data?.email && data?.password ? '#52b788' : '#52b788' } ]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#fff'
                        }]}>{'Log In'}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={onPressSignUp}
                >
                    <View
                          style={[styles.signIn,{ backgroundColor: data?.email && data?.password ? '#f38375' : '#f38375' } ]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#fff'
                        }]}>{'Sign Up'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    {'By signing up you agree to our Terms of Service and Privacy Policy.'}
                </Text>
            </View>
        </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text_footer: {
        ...fonts.note,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f79d65',
        paddingBottom: 5
    },
    textInput: {
        ...fonts.note,
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 5,
        color: 'white',
        fontSize: '17',
    },
    button: {
        alignItems: 'center',
        marginTop: responsiveHeight(3),
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 5,
    },
    textSign: {
        ...fonts.note,
        fontSize: responsiveHeight(4),
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: responsiveHeight(1),
        alignSelf: 'center'
    },
    color_textPrivate: {
        ...fonts.note,
        color: 'white',
        textAlign: 'center'
    },
    resetPassword: {
        fontWeight: '700',
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        color: '#fff',
        fontSize: '14',
        ...fonts.note,
    }
});
