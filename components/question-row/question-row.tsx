import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable
} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from '../../scripts/constants';
import { calculateResults } from '../../scripts/calculateResults';
import UseOnLayout from '../../scripts/use-on-layout';


export const QuestionRow = ({ question: incomingQuestion }) => {
    const {
        question,
        answer_1,
        answer_2,
    } = incomingQuestion;

    const {
        currentHeightOfView,
        currentWidthOfView,
        captureView
    } = UseOnLayout()

    return (
        <Pressable
            style={{
                flexDirection: "row",
                justifyContent: 'space-between',
                marginVertical: responsiveWidth(0.8),
                marginHorizontal: responsiveWidth(0.8),
            }}
        >
            <View
                onLayout={captureView}
                style={styles.inputText}
            >
                <Text
                    numberOfLines={2}
                    style={{ fontSize: responsiveFontSize(16) }}
                >
                    {question}
                </Text>
            </View>

            {calculateResults({ answer_1, answer_2 }).bothZeros ?

                <View style={{
                    alignSelf: 'center',
                    flexDirection: "row",
                    borderRadius: 10,
                    overflow: 'hidden',
                    height: currentHeightOfView,
                    width: responsiveWidth(28),
                    borderColor: 'red',
                    borderWidth: responsiveWidth(0.1),
                    justifyContent: 'center',
                    backgroundColor: 'white',
                }}>
                    <Text style={{ alignSelf: "center" }}>
                        {'No Answers'}
                    </Text>
                </View>
                :
                <View style={{
                    alignSelf: 'center',
                    flexDirection: "row",
                    borderRadius: 10,
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    height: currentHeightOfView,
                    width: responsiveWidth(28),
                    borderColor: 'red',
                    justifyContent: 'center'
                }}>
                    <View
                        style={{
                            backgroundColor: "#54a832",
                            height: currentHeightOfView,
                            width: responsiveWidth((28 / 100) * calculateResults({ answer_1, answer_2 }).answer_1_result),
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                        }}>
                        <Text style={{ fontWeight: 'bold', color: "white" }}>
                            {`Yes\n${Math.round(calculateResults({ answer_1, answer_2 }).answer_1_result)}%`}
                        </Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: "#e32f45",
                            height: currentHeightOfView,
                            width: responsiveWidth((28 / 100) * calculateResults({ answer_1, answer_2 }).answer_2_result),
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center'
                        }}>
                        <Text style={{ fontWeight: 'bold', color: "white" }}>
                            {`No\n${Math.round(calculateResults({ answer_1, answer_2 }).answer_2_result)}%`}
                        </Text>
                    </View>
                </View>
            }
        </Pressable >
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
        overflow: 'visible',
        shadowColor: "#e32f45",
        shadowOffset: {
            width: 0,
            height: 10,
            overflow: 'visible',
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: 5,
    },
});