import React, { useContext } from 'react'
import { ThumbsContext } from '../../../shared/contexts'
import { IThumb } from '../../../shared/interfaces'
import Thumb from './components/Thumb'

interface ThumbsListProps {
  thumbs: IThumb[]
}

const ThumbsList: React.FC<ThumbsListProps> = ({ thumbs = [] }: ThumbsListProps) => {
  const { viewThumbsType } = useContext(ThumbsContext)

  return (
    <div className="thumblist-wrapper">
      <div className={`thumblist thumblist--${viewThumbsType}`}>
        {thumbs.map((thumb) => (
          <Thumb thumb={thumb} key={thumb.id} />
        ))}
      </div>
    </div>
  )
}

export default ThumbsList
