export const useAddQuestionFunctions = (props: any) => {

  const { navigation, route } = props
  const { params } = route
  const { incomingVariable = {} } = params

    const onPressBack = (): void => {
      navigation.goBack()
    }

    return {
      onPressBack
    }
}
