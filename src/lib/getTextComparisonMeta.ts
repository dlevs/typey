import { splitInclusive } from './stringUtils';

interface Comparison {
  targetValue: string;
  value: string;
  start: number;
  end: number;
  isCurrent: boolean;
  isActive: boolean;
  isMatch: boolean;
}

const createTextSplitReducer = (entireValue: string) =>
  (entireValueStartOffset: number) =>
    (
      // TODO: Rename args
      accum: Comparison[],
      targetValue: string,
      i: number,
    ) => {
      const prev = accum[i - 1] || { end: entireValueStartOffset }
      const start = prev.end
      const end = start + targetValue.length
      const value = entireValue.substring(start, end)

      accum.push({
        targetValue,
        value,
        start,
        end,
        isActive: !!value,
        isCurrent: start <= entireValue.length && end > entireValue.length,
        isMatch: targetValue.startsWith(value)
      })

      return accum
    }

// TODO: Document and add tests
export const getTextComparisonMeta = (targetValue: string, value: string) => {
  const textSplitReducerFromOffset = createTextSplitReducer(value)

  return splitInclusive(targetValue, '\n')
    .reduce(textSplitReducerFromOffset(0), [])
    .map(paragraph => ({
      ...paragraph,
      words: splitInclusive(paragraph.targetValue, ' ')
        .reduce(textSplitReducerFromOffset(paragraph.start), [])
        .map(word => ({
          ...word,
          chars: [...word.targetValue].reduce(textSplitReducerFromOffset(word.start), [])
        }))
    }))
}
