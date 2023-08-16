export const useOnboardingFunctions = (props: any) => {

  const { navigation, route } = props


    const onPressBack = (): void => {
      navigation.goBack()
    }

    return {
      onPressBack
    }
}
