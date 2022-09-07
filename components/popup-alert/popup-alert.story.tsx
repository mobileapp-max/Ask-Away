/*
* Storybooks is our way to quickly test our components in isolation.
* Use this file to render all your presets and expected variations of props
* This should help you quickly visualize how your code affects all different ways a component may be used. 
*/
import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../storybook/views"
import { PopupAlert } from "./popup-alert"

storiesOf("Components", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("PopupAlert", () => (
    <Story>
      <UseCase text="Default" usage="No presets selected, therefore using default.">
        <PopupAlert />
      </UseCase>
      <UseCase text="Secondary" usage="The secondary preset.">
        <PopupAlert preset='secondary' />
      </UseCase>
    </Story>
  ))
