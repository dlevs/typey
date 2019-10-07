/** @jsx jsx */
import { jsx } from '@emotion/core'
import FadeInAndOut from './FadeInOut'

const TypingStatsDisplayWordsPerMinute = ({ wordsPerMinute }: {
  wordsPerMinute: number
}) => {
  return (
    <FadeInAndOut show={wordsPerMinute > 0}>
      {`${wordsPerMinute} `}
      <abbr title={'Words per minute'}>WPM</abbr>
    </FadeInAndOut>
  );
}

export default TypingStatsDisplayWordsPerMinute
