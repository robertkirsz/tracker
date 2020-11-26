import styled from 'styled-components'

// import { version } from '../package.json'
const version = '1.1.1'

export default styled.div`
  font-size: 8px;

  &::before {
    content: 'v${version}';
  }
`
