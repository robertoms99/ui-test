import { SyntheticEvent, useContext } from 'react'
import { Banner, Footer, ThumbsList } from '../../components'
import { MainLayout } from '../../layouts'
import Hero from '../../layouts/Hero'
import { ThumbsContext } from '../../../shared/contexts'

const Home = () => {
  const {
    thumbs,
    viewThumbsType,
    actions: { changeThumbsViewType }
  } = useContext(ThumbsContext)

  const onChangeViewThumbsType = (e: SyntheticEvent<HTMLSelectElement>) => {
    const $select = e.target as HTMLSelectElement
    changeThumbsViewType($select.value)
  }

  return (
    <MainLayout>
      <Hero />
      <div className="max-centered">
        <Banner.Top />
        <main role="main">
          <div className="title-wrapper">
            <h2>Previous Rulings</h2>
            <select
              name="thumbs-view-option"
              id="thumbs-view-option"
              className="view-picker"
              value={viewThumbsType}
              onChange={onChangeViewThumbsType}
            >
              <option value="list">list</option>
              <option value="grid">grid</option>
            </select>
          </div>
          <ThumbsList thumbs={thumbs} />
        </main>
        <Banner.Bottom />
        <hr role="separator" />
        <Footer />
      </div>
    </MainLayout>
  )
}

export default Home
