import { renderHook } from '@testing-library/react-native'
import { useAddQuestionFunctions } from './add-question-functions'
import { createTestProps } from '../../scripts/create-test-props/create-test-props'
import { MockedAppProviders } from '../../mocks/contexts/app/mock'

/*
 * AddQuestionScreen FUNCTIONS
 * Keep presentation tests and function/logic tests separate for easier debugging!
 */
describe('AddQuestionScreen - functions', () => {
  const props = createTestProps({
    route: {
      name: 'AddQuestionScreen',
      params: {
        exampleScreenParam: '1234',
      },
    },
  })

  const { result } = renderHook(() => useAddQuestionFunctions(props), { wrapper: MockedAppProviders })
  const { onPressBack } = result.current

  describe('onPressBack', () => {
    it('instructs navigation to go back', () => {
      onPressBack()
      expect(props.navigation.goBack).toHaveBeenCalled()
    })
  })
})

/*
 * AddQuestionScreen PRESENTATION
 * Keep presentation tests and function/logic tests separate for easier debugging!
 */
test('AddQuestionScreen - presentation', (done) => {
  expect(true).toBeTruthy()
  done()
})
