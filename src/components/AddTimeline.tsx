import React, { useState } from 'react'
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'

import { TimelineInterface } from 'database'

import Modal from 'components/Modal'
import TimelineForm from 'components/TimelineForm'

type Props = {
  onAddNewTimeline: Function
}

export default function AddTimeline({ onAddNewTimeline }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function openModal() {
    setIsModalVisible(true)
  }

  function closeModal() {
    setIsModalVisible(false)
  }

  function addTimeline({ emoji, description, startDate }: { emoji: string; description: string; startDate: string }) {
    const newTimeline: TimelineInterface = {
      id: uuid(),
      emoji,
      description,
      dates: {
        [startDate]: { value: 0 },
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
        <Modal columnTop itemsCenter onClose={closeModal}>
          <span>Add new timeline</span>

          <TimelineForm
            emoji=""
            description=""
            startDate={dayjs().format('YYYY-MM-DD')}
            onSubmit={addTimeline}
            buttonLabel="Add"
          />

          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </Modal>
      )}
    </>
  )
}