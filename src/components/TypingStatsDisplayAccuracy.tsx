/** @jsx jsx */
import { jsx } from '@emotion/core'
import FadeInAndOut from './FadeInOut'

const TypingStatsDisplayAccuracy = ({ value, targetValue }: {
  value: string;
  targetValue: string;
}) => {
  const numberOfMatches = [...value]
    .map((char, i) => char === targetValue[i])
    .filter(Boolean)
    .length;
  const accuracyPercentage = !value.length
    ? 100
    : (numberOfMatches / value.length) * 100;

  return (
    <FadeInAndOut show={value.length > 0}>
      {Math.floor(accuracyPercentage)}%
    </FadeInAndOut>
  );
}

export default TypingStatsDisplayAccuracy
