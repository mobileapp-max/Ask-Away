import React, { memo } from "react";
import { View, Text } from "react-native";
import { Screen } from "../../components/screen/screen";
import { AddQuestionProps } from "./add-question-interface";

export const AddQuestionPresentation = memo(
  ({ onPressBack }: AddQuestionProps): JSX.Element => {
    return (
      <Screen onPressBack={onPressBack} title={"AddQuestion Screen"}>
        <View>
          <Text>{"More Content Coming Soon!"}</Text>
        </View>
      </Screen>
    );
  }
);
