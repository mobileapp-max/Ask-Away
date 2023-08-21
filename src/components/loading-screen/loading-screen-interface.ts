import { ViewStyle } from "react-native";

export interface LoadingScreenProps {
  /**
  * JSX's being shown in this component
  */
  children?: JSX.Element;
  /**
  * Style override useful for padding & margin
  * @optional
  */
  style?: ViewStyle;
}

