import React, { useState } from 'react';
import classnames from 'classnames';
import './App.scss';

const TextDisplay = ({
  value,
  targetValue
}: {
  value: string
  targetValue: string
}) => (
  <div
    className="textDisplay"
  >
    {[...targetValue].map((char, i) => {
      const isInactive = value[i] === undefined
      const isSuccess = !isInactive && char === value[i]

      return (
        <span
          // TODO: Replace "classnames" lib with emotion?
          className={classnames('char', {
            charInactive: isInactive,
            charSuccess: isSuccess,
            charError: !isInactive && !isSuccess,
            charCursor: i === value.length
          })}
        >
          {char}
        </span>
      )
    })}
  </div>
)

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
        targetValue="The fight isn't over until you win it, Fitz. That's all you have to remember. No matter what the other man says."
      />
      <TextInput
        value={textInput}
        onChange={e => setTextInput(e.currentTarget.value)}
      />
    </>
  );
}

export default App;
