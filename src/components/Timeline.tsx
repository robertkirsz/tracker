import React, { useState } from 'react'
import dayjs from 'dayjs'
import 'styled-components/macro'

import { TimelineInterface } from 'database'

import Div from 'components/Div'
import Day from 'components/Day'
import MenuButton from 'components/MenuButton'
import EditTimelineModal from 'components/EditTimelineModal'

type Props = TimelineInterface & {
  onDayClick: Function
  onDeleteTimeline: Function
}

export default function Timeline({ id, description, emoji, dates, onDayClick, onDeleteTimeline }: Props) {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)

  const firstDateString = Object.keys(dates)[0]
  const firstDate = dayjs(firstDateString || new Date())
  const numberOfDays = dayjs().diff(firstDate, 'day') + 1

  return (
    <>
      <Div columnTop>
        <Div listLeft itemsCenter>
          {emoji && <span>{emoji}</span>}
          {description && <span>{description}</span>}
          <MenuButton onClick={() => setIsEditModalVisible(true)} css="&& { margin-left: auto; }" />
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

      {isEditModalVisible && (
        <EditTimelineModal
          onEdit={() => {}}
          onDelete={() => onDeleteTimeline(id)}
          onClose={() => setIsEditModalVisible(false)}
        />
      )}
    </>
  )
}
