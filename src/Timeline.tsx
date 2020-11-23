import React from 'react'
import dayjs from 'dayjs'

import type { DataItem } from './database'

import Div from './Div'
import Day from './Day'

type Props = {
  data: DataItem
  onDayClick: Function
  onDeleteTimeline: Function
}

export default function Timeline({ data: { id, name, emoji, dates }, onDayClick, onDeleteTimeline }: Props) {
  const firstDateString = Object.keys(dates)[0]
  const firstDate = firstDateString ? dayjs(firstDateString) : dayjs()
  // TODO: fix problems with timezones (wrong number at midnight)
  const numberOfDays = dayjs().diff(firstDate) + 3

  return (
    <Div columnTop>
      <Div listLeft>
        {emoji && <span>{emoji}</span>}
        {name && <span>{name}</span>}
        <button onClick={() => onDeleteTimeline(id)}>Delete</button>
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
