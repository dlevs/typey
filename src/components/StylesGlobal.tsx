/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core'

const StylesGlobal = () =>
  <Global styles={css`
    *, *::before, *::after {
      box-sizing: border-box;
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
    }
  `} />

export default StylesGlobal
