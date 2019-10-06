/** @jsx jsx */
import { jsx } from '@emotion/core'
import useKeysPressed, { selectWordsPerMinute } from '../hooks/useKeysPressed'
import FadeInAndOut from './FadeInOut'

const TypingStatsDisplayWordsPerMinute = ({ chars }: {
  chars: ReturnType<typeof useKeysPressed>;
}) => {
  const wordsPerMinute = selectWordsPerMinute(chars);
  return (
    <FadeInAndOut show={wordsPerMinute > 0}>
      {`${wordsPerMinute} `}
      <abbr title={'Words per minute'}>WPM</abbr>
    </FadeInAndOut>
  );
}

export default TypingStatsDisplayWordsPerMinute
