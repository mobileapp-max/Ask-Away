import { Screen } from "../../components/screen/screen";
import { OnboardingProps } from "./onboarding-interface";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { memo } from "react";
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

const { width, height } = Dimensions.get("window");

export const OnboardingPresentation = memo(
  ({ onPressBack, handleDone }: OnboardingProps): JSX.Element => {
    return (
      <Screen onPressBack={onPressBack} title={"Onboarding Screen"}>
        <View style={styles.container}>
          <Onboarding
            onDone={handleDone}
            nextLabel={
              <>
                <Text
                  style={{
                    ...fonts.note,
                    color: "#fff",
                    fontWeight: "bold",
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
                    <Lottie
                      source={require("../../../assets/animations/animation_1.json")}
                      autoPlay
                      loop
                    />
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
                    <Lottie
                      source={require("../../../assets/animations/animation_2.json")}
                      autoPlay
                      loop
                    />
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
                    <Lottie
                      source={require("../../../assets/animations/animation_3_2.json")}
                      autoPlay
                      loop
                    />
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
    fontWeight: "bold",
    fontSize: responsiveFontSize(25),
    marginRight: responsiveWidth(6),
  },
});
