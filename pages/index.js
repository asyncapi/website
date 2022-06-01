import { TwitterTimelineEmbed } from 'react-twitter-embed'
import Container from '../components/layout/Container'
import NavBar from '../components/navigation/NavBar'
import Hero from '../components/Hero'
import NewsletterSubscribe from '../components/NewsletterSubscribe'
import Sponsors from '../components/Sponsors'
import Head from '../components/Head'
import Slack from '../components/slack'
import ArrowRight from '../components/icons/ArrowRight'
import Button from '../components/buttons/Button'
import Calendar from '../components/Calendar'
import AdidasLogo from '../components/logos/Adidas'
import AxwayLogo from '../components/logos/Axway'
import SlackLogo from '../components/logos/Slack'
import SalesforceLogo from '../components/logos/Salesforce'
import SapLogo from '../components/logos/SAP'
import Testimonial from '../components/Testimonial'
import NewsroomBlogPosts from '../components/NewsroomBlogPosts'
import NewsroomArticle from '../components/NewsroomArticle'
import NewsroomYoutube from '../components/NewsroomYoutube'
import Heading from '../components/typography/Heading'
import Paragraph from '../components/typography/Paragraph'
import TextLink from '../components/typography/TextLink'
import GoldSponsors from '../components/GoldSponsors'
import SupportUs from '../components/SupportUs'
import StickyNavbar from '../components/navigation/StickyNavbar'
import GoogleCalendarButton from '../components/buttons/GoogleCalendarButton';
import ICSFileButton from '../components/buttons/ICSFileButton';
import SubscribeButton from '../components/buttons/SubscribeButton';


