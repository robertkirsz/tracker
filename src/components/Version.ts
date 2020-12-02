import styled from 'styled-components'

import { version } from '../../package.json'

export default styled.div`
  font-size: 8px;

  &::before {
    content: 'v${version}';
  }
`
