import GenericLayout from "../components/layout/GenericLayout"
import Heading from "../components/typography/Heading"
import Container from '../components/layout/Container'
import Paragraph from '../components/typography/Paragraph'
import Button from '../components/buttons/Button'

const cardsData = [
  {
    title: "fffef",
    body: "dwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9 wyf wfywdy f",
    image: "https://avatars.githubusercontent.com/u/16401334?s=280&v=4",
  },
  {
    title: "fwfwfc",
    body: "dwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9 wyf wfywdy f dwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9 wyf wfywdy f",
    image: "https://avatars.githubusercontent.com/u/16401334?s=280&v=4",
  },
  {
    title: "khjhb",
    body: "dwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9",
    image: "https://avatars.githubusercontent.com/u/16401334?s=280&v=4",
  },
  {
    title: "fugv",
    body: "dwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9 wyf wfywdy fdwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9 wyf wfywdy fdwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9 wyf wfywdy f",
    image: "https://avatars.githubusercontent.com/u/16401334?s=280&v=4",
  },
  {
    title: "veuvei",
    body: "dwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9 wyf wfywdy f",
    image: "https://avatars.githubusercontent.com/u/16401334?s=280&v=4",
  },
  {
    title: "egef",
    body: "dwsdhwdug dwu dw ydw wdy wy wf wyf f wyf9 wyf wfywdy f",
    image: "https://avatars.githubusercontent.com/u/16401334?s=280&v=4",
  },
];

function Card({ title, body, image }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {image && <img src={image} alt={title} className="w-full h-32 object-cover rounded-md mb-4" />}
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{body}</p>
    </div>
  );
}

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
      <hr className="my-12 border-t border-gray-300" />
      <div className="text-center text-sm">
        <Heading level="h1" typeStyle="heading-md">Ways to Support Us?</Heading>
      </div>
      <div className="text-center my-4 text-sm max-width">
        <Paragraph typeStyle="body-md" className="my-4">
          The easiest way to support AsyncAPI is by becoming a financial sponsor. While <br />there are alternative options,
          they may involve greater effort. Contribute <br />monetarily using the following channels.
        </Paragraph>
      </div>
      <div className="text-center">
        <img className="mx-2 inline" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/800px-Square_-_black_simple.svg.png" alt="Image 1" width="50px" height="50px" />
        <img className="mx-2 inline" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/800px-Square_-_black_simple.svg.png" alt="Image 1" width="50px" height="50px" />
        <img className="mx-2 inline " src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/800px-Square_-_black_simple.svg.png" alt="Image 1" width="50px" height="50px" />
      </div>
    </Container>
  );
}

function SponsorshipTiers() {
  return (
    <Container wide>
      <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-16 bg-purple-100">
        <div className="col-start-2 col-span-7 my-12">
          <Heading level="h1" typeStyle="heading-md" className="my-3 mx-3">Sponsorship Tiers</Heading>
          <Paragraph typeStyle="body-md" className="my-3 max-w-4xl mx-3">
            AsyncAPI offers various sponsorship tiers, each with its own set
            of benefits and privileges. These tiers include Bronze, Silver,
            Gold, and Platinum.
          </Paragraph>
          <div className="overflow-x-auto">
            <div className="my-3 mx-3">
              <table className="my-8 w-full max-w-full border-collapse border border-gray-500">
                <thead style={{ backgroundColor: '#805CDA' }} className="text-lg text-white">
                  <tr>
                    <th className="border border-white-500 px-6 py-4 md:px-10 md:py-6">Tiers</th>
                    <th className="border border-white-500 px-6 py-4 md:px-10 md:py-6">Benefits</th>
                    <th className="border border-white-500 px-6 py-4 md:px-10 md:py-6">Amounts</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2">Bronze</td>
                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2">$100/month</td>
                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2">Company logo in README on GitHub</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2">Silver</td>
                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2">$500/month</td>
                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2">Company logo in README on GitHub and asyncapi.com</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2">Gold</td>
                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2">$1000/month</td>
                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2">Company logo in README on GitHub and asyncapi.com</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2">Platinum</td>
                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2">$2000/month</td>
                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2">Company logo in README on GitHub and asyncapi.com. Up to 2
                      hours of support per month. Support will be remote with the
                      option of a shared screen or via private chat. Support hours do not
                      accumulate.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <style>
              {`
          @media (max-width: 768px) {
            /* Add custom styles for mobile devices here */
            /* For example, you can reduce the font size or adjust the table layout */
            .text-lg {
              font-size: 14px;
            }
            .text-sm {
              font-size: 12px;
            }
            .px-6 {
              padding-left: 4px;
              padding-right: 4px;
            }
            .py-2 {
              padding-top: 2px;
              padding-bottom: 2px;
            }
          }
        `}
            </style>
          </div>
        </div>
      </div>
    </Container>
  );
}


