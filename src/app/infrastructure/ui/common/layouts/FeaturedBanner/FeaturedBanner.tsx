import { FeaturedCard } from '../../components'

const ClosingBanner = () => (
  <div className="hero__closing-gauge">
    <div className="closing-gauge__left">
      <span className="closing-gauge__title">closing in</span>
    </div>
    <div className="closing-gauge__right">
      <span className="closing-gauge__number">22</span>
      <span className="closing-gauge__desc">days</span>
    </div>
  </div>
)

const FeaturedBanner: React.FC = () => (
  <header className="hero">
    <img
      className="hero__background"
      srcSet="assets/img/pope-francis.png 750w, assets/img/pope-francis.@2x.png 1440w"
      sizes="(min-width: 750px) 1440px, 100vw"
      src="assets/img/pope-francis.png"
      alt="Pope Francis"
    />
    <div className="max-centered">
      <FeaturedCard />
    </div>
    <ClosingBanner />
  </header>
)

export default FeaturedBanner
