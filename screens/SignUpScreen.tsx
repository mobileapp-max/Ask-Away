import React, { useState } from 'react';
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

} from 'react-native';
import SwitchSelector from 'react-native-switch-selector'
import SignUp from '../components/signUp';
import SignIn from '../components/signIn';

const SignUpScreen = ({ navigation }) => {

    const options = [
        { label: 'Sign Up', value: 'Sign Up' },
        { label: 'Sign In', value: 'Sign In' },
    ];
    const [switchSelectorValue, setSwitchSelectorValue] = useState('Sign Up')

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* <Text style={styles.text_header}>Join in!</Text> */}
                <SwitchSelector
                    options={options}
                    textColor={"#e32f45"}
                    selectedColor={'white'}
                    buttonColor={"#e32f45"}
                    borderColor={"white"}
                    hasPadding
                    initial={0}
                    height={60}
                    valuePadding={1}
                    bold={true}
                    borderWidth={2}
                    borderRadius={15}
                    onPress={value => setSwitchSelectorValue(value)}
                />
            </View>
            <ScrollView style={styles.footer}>

                {switchSelectorValue === "Sign Up" ? <SignUp /> : <SignIn />}
            </ScrollView>
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e32f45"
    },
    header: {
        flex: 0.19,
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
});
