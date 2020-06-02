import Head from '../Head'
import NavBar from '../navigation/NavBar'
import Container from './Container'
import Footer from '../Footer'

export default function GenericLayout({ title, children, wide = true }) {
  return (
    <>
      <Head title={title} />
      <Container wide={wide}>
        <NavBar />
      </Container>
      <Container wide={wide}>
        {children}
      </Container>
      <Footer />
    </>
  )
}
