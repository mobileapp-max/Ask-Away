import { StyleProp, ViewStyle } from "react-native";

export interface ScreenProps {
  /**
  * JSX's being shown in this component
  */
  children?: JSX.Element;
  /**
  * Style override useful for padding & margin
  * @optional
  */
  style?: ViewStyle;
  onPressBack?: () => void;
  title?: string;
}

