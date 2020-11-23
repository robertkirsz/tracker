import styled from 'styled-components'

// import { version } from '../package.json'
const version = '1.0.1'

export default styled.span`
  position: absolute;
  left: 8px;
  bottom: 8px;

  font-size: 8px;

  &::before {
    content: 'v${version}';
  }
`
