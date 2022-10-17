/*
* Some of our components must be rendered in unique ways in certain use cases.
* Presets help us reuse most of the component while creating unique variations of it.
* Remember! NOT ALL COMPONENTS NEED PRESET. This file is here to help you, so don't feel like you need to use it!
*/

import { TextStyle } from "react-native";
import Translation from '../../utils/translation/translation';
import { responsiveFontSize, responsiveWidth } from '../../theme/constants';

export const CharacterLimitPresets = {
  default: {
    textColor: "#000000"
  },
  darkMode: {
    textColor: "#FFFFFF"
  }
}

export type CharacterLimitPresetNames = keyof typeof CharacterLimitPresets