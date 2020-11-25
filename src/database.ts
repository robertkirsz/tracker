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

export const getDatabaseFromLocalStorage = (): DatabaseInterface =>
  JSON.parse(localStorage.getItem('database') || JSON.stringify(emptyDatabase))

export const saveDatabaseToLocalStorage = (database: DatabaseInterface) =>
  localStorage.setItem('database', JSON.stringify(database))
