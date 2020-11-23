import React, { useState } from 'react'

import type { Data } from './database'

import Div from './Div'

type Props = {
  database: Data
  onSubmit: Function
}

export default function AddTimeline({ database, onSubmit }: Props) {
  const [showInput, setShowInput] = useState(false)
  const [timelineEmoji, setTimelineEmoji] = useState('')
  const [error, setError] = useState('')

  function toggleView() {
    setShowInput(state => !state)
  }

  function changeTimelineEmoji(event: React.ChangeEvent<HTMLInputElement>) {
    setTimelineEmoji(event.target.value)
  }

  function addTimeline(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (timelineEmoji === '') return

    const timelineEmojiAlreadyExists = Object.keys(database).includes(timelineEmoji)

    if (timelineEmojiAlreadyExists) {
      setError('This timeline already exists')
      return
    }

    setShowInput(false)
    setTimelineEmoji('')
    setError('')
    onSubmit({
      [timelineEmoji]: {
        id: timelineEmoji,
        emoji: timelineEmoji,
        dates: {},
      },
    })
  }

  return (
    <Div columnTop selfCenter>
      {!showInput && <button onClick={toggleView}>+</button>}

      {showInput && (
        <Div as="form" listLeft onSubmit={addTimeline}>
          <input value={timelineEmoji} onChange={changeTimelineEmoji} />
          <button>OK</button>
          <button type="button" onClick={toggleView}>
            Cancel
          </button>
        </Div>
      )}

      {error && <span>{error}</span>}
    </Div>
  )
}
