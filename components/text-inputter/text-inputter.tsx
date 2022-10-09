
import * as React from "react"
import { Image, Text, View, TouchableOpacity, TouchableWithoutFeedbackBase, TextInput, StyleSheet, TextInputComponent, TouchableWithoutFeedback } from "react-native"
import { COLORS } from "../../assets/colors"
import { LinearGradient } from "expo-linear-gradient"
import ShadeColor from "../../scripts/shade-color"
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "../../scripts/constants"
import { FontAwesome } from "@expo/vector-icons"
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useState } from "react"
import Animated, { color } from "react-native-reanimated"
import { TextInputterProps } from "./text-inputter-interface"
import { TextInputterPresets } from "./text-inputter-presets"

/**
 * Describe your new component here...
 */
export const TextInputter = (props: TextInputterProps) => {

  // INCOMING PROPS
  const {
    preset = 'default',
    style = {},
    data,
    onPressAnswerQuestion,
    customPlaceholder,
  } = props

  const [answer, setAnswer] = useState('')

  return (
    <View style={{ ...style }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <TouchableOpacity style={{ backgroundColor: 'red', width: 30, height: 30, borderRadius: 20 }}></TouchableOpacity>
        <View style={{ maxWidth: '85%' }}>
          <TextInput
            value={answer}
            placeholder={customPlaceholder || "Add your answer..."}
            multiline={true}
            numberOfLines={5}
            maxLength={150}
            placeholderTextColor="grey"
            secureTextEntry={false}
            autoCapitalize="sentences"
            onChangeText={(newAnswer) => setAnswer(newAnswer)}
            style={{ maxWidth: responsiveWidth(70), borderColor: "gold", borderWidth: 2, borderBottomRightRadius: 20, borderTopRightRadius: 8, borderTopLeftRadius: 20, borderBottomLeftRadius: 8, padding: 10, margin: 5 }}></TextInput>
        </View>
        <View style={{ backgroundColor: '#e32f45', borderRadius: 25, borderWidth: 1.5, borderColor: '#e32f45' }}>
          <View style={{ backgroundColor: 'white', borderRadius: 25, borderWidth: 1.5, borderColor: 'white' }}>
            <TouchableOpacity
              onPress={console.log('hi')}
              style={{ backgroundColor: '#e32f45', borderRadius: 20 }}>
              <Entypo
                name="plus" size={25} color='white' />
            </TouchableOpacity>
          </View>

        </View>
      </View>
      {answer?.length >= 150 &&
        // <Animated >
        <Text
          style={{
            left: responsiveWidth(10),
            color: 'red',
            marginBottom: responsiveHeight(0.5)
          }}>Max length - 150</Text>
        // </Animated>
      }
    </View>
  )
}

export const TextInputterStyles = StyleSheet.create({
  mappedContainer: {
    borderColor: "#72FA41",
    borderWidth: 2
  },
});
