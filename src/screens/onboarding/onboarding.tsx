import React, { memo } from "react";
import { OnboardingPresentation } from "./onboarding-presentation";
import { OnboardingProps } from "./onboarding-interface";
import { useOnboardingFunctions } from "./onboarding-functions";

export const Onboarding = memo((props: OnboardingProps): JSX.Element => {
  const OnboardingFunctionsResults = useOnboardingFunctions(props);

  return <OnboardingPresentation {...OnboardingFunctionsResults} />;
});
