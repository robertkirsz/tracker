import React, { useState } from 'react'

import { getDataFromLocalStorage, saveDataToLocalStorage } from './database'
import type { Data, DataItem } from './database'

import Div from './Div'
import Version from './Version'
import Timeline from './Timeline'
import AddTimeline from './AddTimeline'

export default function App({ getData = getDataFromLocalStorage }) {
  const [database, setDatabase] = useState(getData)

  function handleDayClick(id: string, date: Date, newDateState: boolean) {
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

    setDatabase((state: Data) => {
      const newState = {
        ...state,
        [id]: {
          // @ts-ignore
          ...state[id],
          dates: {
            // @ts-ignore
            ...state[id].dates,
            [dateString]: newDateState,
          },
        },
      }

      saveDataToLocalStorage(newState)

      return newState
    })
  }

  function addNewTimeline(timeline: Data) {
    setDatabase((state: Data) => {
      const newState = {
        ...state,
        ...timeline,
      }

      saveDataToLocalStorage(newState)

      return newState
    })
  }

  return (
    <>
      <Div columnTop>
        {Object.entries(database).map(([id, data]) => (
          <Timeline key={id} data={data} onDayClick={handleDayClick} />
        ))}

        <AddTimeline database={database} onSubmit={addNewTimeline} />
      </Div>

      <Version />
    </>
  )
}
