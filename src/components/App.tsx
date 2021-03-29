import { useState } from 'react'
import dayjs from 'dayjs'

import {
  getDatabaseFromLocalStorage,
  saveDatabaseToLocalStorage,
  DatabaseInterface,
  TimelineInterface,
} from 'database'

import Version from 'components/Version'
import Timeline from 'components/Timeline'
import AddTimeline from 'components/AddTimeline'
import DatabasePreview from 'components/DatabasePreview'

export default function App({ getDatabase = getDatabaseFromLocalStorage }) {
  const [database, setDatabase] = useState<DatabaseInterface>(getDatabase)

  function handleDatabaseUpload(database: DatabaseInterface) {
    setDatabase(database)
    saveDatabaseToLocalStorage(database)
  }

  function handleDayClick(id: string, date: dayjs.Dayjs, newDateState: number) {
    window.navigator.vibrate?.(50)

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
      <div className="content-wrapper flex-1 flex-col space-y-2 overflow-y-auto">
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
      </div>

      <footer className="content-wrapper flex-none items-center justify-between">
        <Version />
        <AddTimeline onAddNewTimeline={addNewTimeline} />
        <DatabasePreview database={database} onDatabaseUpload={handleDatabaseUpload} />
      </footer>
    </>
  )
}
