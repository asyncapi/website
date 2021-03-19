import Head from '../Head'
import NavBar from '../navigation/NavBar'
import Container from './Container'
import Footer from '../Footer'
import AnnouncementHero from '../campaigns/AnnoucementHero'

export default function GenericLayout({
  title,
  description,
  image,
  children,
  wide = true
}) {
  if (!title || !description || !image) throw new Error('Props `title`, `description`, and `image` are required at GenericLayout component.')
  
  return (
    <>
      <Head
        title={title}
        description={description}
        image={image}
      />
      <Container wide={wide}>
        <NavBar />
      </Container>
      <Container wide={wide}>
        <AnnouncementHero className="text-center m-4" small={true} />
        {children}
      </Container>
      <Footer />
    </>
  )
}
