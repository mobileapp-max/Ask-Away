import React, { memo } from "react";
import { View, Text } from "react-native";
import { Screen } from "../../components/screen/screen";
import { OnboardingProps } from "./onboarding-interface";
import { AddQuestion } from "../add-question/add-question";

export const OnboardingPresentation = memo(
  ({ onPressBack }: OnboardingProps): JSX.Element => {
    return (
      <>
        <AddQuestion />
      </>
    );
  }
);
