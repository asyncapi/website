import { getAllPosts } from '../lib/api'
import Container from '../components/layout/Container'
import NavBar from '../components/navigation/NavBar'
import Hero from '../components/Hero'
import NewsletterSubscribe from '../components/NewsletterSubscribe'
import Sponsors from '../components/Sponsors'
import Head from '../components/Head'
import Footer from '../components/Footer'
import Slack from '../components/slack'
import Button from '../components/buttons/Button'
import Calendar from '../components/Calendar'
import AdidasLogo from '../components/logos/Adidas'
import AxwayLogo from '../components/logos/Axway'
import SlackLogo from '../components/logos/Slack'
import SalesforceLogo from '../components/logos/Salesforce'
import SapLogo from '../components/logos/SAP'
import Testimonial from '../components/Testimonial'
import BlogPostItem from '../components/navigation/BlogPostItem'
import DemoAnimation from "../components/DemoAnimation"
import GoldSponsors from '../components/GoldSponsors'
import SupportUs from '../components/SupportUs'

function HomePage() {
  const posts = getAllPosts()
    .filter(p => p.slug.startsWith('/blog/'))
    .sort((i1, i2) => {
      const i1Date = new Date(i1.date)
      const i2Date = new Date(i2.date)

      if (i1.featured && !i2.featured) return -1
      if (!i1.featured && i2.featured) return 1
      return i2Date - i1Date
    })
    .slice(0, 3)

  return (
    <>
      <Container wide>
        <Head />
      </Container>
      <div className="sticky top-0 w-full bg-white border-b border-gray-500 z-50">
       <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
      </div>
      
      <Container wide>
      <Hero className="mb-24" /> 
      </Container>
      
      <Container className="text-center pb-12" wide>
        <h3 className="text-primary-800 text-3xl font-bold md:text-4xl mb-4">Adopted by the world leading brands</h3>
        <p className="mt-2 mb-20 text-base leading-6 text-gray-500 md:w-1/2 md:mx-auto">
          These brands are already using AsyncAPI in production. Is your company using AsyncAPI and wants to be included in this list? <a href="https://github.com/asyncapi/website/issues/new" target="_blank" className="text-primary-500 font-medium" rel="noreferrer">Let us know here!</a>
        </p>
        <div className="md:grid md:gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="justify-center flex">
            <AdidasLogo className="h-8 text-gray-400" />
          </div>
          <div className="justify-center flex">
            <AxwayLogo className="mt-12 md:-mt-5 lg:-mt-5 h-14 text-gray-400" />
          </div>
          <div className="justify-center flex">
            <SlackLogo className="mt-12 md:mt-2 lg:-mt-1 h-10 text-gray-400" />
          </div>
          <div className="justify-center flex">
            <SalesforceLogo className="mt-12 md:mt-2 lg:-mt-4 h-16 text-gray-400" />
          </div>
          <div className="justify-center flex">
            <SapLogo className="mt-12 md:mt-2 lg:-mt-2 h-12 text-gray-400" />
          </div>
        </div>
      </Container>

      <div className="bg-primary-900 py-12 mt-8">
        <Container wide>
          <NewsletterSubscribe formName="form 1" dark />
        </Container>
      </div>

      <Container className="text-center py-12" wide>
        <h3 className="text-primary-800 text-3xl font-bold md:text-4xl mb-4">Join our great community!</h3>
        <p className="mt-2 text-base leading-6 text-gray-500 md:w-1/2 md:mx-auto">
          We're a community of great people who are passionate about AsyncAPI and event-driven architectures.
        </p>
        <div className="py-2 lg:py-12">
          <Container wide>
            <div className="lg:flex">
              <div className="mt-10 lg:mt-0 lg:flex-1">
                <Slack />
              </div>
              <div className="lg:text-left lg:max-w-xl lg:ml-8">
                <div className="mt-5">
                  <h5 className="text-lg leading-6 font-medium text-gray-900">Join our Slack workspace</h5>
                  <p className="mt-2 text-base leading-6 text-gray-500">
                    We welcome everyone to join our Slack workspace. If you have a question on how to use AsyncAPI, want to contribute, or simply want to say hello 👋 &nbsp;you're welcome to join us. We're nice people 🙂
                  </p>
                </div>
                <div className="mt-5">
                  <Button className="block md:inline" text="Join us!" href="/slack-invite" />
                </div>
              </div>
            </div>

            <div className="mt-12 lg:flex lg:flex-row-reverse">
              <div className="mt-10 lg:mt-0 lg:flex-1">
                <Calendar />
              </div>
              <div className="lg:text-left lg:max-w-xl lg:mr-8">
                <div className="mt-5">
                  <h5 className="text-lg leading-6 font-medium text-gray-900">Join our public meetings</h5>
                  <p className="mt-2 text-base leading-6 text-gray-500">
                    We meet every two weeks to discuss about the current state of the art, future releases, and everything AsyncAPI. We alternate the time of the meeting to adapt to different world regions, choose the one that suites you best. Or join both!
                  </p>
                  <div className="mt-5 md:flex">
                    <Button className="block md:inline-block md:flex-1 md:text-center" text="Add to Google Calendar" href="https://calendar.google.com/calendar?cid=dGJyYmZxNGRlNWJjbmd0OG9rdmV2NGxzdGtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ" target="_blank" />
                    <Button className="mt-2 md:mt-0 md:ml-2 block md:inline-block md:flex-1 md:text-center" bgClassName="bg-indigo-500 hover:bg-indigo-400" text="Join mailing list to get invite" href="https://groups.google.com/forum/#!forum/asyncapi-users" target="_blank" />
                    <Button className="mt-2 md:mt-0 md:ml-2 block md:inline-block md:flex-1 md:text-center" bgClassName="bg-red-500 hover:bg-red-400" text="Watch previous recordings" href="https://www.youtube.com/playlist?list=PLbi1gRlP7pijUwZJErzyYf_Rc-PWu4lXS" target="_blank" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Container>

      <Container className="text-center py-6" wide>
        <h3 className="text-primary-800 text-3xl font-bold md:text-4xl mb-4">Platinum Sponsors</h3>
        <Sponsors className="mt-4" showSupportBanner={false} />
      </Container>

      <Container className="text-center py-6" wide>
        <h3 className="text-primary-800 text-3xl font-bold md:text-4xl mb-4">Gold Sponsors</h3>
        <GoldSponsors className="mt-4" showSupportBanner={false} />
      </Container>

      <Container className="text-center py-6" wide>
        <h3 className="text-primary-800 text-2xl font-semibold mb-4">Want to Sponsor Us?</h3>
        <p className="mt-2 text-base leading-6 text-gray-500 md:w-1/2 md:mx-auto">
          These great organizations are already supporting AsyncAPI. Want to become a sponsor? <a href="https://opencollective.com/asyncapi" target="_blank" className="text-primary-600 font-medium" rel="noreferrer">Support us!</a>
        </p>
      </Container>

      <Container className="text-center pb-10" wide>
        <section>
          <div className="max-w-screen-xl mx-auto md:grid md:grid-cols-2 md:px-6 lg:px-8">
            <Testimonial
              className="md:pr-10 lg:pr-16"
              text="Microservices underline the need for event-based communication in distributed architectures. AsyncAPI brings the richness of the REST API ecosystem to asynchronous APIs."
              authorAvatar="/img/testimonials/matt-mclarty.jpg"
              authorName="Matt McLarty"
              authorDescription="Global Leader of API Strategy at MuleSoft"
            />
            <Testimonial
              className="md:pl-10 lg:pl-16"
              text="Event-driven APIs need love too! AsyncAPI brings the many benefits of a machine/human readable specification to these nuanced approaches."
              authorAvatar="/img/testimonials/bill-doerrfeld.jpg"
              authorName="Bill Doerrfeld"
              authorDescription="Editor in Chief at Nordic APIs"
            />
            <Testimonial
              className="md:pr-10 lg:pr-16"
              text="Developers need to be able to quickly and consistently create event-driven applications that provide business value and react to customer needs in realtime. I can't count how many times I've heard developers ask for OpenAPI/Swagger style tools for the asynchronous and event driven world, and that is exactly what the AsyncAPI initiative is making a reality."
              authorAvatar="/img/testimonials/jonathan-schabowsky.jpg"
              authorName="Jonathan Schabowsky"
              authorDescription="Sr. Architect, Office of the CTO at Solace"
            />
            <Testimonial
              className="md:pl-10 lg:pl-16"
              text="We’ve been focusing on event-driven APIs since 2014 and thank the AsyncAPI contributors everyday for driving the community towards common standards."
              authorAvatar="/img/testimonials/eric-horesnyi.jpg"
              authorName="Eric Horesnyi"
              authorDescription="CEO at Streamdata.io"
            />
          </div>
        </section>
      </Container>
      <Container className="text-center py-6 pb-20" wide>
        <h3 className="text-primary-800 text-3xl font-bold md:text-4xl mb-4">Supported by</h3>
        <p className="mt-3 max-w-2xl mx-auto text-l leading-7 text-gray-500 sm:mt-4 pb-4">
          The following companies support us by letting us use their products for free. Interested in supporting us too?
          <a href="mailto:info@asyncapi.io" target="_blank" className="text-primary-600" rel="noreferrer"> Email </a> us for more info.
        </p>
        <SupportUs className="mt-4" showSupportBanner={false} />
      </Container>
      <Container wide>
        <div className="text-center">
          <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Latest stories from our blog
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
            Find the latest and greatest stories from our community.
          </p>
          <p className="max-w-2xl mx-auto text-md leading-7 text-gray-400">
            Want to publish a blog post? We love community stories.
            <a className="ml-1 text-primary-500 hover:text-primary-400" href="https://github.com/asyncapi/website/issues/new?template=blog.md" target="_blank" rel="noreferrer">Submit yours!</a>
          </p>
        </div>
        <div className="mt-12 mx-auto md:grid md:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:max-w-none lg:px-8">
          {
            posts.map((post, index) => (
              <BlogPostItem className="mb-8 md:mb-0" key={index} post={post} />
            ))
          }
        </div>
        <div className="my-10 text-center">
          <Button bgClassName="bg-none border border-gray-200 text-gray-800 hover:text-gray-700 shadow-none" href="/blog" text="View more blog posts" />
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default HomePage
