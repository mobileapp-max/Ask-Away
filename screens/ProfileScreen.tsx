import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProfileScreen = ({ navigation }) => {
    return (
        <View style={StyleSheet.container}>
            <Text>Profile Screen</Text>
        </View>
    )
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alighItems: 'center',
        justifyContent: 'center',
        backgroundColor: "blue"
    }

})