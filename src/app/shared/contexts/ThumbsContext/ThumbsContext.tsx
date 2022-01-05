import React, { createContext, useEffect, useState } from 'react'
import { storage } from '../../../db'
import { useStorage } from '../../hooks'
import { IThumb } from '../../interfaces'

const DEFAULT_CONTEXT_VALUE = {
  thumbs: [] as IThumb[],
  viewThumbsType: '',
  actions: {
    changeThumbsViewType: (value: string) => {}
  }
}

const ThumbsContext = createContext(DEFAULT_CONTEXT_VALUE)

const ThumbsContextProvider: React.FC = ({ children }) => {
  const [thumbs, setThumbs] = useState<IThumb[]>([])
  const [viewThumbsType, setViewThumbsType] = useStorage('view-type', 'list')

  useEffect(() => {
    const unSubscribe = storage().onSubscribe('thumbs', setThumbs)

    return () => {
      unSubscribe()
    }
  }, [])

  return (
    <ThumbsContext.Provider
      value={{
        thumbs,
        viewThumbsType,
        actions: {
          changeThumbsViewType: setViewThumbsType
        }
      }}
    >
      {children}
    </ThumbsContext.Provider>
  )
}

export default ThumbsContext

export { ThumbsContextProvider }
