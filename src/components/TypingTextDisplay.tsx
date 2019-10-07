/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core'
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

const Word = styled.span`
  position: relative;
  display: inline-block;
  margin: 0.5rem 0;
`

const styleCharacterStatusMap = {
  inactive: css``,
  cursor: css`
    color: #fff;
    background: #03b1fc;

    /* Border around word */
    &::before {
      content: "";
      position: absolute;
      top: -1px;
      bottom: -1px;
      left: 0;
      right: 0;
      z-index: -1;
      border: 1px solid #03b1fc;
      opacity: 0.4;
    }
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
    margin: 0 1px;
    ${styleCharacterStatusMap[status]};
  `
)

const TypingTextDisplay = ({
  value,
  targetValue
}: {
  value: string
  targetValue: string
}) => {
  let indexCount = 0

  return (
    <Layout>
      {targetValue
        .split('\n')
        .map((paragraph, paragraphIndex, paragraphs) => {
          const isLastParagraph = paragraphIndex === paragraphs.length - 1

          return (
            <p key={paragraphIndex}>
              {paragraph
                .split(' ')
                .map((word, wordIndex, words) => {
                  const isLastWord = wordIndex === words.length - 1
                  const chars = [...word]
                  const additionalChar = isLastParagraph && isLastWord
                    ? null
                    : isLastWord
                      ? '\n'
                      : ' '

                  if (additionalChar) {
                    chars.push(additionalChar)
                  }

                  return (
                    <Word key={wordIndex}>
                      {chars.map(char => {
                        const i = indexCount++

                        return (
                          <Character
                            key={i}
                            status={
                              i === value.length
                                ? 'cursor'
                                : value[i] == null
                                  ? 'inactive'
                                  : char === value[i]
                                    ? 'success'
                                    : 'error'
                            }
                          >
                            {char === ' '
                                ? <>&nbsp;</>
                                : char === '\n'
                                  ? '⏎'
                                  : char === '\t'
                                    ? <>⇨&nbsp;</>
                                    : char
                            }
                          </Character>
                        )
                      })}
                    </Word>
                  )
                })}
            </p>
          )
        })
      }
    </Layout>
  )
}

export default TypingTextDisplay
