/** @jsx jsx */
import { jsx } from '@emotion/core'
import { StrictMode, useState } from 'react'
import StylesGlobal from './components/StylesGlobal'
import TypingText from './components/TypingText'
import TypingStatsDisplay from './components/TypingStatsDisplay'

const App = () => {
  // const chars = useKeysPressed(window, playKeypressSound)
  const targetValue = 'When you spring to an idea, and decide it is truth, without evidence, you blind yourself to other possibilities.\n\tKeep these nutty chicken satay strips in the fridge for a healthy choice when you\'re peckish. The chicken is served with cucumber and sweet chilli sauce.'
  const [value, setValue] = useState(targetValue.substring(0, 140))

  return (
    <StrictMode>
      <StylesGlobal />
      <TypingStatsDisplay
        // TODO: nope
        chars={[...value].map(char => ({ char, timeStamp: 0 }))}
        targetValue={targetValue}
      />
      <TypingText
        value={value}
        onValueChange={setValue}
        targetValue={targetValue}
      />
    </StrictMode>
  );
}

export default App;
