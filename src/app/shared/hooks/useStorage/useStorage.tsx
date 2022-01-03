import { useState } from 'react'

const useStorage = <T extends any>(key: string, initialValue = '') => {
  const storage = window.localStorage

  const [state, setState] = useState<T>(() => {
    const storagedValue = storage.getItem(key)
    const exitsStoragedValue = storagedValue !== null
    if (!exitsStoragedValue) storage.setItem(key, JSON.stringify(initialValue))
    return exitsStoragedValue ? JSON.parse(storagedValue) : initialValue
  })

  const setValue = (value: T) => {
    storage.setItem(key, JSON.stringify(value))
    setState(value)
  }

  return [state, setValue]
}

export default useStorage
