import Head from '../Head'
import NavBar from '../navigation/NavBar'
import Container from './Container'
import Footer from '../Footer'
import AnnouncementHero from '../campaigns/AnnoucementHero'
import Row from './Row'

export default function GenericWideLayout({
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
      <div className="sticky top-0 w-full bg-white border-b border-gray-300 z-50">
       <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
      </div>
      <Row>
        <AnnouncementHero className="text-center m-4" small={true} />
        {children}
      </Row>
      <Footer />
    </>
  )
}
