/** @jsx jsx */
import { jsx, css } from '@emotion/core'
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
  display: inline-block;
  margin: 0.5rem 0;
`

const Character = styled.span<{
  status: 'inactive' | 'cursor' | 'success' | 'error'
}>(
  ({ status }) => css`
    position: relative;
    margin: 0 1px;
    color: ${status === 'cursor'
      ? '#666'
      : status === 'error'
        ? '#fff'
        : status === 'success'
          ? '#000'
          : 'inherit'
    };
    background: ${status === 'cursor'
      ? '#eee'
      : status === 'error'
        ? 'red'
        : 'inherit'
    };
    animation: ${status === 'success' && '2s greenToBlack'};

    @keyframes greenToBlack {
      0% { color: #42f486; }
      100% { color: #000; }
    }
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
