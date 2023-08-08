import Container from '../layout/Container'
import Heading from "../typography/Heading"
import Paragraph from '../typography/Paragraph'

function SponsorshipTiers() {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    return (
        <Container wide>
            <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-16 bg-purple-100">
                <div className="col-start-2 col-span-7 my-12">
                    <Heading><h1 level="h3" typeStyle="heading-md" id="sponsorship-tiers" className="my-3 mx-3">Sponsorship Tiers</h1></Heading>
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

export default SponsorshipTiers