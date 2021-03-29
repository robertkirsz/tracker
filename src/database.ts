export interface DatabaseInterface {
  timelines: TimelineInterface[]
}

export interface TimelineInterface {
  id: string
  description: string
  emoji: string
  dates: {
    [date: string]: {
      value: number
    }
  }
}

const emptyDatabase = {
  timelines: [],
}

const getDatabase = () => localStorage.getItem('database') || JSON.stringify(emptyDatabase)

export const getDatabaseFromLocalStorage = (): DatabaseInterface => JSON.parse(getDatabase())

export const saveDatabaseToLocalStorage = (database: DatabaseInterface) =>
  localStorage.setItem('database', JSON.stringify(database))

export const downloadDatabase = () => {
  const element = document.createElement('a')
  const file = new Blob([getDatabase()], { type: 'application/json' })

  element.href = URL.createObjectURL(file)
  element.download = 'trackerDatabase.json'
  element.click()
}
