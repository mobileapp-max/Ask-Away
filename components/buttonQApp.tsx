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
import { responsiveFontSize } from '../scripts/constants';
import fonts from '../scripts/fonts';


const ButtonQApp = ({ title, onPress, height, disabled, color, color2, fontSize }) => {

    const styles = useMemo(() => {
        return StyleSheet.create({

            signIn: {
                width: '100%',
                height: height,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                margin: 5,
                shadowColor: "#e32f45",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
            },
            textSign: {
                ...fonts.note,
                fontSize: fontSize,
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