import React from 'react'
import classnames from 'classnames'
import useKeysPressed, * as keysPressedSelectors from './hooks/useKeysPressed'
import { playKeypressSound } from './lib/audioUtils'
import './App.scss'

const TextDisplay = ({
  value,
  targetValue
}: {
  value: string
  targetValue: string
}) => {
  let indexCount = 0

  return (
    <div
      className="textDisplay"
    >
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
                    <span className="word" key={wordIndex}>
                      {chars.map(char => {
                        const i = indexCount++
                        const isInactive = value[i] === undefined
                        const isSuccess = !isInactive && char === value[i]

                        return (
                          <span
                            key={i}
                            // TODO: Replace "classnames" lib with emotion?
                            className={classnames('char', {
                              charInactive: isInactive,
                              charSuccess: isSuccess,
                              charError: !isInactive && !isSuccess,
                              charCursor: i === value.length
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

const StatsDisplay = ({
  chars,
  targetValue
}: {
  chars: ReturnType<typeof useKeysPressed>,
  targetValue: string
}) => {
  return (
    <>
      <StatsDisplayAccuracy
        value={keysPressedSelectors.selectStringValue(chars)}
        targetValue={targetValue}
      />
      <StatsDisplayWordsPerMinute
        chars={chars}
      />
    </>
  )
}

const StatsDisplayAccuracy = ({
  value,
  targetValue
}: {
  value: string,
  targetValue: string
}) => {
  const numberOfMatches = [...value]
    .map((char, i) => char === targetValue[i])
    .filter(Boolean)
    .length
  const accuracyPercentage = !value.length
    ? 100
    : (numberOfMatches / value.length) * 100

  return (
    <div className={classnames('feedbackDisplay', {
      feedbackDisplayActive: value.length > 0
    })}>
      {Math.floor(accuracyPercentage)}%
    </div>
  )
}

const StatsDisplayWordsPerMinute = ({
  chars
}: {
  chars: ReturnType<typeof useKeysPressed>
}) => {
  const wordsPerMinute = keysPressedSelectors.selectWordsPerMinute(chars)

  return (
    <div className={classnames('feedbackDisplay', {
      feedbackDisplayActive: wordsPerMinute > 0
    })}>
      {`${wordsPerMinute} `}
      <abbr title={'Words per minute'}>WPM</abbr>
    </div>
  )
}

const App: React.FC = () => {
  const chars = useKeysPressed(window, playKeypressSound)
  const targetValue = 'The fight isn\'t over until you win it, Fitz. That\'s all you have to remember. No matter what the other man says.\n\tKeep these nutty chicken satay strips in the fridge for a healthy choice when you\'re peckish. The chicken is served with cucumber and sweet chilli sauce.'

  return (
    <>
      <StatsDisplay
        chars={chars}
        targetValue={targetValue}
      />
      <TextDisplay
        value={keysPressedSelectors.selectStringValue(chars)}
        targetValue={targetValue}
      />
    </>
  );
}

export default App;
