import React, { useState } from 'react'
import dayjs from 'dayjs'

import { getDatabaseFromLocalStorage, saveDatabaseToLocalStorage, DatabaseInterface, TimelineInterface } from 'database'

import Div from 'Div'
import Version from 'Version'
import Timeline from 'Timeline'
import AddTimeline from 'AddTimeline'
import DatabasePreview from 'DatabasePreview'

export default function App({ getDatabase = getDatabaseFromLocalStorage }) {
  const [database, setDatabase] = useState<DatabaseInterface>(getDatabase)

  function handleDayClick(id: string, date: dayjs.Dayjs, newDateState: number) {
    setDatabase(state => {
      const newState = {
        ...state,
        timelines: state.timelines.map(timeline =>
          timeline.id === id
            ? {
                ...timeline,
                dates: {
                  ...timeline.dates,
                  [date.format('YYYY-MM-DD')]: {
                    ...timeline.dates[date.format('YYYY-MM-DD')],
                    value: newDateState,
                  },
                },
              }
            : timeline
        ),
      }

      saveDatabaseToLocalStorage(newState)

      return newState
    })
  }

  function addNewTimeline(timeline: TimelineInterface) {
    setDatabase(state => {
      const newState = {
        ...state,
        timelines: [...state.timelines, timeline],
      }

      saveDatabaseToLocalStorage(newState)

      return newState
    })
  }

  function deleteTimeline(timelineId: string) {
    setDatabase(state => {
      const newState = {
        ...state,
        timelines: state.timelines.filter(timeline => timeline.id !== timelineId),
      }

      saveDatabaseToLocalStorage(newState)

      return newState
    })
  }

  return (
    <>
      <Div flex={1} columnTop overflow="auto">
        {database.timelines.map(timeline => (
          <Timeline
            key={timeline.id}
            id={timeline.id}
            description={timeline.description}
            emoji={timeline.emoji}
            dates={timeline.dates}
            onDayClick={handleDayClick}
            onDeleteTimeline={deleteTimeline}
          />
        ))}
      </Div>

      <AddTimeline onAddNewTimeline={addNewTimeline} />

      <Div as="footer" itemsEnd justifyBetween flexNone>
        <Version />
        <DatabasePreview database={database} />
      </Div>
    </>
  )
}
