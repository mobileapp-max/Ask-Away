import React, { memo } from "react"
import {  ProfilePresentation } from "./profile-presentation"
import { ProfileProps } from "./profile-interface"
import { useProfileFunctions } from "./profile-functions"

export const Profile = memo((props: ProfileProps): JSX.Element => {
  const ProfileFunctionsResults = useProfileFunctions(props)

  return <ProfilePresentation  { ...ProfileFunctionsResults } />
})
