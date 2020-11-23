import styled from 'styled-components'

// import { version } from '../package.json'
const version = '1.0.2'

export default styled.div`
  font-size: 8px;

  &::before {
    content: 'v${version}';
  }
`
