import { useRef } from 'react'
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

function isTouchDevice() {
  try {
    document.createEvent('TouchEvent')
    return true
  } catch (error) {
    return false
  }
}

export default function Day({ index, id, emoji, firstDate, dates, onClick }: Props) {
  const today = dayjs()
  const currentDate = dayjs(firstDate).add(index, 'day')
  const value = dates[currentDate.format('YYYY-MM-DD')]?.value
  const isToday = today.isSame(currentDate, 'day')
  const isWeekend = [0, 6].includes(currentDate.day())

  function handleClick() {
    if (isTouchDevice()) return

    onClick(id, currentDate, (value || 0) + 1)
  }

  function handleRightClick(event: any) {
    event.preventDefault()

    if (isTouchDevice()) return

    onClick(id, currentDate, value ? value - 1 : 0)
  }

  const touchStart = useRef(0)
  const touchEnd = useRef(0)

  function handleTouchStart() {
    if (!isTouchDevice()) return

    touchStart.current = Date.now()
  }

  function handleTouchEnd() {
    if (!isTouchDevice()) return

    touchEnd.current = Date.now()

    const elapsed = touchEnd.current - touchStart.current

    if (elapsed < 200) onClick(id, currentDate, (value || 0) + 1)
    else onClick(id, currentDate, value ? value - 1 : 0)
  }

  return (
    <div className="px-1 first:ml-auto select-none">
      <div
        className={cn(
          'flex-none flex flex-col w-12 h-12 p-1 border-solid cursor-pointer relative',
          {
            border: !isToday,
            'border-2': isToday,
            'bg-white bg-opacity-10': isWeekend,
          }
        )}
        onClick={handleClick}
        onContextMenu={handleRightClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        data-testid="timeline-day"
      >
        <span style={{ fontSize: 6 }}>{currentDate.format('DD-MM-YYYY')}</span>
        {value > 1 && <span className="absolute bottom-0 right-1 text-xs">{value}</span>}
        {value >= 1 && <Emoji className="text-center">{emoji}</Emoji>}
      </div>
    </div>
  )
}
