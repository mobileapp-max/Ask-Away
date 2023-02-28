import React, { useCallback, useState, useMemo } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Platform,
    StyleSheet,

} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ButtonQApp = ({ title, onPress, height, disabled, color, color2 }) => {

    const styles = useMemo(() => {
        return StyleSheet.create({
            signIn: {
                width: '95%',
                height: height,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                margin: 5
            },
            textSign: {
                fontSize: 18,
                fontWeight: 'bold'
            },
        });
    }, [height])

    return (
        <TouchableOpacity
            style={styles.signIn}
            onPress={onPress}
            disabled={disabled}
        >
            <LinearGradient
                colors={[color, color2]}
                style={styles.signIn}
            >
                <Text style={[styles.textSign, {
                    color: '#fff'
                }]}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}
export default ButtonQApp;