import React, { memo } from "react"
import {  SignInPresentation } from "./sign-in-presentation"
import { SignInProps } from "./sign-in-interface"
import { useSignInFunctions } from "./sign-in-functions"

export const SignIn = memo((props: SignInProps): JSX.Element => {
  const SignInFunctionsResults = useSignInFunctions(props)

  return <SignInPresentation  { ...SignInFunctionsResults } />
})
