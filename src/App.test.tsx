import React from 'react'
import { render, fireEvent } from '@testing-library/react'

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
  ],
})

afterEach(() => {
  localStorage.removeItem('database')
})

describe('<App />', () => {
  test('Timeline can be added', () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(<App />)

    fireEvent.click(getByTestId('add-timeline-button'))

    fireEvent.change(getByPlaceholderText('Emoji'), { target: { value: '🍕' } })
    fireEvent.change(getByPlaceholderText('Description'), { target: { value: 'Ate pizza' } })
    // TODO: mock date
    fireEvent.change(getByPlaceholderText('Start date'), { target: { value: '2020-05-15' } })

    fireEvent.submit(getByTestId('add-timeline-form'))

    expect(getByText('🍕')).toBeVisible()
    expect(getByText('Ate pizza')).toBeVisible()
    // TODO: check timeline length
  })

  test('Timeline can be edited', () => {})

  test('Timeline can be deleted', () => {
    const { getByText } = render(<App getDatabase={getDatabase} />)

    const timelineEmoji = getByText('🍺')
    const timelineDescription = getByText('Drank beer')

    expect(timelineEmoji).toBeInTheDocument()
    expect(timelineDescription).toBeInTheDocument()

    fireEvent.click(getByText('Delete'))
    fireEvent.click(getByText('Yes'))

    expect(timelineEmoji).not.toBeInTheDocument()
    expect(timelineDescription).not.toBeInTheDocument()
  })
})
