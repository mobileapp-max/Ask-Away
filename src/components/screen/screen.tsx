import React, { memo } from "react";
import { View } from "react-native";
import { ScreenProps } from "./screen-interface";

/**
 * Component to encapsulate every screen in the app
 */
export const Screen = memo(({ children, style }: ScreenProps): JSX.Element => {
  return <View style={{ flex: 1, ...style }}>{children}</View>;
});
