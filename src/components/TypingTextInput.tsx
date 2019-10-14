/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useRef, HTMLProps } from 'react'
import * as styles from '../lib/utilityStyles'
import { playKeypressSound } from '../lib/audioUtils'

const TypingTextInput = ({
  value,
  onChange
}: HTMLProps<HTMLTextAreaElement>) => {
  const textAreaRef = useRef(null as null | HTMLTextAreaElement);

  return (
    <textarea
      css={[styles.visuallyHidden, {
        // Prevent page from scrolling when field is focused
        position: 'fixed',
        top: 0
      }]}
      autoFocus
      ref={textAreaRef}
      value={value}
      onChange={event => {
        if (onChange) {
          onChange(event)
        }
        playKeypressSound()
      }}
      onBlur={() => {
        requestAnimationFrame(() => {
          if (textAreaRef.current) {
            textAreaRef.current.focus()
          }
        })
      }}
    />
  )
}

export default TypingTextInput
