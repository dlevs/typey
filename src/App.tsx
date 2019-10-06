import React, { useState } from 'react';
import classnames from 'classnames';
import './App.scss';
import useEventListener from './hooks/useEventListener';
import { useAutoCallback } from 'hooks.macro';

const ctx = new AudioContext()
const sound = fetch('/audio/9744_28132-hq.mp3')
  .then(response => response.arrayBuffer())
  .then(buffer => ctx.decodeAudioData(buffer))

// TODO: Move.
const playKeypressSound = async () => {
  const sourceNode = ctx.createBufferSource()
  const gainNode = ctx.createGain()

  sourceNode.buffer = await sound
  sourceNode.detune.value = 0 - (200 * (Math.random() * 0.5))
  gainNode.gain.value = 1 - (Math.random() * 0.5)

  sourceNode.connect(gainNode);
  gainNode.connect(ctx.destination);

  sourceNode.start(0);
}

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

const getWords = (str: string) => str.split(/\s+/)

const StatsDisplay = ({
  value,
  targetValue
}: {
  value: string,
  targetValue: string
}) => {
  const words = getWords(value)

  return words.length < 3
    ? null
    : (
      <>
        <StatsDisplayAccuracy
          value={value}
          targetValue={targetValue}
        />
        <StatsDisplayWordsPerMinute
          value={value}
          targetValue={targetValue}
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
  const accuracyPercentage = (numberOfMatches / value.length) * 100

  return <div>{Math.floor(accuracyPercentage)}%</div>
}

const StatsDisplayWordsPerMinute = ({
  value,
  targetValue
}: {
  value: string,
  targetValue: string
}) => {
  // TODO: Record keydown events on document instead of textarea onchange.
  // Store each character in an array with timeStamp for determining which were
  // inputted in last 60 seconds for WPM value.
  // TODO: Calculate words, correct words (incorrect not to count towards wpm?), general accuracy, etc at top level component. Pass down

  // useEffect(() => {

  // }, [words])

  return <div>10 WPM {getWords(value).length}</div>
}

const targetValue = 'The fight isn\'t over until you win it, Fitz. That\'s all you have to remember. No matter what the other man says.\n\tKeep these nutty chicken satay strips in the fridge for a healthy choice when you\'re peckish. The chicken is served with cucumber and sweet chilli sauce.'

interface CharMeta {
  char: string
  timeStamp: number
}

const App: React.FC = () => {
  const [chars, setChars] = useState([] as CharMeta[])
  // const chars = [...textInput].map((char, i) => {

  // })

  useEventListener(window, 'keydown', useAutoCallback(e => {
    e.preventDefault()
    let { key, ctrlKey, altKey, metaKey } = e as KeyboardEvent

    if (ctrlKey || altKey || metaKey) return

    if (key === 'Enter') {
      key = '\n'
    } else if (key === 'Tab') {
      key = '\t'
    }

    if (key === 'Backspace') {
      setChars(prevCars => prevCars.slice(0, -1))
    } else if (key.length === 1) {
      setChars(prevCars => [...prevCars, {
        char: key,
        timeStamp: e.timeStamp
      }])
    }
  }))

  return (
    <>
      {/* <StatsDisplay
        value={textInput}
        targetValue={targetValue}
      /> */}
      <TextDisplay
        value={chars.map(({ char }) => char).join('')}
        targetValue={targetValue}
      />
      {/* <TextInput
        value={textInput}
        onKeyDown={e => {
          playKeypressSound()
          console.log(e)
          setChars(prevChars => {
            // console.log()
          })
          setTextInput(e.currentTarget.value)
        }}
      /> */}
    </>
  );
}

export default App;
