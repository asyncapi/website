import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from '../Head'
import GenericPostContext from '../../context/GenericPostContext'
import NavBar from '../navigation/NavBar'
import Container from './Container'
import AnnouncementHero from '../campaigns/AnnoucementHero'
import StickyNavbar from '../navigation/StickyNavbar'

export default function GenericPostLayout({ post, children }) {
  if (!post) return <ErrorPage statusCode={404} />
  if (post.title === undefined) throw new Error('Post title is required')

  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <GenericPostContext.Provider value={{ post }}>
      <StickyNavbar>
       <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
      </StickyNavbar>
      <AnnouncementHero className="text-center m-4" small={true} />
      <Container>
        <main className="mt-8 px-4 sm:px-6">
          <header className="pr-4 sm:pr-6 md:pr-8">
            <h1 className="text-4xl font-normal text-gray-800 font-sans antialiased">{post.title}</h1>
          </header>
          <article className="mb-32">
            <Head
              title={post.title}
              description={post.excerpt}
              image={post.cover}
            />
            {children}
          </article>
        </main>
      </Container>
    </GenericPostContext.Provider>
  )
}
