import React from 'react'
import styled from 'styled-components'

import { sc } from './utils'

import Emoji from './Emoji'

type Props = {
  index: number
  id: string
  emoji: string
  firstDate: Date
  dates: { [date: string]: boolean }
  onClick: Function
}

export default function Day({ index, id, emoji, firstDate, dates, onClick, ...props }: Props) {
  const startDate = new Date(firstDate)
  const currentDate = new Date(startDate.setDate(firstDate.getDate() + index))
  const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
  const isActive = dates[dateString] === true
  const isWeekend = [0, 6].includes(currentDate.getDay())
  const handleClick = () => onClick(id, currentDate, !isActive)

  return (
    <Wrapper onClick={handleClick} isWeekend={isWeekend} {...props}>
      <span style={{ fontSize: 6 }}>{currentDate.toLocaleDateString()}</span>
      {isActive && <Emoji>{emoji}</Emoji>}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ isWeekend: boolean }>`
  flex: none;
  display: flex;
  flex-direction: column;

  width: 50px;
  height: 50px;
  padding: 4px;

  border: 1px solid;

  ${sc('isWeekend')`background: rgba(255, 255, 255, 0.1);`}
`
