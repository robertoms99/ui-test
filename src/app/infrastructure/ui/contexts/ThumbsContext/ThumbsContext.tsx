import React, { createContext, useEffect, useState } from 'react'
import { useStorage } from '../../hooks'
import THUMBS_JSON from '../../../../../assets/data.json'
import { IThumb } from '../../../../interfaces'

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
    const { data: thumbsData } = THUMBS_JSON as { data: any[] }
    setThumbs((thumbsData ?? []) as IThumb[])
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
