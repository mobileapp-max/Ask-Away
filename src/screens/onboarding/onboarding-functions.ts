import { useNavigation } from "@react-navigation/native";
import { getItem, setItem } from "../../../utils/asyncStorage";
import { UserContext } from "../../../contexts/user-context-provider";
import { useContext, useState } from "react";
import { SCREENS } from "../../../navigation/screenNames";

export const useOnboardingFunctions = (props: any) => {
  const { user } = useContext(UserContext);
  const [showOnboarding, setShowOnboarding] = useState(null);
  const onPressBack = (): void => {
    navigation.goBack();
  };
  const navigation = useNavigation();

  
  const handleDone = async () => {
    navigation.navigate(SCREENS.AUTHENTICATED_STACK);
    const currentOnbboardedUserIds = await getItem("onboardedUserIds");
    const onboardedUserIdsList = currentOnbboardedUserIds
      ? JSON.parse(currentOnbboardedUserIds)
      : null;
    if (onboardedUserIdsList === null) {
      setItem("onboardedUserIds", JSON.stringify([ user?.uid ]));
    } 
    else if (onboardedUserIdsList?.includes(user?.uid)) {
null
    }
    else {
      setItem(
        "onboardedUserIds",
        JSON.stringify([...onboardedUserIdsList, user?.uid ])
      );
    }
  };

  const checkIfAlreadyOnboarded = async () => {
    const currentOnbboardedUserIds = await getItem("onboardedUserIds");
    const onboardedUserIdsList = currentOnbboardedUserIds
    ? JSON.parse(currentOnbboardedUserIds)
    : null;
    console.log("onboardedUserIdsList:", currentOnbboardedUserIds);
    console.log("onboardedUserIdsList:", onboardedUserIdsList?.includes(user?.uid))
    if (onboardedUserIdsList?.includes(user?.uid)) {
      // hide onboarding
      console.log("ran false")
      setShowOnboarding(false);
    } else {
      // show onboarding
      setShowOnboarding(true);
      console.log("ran true")
    }
  };

  return {
    onPressBack,
    handleDone,
    checkIfAlreadyOnboarded,
    showOnboarding,
    setShowOnboarding,
  };
};
