export interface DataItem {
  id: string
  name?: string
  emoji?: string
  type?: string
  dates: {
    [date: string]: boolean
  }
}

export interface Data {
  [id: string]: DataItem
}

export const getDataFromLocalStorage = (): Data => {
  const data = localStorage.getItem('data')
  return data ? JSON.parse(data) : getDefaultData()
}

export const saveDataToLocalStorage = (data: Data) => localStorage.setItem('data', JSON.stringify(data))

export const getDefaultData = (): Data => ({
  '🍺': {
    id: '🍺',
    name: undefined,
    emoji: '🍺',
    dates: {
      '2020-11-14': true,
      '2020-11-18': true,
      '2020-11-20': true,
    },
  },
})
