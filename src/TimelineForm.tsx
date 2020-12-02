import React, { useState } from 'react'
import dayjs from 'dayjs'

import Div, { DivProps } from 'Div'

type Props = {
  emoji?: string
  description?: string
  startDate?: string
  buttonLabel?: string
  onSubmit: Function
}

export default function TimelineForm({
  emoji = '',
  description = '',
  startDate = '',
  buttonLabel = 'OK',
  onSubmit,
  ...props
}: Props & DivProps) {
  const [_description, setDescription] = useState(description)

  function changeDescription(event: React.ChangeEvent<HTMLInputElement>) {
    if (error) setError('')
    setDescription(event.target.value)
  }

  const [_emoji, setEmoji] = useState(emoji)

  function changeEmoji(event: React.ChangeEvent<HTMLInputElement>) {
    if (error) setError('')
    setEmoji(event.target.value)
  }

  const [_startDate, setStartDate] = useState(startDate)

  function changeStartDate(event: React.ChangeEvent<HTMLInputElement>) {
    if (error) setError('')
    setStartDate(event.target.value)
  }

  const [error, setError] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!_description && !_emoji) {
      setError('Emoji or name is required')
      return
    }

    if (!dayjs(_startDate).isValid()) {
      setError('Date is invalid')
      return
    }

    if (dayjs(_startDate).isAfter(dayjs(), 'day')) {
      setError("Date can't be future")
      return
    }

    onSubmit({ emoji: _emoji, description: _description, startDate: _startDate })
  }

  return (
    <Div as="form" columnTop itemsCenter onSubmit={handleSubmit} {...props}>
      {typeof _emoji !== 'undefined' && <input placeholder="Emoji" value={_emoji} onChange={changeEmoji} />}

      {typeof _description !== 'undefined' && (
        <input placeholder="Description" value={_description} onChange={changeDescription} />
      )}

      {typeof _startDate !== 'undefined' && (
        <input placeholder="Start date" value={_startDate} onChange={changeStartDate} />
      )}

      {error && <span>{error}</span>}

      <button>{buttonLabel}</button>
    </Div>
  )
}
