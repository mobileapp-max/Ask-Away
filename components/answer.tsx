import * as React from "react"
import { Image, Text, View, TouchableOpacity, TouchableWithoutFeedbackBase, TextInput, StyleSheet, TextInputComponent, TouchableWithoutFeedback } from "react-native"
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "../scripts/constants"
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import UseOnLayout from "../scripts/use-on-layout";
import { TextInputApp } from "./textInputApp"

export const Answer = (props) => {

    const {
        answer,
        setOpenedAnswerId,
        isAnswerOpen
    } = props

    const {
        currentHeightOfView,
        currentWidthOfView,
        captureView
    } = UseOnLayout()

    // const [isAnswerOpen, setIsAnswerOpen] = useState(null);



    return (
        <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: 'red', width: 30, height: 30, borderRadius: 20 }}></TouchableOpacity>
                <TouchableOpacity
                    onLayout={captureView}
                    style={{
                        maxWidth: '85%',
                        borderColor: "red",
                        borderWidth: 2,
                        borderBottomRightRadius: 20,
                        borderTopRightRadius: 8,
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 8,
                        padding: 10,
                        margin: 5
                    }}>
                    <Text>{answer?.answer}</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity>
                        <AntDesign style={{ marginHorizontal: 4, backgroundColor: 'white', }} name="dislike1" size={20} color="red" />
                    </TouchableOpacity>
                    <Text>5</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity>
                        <AntDesign style={{ marginHorizontal: 4, backgroundColor: 'white' }} name="like1" size={20} color="red" />
                    </TouchableOpacity>
                    <Text>3</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => setOpenedAnswerId(answer.answer_id)}
                style={{ flexDirection: 'row', marginLeft: currentWidthOfView, position: 'absolute', top: currentHeightOfView - 8 }}>
                <FontAwesome style={{ marginHorizontal: 9, backgroundColor: 'white' }} name="mail-reply" size={24} color="red" />
            </TouchableOpacity>
            {isAnswerOpen &&
                <TextInputApp style={{ left: responsiveWidth(5), marginRight: responsiveWidth(10.5) }}
                    customPlaceholder={"Reply..."}
                />
            }
        </View >
    )
}

const styles = StyleSheet.create({

});