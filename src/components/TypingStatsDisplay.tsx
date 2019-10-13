/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react';
import useKeysPressed, {
  selectStringValue,
  selectWordsPerMinute
} from '../hooks/useKeysPressed'
import TypingStatsDisplayWordsPerMinute from './TypingStatsDisplayWordsPerMinute';
import TypingStatsDisplayAccuracy from './TypingStatsDisplayAccuracy';

const TypingStatsDisplay = ({ chars, targetValue }: {
  chars: ReturnType<typeof useKeysPressed>;
  targetValue: string;
}) => {
  return (
    <Fragment>
      <TypingStatsDisplayAccuracy
        value={selectStringValue(chars)}
        targetValue={targetValue}
      />
      <TypingStatsDisplayWordsPerMinute
        wordsPerMinute={selectWordsPerMinute(chars)}
      />
    </Fragment>
  );
}

export default TypingStatsDisplay
