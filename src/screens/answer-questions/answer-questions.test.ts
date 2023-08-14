import { renderHook } from '@testing-library/react-native'
import { useAnswerQuestionsFunctions } from './answer-questions-functions'
import { createTestProps } from '../../scripts/create-test-props/create-test-props'
import { MockedAppProviders } from '../../mocks/contexts/app/mock'

/*
 * AnswerQuestionsScreen FUNCTIONS
 * Keep presentation tests and function/logic tests separate for easier debugging!
 */
describe('AnswerQuestionsScreen - functions', () => {
  const props = createTestProps({
    route: {
      name: 'AnswerQuestionsScreen',
      params: {
        exampleScreenParam: '1234',
      },
    },
  })

  const { result } = renderHook(() => useAnswerQuestionsFunctions(props), { wrapper: MockedAppProviders })
  const { onPressBack } = result.current

  describe('onPressBack', () => {
    it('instructs navigation to go back', () => {
      onPressBack()
      expect(props.navigation.goBack).toHaveBeenCalled()
    })
  })
})

/*
 * AnswerQuestionsScreen PRESENTATION
 * Keep presentation tests and function/logic tests separate for easier debugging!
 */
test('AnswerQuestionsScreen - presentation', (done) => {
  expect(true).toBeTruthy()
  done()
})
