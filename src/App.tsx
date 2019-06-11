import React, { useState } from 'react';
import classnames from 'classnames';
import './App.scss';

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

const TextInput = ({
  value,
  onChange
}: React.HTMLProps<HTMLTextAreaElement>) => (
  <textarea
    autoFocus
    className="textInput"
    value={value}
    onChange={onChange}
  />
)

const App: React.FC = () => {
  const [textInput, setTextInput] = useState('')
  return (
    <>
      <TextDisplay
        value={textInput}
        targetValue={'The fight isn\'t over until you win it, Fitz. That\'s all you have to remember. No matter what the other man says.\nKeep these nutty chicken satay strips in the fridge for a healthy choice when you\'re peckish. The chicken is served with cucumber and sweet chilli sauce.'}
      />
      <TextInput
        value={textInput}
        onChange={e => setTextInput(e.currentTarget.value)}
      />
    </>
  );
}

export default App;
