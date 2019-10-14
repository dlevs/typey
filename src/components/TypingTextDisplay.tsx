/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core'
import { Fragment } from 'react'
import styled from '@emotion/styled'
import { getTextComparisonMeta } from '../lib/getTextComparisonMeta'

const Layout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  font-size: 2rem;
  color: #888;
  max-width: 60rem;
  padding: 2rem;
  font-family: menlo, monospace;
  margin: 0 auto;
  overflow: auto;
`

const Word = styled.span<{
  cursor: boolean
  error: boolean
}>(({ cursor, error }) =>
  css`
    position: relative;
    display: inline-block;
    margin: 0.5rem 0;
    outline-color: ${cursor
      ? error
        ? '#f54542'
        : '#03b1fc'
      : 'transparent'
    };
    outline-width: 1px;
    outline-style: solid;
    outline-offset: -1px;
    transition: outline-color 0.2s;
  `
)

const Character = styled.span<{
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
)

const charValueMap: { [char: string]: JSX.Element | undefined } = {
  ' ': <Fragment>&nbsp;</Fragment>,
  '\n': <Fragment>⏎</Fragment>,
  '\t': <Fragment>⇨&nbsp;</Fragment>
}

const TypingTextDisplay = ({
  value,
  targetValue
}: {
  value: string
  targetValue: string
}) => {
  const paragraphs = getTextComparisonMeta(targetValue, value)

  return (
    <Layout>
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p key={paragraphIndex}>
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
        </p>
      ))}
    </Layout>
  )
}

export default TypingTextDisplay
