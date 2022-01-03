import { Banner, Footer } from '../../components'
import { MainLayout } from '../../layouts'
import FeaturedBanner from '../../layouts/FeaturedBanner'

const Home = () => {
  return (
    <MainLayout>
      <FeaturedBanner />
      <div className="max-centered">
        <Banner.Top />
        <main role="main">👉 Your code goes here 👈</main>
        <Banner.Bottom />
        <hr role="separator" />
        <Footer />
      </div>
    </MainLayout>
  )
}

export default Home
