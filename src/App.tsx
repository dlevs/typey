import React from 'react'
import useKeysPressed, * as keysPressedSelectors from './hooks/useKeysPressed'
import { playKeypressSound } from './lib/audioUtils'
import TypingStatsDisplay from './components/TypingStatsDisplay'
import TypingTextDisplay from './components/TypingTextDisplay'
import './App.scss'

const App: React.FC = () => {
  const chars = useKeysPressed(window, playKeypressSound)
  const targetValue = 'The fight isn\'t over until you win it, Fitz. That\'s all you have to remember. No matter what the other man says.\n\tKeep these nutty chicken satay strips in the fridge for a healthy choice when you\'re peckish. The chicken is served with cucumber and sweet chilli sauce.'

  return (
    <>
      <TypingStatsDisplay
        chars={chars}
        targetValue={targetValue}
      />
      <TypingTextDisplay
        value={keysPressedSelectors.selectStringValue(chars)}
        targetValue={targetValue}
      />
    </>
  );
}

export default App;
