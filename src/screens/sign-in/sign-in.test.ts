import { renderHook } from '@testing-library/react-native'
import { useSignInFunctions } from './sign-in-functions'
import { createTestProps } from '../../scripts/create-test-props/create-test-props'
import { MockedAppProviders } from '../../mocks/contexts/app/mock'

/*
 * SignInScreen FUNCTIONS
 * Keep presentation tests and function/logic tests separate for easier debugging!
 */
describe('SignInScreen - functions', () => {
  const props = createTestProps({
    route: {
      name: 'SignInScreen',
      params: {
        exampleScreenParam: '1234',
      },
    },
  })

  const { result } = renderHook(() => useSignInFunctions(props), { wrapper: MockedAppProviders })
  const { onPressBack } = result.current

  describe('onPressBack', () => {
    it('instructs navigation to go back', () => {
      onPressBack()
      expect(props.navigation.goBack).toHaveBeenCalled()
    })
  })
})

/*
 * SignInScreen PRESENTATION
 * Keep presentation tests and function/logic tests separate for easier debugging!
 */
test('SignInScreen - presentation', (done) => {
  expect(true).toBeTruthy()
  done()
})
