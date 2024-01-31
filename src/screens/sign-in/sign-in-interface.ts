export interface SignInProps {
  handleEmailChange: (val: string) => void;
  handlePasswordChange: (val: string) => void;
  updateSecureTextEntry: () => void;
  onPressResetPassword: () => void;
  onPressLogIn: () => void;
  onPressSignUp: () => void;
  data: SignInProps;
  signUpDocsReviewVisible: boolean;
  onPressSignUpDocsReview: () => void;
  secureTextEntry: boolean;
  email: string;
  password: string;

}