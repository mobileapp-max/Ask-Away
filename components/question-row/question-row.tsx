import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from '../../scripts/constants';
import { calculateResults } from '../../scripts/calculateResults';


export const QuestionRow = ({ question: incomingQuestion }) => {
    const {
        question,
        answer_1,
        answer_2,
    } = incomingQuestion;

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: 'space-between',
                marginVertical: responsiveWidth(0.8),
                marginHorizontal: responsiveWidth(0.8),


            }}>
            <View style={[
                styles.inputText, {
                }]}>
                <Text
                    numberOfLines={2}
                    style={{
                        fontSize: responsiveFontSize(16)
                    }}>{question}</Text>
            </View>

            <View style={{
                alignSelf: 'center',
                flexDirection: "row",
                borderRadius: 10,
                // width: responsiveWidth(90),
                overflow: 'hidden',
                backgroundColor: 'red',
            }}>


                <View
                    style={{
                        backgroundColor: "#54a832",
                        height: responsiveHeight(5.2),
                        width: responsiveWidth((28 / 100) * calculateResults({ answer_1, answer_2 }).answer_1_result),
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                    }}>
                    <Text style={{ fontWeight: 'bold', color: "white" }}>
                        {`Yes\n${calculateResults({ answer_1, answer_2 }).answer_1_result}%`}
                    </Text>
                </View>
                <View
                    style={{
                        backgroundColor: "#e32f45",
                        height: responsiveHeight(5.2),
                        width: responsiveWidth((28 / 100) * calculateResults({ answer_1, answer_2 }).answer_2_result),
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
                    <Text style={{ fontWeight: 'bold', color: "white" }}>
                        {`No\n${calculateResults({ answer_1, answer_2 }).answer_2_result}%`}
                    </Text>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    inputText: {
        width: responsiveWidth(70),
        padding: 10,
        color: '#e32f45',
        borderWidth: 0.5,
        borderColor: '#FA7465',
        backgroundColor: 'white',
        borderRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 8,
        shadowColor: "#e32f45",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: 5,
    },
});