import React, { memo } from "react"
import {  AnswerQuestionsPresentation } from "./answer-questions-presentation"
import { AnswerQuestionsProps } from "./answer-questions-interface"
import { useAnswerQuestionsFunctions } from "./answer-questions-functions"

export const AnswerQuestions = memo((props: AnswerQuestionsProps): JSX.Element => {
  const AnswerQuestionsFunctionsResults = useAnswerQuestionsFunctions(props)

  return <AnswerQuestionsPresentation  { ...AnswerQuestionsFunctionsResults } />
})
