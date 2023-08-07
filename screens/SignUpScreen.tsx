import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import SignUp from '../components/signUp';
import { responsiveFontSize, responsiveSize } from '../scripts/constants';
import fonts from '../scripts/fonts';


const SignUpScreen = ({ navigation }) => {
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
            </View>
            <ScrollView style={styles.footer}>
                <SignUp />
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
