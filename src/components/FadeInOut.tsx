import styled from '@emotion/styled'

const FadeInAndOut = styled.div<{ show: boolean }>`
  opacity: ${({ show }) => show ? 1 : 0};
  transition: opacity 0.3s;
`

export default FadeInAndOut
