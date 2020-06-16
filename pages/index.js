import Container from '../components/layout/Container'
import NavBar from '../components/navigation/NavBar'
import Hero from '../components/Hero'
import NewsletterSubscribe from '../components/NewsletterSubscribe'
import Sponsors from '../components/Sponsors'
import Head from '../components/Head'

function HomePage() {
  return (
    <Container wide>
      <Head title="Home" />
      <NavBar className="z-50" />
      <Hero className="mb-32" />
      <NewsletterSubscribe formName="form 1" className="mt-8" />
      <Sponsors className="mt-8" />
    </Container>
  )
}

export default HomePage
