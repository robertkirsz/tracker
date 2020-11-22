import React from 'react'

import type { DataItem } from './database'

import Div from './Div'
import Day from './Day'

function difference(first: Date, second: Date) {
  return Math.ceil((first.valueOf() - second.valueOf()) / 1000 / 60 / 60 / 24)
}

type Props = {
  data: DataItem
  onDayClick: Function
}

export default function Timeline({ data: { id, name, emoji, dates }, onDayClick }: Props) {
  const firstDateString = Object.keys(dates)[0]
  const now = new Date()
  const firstDate = firstDateString ? new Date(firstDateString) : new Date()
  const numberOfDays = difference(now, firstDate) + 1

  return (
    <Div columnTop>
      <Div listLeft>
        {emoji && <span>{emoji}</span>}
        {name && <span>{name}</span>}
      </Div>

      <Div listLeft={2} overflow="auto">
        {[...Array(numberOfDays)].map((_, index) => (
          <Day
            key={index}
            index={index}
            id={id}
            emoji={emoji}
            dates={dates}
            firstDate={firstDate}
            onClick={onDayClick}
          />
        ))}
      </Div>
    </Div>
  )
}
