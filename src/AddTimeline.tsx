import React, { useState, FormEvent } from 'react'

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

  function addTimeline(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const timelineEmojiAlreadyExists = Object.keys(database).includes(timelineEmoji)

    if (timelineEmojiAlreadyExists) {
      setError('This timeline already exists')
    } else {
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
  }

  return (
    <Div columnTop selfCenter>
      {!showInput && <button onClick={() => setShowInput(true)}>+</button>}

      {showInput && (
        <Div as="form" listLeft onSubmit={addTimeline}>
          <input value={timelineEmoji} onChange={event => setTimelineEmoji(event.target.value)} />
          <button>OK</button>
          <button type="button" onClick={() => setShowInput(false)}>
            Cancel
          </button>
        </Div>
      )}

      {error && <span>{error}</span>}
    </Div>
  )
}
