import React, { memo } from "react";
import { ActivityIndicator, View } from "react-native";
import { responsiveSize } from "../../../scripts/constants";
import { LoadingScreenProps } from "./loading-screen-interface";
import { colors } from "../../../assets/colors";

/**
 * Describe the new component here...
 */
export const LoadingScreen = memo(
  ({ children }: LoadingScreenProps): JSX.Element => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: colors.orange1,
        }}
      >
        <ActivityIndicator
          size={"large"}
          style={{ top: responsiveSize(-20) }}
          color={colors.white}
        />
      </View>
    );
  }
);
