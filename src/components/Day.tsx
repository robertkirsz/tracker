import React from 'react'
import dayjs from 'dayjs'
import cn from 'classnames'

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
    <div className="px-1 first:ml-auto">
      <div
        className={cn('flex-none flex flex-col w-12 h-12 p-1 border-solid cursor-pointer', {
          border: !isToday,
          'border-2': isToday,
          'bg-white bg-opacity-10': isWeekend,
        })}
        onClick={handleClick}
        data-testid="timeline-day"
      >
        <span style={{ fontSize: 6 }}>{currentDate.format('DD-MM-YYYY')}</span>

        {isActive && <Emoji>{emoji}</Emoji>}
      </div>
    </div>
  )
}
