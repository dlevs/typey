/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import classnames from 'classnames'

const TypingTextDisplay = ({
  value,
  targetValue
}: {
  value: string
  targetValue: string
}) => {
  let indexCount = 0

  return (
    <div className={s.layout}>
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
                    <span className={s.word} key={wordIndex}>
                      {chars.map(char => {
                        const i = indexCount++
                        const isInactive = value[i] === undefined
                        const isSuccess = !isInactive && char === value[i]

                        return (
                          <span
                            key={i}
                            // TODO: Replace "classnames" lib with emotion?
                            className={classnames(s.char, {
                              [s.charInactive]: isInactive,
                              [s.charSuccess]: isSuccess,
                              [s.charError]: !isInactive && !isSuccess,
                              [s.charCursor]: i === value.length
                            })}
                          >
                            {char === ' '
                              ? <>&nbsp;</>
                              : char === '\n'
                                ? '⏎'
                                : char === '\t'
                                  ? <>⇨&nbsp;</>
                                  : char
                            }
                          </span>
                        )
                      })}
                    </span>
                  )
                })}
            </p>
          )
        })
      }
    </div>
  )
}

export default TypingTextDisplay
