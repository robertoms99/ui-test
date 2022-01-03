import { Banner, Footer, ThumbsList } from '../../components'
import { MainLayout } from '../../layouts'
import Hero from '../../layouts/Hero'

const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <div className="max-centered">
        <Banner.Top />
        <main role="main">
          <div>
            <h2>Previous Rulings</h2>
            <select name="thumbs-view-option" id="thumbs-view-option" className="view-picker">
              <option value="list">list</option>
              <option value="grid">grid</option>
            </select>
          </div>
          <ThumbsList />
        </main>
        <Banner.Bottom />
        <hr role="separator" />
        <Footer />
      </div>
    </MainLayout>
  )
}

export default Home
