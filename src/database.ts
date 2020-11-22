export interface DataItem {
  id: string
  name?: string
  emoji: string
  dates: { [date: string]: boolean }
}

export interface Data {
  [id: string]: DataItem
}

export const getDataFromLocalStorage = (): Data => {
  const dataFromStorage = JSON.parse(localStorage.getItem('data') || '{}')
  return { ...getDataTemplate(), ...dataFromStorage }
}

export const saveDataToLocalStorage = (data: Data) => localStorage.setItem('data', JSON.stringify(data))

const getDataTemplate = (): Data => ({
  '🍺': {
    id: '🍺',
    name: undefined,
    emoji: '🍺',
    dates: {},
  },
  '🍕': {
    id: '🍕',
    name: undefined,
    emoji: '🍕',
    dates: {},
  },
})
