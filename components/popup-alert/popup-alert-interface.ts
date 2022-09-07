/*
* Your component must have a TypeScript interface. Use this file to create it
* Don't forget to add a brief JSDoc comment above all props. 
* Make sure to include all useful information inside your comment and to use JSDoc tags where necessary (deprecation, throwables, etc.)
*/
import { StyleProp, ViewStyle } from "react-native";
import { PopupAlertPresetNames } from "./popup-alert-presets";

export interface PopupAlertProps {
  /**
  * Is modal visible?
  */
  visible: boolean
  /**
  * Function to turn off visibility of modal
  */
  dismissFunction: () => void
  /**
  * @optional Text content if desired
  */
  content?
  /**
  * 
  */
  tintColor?
  /**
  * 
  */
  modalImage?
  /**
  * @optional children if you want to pass JSX straight into the modal
  */
  children?
  /**
  * @optional buttons to be displayed in the modal
  */
  buttons?
  /**
  * 
  */
  textStyle?
  /**
  * Function to be executed upon item pressed
  * @optional because sampleOnPressItem should be available
  */
  onPressItem?: (any) => void;
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
  preset?: PopupAlertPresetNames;
}