/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import useKeysPressed, * as keysPressedSelectors from './hooks/useKeysPressed'
import { playKeypressSound } from './lib/audioUtils'
import StylesGlobal from './components/StylesGlobal'
import TypingStatsDisplay from './components/TypingStatsDisplay'
import TypingTextDisplay from './components/TypingTextDisplay'

const App = () => {
  const chars = useKeysPressed(window, playKeypressSound)
  const targetValue = 'When you spring to an idea, and decide it is truth, without evidence, you blind yourself to other possibilities.\n\tKeep these nutty chicken satay strips in the fridge for a healthy choice when you\'re peckish. The chicken is served with cucumber and sweet chilli sauce.'

  return (
    <Fragment>
      <StylesGlobal />
      <TypingStatsDisplay
        chars={chars}
        targetValue={targetValue}
      />
      <TypingTextDisplay
        value={keysPressedSelectors.selectStringValue(chars)}
        targetValue={targetValue}
      />
    </Fragment>
  );
}

export default App;
