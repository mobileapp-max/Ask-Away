import React, { memo } from "react"
import {  AddQuestionPresentation } from "./add-question-presentation"
import { AddQuestionProps } from "./add-question-interface"
import { useAddQuestionFunctions } from "./add-question-functions"

export const AddQuestion = memo((props: AddQuestionProps): JSX.Element => {
  const AddQuestionFunctionsResults = useAddQuestionFunctions(props)

  return <AddQuestionPresentation  { ...AddQuestionFunctionsResults } />
})
