/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useRef } from 'react'
import TypingTextInput from './TypingTextInput'
import TypingTextDisplay from './TypingTextDisplay'
import TypingTextWrapper from './TypingTextWrapper'
import useFocusState from '../hooks/useFocusState'

const TypingText = ({
  targetValue,
  value,
  onValueChange
}: {
  targetValue: string
  value: string
  onValueChange: (value: string) => void
}) => {
  const inputRef = useRef(null as null | HTMLTextAreaElement)
  const { focused, ...focusProps } = useFocusState()

  return (
    <TypingTextWrapper
      {...focusProps}
      focused={focused}
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }}
    >
      <TypingTextInput
        value={value}
        ref={inputRef}
        onValueChange={value => {
          onValueChange(
            value.substring(0, targetValue.length)
          )
        }}
      />
      <TypingTextDisplay
        value={value}
        targetValue={targetValue}
        focused={focused}
      />
    </TypingTextWrapper>
  )
}

export default TypingText
