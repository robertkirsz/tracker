import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import MockDate from 'mockdate'

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

beforeAll(() => {
  MockDate.set('2020-06-10')
})

afterEach(() => {
  localStorage.removeItem('database')
})

afterAll(() => {
  MockDate.reset()
})

describe('<App />', () => {
  test('Timeline can be added', () => {
    const { getByText, getByPlaceholderText, getAllByTestId } = render(<App />)

    fireEvent.click(getByText('+'))

    expect(getByText('Add new timeline')).toBeVisible()

    fireEvent.change(getByPlaceholderText('Emoji'), { target: { value: '🍕' } })
    fireEvent.change(getByPlaceholderText('Description'), { target: { value: 'Ate pizza' } })
    fireEvent.change(getByPlaceholderText('Start date'), { target: { value: '2020-06-01' } })

    fireEvent.click(getByText('Add'))

    expect(getByText('🍕')).toBeVisible()
    expect(getByText('Ate pizza')).toBeVisible()
    expect(getAllByTestId('timeline-day')).toHaveLength(10)
  })

  test('Timeline can be edited', () => {})

  test('Timeline can be deleted', () => {
    const { getByText, getByTestId } = render(<App getDatabase={getDatabase} />)

    const timelineEmoji = getByText('🍺')
    const timelineDescription = getByText('Drank beer')

    expect(timelineEmoji).toBeInTheDocument()
    expect(timelineDescription).toBeInTheDocument()

    fireEvent.click(getByTestId('timeline-menu-button'))
    fireEvent.click(getByText('Delete'))
    fireEvent.click(getByText('Yes'))

    expect(timelineEmoji).not.toBeInTheDocument()
    expect(timelineDescription).not.toBeInTheDocument()
  })
})
