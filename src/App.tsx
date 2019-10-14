/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment, useState } from 'react'
import StylesGlobal from './components/StylesGlobal'
import TypingStatsDisplay from './components/TypingStatsDisplay'
import TypingTextInput from './components/TypingTextInput'
import TypingTextDisplay from './components/TypingTextDisplay'

const App = () => {
  // const chars = useKeysPressed(window, playKeypressSound)
  const [value, setValue] = useState('')
  const targetValue = 'When you spring to an idea, and decide it is truth, without evidence, you blind yourself to other possibilities.\n\tKeep these nutty chicken satay strips in the fridge for a healthy choice when you\'re peckish. The chicken is served with cucumber and sweet chilli sauce.'
  console.log(value)

  return (
    <Fragment>
      <TypingTextInput
        value={value}
        onChange={event => setValue(event.currentTarget.value)}
      />
      <StylesGlobal />
      <TypingStatsDisplay
        // TODO: nope
        chars={[...value].map(char => ({ char, timeStamp: 0 }))}
        targetValue={targetValue}
      />
      <TypingTextDisplay
        value={value}
        targetValue={targetValue}
      />
    </Fragment>
  );
}

export default App;
