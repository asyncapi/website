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

function HomePage() {
  return (
    <>
      <Container wide>
        <Head title="Home" />
        <NavBar className="z-50" />
        <Hero className="mb-24" />
      </Container>

      <div className="bg-primary-900 py-12 mt-8">
        <Container wide>
          <NewsletterSubscribe formName="form 1" dark />
        </Container>
      </div>

      <Container wide>
        <Sponsors className="mt-8" />
      </Container>
      <div className="mt-24 py-12">
        <Container className="text-center" wide>
          <h3 className="text-primary-800 text-3xl font-bold md:text-4xl mb-4">Join our great community!</h3>
          <p className="mt-2 text-base leading-6 text-gray-500">
            We're a community of great people who are passionate about AsyncAPI and event-driven architectures.
          </p>
          <div className="py-2 lg:py-12">
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-screen-xl lg:px-8">
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
                    <div className="mt-5">
                      <Button className="block md:inline" text="Add to Google Calendar" href="https://calendar.google.com/calendar?cid=dGJyYmZxNGRlNWJjbmd0OG9rdmV2NGxzdGtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ" target="_blank" />
                      <Button className="mt-2 md:mt-0 md:ml-2 block md:inline" bgClassName="bg-indigo-500 hover:bg-indigo-400" text="Join mailing list" href="https://groups.google.com/forum/#!forum/asyncapi-users" target="_blank" />
                      <Button className="mt-2 mt:mt-0 md:ml-2 block md:inline" bgClassName="bg-red-500 hover:bg-red-400" text="Watch recordings" href="https://groups.google.com/forum/#!forum/asyncapi-users" target="_blank" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Slack
            SIG meetings
              + Join next one
              + Find more on YouTube channel */}
          </div>
        </Container>
      </div>
      <Footer />
    </>
  )
}

export default HomePage
