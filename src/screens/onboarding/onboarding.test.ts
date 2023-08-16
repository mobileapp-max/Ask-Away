import { renderHook } from '@testing-library/react-native'
import { useOnboardingFunctions } from './onboarding-functions'
import { createTestProps } from '../../scripts/create-test-props/create-test-props'
import { MockedAppProviders } from '../../mocks/contexts/app/mock'

/*
 * OnboardingScreen FUNCTIONS
 * Keep presentation tests and function/logic tests separate for easier debugging!
 */
describe('OnboardingScreen - functions', () => {
  const props = createTestProps({
    route: {
      name: 'OnboardingScreen',
      params: {
        exampleScreenParam: '1234',
      },
    },
  })

  const { result } = renderHook(() => useOnboardingFunctions(props), { wrapper: MockedAppProviders })
  const { onPressBack } = result.current

  describe('onPressBack', () => {
    it('instructs navigation to go back', () => {
      onPressBack()
      expect(props.navigation.goBack).toHaveBeenCalled()
    })
  })
})

/*
 * OnboardingScreen PRESENTATION
 * Keep presentation tests and function/logic tests separate for easier debugging!
 */
test('OnboardingScreen - presentation', (done) => {
  expect(true).toBeTruthy()
  done()
})
