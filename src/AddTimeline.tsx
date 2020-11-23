import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

import Modal from './Modal'

type Props = {
  onAddNewTimeline: Function
}

export default function AddTimeline({ onAddNewTimeline }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [timelineDescription, setTimelineDescription] = useState('')
  const [timelineEmoji, setTimelineEmoji] = useState('')

  function openModal() {
    setIsModalVisible(true)
  }

  function closeModal() {
    setTimelineDescription('')
    setTimelineEmoji('')
    setIsModalVisible(false)
  }

  function changeTimelineDescription(event: React.ChangeEvent<HTMLInputElement>) {
    setTimelineDescription(event.target.value)
  }

  function changeTimelineEmoji(event: React.ChangeEvent<HTMLInputElement>) {
    setTimelineEmoji(event.target.value)
  }

  function addTimeline(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!timelineDescription && !timelineEmoji) return

    onAddNewTimeline({
      id: uuid(),
      description: timelineDescription,
      emoji: timelineEmoji,
      dates: {},
    })

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
          <button>OK</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </Modal>
      )}
    </>
  )
}
