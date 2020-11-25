import React, { useState } from 'react'
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'

import Modal from './Modal'
import type { TimelineInterface } from './database'

type Props = {
  onAddNewTimeline: Function
}

export default function AddTimeline({ onAddNewTimeline }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [timelineDescription, setTimelineDescription] = useState('')
  const [timelineEmoji, setTimelineEmoji] = useState('')
  const [startDate, setStartDate] = useState('')
  const [error, setError] = useState('')

  function openModal() {
    setStartDate(dayjs().format('YYYY-MM-DD'))
    setIsModalVisible(true)
  }

  function closeModal() {
    setTimelineDescription('')
    setTimelineEmoji('')
    setStartDate('')
    setError('')
    setIsModalVisible(false)
  }

  function changeTimelineDescription(event: React.ChangeEvent<HTMLInputElement>) {
    if (error) setError('')
    setTimelineDescription(event.target.value)
  }

  function changeTimelineEmoji(event: React.ChangeEvent<HTMLInputElement>) {
    if (error) setError('')
    setTimelineEmoji(event.target.value)
  }

  function changeStartDate(event: React.ChangeEvent<HTMLInputElement>) {
    if (error) setError('')
    setStartDate(event.target.value)
  }

  function addTimeline(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!timelineDescription && !timelineEmoji) {
      setError('Emoji or name is required')
      return
    }

    if (!dayjs(startDate).isValid()) {
      setError('Date is invalid')
      return
    }

    if (dayjs(startDate).isAfter(dayjs(), 'day')) {
      setError("Date can't be future")
      return
    }

    const newTimeline: TimelineInterface = {
      id: uuid(),
      description: timelineDescription,
      emoji: timelineEmoji,
      dates: {
        [startDate]: { value: 1 },
      },
    }

    onAddNewTimeline(newTimeline)
    closeModal()
  }

  return (
    <>
      <button style={{ alignSelf: 'center' }} onClick={openModal}>
        +
      </button>

      {isModalVisible && (
        // @ts-ignore
        <Modal as="form" onSubmit={addTimeline} columnTop itemsCenter onClose={closeModal}>
          <input placeholder="Emoji" value={timelineEmoji} onChange={changeTimelineEmoji} />
          <input placeholder="Description" value={timelineDescription} onChange={changeTimelineDescription} />
          <input placeholder="Start date" value={startDate} onChange={changeStartDate} />
          {error && <span>{error}</span>}
          <button>OK</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </Modal>
      )}
    </>
  )
}
