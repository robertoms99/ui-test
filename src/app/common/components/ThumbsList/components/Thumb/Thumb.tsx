/* eslint-disable no-useless-computed-key */
import React, { CSSProperties, SyntheticEvent, useEffect, useMemo, useState } from 'react'
import { formatPercentage } from '../../../../../lib/util'
import { IThumb } from '../../../../../shared/interfaces'
import LikeSVG from '../../../../../../assets/img/thumbs-up.svg'
import DislikeSVG from '../../../../../../assets/img/thumbs-down.svg'
import PopeFrancisPNG from '../../../../../../assets/img/pope-francis.png'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import { useStorage } from '../../../../../shared/hooks'
import { storage } from '../../../../../db'
dayjs.extend(relativeTime)

interface ThumbProps {
  thumb: IThumb
}

interface GaugeBarProps {
  votes: {
    positive: number
    negative: number
  }
}

const GaugeBar: React.FC<GaugeBarProps> = ({ votes }) => {
  const totalSum = votes.negative + votes.positive

  const positive = (100 * votes.positive) / totalSum
  const negative = (100 * votes.negative) / totalSum

  return (
    <div className="thumb__gauge-bar gauge-bar">
      <div
        className="gauge-bar__positive"
        style={{ '--positive-basis': `${positive}%` } as unknown as CSSProperties}
      >
        <img src={LikeSVG} alt="thumbs up" />
        <span>{formatPercentage(positive)}%</span>
      </div>
      <div
        className="gauge-bar__negative"
        style={{ '--negative-basis': `${negative}%` } as unknown as CSSProperties}
      >
        <img src={DislikeSVG} alt="thumbs up" />
        <span>{formatPercentage(negative)}%</span>
      </div>
    </div>
  )
}

interface ThumbVoteButtonsProps extends ThumbProps {
  voted: boolean
}

const ThumbVoteButtons: React.FC<ThumbVoteButtonsProps> = ({ thumb, voted }) => {
  const [voteActionSelected, setVoteActionSelected] = useState('')
  const [hideActions, setHideActions] = useState(voted)

  const hasVoteActionSelected = voteActionSelected !== ''
  const [userId] = useStorage<string>('user-id')

  const onClickAction = (e: SyntheticEvent<HTMLButtonElement, MouseEvent>) => {
    const $button = e.currentTarget as HTMLButtonElement
    const buttonValue = $button.dataset.voteButton ?? ''

    setVoteActionSelected((previousVoteActionSelected) =>
      previousVoteActionSelected === buttonValue ? '' : buttonValue
    )
  }

  useEffect(() => {
    setHideActions(voted)
  }, [voted])

  const onClickVoteAgain = () => setHideActions(false)

  const onClickVote = () => {
    ;(async () => {
      if (voted) {
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
        await storage().updateByPk(
          'votes-thumb',
          {
            userId,
            thumbId: thumb.id,
            type: voteActionSelected
          },
          (voteThumbByUser as any).id
        )

        const newVotes = {
          ...thumb.votes,
          [(voteThumbByUser as any).type]: (thumb.votes as any)[(voteThumbByUser as any).type] - 1
        }

        Object.assign(newVotes, {
          [voteActionSelected]: ((newVotes as any)[voteActionSelected] as number) + 1
        })

        await storage().updateByPk(
          'thumbs',
          {
            ...thumb,
            votes: newVotes
          },
          thumb.id
        )
        return
      }
      await storage().add('votes-thumb', {
        userId,
        thumbId: thumb.id,
        type: voteActionSelected
      })

      await storage().updateByPk(
        'thumbs',
        {
          ...thumb,
          votes: {
            ...thumb.votes,
            [voteActionSelected]: ((thumb.votes as any)[voteActionSelected] as number) + 1
          }
        },
        thumb.id
      )
    })().catch(console.error)
    setHideActions(true)
    setVoteActionSelected('')
  }

  return (
    <div className="thumb__buttons">
      <button
        className={`icon-button ${hideActions ? 'icon-button--hidden' : ''} ${
          voteActionSelected === 'positive' ? 'icon-button--selected' : ''
        }`}
        aria-label="thumbs up"
        data-vote-button="positive"
        onClick={onClickAction}
      >
        <img src={LikeSVG} alt="thumbs up" />
      </button>
      <button
        className={`icon-button  ${hideActions ? 'icon-button--hidden' : ''} ${
          voteActionSelected === 'negative' ? 'icon-button--selected' : ''
        }`}
        aria-label="thumbs down"
        data-vote-button="negative"
        onClick={onClickAction}
      >
        <img src={DislikeSVG} alt="thumbs down" />
      </button>
      <button
        className="vote-button"
        disabled={
          (!voted && !hasVoteActionSelected) || (voted && !hideActions && !hasVoteActionSelected)
        }
        onClick={hideActions ? onClickVoteAgain : onClickVote}
      >
        {voted && hideActions ? 'Vote Again' : 'Vote Now'}
      </button>
    </div>
  )
}

const Thumb: React.FC<ThumbProps> = ({ thumb }) => {
  const { votes } = thumb
  const [userId] = useStorage<string>('user-id')
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

  const VoteIndicator = isPositive ? (
    <button className={`icon-button `} aria-label="thumbs up">
      <img src={LikeSVG} alt="thumbs up" />,
    </button>
  ) : (
    <button className={`icon-button `} aria-label="thumbs down">
      <img src={DislikeSVG} alt="thumbs down" />
    </button>
  )

  const dateTimeFormat = useMemo(() => dayjs().to(dayjs(thumb.lastUpdated)), [thumb.lastUpdated])
  const text = voted ? 'Thank you for your vote!' : `${dateTimeFormat} in ${thumb.category}`

  return (
    <div className="thumb">
      <div className="thumb__wrapper">
        <img src={PopeFrancisPNG} alt="" className="thumb__picture" />
        <div className="thumb__content">
          <div className="thumb__text">
            <div className="thumb__title-wrapper">
              <h2 className="thumb__title">
                {VoteIndicator}
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
