import React from 'react'
import { IThumb } from '../../../shared/interfaces'

interface ThumbsListProps {
  thumbs: IThumb[]
}

const ThumbsList: React.FC<ThumbsListProps> = ({ thumbs = [] }: ThumbsListProps) => {
  return (
    <div>
      {thumbs.map((thumb, index: number) => (
        <li key={index}>x</li>
      ))}
    </div>
  )
}

export default ThumbsList
