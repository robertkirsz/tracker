import * as React from 'react'
import { render } from '@testing-library/react'
import { expect } from 'chai'

import type { Data } from './database'

import App from './App'

const getData = (): Data => ({
  '🍺': {
    id: '🍺',
    name: undefined,
    emoji: '🍺',
    dates: {},
  },
  '🍔': {
    id: '🍔',
    name: undefined,
    emoji: '🍔',
    dates: {},
  },
})

describe('<App />', () => {
  it('Renders timelines', () => {
    const { getByText } = render(<App getData={getData} />)

    const beerEmoji = getByText('🍺')
    const burgerEmoji = getByText('🍔')

    expect(document.body.contains(beerEmoji))
    expect(document.body.contains(burgerEmoji))
  })
})
