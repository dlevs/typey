/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core'
import { Fragment, useRef, useEffect, memo } from 'react'
import styled from '@emotion/styled'
import { isEqual } from 'lodash-es'
import { getTextComparisonMeta } from '../lib/getTextComparisonMeta'

const Paragraph = styled.p`
  /* cursor: text; */
`

const Word = memo(styled.span<{
  cursor: boolean
  error: boolean
}>(({ cursor, error }) =>
  css`
    position: relative;
    display: inline-block;
    margin: 0.5rem 0;

    /* Add a ::before element out of document flow to add a border
       around the word without causing characters to shift position. */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      pointer-events: none;
      /* TODO: transaition works with shorthand here? */
      transition: border-color 0.2s;
      border: 1px solid ${cursor
        ? error
          ? '#f54542'
          : '#03b1fc'
        : 'transparent'
      };
    }
  `
))

const Character = memo(styled.span<{
  cursor: boolean
  error: boolean
  success: boolean
}>(
  ({ cursor, error, success }) => css`
    margin: 0 1px;
    transition: background 0.2s;

    ${cursor && css`
      color: #fff;
      background: #03b1fc;
    `}

    ${success && css`
      color: #000;
      animation: ${keyframes`
        from { color: #03b1fc; }
        to { color: #000; }
      `} 2s;
    `}

    ${error && css`
      color: #fff;
      background: #f54542;
      display: inline-block;
      position: relative;
      animation: ${keyframes`
        0% { transform: translateX(0) scale(1); }
        50% { transform: translateX(-2px) scale(1.1); }
        100% { transform: translateX(0) scale(1); }
      `} 0.2s ease-out;
    `}
  `
))

const charValueMap: { [char: string]: JSX.Element | undefined } = {
  ' ': <Fragment>&nbsp;</Fragment>,
  '\n': <Fragment>⏎</Fragment>,
  '\t': <Fragment>⇨&nbsp;</Fragment>
}

interface Position {
  top: number;
  left: number;
}

const TypingTextDisplay = memo(({
  value,
  targetValue,
  onCursorPositionChanged
}: {
  value: string
  targetValue: string
  onCursorPositionChanged: (position: Position) => void
}) => {
  const paragraphs = getTextComparisonMeta(targetValue, value)
  const cursorRef = useRef(null as null | HTMLTextAreaElement)
  const cursorPosition = useRef({ top: 0, left: 0 })

  useEffect(() => {
    const cursorEl = cursorRef.current

    if (!cursorEl) return

    const { top, left } = cursorEl.getBoundingClientRect()
    const newPosition = {
      top: top + window.scrollY,
      left: left + window.scrollX
    }

    if (!isEqual(newPosition, cursorPosition.current)) {
      onCursorPositionChanged(newPosition)
      cursorPosition.current = newPosition
    }

    requestAnimationFrame(() => {
      cursorEl.scrollIntoView({
        block: 'center'
      })
    })
  })

  return (
    <Fragment>
      {paragraphs.map((paragraph, paragraphIndex) => (
        <Paragraph key={paragraphIndex}>
          {paragraph.words.map((word, wordIndex) => (
            <Word
              key={wordIndex}
              cursor={word.isCurrent}
              error={word.isActive && !word.isMatch}
            >
              {word.chars.map((char, charIndex) => {
                return (
                  <Character
                    key={charIndex}
                    ref={char.isCurrent ? cursorRef : null}
                    cursor={char.isCurrent}
                    error={char.isActive && !char.isMatch}
                    success={char.isActive && char.isMatch}
                  >
                    {charValueMap[char.targetValue] || char.targetValue}
                  </Character>
                )
              })}
            </Word>
          ))}
        </Paragraph>
      ))}
    </Fragment>
  )
})

export default TypingTextDisplay
