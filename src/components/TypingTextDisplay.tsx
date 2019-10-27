/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment, useRef, useEffect, memo } from 'react'
import { getTextComparisonMeta } from '../lib/getTextComparisonMeta'
import Word from './TypingTextDisplayWord'
import Character from './TypingTextDisplayCharacter'

const charValueMap: { [char: string]: JSX.Element | undefined } = {
  ' ': <Fragment>&nbsp;</Fragment>,
  '\n': <Fragment>⏎</Fragment>,
  '\t': <Fragment>⇨&nbsp;</Fragment>
}

const TypingTextDisplay = memo(({
  value,
  targetValue,
  focused
}: {
  value: string
  targetValue: string
  focused: boolean
}) => {
  const paragraphs = getTextComparisonMeta(targetValue, value)
  const cursorRef = useRef(null as null | HTMLTextAreaElement)

  useEffect(() => {
    requestAnimationFrame(() => {
      if (cursorRef.current) {
        cursorRef.current.scrollIntoView({
          block: 'center'
        })
      }
    })
  })

  return (
    <Fragment>
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p key={paragraphIndex}>
          {paragraph.words.map((word, wordIndex) => (
            <Word
              key={wordIndex}
              cursor={word.isCurrent}
              error={word.isActive && !word.isMatch}
              focused={focused}
            >
              {word.chars.map((char, charIndex) => {
                return (
                  <Character
                    key={charIndex}
                    ref={char.isCurrent ? cursorRef : null}
                    cursor={char.isCurrent}
                    error={char.isActive && !char.isMatch}
                    success={char.isActive && char.isMatch}
                    focused={focused}
                  >
                    {charValueMap[char.targetValue] || char.targetValue}
                  </Character>
                )
              })}
            </Word>
          ))}
        </p>
      ))}
    </Fragment>
  )
})

export default TypingTextDisplay
