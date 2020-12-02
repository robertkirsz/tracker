import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

import { sc } from 'utils'

import Emoji from 'components/Emoji'

type Props = {
  index: number
  id: string
  emoji: string
  dates: {
    [date: string]: {
      value: number
    }
  }
  firstDate: dayjs.Dayjs
  onClick: Function
}

export default function Day({ index, id, emoji, firstDate, dates, onClick }: Props) {
  const today = dayjs()
  const currentDate = dayjs(firstDate).add(index, 'day')
  const isActive = dates[currentDate.format('YYYY-MM-DD')]?.value >= 1
  const isToday = today.isSame(currentDate, 'day')
  const isWeekend = [0, 6].includes(currentDate.day())

  function handleClick() {
    onClick(id, currentDate, isActive ? 0 : 1)
  }

  return (
    <Wrapper isToday={isToday} isWeekend={isWeekend} onClick={handleClick} data-testid="timeline-day">
      <span style={{ fontSize: 6 }}>{currentDate.format('DD-MM-YYYY')}</span>
      {isActive && <Emoji>{emoji}</Emoji>}
    </Wrapper>
  )
}

type WrapperProps = {
  isToday: boolean
  isWeekend: boolean
}

const Wrapper = styled.div<WrapperProps>`
  flex: none;
  display: flex;
  flex-direction: column;

  width: 50px;
  height: 50px;
  padding: 4px;

  border: 1px solid;

  cursor: pointer;

  ${sc('isToday')`border-width: 3px;`}
  ${sc('isWeekend')`background: rgba(255, 255, 255, 0.1);`}
`
