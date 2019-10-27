/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useRef, useEffect } from 'react'
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

  // If textarea is pre-populated, selection may be at start of input, not end.
  // Enforce that user selection is always in correct place.
  useEffect(() => {
    const el = inputRef.current

    if (!el) return

    const { length } = el.value

    el.selectionStart = length
    el.selectionEnd = length
  })

  return (
    <TypingTextWrapper
      {...focusProps}
      focused={focused}
      onClick={() => {
        if (
          inputRef.current &&
          inputRef.current !== document.activeElement
        ) {
          inputRef.current.focus({
            preventScroll: true
          })
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
