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
import { responsiveFontSize, responsiveHeight, responsiveSize } from '../scripts/constants';
import fonts from '../scripts/fonts';


const SignUpScreen = ({ navigation }) => {

    // const options = [
    //     { label: 'Sign Up', value: 'Sign Up' },
    //     { label: 'Sign In', value: 'Sign In' },
    // ];
    // const [switchSelectorValue, setSwitchSelectorValue] = useState('Sign Up')

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text
                    style={{
                        ...fonts.note,
                        color: 'white',
                        fontSize: responsiveFontSize(60),
                        fontWeight: 'bold',
                        marginBottom: 0,
                        top: responsiveSize(4)
                    }}
                >{'Join In'}</Text>
                {/* <Text style={styles.text_header}>Join in!</Text> */}
                {/* <SwitchSelector
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
                /> */}
            </View>
            <ScrollView style={styles.footer}>
                <SignUp />
                {/* {switchSelectorValue === "Sign Up" ? <SignUp /> : <SignIn />} */}
            </ScrollView>
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f25c54"
    },
    header: {
        flex: 0.19,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        // paddingBottom: 10
    },
    footer: {
        flex: 3,
        backgroundColor: '#f7b267',
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
