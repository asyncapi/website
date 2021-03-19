import { useContext } from "react"
import NavBar from "../../components/navigation/NavBar"
import Container from "../../components/layout/Container"
import BlogContext from "../../context/BlogContext"
import BlogPostItem from "../../components/navigation/BlogPostItem"
import Footer from "../../components/Footer"
import Head from "../../components/Head"
import AnnouncementHero from "../../components/campaigns/AnnoucementHero"

export default function BlogIndexPage() {
  const { navItems } = useContext(BlogContext)

  const posts = navItems.sort((i1, i2) => {
    const i1Date = new Date(i1.date)
    const i2Date = new Date(i2.date)

    if (i1.featured && !i2.featured) return -1
    if (!i1.featured && i2.featured) return 1
    return i2Date - i1Date
  })

  return (
    <div>
      <Head title="Blog" />
      <Container>
        <NavBar />
      </Container>
      <AnnouncementHero className="text-center m-4" small={true} />
      <div className="relative pt-8 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              Welcome to our blog!
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
              Find the latest and greatest stories from our community.
            </p>
            <p className="max-w-2xl mx-auto text-md leading-7 text-gray-400">
              Want to publish a blog post? We love community stories.
              <a className="ml-1 text-primary-500 hover:text-primary-400" href="https://github.com/asyncapi/website/issues/new?template=blog.md" target="_blank">Submit yours!</a>
            </p>
          </div>
          <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
            {
              posts.map((post, index) => (
                <BlogPostItem key={index} post={post} />
              ))
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}