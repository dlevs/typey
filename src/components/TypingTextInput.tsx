/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { HTMLProps, forwardRef } from 'react'
import { playKeypressSound } from '../lib/audioUtils'

// Textarea styling and behaviour uses same approach as monaco editor.
// https://microsoft.github.io/monaco-editor/
const OnePixelTextarea = styled.textarea`
  min-width: 0;
  min-height: 0;
  margin: 0;
  padding: 0;
  position: absolute;
  outline: none;
  resize: none;
  border: none;
  overflow: hidden;
  color: transparent;
  background-color: transparent;
  font-size: 1px;
  line-height: 1rem;
  width: 1px;
  height: 1px;
`

type Props = HTMLProps<HTMLTextAreaElement> & {
  onValueChange: (value: string) => void
}

const TypingTextInput = forwardRef<HTMLTextAreaElement, Props>(({
  value,
  onValueChange,
  ...rest
}, ref) => {
  return (
    <OnePixelTextarea
      {...rest}
      ref={ref}
      autoFocus
      value={value}
      wrap='off'
      autoCorrect='off'
      autoCapitalize='off'
      autoComplete='off'
      spellCheck={false}
      onKeyDown={event => {
        const isTab = event.key === 'Tab'

        // User can use autocorrect on phone and whatever other input method
        // they want. But restrict some actions that make no sense in the
        // context of a typing speed input.
        if (
          // Don't focus next element
          isTab ||
          // Can't go back / up
          event.key.startsWith('Arrow') ||
          // No selecting all text
          ((event.metaKey || event.shiftKey) && event.key.toUpperCase() === 'A')
        ) {
          event.preventDefault()
        }

        if (isTab && onValueChange) {
          onValueChange(event.currentTarget.value + '\t')
        }
      }}
      onChange={event => {
        if (onValueChange) {
          onValueChange(event.currentTarget.value)
        }
        playKeypressSound()
      }}
    />
  )
})

export default TypingTextInput
