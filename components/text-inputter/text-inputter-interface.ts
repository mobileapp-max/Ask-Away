/*
* Your component must have a TypeScript interface. Use this file to create it
* Don't forget to add a brief JSDoc comment above all props. 
* Make sure to include all useful information inside your comment and to use JSDoc tags where necessary (deprecation, throwables, etc.)
*/
import { StyleProp, ViewStyle } from "react-native";
import { TextInputterPresetNames } from "./text-inputter-presets";

export interface TextInputterProps {
  /**
  * Data being shown in this component
  */
  data?: TextInputterData[];
  /**
  * Style override useful for padding & margin
  * @optional
  */
  style?: ViewStyle;
  /**
  * Component preset group being used
  * @optional
  * @default is a string "default"
  */
  preset?: TextInputterPresetNames;
}

export type TextInputterData = {
  title: string;
  text: string;
}