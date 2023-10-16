import React, { memo } from "react";
import { View, StatusBar } from "react-native";
import { ScreenProps } from "./screen-interface";
import { BottomTabs } from "../bottom-tabs/bottom-tabs";

/**
 * Component to encapsulate every screen in the app
 */
export const Screen = memo(({ children, style }: ScreenProps): JSX.Element => {
  return <View style={{ flex: 1, ...style }}>{children}</View>;
  // <>
  {
    /* <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        //   barStyle={statusBarStyle}
        //   showHideTransition={statusBarTransition}
        //   hidden={hidden}
      /> */
  }

  {
    /* </> */
  }
  // );
});
