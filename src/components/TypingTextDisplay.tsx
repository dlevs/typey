/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core'
import { Fragment, useRef, useEffect, memo } from 'react'
import styled from '@emotion/styled'
import { getTextComparisonMeta } from '../lib/getTextComparisonMeta'

const Paragraph = styled.p`
  /* cursor: text; */
`

const Word = memo(styled.span<{
  cursor: boolean
  error: boolean
  focused: boolean
}>(({ cursor, error, focused }) =>
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
      border: 1px solid ${cursor && focused
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
  focused: boolean
}>(
  ({ cursor, error, success, focused }) => css`
    display: inline-block;
    margin: 0 1px;

    /* Explicitly set line-height and height to be the same.
       This prevents visual glitches with unicode characters like ⏎ and ⇨,
       which may fall back to a different font with larger line-height.
    */
    height: 2.5rem;
    line-height: 2.5rem;

    ${focused && cursor && css`
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
        <Paragraph key={paragraphIndex}>
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
        </Paragraph>
      ))}
    </Fragment>
  )
})

export default TypingTextDisplay
