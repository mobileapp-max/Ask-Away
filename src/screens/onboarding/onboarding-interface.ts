export interface OnboardingProps {
  /**
  * Navigation object
  */
  navigation?: any
  /**
  * Incoming route/params
  */
  route?: any
  /**
  * What happens when back button is pressed?
  */
  onPressBack?: () => void
}