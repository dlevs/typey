import React, { useState } from 'react';
import './App.css';

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
      const className = value[i] === undefined
        ? 'charInactive'
        : char === value[i]
          ? 'charSuccess'
          : 'charError'

      return (
        <span
          className={`char ${className}`}
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
