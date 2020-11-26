import React, { useState } from 'react'
import dayjs from 'dayjs'

import type { TimelineInterface } from './database'

import Div from './Div'
import Day from './Day'
import Modal from './Modal'

type Props = TimelineInterface & {
  onDayClick: Function
  onDeleteTimeline: Function
}

export default function Timeline({ id, description, emoji, dates, onDayClick, onDeleteTimeline }: Props) {
  const [isDeleteTimelineModalVisible, setIsDeleteTimelineModalVisible] = useState(false)

  const firstDateString = Object.keys(dates)[0]
  const firstDate = dayjs(firstDateString || new Date())
  const numberOfDays = dayjs().diff(firstDate, 'day') + 1

  return (
    <>
      <Div columnTop>
        <Div listLeft justifyBetween>
          <Div listLeft>
            {emoji && <span>{emoji}</span>}
            {description && <span>{description}</span>}
          </Div>

          <button onClick={() => setIsDeleteTimelineModalVisible(true)}>Delete</button>
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

      {isDeleteTimelineModalVisible && (
        <Modal columnTop itemsCenter onClose={() => setIsDeleteTimelineModalVisible(false)}>
          <span>Are you sure?</span>
          <button onClick={() => onDeleteTimeline(id)}>Delete</button>
          <button onClick={() => setIsDeleteTimelineModalVisible(false)}>Cancel</button>
        </Modal>
      )}
    </>
  )
}
