/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core'
import { Fragment } from 'react'
import styled from '@emotion/styled'

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
    border: 1px solid ${cursor
      ? error
        ? '#f54542'
        : '#03b1fc'
      : 'transparent'
    };
  `
)

const styleCharacterStatusMap = {
  inactive: css``,
  cursor: css`
    color: #fff;
    background: #03b1fc;
    border-color: #03b1fc;
  `,
  success: css`
    color: #000;
    animation: ${keyframes`
      from { color: #03b1fc; }
      to { color: #000; }
    `} 2s;
  `,
  error: css`
    color: #fff;
    background: #f54542;
    border-color: #f54542;
    display: inline-block;
    position: relative;
    animation: ${keyframes`
      0% { transform: translateX(0) scale(1); }
      50% { transform: translateX(-2px) scale(1.1); }
      100% { transform: translateX(0) scale(1); }
    `} 0.2s ease-out;
  `,
}

const Character = styled.span<{
  status: 'inactive' | 'cursor' | 'success' | 'error'
}>(
  ({ status }) => css`
    border-width: 0 1px;
    border-style: solid;
    border-color: transparent;

    ${styleCharacterStatusMap[status]};
  `
)

// TODO: Rename
interface TextSplitRecord {
  targetValue: string;
  value: string;
  start: number;
  end: number;
  isCurrent: boolean;
  isActive: boolean;
  isMatch: boolean;
}

// TODO: Move
const splitAndKeep = (str: string, char: string) => {
  return str
    .split(char)
    .map((value, i, array) => {
      return i < array.length - 1
        ? `${value}${char}`
        : value
    })
}

const createTextSplitReducer = (entireValue: string) =>
  (entireValueStartOffset: number) =>
    (
      // TODO: Rename args
      accum: TextSplitRecord[],
      targetValue: string,
      i: number,
    ) => {
      const prev = accum[i - 1] || { end: entireValueStartOffset }
      const start = prev.end
      const end = start + targetValue.length
      const value = entireValue.substring(start, end)

      accum.push({
        targetValue,
        value,
        start,
        end,
        isActive: !!value,
        isCurrent: start <= entireValue.length && end > entireValue.length,
        isMatch: targetValue.startsWith(value)
      })

      return accum
    }

const getTypingMeta = (targetValue: string, value: string) => {
  const textSplitReducerFromOffset = createTextSplitReducer(value)

  return splitAndKeep(targetValue, '\n')
    .reduce(textSplitReducerFromOffset(0), [])
    .map(paragraph => ({
      ...paragraph,
      words: splitAndKeep(paragraph.targetValue, ' ')
        .reduce(textSplitReducerFromOffset(paragraph.start), [])
        .map(word => ({
          ...word,
          chars: [...word.targetValue].reduce(textSplitReducerFromOffset(word.start), [])
        }))
    }))
}

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
  const paragraphs = getTypingMeta(targetValue, value)

  return (
    <Layout>
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p key={paragraphIndex}>
          {paragraph.words.map((word, wordIndex) => (
            <Word
              key={wordIndex}
              // TODO: It's odd to have cursor be a boolean here, and part of single
              // string status for Character component. Make consistent.
              cursor={word.isCurrent}
              error={!word.isMatch}
            >
              {word.chars.map((char, charIndex) => {
                return (
                  <Character
                    key={charIndex}
                    status={
                      char.isCurrent
                        ? 'cursor'
                        : !char.isActive
                          ? 'inactive'
                          : char.isMatch
                            ? 'success'
                            : 'error'
                    }
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
