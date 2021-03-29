import React, { useState, useRef, useEffect } from 'react'
import dayjs from 'dayjs'

import { TimelineInterface } from 'database'

import Day from 'components/Day'
import MenuButton from 'components/MenuButton'
import EditTimelineModal from 'components/EditTimelineModal'

type Props = TimelineInterface & {
  onDayClick: Function
  onDeleteTimeline: Function
}

export default function Timeline({
  id,
  description,
  emoji,
  dates,
  onDayClick,
  onDeleteTimeline,
}: Props) {
  const ref = useRef<HTMLDivElement>(null!)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)

  const firstDateString = Object.keys(dates)[0]
  const firstDate = dayjs(firstDateString || new Date())
  const numberOfDays = dayjs().diff(firstDate, 'day') + 1

  useEffect(() => {
    // Jest needs ?. here
    ref.current.scrollTo?.(ref.current.scrollWidth, 0)
  }, [])

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          {emoji && <span>{emoji}</span>}
          {description && <span className="ml-4">{description}</span>}
          <MenuButton onClick={() => setIsEditModalVisible(true)} className="ml-auto" />
        </div>

        <div ref={ref} className="flex -mx-4 overflow-auto">
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
        </div>
      </div>

      <EditTimelineModal
        show={isEditModalVisible}
        onEdit={() => {}}
        onDelete={() => onDeleteTimeline(id)}
        onClose={() => setIsEditModalVisible(false)}
      />
    </>
  )
}
