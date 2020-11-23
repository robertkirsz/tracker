import * as React from 'react'
import { render } from '@testing-library/react'
import { expect } from 'chai'

import type { DatabaseInterface } from './database'

import App from './App'

const getDatabase = (): DatabaseInterface => ({
  timelines: [
    {
      id: '0',
      description: 'Drank beer',
      emoji: '🍺',
      dates: {},
    },
    {
      id: '1',
      description: 'Ate burger',
      emoji: '🍔',
      dates: {},
    },
  ],
})

describe('<App />', () => {
  it('Renders timelines', () => {
    const { getByText } = render(<App getDatabase={getDatabase} />)

    expect(document.body.contains(getByText('🍺')))
    expect(document.body.contains(getByText('Drank beer')))
    expect(document.body.contains(getByText('🍔')))
    expect(document.body.contains(getByText('Ate burger')))
  })
})
