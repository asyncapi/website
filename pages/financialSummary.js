import GenericLayout from "../components/layout/GenericLayout"
import Heading from "../components/typography/Heading"
import Container from '../components/layout/Container'
import Paragraph from '../components/typography/Paragraph'
import Button from '../components/buttons/Button'

function AsyncAPISummary() {
    return (
      <Container wide>
        <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-8">
          <div className="col-start-3 col-span-5">
            <Heading level="h1" typeStyle="heading-md">AsyncAPI Finance Summary</Heading>
            <Paragraph typeStyle="body-md" className="my-4 max-w-4xl">
              To help improve the current state of Event-Driven Architectures and their tooling, you can show your support for
              the AsyncAPI Initiative by making a financial contribution. We offer three donation options: <strong>Open Collective, GitHub
              Sponsors, and Linux Foundation Crowdfunding</strong>. Our expenses are managed through Open Collective and GitHub Sponsors,
              while Linux Foundation Crowdfunding operates separately.
            </Paragraph>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <Button
            text="Become a Sponsor"
            href="#"
          />
        </div>
        <hr className="my-12 border-t border-gray-300"/>
        <div className="text-center text-sm">
          <Heading level="h1" typeStyle="heading-md">Ways to Support Us?</Heading>
        </div>
        <div className="text-center my-4 text-sm max-width">
          <Paragraph typeStyle="body-md" className="my-4">
            The easiest way to support AsyncAPI is by becoming a financial sponsor. While <br/>there are alternative options, 
            they may involve greater effort. Contribute <br/>monetarily using the following channels.
          </Paragraph>
        </div>
      </Container>
    );
  }
  
  

function FinancialSummary() {
  const title="AsyncAPI Finance Summary";
  const description = "Financial Summary of AsyncAPI";
  const image = "/";
  return (
    <GenericLayout
      title={title}
      description={description}
      image={image}
      wide
    >
        <Container wide>
            <AsyncAPISummary/>
        </Container>

    </GenericLayout>
  )
}

export default FinancialSummary