function HomePage() {
  return (
    <>
      <Head />
      <StickyNavbar>
        <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
      </StickyNavbar>

      <main id="main-content" className="scroll-mt-5">
        <Container wide>
          <Hero className="mb-24" />
        </Container>

        <Container className="text-center pb-12" wide as="section">
          <Heading
            level="h3"
            typeStyle="heading-lg"
            className="mb-4"
          >
            Adopted by the world leading brands
          </Heading>
          <Paragraph className="mt-2 mb-20 md:w-2/3 md:mx-auto">
            These brands are already using AsyncAPI in production. Is your company using AsyncAPI and wants to be included in this list?
            <TextLink href="https://github.com/asyncapi/website/issues/new" target="_blank">
              Let us know here!
            </TextLink>
          </Paragraph>
          <ul className="md:grid md:gap-8 md:grid-cols-2 lg:grid-cols-5">
            <li className="justify-center flex">
              <AdidasLogo className="h-8 text-gray-400" />
            </li>
            <li className="justify-center flex">
              <AxwayLogo className="mt-12 md:-mt-5 lg:-mt-5 h-14 text-gray-400" />
            </li>
            <li className="justify-center flex">
              <SlackLogo className="mt-12 md:mt-2 lg:-mt-1 h-10 text-gray-400" />
            </li>
            <li className="justify-center flex">
              <SalesforceLogo className="mt-12 md:mt-2 lg:-mt-4 h-16 text-gray-400" />
            </li>
            <li className="justify-center flex">
              <SapLogo className="mt-12 md:mt-2 lg:-mt-2 h-12 text-gray-400" />
            </li>
          </ul>
        </Container>

        <div className="bg-gray-900 py-12 mt-8">
          <Container wide as="section">
            <NewsletterSubscribe formName="form 1" dark />
          </Container>
        </div>

        <Container className="text-center py-12" wide as="section">
          <Heading
            level="h3"
            typeStyle="heading-lg"
            className="mb-4"
          >
            Join our great community!
          </Heading>
          <Paragraph className="mt-2 md:w-1/2 md:mx-auto">
            We're a community of great people who are passionate about AsyncAPI and event-driven architectures.
          </Paragraph>
          <div className="py-2 lg:py-12">
            <Container wide>
              <div className="lg:flex">
                <div className="mt-10 lg:mt-0 lg:flex-1">
                  <Slack />
                </div>
                <section className="lg:text-left lg:max-w-xl lg:ml-12">
                  <div className="mt-5">
                    <Heading level="h4" typeStyle="heading-md-semibold">
                      Join our Slack workspace
                    </Heading>
                    <Paragraph className="mt-2">
                      We welcome everyone to join our Slack workspace. If you have a question on how to use AsyncAPI, want to contribute, or simply want to say hello 👋 &nbsp;you're welcome to join us. We're nice people 🙂
                    </Paragraph>
                  </div>
                  <div className="mt-5 flex justify-center lg:justify-start">
                    <Button className="w-full md:w-auto" text="Join us!" href="/slack-invite" />
                  </div>
                </section>
              </div>

              <div className="mt-12 lg:flex lg:flex-row-reverse">
                <section className="mt-10 lg:mt-0 lg:flex-1">
                  <Calendar size="2" className="float-left" />
                </section>
                <section className="lg:text-left lg:max-w-xl lg:mr-12">
                  <div className="mt-5">
                    <Heading level="h3" typeStyle="heading-md-semibold">
                      Join our public meetings
                    </Heading>
                    <Paragraph className="mt-2">
                      AsyncAPI hosts different meetings every week. They are focused on different topic, sometimes purely technical and sometimes about community building. Pick one and join us!

                      <TextLink href="/community/meetings">
                        Learn more about our meetings.
                      </TextLink>
                    </Paragraph>
                    <ul className="mt-5 md:flex justify-center">
                      <li>
                        <GoogleCalendarButton href="https://calendar.google.com/calendar/u/3?cid=Y19xOXRzZWlnbG9tZHNqNm5qdWh2YnB0czExY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t" />
                      </li>
                      <li>
                        <SubscribeButton
                          href="/newsletter"
                          className="mt-2 md:mt-0 md:ml-2"
                        />
                      </li>
                      <li>
                        <ICSFileButton
                          href="https://calendar.google.com/calendar/ical/c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com/public/basic.ics"
                          className="mt-2 md:mt-0 md:ml-2"
                        />
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            </Container>
          </div>
        </Container>

        <section className="pb-20" role="contentinfo" aria-label='Our Sponsors'>
          <Container className="text-center pb-6" wide as="section">
            <Heading
              level="h3"
              typeStyle="heading-lg"
              className="mb-4"
            >
              Platinum Sponsors
            </Heading>
            <Sponsors className="mt-4" showSupportBanner={false} />
          </Container>

          <Container className="text-center pyb-6" wide as="section">
            <Heading
              level="h3"
              typeStyle="heading-lg"
              className="mb-4"
            >
              Gold Sponsors
            </Heading>
            <GoldSponsors className="mt-4" showSupportBanner={false} />
          </Container>

          <Container className="text-center py-6" wide as="section">
            <Heading
              level="h3"
              typeStyle="heading-md-semibold"
              className="mb-4"
            >
              Want to Sponsor Us?
            </Heading>
            <Paragraph className="mt-2 md:w-1/2 md:mx-auto">
              These great organizations are already supporting AsyncAPI. Want to become a sponsor?
              <TextLink href="https://opencollective.com/asyncapi" target="_blank">
                Support us!
              </TextLink>
            </Paragraph>
          </Container>
        </section>
        <Container className="text-center py-6 pb-20" wide>
          <Heading level="h3" typeStyle="heading-lg" className="mb-4">
            Supported by
          </Heading>
          <Paragraph className="mt-3 max-w-2xl mx-auto sm:mt-4 pb-4">
            The following companies support us by letting us use their products for free. Interested in supporting us too?
            <TextLink href="mailto:info@asyncapi.io" target="_blank">
              Email us
            </TextLink> for more info.
          </Paragraph>
          <SupportUs className="mt-4" showSupportBanner={false} />
        </Container>
        <Container wide>
          <div className="text-center">
            <Heading
              level="h2"
              typeStyle="heading-lg"
            >
              Latest Updates
            </Heading>
            <Paragraph typeStyle="body-md" className="max-w-2xl mx-auto mt-5">
              Get a glimpse of latest news, events, and blog posts. Want to publish a blog post? We love community stories.
              <TextLink href="https://github.com/asyncapi/website/issues/new?template=blog.md" target="_blank">
                Submit yours!
              </TextLink>
            </Paragraph>
          </div>
          <div className="lg:flex flex-row my-20">
            <div className="text-center lg:text-left pt-4 lg:pr-16 lg:w-1/4">
              <Heading level="h4" typeStyle="heading-md-semibold">
                From the blog
              </Heading>
              <Paragraph typeStyle="body-md" className="mt-7">
                Check out these articles written by community members
              </Paragraph>
              <div className="mt-7">
                <TextLink href="/blog" className="mt-4">
                  Read all blog posts
                  <ArrowRight className="inline w-6" />
                </TextLink>
              </div>
            </div>
            <NewsroomBlogPosts />
          </div>
          <div className="lg:flex flex-row my-20">
            <div className="text-center lg:text-left lg:w-1/4 pt-4">
              <Heading level="h4" typeStyle="heading-md-semibold">
                Latest News
              </Heading>
              <Paragraph typeStyle="body-md" className="mt-7">
                Read about what people are <br /> saying about AsyncAPI
              </Paragraph>
              <div className="mt-7">
                <TextLink href="https://twitter.com/AsyncAPISpec" className="mt-4" target="_blank">
                  Follow us on Twitter
                  <ArrowRight className="inline w-6" />
                </TextLink>
              </div>
            </div>
            <div className="text-center md:text-left lg:w-3/4 md:flex flex-row justify-between mt-4">
              <div className="w-full lg:w-1/2">
              <NewsroomArticle />
              </div>
              <div className="rounded-md px-6 pt-4 border-2 border-gray-200 mt-4 w-full lg:w-fit mx-auto md:mt-0">
                <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName="AsyncAPISpec"
                  options={{height: 575, width:350}}
                />
              </div>
            </div>
          </div>
          <div className="lg:flex flex-row my-20">
            <div className="text-center lg:text-left lg:w-1/4 pt-4">
              <Heading level="h4" typeStyle="heading-md-semibold">
                Video & Live Streams
              </Heading>
              <Paragraph typeStyle="body-md" className="mt-7">
                Watch our latest videos and live streams on the AsyncAPI YouTube channel
              </Paragraph>
              <div className="mt-7">
                <TextLink href="https://www.youtube.com/c/AsyncAPI" className="mt-4" target="_blank">
                  Visit our YouTube channel
                  <ArrowRight className="inline w-6" />
                </TextLink>
              </div>
            </div>
            <div>
              <NewsroomYoutube />
            </div>
          </div>
        </Container>
        <Container className="text-center pb-20 mt-8" wide as="section">
          <Heading level="h3" typeStyle="heading-lg" className="mb-4">
            What the experts are saying
          </Heading>
          <ul className="max-w-screen-xl mx-auto md:grid md:grid-cols-2 md:px-6 lg:px-8">
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
          </ul>
        </Container>
      </main>
    </>
  )
}

export default HomePage