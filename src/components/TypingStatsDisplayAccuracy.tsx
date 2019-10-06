import React from 'react'
import classnames from 'classnames'

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
    // TODO: Use CSS modules here
    <div className={classnames('feedbackDisplay', {
      feedbackDisplayActive: value.length > 0
    })}>
      {Math.floor(accuracyPercentage)}%
    </div>
  );
}

export default TypingStatsDisplayAccuracy
