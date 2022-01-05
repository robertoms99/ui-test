import LikeSVG from '../../../../../../../../assets/img/thumbs-up.svg'
import DislikeSVG from '../../../../../../../../assets/img/thumbs-down.svg'
import { formatPercentage, getPercentageByValue } from '../../../../../../../lib/util'
import { CSSProperties } from 'react'

interface GaugeBarProps {
  votes: {
    positive: number
    negative: number
  }
}

const GaugeBar = ({ votes }: GaugeBarProps) => {
  const totalSum = votes.negative + votes.positive

  const positive = getPercentageByValue(votes.positive, totalSum)
  const negative = getPercentageByValue(votes.negative, totalSum)

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

export default GaugeBar
