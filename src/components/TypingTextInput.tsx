/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { HTMLProps, forwardRef } from 'react'
import { playKeypressSound } from '../lib/audioUtils'
import { visuallyHidden } from '../lib/utilityStyles'

type Props = HTMLProps<HTMLTextAreaElement> & {
  onValueChange: (value: string) => void
}

const TypingTextInput = forwardRef<HTMLTextAreaElement, Props>(({
  value,
  onValueChange,
  ...rest
}, ref) => {
  return (
    <textarea
      {...rest}
      ref={ref}
      autoFocus
      value={value}
      wrap='off'
      autoCorrect='off'
      autoCapitalize='off'
      autoComplete='off'
      spellCheck={false}
      css={[visuallyHidden, css`
        position: fixed;
        /* Put input in middle of screen to prevent scroll jumping when focusing. */
        top: 50%;
      `]}
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
