/*
* Storybooks are our way to quickly view our components in isolation.
* Use this file to render all your presets & expected variations of props.
* This should help you quickly visualize how your code affects the way that your component is used. 
*/

import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../storybook/views"
import { CharacterLimit } from "./character-limit"

storiesOf("Components", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("CharacterLimit", () => (
    <Story>
      <UseCase data={[{title: 'Hello', text: 'World!'}]} preset="default" usage="No presets selected, therefore using default.">
        <CharacterLimit />
      </UseCase>
      <UseCase data={[{title: 'Hello', text: 'World!'}]} preset="darkMode" usage="The secondary preset.">
        <CharacterLimit preset='secondary' />
      </UseCase>
    </Story>
  ))
