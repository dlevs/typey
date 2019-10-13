import { splitInclusive } from './stringUtils';

describe('splitInclusive()', () => {
  test('splits strings as expected', () => {
    expect(splitInclusive('1 2 3 4', ' ')).toEqual(['1 ', '2 ', '3 ', '4'])
    expect(splitInclusive('1 2 3 4 ', ' ')).toEqual(['1 ', '2 ', '3 ', '4 '])
    expect(splitInclusive('--some-text', '-')).toEqual(['-', '-', 'some-', 'text'])
  })

  test('doesn\'t maintain empty strings if delimiter is at the end', () => {
    expect(splitInclusive('22--', '-')).toEqual(['22-', '-'])
    expect(splitInclusive('--', '-')).toEqual(['-', '-'])
  })
})
