/* eslint-disable no-useless-computed-key */
import React, { useEffect, useMemo, useState } from 'react'
import { IThumb } from '../../../../../shared/interfaces'
import LikeSVG from '../../../../../../assets/img/thumbs-up.svg'
import DislikeSVG from '../../../../../../assets/img/thumbs-down.svg'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import { useStorage } from '../../../../../shared/hooks'
import { storage } from '../../../../../db'
import GaugeBar from './components/GaugeBar/GaugeBar'
import ThumbVoteButtons from './components/ThumbVoteButtons'
dayjs.extend(relativeTime)

export interface ThumbProps {
  thumb: IThumb
}

const VoteIndicator = ({ isPositive }: { isPositive: boolean }) =>
  isPositive ? (
    <button className={`icon-button `} aria-label="thumbs up">
      <img src={LikeSVG} alt="thumbs up" />,
    </button>
  ) : (
    <button className={`icon-button `} aria-label="thumbs down">
      <img src={DislikeSVG} alt="thumbs down" />
    </button>
  )

const Thumb: React.FC<ThumbProps> = ({ thumb }) => {
  const [userId] = useStorage<string>('user-id')
  const { votes } = thumb
  const isPositive = votes.positive >= votes.negative
  const [voted, setVoted] = useState(false)

  useEffect(() => {
    ;(async () => {
      const [voteThumbByUser] = await storage().findOne('votes-thumb', [
        {
          fieldName: 'userId',
          opStr: '==',
          value: userId
        },
        {
          fieldName: 'thumbId',
          opStr: '==',
          value: thumb.id
        }
      ])

      if (voteThumbByUser !== undefined) setVoted(true)
    })().catch(console.error)
  }, [userId, thumb])

  const dateTimeFormat = useMemo(() => dayjs().to(dayjs(thumb.lastUpdated)), [thumb.lastUpdated])
  const text = voted ? 'Thank you for your vote!' : `${dateTimeFormat} in ${thumb.category}`

  return (
    <div className="thumb">
      <div className="thumb__wrapper">
        <img src={thumb.picture} alt="" className="thumb__picture" />
        <div className="thumb__content">
          <div className="thumb__text">
            <div className="thumb__title-wrapper">
              <h2 className="thumb__title">
                <VoteIndicator isPositive={isPositive} />
                {thumb.name}
              </h2>
            </div>
            <p className="thumb__desc">{thumb.description}</p>
          </div>
          <div className="thumb__options">
            <span>{text}</span>
            <ThumbVoteButtons thumb={thumb} voted={voted} />
          </div>
        </div>
        <GaugeBar votes={votes} />
      </div>
    </div>
  )
}

export default Thumb
