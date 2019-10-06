/** @jsx jsx */
import { jsx } from '@emotion/core'
import useKeysPressed, { selectStringValue } from '../hooks/useKeysPressed'
import TypingStatsDisplayWordsPerMinute from './TypingStatsDisplayWordsPerMinute';
import TypingStatsDisplayAccuracy from './TypingStatsDisplayAccuracy';

const TypingStatsDisplay = ({ chars, targetValue }: {
  chars: ReturnType<typeof useKeysPressed>;
  targetValue: string;
}) => {
  return (
    <>
      <TypingStatsDisplayAccuracy
        value={selectStringValue(chars)}
        targetValue={targetValue}
      />
      <TypingStatsDisplayWordsPerMinute
        chars={chars}
      />
    </>
  );
}

export default TypingStatsDisplay
