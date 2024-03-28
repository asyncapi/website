import NavBar from '../components/navigation/NavBar'
import Head from '../components/Head'
import StickyNavbar from '../components/navigation/StickyNavbar'
import { languageDetection } from "../lib/i18n";

function HomePage() {
  const loader = 'img/loaders/loader.png'; // preloader image for the tools
  languageDetection();

  return (
    <>
      <Head />
      <div className="h-screen">
        <div className="flex animate-pulse w-fit mx-auto my-60 gap-4 text-black">
          <img src={loader} className="mx-auto w-16" />
          <div className="text-xl my-auto">Loading...</div>
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
                <div className="mt-10 lg:mt-0 lg:w-1/2">
                  <Slack />
                </div>
                <section className="lg:text-left lg:max-w-xl lg:w-1/2 lg:ml-12">
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
                  <div className="mt-5 lg:mr-12">
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
                          href="/community/meetings"
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
            <Container wide>
              <NewsroomSection />
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
            <Sponsors className="mt-4" showSupportBanner={ false } />
          </Container>

          <Container className="text-center pb-6" wide as="section">
            <Heading
              level="h3"
              typeStyle="heading-lg"
              className="mb-4"
            >
              Gold Sponsors
            </Heading>
            <GoldSponsors className="mt-4" showSupportBanner={ false } />
          </Container>

          <Container className="text-center pyb-6" wide as="section">
            <Heading
              level="h3"
              typeStyle="heading-lg"
              className="mb-4"
            >
              Silver Sponsors
            </Heading>
            <SilverSponsors className="mt-4" showSupportBanner={ false } />
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
          <SupportUs className="mt-4" showSupportBanner={ false } />
        </Container>
        <Container className="text-center pb-20 mt-8" wide as="section">
          <Heading level="h3" typeStyle="heading-lg" className="mb-8">
            What the experts are saying
          </Heading>
          <Testimonial />
        </Container>
      </main>
    </>
  )
}

export default HomePage
