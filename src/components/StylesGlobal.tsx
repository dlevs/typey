/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core'

const textHighlight = css`
  color: #fff;
  background: #888;
`

const StylesGlobal = () =>
  <Global styles={css`
    *, *::before, *::after {
      box-sizing: border-box;
    }

    ::-moz-selection {
      ${textHighlight}
    }
    ::selection {
      ${textHighlight}
    }

    html,
    body,
    #root {
      margin: 0;
      width: 100%;
      height: 100%;
    }

    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      scroll-behavior: smooth;
    }
  `} />

export default StylesGlobal
