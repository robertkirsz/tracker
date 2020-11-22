import React from 'react'
import styled from 'styled-components'

import type { DataItem } from './database'

import Div from './Div'
import Emoji from './Emoji'

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
  const start = firstDateString ? new Date(firstDateString) : new Date()
  const numberOfDays = difference(now, start) || 1

  return (
    <Div columnTop>
      <Div listLeft>
        {emoji && <span>{emoji}</span>}
        {name && <span>{name}</span>}
      </Div>

      <Div listLeft={2} overflow="auto">
        {[...Array(numberOfDays)].map((_, index) => {
          const startDate = new Date(start)
          const currentDate = new Date(startDate.setDate(start.getDate() + index))
          const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`

          const isActive = dates[dateString] === true
          const handleClick = () => onDayClick(id, currentDate, !isActive)

          return (
            <Day key={index} onClick={handleClick}>
              <span style={{ fontSize: 6 }}>{currentDate.toLocaleDateString()}</span>
              {isActive && <Emoji>{emoji}</Emoji>}
            </Day>
          )
        })}
      </Div>
    </Div>
  )
}

const Day = styled.div`
  flex: none;
  display: flex;
  flex-direction: column;
  width: 50px;
  height: 50px;
  border: 1px solid;
  padding: 4px;
`
