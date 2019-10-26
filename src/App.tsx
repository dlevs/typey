/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { StrictMode, useState, useRef } from 'react'
import StylesGlobal from './components/StylesGlobal'
import TypingStatsDisplay from './components/TypingStatsDisplay'
import TypingTextInput from './components/TypingTextInput'
import TypingTextDisplay from './components/TypingTextDisplay'

// TODO: Move me
const TypingTextWrapper = styled.div`
  opacity: 0.7;
  transition: opacity 0.3s;
  font-size: 2rem;
  color: #888;
  max-width: 60rem;
  padding: 2rem;
  font-family: menlo, monospace;
  margin: 0 auto;
  border: 1px solid #999;

  :hover,
  :focus-within {
    opacity: 1;
  }
`

const App = () => {
  // const chars = useKeysPressed(window, playKeypressSound)
  const [value, setValue] = useState('')
  const targetValue = 'When you spring to an idea, and decide it is truth, without evidence, you blind yourself to other possibilities.\n\tKeep these nutty chicken satay strips in the fridge for a healthy choice when you\'re peckish. The chicken is served with cucumber and sweet chilli sauce.'
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 })
  const inputRef = useRef(null as null | HTMLTextAreaElement)

  return (
    <StrictMode>
      <StylesGlobal />
      <TypingStatsDisplay
        // TODO: nope
        chars={[...value].map(char => ({ char, timeStamp: 0 }))}
        targetValue={targetValue}
      />
      <TypingTextWrapper onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }}>
        <TypingTextInput
          value={value}
          ref={inputRef}
          // Set textarea position to browser doesn't try to focus away from cursor
          // on type.
          css={cursorPosition}
          onValueChange={value => {
            setValue(
              value.substring(0, targetValue.length)
            )
          }}
        />
        <TypingTextDisplay
          value={value}
          targetValue={targetValue}
          onCursorPositionChanged={setCursorPosition}
        />
      </TypingTextWrapper>
    </StrictMode>
  );
}

export default App;
