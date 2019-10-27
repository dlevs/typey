/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useRef } from 'react'
import TypingTextInput from './TypingTextInput'
import TypingTextDisplay from './TypingTextDisplay'
import TypingTextWrapper from './TypingTextWrapper'

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

  return (
    <TypingTextWrapper onClick={() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }}>
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
      />
    </TypingTextWrapper>
  )
}

export default TypingText
