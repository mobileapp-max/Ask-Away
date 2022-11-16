import * as React from "react"
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedbackBase,
    TextInput,
    StyleSheet,
    TextInputComponent,
    TouchableWithoutFeedback
} from "react-native"
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth
} from "../scripts/constants"
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import UseOnLayout from "../scripts/use-on-layout";
import { TextInputApp } from "./textInputApp"
import { TextInputter } from "./text-inputter/text-inputter";
import { FlatList } from "react-native-gesture-handler";

export const Answer = (props) => {

    const {
        answer,
        setOpenedAnswerId,
        isAnswerOpen,
        onPressAnswerQuestion,
        isReplyOpen,
        setAnswerWithOpenedReplies
    } = props

    const {
        currentHeightOfView,
        currentWidthOfView,
        captureView
    } = UseOnLayout()



    return (
        <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'red',
                        width: 30,
                        height: 30,
                        borderRadius: 20
                    }}
                />
                <TouchableOpacity
                    onLayout={captureView}
                    onPress={() => setAnswerWithOpenedReplies(answer.answer_id)}
                    style={{
                        maxWidth: '87%',
                        borderColor: "red",
                        borderWidth: 2,
                        borderBottomRightRadius: 20,
                        borderTopRightRadius: 8,
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 8,
                        padding: 8,
                        margin: 5,
                        marginBottom: 9,
                    }}>
                    <Text>{answer?.answer}</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    {/* <TouchableOpacity>
                        <AntDesign
                            style={{
                                marginHorizontal: 4,
                                backgroundColor: 'white',
                            }}
                            name="like1"
                            size={25}
                            color="red" />
                    </TouchableOpacity>
                    <Text style={{
                        position: "absolute",
                        color: 'white',
                        fontWeight: 'bold',
                        bottom: -0.5
                    }}>{answer?.like}</Text> */}
                </View>
                <View style={{ alignItems: 'center' }}>
                    {/* <TouchableOpacity>
                        <AntDesign
                            style={{
                                marginHorizontal: 4,
                                backgroundColor: 'white'
                            }}
                            name="dislike1"
                            size={25}
                            color="red"
                        />
                    </TouchableOpacity>
                    <Text style={{
                        position: "absolute",
                        color: 'white',
                        fontWeight: 'bold',
                        bottom: 7
                    }}>{answer?.dislike}</Text> */}
                </View>
            </View>
            <TouchableOpacity
                onPress={() => setOpenedAnswerId(answer.answer_id)}
                style={{
                    flexDirection: 'row',
                    marginLeft: currentWidthOfView,
                    position: 'absolute',
                    top: currentHeightOfView - 8
                }}>
                <FontAwesome
                    style={{
                        marginHorizontal: 9,
                        backgroundColor: 'white'
                    }}
                    name="mail-reply"
                    size={24}
                    color="red" />
                {/* <Text style={{
                    color: 'black',
                    right: 23,
                    bottom: -10,
                    fontWeight: 'bold',
                }}>
                    {answer.replies_aggregate.aggregate.count}
                </Text> */}
            </TouchableOpacity>
            {isAnswerOpen &&
                <TextInputter
                    style={{
                        left: responsiveWidth(5),
                        marginRight: responsiveWidth(10.5),
                    }}
                    customPlaceholder={"Reply..."}
                    questionId={answer?.question_id}
                />

            }
            {isReplyOpen &&
                <FlatList
                    data={answer.replies}
                    style={{ flexDirection: 'row' }}
                    contentContainerStyle={{ maxWidth: '87%' }}
                    renderItem={({ item: reply, index: i }) => {
                        return <View
                            style={{
                                left: responsiveWidth(5),
                                marginRight: responsiveWidth(3),
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: 'red',
                                        width: 30,
                                        height: 30,
                                        borderRadius: 20,
                                        marginRight: 5,
                                    }} />
                                <View
                                    style={{
                                        borderColor: "gold",
                                        borderWidth: 2,
                                        borderBottomRightRadius: 20,
                                        borderTopRightRadius: 8,
                                        borderTopLeftRadius: 20,
                                        borderBottomLeftRadius: 8,
                                        padding: 8,
                                        margin: 2,
                                    }}>
                                    <Text>{reply?.reply}</Text>
                                </View>
                            </View>
                        </View>
                    }}
                />
            }
        </View >
    )
}

const styles = StyleSheet.create({

});