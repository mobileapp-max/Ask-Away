import { renderHook } from '@testing-library/react-native'
import { useProfileFunctions } from './profile-functions'
import { createTestProps } from '../../scripts/create-test-props/create-test-props'
import { MockedAppProviders } from '../../mocks/contexts/app/mock'

/*
 * ProfileScreen FUNCTIONS
 * Keep presentation tests and function/logic tests separate for easier debugging!
 */
describe('ProfileScreen - functions', () => {
  const props = createTestProps({
    route: {
      name: 'ProfileScreen',
      params: {
        exampleScreenParam: '1234',
      },
    },
  })

  const { result } = renderHook(() => useProfileFunctions(props), { wrapper: MockedAppProviders })
  const { onPressBack } = result.current

  describe('onPressBack', () => {
    it('instructs navigation to go back', () => {
      onPressBack()
      expect(props.navigation.goBack).toHaveBeenCalled()
    })
  })
})

/*
 * ProfileScreen PRESENTATION
 * Keep presentation tests and function/logic tests separate for easier debugging!
 */
test('ProfileScreen - presentation', (done) => {
  expect(true).toBeTruthy()
  done()
})
