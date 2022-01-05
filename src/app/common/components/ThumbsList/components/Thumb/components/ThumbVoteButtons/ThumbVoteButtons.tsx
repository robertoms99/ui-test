import LikeSVG from '../../../../../../../../assets/img/thumbs-up.svg'
import DislikeSVG from '../../../../../../../../assets/img/thumbs-down.svg'
import { ThumbProps } from '../../Thumb'
import useThumbVoteAction from './hooks/useThumbVoteAction'

export interface ThumbVoteButtonsProps extends ThumbProps {
  voted: boolean
}

const ThumbVoteButtons = ({ thumb, voted }: ThumbVoteButtonsProps) => {
  const { voteActionSelected, hideActions, disableVoteButton, actions } = useThumbVoteAction({
    voted,
    thumb
  })
  const { onClickAction, onClickVoteAgain, onClickVote } = actions

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
        disabled={disableVoteButton}
        onClick={hideActions ? onClickVoteAgain : onClickVote}
      >
        {voted && hideActions ? 'Vote Again' : 'Vote Now'}
      </button>
    </div>
  )
}

export default ThumbVoteButtons
