import styled from '@emotion/styled';

const TypingTextWrapper = styled.div`
  opacity: 0.7;
  transition: opacity 0.3s;
  font-size: 2rem;
  line-height: normal;
  color: #888;
  max-width: 60rem;
  padding: 2rem;
  font-family: menlo, monospace;
  margin: 0 auto;
  border: 1px solid #999;

  :hover,
  :focus-within {
    opacity: 1;
  }
`;

export default TypingTextWrapper
