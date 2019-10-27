import { css } from '@emotion/core';
import styled from '@emotion/styled';

const TypingTextWrapper = styled.div<{
  focused: boolean
}>(({ focused }) => css`
  opacity: ${focused ? 1 : 0.7};
  transition: opacity 0.3s;
  font-size: 2rem;
  line-height: normal;
  color: #888;
  max-width: 60rem;
  padding: 0 2rem;
  font-family: menlo, monospace;
  margin: 0 auto;
  border: 1px solid ${focused ? '#000' : '#999'};
  cursor: text;

  :hover {
    opacity: 1;
  }
`);

export default TypingTextWrapper
