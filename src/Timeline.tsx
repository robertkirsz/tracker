import React from 'react'
import dayjs from 'dayjs'

import type { TimelineInterface } from './database'

import Div from './Div'
import Day from './Day'

type Props = TimelineInterface & {
  onDayClick: Function
  onDeleteTimeline: Function
}

export default function Timeline({ id, description, emoji, dates, onDayClick, onDeleteTimeline }: Props) {
  const firstDateString = Object.keys(dates)[0]
  const firstDate = dayjs(firstDateString || new Date())
  const numberOfDays = dayjs().diff(firstDate, 'day') + 1

  return (
    <Div columnTop>
      <Div listLeft>
        {emoji && <span>{emoji}</span>}
        {description && <span>{description}</span>}
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
