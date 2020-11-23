import React, { useState } from 'react'

import { getDataFromLocalStorage, saveDataToLocalStorage } from './database'
import type { Data } from './database'

import Div from './Div'
import Version from './Version'
import Timeline from './Timeline'
import AddTimeline from './AddTimeline'
import DataPreview from './DataPreview'
import type dayjs from 'dayjs'

export default function App({ getData = getDataFromLocalStorage }) {
  const [database, setDatabase] = useState(getData)

  function handleDayClick(id: string, date: dayjs.Dayjs, newDateState: boolean) {
    setDatabase((state: Data) => {
      const newState = {
        ...state,
        [id]: {
          // @ts-ignore
          ...state[id],
          dates: {
            // @ts-ignore
            ...state[id].dates,
            [date.format('YYYY-MM-DD')]: newDateState,
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

  function deleteTimeline(timelineId: string) {
    setDatabase((state: Data) => {
      const newState = { ...state }
      delete newState[timelineId]

      saveDataToLocalStorage(newState)

      return newState
    })
  }

  return (
    <>
      <Div flex={1} columnTop overflow="auto">
        {Object.entries(database).map(([id, data]) => (
          <Timeline key={id} data={data} onDayClick={handleDayClick} onDeleteTimeline={deleteTimeline} />
        ))}

        <AddTimeline database={database} onSubmit={addNewTimeline} />
      </Div>

      <Div as="footer" itemsEnd justifyBetween flexNone>
        <Version />
        <DataPreview database={database} />
      </Div>
    </>
  )
}
