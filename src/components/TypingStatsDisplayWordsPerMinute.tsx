import React from 'react'
import classnames from 'classnames'
import useKeysPressed, { selectWordsPerMinute } from '../hooks/useKeysPressed'

const TypingStatsDisplayWordsPerMinute = ({ chars }: {
  chars: ReturnType<typeof useKeysPressed>;
}) => {
  const wordsPerMinute = selectWordsPerMinute(chars);
  return (
    <div className={classnames('feedbackDisplay', {
      feedbackDisplayActive: wordsPerMinute > 0
    })}>
      {`${wordsPerMinute} `}
      <abbr title={'Words per minute'}>WPM</abbr>
    </div>
  );
}

export default TypingStatsDisplayWordsPerMinute
