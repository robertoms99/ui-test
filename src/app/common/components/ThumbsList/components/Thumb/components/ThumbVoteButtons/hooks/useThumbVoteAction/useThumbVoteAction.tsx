import { SyntheticEvent, useEffect, useState } from 'react'
import { storage } from '../../../../../../../../../db'
import { useStorage } from '../../../../../../../../../shared/hooks'
import { ThumbVoteButtonsProps } from '../../ThumbVoteButtons'

const useThumbVoteAction = ({ voted, thumb }: ThumbVoteButtonsProps) => {
  const [userId] = useStorage<string>('user-id')
  const [voteActionSelected, setVoteActionSelected] = useState('')
  const [hideActions, setHideActions] = useState(voted)
  const hasVoteActionSelected = voteActionSelected !== ''

  const onClickVoteAgain = () => setHideActions(false)

  const onClickAction = (e: SyntheticEvent<HTMLButtonElement, MouseEvent>) => {
    const $button = e.currentTarget as HTMLButtonElement
    const buttonValue = $button.dataset.voteButton ?? ''
    setVoteActionSelected((previousVoteActionSelected) =>
      previousVoteActionSelected === buttonValue ? '' : buttonValue
    )
  }

  useEffect(() => setHideActions(voted), [voted])

  const getUserVoteByThumb = async () => {
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
    return voteThumbByUser
  }

  const updateVotesThumb = async (voteThumbByUser: any) => {
    const newVotes = {
      ...thumb.votes,
      [voteThumbByUser.type]: (thumb.votes as any)[voteThumbByUser.type] - 1
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
  }

  const voteAgainByUser = async (voteThumbByUser: any) => {
    return await storage().updateByPk(
      'votes-thumb',
      {
        userId,
        thumbId: thumb.id,
        type: voteActionSelected
      },
      voteThumbByUser.id
    )
  }

  const onClickVote = async () => {
    if (voted) {
      const voteThumbByUser = await getUserVoteByThumb()
      await voteAgainByUser(voteThumbByUser)
      await updateVotesThumb(voteThumbByUser)
      setHideActions(true)
      setVoteActionSelected('')
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
  }

  return {
    voteActionSelected,
    hideActions,
    disableVoteButton:
      (!voted && !hasVoteActionSelected) || (voted && !hideActions && !hasVoteActionSelected),
    actions: {
      onClickAction,
      onClickVoteAgain,
      onClickVote
    }
  }
}

export default useThumbVoteAction
