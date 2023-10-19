import { Screen } from "../../components/screen/screen";
import { OnboardingProps } from "./onboarding-interface";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import React, { memo, useState } from "react";
import Onboarding from "react-native-onboarding-swiper";
import Lottie from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { setItem } from "../../../utils/asyncStorage";
import fonts from "../../../scripts/fonts";
import {
  responsiveFontSize,
  responsiveSize,
  responsiveWidth,
} from "../../../scripts/constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const image_1 =
  Platform.OS === "ios"
    ? require("../../../assets/animations/animation_1_ios.json")
    : require("../../../assets/animations/animation_1.json");
const image_2 =
  Platform.OS === "ios"
    ? require("../../../assets/animations/animation_2_ios.json")
    : require("../../../assets/animations/animation_2.json");
const image_3 =
  Platform.OS === "ios"
    ? require("../../../assets/animations/animation_3_ios.json")
    : require("../../../assets/animations/animation_3.json");

export const OnboardingPresentation = memo(
  ({ onPressBack, handleDone }: OnboardingProps): JSX.Element => {
    return (
      <Screen onPressBack={onPressBack} title={"Onboarding Screen"}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <View style={styles.container}>
          <Onboarding
            controlStatusBar={true}
            onDone={handleDone}
            nextLabel={
              <>
                <Text
                  style={{
                    ...fonts.note,
                    color: "#fff",
                    fontSize: responsiveFontSize(20),
                  }}
                >
                  {"Next"}
                </Text>
              </>
            }
            skipLabel={""}
            DoneButtonComponent={({ ...props }) => {
              return (
                <TouchableOpacity {...props} onPress={handleDone}>
                  <Text style={styles.doneButton}>Done</Text>
                </TouchableOpacity>
              );
            }}
            containerStyles={{ paddingHorizontal: responsiveSize(5) }}
            titleStyles={{
              fontSize: responsiveFontSize(35),
              ...fonts.note,
            }}
            subTitleStyles={{
              fontSize: responsiveFontSize(20),
              color: "#ffffff",
              ...fonts.note,
              top: responsiveFontSize(-10),
            }}
            pages={[
              {
                backgroundColor: "#f79d65",
                image: (
                  <View style={styles.lottie}>
                    <Lottie source={image_1} autoPlay loop />
                  </View>
                ),
                title: "Ask Yes-No Questions",
                subtitle:
                  "Curious about what others think? Ask away and find out!",
              },
              {
                backgroundColor: "#52b788",
                image: (
                  <View style={styles.lottie}>
                    <Lottie source={image_2} autoPlay loop />
                  </View>
                ),
                title: "Express Your Opinion",
                subtitle:
                  "Answer others' questions and help them settle a matter.",
              },
              {
                backgroundColor: "#f25c54",
                image: (
                  <View style={styles.lottie}>
                    <Lottie source={image_3} autoPlay loop />
                  </View>
                ),
                title: "Monitor Replies",
                subtitle:
                  "Watch how people answer your questions and learn what they think.",
              },
            ]}
          />
        </View>
      </Screen>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    ...fonts.note,
    color: "#fff",
    fontSize: responsiveFontSize(20),
    marginRight: responsiveWidth(5),
  },
});
