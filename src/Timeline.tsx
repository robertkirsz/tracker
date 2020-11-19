import React from 'react'
import styled from 'styled-components'

import Div from './Div'

function difference(first: Date, second: Date) {
  return Math.ceil((first.valueOf() - second.valueOf()) / 1000 / 60 / 60 / 24)
}

type Props = {
  start: Date
  name?: string
  emoji?: string
}

export default function Timeline({ start, name, emoji }: Props) {
  const now = new Date()
  const numberOfDays = difference(now, start)

  return (
    <Div columnTop>
      <Div listLeft>
        {emoji && <span>{emoji}</span>}
        {name && <span>{name}</span>}
      </Div>

      <Div listLeft={2} overflow="auto">
        {[...Array(numberOfDays)].map((_, index) => {
          const date = new Date(start)
          const dayNumber = new Date(date.setDate(start.getDate() + index))
          return (
            <Day key={index}>
              <span>{dayNumber.getDate()}</span>
              <span style={{ fontSize: 6 }}>{dayNumber.toLocaleDateString()}</span>
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
