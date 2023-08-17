import { useNavigation } from "@react-navigation/native";
import { setItem } from "../../../utils/asyncStorage";

export const useOnboardingFunctions = (props: any) => {


    const onPressBack = (): void => {
      navigation.goBack()
    }

    const navigation = useNavigation();

    const handleDone = () => {
        navigation.navigate('Home');
        setItem('onboarded', '1');
    }

    return {
      onPressBack,
      handleDone
    }
}
