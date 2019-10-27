import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { memo } from 'react';

const Character = memo(styled.span<{
  cursor: boolean;
  error: boolean;
  success: boolean;
  focused: boolean;
}>(({ cursor, error, success, focused }) => css`
  display: inline-block;
  margin: 0 1px;

  /* Explicitly set line-height and height to be the same.
      This prevents visual glitches with unicode characters like ⏎ and ⇨,
      which may fall back to a different font with larger line-height.
  */
  height: 2.5rem;
  line-height: 2.5rem;

  ${focused && cursor && css`
    color: #fff;
    background: #03b1fc;
  `}

  ${success && css`
    color: #000;
    animation: ${keyframes`
      from { color: #03b1fc; }
      to { color: #000; }
    `} 2s;
  `}

  ${error && css`
    color: #fff;
    background: #f54542;
    display: inline-block;
    position: relative;
    animation: ${keyframes`
      0% { transform: translateX(0) scale(1); }
      50% { transform: translateX(-2px) scale(1.1); }
      100% { transform: translateX(0) scale(1); }
    `} 0.2s ease-out;
  `}
`));

export default Character
