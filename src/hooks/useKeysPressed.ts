import { useState } from 'react'
import { createSelector, defaultMemoize } from 'reselect'
import { useAutoCallback } from 'hooks.macro';
import useEventListener from './useEventListener';

const ONE_MINUTE_IN_MS = 60 * 1000

interface CharMeta {
  char: string
  timeStamp: number
}

interface WordMeta {
  word: string
  timeStamp: number
}

const useKeysPressed = (
  target: EventTarget,
  onChangeCallback?: (char: string) => void
) => {
  const [chars, setChars] = useState([] as CharMeta[])

  useEventListener(target, 'keydown', useAutoCallback(e => {
    let { key, ctrlKey, altKey, metaKey } = e as KeyboardEvent
    let editCallback

    if (ctrlKey || altKey || metaKey) return

    if (key === 'Enter') {
      key = '\n'
    } else if (key === 'Tab') {
      key = '\t'
    }

    if (key === 'Backspace') {
      editCallback = (prevCars: CharMeta[]) => prevCars.slice(0, -1)
    } else if (key.length === 1) {
      editCallback = (prevCars: CharMeta[]) => [...prevCars, {
        char: key,
        timeStamp: e.timeStamp
      }]
    }

    if (editCallback) {
      e.preventDefault()
      setChars(editCallback)

      if (onChangeCallback) {
        onChangeCallback(key)
      }
    }
  }))

  return chars
}

export const selectStringValue = defaultMemoize(
  (chars: CharMeta[]) => chars.map(({ char }) => char).join('')
)

export const selectWords = defaultMemoize(
  (chars: CharMeta[]) => chars
    .reduce((words, { char, timeStamp }) => {
      const isWhitespace = /^\s$/.test(char)
      if (isWhitespace || words.length === 0) {
        words.push({ word: '', timeStamp })
      }

      if (!isWhitespace) {
        const lastWord = words[words.length - 1]
        lastWord.word += char
        lastWord.timeStamp = timeStamp
      }

      return words
    }, [] as WordMeta[])
    // Do not count multiple whitespace characters in a row as a "word".
    .filter(({ word }) => word !== '')
)

export const selectWordsPerMinute = createSelector(
  [selectWords],
  words => {
    if (words.length < 3) return 0
    const lastWordTimeStamp = words[words.length - 1].timeStamp
    const wordsInLastMinute = words.filter(({ timeStamp }) => {
      return lastWordTimeStamp - timeStamp <= ONE_MINUTE_IN_MS
    })
    const firstWordTimeStamp = wordsInLastMinute[0].timeStamp
    const range = lastWordTimeStamp - firstWordTimeStamp
    const modifier = range === 0
      ? 0
      : ONE_MINUTE_IN_MS / range

    return Math.floor(wordsInLastMinute.length * modifier)
  }
)

export default useKeysPressed