function OtherFormsOfFinancialSupport() {
  return (
    <Container wide>
      <div className="flex flex-wrap lg:justify-center lg:items-start my-8">
        <div className="flex sm:flex-col gap-2 flex-row">
          <img className="mx-2 hidden lg:block" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/800px-Square_-_black_simple.svg.png" alt="Image 1" width="150px" height="150px" />
          <img className="mx-2 hidden lg:block" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/800px-Square_-_black_simple.svg.png" alt="Image 2" width="150px" height="150px" />
          <img className="mx-2 hidden lg:block" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/800px-Square_-_black_simple.svg.png" alt="Image 3" width="150px" height="150px" />
        </div>


        <div className="flex flex-col gap-4 max-w-4xl lg:w-3/5">
          <div className="my-2">
            <Heading level="h1" typeStyle="heading-md">Other forms of financial support</Heading>
          </div>

          <div className="my-2">
            <Heading level="h2" typeStyle="heading-sm">Employee involvement</Heading>
            <Paragraph typeStyle="body-md" className="my-2">
              Assign your employees to contribute to projects under the AsyncAPI Initiative
              on a regular basis, and we'll welcome them as new maintainers. You can
              also provide direct assistance to a member of the Technical Steering Committee
              (TSC) through contracts or employment for specific tasks.
            </Paragraph>
          </div>

          <div className="my-2">
            <Heading level="h2" typeStyle="heading-sm">Event organization</Heading>
            <Paragraph typeStyle="body-md" className="my-2">
              Host AsyncAPI conferences by sponsoring and organizing events under the AsyncAPI
              brand at your provided venue.
            </Paragraph>
          </div>

          <div className="my-2">
            <Heading level="h2" typeStyle="heading-sm">Service provision</Heading>
            <Paragraph typeStyle="body-md" className="my-2">
              AsyncAPI Initiative relies on numerous tools, many of which incur costs. Your
              organization can provide services such as hosting or storage to support our efforts.
            </Paragraph>
          </div>
        </div>
      </div>
    </Container>
  );
}

function ExpenseBreakdown() {
  return (
    <Container wide>
      <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-16" style={{ backgroundColor: "#EFFAFE" }}>
        <div className="col-start-2 col-span-7 my-12">
          <Heading level="h1" typeStyle="heading-md" className="my-3 mx-3">Expense Breakdown</Heading>
          <Paragraph typeStyle="body-md" className="my-3 max-w-4xl mx-3">
            Funds from GitHub Sponsors are directly transferred to our AsyncAPI Open
            Collective account. We maintain transparency in all expenses, and the TSC approves
            anticipated expenses.
          </Paragraph>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mx-3">
            {cardsData.map((card, index) => (
              <Card key={index} title={card.title} body={card.body} image={card.image} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

function SuccessStories() {
  return (
    <Container wide>
      <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-16 bg-purple-100">
        <div className="col-start-2 col-span-7 my-12">
          <Heading level="h1" typeStyle="heading-lg" className="my-3 mx-3">Success Stories</Heading>
          <Paragraph typeStyle="body-sm" className="my-3 max-w-4xl mx-3">
            Thanks to financial support we can already see many success stories in
            the project.
          </Paragraph>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            <div className="m-4 p-2">
              <Heading level="h6" typeStyle="heading-sm" className="mb-2">Community Manager</Heading>
              <Paragraph typeStyle="body-sm" className="text-gray-600">With the addition of a dedicated Community
                Manager, we now have a monthly newsletter,
                regular status updates, an active social
                media presence, and the ability to drive
                initiatives such as event organization.</Paragraph>
            </div>
            <div className="m-4 p-2">
              <Heading level="h6" typeStyle="heading-sm" className="mb-2">AsyncAPI Mentorship</Heading>
              <Paragraph typeStyle="body-sm" className="text-gray-600">The 2022 mentorship program yielded
                significant achievements: Kafka support in
                Glee, a centralized platform for sharing
                AsyncAPI tools, and a versatile error
                handling library for multiple projects.</Paragraph>
            </div>
            <div className="m-4 p-2">
              <Heading level="h6" typeStyle="heading-sm" className="mb-2">AsyncAPI Conference</Heading>
              <Paragraph typeStyle="body-sm" className="text-gray-600">Every year we organize a conference that
                attracts many participants. Only last year
                the conference generated . We
                plan to do a series of events in different
                locations every year.</Paragraph>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

function ContactUs() {
  return (
    <Container wide>
      <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-8">
        <div className="col-start-3 col-span-5">
          <Heading level="h1" typeStyle="heading-md">Interested in getting in touch?</Heading>
          <Paragraph typeStyle="body-sm" className="my-2 max-w-4xl">
            Feel free to contact us if you need more explanation. We are happy to hop on a call and help with
            onboarding to the project as a sponsor. Write email to <span style={{color:"#8054F2" ,fontWeight:900}}>info@asyncapi.io.</span>
          </Paragraph>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          text="Contact Us"
          href="#"
        />
      </div>
    </Container>
  )
}

function FinancialSummary() {
  const title = "AsyncAPI Finance Summary";
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
        <AsyncAPISummary />
        <SponsorshipTiers />
        <OtherFormsOfFinancialSupport />
        <ExpenseBreakdown />
        <SuccessStories />
        <ContactUs/>
      </Container>

    </GenericLayout>
  )
}

export default FinancialSummary
