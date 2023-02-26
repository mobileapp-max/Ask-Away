import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,

} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { MaterialIcons } from '@expo/vector-icons';
import { signUpNewUser } from '../api/auth-api';
import { loginUser } from '../api/auth-api'
import { sendEmailWithPassword } from '../api/auth-api'


const SignUp = ({ navigation }) => {

    const [data, setData] = useState({
        username: '',
        password: '',
        email: '',
        check_textInputChange: false,
        secureTextEntry: true,
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

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
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
        <View
            style={styles.container}>
            <Text style={[styles.text_footer, {

            }]}>Email</Text>
            <View style={styles.action}>
                <MaterialIcons name="alternate-email" size={24} color="#e32f45" />
                <TextInput
                    placeholder="Your Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={val => handleEmailChange(val)}
                />
            </View>
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather
                    name="lock"
                    color="#e32f45"
                    size={20}
                />
                <TextInput
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ?
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
            <TouchableOpacity
                style={{ marginTop: 10 }}
                onPress={onPressResetPassword}
            >
                <Text
                    style={{ fontWeight: '200', fontStyle: 'italic', textDecorationLine: 'underline' }}
                >{'Forgot Password'}</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={onPressLogIn}
                >
                    <LinearGradient
                        colors={["#e32156", "yellow"]}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {
                            color: '#fff'
                        }]}>Log In</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={onPressSignUp}
                >
                    <LinearGradient
                        colors={["#e32f00", "purple"]}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {
                            color: '#fff'
                        }]}>Sign Up</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.textPrivate}>
                    <Text style={styles.color_textPrivate}>
                        By signing up you agree to our
                        <Text style={{ fontWeight: 'bold' }}>{" "}Terms of service</Text>
                        <Text>{" "}and </Text>
                        <Text style={{ fontWeight: 'bold' }}>{" "}Privacy policy</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    header: {
        flex: 0.1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
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
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 40,

    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 5
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
});
