import { StyleSheet } from 'react-native'
import { responsiveFontSize } from '../scripts/constants'

export const commonStyles = StyleSheet.create({
    regularText: {
        fontSize: responsiveFontSize(20),
        fontFamily: 'AvenirNext-Medium'
    },
    boldText: {
        fontSize: responsiveFontSize(20),
        fontFamily: 'AvenirNext-Bold'
    }
})