import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { memo } from 'react';

const Word = memo(styled.span<{
  cursor: boolean;
  error: boolean;
  focused: boolean;
}>(({ cursor, error, focused }) => css`
  position: relative;
  display: inline-block;
  margin: 0.5rem 0;

  /* Add a ::before element out of document flow to add a border
      around the word without causing characters to shift position. */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    pointer-events: none;
    border: 1px solid ${cursor && focused
  ? error
    ? '#f54542'
    : '#03b1fc'
  : 'transparent'};
  }
`));

export default Word
