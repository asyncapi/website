import Container from '../components/Container'
import NavBar from '../components/navigation/NavBar'
import Hero from '../components/Hero'
import NewsletterSubscribe from '../components/NewsletterSubscribe'

function HomePage() {
  return (
    <Container>
      <NavBar />
      <Hero />
      <NewsletterSubscribe className="mt-8" />
    </Container>
  )
}

export default HomePage
