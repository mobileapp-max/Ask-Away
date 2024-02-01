import React, { useEffect, useState, useContext } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedbackBase,
  TextInput,
  StyleSheet,
  TextInputComponent,
  TouchableWithoutFeedback,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../scripts/constants";
import { Entypo } from "@expo/vector-icons";
import { TextInputterProps } from "./text-inputter-interface";
import { QuestionsContext } from "../../contexts/questions-context-provider";

/**
 * Describe your new component here...
 */
export const TextInputter = (props: TextInputterProps) => {
  // INCOMING PROPS
  const { style = {}, customPlaceholder, questionId } = props;

  const { onPressAddAnswer } = useContext(QuestionsContext);

  const [answer, setAnswer] = useState("");

  return (
    <View style={{ ...style }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            width: 30,
            height: 30,
            borderRadius: 20,
          }}
        />
        <View style={{ maxWidth: "85%" }}>
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
            style={{
              maxWidth: responsiveWidth(70),
              borderColor: "#8B2492",
              borderWidth: 2,
              borderBottomRightRadius: 20,
              borderTopRightRadius: 8,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 8,
              padding: 8,
              margin: 5,
            }}
          ></TextInput>
        </View>
        <View
          style={{
            backgroundColor: "#e32f45",
            borderRadius: 25,
            borderWidth: 1.5,
            borderColor: "#e32f45",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 25,
              borderWidth: 1.5,
              borderColor: "white",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                onPressAddAnswer({
                  answer: {
                    answer_id: "c82eaca0-f915-4c52-a6c7-010b731f46786",
                    answer,
                    currentQuestionId: questionId,
                  },
                })
              }
              style={{ backgroundColor: "#e32f45", borderRadius: 20 }}
            >
              <Entypo name="plus" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {
        answer?.length >= 150 && (
          // <Animated >
          <Text
            style={{
              left: responsiveWidth(10),
              color: "red",
              marginBottom: responsiveHeight(0.5),
            }}
          >
            Max characters - 300
          </Text>
        )
        // </Animated>
      }
    </View>
  );
};

export const TextInputterStyles = StyleSheet.create({
  mappedContainer: {
    borderColor: "#72FA41",
    borderWidth: 2,
  },
});
